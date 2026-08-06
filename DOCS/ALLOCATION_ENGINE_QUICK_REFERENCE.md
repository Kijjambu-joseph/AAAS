# Allocation Engine - Quick Reference Guide

## System Overview

The Allocation Engine intelligently assigns recovery cases to auctioneers using constraint validation, intelligent scoring, and pluggable strategies.

## Core Concepts

### 1. **Constraints** (Validation Layer)
Rules that must be satisfied for allocation to be valid.

| Constraint | Check | Impact |
|-----------|-------|--------|
| Region Match | Case region = Auctioneer region | Candidate eliminated if fails |
| License Valid | Auctioneer.license_expiry >= today | Candidate eliminated if fails |
| Active Status | Auctioneer.status == True | Candidate eliminated if fails |
| Workload Capacity | Current < Maximum caseload | Candidate eliminated if fails |
| Case Status | Case.status in ["Pending", "Unallocatable"] | Allocation rejected if fails |
| Not Allocated | Case.status != "Allocated" | Allocation rejected if fails |

**Key Class**: `EligibilityFilter`
```python
filter = EligibilityFilter()
eligible_candidates, violations = filter.filter(case, candidates)
```

### 2. **Scoring** (Intelligence Layer)
Calculates suitability score (0-100) for each eligible candidate.

| Factor | Weight | Formula | Example |
|--------|--------|---------|---------|
| Workload Balance | 35% | (max - current) / max | More capacity = higher score |
| Priority Alignment | 25% | Historical success @ priority | Critics get better auctioneers |
| Specialization | 20% | Match auctioneer skills | Land specialists for land cases |
| Regional Demand | 15% | Balance queue per region | Help busy regions first |
| Performance | 5% | Completion rate & recovery % | Proven performers get more |

**Composite Score**: 
```
score = (0.35 × workload) + (0.25 × priority) + (0.20 × specialization) +
        (0.15 × regional_demand) + (0.05 × performance)
```

**Key Class**: `ScoringEngine`
```python
engine = ScoringEngine(case, eligible_candidates)
ranked = engine.rank_candidates()  # Returns sorted by score
factors = engine.score_candidate(auctioneer)  # Individual scores
```

### 3. **Strategies** (Selection Layer)
Different algorithms for selecting from ranked candidates.

| Strategy | Use When | Selection Method |
|----------|----------|------------------|
| **Automatic** | Normal queue | Top-scored candidate |
| **Priority** | High backlog | Top performer for priority level |
| **Load Balance** | Uneven regional load | Balance pending cases per region |
| **Specialization** | Match expertise | Best specialist for collateral |
| **Manual** | Exception/override | Admin-specified auctioneer |
| **Batch** | Bulk allocation | Globally optimal assignment |

**Key Class**: `AllocationStrategy` (abstract)
```python
class AutomaticAllocationStrategy(AllocationStrategy):
    def allocate(self, case, eligible) -> (auctioneer_id, result)
```

### 4. **Coordinator** (Orchestration Layer)
Main entry point that ties everything together.

**Key Class**: `AllocationCoordinator`
```python
coordinator = AllocationCoordinator(user=request.user)

# Single case
result = coordinator.allocate_case(
    case=recovery_case,
    strategy_type="automatic",  # or "priority", "manual", etc
    auctioneer_id=5,  # For manual strategy
    dry_run=False,  # Just validate without committing
)

# Multiple cases
batch_result = coordinator.allocate_cases_batch(
    cases=[case1, case2, case3],
    strategy_type="load_balance",
)

# Get recommendations
recommendations = coordinator.get_allocation_recommendations(case, top_n=5)

# Reallocate if needed
new_result = coordinator.reallocate_case(
    allocation=old_allocation,
    reason="Performance concerns",
)
```

---

