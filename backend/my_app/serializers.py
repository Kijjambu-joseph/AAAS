from rest_framework import serializers
from .models import Branch, Auctioneer, RecoveryCase, Allocation, Notification, BankUser

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = [
            "id",
            "branch_code",
            "branch_name",
            "district",
            "region",
            "address",
            "phone_number",
            "email",
            "is_active",
        ]

class AuctioneerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auctioneer
        fields = [
            "id",
            "company_name",
            "contact_person",
            "phone_number",
            "email",
            "license_number",
            "license_expiry",
            "region",
            "office_address",
            "current_workload",
            "status",
        ]

class RecoveryCaseSerializer(serializers.ModelSerializer):
    branch = BranchSerializer(read_only=True)
    branch_id = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Branch.objects.all(), source="branch")

    class Meta:
        model = RecoveryCase
        fields = [
            "id",
            "case_number",
            "loan_account_number",
            "customer_name",
            "national_id",
            "phone_number",
            "branch",
            "branch_id",
            "loan_amount",
            "outstanding_balance",
            "collateral_type",
            "collateral_description",
            "collateral_location",
            "arrears_days",
            "priority",
            "status",
            "recovery_stage",
            "created_by",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_by", "created_at", "updated_at"]

class AllocationSerializer(serializers.ModelSerializer):
    recovery_case = RecoveryCaseSerializer(read_only=True)
    auctioneer = AuctioneerSerializer(read_only=True)

    class Meta:
        model = Allocation
        fields = [
            "id",
            "recovery_case",
            "auctioneer",
            "allocation_method",
            "allocation_status",
            "allocated_by",
            "allocated_at",
            "completed_at",
            "remarks",
        ]
        read_only_fields = ["allocated_by", "allocated_at", "completed_at"]

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = [
            "id",
            "recipient",
            "title",
            "message",
            "notification_type",
            "priority",
            "recovery_case",
            "allocation",
            "is_read",
            "created_at",
        ]

class BankUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankUser
        fields = [
            "id",
            "username",
            "employee_number",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "role",
            "branch",
        ]
        read_only_fields = ["id"]
