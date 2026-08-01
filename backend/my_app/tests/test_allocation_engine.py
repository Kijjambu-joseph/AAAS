"""
Unit Tests for Allocation Engine
Comprehensive test suite for constraint validators, scoring, and strategies.
"""

import pytest
from datetime import date, timedelta
from decimal import Decimal
from django.test import TestCase
from unittest.mock import MagicMock, patch

from my_app.models import Branch, Auctioneer, RecoveryCase
from my_app.allocation_engine import (
    RegionConstraintValidator,
    LicenseConstraintValidator,
    ActiveStatusConstraintValidator,
    WorkloadConstraintValidator,
    AllocationStatusConstraintValidator,
    CaseEligibilityConstraintValidator,
    EligibilityFilter,
    ScoringEngine,
    ScoringFactors,
    AutomaticAllocationStrategy,
    PriorityAllocationStrategy,
    ManualAllocationStrategy,
)


# ============================================================================
# Test Fixtures
# ============================================================================

class TestConstraintValidators(TestCase):
    """Tests for constraint validators."""
    
    def setUp(self):
        """Create test data."""
        # Create branch
        self.branch = Branch.objects.create(
            branch_code="CBK001",
            branch_name="Kampala Central",
            district="Kampala",
            region="Central",
            address="Kampala, Uganda",
            phone_number="+256123456789",
            email="branch@bank.com",
        )
        
        # Create auctioneer
        self.auctioneer = Auctioneer.objects.create(
            company_name="ABC Auctioneers",
            contact_person="John Doe",
            phone_number="+256123456789",
            email="abc@auction.com",
            license_number="LIC001",
            ura_registration="URA123",
            license_expiry=date.today() + timedelta(days=30),
            region="Central",
            current_workload=5,
            maximum_caseload=15,
            status=True,
        )
        
        # Create recovery case
        self.case = RecoveryCase.objects.create(
            case_number="CASE001",
            loan_account_number="ACC001",
            customer_name="John Customer",
            national_id="12345678",
            phone_number="+256123456789",
            branch=self.branch,
            loan_amount=Decimal('10000.00'),
            outstanding_balance=Decimal('8000.00'),
            collateral_type="Land",
            collateral_description="Plot in Kampala",
            collateral_location="Kampala",
            arrears_days=90,
            priority="Medium",
            status="Pending",
            created_by=None,  # Set to None for test, or create test user
        )
    
    def test_region_constraint_validator_pass(self):
        """Test region validator with matching region."""
        validator = RegionConstraintValidator()
        is_valid, reason = validator.validate(self.case, self.auctioneer)
        self.assertTrue(is_valid)
        self.assertIsNone(reason)
    
    def test_region_constraint_validator_fail(self):
        """Test region validator with mismatched region."""
        self.auctioneer.region = "Eastern"
        validator = RegionConstraintValidator()
        is_valid, reason = validator.validate(self.case, self.auctioneer)
        self.assertFalse(is_valid)
        self.assertIsNotNone(reason)
    
    def test_license_constraint_validator_valid(self):
        """Test license validator with valid license."""
        validator = LicenseConstraintValidator()
        is_valid, reason = validator.validate(self.case, self.auctioneer)
        self.assertTrue(is_valid)
        self.assertIsNone(reason)
    
    def test_license_constraint_validator_expired(self):
        """Test license validator with expired license."""
        self.auctioneer.license_expiry = date.today() - timedelta(days=1)
        validator = LicenseConstraintValidator()
        is_valid, reason = validator.validate(self.case, self.auctioneer)
        self.assertFalse(is_valid)
        self.assertIsNotNone(reason)
    
    def test_active_status_constraint_validator(self):
        """Test active status validator."""
        validator = ActiveStatusConstraintValidator()
        
        # Test active
        is_valid, reason = validator.validate(self.case, self.auctioneer)
        self.assertTrue(is_valid)
        
        # Test inactive
        self.auctioneer.status = False
        is_valid, reason = validator.validate(self.case, self.auctioneer)
        self.assertFalse(is_valid)
    
    def test_workload_constraint_validator(self):
        """Test workload capacity validator."""
        validator = WorkloadConstraintValidator()
        
        # Below capacity
        self.auctioneer.current_workload = 5
        is_valid, reason = validator.validate(self.case, self.auctioneer)
        self.assertTrue(is_valid)
        
        # At capacity
        self.auctioneer.current_workload = 15
        is_valid, reason = validator.validate(self.case, self.auctioneer)
        self.assertFalse(is_valid)
    
    def test_allocation_status_constraint_validator(self):
        """Test case allocation status validator."""
        validator = AllocationStatusConstraintValidator()
        
        # Pending status (ok)
        is_valid, reason = validator.validate(self.case, self.auctioneer)
        self.assertTrue(is_valid)
        
        # Already allocated
        self.case.status = "Allocated"
        is_valid, reason = validator.validate(self.case, self.auctioneer)
        self.assertFalse(is_valid)
    
    def test_case_eligibility_constraint_validator(self):
        """Test case eligibility validator."""
        validator = CaseEligibilityConstraintValidator()
        
        # Eligible status
        is_valid, reason = validator.validate(self.case, self.auctioneer)
        self.assertTrue(is_valid)
        
        # Ineligible status
        self.case.status = "Recovered"
        is_valid, reason = validator.validate(self.case, self.auctioneer)
        self.assertFalse(is_valid)


