/**
 * Integration additions for admin.auctioneers.tsx
 * Add these imports and code snippets to connect allocation engine
 */

// ============================================================================
// IMPORTS TO ADD AT TOP
// ============================================================================

/*
import { getAllocationDashboard } from "@/lib/allocation-engine";
import { AuctioneerMetricsCard } from "@/components/AuctioneerMetricsCard";
*/

// ============================================================================
// STATE TO ADD IN AuctioneerPanel FUNCTION
// ============================================================================

/*
const [dashboardMetrics, setDashboardMetrics] = useState<any | null>(null);
const [dashboardLoading, setDashboardLoading] = useState(false);

// Add to useEffect hook:
// Load allocation engine dashboard metrics
useEffect(() => {
  const loadDashboard = async () => {
    setDashboardLoading(true);
    const metrics = await getAllocationDashboard();
    setDashboardMetrics(metrics);
    setDashboardLoading(false);
  };

  loadDashboard();
  // Refresh every 30 seconds
  const interval = setInterval(loadDashboard, 30000);
  return () => clearInterval(interval);
}, []);
*/

// ============================================================================
// REPLACEMENT FOR METRICS SECTION
// ============================================================================

/*
Replace the current metrics grid (showing "Avg. Success Rate", "Active Cases", etc.)
with this enhanced version:

<div className="grid grid-cols-1 gap-md md:grid-cols-4">
  <div className="flex flex-col gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest p-md">
    <span className="text-label-bold uppercase text-on-surface-variant">Total Partners</span>
    <div className="flex items-baseline gap-2">
      <span className="text-display-lg text-primary">{records.length}</span>
      <span className="text-xs font-bold text-green-600">Live records</span>
    </div>
  </div>

  <div className="flex flex-col gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest p-md">
    <span className="text-label-bold uppercase text-on-surface-variant">Success Rate</span>
    <div className="flex items-baseline gap-2">
      <span className="text-display-lg text-primary">
        {dashboardMetrics?.allocation_stats?.allocation_success_rate
          ? (dashboardMetrics.allocation_stats.allocation_success_rate * 100).toFixed(1)
          : "N/A"}%
      </span>
      <span className="text-xs font-bold text-green-600">Engine tracked</span>
    </div>
  </div>

  <div className="flex flex-col gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest p-md">
    <span className="text-label-bold uppercase text-on-surface-variant">Active Cases</span>
    <div className="flex items-baseline gap-2">
      <span className="text-display-lg text-primary">
        {dashboardMetrics?.queue_status?.total_pending || 0}
      </span>
      <span className="text-xs font-bold text-secondary">Pending allocation</span>
    </div>
  </div>

  <div className="flex flex-col gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest p-md">
    <span className="text-label-bold uppercase text-on-surface-variant">Available Capacity</span>
    <div className="flex items-baseline gap-2">
      <span className="text-display-lg text-primary">
        {dashboardMetrics?.auctioneer_status?.available || 0}
      </span>
      <span className="text-xs font-bold text-blue-600">
        of {dashboardMetrics?.auctioneer_status?.total_active || 0}
      </span>
    </div>
  </div>
</div>
*/

// ============================================================================
// ADD ALLOCATION ENGINE STATUS SECTION
// ============================================================================

