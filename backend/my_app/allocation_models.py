"""
New Allocation System Models
Models for enhanced allocation engine capabilities.

Add these to your models.py file or create a separate allocation_models.py
"""

from django.db import models
from django.conf import settings
from decimal import Decimal


class AuctioneerSpecialization(models.Model):
    """
    Tracks auctioneer specialization in specific collateral types.
    
    Enables skill-based allocation strategy.
    """
    
    COLLATERAL_TYPES = [
        ("Land", "Land"),
        ("Motor Vehicle", "Motor Vehicle"),
        ("Building", "Building"),
        ("Household Property", "Household Property"),
        ("Machinery", "Machinery"),
        ("Other", "Other"),
    ]
    
    PROFICIENCY_LEVELS = [
        (1, "Novice"),
        (2, "Beginner"),
        (3, "Intermediate"),
        (4, "Advanced"),
        (5, "Expert"),
    ]
    
    auctioneer = models.ForeignKey(
        'Auctioneer',
        on_delete=models.CASCADE,
        related_name='specializations'
    )
    
    collateral_type = models.CharField(
        max_length=30,
        choices=COLLATERAL_TYPES
    )
    
    proficiency_level = models.IntegerField(
        choices=PROFICIENCY_LEVELS,
        default=1,
        help_text="1=Novice, 5=Expert"
    )
    
    years_of_experience = models.PositiveIntegerField(
        default=0,
        help_text="Years of experience with this collateral type"
    )
    
    success_rate = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=Decimal('0.00'),
        help_text="Historical success rate (0-100) for this collateral type"
    )
    
    cases_handled = models.PositiveIntegerField(
        default=0,
        help_text="Number of cases handled for this collateral type"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('auctioneer', 'collateral_type')
        ordering = ['auctioneer', 'collateral_type']
        verbose_name = "Auctioneer Specialization"
        verbose_name_plural = "Auctioneer Specializations"
        indexes = [
            models.Index(fields=['auctioneer', 'proficiency_level']),
            models.Index(fields=['collateral_type']),
        ]
    
    def __str__(self):
        return f"{self.auctioneer.company_name} - {self.collateral_type} ({self.get_proficiency_level_display()})"


class AllocationMetrics(models.Model):
    """
    Tracks auctioneer performance metrics for scoring and analytics.
    
    Updated regularly via signals or batch jobs.
    """
    
    auctioneer = models.OneToOneField(
        'Auctioneer',
        on_delete=models.CASCADE,
        related_name='metrics'
    )
    
    total_allocations = models.PositiveIntegerField(
        default=0,
        help_text="Total number of cases allocated to this auctioneer"
    )
    
    completed_allocations = models.PositiveIntegerField(
        default=0,
        help_text="Number of cases completed/recovered"
    )
    
    completion_rate = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=Decimal('0.00'),
        help_text="Percentage of allocated cases completed (0-100)"
    )
    
    average_recovery_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=Decimal('0.00'),
        help_text="Average recovery rate as % of outstanding balance"
    )
    
    average_days_to_recovery = models.PositiveIntegerField(
        default=0,
        help_text="Average days from allocation to case completion"
    )
    
    # Performance by priority level (stored as JSON for flexibility)
    success_by_priority = models.JSONField(
        default=dict,
        blank=True,
        help_text='{"Low": 0.92, "Medium": 0.88, "High": 0.85, "Critical": 0.80}'
    )
    
    # Performance by collateral type (stored as JSON)
    success_by_collateral = models.JSONField(
        default=dict,
        blank=True,
        help_text='{"Land": 0.95, "Motor Vehicle": 0.88, ...}'
    )
    
    # Quality indicators
    customer_satisfaction_rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=Decimal('0.00'),
        help_text="Average customer satisfaction rating (0-5)"
    )
    
    complaints_count = models.PositiveIntegerField(
        default=0,
        help_text="Number of complaints received"
    )
    
    # Workload patterns
    peak_workload = models.PositiveIntegerField(
        default=0,
        help_text="Maximum workload reached"
    )
    
    last_updated = models.DateTimeField(
        auto_now=True,
        help_text="When metrics were last recalculated"
    )
    
    class Meta:
        verbose_name = "Allocation Metrics"
        verbose_name_plural = "Allocation Metrics"
        indexes = [
            models.Index(fields=['completion_rate']),
            models.Index(fields=['average_recovery_percentage']),
        ]
    
    def __str__(self):
        return f"Metrics for {self.auctioneer.company_name}"


