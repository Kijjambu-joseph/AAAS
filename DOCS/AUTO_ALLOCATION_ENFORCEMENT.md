# Auto-Allocation Enforcement System

## Overview

The Allocation Engine now enforces automatic allocation as the default strategy with configurable enforcement policies. This ensures consistent, intelligent allocation while allowing manual override when necessary.

**Key Benefit**: Eliminates manual allocation errors, ensures optimal case distribution, while maintaining flexibility for special cases.

---

## Four Enforcement Modes

### 1. **PERMISSIVE** (Most Flexible)
- ✅ Automatic allocation is default
- ✅ Manual allocation always allowed
- ✅ No enforcement restrictions
- **Use Case**: During pilot/rollout phase, low-risk environments

```python
coordinator = AllocationCoordinator(
    enforcement_mode=AllocationEnforcementMode.PERMISSIVE.value
)
```

**Result**: User can choose any strategy freely
- Automatic ✅
- Manual ✅
- Priority ✅
- Load Balance ✅

---

### 2. **ADVISORY** (Recommended)
- ✅ Automatic allocation is default
- ✅ Recommendations shown before manual override
- ✅ Manual requires dry-run preview
- **Use Case**: Balanced approach, most deployments

```python
coordinator = AllocationCoordinator(
    enforcement_mode=AllocationEnforcementMode.ADVISORY.value
)
```

**Flow**:
1. User requests manual allocation
2. System says: "Dry-run preview required first"
3. User sees automatic result (dry-run)
4. User can accept automatic OR override with manual

**Result**: Only automatic ✅ (until dry-run completed)

---

### 3. **BALANCED** (Intelligent Enforcement)
- ✅ Automatic for High/Critical cases (based on policy)
- ✅ Manual allowed for Normal/Low (with dry-run)
- ✅ Most flexible with safeguards
- **Use Case**: Production environments, balance speed & safety

```python
coordinator = AllocationCoordinator(
    enforcement_mode=AllocationEnforcementMode.BALANCED.value
)
coordinator.STRATEGY_CONFIG['enforcement_policy'] = \
    AllocationEnforcementPolicy.ENFORCE_HIGH_PRIORITY.value
```

**Policies** (choose one):

| Policy | Result |
|--------|--------|
| `ENFORCE_CRITICAL_ONLY` | Force auto for CRITICAL only |
| `ENFORCE_HIGH_PRIORITY` | Force auto for High + Critical |
| `ENFORCE_ALL` | Force auto for all priorities |
| `NO_ENFORCEMENT` | No forced automatic (soft recommendations) |

**Example Flow - High Priority Case**:
1. User allocates High priority case
2. System enforces automatic allocation
3. ❌ Manual not allowed
4. ✅ Must use: Automatic, Priority, Load Balance

**Example Flow - Normal Case**:
1. User allocates Normal priority case
2. System recommends automatic
3. ✅ Can use: Automatic immediately
4. ✅ Or: Complete dry-run, then manual

---

### 4. **STRICT** (Maximum Enforcement)
- ✅ Only automatic allocation allowed
- ✅ No manual override possible
- ✅ Consistent, predictable, no exceptions
- **Use Case**: Highly regulated, compliance-required, or testing

```python
coordinator = AllocationCoordinator(
    enforcement_mode=AllocationEnforcementMode.STRICT.value
)
```

**Result**: All strategies blocked except automatic
- ❌ Manual blocked
- ❌ Priority blocked
- ❌ Load Balance blocked
- ✅ ONLY Automatic allowed

**Error Message**: "Automatic allocation is mandatory in strict mode"

---

## Enforcement Policies (for BALANCED Mode)

### ENFORCE_CRITICAL_ONLY
```
CRITICAL cases    → Automatic (forced)
High cases        → Manual allowed (with dry-run)
Normal/Low cases  → Manual allowed (with dry-run)
```

### ENFORCE_HIGH_PRIORITY (Recommended Default)
```
CRITICAL cases    → Automatic (forced)
High cases        → Automatic (forced)
Normal/Low cases  → Manual allowed (with dry-run)
```

### ENFORCE_ALL
```
CRITICAL cases    → Automatic (forced)
High cases        → Automatic (forced)
Normal/Low cases  → Automatic (forced)
```
(Same as STRICT mode)

### NO_ENFORCEMENT
```
All cases         → Manual allowed (with dry-run)
All cases         → Automatic as default but voluntary
```

---

## How It Works in Practice

### Scenario 1: High Priority Case in BALANCED Mode
```python
# Setup
coordinator = AllocationCoordinator(
    enforcement_mode=AllocationEnforcementMode.BALANCED.value
)
coordinator.STRATEGY_CONFIG['enforcement_policy'] = \
    AllocationEnforcementPolicy.ENFORCE_HIGH_PRIORITY.value

case = RecoveryCase.objects.get(id=123)
case.priority = "High"  # HIGH PRIORITY

# User tries manual allocation
result = coordinator.allocate_case(
    case=case,
    strategy_type="manual",  # User requests manual
    auctioneer_id=456,
    dry_run=False
)

# Result
result.success = False
result.enforcement_blocked = True
result.enforcement_reason = "Auto-allocation enforced for High priority cases"
result.allowed_strategies = ["automatic"]
result.requires_dry_run = False
result.error_message = "Automatic allocation is required for High priority cases"
```