class TestEligibilityFilter(TestCase):
    """Tests for eligibility filter."""
    
    def setUp(self):
        """Create test data."""
        self.branch = Branch.objects.create(
            branch_code="CBK001",
            branch_name="Kampala Central",
            district="Kampala",
            region="Central",
            address="Kampala",
            phone_number="+256123456789",
            email="branch@bank.com",
        )
        
        # Create multiple auctioneers
        self.auctioneer_eligible = Auctioneer.objects.create(
            company_name="Eligible Auctioneer",
            contact_person="John",
            phone_number="+256123456789",
            email="eligible@auction.com",
            license_number="LIC001",
            ura_registration="URA123",
            license_expiry=date.today() + timedelta(days=30),
            region="Central",
            current_workload=5,
            maximum_caseload=15,
            status=True,
        )
        
        self.auctioneer_dead_license = Auctioneer.objects.create(
            company_name="Inactive License",
            contact_person="Jane",
            phone_number="+256123456789",
            email="inactive@auction.com",
            license_number="LIC002",
            ura_registration="URA123",
            license_expiry=date.today() - timedelta(days=1),
            region="Central",
            current_workload=5,
            maximum_caseload=15,
            status=True,
        )
        
        self.auctioneer_at_capacity = Auctioneer.objects.create(
            company_name="At Capacity",
            contact_person="Bob",
            phone_number="+256123456789",
            email="capacity@auction.com",
            license_number="LIC003",
            ura_registration="URA123",
            license_expiry=date.today() + timedelta(days=30),
            region="Central",
            current_workload=15,
            maximum_caseload=15,
            status=True,
        )
        
        self.case = RecoveryCase.objects.create(
            case_number="CASE001",
            loan_account_number="ACC001",
            customer_name="John",
            national_id="12345678",
            phone_number="+256123456789",
            branch=self.branch,
            loan_amount=Decimal('10000.00'),
            outstanding_balance=Decimal('8000.00'),
            collateral_type="Land",
            collateral_description="Plot",
            collateral_location="Kampala",
            arrears_days=90,
            priority="Medium",
            status="Pending",
            created_by=None,
        )
    
    def test_eligibility_filter_multiple_candidates(self):
        """Test filtering with multiple candidates."""
        candidates = Auctioneer.objects.all()
        filter_engine = EligibilityFilter()
        
        eligible, violations = filter_engine.filter(self.case, candidates)
        
        # Should have 1 eligible (only the fully eligible auctioneer)
        self.assertEqual(len(eligible), 1)
        self.assertEqual(eligible[0].id, self.auctioneer_eligible.id)
        
        # Should have 2 violations (one for each ineligible)
        self.assertEqual(len(violations), 2)


