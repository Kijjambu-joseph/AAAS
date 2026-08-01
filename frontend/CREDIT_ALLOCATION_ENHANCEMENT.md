/**
 * Enhanced Credit Allocation Route with Allocation Engine
 * Updated version of credit.allocation.tsx integrating the new allocation engine
 * 
 * This shows the recommended changes to integrate the allocation engine
 */

// ============================================================================
// NEW IMPORTS TO ADD
// ============================================================================

/*
import { 
  allocateCase, 
  getAllocationRecommendations,
  getAllocationDashboard,
  formatScoringFactors,
  getScoreColor,
  getScoreBgColor,
  calculateCompositeScore,
} from "@/lib/allocation-engine";
import { AllocationRecommendationsPanel } from "@/components/AllocationRecommendationsPanel";
*/

// ============================================================================
// ENHANCED ALLOCATION FLOW - REPLACE allocate() FUNCTION
// ============================================================================

/*
Replace the current allocate function with:

async function allocate(caseId: number, strategy: string = "automatic") {
  try {
    setAllocating(true);
    
    // First, get recommendations
    const recommendations = await getAllocationRecommendations(caseId);
    console.log("Recommendations:", recommendations);
    
    // For dry run, show recommendations to user
    if (showRecommendationsFirst) {
      // Show modal with recommendations
      setShowRecommendationsModal(true);
      return;
    }
    
    // Perform actual allocation
    const result = await allocateCase(caseId, strategy as any, null, false);
    
    if (result.success) {
      toast.success(
        `Case allocated to auctioneer ${result.auctioneer_id} (Score: ${result.score?.toFixed(2)})`
      );
      
      // Log the allocation details
      console.log("Allocation Details:", {
        allocationId: result.allocation_id,
        auctioneer: result.auctioneer_id,
        score: result.score,
        factors: result.scoring_factors,
        strategy: result.strategy_used,
      });
    } else {
      toast.error(result.error_message || "Allocation failed");
    }
    
    await refresh();
  } catch (error: any) {
    toast.error(error.message);
  } finally {
    setAllocating(false);
  }
}
*/

// ============================================================================
// NEW ALLOCATION PANEL SECTION
// ============================================================================

/*
Add this new section in the main component JSX:

<div className="space-y-lg xl:col-span-8">
  {/* Allocation Options Panel */}
  <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg">
    <h3 className="text-title-md text-primary mb-4">Allocation Strategy</h3>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[
        { value: "automatic", label: "Automatic", icon: "psychology", desc: "Highest scored" },
        { value: "priority", label: "Priority", icon: "priority_high", desc: "By priority" },
        { value: "load_balance", label: "Load Balance", icon: "scale", desc: "Regional" },
        { value: "manual", label: "Manual", icon: "person", desc: "Override" },
      ].map((strategy) => (
        <button
          key={strategy.value}
          className={`rounded-lg border-2 p-3 text-center transition-all ${
            selectedStrategy === strategy.value
              ? "border-primary bg-primary/10"
              : "border-outline-variant hover:border-primary"
          }`}
          onClick={() => setSelectedStrategy(strategy.value)}
        >
          <Icon name={strategy.icon} className="text-2xl text-primary mx-auto mb-1" />
          <p className="text-label-bold text-primary">{strategy.label}</p>
          <p className="text-[10px] text-on-surface-variant">{strategy.desc}</p>
        </button>
      ))}
    </div>
  </div>

  {/* Allocation Queue */}
  <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg">
    <h3 className="text-title-md text-primary mb-4">Cases Pending Allocation</h3>
    
    {queue.length === 0 ? (
      <div className="text-center py-8">
        <Icon name="check_circle" className="text-4xl text-green-600 mx-auto mb-2" />
        <p className="text-body-md text-on-surface">All cases allocated!</p>
      </div>
    ) : (
      <div className="space-y-2">
        {queue.slice(0, 5).map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border border-outline-variant p-3 hover:bg-surface-container-low transition-colors"
          >
            <div className="flex-1">
              <p className="font-bold text-primary">{item.caseNumber}</p>
              <p className="text-xs text-on-surface-variant">
                {item.priority} • {item.region} • UGX {item.valuation.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => allocate(item.id, selectedStrategy)}
              className="px-3 py-1 rounded-lg bg-primary text-on-primary text-label-bold hover:opacity-90 transition-opacity"
            >
              Allocate
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
*/

// ============================================================================
// RECOMMENDATIONS PANEL REPLACEMENT
// ============================================================================

/*
Replace or enhance the current recommendations/candidates section with:

<div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg xl:col-span-4">
  <AllocationRecommendationsPanel
    caseId={selectedCaseId}
    casePriority={selectedCase?.priority}
    collateralType={selectedCase?.collateral_type}
    onRecommendationSelect={(auctioneer_id, score) => {
      console.log(`User selected auctioneer ${auctioneer_id} with score ${score}`);
      // Can implement quick allocation here
      allocateCase(selectedCaseId, "manual", auctioneer_id, false);
    }}
  />
</div>
*/

// ============================================================================
// SCORING FACTORS DISPLAY COMPONENT
// ============================================================================

/*
Add this helper component to display scoring factors in a modal:

function ScoringFactorsModal({ 
  factors, 
  auctioneerName,
  open,
  onClose 
}: {
  factors: ScoringFactors,
  auctioneerName: string,
  open: boolean,
  onClose: () => void
}) {
  const compositeScore = calculateCompositeScore(factors);
  const scoringBreakdown = [
    { label: "Workload Balance", value: factors.workload, weight: 0.35 },
    { label: "Priority Alignment", value: factors.priority, weight: 0.25 },
    { label: "Specialization Match", value: factors.specialization, weight: 0.20 },
    { label: "Regional Demand", value: factors.regional_demand, weight: 0.15 },
    { label: "Performance", value: factors.performance, weight: 0.05 },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Allocation Score Breakdown - ${auctioneerName}`}
      icon="bar_chart"
      tone="primary"
    >
      <div className="space-y-4">
        {/* Composite Score */}
        <div className={`rounded-lg ${getScoreBgColor(compositeScore)} p-4 border-2 border-primary`}>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase">Composite Score</p>
          <p className={`text-display-md font-bold ${getScoreColor(compositeScore)}`}>
            {compositeScore.toFixed(1)} / 100
          </p>
        </div>

        {/* Factor Breakdown */}
        <div className="space-y-2">
          {scoringBreakdown.map((item) => (
            <div key={item.label} className="rounded-lg bg-surface-container p-3">
              <div className="flex justify-between items-center mb-1">
                <p className="text-body-sm font-bold text-primary">{item.label}</p>
                <span className="text-xs font-bold text-on-surface-variant">
                  {(item.weight * 100).toFixed(0)}% weight
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-full h-2 rounded bg-surface-container-low">
                  <div
                    className="h-full rounded bg-primary"
                    style={{ width: `${Math.min(item.value, 100)}%` }}
                  />
                </div>
                <span className="text-xs font-bold w-8 text-right">{item.value.toFixed(0)}</span>
              </div>
              <p className="text-[10px] text-on-surface-variant mt-1">
                Contribution: {(item.value * item.weight).toFixed(1)} points
              </p>
            </div>
          ))}
        </div>

        {/* Explanation */}
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
          <p className="text-[11px] font-bold text-blue-900 mb-1">How It Works</p>
          <p className="text-[10px] text-blue-800">
            The allocation engine scores candidates across 5 dimensions and selects the best fit 
            based on weighted factors. Higher scores indicate better suitability for the case.
          </p>
        </div>
      </div>
    </Modal>
  );
}
*/

