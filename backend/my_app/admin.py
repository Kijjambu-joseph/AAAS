from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html, mark_safe
from .models import BankUser, Branch, Auctioneer, RecoveryCase, Allocation, Notification, AuditLog


# Enhanced BankUser Admin with role-based styling
class BankUserAdmin(UserAdmin):
    """Enhanced BankUser Admin with role-based styling and System Admin indicators."""
    
    fieldsets = UserAdmin.fieldsets + (
        ('Bank Information', {
            'fields': (
                'employee_number',
                'phone_number',
                'role',
                'branch',
                'profile_picture',
            ),
            'classes': ('wide',),
            'description': 'Enter employee bank-specific information including role and branch assignment.',
        }),
    )
    
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Bank Information', {
            'fields': (
                'employee_number',
                'phone_number',
                'role',
                'branch',
                'profile_picture',
            ),
            'classes': ('wide',),
        }),
    )
    
    list_display = (
        'username',
        'employee_number',
        'get_full_name_display',
        'get_role_badge',
        'branch',
        'get_status_display',
    )
    
    list_filter = ('role', 'is_staff', 'is_active', 'branch', 'date_joined')
    
    search_fields = (
        'username',
        'employee_number',
        'first_name',
        'last_name',
        'email',
        'branch__branch_name',
    )
    
    ordering = ('-date_joined', 'employee_number')
    list_per_page = 25
    
    def get_full_name_display(self, obj):
        """Display full name."""
        return obj.get_full_name() or obj.username
    get_full_name_display.short_description = 'Full Name'
    
    def get_role_badge(self, obj):
        """Display role with color-coded badge and icon."""
        role_display = dict(BankUser.ROLE_CHOICES).get(obj.role, 'Unknown')
        
        if obj.role == 'SYSTEM_ADMIN':
            return format_html(
                '<span class="badge badge-danger"><i class="fas fa-lock"></i> {}</span>',
                role_display
            )
        elif obj.role == 'SUPER_ADMIN':
            return format_html(
                '<span class="badge badge-dark"><i class="fas fa-crown"></i> {}</span>',
                role_display
            )
        elif obj.role == 'CREDIT_OFFICER':
            return format_html(
                '<span class="badge badge-info"><i class="fas fa-user-tie"></i> {}</span>',
                role_display
            )
        else:
            return format_html(
                '<span class="badge badge-secondary"><i class="fas fa-user"></i> {}</span>',
                role_display
            )
    get_role_badge.short_description = 'Role'
    
    def get_status_display(self, obj):
        """Display user status with icon."""
        if obj.is_active:
            return mark_safe(
                '<span class="badge badge-success"><i class="fas fa-check-circle"></i> Active</span>'
            )
        else:
            return mark_safe(
                '<span class="badge badge-danger"><i class="fas fa-ban"></i> Inactive</span>'
            )
    get_status_display.short_description = 'Account Status'
    
    class Media:
        css = {
            'all': ('css/admin_enhancements.css',)
        }


class BranchAdmin(admin.ModelAdmin):
    """Branch Administration."""
    
    list_display = (
        'branch_code',
        'branch_name',
        'region',
        'district',
        'phone_number',
        'is_active',
        'get_employee_count',
    )
    
    search_fields = (
        'branch_code',
        'branch_name',
        'district',
        'region',
    )
    
    list_filter = (
        'region',
        'is_active',
        'created_at',
    )
    
    readonly_fields = (
        'created_at',
        'updated_at',
    )
    
    fieldsets = (
        ('Basic Information', {
            'fields': (
                'branch_code',
                'branch_name',
                'region',
                'district',
            )
        }),
        ('Contact Information', {
            'fields': (
                'phone_number',
                'email',
                'address',
            )
        }),
        ('Status', {
            'fields': (
                'is_active',
            )
        }),
        ('Timestamps', {
            'fields': (
                'created_at',
                'updated_at',
            ),
            'classes': ('collapse',)
        }),
    )
    
    ordering = ('branch_name',)
    list_per_page = 20
    
    def get_employee_count(self, obj):
        """Display count of employees in the branch."""
        count = obj.employees.count()
        return format_html('<span class="badge badge-primary">{}</span>', count)
    get_employee_count.short_description = 'Employees'