class TestScoringEngine(TestCase):
    """Tests for scoring engine."""
    
    def setUp(self):
        """Create test data."""
        self.branch = Branch.objects.create(
            branch_code="CBK001",
            branch_name="Kampala",
            district="Kampala",
            region="Central",
            address="Kampala",
            phone_number="+256123456789",
            email="branch@bank.com",
        )
        
        self.auctioneer1 = Auctioneer.objects.create(
            company_name="Auctioneer 1",
            contact_person="John",
            phone_number="+256123456789",
            email="a1@auction.com",
            license_number="LIC001",
            ura_registration="URA123",
            license_expiry=date.today() + timedelta(days=30),
            region="Central",
            current_workload=5,
            maximum_caseload=15,
            status=True,
        )
        
        self.auctioneer2 = Auctioneer.objects.create(
            company_name="Auctioneer 2",
            contact_person="Jane",
            phone_number="+256123456789",
            email="a2@auction.com",
            license_number="LIC002",
            ura_registration="URA123",
            license_expiry=date.today() + timedelta(days=30),
            region="Central",
            current_workload=10,  # Higher workload
            maximum_caseload=15,
            status=True,
        )
        
        self.case = RecoveryCase.objects.create(
            case_number="CASE001",
            loan_account_number="ACC001",
            customer_name="John",
            national_id="12345678",
            phone_number="+256123456789",
            branch=self.branch,
            loan_amount=Decimal('10000.00'),
            outstanding_balance=Decimal('8000.00'),
            collateral_type="Land",
            collateral_description="Plot",
            collateral_location="Kampala",
            arrears_days=90,
            priority="Medium",
            status="Pending",
            created_by=None,
        )
    
    def test_workload_score_calculation(self):
        """Test workload score calculation."""
        engine = ScoringEngine(self.case, [self.auctioneer1])
        
        # Auctioneer1: 5/15 capacity used = 66.67% available
        score = engine.calculate_workload_score(self.auctioneer1)
        expected = (10 / 15) * 100  # 66.67
        self.assertAlmostEqual(score, expected, places=1)
    
    def test_ranking_by_workload(self):
        """Test that auctioneers are ranked by workload."""
        candidates = [self.auctioneer1, self.auctioneer2]
        engine = ScoringEngine(self.case, candidates)
        
        ranked = engine.rank_candidates()
        
        # auctioneer1 should be ranked first (lower workload)
        self.assertEqual(ranked[0][0], self.auctioneer1.id)
        self.assertEqual(ranked[1][0], self.auctioneer2.id)
    
    def test_scoring_factors_composite_score(self):
        """Test composite score calculation."""
        factors = ScoringFactors(
            workload_score=100.0,
            priority_score=80.0,
            specialization_score=70.0,
            regional_demand_score=90.0,
            performance_score=85.0,
        )
        
        # Calculate manually:
        # (100 * 0.35) + (80 * 0.25) + (70 * 0.20) + (90 * 0.15) + (85 * 0.05)
        # = 35 + 20 + 14 + 13.5 + 4.25 = 86.75
        expected = 86.75
        self.assertAlmostEqual(factors.composite_score, expected, places=1)


