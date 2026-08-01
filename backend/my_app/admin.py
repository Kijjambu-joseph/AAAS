from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import BankUser, Branch, Auctioneer, RecoveryCase, Allocation, Notification, AuditLog


@admin.register(BankUser)
class BankUserAdmin(UserAdmin):
    list_display = (
        'username',
        'employee_number',
        'first_name',
        'last_name',
        'role',
        'is_staff',
        'is_active',
    )

    list_filter = ('role', 'is_staff', 'is_active')

    search_fields = (
        'username',
        'employee_number',
        'first_name',
        'last_name',
        'email',
    )

    ordering = ('employee_number',)

    fieldsets = UserAdmin.fieldsets + (
        ('Bank Information', {
            'fields': (
                'employee_number',
                'phone_number',
                'role',
                'profile_picture',
            )
        }),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Bank Information', {
            'fields': (
                'employee_number',
                'phone_number',
                'role',
                'profile_picture',
            )
        }),
    )

@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):

    list_display = (
        "branch_code",
        "branch_name",
        "district",
        "region",
        "phone_number",
        "is_active",
    )

    search_fields = (
        "branch_code",
        "branch_name",
        "district",
    )

    list_filter = (
        "region",
        "is_active",
    )

    ordering = (
        "branch_name",
    )

    list_per_page = 20    


from .models import Auctioneer


@admin.register(Auctioneer)
class AuctioneerAdmin(admin.ModelAdmin):

    list_display = (
        "company_name",
        "contact_person",
        "region",
        "license_number",
        "license_expiry",
        "current_workload",
        "status",
    )

    search_fields = (
        "company_name",
        "contact_person",
        "license_number",
    )

    list_filter = (
        "region",
        "status",
    )

    ordering = (
        "company_name",
    )

    list_per_page = 20



@admin.register(RecoveryCase)
class RecoveryCaseAdmin(admin.ModelAdmin):

    list_display = (
        "case_number",
        "customer_name",
        "loan_account_number",
        "branch",
        "priority",
        "status",
        "outstanding_balance",
        "created_at",
    )

    search_fields = (
        "case_number",
        "loan_account_number",
        "customer_name",
        "national_id",
    )

    list_filter = (
        "priority",
        "status",
        "branch",
    )

    ordering = (
        "-created_at",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    list_per_page = 20

@admin.register(Allocation)
class AllocationAdmin(admin.ModelAdmin):

    list_display = (
        "recovery_case",
        "auctioneer",
        "allocation_method",
        "allocation_status",
        "allocated_by",
        "allocated_at",
    )

    search_fields = (
        "recovery_case__case_number",
        "auctioneer__company_name",
    )

    list_filter = (
        "allocation_method",
        "allocation_status",
        "auctioneer",
    )

    readonly_fields = (
        "allocated_at",
        "created_at",
        "updated_at",
    )

    ordering = (
        "-allocated_at",
    )


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "recipient",
        "notification_type",
        "priority",
        "is_read",
        "created_at",
    )

    search_fields = (
        "title",
        "recipient__username",
    )

    list_filter = (
        "notification_type",
        "priority",
        "is_read",
    )

    readonly_fields = (
        "created_at",
    )

    ordering = (
        "-created_at",
    )

    list_per_page = 25

    list_per_page = 20


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):

    list_display = (
        "created_at",
        "user",
        "action",
        "model_name",
        "object_name",
        "ip_address",
    )

    search_fields = (
        "user__username",
        "model_name",
        "object_name",
        "description",
    )

    list_filter = (
        "action",
        "model_name",
        "created_at",
    )

    readonly_fields = (
        "user",
        "action",
        "model_name",
        "object_id",
        "object_name",
        "description",
        "ip_address",
        "created_at",
    )

    ordering = ("-created_at",)

    list_per_page = 25

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False