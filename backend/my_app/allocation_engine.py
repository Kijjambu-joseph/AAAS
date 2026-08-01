"""
Allocation Engine - Core Components
Intelligent case allocation system with multiple strategies and constraints.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime, date
from decimal import Decimal
from enum import Enum
from typing import List, Optional, Dict, Tuple
from django.db.models import QuerySet, F, Q
from django.utils import timezone


class AllocationStrategyType(str, Enum):
    """Available allocation strategies."""
    AUTOMATIC = "automatic"
    PRIORITY = "priority"
    LOAD_BALANCE = "load_balance"
    SPECIALIZATION = "specialization"
    MANUAL = "manual"
    BATCH = "batch"


class ConstraintViolationType(str, Enum):
    """Types of constraint violations."""
    REGION_MISMATCH = "region_mismatch"
    LICENSE_EXPIRED = "license_expired"
    INACTIVE_AUCTIONEER = "inactive_auctioneer"
    AT_CAPACITY = "at_capacity"
    ALREADY_ALLOCATED = "already_allocated"
    INVALID_CASE_STATUS = "invalid_case_status"


class AllocationExceptionType(str, Enum):
    """Types of allocation exceptions."""
    NO_ELIGIBLE_AUCTIONEER = "NO_ELIGIBLE_AUCTIONEER"
    ALL_AT_CAPACITY = "ALL_AUCTIONEERS_AT_CAPACITY"
    NO_ALLOCATION_POSSIBLE = "NO_ALLOCATION_POSSIBLE"
    MANUAL_EXCEPTION = "MANUAL_EXCEPTION"
    QUALITY_THRESHOLD = "QUALITY_THRESHOLD"


class AllocationEnforcementMode(str, Enum):
    """Enforcement modes for auto-allocation."""
    PERMISSIVE = "permissive"        # Auto allocation is default but manual is allowed
    BALANCED = "balanced"             # Force auto for HIGH/CRITICAL, allow manual for others
    STRICT = "strict"                 # Force auto allocation for all cases
    ADVISORY = "advisory"             # Show recommendations but allow override


class AllocationEnforcementPolicy(str, Enum):
    """Enforcement policies by case priority."""
    NO_ENFORCEMENT = "no_enforcement"
    ENFORCE_HIGH_PRIORITY = "enforce_high_priority"      # Force auto for High/Critical
    ENFORCE_CRITICAL_ONLY = "enforce_critical_only"      # Force auto only for Critical
    ENFORCE_ALL = "enforce_all"                           # Force auto for all


# ============================================================================
# Data Classes for Results & Recommendations
# ============================================================================

@dataclass
class ConstraintViolation:
    """Represents a single constraint violation."""
    violation_type: ConstraintViolationType
    auctioneer_id: int
    auctioneer_name: str
    description: str


@dataclass
class ScoringFactors:
    """Individual scoring factors with values."""
    workload_score: float
    priority_score: float
    specialization_score: float
    regional_demand_score: float
    performance_score: float
    
    @property
    def composite_score(self) -> float:
        """Calculate weighted composite score."""
        weights = {
            'workload': 0.35,
            'priority': 0.25,
            'specialization': 0.20,
            'regional_demand': 0.15,
            'performance': 0.05,
        }
        return (
            self.workload_score * weights['workload'] +
            self.priority_score * weights['priority'] +
            self.specialization_score * weights['specialization'] +
            self.regional_demand_score * weights['regional_demand'] +
            self.performance_score * weights['performance']
        )
    
    def to_dict(self) -> Dict[str, float]:
        """Convert to dictionary."""
        return {
            'workload': self.workload_score,
            'priority': self.priority_score,
            'specialization': self.specialization_score,
            'regional_demand': self.regional_demand_score,
            'performance': self.performance_score,
        }


@dataclass
class AuctioneerRecommendation:
    """Recommendation for case allocation."""
    rank: int
    auctioneer_id: int
    auctioneer_name: str
    score: float
    feasible: bool
    scoring_factors: ScoringFactors
    violation_reasons: List[str] = None
    
    def __post_init__(self):
        if self.violation_reasons is None:
            self.violation_reasons = []


@dataclass
class AllocationResult:
    """Result of a single case allocation."""
    success: bool
    allocation_id: Optional[int] = None
    auctioneer_id: Optional[int] = None
    case_id: Optional[int] = None
    score: Optional[float] = None
    ranking_position: Optional[int] = None
    scoring_factors: Optional[ScoringFactors] = None
    strategy_used: Optional[str] = None
    error_message: Optional[str] = None
    exception_type: Optional[AllocationExceptionType] = None
    constraint_violations: List[ConstraintViolation] = None
    # Enforcement tracking
    enforcement_blocked: bool = False
    enforcement_reason: Optional[str] = None
    allowed_strategies: List[str] = None
    requires_dry_run: bool = False
    
    def __post_init__(self):
        if self.constraint_violations is None:
            self.constraint_violations = []
        if self.allowed_strategies is None:
            self.allowed_strategies = []


@dataclass
class BatchAllocationResult:
    """Result of batch allocation operation."""
    successful: int
    failed: int
    total_evaluated: int
    allocations: List[AllocationResult]
    exceptions: List[AllocationResult]
    execution_time_ms: float
    summary: Dict = None


@dataclass
class EnforcementDecision:
    """Decision outcome from enforcement validation."""
    is_enforced: bool
    enforcement_reason: Optional[str] = None
    allowed_strategies: List[str] = None
    requires_dry_run: bool = False
    reason_code: Optional[str] = None
    
    def __post_init__(self):
        if self.allowed_strategies is None:
            self.allowed_strategies = []


@dataclass
class EnforcementResult:
    """Result of enforcement validation check."""
    can_proceed: bool
    enforcement_mode: str
    policy_applied: str
    decision: EnforcementDecision
    recommended_strategy: str = "automatic"
    message: Optional[str] = None


# ============================================================================
# Constraint Validators
# ============================================================================

class ConstraintValidator(ABC):
    """Abstract base for constraint validators."""
    
    @abstractmethod
    def validate(self, case, auctioneer) -> Tuple[bool, Optional[str]]:
        """
        Validate constraint.
        
        Returns:
            Tuple[bool, Optional[str]]: (is_valid, violation_reason)
        """
        pass
    
    @abstractmethod
    def violation_type(self) -> ConstraintViolationType:
        """Return the type of violation this validator checks."""
        pass


class RegionConstraintValidator(ConstraintValidator):
    """Validates region matching between case and auctioneer."""
    
    def validate(self, case, auctioneer) -> Tuple[bool, Optional[str]]:
        case_region = case.branch.region
        auctioneer_region = auctioneer.region
        auctioneer_regions = auctioneer.regions or []
        
        # Check primary region or additional regions
        is_valid = (
            case_region == auctioneer_region or
            case_region in auctioneer_regions
        )
        
        reason = None if is_valid else f"Auctioneer region '{auctioneer_region}' != case region '{case_region}'"
        return is_valid, reason
    
    def violation_type(self) -> ConstraintViolationType:
        return ConstraintViolationType.REGION_MISMATCH


class LicenseConstraintValidator(ConstraintValidator):
    """Validates auctioneer license validity."""
    
    def validate(self, case, auctioneer) -> Tuple[bool, Optional[str]]:
        is_valid = auctioneer.license_expiry >= date.today()
        reason = None if is_valid else f"License expired on {auctioneer.license_expiry}"
        return is_valid, reason
    
    def violation_type(self) -> ConstraintViolationType:
        return ConstraintViolationType.LICENSE_EXPIRED


class ActiveStatusConstraintValidator(ConstraintValidator):
    """Validates auctioneer is active."""
    
    def validate(self, case, auctioneer) -> Tuple[bool, Optional[str]]:
        is_valid = auctioneer.status is True
        reason = None if is_valid else "Auctioneer is inactive"
        return is_valid, reason
    
    def violation_type(self) -> ConstraintViolationType:
        return ConstraintViolationType.INACTIVE_AUCTIONEER


class WorkloadConstraintValidator(ConstraintValidator):
    """Validates auctioneer has capacity."""
    
    def validate(self, case, auctioneer) -> Tuple[bool, Optional[str]]:
        has_capacity = auctioneer.current_workload < auctioneer.maximum_caseload
        reason = None if has_capacity else (
            f"At capacity ({auctioneer.current_workload}/{auctioneer.maximum_caseload})"
        )
        return has_capacity, reason
    
    def violation_type(self) -> ConstraintViolationType:
        return ConstraintViolationType.AT_CAPACITY


class AllocationStatusConstraintValidator(ConstraintValidator):
    """Validates case is not already allocated."""
    
    def validate(self, case, auctioneer) -> Tuple[bool, Optional[str]]:
        is_valid = case.status != "Allocated"
        reason = None if is_valid else "Case is already allocated"
        return is_valid, reason
    
    def violation_type(self) -> ConstraintViolationType:
        return ConstraintViolationType.ALREADY_ALLOCATED


class CaseEligibilityConstraintValidator(ConstraintValidator):
    """Validates case is in allocatable status."""
    
    ELIGIBLE_STATUSES = ["Pending", "Unallocatable"]
    
    def validate(self, case, auctioneer) -> Tuple[bool, Optional[str]]:
        is_valid = case.status in self.ELIGIBLE_STATUSES
        reason = None if is_valid else f"Case status '{case.status}' is not eligible for allocation"
        return is_valid, reason
    
    def violation_type(self) -> ConstraintViolationType:
        return ConstraintViolationType.INVALID_CASE_STATUS


# ============================================================================
# Eligibility Filter
# ============================================================================

class EligibilityFilter:
    """Filters eligible auctioneers based on constraints."""
    
    def __init__(self, validators: List[ConstraintValidator] = None):
        """
        Initialize filter with validators.
        
        Args:
            validators: List of constraint validators. If None, uses all default validators.
        """
        if validators is None:
            validators = [
                RegionConstraintValidator(),
                LicenseConstraintValidator(),
                ActiveStatusConstraintValidator(),
                WorkloadConstraintValidator(),
                AllocationStatusConstraintValidator(),
                CaseEligibilityConstraintValidator(),
            ]
        self.validators = validators
    
    def filter(self, case, candidates: QuerySet) -> Tuple[QuerySet, List[ConstraintViolation]]:
        """
        Filter eligible candidates.
        
        Args:
            case: RecoveryCase instance
            candidates: QuerySet of Auctioneer candidates
        
        Returns:
            Tuple[filtered_candidates, violations_list]
        """
        violations = []
        eligible = list(candidates)
        
        for auctioneer in candidates:
            for validator in self.validators:
                is_valid, reason = validator.validate(case, auctioneer)
                
                if not is_valid:
                    violations.append(
                        ConstraintViolation(
                            violation_type=validator.violation_type(),
                            auctioneer_id=auctioneer.id,
                            auctioneer_name=auctioneer.company_name,
                            description=reason,
                        )
                    )
                    eligible.remove(auctioneer)
                    break  # One violation is enough to eliminate this candidate
        
        return eligible, violations


# ============================================================================
# Scoring Engine
# ============================================================================

class ScoringEngine:
    """Calculates composite scores for eligible candidates."""
    
    def __init__(self, case, auctioneers: List, context: Dict = None):
        """
        Initialize scoring engine.
        
        Args:
            case: RecoveryCase instance
            auctioneers: List of eligible Auctioneer instances
            context: Optional context data (pre-computed metrics, etc.)
        """
        self.case = case
        self.auctioneers = auctioneers
        self.context = context or {}
    
    def calculate_workload_score(self, auctioneer) -> float:
        """
        Calculate workload balance score (0-100).
        
        Lower workload = higher score.
        Score = (available_capacity / max_capacity) * 100
        """
        if auctioneer.maximum_caseload == 0:
            return 0.0
        
        available = auctioneer.maximum_caseload - auctioneer.current_workload
        score = (available / auctioneer.maximum_caseload) * 100
        return min(100.0, max(0.0, score))
    
    def calculate_priority_score(self, auctioneer) -> float:
        """
        Calculate case priority alignment score (0-100).
        
        Based on auctioneer's historical performance at this priority level.
        Falls back to 50 if no historical data.
        """
        # TODO: Query from AllocationMetrics when available
        # For now, return 50 (neutral)
        # Future: success_rate_by_priority = auctioneer.metrics.success_by_priority
        return 50.0
    
    def calculate_specialization_score(self, auctioneer) -> float:
        """
        Calculate collateral specialization score (0-100).
        
        Based on whether auctioneer specializes in case's collateral type.
        """
        # TODO: Query from AuctioneerSpecialization when available
        # For now, return 50 (neutral)
        # Future: specializations = auctioneer.specializations.all()
        return 50.0
    
    def calculate_regional_demand_score(self, auctioneer) -> float:
        """
        Calculate regional demand balancing score (0-100).
        
        Higher pending cases in region = lower score (help balance).
        """
        if not hasattr(auctioneer, 'branch'):
            return 50.0
        
        region = auctioneer.region or self.case.branch.region
        
        # TODO: Optimize with pre-computed regional loads in context
        from .models import RecoveryCase  # Avoid circular imports
        pending_in_region = RecoveryCase.objects.filter(
            branch__region=region,
            status__in=["Pending", "Allocated"]
        ).count()
        
        # Normalize to 0-100 scale
        # Assume max load of 100 cases per region for normalization
        score = max(0.0, 100.0 - (pending_in_region * 2))
        return min(100.0, score)
    
    def calculate_performance_score(self, auctioneer) -> float:
        """
        Calculate performance metrics score (0-100).
        
        Based on completion rate and recovery percentage.
        """
        # TODO: Query from AllocationMetrics when available
        # For now, return 50 (neutral)
        # Future: 
        # metrics = auctioneer.metrics
        # completion_rate = metrics.completion_rate * 100  # Convert to 0-100
        return 50.0
    
    def score_candidate(self, auctioneer) -> ScoringFactors:
        """Calculate all scoring factors for a candidate."""
        return ScoringFactors(
            workload_score=self.calculate_workload_score(auctioneer),
            priority_score=self.calculate_priority_score(auctioneer),
            specialization_score=self.calculate_specialization_score(auctioneer),
            regional_demand_score=self.calculate_regional_demand_score(auctioneer),
            performance_score=self.calculate_performance_score(auctioneer),
        )
    
    def rank_candidates(self) -> List[Tuple[int, ScoringFactors]]:
        """
        Rank all candidates by composite score.
        
        Returns:
            List of (auctioneer_id, scoring_factors) tuples, sorted by score descending.
        """
        scored = []
        for auctioneer in self.auctioneers:
            factors = self.score_candidate(auctioneer)
            scored.append((auctioneer.id, factors))
        
        # Sort by composite score descending
        scored.sort(key=lambda x: x[1].composite_score, reverse=True)
        return scored


# ============================================================================
# Allocation Strategy
# ============================================================================

class AllocationStrategy(ABC):
    """Abstract base for allocation strategies."""
    
    @abstractmethod
    def allocate(self, case, eligible_candidates: List) -> Optional[Tuple[int, AllocationResult]]:
        """
        Execute allocation strategy.
        
        Args:
            case: RecoveryCase instance
            eligible_candidates: List of eligible Auctioneer instances
        
        Returns:
            Tuple[auctioneer_id, result] or None if allocation not possible
        """
        pass


class AutomaticAllocationStrategy(AllocationStrategy):
    """
    Selects highest-scored candidate automatically.
    
    Uses scoring engine weighted factors.
    """
    
    def allocate(self, case, eligible_candidates: List) -> Optional[Tuple[int, AllocationResult]]:
        if not eligible_candidates:
            return None
        
        engine = ScoringEngine(case, eligible_candidates)
        ranked = engine.rank_candidates()
        
        if not ranked:
            return None
        
        best_auctioneer_id, scoring_factors = ranked[0]
        
        return best_auctioneer_id, AllocationResult(
            success=True,
            auctioneer_id=best_auctioneer_id,
            score=scoring_factors.composite_score,
            ranking_position=1,
            scoring_factors=scoring_factors,
            strategy_used=AllocationStrategyType.AUTOMATIC.value,
        )


class PriorityAllocationStrategy(AllocationStrategy):
    """
    Prioritizes case priority in scoring.
    
    Allocates high-priority cases to best performers.
    """
    
    def allocate(self, case, eligible_candidates: List) -> Optional[Tuple[int, AllocationResult]]:
        if not eligible_candidates:
            return None
        
        # For critical cases, use only top performers
        if case.priority == "Critical":
            # Filter to top 30% by performance
            eligible_candidates = eligible_candidates[:max(1, len(eligible_candidates) // 3)]
        
        engine = ScoringEngine(case, eligible_candidates)
        ranked = engine.rank_candidates()
        
        if not ranked:
            return None
        
        best_auctioneer_id, scoring_factors = ranked[0]
        
        return best_auctioneer_id, AllocationResult(
            success=True,
            auctioneer_id=best_auctioneer_id,
            score=scoring_factors.composite_score,
            ranking_position=1,
            scoring_factors=scoring_factors,
            strategy_used=AllocationStrategyType.PRIORITY.value,
        )


class ManualAllocationStrategy(AllocationStrategy):
    """
    Uses manually specified auctioneer.
    
    Still validates constraints and calculates scoring for reference.
    """
    
    def __init__(self, auctioneer_id: int):
        self.auctioneer_id = auctioneer_id
    
    def allocate(self, case, eligible_candidates: List) -> Optional[Tuple[int, AllocationResult]]:
        # Check if specified auctioneer is in eligible list
        auctioneer = next((a for a in eligible_candidates if a.id == self.auctioneer_id), None)
        
        if not auctioneer:
            return None
        
        engine = ScoringEngine(case, eligible_candidates)
        scoring_factors = engine.score_candidate(auctioneer)
        
        # Find ranking position
        ranked = engine.rank_candidates()
        ranking_position = next((i + 1 for i, (aid, _) in enumerate(ranked) if aid == self.auctioneer_id), None)
        
        return self.auctioneer_id, AllocationResult(
            success=True,
            auctioneer_id=self.auctioneer_id,
            score=scoring_factors.composite_score,
            ranking_position=ranking_position,
            scoring_factors=scoring_factors,
            strategy_used=AllocationStrategyType.MANUAL.value,
        )


# ============================================================================
# Allocation Enforcement System
# ============================================================================

class AllocationEnforcer:
    """
    Enforces auto-allocation policies and validates allocation decisions.
    
    Supports multiple enforcement modes:
    - PERMISSIVE: Auto is default, manual allowed
    - BALANCED: Force auto for High/Critical, manual for others
    - STRICT: Force auto for all cases
    - ADVISORY: Show recommendations, allow override
    """
    
    # Priority levels that trigger enforcement
    HIGH_PRIORITY_LEVELS = ["High", "CRITICAL", "Critical"]
    CRITICAL_PRIORITY_LEVELS = ["CRITICAL", "Critical"]
    
    def __init__(self, enforcement_mode: str = AllocationEnforcementMode.PERMISSIVE.value):
        """Initialize enforcer with enforcement mode."""
        self.enforcement_mode = enforcement_mode
    
    def validate_allocation_strategy(
        self,
        case,
        requested_strategy: str,
        policy: str = AllocationEnforcementPolicy.ENFORCE_HIGH_PRIORITY.value,
        dry_run_completed: bool = False,
    ) -> EnforcementResult:
        """
        Validate if requested allocation strategy is allowed.
        
        Args:
            case: RecoveryCase instance
            requested_strategy: Requested allocation strategy
            policy: Enforcement policy to apply
            dry_run_completed: Whether dry-run has been completed for manual strategy
        
        Returns:
            EnforcementResult with decision and rationale
        """
        case_priority = getattr(case, 'priority', 'Normal')
        is_critical = case_priority in self.CRITICAL_PRIORITY_LEVELS
        is_high = case_priority in self.HIGH_PRIORITY_LEVELS
        
        # PERMISSIVE Mode: Auto is default, manual always allowed
        if self.enforcement_mode == AllocationEnforcementMode.PERMISSIVE.value:
            decision = EnforcementDecision(
                is_enforced=False,
                enforcement_reason="Permissive enforcement mode - all strategies allowed",
                allowed_strategies=list(AllocationStrategyType.__members__.keys()),
                reason_code="PERMISSIVE_MODE",
            )
            return EnforcementResult(
                can_proceed=True,
                enforcement_mode=self.enforcement_mode,
                policy_applied="None",
                decision=decision,
                recommended_strategy=AllocationStrategyType.AUTOMATIC.value,
                message="All strategies permitted in permissive mode",
            )
        
        # ADVISORY Mode: Recommend automatic, allow override
        if self.enforcement_mode == AllocationEnforcementMode.ADVISORY.value:
            if requested_strategy == AllocationStrategyType.MANUAL.value and not dry_run_completed:
                decision = EnforcementDecision(
                    is_enforced=True,
                    enforcement_reason="Manual strategy requires dry-run preview first",
                    allowed_strategies=[AllocationStrategyType.AUTOMATIC.value],
                    requires_dry_run=True,
                    reason_code="DRY_RUN_REQUIRED",
                )
                return EnforcementResult(
                    can_proceed=False,
                    enforcement_mode=self.enforcement_mode,
                    policy_applied="DRY_RUN_REQUIREMENT",
                    decision=decision,
                    recommended_strategy=AllocationStrategyType.AUTOMATIC.value,
                    message="Dry-run preview required before manual allocation",
                )
            
            decision = EnforcementDecision(
                is_enforced=False,
                enforcement_reason="Advisory mode - recommendations shown but override allowed",
                allowed_strategies=list(AllocationStrategyType.__members__.keys()),
                requires_dry_run=(requested_strategy == AllocationStrategyType.MANUAL.value),
                reason_code="ADVISORY_MODE",
            )
            return EnforcementResult(
                can_proceed=True,
                enforcement_mode=self.enforcement_mode,
                policy_applied="ADVISORY",
                decision=decision,
                recommended_strategy=AllocationStrategyType.AUTOMATIC.value,
                message="Advisory mode: automatic allocation is recommended",
            )
        
        # BALANCED Mode: Force auto for High/Critical based on policy
        if self.enforcement_mode == AllocationEnforcementMode.BALANCED.value:
            enforce_critical = policy in [
                AllocationEnforcementPolicy.ENFORCE_CRITICAL_ONLY.value,
                AllocationEnforcementPolicy.ENFORCE_ALL.value,
            ]
            enforce_high = policy == AllocationEnforcementPolicy.ENFORCE_HIGH_PRIORITY.value
            
            should_enforce = (
                (is_critical and enforce_critical) or
                (is_high and enforce_high and not enforce_critical)
            )
            
            if should_enforce and requested_strategy != AllocationStrategyType.AUTOMATIC.value:
                priority_text = f"{case_priority} priority"
                decision = EnforcementDecision(
                    is_enforced=True,
                    enforcement_reason=f"Auto-allocation enforced for {priority_text} cases",
                    allowed_strategies=[AllocationStrategyType.AUTOMATIC.value],
                    reason_code="PRIORITY_ENFORCEMENT",
                )
                return EnforcementResult(
                    can_proceed=False,
                    enforcement_mode=self.enforcement_mode,
                    policy_applied=f"ENFORCE_{case_priority.upper()}",
                    decision=decision,
                    recommended_strategy=AllocationStrategyType.AUTOMATIC.value,
                    message=f"Automatic allocation is required for {priority_text} cases",
                )
            
            # For other cases in BALANCED, require dry-run before manual
            if requested_strategy == AllocationStrategyType.MANUAL.value and not dry_run_completed:
                decision = EnforcementDecision(
                    is_enforced=True,
                    enforcement_reason="Manual allocation requires dry-run preview",
                    allowed_strategies=[AllocationStrategyType.AUTOMATIC.value],
                    requires_dry_run=True,
                    reason_code="DRY_RUN_REQUIRED",
                )
                return EnforcementResult(
                    can_proceed=False,
                    enforcement_mode=self.enforcement_mode,
                    policy_applied="DRY_RUN_REQUIREMENT",
                    decision=decision,
                    recommended_strategy=AllocationStrategyType.AUTOMATIC.value,
                    message="Dry-run required before manual allocation",
                )
            
            decision = EnforcementDecision(
                is_enforced=False,
                enforcement_reason="Strategy allowed in balanced mode",
                allowed_strategies=[
                    AllocationStrategyType.AUTOMATIC.value,
                    AllocationStrategyType.PRIORITY.value,
                    AllocationStrategyType.LOAD_BALANCE.value,
                    AllocationStrategyType.MANUAL.value,
                ],
                requires_dry_run=(requested_strategy == AllocationStrategyType.MANUAL.value),
                reason_code="BALANCED_MODE_ALLOWED",
            )
            return EnforcementResult(
                can_proceed=True,
                enforcement_mode=self.enforcement_mode,
                policy_applied="BALANCED",
                decision=decision,
                recommended_strategy=AllocationStrategyType.AUTOMATIC.value,
                message="Strategy allowed in balanced mode",
            )
        
        # STRICT Mode: Force automatic for all cases
        if self.enforcement_mode == AllocationEnforcementMode.STRICT.value:
            if requested_strategy != AllocationStrategyType.AUTOMATIC.value:
                decision = EnforcementDecision(
                    is_enforced=True,
                    enforcement_reason="Automatic allocation is mandatory in strict mode",
                    allowed_strategies=[AllocationStrategyType.AUTOMATIC.value],
                    reason_code="STRICT_MODE_ENFORCEMENT",
                )
                return EnforcementResult(
                    can_proceed=False,
                    enforcement_mode=self.enforcement_mode,
                    policy_applied="STRICT",
                    decision=decision,
                    recommended_strategy=AllocationStrategyType.AUTOMATIC.value,
                    message="Automatic allocation is mandatory in strict mode",
                )
            
            decision = EnforcementDecision(
                is_enforced=True,
                enforcement_reason="All allocations must be automatic in strict mode",
                allowed_strategies=[AllocationStrategyType.AUTOMATIC.value],
                reason_code="STRICT_MODE",
            )
            return EnforcementResult(
                can_proceed=True,
                enforcement_mode=self.enforcement_mode,
                policy_applied="STRICT",
                decision=decision,
                recommended_strategy=AllocationStrategyType.AUTOMATIC.value,
                message="All allocations are automatic in strict mode",
            )
        
        # Default: Allow with recommendation
        decision = EnforcementDecision(
            is_enforced=False,
            enforcement_reason="No specific enforcement applied",
            allowed_strategies=list(AllocationStrategyType.__members__.keys()),
            reason_code="DEFAULT",
        )
        return EnforcementResult(
            can_proceed=True,
            enforcement_mode=self.enforcement_mode,
            policy_applied="NONE",
            decision=decision,
            recommended_strategy=AllocationStrategyType.AUTOMATIC.value,
            message="Default enforcement: automatic allocation recommended",
        )
    
    def get_enforcement_summary(self, case) -> Dict:
        """Get enforcement rules summary for a case."""
        case_priority = getattr(case, 'priority', 'Normal')
        
        return {
            'enforcement_mode': self.enforcement_mode,
            'case_priority': case_priority,
            'auto_is_default': True,
            'manual_requires_dry_run': self.enforcement_mode in [
                AllocationEnforcementMode.BALANCED.value,
                AllocationEnforcementMode.ADVISORY.value,
            ],
            'auto_is_mandatory': self.enforcement_mode == AllocationEnforcementMode.STRICT.value,
            'priority_enforcement': {
                'critical': case_priority in self.CRITICAL_PRIORITY_LEVELS,
                'high': case_priority in self.HIGH_PRIORITY_LEVELS,
            },
        }