class TestAllocationStrategies(TestCase):
    """Tests for allocation strategies."""
    
    def setUp(self):
        """Create test data."""
        self.branch = Branch.objects.create(
            branch_code="CBK001",
            branch_name="Kampala",
            district="Kampala",
            region="Central",
            address="Kampala",
            phone_number="+256123456789",
            email="branch@bank.com",
        )
        
        self.auctioneer1 = Auctioneer.objects.create(
            company_name="Auctioneer 1",
            contact_person="John",
            phone_number="+256123456789",
            email="a1@auction.com",
            license_number="LIC001",
            ura_registration="URA123",
            license_expiry=date.today() + timedelta(days=30),
            region="Central",
            current_workload=3,
            maximum_caseload=15,
            status=True,
        )
        
        self.case = RecoveryCase.objects.create(
            case_number="CASE001",
            loan_account_number="ACC001",
            customer_name="John",
            national_id="12345678",
            phone_number="+256123456789",
            branch=self.branch,
            loan_amount=Decimal('10000.00'),
            outstanding_balance=Decimal('8000.00'),
            collateral_type="Land",
            collateral_description="Plot",
            collateral_location="Kampala",
            arrears_days=90,
            priority="Medium",
            status="Pending",
            created_by=None,
        )
    
    def test_automatic_allocation_strategy(self):
        """Test automatic allocation strategy."""
        strategy = AutomaticAllocationStrategy()
        result = strategy.allocate(self.case, [self.auctioneer1])
        
        self.assertIsNotNone(result)
        auctioneer_id, alloc_result = result
        self.assertTrue(alloc_result.success)
        self.assertEqual(auctioneer_id, self.auctioneer1.id)
    
    def test_manual_allocation_strategy(self):
        """Test manual allocation strategy."""
        strategy = ManualAllocationStrategy(self.auctioneer1.id)
        result = strategy.allocate(self.case, [self.auctioneer1])
        
        self.assertIsNotNone(result)
        auctioneer_id, alloc_result = result
        self.assertTrue(alloc_result.success)
        self.assertEqual(auctioneer_id, self.auctioneer1.id)
    
    def test_manual_allocation_strategy_wrong_auctioneer(self):
        """Test manual strategy with auctioneer not in eligible list."""
        # Create another auctioneer
        auctioneer2 = Auctioneer.objects.create(
            company_name="Auctioneer 2",
            contact_person="Jane",
            phone_number="+256123456789",
            email="a2@auction.com",
            license_number="LIC002",
            ura_registration="URA123",
            license_expiry=date.today() + timedelta(days=30),
            region="Central",
            current_workload=5,
            maximum_caseload=15,
            status=True,
        )
        
        strategy = ManualAllocationStrategy(auctioneer2.id)
        result = strategy.allocate(self.case, [self.auctioneer1])
        
        # Should return None (not found in eligible list)
        self.assertIsNone(result)


# ============================================================================
# Integration Tests
# ============================================================================

class TestAllocationIntegration(TestCase):
    """Integration tests for complete allocation flow."""
    
    def setUp(self):
        """Create test data."""
        self.branch = Branch.objects.create(
            branch_code="CBK001",
            branch_name="Kampala",
            district="Kampala",
            region="Central",
            address="Kampala",
            phone_number="+256123456789",
            email="branch@bank.com",
        )
        
        self.auctioneer = Auctioneer.objects.create(
            company_name="Test Auctioneer",
            contact_person="John",
            phone_number="+256123456789",
            email="test@auction.com",
            license_number="LIC001",
            ura_registration="URA123",
            license_expiry=date.today() + timedelta(days=30),
            region="Central",
            current_workload=0,
            maximum_caseload=15,
            status=True,
        )
        
        self.case = RecoveryCase.objects.create(
            case_number="CASE001",
            loan_account_number="ACC001",
            customer_name="John",
            national_id="12345678",
            phone_number="+256123456789",
            branch=self.branch,
            loan_amount=Decimal('10000.00'),
            outstanding_balance=Decimal('8000.00'),
            collateral_type="Land",
            collateral_description="Plot",
            collateral_location="Kampala",
            arrears_days=90,
            priority="Medium",
            status="Pending",
            created_by=None,
        )
    
    def test_end_to_end_allocation_flow(self):
        """Test complete allocation flow from constraint validation to strategy."""
        candidates = Auctioneer.objects.filter(region="Central")
        
        # 1. Filter by constraints
        eligibility_filter = EligibilityFilter()
        eligible, violations = eligibility_filter.filter(self.case, candidates)
        self.assertEqual(len(eligible), 1)
        self.assertEqual(len(violations), 0)
        
        # 2. Score and rank
        engine = ScoringEngine(self.case, eligible)
        ranked = engine.rank_candidates()
        self.assertEqual(len(ranked), 1)
        
        # 3. Apply strategy
        strategy = AutomaticAllocationStrategy()
        result = strategy.allocate(self.case, eligible)
        
        self.assertIsNotNone(result)
        auctioneer_id, alloc_result = result
        self.assertTrue(alloc_result.success)
        self.assertEqual(auctioneer_id, self.auctioneer.id)


if __name__ == '__main__':
    pytest.main([__file__])