**Solution**: User must use automatic allocation for this case.

---

### Scenario 2: Normal Case with Dry-Run Requirement
```python
# Setup (BALANCED or ADVISORY mode)
case = RecoveryCase.objects.get(id=123)
case.priority = "Normal"

# User tries manual allocation (first attempt)
result = coordinator.allocate_case(
    case=case,
    strategy_type="manual",
    auctioneer_id=456,
    dry_run=False,
    dry_run_preview=False  # No preview yet
)

# Result
result.success = False
result.enforcement_blocked = True
result.enforcement_reason = "Manual allocation requires dry-run preview first"
result.requires_dry_run = True
result.error_message = "Dry-run required before manual allocation"
```

**Next Step**: User sees dry-run preview

```python
# User gets preview
preview_result = coordinator.verify_dry_run_preview(
    case=case,
    strategy_type="automatic"  # See what auto would do
)

# Shows automatic result to user
print(f"Auto would allocate to: {preview_result.auctioneer_id}")
print(f"With score: {preview_result.score}")

# Now user can:
# Option 1: Accept automatic result
# Option 2: Override with manual (now allowed)
result = coordinator.allocate_case(
    case=case,
    strategy_type="manual",
    auctioneer_id=789,  # Different choice
    dry_run=False,
    dry_run_preview=True  # Dry-run was completed
)

result.success = True  # NOW ALLOWS MANUAL
```

---

### Scenario 3: Critical Case in STRICT Mode
```python
# Setup
coordinator = AllocationCoordinator(
    enforcement_mode=AllocationEnforcementMode.STRICT.value
)

case = RecoveryCase.objects.get(id=123)
case.priority = "CRITICAL"

# Any non-automatic strategy will fail
result = coordinator.allocate_case(
    case=case,
    strategy_type="manual",  # Try manual
    auctioneer_id=456
)

# Result - BLOCKED
result.success = False
result.enforcement_blocked = True
result.error_message = "Automatic allocation is mandatory in strict mode"

# MUST use automatic
result = coordinator.allocate_case(
    case=case,
    strategy_type="automatic"  # Only option
)

result.success = True  # SUCCEEDS
```

---

## Backend Integration

### Setting Up Enforcement

```python
from my_app.allocation_coordinator import AllocationCoordinator
from my_app.allocation_engine import (
    AllocationEnforcementMode,
    AllocationEnforcementPolicy,
)

# Create with BALANCED enforcement
coordinator = AllocationCoordinator(
    user=request.user,
    enforcement_mode=AllocationEnforcementMode.BALANCED.value
)

# Optional: Configure policy
coordinator.STRATEGY_CONFIG['enforcement_policy'] = \
    AllocationEnforcementPolicy.ENFORCE_HIGH_PRIORITY.value

# Or change mode at runtime
coordinator.set_enforcement_mode(AllocationEnforcementMode.ADVISORY.value)
```

### Checking Enforcement Rules

```python
# What are the current rules?
rules = coordinator.get_enforcement_rules()
print(rules)
# Output:
# {
#     'enforcement_mode': 'balanced',
#     'default_strategy': 'automatic',
#     'policy': 'enforce_high_priority',
#     'modes_available': ['permissive', 'advisory', 'balanced', 'strict'],
#     'policies_available': [...]
# }
```

### Checking Case Status

```python
# What's allowed for this specific case?
status = coordinator.get_enforcement_status(case)
print(status)
# Output:
# {
#     'enforcement_mode': 'balanced',
#     'case_priority': 'High',
#     'auto_is_default': True,
#     'manual_requires_dry_run': True,
#     'auto_is_mandatory': False,
#     'priority_enforcement': {
#         'critical': False,
#         'high': True
#     }
# }
```

### Dry-Run Preview

```python
# User wants to see what automatic would do
preview = coordinator.verify_dry_run_preview(
    case=case,
    strategy_type="automatic"
)

print(f"Would allocate to: {preview.auctioneer_id}")
print(f"Score: {preview.score}")
print(f"Scoring factors: {preview.scoring_factors}")
```

---

## API Response Format

### Success with Enforcement (Automatic)
```json
{
  "success": true,
  "allocation_id": 123,
  "auctioneer_id": 456,
  "case_id": 789,
  "score": 85.5,
  "strategy_used": "automatic",
  "enforcement_blocked": false,
  "enforcement_reason": null
}
```

### Enforcement Block (Manual Not Allowed)
```json
{
  "success": false,
  "error_message": "Automatic allocation is required for High priority cases",
  "enforcement_blocked": true,
  "enforcement_reason": "Auto-allocation enforced for High priority cases",
  "allowed_strategies": ["automatic"],
  "requires_dry_run": false,
  "case_id": 789
}
```

