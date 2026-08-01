from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    BranchViewSet,
    AuctioneerViewSet,
    RecoveryCaseViewSet,
    AllocationViewSet,
    NotificationViewSet,
    BankUserViewSet,
    AuditLogViewSet,
    TransactionLimitViewSet,
    current_user,
)

router = DefaultRouter()
router.register(r"branches", BranchViewSet, basename="branch")
router.register(r"auctioneers", AuctioneerViewSet, basename="auctioneer")
router.register(r"cases", RecoveryCaseViewSet, basename="recoverycase")
router.register(r"allocations", AllocationViewSet, basename="allocation")
router.register(r"notifications", NotificationViewSet, basename="notification")
router.register(r"users", BankUserViewSet, basename="user")
router.register(r"audit-logs", AuditLogViewSet, basename="audit-log")
router.register(r"transaction-limits", TransactionLimitViewSet, basename="transaction-limit")

urlpatterns = router.urls
urlpatterns += [path("auth/me/", current_user, name="current-user")]
