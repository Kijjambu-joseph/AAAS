# System Allocation Engine - Design Document

## Executive Summary

The Allocation Engine is the core intelligent system that assigns recovery cases to auctioneers. It uses multiple algorithms, constraint validation, scoring systems, and real-time monitoring to optimize allocation while respecting business rules and capacity limits.

## 1. Current State Analysis

### Existing Architecture
- **Models**: `RecoveryCase`, `Auctioneer`, `Allocation`, `Branch`
- **Services**: `AllocationService` (orchestrator)
- **Strategies**: `AutomaticAllocationStrategy`, `ManualAllocationStrategy`
- **Repositories**: Pattern for data access
- **Constraints**: 
  - Regional matching (auctioneer region must match case branch region)
  - License validity (must not be expired)
  - Workload capacity (current_workload < maximum_caseload)
  - Active status (auctioneer.status == True)

### Current Limitations
- **Simple Ranking**: Only sorts by `current_workload` and `company_name`
- **No Advanced Scoring**: Doesn't consider case priority, auctioneer specialization, or past performance
- **Limited Monitoring**: Basic allocation list without analytics
- **No Bulk Operations**: Single case allocation only
- **No Allocation History/Analytics**: No performance tracking
- **No Reassignment Logic**: Can't reallocate if needed
- **No Load Balancing**: Doesn't consider regional demand spikes

---

## 2. Proposed Architecture

### 2.1 High-Level System Design

```
┌─────────────────────────────────────────────────────────────┐
│              ALLOCATION ENGINE CORE                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Allocation Coordinator (Orchestrator)             │  │
│  │  - Routes cases through allocation pipeline        │  │
│  │  - Handles retries & error recovery                │  │
│  │  - Manages transaction atomicity                   │  │
│  └──────────────────────────────────────────────────────┘  │
│           ↓            ↓            ↓           ↓            │
│  ┌──────────────┐ ┌──────────────┐ ┌─────────────────┐    │
│  │ Constraint   │ │ Eligibility  │ │  Scoring &      │    │
│  │ Validator    │ │  Filter      │ │  Ranking        │    │
│  └──────────────┘ └──────────────┘ └─────────────────┘    │
│           ↓            ↓            ↓                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Strategy Engine (Pluggable Algorithms)             │  │
│  │  - Automatic (workload-based)                       │  │
│  │  - Priority (case priority first)                   │  │
│  │  - Regional Load Balancing                          │  │
│  │  - Specialization (auctioneer skills match)         │  │
│  │  - Manual Override                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│           ↓                                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Result Handler & Notification                      │  │
│  │  - Updates allocation & case status                 │  │
│  │  - Sends notifications                              │  │
│  │  - Logs audit trail                                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
         ↓           ↓           ↓            ↓
    ┌────────────┬────────────┬────────────┬─────────────┐
    │ Database   │ Messaging  │ Monitoring │ Analytics   │
    │            │ System     │ Dashboard  │ Hub         │
    └────────────┴────────────┴────────────┴─────────────┘
```

### 2.2 Core Components

#### A. **Constraint Validator**
Checks if auctioneer-case pair is valid before scoring.

**Constraints**:
- ✓ Regional match (case.branch.region == auctioneer.region OR auctioneer.regions contains case.branch.region)
- ✓ License valid (auctioneer.license_expiry >= today)
- ✓ Auctioneer active (auctioneer.status == True)
- ✓ Workload capacity (auctioneer.current_workload < auctioneer.maximum_caseload)
- ✓ Not already allocated (case.status != "Allocated")
- ✓ Case eligibility (case.status in ["Pending", "Unallocatable"])

#### B. **Eligibility Filter**
Returns pool of valid candidates after constraint validation.

```python
# Returns: List[Auctioneer]
candidates = filter_by_constraints(case)
```

#### C. **Scoring & Ranking Engine**
Calculates composite scores for each eligible auctioneer.

**Scoring Factors** (weighted):
1. **Workload Balance** (35%): Lower workload = higher score
   - Formula: (max_capacity - current_workload) / max_capacity
   
2. **Priority Alignment** (25%): Auctioneer historically handles similar priorities
   - Data: avg_case_priority_handled, success_rate_by_priority
   
3. **Specialization Match** (20%): Auctioneer specializes in collateral type
   - Data: specializations[], cases_by_collateral_type
   
4. **Regional Demand** (15%): Balance regional load
   - Formula: 1 / (regional_pending_cases + 1)
   
5. **Performance Metrics** (5%): Success rate, recovery rate
   - Data: completion_rate, average_recovery_percentage

**Composite Score**: 
```
score = (0.35 × workload) + (0.25 × priority) + (0.20 × specialization) + 
        (0.15 × regional_demand) + (0.05 × performance)
score ∈ [0, 100]
```