## Architecture Diagram

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│                   ALLOCATION COORDINATOR                       │
│              (Main entry point - orchestrator)                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
                     ▼           ▼           ▼
        ┌──────────────────────────────────────────────────┐
        │  1. GET CANDIDATES                              │
        │     From AuctioneerRepository by region          │
        │     Returns: All auctioneers in case region     │
        └──────────────────────────────────────────────────┘
                            ▼
        ┌──────────────────────────────────────────────────┐
        │  2. ELIGIBILITY FILTER (Constraint Validation)  │
        │     • Region Match                              │
        │     • License Valid                             │
        │     • Active Status                             │
        │     • Workload Capacity                         │
        │     • Case Status                               │
        │     Returns: Eligible candidates + violations   │
        └──────────────────────────────────────────────────┘
                            ▼
        ┌──────────────────────────────────────────────────┐
        │  3. SCORING ENGINE                              │
        │     For each eligible candidate:                │
        │     • workload_score (35%)                      │
        │     • priority_score (25%)                      │
        │     • specialization_score (20%)                │
        │     • regional_demand_score (15%)               │
        │     • performance_score (5%)                   │
        │     Returns: Ranked list by composite score    │
        └──────────────────────────────────────────────────┘
                            ▼
        ┌──────────────────────────────────────────────────┐
        │  4. SELECT STRATEGY                             │
        │     • AutomaticAllocationStrategy               │
        │     • PriorityAllocationStrategy                │
        │     • LoadBalancingStrategy                    │
        │     • SpecializationStrategy                   │
        │     • ManualAllocationStrategy                 │
        │     Returns: Selected auctioneer + score        │
        └──────────────────────────────────────────────────┘
                            ▼
        ┌──────────────────────────────────────────────────┐
        │  5. ALLOCATE & UPDATE                           │
        │     • Create Allocation record                  │
        │     • Update Case status                        │
        │     • Update Auctioneer workload                │
        │     • Send notifications                        │
        │     Returns: AllocationResult                   │
        └──────────────────────────────────────────────────┘
```

---

## Data Flow Example

### Scenario: Allocate Recovery Case #CASE-001

**Input**:
```python
case = RecoveryCase.objects.get(case_number="CASE-001")
# Case details:
# - Region: Central
# - Priority: High
# - Collateral: Land
# - Status: Pending
# - Outstanding: UGX 8,000,000

coordinator = AllocationCoordinator(user=admin_user)
```

**Step 1: Get Candidates**
```
Query: Auctioneer.objects.filter(
    region="Central",
    status=True,
    license_expiry__gte=today
)