### Dry-Run Required
```json
{
  "success": false,
  "error_message": "Dry-run required before manual allocation",
  "enforcement_blocked": true,
  "enforcement_reason": "Manual allocation requires dry-run preview first",
  "allowed_strategies": ["automatic"],
  "requires_dry_run": true,
  "case_id": 789
}
```

---

## Frontend Integration

### React Component - Check Enforcement

```typescript
import { getEnforcementStatus } from "@/lib/allocation-engine";

const [status, setStatus] = useState(null);

useEffect(() => {
  const load = async () => {
    const s = await getEnforcementStatus(caseId);
    setStatus(s);
  };
  load();
}, [caseId]);

if (status?.auto_is_mandatory) {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Automatic Allocation Required</AlertTitle>
      <AlertDescription>
        {status.case_priority} priority cases must be allocated automatically.
      </AlertDescription>
    </Alert>
  );
}
```

### React Component - Dry-Run Flow

```typescript
const [showPreview, setShowPreview] = useState(false);
const [previewResult, setPreviewResult] = useState(null);

const handleManualClick = async () => {
  if (status?.requires_dry_run && !previewResult) {
    // Show dry-run preview first
    const preview = await verifyDryRun(caseId);
    setPreviewResult(preview);
    setShowPreview(true);
  } else {
    // Proceed with manual allocation
    await allocateCase(caseId, "manual", selectedAuctioneer);
  }
};
```

---

## Configuration Reference

### Environment Variable Setup
```bash
# .env or settings.py
ALLOCATION_ENFORCEMENT_MODE=balanced
ALLOCATION_ENFORCEMENT_POLICY=enforce_high_priority
ALLOCATION_DEFAULT_STRATEGY=automatic
```

### Django Settings
```python
# settings.py
ALLOCATION_CONFIG = {
    'enforcement_mode': 'balanced',  # or 'strict', 'advisory', 'permissive'
    'enforcement_policy': 'enforce_high_priority',  # Which priorities to enforce
    'default_strategy': 'automatic',  # Unless overridden
    'high_priority_levels': ['High', 'CRITICAL', 'Critical'],
    'critical_priority_levels': ['CRITICAL', 'Critical'],
}
```

---

## Migration Path

### Phase 1: Pilot (Weeks 1-2)
- Use **PERMISSIVE** mode
- No enforcement, just defaults
- Get user feedback
- Monitor allocation quality

### Phase 2: Rollout (Weeks 3-4)
- Switch to **ADVISORY** mode
- Show dry-run previews
- Users practice workflow
- Build confidence

### Phase 3: Production (Week 5+)
- Switch to **BALANCED** mode
- Enforce critical cases only
- Allow manual with dry-run for others
- Optimal compliance + flexibility

### Phase 4: Optimization (Ongoing)
- Monitor exceptions and overrides
- Consider **STRICT** for specific regions/teams
- Adjust policy based on performance
- Fine-tune scoring weights

---

## Troubleshooting

### "Automatic allocation is required" Error
**Cause**: Case priority triggers enforcement, manual not allowed

**Solution**:
1. Check case priority
2. Check enforcement mode and policy
3. Use automatic allocation for this case
4. Contact admin if manual absolutely needed

### "Dry-run required before manual" Error
**Cause**: ADVISORY/BALANCED mode requires dry-run preview

**Solution**:
1. Call dry-run first: `verifyDryRun(caseId)`
2. Show user the preview
3. User accepts automatic OR confirms manual override
4. Then call allocate with `dry_run_preview=True`

### Changing Enforcement Mode at Runtime
**Code**:
```python
coordinator.set_enforcement_mode(AllocationEnforcementMode.STRICT.value)

# Or:
coordinator.STRATEGY_CONFIG['enforcement_mode'] = 'advisory'
coordinator.STRATEGY_CONFIG['enforcement_policy'] = 'enforce_critical_only'
```

### Bypass Enforcement (Emergency)
**Not Recommended** but possible:
```python
# Use PERMISSIVE mode (no enforcement)
coordinator.set_enforcement_mode(AllocationEnforcementMode.PERMISSIVE.value)

result = coordinator.allocate_case(case, strategy_type="manual", auctioneer_id=456)
# Now manual is allowed

# Switch back
coordinator.set_enforcement_mode(AllocationEnforcementMode.BALANCED.value)
```

---

## Performance Impact

- **Enforcement Check**: ~1-2ms per allocation
- **Dry-Run**: Same as full allocation (validation only, no DB writes)
- **No Performance Penalty** for PERMISSIVE mode
- **Minimal Overhead** for BALANCED/ADVISORY modes

---

## Summary

| Mode | Auto Default | Manual Allowed | Dry-Run Required | Best For |
|------|--------------|----------------|------------------|----------|
| **PERMISSIVE** | ✅ | ✅ Always | ❌ No | Pilot/Dev |
| **ADVISORY** | ✅ | ✅ After dry-run | ✅ Yes | Balanced |
| **BALANCED** | ✅ | ⚠️ Policy-based | ✅ For others | Recommended |
| **STRICT** | ✅ | ❌ Never | N/A | Compliance |

**Recommendation**: Start with **BALANCED** mode using `ENFORCE_HIGH_PRIORITY` policy.