class AuctioneerAdmin(admin.ModelAdmin):
    """Auctioneer Management."""
    
    list_display = (
        'company_name',
        'contact_person',
        'region',
        'get_license_badge',
        'get_workload_bar',
        'get_status_badge',
    )
    
    search_fields = (
        'company_name',
        'contact_person',
        'license_number',
        'email',
    )
    
    list_filter = (
        'region',
        'status',
        'license_expiry',
        'created_at',
    )
    
    readonly_fields = (
        'created_at',
        'updated_at',
    )
    
    fieldsets = (
        ('Company Information', {
            'fields': (
                'company_name',
                'contact_person',
                'phone_number',
                'email',
            )
        }),
        ('License Details', {
            'fields': (
                'license_number',
                'license_expiry',
                'license_document',
                'ura_registration',
                'get_license_status',
            )
        }),
        ('Geographic Coverage', {
            'fields': (
                'region',
                'regions',
                'office_address',
            )
        }),
        ('Capacity', {
            'fields': (
                'current_workload',
                'maximum_caseload',
                'get_workload_percentage',
            )
        }),
        ('Status', {
            'fields': (
                'status',
            )
        }),
        ('Timestamps', {
            'fields': (
                'created_at',
                'updated_at',
            ),
            'classes': ('collapse',)
        }),
    )
    
    ordering = ('company_name',)
    list_per_page = 20
    
    def get_license_badge(self, obj):
        """Display license status with badge."""
        from datetime import date
        if obj.license_expiry < date.today():
            return mark_safe(
                '<span class="badge badge-danger"><i class="fas fa-times-circle"></i> Expired</span>'
            )
        days_left = (obj.license_expiry - date.today()).days
        if days_left <= 30:
            return mark_safe(
                '<span class="badge badge-warning"><i class="fas fa-exclamation-triangle"></i> Expiring Soon</span>'
            )
        return mark_safe(
            '<span class="badge badge-success"><i class="fas fa-check-circle"></i> Active</span>'
        )
    get_license_badge.short_description = 'License Status'
    
    def get_workload_bar(self, obj):
        """Display workload capacity with progress bar."""
        if obj.maximum_caseload > 0:
            percentage = (obj.current_workload / obj.maximum_caseload) * 100
            if percentage >= 80:
                bar_color = 'danger'
            elif percentage >= 50:
                bar_color = 'warning'
            else:
                bar_color = 'success'
            
            return mark_safe(
                '<div class="progress" style="height: 18px; width: 150px;">' 
                '<div class="progress-bar bg-{}" role="progressbar" style="width: {}%">' 
                '{}/{}</div></div>'.format(bar_color, percentage, obj.current_workload, obj.maximum_caseload)
            )
        return mark_safe(
            '<span class="badge badge-secondary"><i class="fas fa-ban"></i> N/A</span>'
        )
    get_workload_bar.short_description = 'Workload (Current/Max)'
    
    def get_status_badge(self, obj):
        """Display auctioneer status with icon."""
        if obj.status:
            return mark_safe(
                '<span class="badge badge-success"><i class="fas fa-toggle-on"></i> Active</span>'
            )
        else:
            return mark_safe(
                '<span class="badge badge-secondary"><i class="fas fa-toggle-off"></i> Inactive</span>'
            )
    get_status_badge.short_description = 'Status'