class AllocationException(models.Model):
    """
    Tracks cases that couldn't be auto-allocated.
    
    Used for monitoring, escalation, and improving allocation strategy.
    """
    
    EXCEPTION_TYPES = [
        ("NO_ELIGIBLE_AUCTIONEER", "No eligible auctioneer for constraints"),
        ("ALL_AUCTIONEERS_AT_CAPACITY", "All candidates at maximum capacity"),
        ("NO_ALLOCATION_POSSIBLE", "Case cannot be allocated (other reasons)"),
        ("MANUAL_EXCEPTION", "Manual exception flagged by admin"),
        ("QUALITY_THRESHOLD_FAILED", "No candidate meets quality threshold"),
        ("REGION_NOT_COVERED", "No auctioneers available for region"),
        ("COLLATERAL_TYPE_UNSUPPORTED", "No specialist for collateral type"),
    ]
    
    recovery_case = models.ForeignKey(
        'RecoveryCase',
        on_delete=models.CASCADE,
        related_name='allocation_exceptions'
    )
    
    exception_type = models.CharField(
        max_length=50,
        choices=EXCEPTION_TYPES
    )
    
    description = models.TextField(
        help_text="Detailed description of why allocation failed"
    )
    
    candidates_checked = models.PositiveIntegerField(
        default=0,
        help_text="Number of auctioneers evaluated"
    )
    
    # Constraint violations that caused failure
    candidates_eliminated_by = models.JSONField(
        default=dict,
        blank=True,
        help_text='{"region_mismatch": 3, "at_capacity": 5, ...}'
    )
    
    escalation_required = models.BooleanField(
        default=False,
        help_text="Whether manual intervention is needed"
    )
    
    escalated_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='allocation_exceptions_escalated'
    )
    
    escalation_notes = models.TextField(
        blank=True,
        help_text="Notes from escalation/manual resolution"
    )
    
    resolved = models.BooleanField(
        default=False,
        help_text="Whether exception has been resolved"
    )
    
    resolved_at = models.DateTimeField(
        null=True,
        blank=True
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Allocation Exception"
        verbose_name_plural = "Allocation Exceptions"
        indexes = [
            models.Index(fields=['recovery_case', '-created_at']),
            models.Index(fields=['exception_type', 'resolved']),
            models.Index(fields=['escalation_required', 'resolved']),
        ]
    
    def __str__(self):
        return f"{self.get_exception_type_display()} - {self.recovery_case.case_number}"


# ============================================================================
# Extend existing Allocation model with new fields
# ============================================================================
# The following fields should be added to the existing Allocation model:
# These are shown for reference in creating a migration

"""
Additional Allocation Model Fields (create migration for these):

# Allocation strategy metadata
strategic_reason = models.CharField(
    max_length=100,
    choices=[
        ('workload_balance', 'Workload Balance'),
        ('priority_handling', 'Priority Handling'),
        ('specialization_match', 'Specialization Match'),
        ('regional_balance', 'Regional Load Balancing'),
        ('manual_override', 'Manual Override'),
    ],
    default='workload_balance',
    help_text="Strategic reason for this allocation"
)

# Scoring data captured at time of allocation
scoring_data = models.JSONField(
    default=dict,
    blank=True,
    help_text='{"workload": 0.8, "priority": 0.9, "specialization": 0.75, ...}'
)

# Position in the ranked list of candidates
ranking_position = models.PositiveIntegerField(
    null=True,
    blank=True,
    help_text="Position of auctioneer in scored ranking (1 = best)"
)

# Confidence level in the allocation
recommendation_confidence = models.DecimalField(
    max_digits=5,
    decimal_places=2,
    default=Decimal('100.00'),
    help_text="Engine confidence in this allocation (0-100)"
)

# For tracking reallocations
reassigned_from = models.ForeignKey(
    'Allocation',
    on_delete=models.SET_NULL,
    null=True,
    blank=True,
    related_name='reallocations'
)

reassignment_reason = models.CharField(
    max_length=200,
    blank=True,
    help_text="Reason for reallocation if this is a reassignment"
)
"""

