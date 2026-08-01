
# Frontend Integration Guide - Allocation Engine

## Overview

This guide shows how to connect the backend Allocation Engine to your React frontend. Three frontend files have been created with complete integration instructions.

---

## 📁 Files Created

### 1. **lib/allocation-engine.ts** ✅ READY TO USE
Service layer with all allocation engine API calls.

**Location**: `/home/joseph/Desktop/AAAS/frontend/src/lib/allocation-engine.ts`

**Exports**:
- `allocateCase()` - Allocate single case
- `getAllocationRecommendations()` - Get top candidates
- `reallocateCase()` - Reassign case
- `getAllocationDashboard()` - Dashboard metrics
- `getAuctioneerMetrics()` - Auctioneer performance
- `batchAllocateCases()` - Bulk allocation
- `formatScoringFactors()` - Format for display
- `calculateCompositeScore()` - Calculate score
- `getScoreColor()` - UI color helper
- `getScoreBgColor()` - UI background helper

**Usage**:
```typescript
import { allocateCase, getAllocationRecommendations } from "@/lib/allocation-engine";

// Allocate a case
const result = await allocateCase(caseId, "automatic");

// Get recommendations
const recs = await getAllocationRecommendations(caseId, 5);
```

---

### 2. **components/AllocationRecommendationsPanel.tsx** ✅ READY TO USE
React component showing top allocation recommendations with scores.

**Location**: `/home/joseph/Desktop/AAAS/frontend/src/components/AllocationRecommendationsPanel.tsx`

**Props**:
- `caseId: number` - Recovery case to get recommendations for
- `casePriority?: string` - Display case priority context
- `collateralType?: string` - Display collateral type context
- `onRecommendationSelect?: (auctioneer_id, score) => void` - Callback when user selects
- `loading?: boolean` - Loading state override

**Features**:
- Shows top 5 candidates automatically
- Displays scoring breakdown (5 factors)
- Color-coded score visualization
- Loading states
- Empty state handling

**Usage**:
```typescript
import { AllocationRecommendationsPanel } from "@/components/AllocationRecommendationsPanel";

<AllocationRecommendationsPanel
  caseId={caseId}
  casePriority="High"
  collateralType="Land"
  onRecommendationSelect={(auctioneer_id, score) => {
    console.log(`Selected auctioneer ${auctioneer_id} with score ${score}`);
  }}
/>
```

---

### 3. **components/AuctioneerMetricsCard.tsx** ✅ READY TO USE
React component displaying auctioneer performance metrics.

**Location**: `/home/joseph/Desktop/AAAS/frontend/src/components/AuctioneerMetricsCard.tsx`

**Props**:
- `auctioneer_id: number` - Auctioneer to load metrics for
- `auctioneer_name: string` - Auctioneer name for display
- `className?: string` - Additional CSS classes

**Features**:
- Completion rate with progress bar
- Average recovery percentage
- Workload utilization with color coding
- Average lead time
- Performance by priority (if available)
- Critical priority cases badge
- Auto-loading on mount

**Usage**:
```typescript
import { AuctioneerMetricsCard } from "@/components/AuctioneerMetricsCard";

<AuctioneerMetricsCard
  auctioneer_id={5}
  auctioneer_name="ABC Auctioneers Ltd"
  className="lg:col-span-2"
/>
```

---

### 4. **ALLOCATION_ENGINE_INTEGRATION.md**
Step-by-step integration instructions for admin.auctioneers.tsx file.

**Contains**:
- Imports to add
- State variables to add
- Enhancement recommendations for:
  - Metrics section
  - Allocation engine status panel
  - Auctioneer table rows
  - Audit log section
  - New metrics view modal
  - Quick allocation button

**How to use**:
1. Open `admin.auctioneers.tsx`
2. Follow the snippets in this file
3. Copy/adapt the code sections provided
4. Test in browser

---

### 5. **CREDIT_ALLOCATION_ENHANCEMENT.md**
Integration guide for credit.allocation.tsx with new allocation engine features.

**Contains**:
- Imports to add
- Enhanced allocate() function
- New allocation panel section
- Recommendations panel integration
- Scoring factors display component
- Integration checklist
- Basic usage examples

