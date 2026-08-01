from rest_framework import filters, status, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.conf import settings

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
from .allocation_coordinator import AllocationCoordinator
from .allocation_engine import AllocationEnforcementMode


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

    @action(detail=True, methods=["post"], url_path="suspend")
    def suspend_auctioneer(self, request, pk=None):
        """Suspend an auctioneer from receiving new allocations."""
        auctioneer = self.get_object()
        reason = request.data.get("reason", "Suspended by administrator")
        
        auctioneer.is_active = False
        auctioneer.save()
        
        self._audit("SUSPEND", auctioneer, f"Suspended auctioneer {auctioneer.company_name}. Reason: {reason}")
        
        return Response({
            "success": True,
            "message": f"Auctioneer {auctioneer.company_name} has been suspended",
            "auctioneer_id": auctioneer.id,
            "status": "suspended"
        }, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=["post"], url_path="activate")
    def activate_auctioneer(self, request, pk=None):
        """Activate a suspended auctioneer."""
        auctioneer = self.get_object()
        
        auctioneer.is_active = True
        auctioneer.save()
        
        self._audit("ACTIVATE", auctioneer, f"Activated auctioneer {auctioneer.company_name}")
        
        return Response({
            "success": True,
            "message": f"Auctioneer {auctioneer.company_name} has been activated",
            "auctioneer_id": auctioneer.id,
            "status": "active"
        }, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=["get"], url_path="performance")
    def get_performance_metrics(self, request, pk=None):
        """Get detailed performance metrics for an auctioneer."""
        auctioneer = self.get_object()
        
        # Get allocation statistics
        allocations = Allocation.objects.filter(auctioneer=auctioneer)
        total_allocations = allocations.count()
        completed = allocations.filter(allocation_status="Completed").count()
        pending = allocations.filter(allocation_status="Pending").count()
        in_progress = allocations.filter(allocation_status="In Progress").count()
        
        completion_rate = (completed / total_allocations * 100) if total_allocations > 0 else 0
        
        return Response({
            "auctioneer_id": auctioneer.id,
            "company_name": auctioneer.company_name,
            "total_allocations": total_allocations,
            "completed": completed,
            "pending": pending,
            "in_progress": in_progress,
            "completion_rate": round(completion_rate, 2),
            "current_workload": auctioneer.current_workload,
            "maximum_caseload": auctioneer.maximum_caseload,
            "workload_utilization": round((auctioneer.current_workload / auctioneer.maximum_caseload * 100), 2) if auctioneer.maximum_caseload > 0 else 0,
            "is_active": auctioneer.is_active,
            "license_status": "Valid" if auctioneer.status else "Invalid"
        }, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=["post"], url_path="update-workload")
    def update_workload(self, request, pk=None):
        """Manually update auctioneer workload capacity."""
        auctioneer = self.get_object()
        new_workload = request.data.get("current_workload")
        new_capacity = request.data.get("maximum_caseload")
        
        if new_workload is not None:
            auctioneer.current_workload = int(new_workload)
        
        if new_capacity is not None:
            auctioneer.maximum_caseload = int(new_capacity)
        
        auctioneer.save()
        
        self._audit(
            "UPDATE_WORKLOAD", 
            auctioneer, 
            f"Updated workload for {auctioneer.company_name}: {auctioneer.current_workload}/{auctioneer.maximum_caseload}"
        )
        
        return Response({
            "success": True,
            "message": "Workload updated successfully",
            "auctioneer_id": auctioneer.id,
            "current_workload": auctioneer.current_workload,
            "maximum_caseload": auctioneer.maximum_caseload
        }, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=["get"], url_path="available-allocations")
    def get_available_allocation_count(self, request, pk=None):
        """Get the number of cases this auctioneer can still accept."""
        auctioneer = self.get_object()
        available = max(0, auctioneer.maximum_caseload - auctioneer.current_workload)
        
        return Response({
            "auctioneer_id": auctioneer.id,
            "company_name": auctioneer.company_name,
            "available_slots": available,
            "current_workload": auctioneer.current_workload,
            "maximum_caseload": auctioneer.maximum_caseload,
            "has_capacity": available > 0,
            "is_active": auctioneer.is_active
        }, status=status.HTTP_200_OK)


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

    @action(detail=True, methods=["post"], url_path="allocate-v2")
    def allocate_v2(self, request, pk=None):
        case = self.get_object()
        strategy = request.data.get("strategy", "automatic")
        auctioneer_id = request.data.get("auctioneer_id")
        dry_run = bool(request.data.get("dry_run", False))
        dry_run_preview = bool(request.data.get("dry_run_preview", False))
        force = bool(request.data.get("force", False))

        coordinator = AllocationCoordinator(
            user=request.user,
            enforcement_mode=getattr(
                settings,
                "ALLOCATION_CONFIG",
                {},
            ).get("ENFORCEMENT_MODE", AllocationEnforcementMode.BALANCED.value),
        )
        result = coordinator.allocate_case(
            case=case,
            strategy_type=strategy,
            auctioneer_id=auctioneer_id,
            dry_run=dry_run,
            force=force,
            dry_run_preview=dry_run_preview,
        )
        payload = {
            "success": result.success,
            "allocation_id": result.allocation_id,
            "auctioneer_id": result.auctioneer_id,
            "case_id": result.case_id,
            "score": result.score,
            "ranking_position": result.ranking_position,
            "strategy_used": result.strategy_used,
            "error_message": result.error_message,
            "exception_type": result.exception_type.value if result.exception_type else None,
            "enforcement_blocked": result.enforcement_blocked,
            "enforcement_reason": result.enforcement_reason,
            "allowed_strategies": result.allowed_strategies,
            "requires_dry_run": result.requires_dry_run,
        }
        status_code = status.HTTP_200_OK if result.success else status.HTTP_400_BAD_REQUEST
        return Response(payload, status=status_code)

    @action(detail=True, methods=["get"], url_path="enforcement-status")
    def enforcement_status(self, request, pk=None):
        case = self.get_object()
        coordinator = AllocationCoordinator(
            user=request.user,
            enforcement_mode=getattr(
                settings,
                "ALLOCATION_CONFIG",
                {},
            ).get("ENFORCEMENT_MODE", AllocationEnforcementMode.BALANCED.value),
        )
        return Response(coordinator.get_enforcement_status(case), status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"], url_path="verify-dry-run")
    def verify_dry_run(self, request, pk=None):
        case = self.get_object()
        strategy = request.data.get("strategy", "automatic")
        coordinator = AllocationCoordinator(
            user=request.user,
            enforcement_mode=getattr(
                settings,
                "ALLOCATION_CONFIG",
                {},
            ).get("ENFORCEMENT_MODE", AllocationEnforcementMode.BALANCED.value),
        )
        result = coordinator.verify_dry_run_preview(case, strategy)
        return Response({
            "success": result.success,
            "allocation_id": result.allocation_id,
            "auctioneer_id": result.auctioneer_id,
            "case_id": result.case_id,
            "score": result.score,
            "ranking_position": result.ranking_position,
            "strategy_used": result.strategy_used,
            "error_message": result.error_message,
            "exception_type": result.exception_type.value if result.exception_type else None,
            "scoring_factors": result.scoring_factors.to_dict() if result.scoring_factors else None,
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"], url_path="enforcement-rules")
    def enforcement_rules(self, request):
        coordinator = AllocationCoordinator(
            user=request.user,
            enforcement_mode=getattr(
                settings,
                "ALLOCATION_CONFIG",
                {},
            ).get("ENFORCEMENT_MODE", AllocationEnforcementMode.BALANCED.value),
        )
        return Response(coordinator.get_enforcement_rules(), status=status.HTTP_200_OK)

    @action(detail=False, methods=["post"], url_path="auto-allocate-pending")
    def auto_allocate_pending(self, request):
        pending_cases = RecoveryCase.objects.select_related("branch", "created_by").filter(status="Pending")
        service = AllocationService()
        results = []

        for case in pending_cases:
            try:
                allocation = service.allocate_case(case, request.user, method="Automatic")
                results.append({
                    "case_id": case.id,
                    "case_number": case.case_number,
                    "success": True,
                    "allocation_id": allocation.id,
                    "auctioneer_id": allocation.auctioneer_id,
                })
            except Exception as exc:
                results.append({
                    "case_id": case.id,
                    "case_number": case.case_number,
                    "success": False,
                    "error_message": str(exc),
                })

        return Response({
            "success": True,
            "processed": len(results),
            "results": results,
        }, status=status.HTTP_200_OK)

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
