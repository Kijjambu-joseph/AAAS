# Auto-Allocation Enforcement - Integration Guide

## Quick Start (5 minutes)

### Backend Setup

```python
from my_app.allocation_coordinator import AllocationCoordinator
from my_app.allocation_engine import AllocationEnforcementMode, AllocationEnforcementPolicy

# Create coordinator with enforcement
coordinator = AllocationCoordinator(
    user=request.user,
    enforcement_mode=AllocationEnforcementMode.BALANCED.value
)

# Allocate case (enforcement happens automatically)
result = coordinator.allocate_case(
    case=recovery_case,
    strategy_type="manual",  # User requested manual
    auctioneer_id=auctioneer.id
)

# Check if enforcement blocked it
if result.enforcement_blocked:
    print(f"Blocked: {result.enforcement_reason}")
    print(f"Allowed strategies: {result.allowed_strategies}")
```

### Frontend Setup

```typescript
import { allocateCase, getEnforcementStatus, verifyDryRun } from "@/lib/allocation-engine";

// Check enforcement rules for this case
const status = await getEnforcementStatus(caseId);

// Check if manual is allowed
if (status?.auto_is_mandatory) {
  // Manual not allowed - show automatic only
} else if (status?.manual_requires_dry_run) {
  // Manual requires dry-run preview first
  const preview = await verifyDryRun(caseId);
  // Show preview to user
}

// Allocate with enforcement
const result = await allocateCase(caseId, "manual", selectedAuctioneer);

if (result.enforcement_blocked) {
  // Show error: result.enforcement_reason
  // Show allowed strategies: result.allowed_strategies
}
```

---

## Backend - Complete Implementation

### Step 1: Add to Django Views

```python
# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import transaction

from .models import RecoveryCase, Allocation
from .allocation_coordinator import AllocationCoordinator
from .allocation_engine import AllocationEnforcementMode

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@transaction.atomic
def allocate_case_with_enforcement(request, case_id):
    """
    Allocate case with automatic enforcement.
    
    POST /api/cases/{case_id}/allocate-v2/
    
    Body:
    {
        "strategy": "automatic|manual|priority|...",
        "auctioneer_id": 123,  // For manual
        "dry_run": false,
        "dry_run_preview": false  // Set true if dry-run already shown
    }
    
    Response:
    {
        "success": true/false,
        "allocation_id": 123,
        "auctioneer_id": 456,
        "score": 85.5,
        "strategy_used": "automatic",
        "enforcement_blocked": false,
        "error_message": null
    }
    """
    try:
        case = RecoveryCase.objects.get(id=case_id)
    except RecoveryCase.DoesNotExist:
        return Response({'error': 'Case not found'}, status=404)
    
    # Get parameters
    strategy = request.data.get('strategy', 'automatic')
    auctioneer_id = request.data.get('auctioneer_id')
    dry_run = request.data.get('dry_run', False)
    dry_run_preview = request.data.get('dry_run_preview', False)
    
    # Create coordinator with enforcement
    coordinator = AllocationCoordinator(
        user=request.user,
        enforcement_mode=AllocationEnforcementMode.BALANCED.value
    )
    
    # Allocate with enforcement
    result = coordinator.allocate_case(
        case=case,
        strategy_type=strategy,
        auctioneer_id=auctioneer_id,
        dry_run=dry_run,
        dry_run_preview=dry_run_preview,
    )
    
    # Return with enforcement info if blocked
    response_data = {
        'success': result.success,
        'allocation_id': result.allocation_id,
        'auctioneer_id': result.auctioneer_id,
        'case_id': case_id,
        'score': result.score,
        'strategy_used': result.strategy_used,
        'error_message': result.error_message,
    }
    
    # Add enforcement info
    if result.enforcement_blocked:
        response_data['enforcement_blocked'] = True
        response_data['enforcement_reason'] = result.enforcement_reason
        response_data['allowed_strategies'] = result.allowed_strategies
        response_data['requires_dry_run'] = result.requires_dry_run
    
    status_code = 200 if result.success else 400
    return Response(response_data, status=status_code)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_enforcement_status(request, case_id):
    """
    Get enforcement status for a case.
    
    GET /api/cases/{case_id}/enforcement-status/
    
    Response:
    {
        "enforcement_mode": "balanced",
        "case_priority": "High",
        "auto_is_default": true,
        "manual_requires_dry_run": true,
        "auto_is_mandatory": false,
        "priority_enforcement": {
            "critical": false,
            "high": true
        }
    }
    """
    try:
        case = RecoveryCase.objects.get(id=case_id)
    except RecoveryCase.DoesNotExist:
        return Response({'error': 'Case not found'}, status=404)
    
    coordinator = AllocationCoordinator(user=request.user)
    status = coordinator.get_enforcement_status(case)
    
    return Response(status)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_enforcement_rules(request):
    """
    Get system-wide enforcement rules.
    
    GET /api/allocation/enforcement-rules/
    
    Response:
    {
        "enforcement_mode": "balanced",
        "default_strategy": "automatic",
        "policy": "enforce_high_priority",
        "modes_available": ["permissive", "advisory", "balanced", "strict"],
        "policies_available": [...]
    }
    """
    coordinator = AllocationCoordinator(user=request.user)
    rules = coordinator.get_enforcement_rules()
    
    return Response(rules)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verify_dry_run(request, case_id):
    """
    Get preview of automatic allocation (dry-run).
    
    POST /api/cases/{case_id}/verify-dry-run/
    
    Body:
    {
        "strategy": "automatic"
    }
    
    Response: AllocationResult (preview only, not saved)
    """
    try:
        case = RecoveryCase.objects.get(id=case_id)
    except RecoveryCase.DoesNotExist:
        return Response({'error': 'Case not found'}, status=404)
    
    strategy = request.data.get('strategy', 'automatic')
    
    coordinator = AllocationCoordinator(user=request.user)
    result = coordinator.verify_dry_run_preview(case, strategy)
    
    return Response({
        'success': result.success,
        'auctioneer_id': result.auctioneer_id,
        'score': result.score,
        'scoring_factors': result.scoring_factors.to_dict() if result.scoring_factors else None,
        'strategy_used': result.strategy_used,
        'error_message': result.error_message,
    })
```