**How to use**:
1. Open `credit.allocation.tsx`
2. Add new imports from allocation-engine
3. Import new components
4. Use code examples to integrate features

---

## 🔧 Integration Steps

### Step 1: Add API Service (5 minutes)
Copy `lib/allocation-engine.ts` to your project:
```bash
cp frontend/src/lib/allocation-engine.ts src/lib/
```

### Step 2: Add Components (10 minutes)
Copy component files:
```bash
cp frontend/src/components/AllocationRecommendationsPanel.tsx src/components/
cp frontend/src/components/AuctioneerMetricsCard.tsx src/components/
```

### Step 3: Update admin.auctioneers.tsx (20 minutes)
Follow `ALLOCATION_ENGINE_INTEGRATION.md`:
1. Add imports for `getAllocationDashboard` and `AuctioneerMetricsCard`
2. Add state for `dashboardMetrics` and `dashboardLoading`
3. Add useEffect to load dashboard data
4. Replace metrics grid with enhanced version
5. Add allocation engine status section
6. Add metrics modal for auctioneer details

**Key additions**:
```typescript
import { getAllocationDashboard } from "@/lib/allocation-engine";
import { AuctioneerMetricsCard } from "@/components/AuctioneerMetricsCard";

// In component:
const [dashboardMetrics, setDashboardMetrics] = useState<any | null>(null);

useEffect(() => {
  const loadDashboard = async () => {
    const metrics = await getAllocationDashboard();
    setDashboardMetrics(metrics);
  };
  loadDashboard();
  const interval = setInterval(loadDashboard, 30000); // Refresh every 30s
  return () => clearInterval(interval);
}, []);
```

### Step 4: Update credit.allocation.tsx (25 minutes)
Follow `CREDIT_ALLOCATION_ENHANCEMENT.md`:
1. Add imports for allocation engine functions
2. Import `AllocationRecommendationsPanel` component
3. Enhance `allocate()` function with allocation engine
4. Add allocation strategy selector
5. Add cases queue section
6. Add recommendations panel
7. Add scoring factors display modal

**Key additions**:
```typescript
import { 
  allocateCase, 
  getAllocationRecommendations,
  getAllocationDashboard,
} from "@/lib/allocation-engine";
import { AllocationRecommendationsPanel } from "@/components/AllocationRecommendationsPanel";

// Update allocate function:
const allocate = async (caseId: number, strategy: string = "automatic") => {
  const result = await allocateCase(caseId, strategy as any);
  if (result.success) {
    toast.success(`Allocated with score ${result.score?.toFixed(2)}`);
  }
  await refresh();
};
```

### Step 5: Test Integration (15 minutes)
1. Run development server: `npm run dev`
2. Navigate to `/admin/auctioneers` - should see dashboard metrics
3. Navigate to `/credit/allocation` - test allocation with recommendations
4. Check browser console for any errors
5. Verify API calls are made to allocation endpoints

---

## 📋 Integration Checklist

### Backend
- [ ] Allocation engine files copied to `backend/my_app/`
- [ ] Database migrations created and applied
- [ ] API endpoints added to `views.py`
- [ ] API routes added to `urls.py`
- [ ] Tests passing

### Frontend
- [ ] `allocation-engine.ts` copied to `src/lib/`
- [ ] `AllocationRecommendationsPanel.tsx` copied to `src/components/`
- [ ] `AuctioneerMetricsCard.tsx` copied to `src/components/`
- [ ] Imports added to target components
- [ ] State variables added
- [ ] useEffect hooks added
- [ ] UI sections added/updated

### Testing
- [ ] Development server runs without errors
- [ ] Admin auctioneer page loads with metrics
- [ ] Allocation page shows recommendations
- [ ] API calls complete successfully
- [ ] Scoring factors display correctly
- [ ] User can allocate case with engine

### Deployment
- [ ] Backend deployed and tested
- [ ] Frontend deployed and tested
- [ ] Monitoring enabled
- [ ] Team trained on new features

---

## 🎯 Feature-by-Feature Integration

### Feature 1: Automatic Recommendations
**File**: `credit.allocation.tsx`
**Component**: `AllocationRecommendationsPanel`

