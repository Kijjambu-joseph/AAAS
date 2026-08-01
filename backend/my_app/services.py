from django.db import transaction
from django.utils import timezone
from .repositories import RecoveryCaseRepository, AuctioneerRepository, AllocationRepository, NotificationRepository
from .models import RecoveryCase, Allocation, Auctioneer
from .strategies import AllocationStrategy, AutomaticAllocationStrategy, ManualAllocationStrategy
from django.contrib.auth import get_user_model

User = get_user_model()

class RecoveryCaseService:
    def __init__(self):
        self.repo = RecoveryCaseRepository()

    def create_case(self, created_by: User, **case_data) -> RecoveryCase:
        case_data["created_by"] = created_by
        case = self.repo.create(**case_data)
        NotificationRepository.create(
            recipient=created_by,
            title="Recovery case created",
            message=f"Recovery case {case.case_number} was created successfully.",
            notification_type="Case Created",
            recovery_case=case,
        )
        return case

    def get_case(self, pk: int) -> RecoveryCase:
        case = self.repo.get_by_id(pk)
        if not case:
            raise RecoveryCase.DoesNotExist(f"RecoveryCase with id {pk} not found")
        return case

    def list_cases(self, filters: dict = None):
        return self.repo.list(filters)

class AllocationService:
    def __init__(self, strategy: AllocationStrategy = None):
        self.strategy = strategy or AutomaticAllocationStrategy()

    @transaction.atomic
    def allocate_case(self, recovery_case: RecoveryCase, allocated_by: User, auctioneer_id: int = None, method: str = "Automatic") -> Allocation:
        if recovery_case.status == "Allocated":
            raise ValueError("Case is already allocated")

        if method == "Manual" and auctioneer_id:
            self.strategy = ManualAllocationStrategy(auctioneer_id)
        elif method == "Automatic":
            self.strategy = AutomaticAllocationStrategy()

        auctioneer = self.strategy.allocate(recovery_case)
        if not auctioneer:
            raise ValueError("No available auctioneer found for allocation")

        allocation = AllocationRepository.create(
            recovery_case=recovery_case,
            auctioneer=auctioneer,
            allocated_by=allocated_by,
            allocation_method=method,
        )

        recovery_case.status = "Allocated"
        recovery_case.save(update_fields=["status", "updated_at"])

        auctioneer.current_workload += 1
        auctioneer.save(update_fields=["current_workload"])

        NotificationRepository.create(
            recipient=allocated_by,
            title="Auctioneer assigned",
            message=f"{auctioneer.company_name} was allocated to case {recovery_case.case_number}.",
            notification_type="Case Allocated",
            priority="High",
            recovery_case=recovery_case,
            allocation=allocation,
        )

        return allocation

    @transaction.atomic
    def complete_allocation(self, allocation: Allocation) -> Allocation:
        allocation.allocation_status = "Completed"
        allocation.completed_at = timezone.now()
        allocation.save(update_fields=["allocation_status", "completed_at", "updated_at"])

        auctioneer = allocation.auctioneer
        auctioneer.current_workload = max(0, auctioneer.current_workload - 1)
        auctioneer.save(update_fields=["current_workload"])

        return allocation

class NotificationService:
    def send_for_allocation(self, recipient: User, allocation: Allocation) -> None:
        NotificationRepository.create(
            recipient=recipient,
            title="Allocation complete",
            message=f"Allocation {allocation} has been completed.",
            notification_type="Case Allocated",
            priority="Medium",
            recovery_case=allocation.recovery_case,
            allocation=allocation,
        )
