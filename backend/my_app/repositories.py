from datetime import date
from typing import Optional
from django.db.models import F, QuerySet, Q
from .models import Branch, Auctioneer, RecoveryCase, Allocation, Notification
from django.contrib.auth import get_user_model

User = get_user_model()

class BranchRepository:
    @staticmethod
    def get(branch_code: str) -> Optional[Branch]:
        return Branch.objects.filter(branch_code=branch_code).first()

    @staticmethod
    def list_active() -> QuerySet[Branch]:
        return Branch.objects.filter(is_active=True)

class AuctioneerRepository:
    @staticmethod
    def get(pk: int) -> Optional[Auctioneer]:
        return Auctioneer.objects.filter(pk=pk).first()

    @staticmethod
    def available_by_region(region: str) -> QuerySet[Auctioneer]:
        return Auctioneer.objects.filter(
            status=True,
            region=region,
            license_expiry__gte=date.today(),
        ).order_by("current_workload", "company_name")

    @staticmethod
    def list_active() -> QuerySet[Auctioneer]:
        return Auctioneer.objects.filter(status=True, license_expiry__gte=date.today())

    @staticmethod
    def increase_workload(auctioneer: Auctioneer, amount: int = 1) -> None:
        auctioneer.current_workload = F("current_workload") + amount
        auctioneer.save(update_fields=["current_workload"])

    @staticmethod
    def decrease_workload(auctioneer: Auctioneer, amount: int = 1) -> None:
        auctioneer.current_workload = F("current_workload") - amount
        auctioneer.save(update_fields=["current_workload"])

class RecoveryCaseRepository:
    @staticmethod
    def get(case_number: str) -> Optional[RecoveryCase]:
        return RecoveryCase.objects.filter(case_number=case_number).first()

    @staticmethod
    def get_by_id(pk: int) -> Optional[RecoveryCase]:
        return RecoveryCase.objects.filter(pk=pk).first()

    @staticmethod
    def list(filters: dict = None) -> QuerySet[RecoveryCase]:
        if not filters:
            return RecoveryCase.objects.select_related("branch", "created_by").all()
        query = Q()
        status = filters.get("status")
        branch = filters.get("branch")
        search = filters.get("search")
        if status and status != "all":
            query &= Q(status__iexact=status)
        if branch and branch != "all":
            query &= Q(branch__branch_name__iexact=branch)
        if search:
            query &= Q(case_number__icontains=search) | Q(customer_name__icontains=search) | Q(loan_account_number__icontains=search)
        return RecoveryCase.objects.select_related("branch", "created_by").filter(query)

    @staticmethod
    def create(**kwargs) -> RecoveryCase:
        return RecoveryCase.objects.create(**kwargs)

    @staticmethod
    def pending() -> QuerySet[RecoveryCase]:
        return RecoveryCase.objects.filter(status="Pending")

    @staticmethod
    def allocated() -> QuerySet[RecoveryCase]:
        return RecoveryCase.objects.filter(status="Allocated")

class AllocationRepository:
    @staticmethod
    def get_by_case(case: RecoveryCase) -> Optional[Allocation]:
        return Allocation.objects.filter(recovery_case=case).select_related("auctioneer", "allocated_by").first()

    @staticmethod
    def create(recovery_case: RecoveryCase, auctioneer: Auctioneer, allocated_by: User, allocation_method: str, remarks: str = "") -> Allocation:
        allocation = Allocation.objects.create(
            recovery_case=recovery_case,
            auctioneer=auctioneer,
            allocated_by=allocated_by,
            allocation_method=allocation_method,
            remarks=remarks,
        )
        return allocation

class NotificationRepository:
    @staticmethod
    def create(recipient: User, title: str, message: str, notification_type: str = "System", priority: str = "Medium", recovery_case: Optional[RecoveryCase] = None, allocation: Optional[Allocation] = None) -> Notification:
        return Notification.objects.create(
            recipient=recipient,
            title=title,
            message=message,
            notification_type=notification_type,
            priority=priority,
            recovery_case=recovery_case,
            allocation=allocation,
        )
