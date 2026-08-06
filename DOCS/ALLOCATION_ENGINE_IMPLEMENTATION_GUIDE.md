# Allocation Engine - Implementation Guide

## Quick Start

This guide walks you through integrating the new Allocation Engine into your existing Django application.

## Files Created

1. **`ALLOCATION_ENGINE_DESIGN.md`** - Comprehensive system design (reference)
2. **`allocation_engine.py`** - Core components (constraints, validators, scoring, strategies)
3. **`allocation_coordinator.py`** - Main orchestrator (allocation flow coordinator)
4. **`allocation_models.py`** - New database models (specializations, metrics, exceptions)
5. **`test_allocation_engine.py`** - Comprehensive test suite

## Implementation Steps

### Phase 1: Add Core Engine Components (Week 1)

#### 1.1 Review and Adapt Core Files
Copy the core engine files into your project:

```bash
cp allocation_engine.py backend/my_app/
cp allocation_coordinator.py backend/my_app/
cp test_allocation_engine.py backend/my_app/tests/
```

#### 1.2 Create Database Models
Add new models to `models.py` or create separate `allocation_models.py`:

```python
# In backend/my_app/models.py, add:
from .allocation_models import (
    AuctioneerSpecialization,
    AllocationMetrics,
    AllocationException,
)
```

Then create migration:

```bash
python manage.py makemigrations
python manage.py migrate
```

#### 1.3 Update Existing Allocation Model
Create a migration to add new fields to `Allocation` model:

```bash
python manage.py makemigrations --empty my_app --name add_allocation_engine_fields
```

Edit the migration file and add fields from `allocation_models.py` comments.

#### 1.4 Run Tests
```bash
python manage.py test my_app.tests.test_allocation_engine -v 2
```

### Phase 2: Create API Endpoints (Week 2)

#### 2.1 Update ViewSet
Create new allocation endpoints in `views.py`:

```python
# In backend/my_app/views.py

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from .allocation_coordinator import AllocationCoordinator

class RecoveryCaseViewSet(viewsets.ModelViewSet):
    # ... existing code ...
    
    @action(detail=True, methods=["post"], url_path="allocate-v2")
    def allocate_v2(self, request, pk=None):
        """New allocation endpoint using allocation engine."""
        case = self.get_object()
        
        coordinator = AllocationCoordinator(user=request.user)
        
        strategy = request.data.get('strategy', 'automatic')
        auctioneer_id = request.data.get('auctioneer_id')
        dry_run = request.data.get('dry_run', False)
        
        result = coordinator.allocate_case(
            case=case,
            strategy_type=strategy,
            auctioneer_id=auctioneer_id,
            dry_run=dry_run,
        )
        
        if result.success:
            return Response(
                {
                    'success': True,
                    'allocation_id': result.allocation_id,
                    'auctioneer_id': result.auctioneer_id,
                    'score': result.score,
                    'ranking_position': result.ranking_position,
                    'scoring_factors': result.scoring_factors.to_dict() if result.scoring_factors else None,
                },
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                {
                    'success': False,
                    'error': result.error_message,
                    'exception_type': result.exception_type.value if result.exception_type else None,
                },
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=True, methods=["get"], url_path="allocation-recommendations")
    def allocation_recommendations(self, request, pk=None):
        """Get top allocation recommendations for case."""
        case = self.get_object()
        top_n = request.query_params.get('top_n', 5)
        
        coordinator = AllocationCoordinator(user=request.user)
        recommendations = coordinator.get_allocation_recommendations(case, top_n=int(top_n))
        
        return Response([
            {
                'rank': rec.rank,
                'auctioneer_id': rec.auctioneer_id,
                'auctioneer_name': rec.auctioneer_name,
                'score': rec.score,
                'feasible': rec.feasible,
                'factors': rec.scoring_factors.to_dict(),
            }
            for rec in recommendations
        ])


class AllocationViewSet(viewsets.ModelViewSet):
    """API for allocation records."""
    
    queryset = Allocation.objects.all()
    serializer_class = AllocationSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=True, methods=["post"], url_path="reallocate")
    def reallocate(self, request, pk=None):
        """Reallocate case to different auctioneer."""
        allocation = self.get_object()
        
        coordinator = AllocationCoordinator(user=request.user)
        reason = request.data.get('reason', 'Performance concerns')
        new_auctioneer_id = request.data.get('new_auctioneer_id')
        
        result = coordinator.reallocate_case(
            allocation=allocation,
            reason=reason,
            new_auctioneer_id=new_auctioneer_id,
        )
        
        if result.success:
            return Response(
                {'success': True, 'allocation_id': result.allocation_id},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'success': False, 'error': result.error_message},
                status=status.HTTP_400_BAD_REQUEST
            )
```

