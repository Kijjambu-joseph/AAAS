from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Branch, Auctioneer, RecoveryCase, Allocation, Notification, BankUser
from .serializers import (
    BranchSerializer,
    AuctioneerSerializer,
    RecoveryCaseSerializer,
    AllocationSerializer,
    NotificationSerializer,
    BankUserSerializer,
)
from .services import RecoveryCaseService, AllocationService
from .repositories import AllocationRepository
from .serializers import AllocationSerializer


class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.filter(is_active=True).order_by("branch_name")
    serializer_class = BranchSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["branch_code", "branch_name", "district"]
    ordering_fields = ["branch_name", "region"]


class AuctioneerViewSet(viewsets.ModelViewSet):
    queryset = Auctioneer.objects.all().order_by("company_name")
    serializer_class = AuctioneerSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["company_name", "contact_person", "license_number"]
    ordering_fields = ["company_name", "current_workload", "license_expiry"]


class RecoveryCaseViewSet(viewsets.ModelViewSet):
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
        output = self.get_serializer(case)
        return Response(output.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"], url_path="allocate")
    def allocate(self, request, pk=None):
        case = self.get_object()
        auctioneer_id = request.data.get("auctioneer_id")
        method = request.data.get("method", "Automatic")
        service = AllocationService()
        allocation = service.allocate_case(case, request.user, auctioneer_id=auctioneer_id, method=method)
        return Response(AllocationSerializer(allocation).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["get"], url_path="allocation")
    def allocation(self, request, pk=None):
        case = self.get_object()
        allocation = AllocationRepository.get_by_case(case)
        if not allocation:
            return Response({"detail": "Not allocated"}, status=status.HTTP_404_NOT_FOUND)
        return Response(AllocationSerializer(allocation).data, status=status.HTTP_200_OK)


class AllocationViewSet(viewsets.ModelViewSet):
    queryset = Allocation.objects.select_related("recovery_case", "auctioneer", "allocated_by").all()
    serializer_class = AllocationSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["allocated_at", "allocation_status"]


class NotificationViewSet(viewsets.ModelViewSet):
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