### Step 2: Add URL Routes

```python
# urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Enforcement endpoints
    path('cases/<int:case_id>/allocate-v2/', views.allocate_case_with_enforcement, name='allocate-v2'),
    path('cases/<int:case_id>/enforcement-status/', views.get_enforcement_status, name='enforcement-status'),
    path('cases/<int:case_id>/verify-dry-run/', views.verify_dry_run, name='verify-dry-run'),
    path('allocation/enforcement-rules/', views.get_enforcement_rules, name='enforcement-rules'),
    
    # ... existing URLs
]
```

### Step 3: Configure Enforcement Mode

```python
# settings.py
ALLOCATION_CONFIG = {
    # Enforcement mode: 'permissive', 'advisory', 'balanced', 'strict'
    'ENFORCEMENT_MODE': os.getenv('ALLOCATION_ENFORCEMENT_MODE', 'balanced'),
    
    # Enforcement policy: 'enforce_critical_only', 'enforce_high_priority', 'enforce_all', 'no_enforcement'
    'ENFORCEMENT_POLICY': os.getenv('ALLOCATION_ENFORCEMENT_POLICY', 'enforce_high_priority'),
    
    # Default strategy
    'DEFAULT_STRATEGY': 'automatic',
}

# Or in coordinator initialization:
# coordinator = AllocationCoordinator(
#     enforcement_mode=settings.ALLOCATION_CONFIG['ENFORCEMENT_MODE']
# )
```

---

## Frontend - React Integration

### Step 1: Create Enforcement Status Component

```typescript
// components/EnforcementStatusBadge.tsx
import { useState, useEffect } from 'react';
import { getEnforcementStatus, EnforcementStatus } from '@/lib/allocation-engine';
import { AlertCircle, Lock, CheckCircle } from 'lucide-react';

interface EnforcementStatusBadgeProps {
  caseId: number;
}

export function EnforcementStatusBadge({ caseId }: EnforcementStatusBadgeProps) {
  const [status, setStatus] = useState<EnforcementStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const s = await getEnforcementStatus(caseId);
      setStatus(s);
      setLoading(false);
    };
    load();
  }, [caseId]);

  if (loading) return null;
  if (!status) return null;

  // Auto is mandatory (STRICT mode)
  if (status.auto_is_mandatory) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200">
        <Lock className="w-4 h-4 text-red-600" />
        <span className="text-sm font-medium text-red-600">
          Automatic Required
        </span>
      </div>
    );
  }

  // Manual requires dry-run
  if (status.manual_requires_dry_run) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 border border-yellow-200">
        <AlertCircle className="w-4 h-4 text-yellow-600" />
        <span className="text-sm font-medium text-yellow-600">
          Dry-run Required for Manual
        </span>
      </div>
    );
  }

  // All strategies allowed (PERMISSIVE mode)
  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200">
      <CheckCircle className="w-4 h-4 text-green-600" />
      <span className="text-sm font-medium text-green-600">
        All Strategies Allowed
      </span>
    </div>
  );
}
```

