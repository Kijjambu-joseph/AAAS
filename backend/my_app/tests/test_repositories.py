from django.test import TestCase
from datetime import date, timedelta

from my_app.models import Branch, Auctioneer
from my_app.repositories import AuctioneerRepository


class RepositoryTests(TestCase):
    def setUp(self):
        self.branch = Branch.objects.create(
            branch_code="CEN03",
            branch_name="CentBranch",
            district="Kampala",
            region="Central",
            address="Addr",
            phone_number="+256700",
            email="branch3@example.test",
        )
        today = date.today()
        Auctioneer.objects.create(
            company_name="Active One",
            contact_person="A",
            phone_number="+2561",
            email="act1@example.test",
            license_number="LIC-10",
            license_expiry=today + timedelta(days=10),
            region="Central",
            office_address="Addr",
            current_workload=0,
            status=True,
        )
        Auctioneer.objects.create(
            company_name="Expired",
            contact_person="E",
            phone_number="+2562",
            email="exp@example.test",
            license_number="LIC-11",
            license_expiry=today - timedelta(days=1),
            region="Central",
            office_address="Addr",
            current_workload=0,
            status=True,
        )

    def test_available_by_region_excludes_expired(self):
        qs = AuctioneerRepository.available_by_region("Central")
        names = [a.company_name for a in qs]
        self.assertIn("Active One", names)
        self.assertNotIn("Expired", names)