Result: [Auctioneer #1, #2, #3, #4, #5]
```

**Step 2: Filter by Constraints**
```
For each candidate:
  ✓ Region = Central ✓
  ✓ License valid ✓
  ✓ Active ✓
  
  Check workload:
  - Auctioneer #1: 5/15 capacity ✓
  - Auctioneer #2: 12/15 capacity ✓
  - Auctioneer #3: 15/15 capacity ✗ (at capacity)
  - Auctioneer #4: 3/15 capacity ✓
  - Auctioneer #5: 7/15 capacity ✓

Eligible: [#1, #2, #4, #5]
Violations: [Auctioneer #3 at capacity]
```

**Step 3: Score Candidates**
```
Workload scores (max - current) / max:
  #1: (15-5)/15 × 100 = 66.7
  #2: (15-12)/15 × 100 = 20.0
  #4: (15-3)/15 × 100 = 80.0
  #5: (15-7)/15 × 100 = 53.3

Priority score (from historical data):
  All: 75.0 (average)

Specialization (Land expertise):
  #1: 60.0 (experienced with land)
  #2: 90.0 (specialist in land) ⭐
  #4: 40.0 (less experienced)
  #5: 50.0 (average)

Regional demand (pending in Central):
  All: 85.0 (need to help)

Performance (completion rate):
  #1: 92.0%
  #2: 88.0%
  #4: 95.0% ⭐
  #5: 87.0%

Composite Scores:
  #1: (0.35×66.7) + (0.25×75) + (0.20×60) + (0.15×85) + (0.05×92)
    = 23.3 + 18.8 + 12.0 + 12.8 + 4.6 = 71.5
  
  #2: (0.35×20) + (0.25×75) + (0.20×90) + (0.15×85) + (0.05×88)
    = 7.0 + 18.8 + 18.0 + 12.8 + 4.4 = 61.0
  
  #4: (0.35×80) + (0.25×75) + (0.20×40) + (0.15×85) + (0.05×95)
    = 28.0 + 18.8 + 8.0 + 12.8 + 4.8 = 72.4 ⭐ (Highest)
  
  #5: (0.35×53.3) + (0.25×75) + (0.20×50) + (0.15×85) + (0.05×87)
    = 18.7 + 18.8 + 10.0 + 12.8 + 4.4 = 64.7

Ranking:
  1. Auctioneer #4: 72.4 ✓
  2. Auctioneer #1: 71.5
  3. Auctioneer #5: 64.7
  4. Auctioneer #2: 61.0
```

**Step 4: Apply Strategy**
```
Strategy: AutomaticAllocationStrategy
Select: 1st ranked = Auctioneer #4
```

**Step 5: Allocate**
```
✓ Create Allocation record
  - Case: CASE-001
  - Auctioneer: #4
  - Score: 72.4
  - Ranking Position: 1
  - Method: automatic

✓ Update Case
  - Status: Pending → Allocated
  
✓ Update Auctioneer #4
  - current_workload: 3 → 4

✓ Send Notification
  "Case CASE-001 allocated to Auctioneer #4"

Return:
{
  "success": true,
  "allocation_id": 1234,
  "auctioneer_id": 4,
  "score": 72.4,
  "ranking_position": 1,
  "scoring_factors": {
    "workload": 80.0,
    "priority": 75.0,
    "specialization": 40.0,
    "regional_demand": 85.0,
    "performance": 95.0
  }
}
```

---

## API Usage Examples

### 1. Allocate Single Case (Automatic)
```python
from my_app.allocation_coordinator import AllocationCoordinator

coordinator = AllocationCoordinator(user=request.user)
result = coordinator.allocate_case(
    case=recovery_case,
    strategy_type="automatic"
)

if result.success:
    print(f"Allocated to auctioneer {result.auctioneer_id}")
    print(f"Score: {result.score:.2f}")
else:
    print(f"Failed: {result.error_message}")
```

### 2. Allocate with Priority Strategy
```python
result = coordinator.allocate_case(
    case=recovery_case,
    strategy_type="priority"  # Critical cases get best performers
)
```

### 3. Manual Allocation (Override)
```python
result = coordinator.allocate_case(
    case=recovery_case,
    strategy_type="manual",
    auctioneer_id=5  # Specific auctioneer
)
```

### 4. Dry-Run (Validate without committing)
```python
result = coordinator.allocate_case(
    case=recovery_case,
    dry_run=True  # Validate but don't save
)

if result.success:
    print(f"Would allocate to {result.auctioneer_id} (score: {result.score})")
    # Now user confirms and we allocate for real
```

### 5. Get Recommendations
```python
recommendations = coordinator.get_allocation_recommendations(
    case=recovery_case,
    top_n=5
)

for rec in recommendations:
    print(f"{rec.rank}. {rec.auctioneer_name}: {rec.score:.2f}")
```

### 6. Reallocate Case
```python
result = coordinator.reallocate_case(
    allocation=old_allocation,
    reason="Performance concerns",
    new_auctioneer_id=None,  # Auto-select if not specified
)
```

### 7. Batch Allocate Multiple Cases
```python
cases = RecoveryCase.objects.filter(status="Pending")[:10]
batch_result = coordinator.allocate_cases_batch(
    cases=cases,
    strategy_type="load_balance"
)

print(f"Allocated: {batch_result.successful}")
print(f"Failed: {batch_result.failed}")
print(f"Time: {batch_result.execution_time_ms:.0f}ms")
```

---

## Configuration Checklist

- [ ] Database models created and migrated
- [ ] Allocation engine files in place
- [ ] Tests running successfully
- [ ] API endpoints added to views.py
- [ ] URLs configured
- [ ] Scoring weights tuned for your domain
- [ ] Auctioneer specializations populated
- [ ] Allocation metrics backfilled
- [ ] Frontend components updated
- [ ] Monitoring dashboard set up

---

## Troubleshooting & FAQs

**Q: How do I change scoring weights?**
A: Edit `ScoringFactors.composite_score()` in `allocation_engine.py`

**Q: What if no auctioneers are eligible?**
A: Create an `AllocationException` record. Check license expiry, regional coverage, and capacity.

**Q: How do I integrate with existing code?**
A: Use `AllocationCoordinator` instead of `AllocationService`. Old code can still work in parallel.

**Q: How is dry_run useful?**
A: Users can see what would happen without committing. Good for UI previews.

**Q: Can I add custom strategies?**
A: Yes! Extend `AllocationStrategy` and register in `AllocationCoordinator._get_strategy()`

**Q: How do I track allocation performance?**
A: Check `AllocationMetrics` model. Query allocation success vs. recovery.

**Q: When should I use batch vs. single allocation?**
A: Use batch when you have many pending cases (10+) to optimize globally. Use single for real-time allocation.

---

## Performance Tips

1. **Pre-load candidates**: Cache regional auctioneer lists
2. **Use select_related**: Fetch related Branch, User data in one query
3. **Index strategically**: Add indexes on `region`, `status`, `current_workload`
4. **Batch metrics updates**: Update `AllocationMetrics` daily, not per allocation
5. **Limit recommendations**: Use `top_n=5` to avoid excessive scoring

---

## Next Steps

1. Implement Phase 1-2 from Implementation Guide
2. Run test suite to verify integration
3. Test with real data on staging
4. Monitor success metrics
5. Iterate on scoring weights based on results
6. Add advanced strategies (load balancing, specialization)
7. Integrate monitoring dashboard

---

**Document Version**: 1.0
**Last Updated**: August 1, 2026