#### 2.2 Add URLs
Update `urls.py` to include new endpoints or they'll be auto-discovered by DRF router.

#### 2.3 Update Serializers (Optional)
Add serializers for new response formats in `serializers.py`:

```python
from rest_framework import serializers
from .models import AllocationException

class AllocationExceptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllocationException
        fields = [
            'id', 'recovery_case', 'exception_type', 'description',
            'candidates_checked', 'escalation_required', 'resolved',
        ]
```

### Phase 3: Create Monitoring Dashboard API (Week 3)

#### 3.1 Dashboard Endpoint
Add to `views.py`:

```python
from django.db.models import Count, Avg, F, Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def allocation_dashboard(request):
    """Allocation engine dashboard metrics."""
    from .models import RecoveryCase, Allocation, Auctioneer
    
    # Queue status
    pending_cases = RecoveryCase.objects.filter(status="Pending")
    queue_status = {
        'total_pending': pending_cases.count(),
        'by_priority': dict(
            pending_cases.values('priority').annotate(count=Count('id')).
            values_list('priority', 'count')
        ),
        'by_region': dict(
            pending_cases.values('branch__region').annotate(count=Count('id')).
            values_list('branch__region', 'count')
        ),
    }
    
    # Auctioneer status
    active_auctioneers = Auctioneer.objects.filter(status=True)
    at_capacity = active_auctioneers.filter(
        current_workload__gte=F('maximum_caseload')
    ).count()
    
    auctioneer_status = {
        'total_active': active_auctioneers.count(),
        'at_capacity': at_capacity,
        'available': active_auctioneers.count() - at_capacity,
        'workload_avg': active_auctioneers.aggregate(
            avg=Avg('current_workload')
        )['avg'] or 0,
        'workload_max': active_auctioneers.aggregate(
            max=models.Max('current_workload')
        )['max'] or 0,
    }
    
    # Allocation stats
    allocations = Allocation.objects.filter(
        allocated_at__date=timezone.now().date()
    )
    
    allocation_stats = {
        'today_count': allocations.count(),
        'week_count': Allocation.objects.filter(
            allocated_at__gte=timezone.now() - timedelta(days=7)
        ).count(),
        'avg_time_to_allocate_hours': 2.5,  # TODO: Calculate from data
        'allocation_success_rate': 0.96,  # TODO: Calculate from data
    }
    
    # Exceptions
    from .models import AllocationException
    unresolved_exceptions = AllocationException.objects.filter(resolved=False)
    
    exceptions = {
        'total_unallocatable': unresolved_exceptions.count(),
        'by_reason': dict(
            unresolved_exceptions.values('exception_type').annotate(count=Count('id')).
            values_list('exception_type', 'count')
        ),
    }
    
    return Response({
        'queue_status': queue_status,
        'auctioneer_status': auctioneer_status,
        'allocation_stats': allocation_stats,
        'exceptions': exceptions,
    })
```

Add to `urls.py`:

```python
urlpatterns = [
    # ... existing patterns ...
    path('api/allocation-engine/dashboard/', allocation_dashboard, name='allocation-dashboard'),
]
```

### Phase 4: Update Frontend to Use New Engine (Week 4)

#### 4.1 Update React Components
Modify `frontend/src/routes/credit.allocation.tsx`:

```typescript
// Use new v2 API
const allocate = async (caseId: number, strategy: string = "automatic") => {
    try {
        const response = await Api.post(`/api/cases/${caseId}/allocate-v2/`, {
            strategy: strategy,
            dry_run: false,
        });
        
        if (response.success) {
            toast.success(`Case allocated with score ${response.score.toFixed(2)}`);
        }
        await refresh();
    } catch (error) {
        toast.error(error.message);
    }
};

// Get recommendations before allocating
const getRecommendations = async (caseId: number) => {
    const response = await Api.get(
        `/api/cases/${caseId}/allocation-recommendations/?top_n=5`
    );
    return response;
};
```

#### 4.2 Add Dashboard Component
Create new admin dashboard using the `/api/allocation-engine/dashboard/` endpoint.

