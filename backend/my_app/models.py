from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings



class Branch(models.Model):
    """
    Represents a Centenary Bank branch.
    """

    REGION_CHOICES = [
        ("Central", "Central"),
        ("Eastern", "Eastern"),
        ("Northern", "Northern"),
        ("Western", "Western"),
    ]

    branch_code = models.CharField(
        max_length=10,
        unique=True
    )

    branch_name = models.CharField(
        max_length=100
    )

    district = models.CharField(
        max_length=100
    )

    region = models.CharField(
        max_length=20,
        choices=REGION_CHOICES
    )

    address = models.TextField()

    phone_number = models.CharField(
        max_length=20
    )

    email = models.EmailField()

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["branch_name"]
        verbose_name = "Branch"
        verbose_name_plural = "Branches"

    def __str__(self):
        return f"{self.branch_name} ({self.branch_code})"
    

class Auctioneer(models.Model):
    """
    Represents an approved auctioneer company.
    """

    REGION_CHOICES = [
        ("Central", "Central"),
        ("Eastern", "Eastern"),
        ("Northern", "Northern"),
        ("Western", "Western"),
    ]

    company_name = models.CharField(
        max_length=150,
        unique=True
    )

    contact_person = models.CharField(
        max_length=100
    )

    phone_number = models.CharField(
        max_length=20
    )

    email = models.EmailField(
        unique=True
    )

    license_number = models.CharField(
        max_length=50,
        unique=True
    )

    license_expiry = models.DateField()

    region = models.CharField(
        max_length=20,
        choices=REGION_CHOICES
    )

    office_address = models.TextField()

    current_workload = models.PositiveIntegerField(
        default=0,
        help_text="Current number of active recovery cases."
    )

    status = models.BooleanField(
        default=True,
        help_text="Uncheck to deactivate the auctioneer."
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["company_name"]
        verbose_name = "Auctioneer"
        verbose_name_plural = "Auctioneers"

    def __str__(self):
        return self.company_name


class RecoveryCase(models.Model):

    PRIORITY_CHOICES = [
        ("Low", "Low"),
        ("Medium", "Medium"),
        ("High", "High"),
        ("Critical", "Critical"),
    ]

    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Allocated", "Allocated"),
        ("In Recovery", "In Recovery"),
        ("Recovered", "Recovered"),
        ("Closed", "Closed"),
        ("Cancelled", "Cancelled"),
    ]

    COLLATERAL_CHOICES = [
        ("Land", "Land"),
        ("Motor Vehicle", "Motor Vehicle"),
        ("Building", "Building"),
        ("Household Property", "Household Property"),
        ("Machinery", "Machinery"),
        ("Other", "Other"),
    ]

    case_number = models.CharField(
        max_length=20,
        unique=True
    )

    loan_account_number = models.CharField(
        max_length=30,
        unique=True
    )

    customer_name = models.CharField(
        max_length=150
    )

    national_id = models.CharField(
        max_length=20
    )

    phone_number = models.CharField(
        max_length=20
    )

    branch = models.ForeignKey(
        Branch,
        on_delete=models.PROTECT,
        related_name="recovery_cases"
    )

    loan_amount = models.DecimalField(
        max_digits=15,
        decimal_places=2
    )

    outstanding_balance = models.DecimalField(
        max_digits=15,
        decimal_places=2
    )

    collateral_type = models.CharField(
        max_length=30,
        choices=COLLATERAL_CHOICES
    )

    collateral_description = models.TextField()

    collateral_location = models.TextField()

    arrears_days = models.PositiveIntegerField()

    priority = models.CharField(
        max_length=20,
        choices=PRIORITY_CHOICES,
        default="Medium"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="created_recovery_cases"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Recovery Case"
        verbose_name_plural = "Recovery Cases"


    recovery_stage = models.CharField(
    max_length=30,
    choices=[
        ("Demand Notice", "Demand Notice"),
        ("Legal Review", "Legal Review"),
        ("Auctioneer Assignment", "Auctioneer Assignment"),
        ("Asset Recovery", "Asset Recovery"),
        ("Case Closed", "Case Closed"),
    ],
    default="Demand Notice"
    )

    def __str__(self):
        return f"{self.case_number} - {self.customer_name}"
    

class Allocation(models.Model):

    ALLOCATION_METHOD_CHOICES = [
        ("Automatic", "Automatic"),
        ("Manual", "Manual"),
    ]

    ALLOCATION_STATUS_CHOICES = [
        ("Active", "Active"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    ]

    recovery_case = models.OneToOneField(
        RecoveryCase,
        on_delete=models.CASCADE,
        related_name="allocation"
    )

    auctioneer = models.ForeignKey(
        Auctioneer,
        on_delete=models.PROTECT,
        related_name="allocations"
    )

    allocated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="allocations_made"
    )

    allocation_method = models.CharField(
        max_length=20,
        choices=ALLOCATION_METHOD_CHOICES,
        default="Automatic"
    )

    allocation_status = models.CharField(
        max_length=20,
        choices=ALLOCATION_STATUS_CHOICES,
        default="Active"
    )

    allocated_at = models.DateTimeField(
        auto_now_add=True
    )

    completed_at = models.DateTimeField(
        blank=True,
        null=True
    )

    remarks = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["-allocated_at"]
        verbose_name = "Allocation"
        verbose_name_plural = "Allocations"

    def __str__(self):
        return f"{self.recovery_case.case_number} → {self.auctioneer.company_name}"

class Notification(models.Model):

    NOTIFICATION_TYPES = [
        ("Case Created", "Case Created"),
        ("Case Allocated", "Case Allocated"),
        ("Case Updated", "Case Updated"),
        ("Case Closed", "Case Closed"),
        ("Case Reassigned", "Case Reassigned"),
        ("License Expiry", "License Expiry"),
        ("System", "System"),
    ]

    PRIORITY_CHOICES = [
        ("Low", "Low"),
        ("Medium", "Medium"),
        ("High", "High"),
    ]

    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="notifications"
    )

    title = models.CharField(
        max_length=150
    )

    message = models.TextField()

    notification_type = models.CharField(
        max_length=30,
        choices=NOTIFICATION_TYPES,
        default="System"
    )

    priority = models.CharField(
        max_length=10,
        choices=PRIORITY_CHOICES,
        default="Medium"
    )

    recovery_case = models.ForeignKey(
        RecoveryCase,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="notifications"
    )

    allocation = models.ForeignKey(
        Allocation,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="notifications"
    )

    is_read = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Notification"
        verbose_name_plural = "Notifications"

    def __str__(self):
        return f"{self.title} ({self.recipient.username})"