class RecoveryCaseAdmin(admin.ModelAdmin):
    """Recovery Cases Administration."""
    
    list_display = (
        'case_number',
        'customer_name',
        'branch',
        'get_priority_badge',
        'get_status_badge',
        'outstanding_balance',
        'created_by',
        'created_at',
    )
    
    search_fields = (
        'case_number',
        'loan_account_number',
        'customer_name',
        'national_id',
    )
    
    list_filter = (
        'priority',
        'status',
        'branch',
        'recovery_stage',
        'created_at',
    )
    
    readonly_fields = (
        'created_at',
        'updated_at',
        'created_by',
    )
    
    fieldsets = (
        ('Case Information', {
            'fields': (
                'case_number',
                'recovery_stage',
            )
        }),
        ('Customer Details', {
            'fields': (
                'customer_name',
                'national_id',
                'phone_number',
            )
        }),
        ('Loan Information', {
            'fields': (
                'loan_account_number',
                'loan_amount',
                'outstanding_balance',
                'arrears_days',
            )
        }),
        ('Collateral Details', {
            'fields': (
                'collateral_type',
                'collateral_description',
                'collateral_location',
            )
        }),
        ('Case Status', {
            'fields': (
                'branch',
                'priority',
                'status',
            )
        }),
        ('Audit Trail', {
            'fields': (
                'created_by',
                'created_at',
                'updated_at',
            ),
            'classes': ('collapse',)
        }),
    )
    
    ordering = ('-created_at',)
    list_per_page = 20
    
    def get_priority_badge(self, obj):
        """Display priority with color-coded badge."""
        priority_colors = {
            'Low': 'success',
            'Medium': 'warning',
            'High': 'danger',
            'Critical': 'dark',
        }
        color = priority_colors.get(obj.priority, 'secondary')
        return format_html(
            '<span class="badge badge-{}"><i class="fas fa-exclamation-circle"></i> {}</span>',
            color,
            obj.priority
        )
    get_priority_badge.short_description = 'Priority'
    
    def get_status_badge(self, obj):
        """Display status with appropriate styling."""
        status_colors = {
            'Pending': 'secondary',
            'Allocated': 'info',
            'In Recovery': 'warning',
            'Recovered': 'success',
            'Closed': 'dark',
            'Cancelled': 'danger',
        }
        color = status_colors.get(obj.status, 'secondary')
        return format_html(
            '<span class="badge badge-{}">{}</span>',
            color,
            obj.status
        )
    get_status_badge.short_description = 'Status'


class AllocationAdmin(admin.ModelAdmin):
    """Allocation Administration."""
    
    list_display = (
        'recovery_case',
        'auctioneer',
        'allocated_by',
        'get_method_badge',
        'get_status_badge',
        'allocated_at',
    )
    
    search_fields = (
        'recovery_case__case_number',
        'auctioneer__company_name',
        'allocated_by__username',
    )
    
    list_filter = (
        'allocation_method',
        'allocation_status',
        'auctioneer',
        'allocated_at',
    )
    
    readonly_fields = (
        'allocated_at',
        'created_at',
        'updated_at',
        'allocated_by',
    )
    
    fieldsets = (
        ('Allocation Details', {
            'fields': (
                'recovery_case',
                'auctioneer',
                'allocation_method',
            )
        }),
        ('Status', {
            'fields': (
                'allocation_status',
            )
        }),
        ('Audit Information', {
            'fields': (
                'allocated_by',
                'allocated_at',
                'created_at',
                'updated_at',
            ),
            'classes': ('collapse',)
        }),
    )
    
    ordering = ('-allocated_at',)
    list_per_page = 20
    
    def get_method_badge(self, obj):
        """Display allocation method badge."""
        if obj.allocation_method == 'Automatic':
            return format_html(
                '<span class="badge badge-info"><i class="fas fa-robot"></i> {}</span>',
                'Automatic'
            )
        else:
            return format_html(
                '<span class="badge badge-primary"><i class="fas fa-hand-paper"></i> {}</span>',
                'Manual'
            )
    get_method_badge.short_description = 'Method'
    
    def get_status_badge(self, obj):
        """Display status badge."""
        status_colors = {
            'Active': 'success',
            'Completed': 'info',
            'Cancelled': 'danger',
        }
        color = status_colors.get(obj.allocation_status, 'secondary')
        return format_html(
            '<span class="badge badge-{}">{}</span>',
            color,
            obj.allocation_status
        )
    get_status_badge.short_description = 'Status'


