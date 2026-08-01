"""
Allocation Coordinator - Main Orchestrator
Coordinates the complete allocation flow with strategies, constraints, and error handling.
"""

from datetime import datetime
from typing import Dict, List, Optional, Tuple
from django.db import transaction
from django.utils import timezone
from django.core.exceptions import ValidationError

from .models import RecoveryCase, Auctioneer, Allocation
from .repositories import AllocationRepository, AuctioneerRepository, NotificationRepository
from .allocation_engine import (
    AllocationStrategyType,
    AllocationExceptionType,
    ConstraintViolationType,
    AllocationEnforcementMode,
    AllocationEnforcementPolicy,
    EligibilityFilter,
    ScoringEngine,
    AllocationResult,
    BatchAllocationResult,
    AuctioneerRecommendation,
    ScoringFactors,
    AutomaticAllocationStrategy,
    PriorityAllocationStrategy,
    ManualAllocationStrategy,
    AllocationEnforcer,
    EnforcementResult,
)


class AllocationCoordinator:
    """
    Main orchestrator for case allocation.
    
    Coordinates allocation flow:
    1. Constraint validation
    2. Eligibility filtering
    3. Scoring & ranking
    4. Strategy execution
    5. Result handling & notifications
    6. Enforcement validation
    
    Supports auto-allocation enforcement for compliance and optimization.
    """
    
    # Configuration (can be overridden)
    STRATEGY_CONFIG = {
        "min_confidence_score": 50,
        "use_load_balancing_threshold": 50,  # If >50 pending cases, use load balancing
        "default_strategy": AllocationStrategyType.AUTOMATIC.value,
        "enforcement_mode": AllocationEnforcementMode.BALANCED.value,
        "enforcement_policy": AllocationEnforcementPolicy.ENFORCE_HIGH_PRIORITY.value,
    }
    
    def __init__(
        self,
        user=None,
        enforcement_mode: str = AllocationEnforcementMode.BALANCED.value,
    ):
        """
        Initialize coordinator.
        
        Args:
            user: Current user (for audit trail)
            enforcement_mode: Auto-allocation enforcement mode
        """
        self.user = user
        self.filter = EligibilityFilter()
        self.enforcer = AllocationEnforcer(enforcement_mode=enforcement_mode)
    
    def set_enforcement_mode(self, mode: str):
        """Update enforcement mode."""
        self.enforcer = AllocationEnforcer(enforcement_mode=mode)
    
    # ========================================================================
    # Main Public API
    # ========================================================================
    
    @transaction.atomic
    def allocate_case(
        self,
        case: RecoveryCase,
        strategy_type: str = AllocationStrategyType.AUTOMATIC.value,
        auctioneer_id: Optional[int] = None,
        dry_run: bool = False,
        force: bool = False,
        dry_run_preview: bool = False,
    ) -> AllocationResult:
        """
        Allocate single case to auctioneer with automatic enforcement.
        
        Uses automatic allocation as default with enforcement policies:
        - BALANCED: Force auto for High/Critical cases
        - STRICT: Force auto for all cases
        - PERMISSIVE: Auto is default but manual allowed
        - ADVISORY: Show recommendations, allow override
        
        Args:
            case: RecoveryCase instance to allocate
            strategy_type: Requested allocation strategy (default: automatic)
            auctioneer_id: For manual strategy, the auctioneer to allocate to
            dry_run: If True, validate but don't commit
            force: If True, override some constraints (use with caution)
            dry_run_preview: If True, show what dry_run result would be (for enforcement)
        
        Returns:
            AllocationResult with success status and details
        """
        try:
            # Default to automatic allocation
            if not strategy_type:
                strategy_type = self.STRATEGY_CONFIG.get("default_strategy", AllocationStrategyType.AUTOMATIC.value)
            
            # 0. ENFORCEMENT VALIDATION: Check if strategy is allowed
            enforcement_result: EnforcementResult = self.enforcer.validate_allocation_strategy(
                case=case,
                requested_strategy=strategy_type,
                policy=self.STRATEGY_CONFIG.get("enforcement_policy", AllocationEnforcementPolicy.ENFORCE_HIGH_PRIORITY.value),
                dry_run_completed=dry_run_preview,
            )
            
            if not enforcement_result.can_proceed:
                # Enforcement blocked this strategy
                result = AllocationResult(
                    success=False,
                    case_id=case.id,
                    error_message=enforcement_result.message,
                    exception_type=AllocationExceptionType.MANUAL_EXCEPTION,
                    strategy_used=strategy_type,
                )
                # Add enforcement info to result
                result.enforcement_blocked = True
                result.enforcement_reason = enforcement_result.decision.enforcement_reason
                result.allowed_strategies = enforcement_result.decision.allowed_strategies
                result.requires_dry_run = enforcement_result.decision.requires_dry_run
                
                return result
            
            # Use recommended strategy if enforcement overrides
            if enforcement_result.decision.is_enforced and enforcement_result.recommended_strategy:
                strategy_type = enforcement_result.recommended_strategy
            
            # 1. Get candidate auctioneers
            candidates = self._get_candidates(case)
            
            # 2. Filter by constraints
            eligible, violations = self.filter.filter(case, candidates)
            
            if not eligible and not force:
                return self._make_failure_result(
                    case,
                    AllocationExceptionType.NO_ELIGIBLE_AUCTIONEER,
                    violations,
                )
            
            if not eligible and force:
                eligible = list(candidates)  # Use all candidates if force
            
            # 3. Select auctioneer based on strategy
            strategy = self._get_strategy(strategy_type, auctioneer_id)
            auctioneer_result = strategy.allocate(case, eligible)
            
            if not auctioneer_result:
                return self._make_failure_result(
                    case,
                    AllocationExceptionType.NO_ELIGIBLE_AUCTIONEER,
                    violations,
                )
            
            auctioneer_id, result = auctioneer_result
            
            # 4. Get auctioneer object
            auctioneer = AuctioneerRepository.get(auctioneer_id)
            if not auctioneer:
                return AllocationResult(
                    success=False,
                    case_id=case.id,
                    error_message="Auctioneer not found",
                )
            
            # 5. Commit allocation
            if not dry_run:
                allocation = AllocationRepository.create(
                    recovery_case=case,
                    auctioneer=auctioneer,
                    allocated_by=self.user,
                    allocation_method=strategy_type,
                    remarks=f"Allocated via {strategy_type} strategy",
                )
                
                # Update case status
                case.status = "Allocated"
                case.save(update_fields=["status", "updated_at"])
                
                # Update auctioneer workload
                auctioneer.current_workload += 1
                auctioneer.save(update_fields=["current_workload"])
                
                # Send notification
                self._notify_allocation(case, auctioneer)
                
                result.allocation_id = allocation.id
            
            result.case_id = case.id
            result.auctioneer_id = auctioneer.id
            
            return result
        
        except Exception as e:
            return AllocationResult(
                success=False,
                case_id=case.id,
                error_message=str(e),
            )
    
    @transaction.atomic
    def allocate_cases_batch(
        self,
        cases: List[RecoveryCase],
        strategy_type: str = AllocationStrategyType.AUTOMATIC.value,
        max_per_auctioneer: Optional[int] = None,
        dry_run: bool = False,
    ) -> BatchAllocationResult:
        """
        Allocate multiple cases optimally.
        
        Args:
            cases: List of RecoveryCase instances
            strategy_type: Allocation strategy
            max_per_auctioneer: Limit allocations per auctioneer
            dry_run: If True, validate but don't commit
        
        Returns:
            BatchAllocationResult with summary
        """
        start_time = timezone.now()
        results = []
        successful = 0
        failed = 0
        
        # If many pending cases, might want to use load balancing
        if (len(cases) > self.STRATEGY_CONFIG["use_load_balancing_threshold"] and
            strategy_type == AllocationStrategyType.AUTOMATIC.value):
            strategy_type = AllocationStrategyType.LOAD_BALANCE.value
        
        auctioneer_allocation_count = {}
        
        for case in cases:
            # Check if auctioneer limit exceeded
            if max_per_auctioneer:
                # Simple check - more sophisticated in future
                pass
            
            result = self.allocate_case(
                case,
                strategy_type=strategy_type,
                dry_run=dry_run,
            )
            
            results.append(result)
            
            if result.success:
                successful += 1
                auctioneer_allocation_count[result.auctioneer_id] = \
                    auctioneer_allocation_count.get(result.auctioneer_id, 0) + 1
            else:
                failed += 1
        
        elapsed_ms = (timezone.now() - start_time).total_seconds() * 1000
        
        return BatchAllocationResult(
            successful=successful,
            failed=failed,
            total_evaluated=len(cases),
            allocations=[r for r in results if r.success],
            exceptions=[r for r in results if not r.success],
            execution_time_ms=elapsed_ms,
            summary={
                "allocations_per_auctioneer": auctioneer_allocation_count,
                "success_rate": successful / len(cases) if cases else 0,
            },
        )
    
    @transaction.atomic
    def reallocate_case(
        self,
        allocation: Allocation,
        reason: str = "Performance concerns",
        new_auctioneer_id: Optional[int] = None,
        dry_run: bool = False,
    ) -> AllocationResult:
        """
        Reallocate case to different auctioneer.
        
        Args:
            allocation: Current Allocation instance
            reason: Reason for reallocation
            new_auctioneer_id: Target auctioneer (auto-select if None)
            dry_run: If True, validate but don't commit
        
        Returns:
            AllocationResult with new allocation
        """
        try:
            old_auctioneer = allocation.auctioneer
            case = allocation.recovery_case
            
            # Decrease workload for old auctioneer
            if not dry_run:
                old_auctioneer.current_workload = max(0, old_auctioneer.current_workload - 1)
                old_auctioneer.save(update_fields=["current_workload"])
            
            # Allocate to new auctioneer
            if new_auctioneer_id:
                strategy = ManualAllocationStrategy(new_auctioneer_id)
                strategy_type = AllocationStrategyType.MANUAL.value
            else:
                strategy_type = AllocationStrategyType.AUTOMATIC.value
            
            result = self.allocate_case(
                case,
                strategy_type=strategy_type,
                auctioneer_id=new_auctioneer_id,
                dry_run=dry_run,
            )
            
            if not dry_run and result.success:
                # Mark old allocation as superseded
                allocation.allocation_status = "Superseded"
                allocation.completed_at = timezone.now()
                allocation.remarks = f"Reallocated: {reason}"
                allocation.save(update_fields=["allocation_status", "completed_at", "remarks"])
            
            return result
        
        except Exception as e:
            return AllocationResult(
                success=False,
                error_message=str(e),
            )
    
    def get_allocation_recommendations(
        self,
        case: RecoveryCase,
        top_n: int = 5,
    ) -> List[AuctioneerRecommendation]:
        """
        Get top allocation recommendations for a case.
        
        Args:
            case: RecoveryCase instance
            top_n: Number of top recommendations to return
        
        Returns:
            List of AuctioneerRecommendation objects
        """
        try:
            # Get candidates
            candidates = self._get_candidates(case)
            
            # Filter by constraints
            eligible, violations = self.filter.filter(case, candidates)
            
            if not eligible:
                return []
            
            # Score and rank
            engine = ScoringEngine(case, eligible)
            ranked = engine.rank_candidates()
            
            # Convert to recommendations
            recommendations = []
            for rank, (auctioneer_id, scoring_factors) in enumerate(ranked[:top_n], 1):
                auctioneer = next((a for a in eligible if a.id == auctioneer_id), None)
                if auctioneer:
                    recommendations.append(
                        AuctioneerRecommendation(
                            rank=rank,
                            auctioneer_id=auctioneer.id,
                            auctioneer_name=auctioneer.company_name,
                            score=scoring_factors.composite_score,
                            feasible=True,
                            scoring_factors=scoring_factors,
                        )
                    )
            
            return recommendations
        
        except Exception:
            return []
    
    # ========================================================================
    # Enforcement & Status Methods
    # ========================================================================
    
    def get_enforcement_status(self, case: RecoveryCase) -> Dict:
        """
        Get enforcement status for a case.
        
        Shows what allocation strategies are allowed and required for a case
        based on its priority and current enforcement mode.
        
        Args:
            case: RecoveryCase instance
        
        Returns:
            Dict with enforcement status and allowed strategies
        """
        return self.enforcer.get_enforcement_summary(case)
    
    def get_enforcement_rules(self) -> Dict:
        """Get current enforcement mode and rules."""
        return {
            'enforcement_mode': self.enforcer.enforcement_mode,
            'default_strategy': self.STRATEGY_CONFIG.get('default_strategy', AllocationStrategyType.AUTOMATIC.value),
            'policy': self.STRATEGY_CONFIG.get('enforcement_policy', AllocationEnforcementPolicy.ENFORCE_HIGH_PRIORITY.value),
            'modes_available': [mode.value for mode in AllocationEnforcementMode],
            'policies_available': [policy.value for policy in AllocationEnforcementPolicy],
        }
    
    def verify_dry_run_preview(
        self,
        case: RecoveryCase,
        strategy_type: str = AllocationStrategyType.AUTOMATIC.value,
    ) -> AllocationResult:
        """
        Preview allocation without committing (dry-run only).
        
        Used to show user what automatic allocation would result in before
        allowing them to request a different strategy.
        
        Args:
            case: RecoveryCase instance
            strategy_type: Strategy to preview (default: automatic)
        
        Returns:
            AllocationResult showing dry-run preview
        """
        return self.allocate_case(
            case,
            strategy_type=strategy_type,
            dry_run=True,
            dry_run_preview=True,
        )
    
    # ========================================================================
    # Helper Methods
    # ========================================================================
    
    def _get_candidates(self, case: RecoveryCase) -> List[Auctioneer]:
        """Get candidate auctioneers for case."""
        return list(AuctioneerRepository.available_by_region(case.branch.region))
    
    def _get_strategy(self, strategy_type: str, auctioneer_id: Optional[int]):
        """Get allocation strategy instance."""
        if strategy_type == AllocationStrategyType.MANUAL.value:
            return ManualAllocationStrategy(auctioneer_id)
        elif strategy_type == AllocationStrategyType.PRIORITY.value:
            return PriorityAllocationStrategy()
        else:  # Default to automatic
            return AutomaticAllocationStrategy()
    
    def _make_failure_result(
        self,
        case: RecoveryCase,
        exception_type: AllocationExceptionType,
        violations: List = None,
    ) -> AllocationResult:
        """Create failure result with exception."""
        result = AllocationResult(
            success=False,
            case_id=case.id,
            exception_type=exception_type,
            error_message=exception_type.value,
            constraint_violations=violations or [],
        )
        
        # Log exception
        self._log_allocation_exception(case, exception_type, violations)
        
        return result
    
    def _log_allocation_exception(
        self,
        case: RecoveryCase,
        exception_type: AllocationExceptionType,
        violations: List = None,
    ):
        """Log allocation exception for tracking."""
        # This would create AllocationException record in database
        # Implementation depends on model availability
        pass
    
    def _notify_allocation(self, case: RecoveryCase, auctioneer: Auctioneer):
        """Send notifications after allocation."""
        if self.user:
            NotificationRepository.create(
                recipient=self.user,
                title="Case Allocated",
                message=f"Case {case.case_number} allocated to {auctioneer.company_name}",
                notification_type="Case Allocated",
                priority="High",
                recovery_case=case,
            )
        
        # Notify auctioneer if they have a user account
        # This would require auctioneer-user relationship