### Phase 5: Data Migration & Testing (Week 5)

#### 5.1 Populate Allocation Metrics
Create a management command to backfill metrics:

```python
# backend/my_app/management/commands/backfill_allocation_metrics.py

from django.core.management.base import BaseCommand
from django.db.models import Count, Avg
from my_app.models import Auctioneer, Allocation, AllocationMetrics

class Command(BaseCommand):
    help = 'Backfill allocation metrics from historical data'
    
    def handle(self, *args, **options):
        for auctioneer in Auctioneer.objects.all():
            allocations = Allocation.objects.filter(auctioneer=auctioneer)
            completed = allocations.filter(allocation_status='Completed')
            
            total = allocations.count()
            completed_count = completed.count()
            
            metrics, created = AllocationMetrics.objects.get_or_create(
                auctioneer=auctioneer
            )
            
            metrics.total_allocations = total
            metrics.completed_allocations = completed_count
            metrics.completion_rate = (completed_count / total * 100) if total > 0 else 0
            metrics.average_recovery_percentage = 75.0  # TODO: Calculate from actual data
            metrics.save()
            
            self.stdout.write(
                f'✓ Updated metrics for {auctioneer.company_name}'
            )
```

Run it:
```bash
python manage.py backfill_allocation_metrics
```

#### 5.2 Run Integration Tests
```bash
python manage.py test my_app.tests.test_allocation_engine.TestAllocationIntegration -v 2
```

#### 5.3 A/B Testing (Optional)
Compare old vs new allocation strategy on test data:

```python
# Test script
from my_app.allocation_coordinator import AllocationCoordinator
from my_app.services import AllocationService

# Old way
old_service = AllocationService()
old_result = old_service.allocate_case(case, user)

# New way
coordinator = AllocationCoordinator(user=user)
new_result = coordinator.allocate_case(case)

print(f"Old: {old_result.auctioneer}")
print(f"New: {new_result.auctioneer_id}")
```

## Configuration

### Scoring Weights
Customize in `allocation_engine.py`:

```python
# In ScoringFactors.composite_score()
weights = {
    'workload': 0.35,      # Adjust to prioritize capacity
    'priority': 0.25,      # Adjust to prioritize urgent cases
    'specialization': 0.20, # Adjust for skill matching
    'regional_demand': 0.15, # Adjust for load balancing
    'performance': 0.05,   # Adjust for quality focus
}
```

### Strategy Selection
Customize in `AllocationCoordinator._get_strategy()`:

```python
# Add logic to select strategy based on case/system state
if pending_cases_count > 50:
    return LoadBalancingStrategy()  # High queue
elif case.priority == "Critical":
    return PriorityAllocationStrategy()  # Urgent
else:
    return AutomaticAllocationStrategy()  # Default
```

## Troubleshooting

### Issue: "No eligible auctioneer found"
**Cause**: All auctioneers eliminated by constraints
**Solution**: 
- Check license expiry dates (run `update_license_status.py`)
- Check regional coverage (add more auctioneers to region)
- Adjust workload capacity (increase `maximum_caseload`)

### Issue: Low allocation scores
**Cause**: Scoring factors all neutral (50%)
**Solution**:
- Implement `AllocationMetrics` tracking
- Populate `AuctioneerSpecialization` data
- Implement regional demand calculation (currently simplified)

### Issue: Performance slow on batch allocation
**Cause**: N+1 queries
**Solution**:
- Add `select_related('branch', 'auctioneer')` in queries
- Implement caching for regional load calculations
- Consider async task queue for large batches

## Next Steps

After Phase 5, consider:

1. **Machine Learning Integration** (advanced)
   - Predict allocation outcomes
   - Learn optimal scoring weights
   - Detect allocation patterns

2. **Real-time Monitoring**
   - WebSocket dashboard updates
   - Alert system for exceptions
   - Performance trending

3. **Advanced Algorithms**
   - Genetic algorithms for batch optimization
   - Graph-based fair allocation
   - Predictive capacity planning

4. **User Experience**
   - Drag-drop allocation UI
   - What-if scenario planning
   - Bulk allocation wizard

## Support & Documentation

- Design document: `ALLOCATION_ENGINE_DESIGN.md`
- API examples: See Phase 2 & 3 above
- Test examples: `test_allocation_engine.py`
- Component overview: See classes in `allocation_engine.py`

---

**Last Updated**: August 1, 2026
**Version**: 1.0 (Initial Implementation)

