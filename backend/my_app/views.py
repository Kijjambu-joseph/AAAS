from rest_framework import filters, status, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import AuditLog, Branch, Auctioneer, RecoveryCase, Allocation, Notification, TransactionLimit, BankUser
from .serializers import (
    BranchSerializer,
    AuctioneerSerializer,
    RecoveryCaseSerializer,
    AllocationSerializer,
    NotificationSerializer,
    BankUserSerializer,
    AuditLogSerializer,
    TransactionLimitSerializer,
)
from .services import RecoveryCaseService, AllocationService
from .repositories import AllocationRepository
from .serializers import AllocationSerializer


class AuditedModelViewSet(viewsets.ModelViewSet):
    """Write an immutable audit entry for every mutating REST action."""

    def _audit(self, action, instance, description):
        user = self.request.user if self.request.user.is_authenticated else None
        forwarded_for = self.request.META.get("HTTP_X_FORWARDED_FOR", "")
        ip_address = (forwarded_for.split(",")[0].strip() if forwarded_for else self.request.META.get("REMOTE_ADDR"))
        AuditLog.objects.create(
            user=user,
            action=action,
            model_name=instance._meta.verbose_name,
            object_id=instance.pk,
            object_name=str(instance),
            description=description,
            ip_address=ip_address if ip_address else None,
        )

    def perform_create(self, serializer):
        instance = serializer.save()
        self._audit("CREATE", instance, f"Created {instance._meta.verbose_name}: {instance}.")

    def perform_update(self, serializer):
        instance = serializer.save()
        self._audit("UPDATE", instance, f"Updated {instance._meta.verbose_name}: {instance}.")

    def perform_destroy(self, instance):
        self._audit("DELETE", instance, f"Deleted {instance._meta.verbose_name}: {instance}.")
        instance.delete()


class BranchViewSet(AuditedModelViewSet):
    queryset = Branch.objects.filter(is_active=True).order_by("branch_name")
    serializer_class = BranchSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["branch_code", "branch_name", "district"]
    ordering_fields = ["branch_name", "region"]


class AuctioneerViewSet(AuditedModelViewSet):
    queryset = Auctioneer.objects.all().order_by("company_name")
    serializer_class = AuctioneerSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["company_name", "contact_person", "license_number"]
    ordering_fields = ["company_name", "current_workload", "license_expiry"]


class RecoveryCaseViewSet(AuditedModelViewSet):
    queryset = RecoveryCase.objects.select_related("branch", "created_by").all()
    serializer_class = RecoveryCaseSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["case_number", "customer_name", "loan_account_number", "national_id"]
    ordering_fields = ["created_at", "outstanding_balance", "arrears_days"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        service = RecoveryCaseService()
        case = service.create_case(created_by=request.user, **serializer.validated_data)
        self._audit("CREATE", case, f"Created recovery case {case.case_number} for {case.customer_name}.")
        output = self.get_serializer(case)
        return Response(output.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"], url_path="allocate")
    def allocate(self, request, pk=None):
        case = self.get_object()
        auctioneer_id = request.data.get("auctioneer_id")
        method = request.data.get("method", "Automatic")
        service = AllocationService()
        allocation = service.allocate_case(case, request.user, auctioneer_id=auctioneer_id, method=method)
        self._audit(
            "ALLOCATE",
            allocation,
            f"Allocated case {case.case_number} to {allocation.auctioneer.company_name} using {allocation.allocation_method.lower()} allocation.",
        )
        return Response(AllocationSerializer(allocation).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["get"], url_path="allocation")
    def allocation(self, request, pk=None):
        case = self.get_object()
        allocation = AllocationRepository.get_by_case(case)
        if not allocation:
            return Response({"detail": "Not allocated"}, status=status.HTTP_404_NOT_FOUND)
        return Response(AllocationSerializer(allocation).data, status=status.HTTP_200_OK)


class AllocationViewSet(AuditedModelViewSet):
    queryset = Allocation.objects.select_related("recovery_case", "auctioneer", "allocated_by").all()
    serializer_class = AllocationSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["allocated_at", "allocation_status"]


class NotificationViewSet(AuditedModelViewSet):
    queryset = Notification.objects.select_related("recipient", "recovery_case", "allocation").all()
    serializer_class = NotificationSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "message", "notification_type"]
    ordering_fields = ["created_at", "priority"]


class BankUserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BankUser.objects.select_related("branch").all()
    serializer_class = BankUserSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["username", "employee_number", "first_name", "last_name"]
    ordering_fields = ["employee_number", "last_name", "role"]


class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditLog.objects.select_related("user").all()
    serializer_class = AuditLogSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["action", "model_name", "object_name", "description", "user__username", "user__employee_number"]
    ordering_fields = ["created_at", "action", "model_name"]


class TransactionLimitViewSet(AuditedModelViewSet):
    queryset = TransactionLimit.objects.all()
    serializer_class = TransactionLimitSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["level"]
    ordering_fields = ["minimum", "maximum", "level"]


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def current_user(request):
    """Return the authenticated user's database-backed role and profile."""
    return Response(BankUserSerializer(request.user).data)