Shows top 5 candidates with scores:
```typescript
<AllocationRecommendationsPanel
  caseId={selectedCaseId}
  casePriority={case?.priority}
  onRecommendationSelect={(auctioneer_id, score) => {
    allocateCase(selectedCaseId, "manual", auctioneer_id);
  }}
/>
```

**Expected**: Panel loads, shows 5 ranked candidates, scores displayed

---

### Feature 2: Auctioneer Metrics
**File**: `admin.auctioneers.tsx`
**Component**: `AuctioneerMetricsCard`

Shows performance data for each auctioneer:
```typescript
<AuctioneerMetricsCard
  auctioneer_id={auctioneer.id}
  auctioneer_name={auctioneer.name}
/>
```

**Expected**: Card shows completion rate, recovery %, workload, lead time

---

### Feature 3: Live Dashboard
**File**: `admin.auctioneers.tsx`
**Service**: `getAllocationDashboard()`

Real-time metrics of allocation engine:
```typescript
const metrics = await getAllocationDashboard();
// Shows: queue status, capacity, performance, exceptions
```

**Expected**: Metrics section shows pending cases, available capacity, success rate

---

### Feature 4: Allocation Strategy Selection
**File**: `credit.allocation.tsx`
**Options**: Automatic, Priority, LoadBalance, Specialization, Manual

User selects allocation strategy:
```typescript
const result = await allocateCase(caseId, "priority");
```

**Expected**: Cases allocated using selected strategy

---

## 🐛 Troubleshooting

### Issue: API endpoints not found
**Solution**: 
- Check backend API endpoints are added to `urls.py`
- Verify Django server is running
- Check browser Network tab for 404 errors

### Issue: Recommendations don't load
**Solution**:
- Check `/api/cases/{id}/allocation-recommendations/` endpoint
- Verify case has eligible auctioneers
- Check browser console for errors

### Issue: Metrics show "N/A"
**Solution**:
- Allocation metrics might not be available yet
- Run `python manage.py backfill_allocation_metrics` on backend
- Check `AllocationMetrics` model exists in database

### Issue: Components not rendering
**Solution**:
- Check component imports are correct
- Watch for TypeScript errors
- Check if types are exported from service layer

---

## 📊 Data Flow

```
User View (React Component)
    ↓
Service Layer (allocation-engine.ts)
    ↓
API Calls (REST endpoints)
    ↓
Backend Services (Django)
    ↓
Database (Models)
    ↓
Response → Display in UI
```

### Example: Allocate Case Flow

```
User clicks "Allocate" button
    ↓
allocateCase(caseId, "automatic") called
    ↓
POST /api/cases/{id}/allocate-v2/
    ↓
Backend AllocationCoordinator.allocate_case()
    ↓
Return AllocationResult with score
    ↓
Display result and update UI
```

---

## 🚀 Performance Tips

1. **Refresh Intervals**: Dashboard refreshes every 30 seconds
2. **Caching**: Consider caching auctioneer specializations
3. **Lazy Loading**: Load metrics only when needed
4. **Batch Queries**: Use select_related() in backend queries
5. **UI Optimization**: Use useMemo for expensive calculations

---

## 📚 Related Documentation

- [Allocation Engine Design](../ALLOCATION_ENGINE_DESIGN.md)
- [Implementation Guide](../ALLOCATION_ENGINE_IMPLEMENTATION_GUIDE.md)
- [Quick Reference](../ALLOCATION_ENGINE_QUICK_REFERENCE.md)
- [Executive Summary](../ALLOCATION_ENGINE_EXECUTIVE_SUMMARY.md)

---

## ✅ Success Criteria

After integration, verify:
- ✓ Auctioneer dashboard shows live metrics
- ✓ Allocation shows top 5 recommendations
- ✓ Scoring factors are displayed
- ✓ Cases can be allocated with engine
- ✓ Performance metrics load correctly
- ✓ No console errors
- ✓ API responses complete in <1 second
- ✓ UI updates immediately after allocation

---

**Integration Status**: Ready for Implementation  
**Last Updated**: August 1, 2026  
**Version**: 1.0