/*
Add this new section after the metrics and before the filters:

<div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg">
  <div className="flex items-center justify-between mb-4">
    <div>
      <h3 className="text-title-md text-primary">Allocation Engine Status</h3>
      <p className="text-xs text-on-surface-variant">Real-time system performance</p>
    </div>
    <div className="flex items-center gap-2">
      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      <span className="text-xs font-bold text-green-600">Live</span>
    </div>
  </div>

  {dashboardMetrics ? (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Queue Status */}
      <div className="rounded-lg bg-surface-container p-3">
        <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-2">Queue Status</p>
        <div className="space-y-1.5">
          {Object.entries(dashboardMetrics.queue_status.by_priority || {}).map(([priority, count]: [string, any]) => (
            <div key={priority} className="flex justify-between text-xs">
              <span className="text-on-surface">{priority}</span>
              <span className="font-bold text-primary">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Auctioneer Capacity */}
      <div className="rounded-lg bg-surface-container p-3">
        <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-2">Capacity</p>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-on-surface">At Capacity</span>
            <span className="font-bold text-red-600">{dashboardMetrics.auctioneer_status?.at_capacity || 0}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-on-surface">Available</span>
            <span className="font-bold text-green-600">{dashboardMetrics.auctioneer_status?.available || 0}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-on-surface">Avg Workload</span>
            <span className="font-bold text-primary">
              {dashboardMetrics.auctioneer_status?.workload_avg?.toFixed(1) || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="rounded-lg bg-surface-container p-3">
        <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-2">Performance</p>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-on-surface">Today</span>
            <span className="font-bold text-primary">{dashboardMetrics.allocation_stats?.today_count || 0}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-on-surface">This Week</span>
            <span className="font-bold text-primary">{dashboardMetrics.allocation_stats?.week_count || 0}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-on-surface">Success Rate</span>
            <span className="font-bold text-green-600">
              {(dashboardMetrics.allocation_stats?.allocation_success_rate * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-24 rounded bg-surface-container animation-pulse" />
  )}

  {dashboardMetrics?.exceptions?.total_unallocatable > 0 && (
    <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3 flex gap-3">
      <Icon name="warning_amber" className="text-red-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-[11px] font-bold text-red-800">Allocation Exceptions</p>
        <p className="text-[10px] text-red-700">
          {dashboardMetrics.exceptions.total_unallocatable} cases require manual intervention
        </p>
      </div>
    </div>
  )}
</div>
*/

// ============================================================================
// ENHANCEMENT TO AUCTIONEER TABLE ROW
// ============================================================================

/*
In the table row for each auctioneer, you can add:

1. Add "Metrics" button in the actions column:

<button 
  onClick={() => {
    // Show metrics modal or expand details
    alert(`Metrics for ${a.name} - Check browser console for available data`);
    console.log(`Load full metrics for auctioneer ${a.id}`);
  }}
  className="text-primary hover:text-secondary transition-colors"
  title="View allocation metrics"
>
  <Icon name="pie_chart" className="text-sm" />
</button>

2. Add metrics display in row hover state:
- Show last 5 allocations
- Display performance percentages
- Highlight specializations
*/

// ============================================================================
// ENHANCEMENT TO AUDIT LOG SECTION
// ============================================================================

/*
Replace the "Recent Audit Actions" section with enhanced filtering:

<div className="flex h-full flex-col rounded-lg border border-outline-variant bg-surface-container-lowest p-lg">
  <div className="flex items-center justify-between mb-4">
    <h4 className="text-title-lg text-primary">Activity Timeline</h4>
    <select className="text-xs px-2 py-1 rounded border border-outline-variant">
      <option>All Actions</option>
      <option>Allocations Only</option>
      <option>Reallocations</option>
      <option>Exceptions</option>
    </select>
  </div>
  <div className="flex-grow space-y-4 overflow-y-auto">
    {audits
      .filter((item) => 
        item.model_name === "auctioneer" || 
        item.model_name === "allocation" ||
        item.model_name === "allocationexception"
      )
      .slice(0, 5)
      .map((item) => (
        <div key={item.id} className="flex gap-3 border-b border-outline-variant/30 pb-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-surface-container">
            <Icon 
              name={
                item.model_name === "allocation" ? "assignment_add" :
                item.model_name === "allocationexception" ? "warning" :
                "person_add"
              } 
              className="text-[16px]" 
            />
          </div>
          <div>
            <p className="text-body-sm font-bold leading-tight text-primary">{item.action}</p>
            <p className="mt-0.5 text-[11px] text-on-surface-variant">{item.description}</p>
            <span className="text-[10px] font-medium text-on-surface-variant opacity-60">
              {new Date(item.created_at).toLocaleString()} • {item.user_name}
            </span>
          </div>
        </div>
      ))}
  </div>
</div>
*/

// ============================================================================
// NEW MODAL: VIEW AUCTIONEER DETAILED METRICS
// ============================================================================

/*
Add this new modal to show detailed auctioneer metrics:

const [selectedAuctioneerForMetrics, setSelectedAuctioneerForMetrics] = useState<any | null>(null);
const [metricsModalOpen, setMetricsModalOpen] = useState(false);

Then add:

{selectedAuctioneerForMetrics && (
  <Modal
    open={metricsModalOpen}
    onClose={() => setMetricsModalOpen(false)}
    title={`${selectedAuctioneerForMetrics.name} - Performance Metrics`}
    subtitle="Comprehensive allocation engine performance data"
    icon="trending_up"
    tone="primary"
    size="lg"
  >
    <AuctioneerMetricsCard 
      auctioneer_id={selectedAuctioneerForMetrics.id}
      auctioneer_name={selectedAuctioneerForMetrics.name}
    />
  </Modal>
)}
*/

// ============================================================================
// QUICK ALLOCATION BUTTON ENHANCEMENT
// ============================================================================

/*
The floating action button can be enhanced:

<button 
  className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container shadow-lg transition-transform hover:scale-105 active:scale-95"
  onClick={async () => {
    // Open quick allocation dialog
    alert('Quick allocation feature - would open allocation UI');
    // This would integrate with the allocation engine to provide
    // quick allocations for pending cases
  }}
>
  <Icon name="assignment_add" className="text-2xl" />
  <span className="absolute right-full mr-4 whitespace-nowrap rounded bg-primary px-3 py-1.5 text-xs text-on-primary opacity-0 transition-opacity group-hover:opacity-100">
    Quick Case Allocation
  </span>
</button>
*/

export const ALLOCATION_ENGINE_INTEGRATION = {
  description: "Integration snippets for admin.auctioneers.tsx",
  imports: [
    "getAllocationDashboard from @/lib/allocation-engine",
    "AuctioneerMetricsCard from @/components/AuctioneerMetricsCard",
  ],
  newComponents: [
    "AllocationEngineStatus section",
    "AuctioneerMetricsCard for detailed metrics",
    "Enhanced audit log with allocation filtering",
  ],
  stateAdditions: [
    "dashboardMetrics",
    "dashboardLoading",
    "selectedAuctioneerForMetrics",
    "metricsModalOpen",
  ],
  features: [
    "Real-time allocation engine dashboard",
    "Auctioneer performance metrics",
    "Allocation exception tracking",
    "Enhanced filtering and sorting",
    "Activity timeline with allocation events",
  ],
};