### Step 2: Create Dry-Run Preview Modal

```typescript
// components/DryRunPreviewModal.tsx
import { useState } from 'react';
import { verifyDryRun, AllocationResult } from '@/lib/allocation-engine';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

interface DryRunPreviewModalProps {
  caseId: number;
  open: boolean;
  onAccept: () => void;
  onReject: () => void;
}

export function DryRunPreviewModal({
  caseId,
  open,
  onAccept,
  onReject,
}: DryRunPreviewModalProps) {
  const [preview, setPreview] = useState<AllocationResult | null>(null);
  const [loading, setLoading] = useState(true);

  // Load preview when opened
  useState(async () => {
    if (open) {
      setLoading(true);
      const result = await verifyDryRun(caseId);
      setPreview(result);
      setLoading(false);
    }
  }, [open, caseId]);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Automatic Allocation Preview</AlertDialogTitle>
          <AlertDialogDescription>
            This is what the automatic allocation strategy would do for this case.
            You can accept this allocation or select a different auctioneer manually.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {loading ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin">Loading...</div>
          </div>
        ) : preview && preview.success && preview.auctioneer_id ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Recommended Auctioneer</label>
              <p className="text-lg font-semibold">ID: {preview.auctioneer_id}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Allocation Score</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${Math.min(preview.score || 0, 100)}%` }}
                  />
                </div>
                <span className="font-semibold">{preview.score?.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-red-600">
            {preview?.error_message || 'Failed to load preview'}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onReject}>
            Choose Different
          </AlertDialogCancel>
          <AlertDialogAction onClick={onAccept}>
            Accept Recommendation
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

### Step 3: Update Allocation Flow

```typescript
// Example in credit.allocation.tsx

import {
  allocateCase,
  getEnforcementStatus,
  verifyDryRun,
  isStrategyAllowed,
} from "@/lib/allocation-engine";
import { EnforcementStatusBadge } from "@/components/EnforcementStatusBadge";
import { DryRunPreviewModal } from "@/components/DryRunPreviewModal";

export function CreditAllocation() {
  const [caseId, setCaseId] = useState<number | null>(null);
  const [selectedAuctioneer, setSelectedAuctioneer] = useState<number | null>(null);
  const [showDryRun, setShowDryRun] = useState(false);
  const [enforceStatus, setEnforceStatus] = useState(null);

  // Load enforcement status when case selected
  useEffect(() => {
    if (caseId) {
      const load = async () => {
        const status = await getEnforcementStatus(caseId);
        setEnforceStatus(status);
      };
      load();
    }
  }, [caseId]);

  const handleManualAllocate = async () => {
    // Check if dry-run is required
    if (enforceStatus?.manual_requires_dry_run && !showDryRun) {
      // Show dry-run preview
      setShowDryRun(true);
      return;
    }

    // Allocate with enforcement
    const result = await allocateCase(
      caseId!,
      "manual",
      selectedAuctioneer || undefined
    );

    if (result.enforcement_blocked) {
      // Show enforcement error
      alert(`Not allowed: ${result.enforcement_reason}`);
      return;
    }

    if (result.success) {
      alert(`Allocated to auctioneer ${result.auctioneer_id}`);
    } else {
      alert(`Error: ${result.error_message}`);
    }
  };

  return (
    <>
      {/* Show enforcement status for case */}
      {caseId && <EnforcementStatusBadge caseId={caseId} />}

      {/* Show button based on enforcement */}
      {enforceStatus?.auto_is_mandatory ? (
        <Button onClick={() => handleAutoAllocate()}>
          Auto Allocate (Required)
        </Button>
      ) : (
        <>
          <Button
            onClick={() => handleManualAllocate()}
            disabled={!selectedAuctioneer}
          >
            {enforceStatus?.manual_requires_dry_run ? "Manual (with Preview)" : "Manual"}
          </Button>
        </>
      )}

      {/* Dry-run preview modal */}
      <DryRunPreviewModal
        caseId={caseId!}
        open={showDryRun}
        onAccept={() => {
          setShowDryRun(false);
          // User accepted automatic - use that result
          handleAutoAllocate();
        }}
        onReject={() => {
          setShowDryRun(false);
          // User rejected - allow manual selection
        }}
      />
    </>
  );
}
```

---

## Testing Enforcement

### Backend Test

