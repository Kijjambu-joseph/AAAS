from django.test import TestCase
from django.utils import timezone
from django.contrib.auth import get_user_model
from datetime import date, timedelta

from my_app.models import Branch, Auctioneer, RecoveryCase
from my_app.strategies import AutomaticAllocationStrategy

User = get_user_model()


class AllocationStrategyTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="tester", password="pass")
        self.branch = Branch.objects.create(
            branch_code="CEN01",
            branch_name="Centenary Main",
            district="Kampala",
            region="Central",
            address="Test address",
            phone_number="+256700000000",
            email="branch@example.test",
        )

        today = date.today()
        self.a1 = Auctioneer.objects.create(
            company_name="Alpha Recovery",
            contact_person="Alice",
            phone_number="+256111",
            email="alpha@example.test",
            license_number="LIC-001",
            license_expiry=today + timedelta(days=365),
            region="Central",
            office_address="Addr",
            current_workload=2,
            status=True,
        )

        self.a2 = Auctioneer.objects.create(
            company_name="Beta Recovery",
            contact_person="Bob",
            phone_number="+256222",
            email="beta@example.test",
            license_number="LIC-002",
            license_expiry=today + timedelta(days=365),
            region="Central",
            office_address="Addr",
            current_workload=1,
            status=True,
        )

        self.case = RecoveryCase.objects.create(
            case_number="TC-0001",
            loan_account_number="LN-0001",
            customer_name="Client A",
            national_id="10001",
            phone_number="+256333",
            branch=self.branch,
            loan_amount=100000.00,
            outstanding_balance=80000.00,
            collateral_type="Land",
            collateral_description="Plot",
            collateral_location="Kampala",
            arrears_days=120,
            created_by=self.user,
        )

    def test_automatic_strategy_selects_lowest_workload(self):
        strat = AutomaticAllocationStrategy()
        chosen = strat.allocate(self.case)
        # Beta had workload 1, Alpha had 2 — Beta should be chosen
        self.assertIsNotNone(chosen)
        self.assertEqual(chosen.company_name, "Beta Recovery")
