from abc import ABC, abstractmethod
from typing import Optional
from .models import Auctioneer, RecoveryCase
from .repositories import AuctioneerRepository

class AllocationStrategy(ABC):
    @abstractmethod
    def allocate(self, recovery_case: RecoveryCase) -> Optional[Auctioneer]:
        raise NotImplementedError

class AutomaticAllocationStrategy(AllocationStrategy):
    def allocate(self, recovery_case: RecoveryCase) -> Optional[Auctioneer]:
        candidates = AuctioneerRepository.available_by_region(recovery_case.branch.region)
        return candidates.first()

class ManualAllocationStrategy(AllocationStrategy):
    def __init__(self, auctioneer_id: int):
        self.auctioneer_id = auctioneer_id

    def allocate(self, recovery_case: RecoveryCase) -> Optional[Auctioneer]:
        return AuctioneerRepository.get(self.auctioneer_id)