// ============================================================================
// INTEGRATION CHECKLIST
// ============================================================================

export const CREDIT_ALLOCATION_INTEGRATION = {
  "Phase 1: API Setup": [
    "Update Api.ts with new endpoints",
    "Create allocation-engine.ts service",
    "Test API connectivity"
  ],
  "Phase 2: Components": [
    "Create AllocationRecommendationsPanel.tsx",
    "Create ScoringFactorsModal component",
    "Import into credit.allocation.tsx"
  ],
  "Phase 3: UI Integration": [
    "Add allocation strategy selector",
    "Show recommendations panel",
    "Display scoring breakdown",
    "Add case queue view"
  ],
  "Phase 4: Features": [
    "One-click quick allocation",
    "Dry-run preview mode",
    "Allocation history tracking",
    "Exception handling",
    "Reallocate functionality"
  ],
  "Phase 5: Enhancments": [
    "Bulk allocation wizard",
    "Allocation insights/analytics",
    "Performance trends",
    "Predictive recommendations"
  ],
  stateToAdd: [
    "selectedStrategy: string",
    "selectedCaseId: number | null",
    "showRecommendationsFirst: boolean",
    "allocating: boolean",
    "showFactorsModal: boolean",
  ],
  useEffectsToAdd: [
    "Load allocation dashboard on mount",
    "Refresh dashboard every 30 seconds",
    "Update queue when case allocated",
  ],
};

// ============================================================================
// EXAMPLE: USING ALLOCATION ENGINE IN COMPONENT
// ============================================================================

/*
Basic example of using the allocation engine in your credit allocation page:

// Get recommendations first
const handleShowRecommendations = async (caseId: number) => {
  const recommendations = await getAllocationRecommendations(caseId);
  
  // Show in modal or sidebar
  setSelectedRecommendations(recommendations);
  setShowRecommendationsModal(true);
};

// Quick allocate to recommended auctioneer
const handleAllocateToRecommendation = async (
  caseId: number, 
  auctioneer_id: number
) => {
  const result = await allocateCase(caseId, "manual", auctioneer_id);
  
  if (result.success) {
    console.log("Allocation successful:", result);
    toast.success(`Allocated with score ${result.score?.toFixed(2)}`);
  } else {
    console.error("Allocation failed:", result.error_message);
    toast.error(result.error_message);
  }
};

// Dry run to preview
const handlePreviewAllocation = async (caseId: number) => {
  const result = await allocateCase(caseId, "automatic", undefined, true);
  console.log("Preview allocation:", result);
  setPreviewResult(result);
};
*/