class AuditLog(models.Model):

    ACTION_CHOICES = [
        ("LOGIN", "Login"),
        ("LOGOUT", "Logout"),
        ("CREATE", "Create"),
        ("UPDATE", "Update"),
        ("DELETE", "Delete"),
        ("ALLOCATE", "Allocate"),
        ("REASSIGN", "Reassign"),
        ("APPROVE", "Approve"),
        ("REJECT", "Reject"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="audit_logs"
    )

    action = models.CharField(
        max_length=20,
        choices=ACTION_CHOICES
    )

    model_name = models.CharField(
        max_length=100
    )

    object_id = models.PositiveIntegerField()

    object_name = models.CharField(
        max_length=255
    )

    description = models.TextField()

    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Audit Log"
        verbose_name_plural = "Audit Logs"

    def __str__(self):
        username = self.user.username if self.user else "System"
        return f"{username} - {self.action} - {self.model_name}"

    
class BankUser(AbstractUser):
    ROLE_CHOICES = [
        ('LOAN_OFFICER', 'Loan Officer'),
        ('CREDIT_ADMIN', 'Credit Administrator'),
    ]

    employee_number = models.CharField(max_length=20, unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)

    branch = models.ForeignKey(
    Branch,
    on_delete=models.SET_NULL,
    null=True,
    blank=True,
    related_name="employees"
)

    def __str__(self):
        return f"{self.employee_number} - {self.get_full_name()}"