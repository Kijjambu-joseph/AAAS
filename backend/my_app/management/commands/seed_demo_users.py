from datetime import date

from django.core.management.base import BaseCommand

from my_app.models import Allocation, Auctioneer, BankUser, Branch, RecoveryCase


USERS = (
    {
        "username": "admin.joseph",
        "employee_number": "EMP-000001",
        "first_name": "Kijjambu",
        "last_name": "Joseph",
        "email": "admin.joseph@centenary.local",
        "role": "SUPER_ADMIN",
        "is_staff": True,
        "is_superuser": True,
    },
    {
        "username": "credit.nakato",
        "employee_number": "EMP-000002",
        "first_name": "Annet",
        "last_name": "Nakato",
        "email": "credit.nakato@centenary.local",
        "role": "CREDIT_OFFICER",
    },
    {
        "username": "loan.okello",
        "employee_number": "EMP-000003",
        "first_name": "James",
        "last_name": "Okello",
        "email": "loan.okello@centenary.local",
        "role": "LOAN_OFFICER",
    },
)


class Command(BaseCommand):
    help = "Create or update local demo users and recovery data for local development."

    def add_arguments(self, parser):
        parser.add_argument("--password", default="Password123!", help="Password for all demo accounts.")

    def handle(self, *args, **options):
        for user_data in USERS:
            user, created = BankUser.objects.update_or_create(
                employee_number=user_data["employee_number"], defaults=user_data
            )
            user.set_password(options["password"])
            user.save()
            self.stdout.write(self.style.SUCCESS(f"{'Created' if created else 'Updated'} {user.employee_number} ({user.get_role_display()})"))

        branches = {}
        for data in (
            {"branch_code": "KLA", "branch_name": "Kampala Regional Branch", "district": "Kampala", "region": "Central", "address": "Kampala Road", "phone_number": "+256 414 355 000", "email": "kampala@centenary.local"},
            {"branch_code": "ENT", "branch_name": "Entebbe Head Office", "district": "Wakiso", "region": "Central", "address": "Entebbe Road", "phone_number": "+256 414 355 001", "email": "entebbe@centenary.local"},
            {"branch_code": "MBR", "branch_name": "Mbarara Centre", "district": "Mbarara", "region": "Western", "address": "High Street", "phone_number": "+256 414 355 002", "email": "mbarara@centenary.local"},
        ):
            branch, _ = Branch.objects.update_or_create(branch_code=data["branch_code"], defaults=data)
            branches[data["branch_code"]] = branch

        auctioneers = {}
        for data in (
            {"company_name": "Kampala Asset Recovery Ltd", "contact_person": "M. K. Ssekandi", "phone_number": "+256 700 123 456", "email": "info@kampala-assets.local", "license_number": "AUC-2023-44102", "license_expiry": date(2027, 12, 31), "region": "Central", "office_address": "Kampala"},
            {"company_name": "Victoria Asset Recovery", "contact_person": "A. N. Katongole", "phone_number": "+256 701 444 888", "email": "info@victoria-assets.local", "license_number": "AUC-2023-11928", "license_expiry": date(2027, 8, 31), "region": "Western", "office_address": "Mbarara"},
        ):
            auctioneer, _ = Auctioneer.objects.update_or_create(company_name=data["company_name"], defaults=data)
            auctioneers[data["company_name"]] = auctioneer

        creator = BankUser.objects.get(employee_number="EMP-000003")
        cases = (
            {"case_number": "REC-9821-K", "loan_account_number": "LN-2024-0001", "customer_name": "Tumusiime Emmanuel", "national_id": "CM92010101ABC", "phone_number": "+256 772 000 001", "branch": branches["KLA"], "loan_amount": "850000000.00", "outstanding_balance": "750000000.00", "collateral_type": "Land", "collateral_description": "Commercial land in Kira", "collateral_location": "Kira, Wakiso", "arrears_days": 214, "priority": "Critical", "status": "Allocated", "recovery_stage": "Auctioneer Assignment"},
            {"case_number": "REC-0452-P", "loan_account_number": "LN-2024-0002", "customer_name": "Agaba Martha Rita", "national_id": "CF85020202DEF", "phone_number": "+256 772 000 002", "branch": branches["ENT"], "loan_amount": "42500000.00", "outstanding_balance": "42500000.00", "collateral_type": "Motor Vehicle", "collateral_description": "Toyota Prado registration UBD 123A", "collateral_location": "Entebbe", "arrears_days": 92, "priority": "High", "status": "Pending", "recovery_stage": "Legal Review"},
            {"case_number": "REC-1109-W", "loan_account_number": "LN-2024-0003", "customer_name": "Mukasa Furniture Ltd", "national_id": "800200300", "phone_number": "+256 772 000 003", "branch": branches["MBR"], "loan_amount": "1240000000.00", "outstanding_balance": "1100000000.00", "collateral_type": "Machinery", "collateral_description": "Industrial furniture production machinery", "collateral_location": "Mbarara Industrial Area", "arrears_days": 184, "priority": "High", "status": "In Recovery", "recovery_stage": "Asset Recovery"},
        )
        created_cases = {}
        for data in cases:
            case, _ = RecoveryCase.objects.update_or_create(case_number=data["case_number"], defaults={**data, "created_by": creator})
            created_cases[case.case_number] = case

        Allocation.objects.update_or_create(
            recovery_case=created_cases["REC-9821-K"],
            defaults={"auctioneer": auctioneers["Kampala Asset Recovery Ltd"], "allocated_by": creator, "allocation_method": "Manual", "allocation_status": "Active"},
        )
        for auctioneer in auctioneers.values():
            auctioneer.current_workload = Allocation.objects.filter(auctioneer=auctioneer, allocation_status="Active").count()
            auctioneer.save(update_fields=["current_workload"])

        self.stdout.write(self.style.SUCCESS("Seeded branches, auctioneers, recovery cases, and allocations."))