```python
# tests.py
from django.test import TestCase
from my_app.models import RecoveryCase, Auctioneer
from my_app.allocation_coordinator import AllocationCoordinator
from my_app.allocation_engine import AllocationEnforcementMode

class TestEnforcement(TestCase):
    
    def test_balanced_mode_forces_auto_for_high_priority(self):
        """High priority case should force automatic allocation"""
        coordinator = AllocationCoordinator(
            enforcement_mode=AllocationEnforcementMode.BALANCED.value
        )
        
        case = RecoveryCase.objects.create(
            priority="High",
            # ... other fields
        )
        
        result = coordinator.allocate_case(
            case=case,
            strategy_type="manual",  # Try manual
            auctioneer_id=123
        )
        
        # Should be blocked
        assert result.enforcement_blocked == True
        assert "High priority" in result.enforcement_reason
        assert result.allowed_strategies == ["automatic"]
    
    def test_dry_run_requirement(self):
        """Manual should require dry-run in BALANCED mode"""
        coordinator = AllocationCoordinator(
            enforcement_mode=AllocationEnforcementMode.BALANCED.value
        )
        
        case = RecoveryCase.objects.create(
            priority="Normal",  # Not high/critical
            # ... other fields
        )
        
        # First try (no dry-run)
        result = coordinator.allocate_case(
            case=case,
            strategy_type="manual",
            auctioneer_id=123,
            dry_run_preview=False
        )
        
        assert result.enforcement_blocked == True
        assert result.requires_dry_run == True
        
        # Second try (with dry-run)
        result2 = coordinator.allocate_case(
            case=case,
            strategy_type="manual",
            auctioneer_id=123,
            dry_run_preview=True
        )
        
        # Should be allowed now
        assert result2.enforcement_blocked == False
```

### Frontend Test

```typescript
// __tests__/enforcement.test.ts
import { isStrategyAllowed, getEnforcementMessage } from "@/lib/allocation-engine";

describe("Enforcement Helpers", () => {
  test("blocks manual when auto is mandatory", () => {
    const status = {
      auto_is_mandatory: true,
      manual_requires_dry_run: false,
    };
    
    expect(isStrategyAllowed(status, "automatic")).toBe(true);
    expect(isStrategyAllowed(status, "manual")).toBe(false);
  });

  test("requires dry-run for manual when needed", () => {
    const status = {
      auto_is_mandatory: false,
      manual_requires_dry_run: true,
    };
    
    // Without dry-run
    expect(isStrategyAllowed(status, "manual", false)).toBe(false);
    
    // With dry-run
    expect(isStrategyAllowed(status, "manual", true)).toBe(true);
  });
});
```

---

## Monitoring & Metrics

### Track Enforcement Events

```python
# Track when enforcement blocks a request
def allocate_case(self, ...):
    result = self.enforcer.validate_allocation_strategy(...)
    
    if not result.can_proceed:
        # Log enforcement event
        EnforcementLog.objects.create(
            case_id=case.id,
            enforcement_mode=self.enforcer.enforcement_mode,
            blocked_strategy=strategy_type,
            reason=result.decision.enforcement_reason,
            priority=case.priority,
            user=self.user,
        )
```

### Dashboard Metrics

```python
# Get enforcement statistics
def get_enforcement_metrics(days=7):
    from django.utils import timezone
    from datetime import timedelta
    
    since = timezone.now() - timedelta(days=days)
    
    blocked = EnforcementLog.objects.filter(
        created_at__gte=since
    ).values('enforcement_mode').annotate(
        count=Count('id')
    )
    
    return {
        'total_blocked': len(blocked),
        'by_mode': list(blocked),
        'override_attempts': EnforcementLog.objects.filter(
            created_at__gte=since,
            override_used=True
        ).count(),
    }
```

---

## Checklist

### Backend Setup
- [ ] Add enforcement enums to allocation_engine.py
- [ ] Add AllocationEnforcer class
- [ ] Update AllocationCoordinator with enforcement
- [ ] Create API views (4 endpoints)
- [ ] Add URL routes
- [ ] Configure settings.py
- [ ] Test enforcement validation
- [ ] Test dry-run functionality

### Frontend Setup
- [ ] Update allocation-engine.ts with enforcement APIs
- [ ] Add helper functions
- [ ] Create EnforcementStatusBadge component
- [ ] Create DryRunPreviewModal component
- [ ] Update credit.allocation.tsx
- [ ] Test dry-run flow
- [ ] Test strategy blocking

### Deployment
- [ ] Start with PERMISSIVE mode
- [ ] Test with ADVISORY mode
- [ ] Switch to BALANCED mode
- [ ] Monitor override patterns
- [ ] Document in deployment guide

