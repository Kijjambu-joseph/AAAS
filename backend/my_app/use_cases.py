from typing import Optional, Dict, Any
from .repositories import RecoveryCaseRepository, AllocationRepository, AuctioneerRepository
from .services import RecoveryCaseService, AllocationService
from .models import RecoveryCase, Allocation


class GetCasesQuery:
    """Query object to fetch recovery cases using repository filters."""

    def __init__(self, filters: Optional[Dict[str, Any]] = None):
        self.filters = filters or {}

    def execute(self):
        repo = RecoveryCaseRepository()
        return repo.list(self.filters)


class GetCaseByIdQuery:
    def __init__(self, pk: int):
        self.pk = pk

    def execute(self) -> RecoveryCase:
        service = RecoveryCaseService()
        return service.get_case(self.pk)


class CreateCaseCommand:
    def __init__(self, created_by, case_data: Dict[str, Any]):
        self.created_by = created_by
        self.case_data = case_data

    def execute(self) -> RecoveryCase:
        service = RecoveryCaseService()
        return service.create_case(self.created_by, **self.case_data)


class AllocateCaseCommand:
    def __init__(self, recovery_case: RecoveryCase, allocated_by, auctioneer_id: Optional[int] = None, method: str = "Automatic"):
        self.recovery_case = recovery_case
        self.allocated_by = allocated_by
        self.auctioneer_id = auctioneer_id
        self.method = method

    def execute(self) -> Allocation:
        service = AllocationService()
        return service.allocate_case(self.recovery_case, self.allocated_by, auctioneer_id=self.auctioneer_id, method=self.method)


class GetAllocationForCaseQuery:
    def __init__(self, recovery_case: RecoveryCase):
        self.recovery_case = recovery_case

    def execute(self):
        return AllocationRepository.get_by_case(self.recovery_case)
