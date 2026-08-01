"""
Signals for automatic allocation and case lifecycle management.
Automatically allocates cases when they are created with "Pending" status.
"""

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from django.conf import settings
import logging

from .models import RecoveryCase
from .services import AllocationService
from .allocation_coordinator import AllocationCoordinator
from .allocation_engine import AllocationEnforcementMode

logger = logging.getLogger(__name__)


@receiver(post_save, sender=RecoveryCase)
def auto_allocate_pending_case(sender, instance, created, **kwargs):
    """
    Automatically allocate a recovery case when it's created with Pending status.
    
    This signal ensures that:
    1. New cases are allocated immediately without waiting for manual trigger
    2. Enforcement policies are applied automatically
    3. The system works seamlessly in the background
    
    Args:
        sender: RecoveryCase model class
        instance: The RecoveryCase instance that was saved
        created: Boolean indicating if this is a new instance
        **kwargs: Additional signal arguments
    """
    # Only process newly created cases with Pending status
    if not created or instance.status != "Pending":
        return
    
    try:
        # Get system configuration for enforcement
        allocation_config = getattr(settings, "ALLOCATION_CONFIG", {})
        enforcement_mode = allocation_config.get("ENFORCEMENT_MODE", "balanced")
        
        # Create a coordinator with system user (no specific user for auto-allocation)
        # Use the case creator if available, otherwise create a system user
        coordinator = AllocationCoordinator(
            user=instance.created_by if instance.created_by else None,
            enforcement_mode=enforcement_mode
        )
        
        # Attempt automatic allocation
        result = coordinator.allocate_case(
            case=instance,
            strategy_type="automatic",
            auctioneer_id=None,
            dry_run=False,
            force=False,
            dry_run_preview=False
        )
        
        # Log the allocation outcome
        if result.success:
            logger.info(
                f"Auto-allocation successful for case {instance.case_number} "
                f"to auctioneer {result.allocation.auctioneer.company_name if result.allocation else 'None'}"
            )
        else:
            logger.warning(
                f"Auto-allocation failed for case {instance.case_number}: {result.error_message}"
            )
            
    except Exception as exc:
        # Log the error but don't raise - we don't want to break case creation
        logger.error(
            f"Auto-allocation signal error for case {instance.case_number}: {str(exc)}",
            exc_info=True
        )


@receiver(post_save, sender=RecoveryCase)
def update_auctioneer_workload(sender, instance, created, **kwargs):
    """
    Update auctioneer workload metrics when case status changes.
    Ensures accurate capacity tracking for allocation decisions.
    
    This is a separate signal to keep concerns separated.
    """
    # This can be extended to track auctioneer workload changes
    # For now, it's a placeholder for future workload tracking
    pass
