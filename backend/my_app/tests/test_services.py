from django.test import TestCase
from django.contrib.auth import get_user_model
from datetime import date, timedelta

from my_app.models import Branch, Auctioneer, RecoveryCase, Allocation
from my_app.services import AllocationService

User = get_user_model()


class AllocationServiceTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="svc_user", password="pass")
        self.branch = Branch.objects.create(
            branch_code="CEN02",
            branch_name="Centenary Branch",
            district="Kampala",
            region="Central",
            address="Addr",
            phone_number="+256700",
            email="branch2@example.test",
        )
        today = date.today()
        self.auctioneer = Auctioneer.objects.create(
            company_name="Gamma Recovery",
            contact_person="Gina",
            phone_number="+256444",
            email="gamma@example.test",
            license_number="LIC-003",
            license_expiry=today + timedelta(days=365),
            region="Central",
            office_address="Addr",
            current_workload=0,
            status=True,
        )

        self.case = RecoveryCase.objects.create(
            case_number="TC-0002",
            loan_account_number="LN-0002",
            customer_name="Client B",
            national_id="20002",
            phone_number="+256555",
            branch=self.branch,
            loan_amount=50000.00,
            outstanding_balance=45000.00,
            collateral_type="Motor Vehicle",
            collateral_description="Car",
            collateral_location="Kampala",
            arrears_days=45,
            created_by=self.user,
        )

    def test_allocate_case_creates_allocation_and_updates_workload(self):
        svc = AllocationService()
        allocation = svc.allocate_case(self.case, self.user, auctioneer_id=self.auctioneer.id, method="Manual")
        self.assertIsInstance(allocation, Allocation)
        self.case.refresh_from_db()
        self.auctioneer.refresh_from_db()
        self.assertEqual(self.case.status, "Allocated")
        self.assertEqual(self.auctioneer.current_workload, 1)