class NotificationAdmin(admin.ModelAdmin):
    """Notifications Administration."""
    
    list_display = (
        'title',
        'recipient',
        'notification_type',
        'get_priority_badge',
        'get_read_status',
        'created_at',
    )
    
    search_fields = (
        'title',
        'recipient__username',
        'message',
    )
    
    list_filter = (
        'notification_type',
        'priority',
        'is_read',
        'created_at',
    )
    
    readonly_fields = (
        'created_at',
    )
    
    fieldsets = (
        ('Notification Details', {
            'fields': (
                'recipient',
                'title',
                'message',
            )
        }),
        ('Configuration', {
            'fields': (
                'notification_type',
                'priority',
                'is_read',
            )
        }),
        ('Timestamps', {
            'fields': (
                'created_at',
            ),
            'classes': ('collapse',)
        }),
    )
    
    ordering = ('-created_at',)
    list_per_page = 25
    
    def get_priority_badge(self, obj):
        """Display priority badge."""
        priority_colors = {
            'Low': 'success',
            'Medium': 'warning',
            'High': 'danger',
        }
        color = priority_colors.get(obj.priority, 'secondary')
        return format_html(
            '<span class="badge badge-{}">{}</span>',
            color,
            obj.priority
        )
    get_priority_badge.short_description = 'Priority'
    
    def get_read_status(self, obj):
        """Display read status."""
        if obj.is_read:
            return format_html(
                '<span class="badge badge-success"><i class="fas fa-envelope-open"></i> {}</span>',
                'Read'
            )
        else:
            return format_html(
                '<span class="badge badge-warning"><i class="fas fa-envelope"></i> {}</span>',
                'Unread'
            )
    get_read_status.short_description = 'Status'


class AuditLogAdmin(admin.ModelAdmin):
    """Audit Log Administration (Read-Only)."""
    
    list_display = (
        'created_at',
        'user',
        'action',
        'model_name',
        'object_name',
        'ip_address',
    )
    
    search_fields = (
        'user__username',
        'model_name',
        'object_name',
        'description',
        'ip_address',
    )
    
    list_filter = (
        'action',
        'model_name',
        'created_at',
        'user',
    )
    
    readonly_fields = (
        'user',
        'action',
        'model_name',
        'object_id',
        'object_name',
        'description',
        'ip_address',
        'created_at',
    )
    
    fieldsets = (
        ('Audit Information', {
            'fields': (
                'user',
                'action',
                'model_name',
                'object_name',
                'object_id',
            )
        }),
        ('Details', {
            'fields': (
                'description',
            )
        }),
        ('System Information', {
            'fields': (
                'ip_address',
                'created_at',
            )
        }),
    )
    
    ordering = ('-created_at',)
    list_per_page = 25
    
    def has_add_permission(self, request):
        """Audit logs are read-only."""
        return False
    
    def has_change_permission(self, request, obj=None):
        """Audit logs are read-only."""
        return False
    
    def has_delete_permission(self, request, obj=None):
        """Audit logs cannot be deleted."""
        return False


# Register all admin classes
admin.site.register(BankUser, BankUserAdmin)
admin.site.register(Branch, BranchAdmin)
admin.site.register(Auctioneer, AuctioneerAdmin)
admin.site.register(RecoveryCase, RecoveryCaseAdmin)
admin.site.register(Allocation, AllocationAdmin)
admin.site.register(Notification, NotificationAdmin)
admin.site.register(AuditLog, AuditLogAdmin)

# Customize the admin site
admin.site.site_header = "Centenary Bank - Allocation Management System"
admin.site.site_title = "Centenary Bank Admin"
admin.site.index_title = "Welcome to Centenary Bank Administration"