#### D. **Strategy Engine** (Pluggable Algorithms)

**Strategy Pattern**: Different allocation algorithms for different scenarios.

1. **AutomaticAllocationStrategy**
   - Uses scoring engine
   - Selects top-scored candidate
   - Best for steady-state allocation

2. **PriorityAllocationStrategy**
   - Prioritizes case.priority in scoring
   - Allocates critical cases to best performers
   - Use when backlog is high-priority

3. **LoadBalancingStrategy**
   - Emphasizes regional demand balancing
   - Prevents regional overload
   - Use when regional distribution is uneven

4. **SpecializationStrategy**
   - Matches auctioneer skills to case type
   - Considers historical performance by collateral type
   - Use for complex assets

5. **ManualAllocationStrategy**
   - Admin specifies auctioneer
   - Validates constraints
   - Useful for exceptions/overrides

6. **BatchAllocationStrategy**
   - Allocates multiple cases optimally
   - Considers inter-case interactions
   - Use for bulk operations

#### E. **Allocation Coordinator** (Orchestrator)
Main entry point that orchestrates the entire allocation flow.

```python
class AllocationCoordinator:
    def allocate_case(
        case: RecoveryCase,
        user: User,
        strategy_type: str = "automatic",
        force_auctioneer_id: int = None,
        dry_run: bool = False
    ) -> AllocationResult
    
    def allocate_cases_batch(
        cases: List[RecoveryCase],
        user: User,
        strategy_type: str = "automatic",
        retry_failed: bool = True
    ) -> BatchAllocationResult
    
    def reallocate_case(
        allocation: Allocation,
        reason: str,
        user: User
    ) -> AllocationResult
    
    def get_allocation_recommendations(
        case: RecoveryCase,
        top_n: int = 5
    ) -> List[AllocationRecommendation]
```

---

## 3. Data Model Enhancements

### 3.1 New Models/Fields

#### **AuctioneerSpecialization** (New)
```python
class AuctioneerSpecialization(models.Model):
    auctioneer = ForeignKey(Auctioneer)
    collateral_type = CharField(choices=COLLATERAL_TYPES)
    proficiency_level = IntegerField(1-5)  # Skill level
    years_of_experience = IntegerField()
    success_rate = DecimalField()  # % cases recovered in this category
```

#### **AllocationMetrics** (New)
Track auctioneer performance over time for scoring.

```python
class AllocationMetrics(models.Model):
    auctioneer = OneToOneField(Auctioneer)
    total_allocations = IntegerField()
    completed_allocations = IntegerField()
    completion_rate = DecimalField()
    average_recovery_percentage = DecimalField()
    average_days_to_recovery = IntegerField()
    success_by_priority = JSONField()  # {"Low": 0.92, "High": 0.87, ...}
    success_by_collateral = JSONField()  # {"Land": 0.95, "Motor": 0.88, ...}
    updated_at = DateTimeField(auto_now=True)
```

#### **AllocationHistory** (Enhancement)
```python
class Allocation:
    # Existing fields...
    
    # New fields for tracking
    strategic_reason = CharField()  # "workload_balance", "priority_handling", etc.
    scoring_data = JSONField()  # {"workload": 0.8, "priority": 0.9, ...}
    ranking_position = IntegerField()  # Position in scored list (1st, 2nd, etc.)
    recommendation_confidence = DecimalField()  # 0-100 (how sure was engine)
    
    # For reassignments
    reassigned_from = ForeignKey(Allocation, null=True, blank=True)
    reassignment_reason = CharField(blank=True)
```

#### **AllocationException** (New)
Track allocation exceptions and conflicts.

```python
class AllocationException(models.Model):
    EXCEPTION_TYPES = [
        ("NO_ELIGIBLE_AUCTIONEER", "No eligible auctioneer for constraints"),
        ("ALL_AUCTIONEERS_AT_CAPACITY", "All candidates at max capacity"),
        ("NO_ALLOCATION_POSSIBLE", "Case cannot be allocated"),
        ("MANUAL_EXCEPTION", "Manual exception flag by admin"),
        ("QUALITY_THRESHOLD", "No candidate meets quality threshold"),
    ]
    
    recovery_case = ForeignKey(RecoveryCase)
    exception_type = CharField(max_length=50, choices=EXCEPTION_TYPES)
    description = TextField()
    candidates_checked = IntegerField()
    candidates_eliminated_by = JSONField()  # Constraint names that eliminated candidates
    escalation_required = BooleanField(default=False)
    created_at = DateTimeField(auto_now_add=True)
```

---

## 4. API Design

### 4.1 Allocation Endpoints

#### **POST /api/cases/{id}/allocate/**
Allocate single case to auctioneer.

```json
Request:
{
  "strategy": "automatic|priority|load_balance|specialization|manual",
  "auctioneer_id": 5,  // Required for "manual", optional for others
  "dry_run": false,  // Preview without committing
  "force": false  // Override constraints if true
}

Response:
{
  "success": true,
  "allocation": {...},
  "scoring_details": {
    "selected_auctioneer": 5,
    "score": 87.5,
    "ranking_position": 1,
    "factors": {
      "workload": 0.85,
      "priority": 0.92,
      "specialization": 0.75,
      "regional_demand": 0.88,
      "performance": 0.90
    },
    "candidates_evaluated": 12,
    "constraints_summary": "All passed"
  }
}
```

#### **POST /api/cases/batch-allocate/**
Allocate multiple cases optimally.

```json
Request:
{
  "case_ids": [1, 2, 3, 4, 5],
  "strategy": "automatic|priority|load_balance",
  "max_per_auctioneer": null,  // Limit allocations per auctioneer
  "dry_run": false
}

Response:
{
  "successful": 5,
  "failed": 0,
  "allocations": [...],
  "exceptions": [],
  "summary": {
    "total_evaluated": 5,
    "regional_distribution": {"Central": 2, "Eastern": 3},
    "execution_time_ms": 234
  }
}
```

#### **POST /api/allocations/{id}/reallocate/**
Reallocate case (change auctioneer).

```json
Request:
{
  "reason": "auctioneer_requested_relief|case_complexity|performance_concerns",
  "new_auctioneer_id": 10,  // Optional, auto-select if not provided
  "strategy": "automatic"
}

Response:
{
  "old_allocation": {...},
  "new_allocation": {...},
  "change_summary": "Reallocated from Auctioneer A to B"
}
```

#### **GET /api/cases/{id}/allocation-recommendations/**
Get top candidates for a case with scoring details.

```json
Response:
{
  "case_id": 1,
  "recommendations": [
    {
      "rank": 1,
      "auctioneer_id": 5,
      "auctioneer_name": "ABC Auctioneers",
      "score": 92.3,
      "feasible": true,
      "factors": {...}
    },
    // ... more recommendations
  ]
}
```

### 4.2 Monitoring & Analytics Endpoints

#### **GET /api/allocation-engine/dashboard/**
Real-time allocation engine metrics.

```json
Response:
{
  "queue_status": {
    "total_pending": 45,
    "by_priority": {"Low": 10, "Medium": 25, "High": 8, "Critical": 2},
    "by_region": {"Central": 12, "Eastern": 15, "Northern": 10, "Western": 8}
  },
  "auctioneer_status": {
    "total_active": 18,
    "at_capacity": 3,
    "available": 15,
    "workload_avg": 7.2,
    "workload_max": 15
  },
  "allocation_stats": {
    "today_count": 12,
    "week_count": 87,
    "avg_time_to_allocate_hours": 2.5,
    "allocation_success_rate": 0.96
  },
  "exceptions": {
    "total_unallocatable": 8,
    "by_reason": {
      "no_eligible_auctioneer": 5,
      "all_at_capacity": 2,
      "quality_threshold": 1
    }
  },
  "performance": {
    "avg_allocation_time_ms": 145,
    "allocations_per_hour": 18
  }
}
```

#### **GET /api/auctioneers/{id}/allocation-performance/**
Detailed performance metrics for auctioneer.

```json
Response:
{
  "auctioneer_id": 5,
  "metrics": {
    "total_allocations": 156,
    "completion_rate": 0.94,
    "average_recovery_percentage": 82.5,
    "average_days_to_recovery": 45,
    "cases_at_critical_priority": 5,
    "current_workload": 12,
    "maximum_capacity": 15,
    "utilization_rate": 0.80
  },
  "by_priority": {
    "Low": {"count": 42, "completion_rate": 0.96},
    "Medium": {"count": 78, "completion_rate": 0.93},
    "High": {"count": 30, "completion_rate": 0.90},
    "Critical": {"count": 6, "completion_rate": 0.83}
  },
  "by_collateral": {
    "Land": {"count": 60, "success_rate": 0.96},
    "Motor Vehicle": {"count": 48, "success_rate": 0.92},
    // ... more collateral types
  }
}
```

---

## 5. Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [x] Design document
- [ ] Constraint Validator implementation
- [ ] Eligibility Filter implementation
- [ ] Basic Scoring Engine
- [ ] AllocationMetrics, AllocationException models
- [ ] Unit tests (>80% coverage)

### Phase 2: Core Engine (Week 3-4)
- [ ] Strategy interface enhanced
- [ ] AutomaticAllocationStrategy refactored with scoring
- [ ] PriorityAllocationStrategy implementation
- [ ] ManualAllocationStrategy enhancement
- [ ] Allocation Coordinator orchestrator
- [ ] Integration tests

### Phase 3: Advanced Features (Week 5-6)
- [ ] LoadBalancingStrategy
- [ ] SpecializationStrategy
- [ ] BatchAllocationStrategy
- [ ] Reallocation logic
- [ ] Dry-run capability
- [ ] Exception handling

### Phase 4: Monitoring & Analytics (Week 7-8)
- [ ] AllocationMetrics auto-update
- [ ] Dashboard API endpoint
- [ ] Performance tracking
- [ ] Monitoring views in frontend
- [ ] Audit logging enhancements

### Phase 5: Optimization (Week 9-10)
- [ ] Performance tuning (query optimization, caching)
- [ ] Load testing
- [ ] Machine learning ready (prepare data pipeline)
- [ ] Frontend UI enhancements
- [ ] Production deployment

---

## 6. Key Design Principles

1. **Single Responsibility**: Each component has one clear purpose
2. **Open/Closed**: Open for extension (new strategies), closed for modification
3. **Dependency Injection**: Services depend on abstractions, not concrete implementations
4. **Idempotency**: Allocation operations are repeatable without side effects
5. **Atomicity**: All-or-nothing transactions
6. **Observability**: All decisions logged with reasoning
7. **Extensibility**: Easy to add new constraints, scoring factors, strategies
8. **Performance**: Optimized queries, appropriate caching, efficient algorithms

---

## 7. Error Handling Strategy

### Exception Scenarios

| Scenario | Handling | User Impact |
|----------|----------|-------------|
| No eligible auctioneer | Create AllocationException, flag for manual review | Case stays Pending, exception notification |
| All at capacity | Create exception, suggest increasing capacity or reallocating existing | Escalation required |
| Constraint validation fails | Log constraint failure, provide detailed reason | Clear error message with remediation |
| Dry-run success but commit fails | Rollback transaction, retry with backoff | Retry UI prompt |
| Strategy execution error | Fall back to simpler strategy or manual | Admin intervention needed |

---

## 8. Future Enhancements

1. **Machine Learning Integration**
   - Predictive scoring based on historical outcomes
   - Anomaly detection in allocation patterns
   - Recommendation confidence scoring

2. **Advanced Algorithms**
   - Genetic algorithms for batch optimization
   - Graph-based allocation (minimize conflicts)
   - Time-series forecasting for capacity planning

3. **Integration**
   - Real-time SMS notifications
   - Integration with external auctioneer systems
   - Capacity demand forecasting

4. **Compliance**
   - Fairness audit (equitable workload distribution)
   - Bias detection in allocation patterns
   - Regulatory compliance reporting

5. **User Experience**
   - Drag-and-drop allocation in UI
   - Bulk allocation wizard
   - "What-if" scenario planning tool

---

## 9. Testing Strategy

### Unit Tests
- Constraint validators (all constraints)
- Scoring calculations (factor isolation)
- Strategy algorithms (edge cases)

### Integration Tests
- Allocation flow (end-to-end)
- Concurrent allocations
- Dry-run integrity

### Performance Tests
- Batch allocation (1000+ cases)
- Query response times (<500ms target)
- Scoring computation (<100ms target)

### Regression Tests
- Existing functionality (current behavior baseline)
- Constraint combination tests

---

## 10. Configuration & Tuning

### Scoring Weights (Configurable)
```python
ALLOCATION_SCORING_WEIGHTS = {
    "workload": 0.35,
    "priority": 0.25,
    "specialization": 0.20,
    "regional_demand": 0.15,
    "performance": 0.05,
}

ALLOCATION_THRESHOLDS = {
    "min_confidence_score": 50,  # Minimum score to auto-allocate
    "regional_load_balance_threshold": 0.2,
    "performance_quality_threshold": 0.75,
}
```

### Strategy Selection Rules
- If `pending_cases.count() > 50` → Use LoadBalancingStrategy
- If `case.priority == "Critical"` → Use PriorityAllocationStrategy
- If `collateral_type in auctioneer.specializations` → Use SpecializationStrategy
- Default → Use AutomaticAllocationStrategy

---

## 11. Success Metrics

- **Allocation Success Rate**: % cases allocated ≥ 95%
- **Allocation Fairness**: Std dev of workload ≤ 2 cases
- **Allocation Speed**: Average time ≤ 5 seconds
- **Quality Score**: Avg allocation score ≥ 85
- **Exception Rate**: Cases requiring manual intervention ≤ 3%
- **User Satisfaction**: Allocation recommendations rating ≥ 4/5

