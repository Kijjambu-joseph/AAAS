/**
 * Allocation Engine API Integration
 * Service layer for connecting to allocation engine endpoints
 */

import { Api } from "./api";

export interface ScoringFactors {
  workload: number;
  priority: number;
  specialization: number;
  regional_demand: number;
  performance: number;
}

export interface AllocationRecommendation {
  rank: number;
  auctioneer_id: number;
  auctioneer_name: string;
  score: number;
  feasible: boolean;
  factors: ScoringFactors;
}

export interface AllocationResult {
  success: boolean;
  allocation_id?: number;
  auctioneer_id?: number;
  case_id?: number;
  score?: number;
  ranking_position?: number;
  scoring_factors?: ScoringFactors;
  strategy_used?: string;
  error_message?: string;
  exception_type?: string;
  // Enforcement tracking
  enforcement_blocked?: boolean;
  enforcement_reason?: string;
  allowed_strategies?: string[];
  requires_dry_run?: boolean;
}

export interface EnforcementStatus {
  enforcement_mode: string;
  case_priority: string;
  auto_is_default: boolean;
  manual_requires_dry_run: boolean;
  auto_is_mandatory: boolean;
  priority_enforcement: {
    critical: boolean;
    high: boolean;
  };
}

export interface EnforcementRules {
  enforcement_mode: string;
  default_strategy: string;
  policy: string;
  modes_available: string[];
  policies_available: string[];
}

export interface DashboardMetrics {
  queue_status: {
    total_pending: number;
    by_priority: Record<string, number>;
    by_region: Record<string, number>;
  };
  auctioneer_status: {
    total_active: number;
    at_capacity: number;
    available: number;
    workload_avg: number;
    workload_max: number;
  };
  allocation_stats: {
    today_count: number;
    week_count: number;
    avg_time_to_allocate_hours: number;
    allocation_success_rate: number;
  };
  exceptions: {
    total_unallocatable: number;
    by_reason: Record<string, number>;
  };
  performance: {
    avg_allocation_time_ms: number;
    allocations_per_hour: number;
  };
}

export interface AuctioneerMetrics {
  auctioneer_id: number;
  metrics: {
    total_allocations: number;
    completion_rate: number;
    average_recovery_percentage: number;
    average_days_to_recovery: number;
    cases_at_critical_priority: number;
    current_workload: number;
    maximum_capacity: number;
    utilization_rate: number;
  };
  by_priority: Record<string, any>;
  by_collateral: Record<string, any>;
}

/**
 * Allocate a single case to an auctioneer
 */
export const allocateCase = async (
  caseId: number,
  strategy: "automatic" | "priority" | "load_balance" | "specialization" | "manual" = "automatic",
  auctioneer_id?: number,
  dry_run: boolean = false
): Promise<AllocationResult> => {
  try {
    const response = await Api.post(`/api/cases/${caseId}/allocate-v2/`, {
      strategy,
      auctioneer_id,
      dry_run,
    });
    return response;
  } catch (error: any) {
    return {
      success: false,
      error_message: error.message || "Allocation failed",
    };
  }
};

/**
 * Get allocation recommendations for a case
 */
export const getAllocationRecommendations = async (
  caseId: number,
  top_n: number = 5
): Promise<AllocationRecommendation[]> => {
  try {
    const response = await Api.get(
      `/api/cases/${caseId}/allocation-recommendations/?top_n=${top_n}`
    );
    return response;
  } catch (error) {
    console.error("Failed to get recommendations:", error);
    return [];
  }
};

/**
 * Reallocate a case to a different auctioneer
 */
export const reallocateCase = async (
  allocationId: number,
  reason: string,
  new_auctioneer_id?: number
): Promise<AllocationResult> => {
  try {
    const response = await Api.post(`/api/allocations/${allocationId}/reallocate/`, {
      reason,
      new_auctioneer_id,
    });
    return response;
  } catch (error: any) {
    return {
      success: false,
      error_message: error.message || "Reallocation failed",
    };
  }
};

/**
 * Get allocation engine dashboard metrics
 */
export const getAllocationDashboard = async (): Promise<DashboardMetrics | null> => {
  try {
    const response = await Api.get("/api/allocation-engine/dashboard/");
    return response;
  } catch (error) {
    console.error("Failed to get dashboard metrics:", error);
    return null;
  }
};

/**
 * Get auctioneer allocation performance metrics
 */
export const getAuctioneerMetrics = async (auctioneer_id: number): Promise<AuctioneerMetrics | null> => {
  try {
    const response = await Api.get(`/api/auctioneers/${auctioneer_id}/allocation-performance/`);
    return response;
  } catch (error) {
    console.error("Failed to get auctioneer metrics:", error);
    return null;
  }
};

/**
 * Batch allocate multiple cases
 */
export const batchAllocateCases = async (
  caseIds: number[],
  strategy: "automatic" | "priority" | "load_balance" = "automatic",
  max_per_auctioneer?: number
): Promise<any> => {
  try {
    const response = await Api.post("/api/cases/batch-allocate/", {
      case_ids: caseIds,
      strategy,
      max_per_auctioneer,
    });
    return response;
  } catch (error: any) {
    return {
      successful: 0,
      failed: caseIds.length,
      error_message: error.message || "Batch allocation failed",
    };
  }
};

/**
 * Format scoring factors for display
 */
export const formatScoringFactors = (factors: ScoringFactors): Record<string, string> => {
  return {
    "Workload Balance": `${factors.workload.toFixed(1)}/100`,
    "Priority Alignment": `${factors.priority.toFixed(1)}/100`,
    "Specialization Match": `${factors.specialization.toFixed(1)}/100`,
    "Regional Demand": `${factors.regional_demand.toFixed(1)}/100`,
    "Performance Track Record": `${factors.performance.toFixed(1)}/100`,
  };
};

/**
 * Calculate composite score from factors
 */
export const calculateCompositeScore = (factors: ScoringFactors): number => {
  const weights = {
    workload: 0.35,
    priority: 0.25,
    specialization: 0.20,
    regional_demand: 0.15,
    performance: 0.05,
  };

  return (
    factors.workload * weights.workload +
    factors.priority * weights.priority +
    factors.specialization * weights.specialization +
    factors.regional_demand * weights.regional_demand +
    factors.performance * weights.performance
  );
};

/**
 * Get score color for UI display
 */
export const getScoreColor = (score: number): string => {
  if (score >= 85) return "text-green-600";
  if (score >= 70) return "text-blue-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
};

/**
 * Get score background color
 */
export const getScoreBgColor = (score: number): string => {
  if (score >= 85) return "bg-green-50";
  if (score >= 70) return "bg-blue-50";
  if (score >= 50) return "bg-yellow-50";
  return "bg-red-50";
};

// ============================================================================
// Enforcement & Status APIs
// ============================================================================

/**
 * Get enforcement status for a specific case
 * Shows what strategies are allowed for this case
 */
export const getEnforcementStatus = async (caseId: number): Promise<EnforcementStatus | null> => {
  try {
    const response = await Api.get(`/api/cases/${caseId}/enforcement-status/`);
    return response;
  } catch (error) {
    console.error("Failed to get enforcement status:", error);
    return null;
  }
};

/**
 * Get current enforcement rules
 * Shows system-wide enforcement mode and policies
 */
export const getEnforcementRules = async (): Promise<EnforcementRules | null> => {
  try {
    const response = await Api.get(`/api/allocation/enforcement-rules/`);
    return response;
  } catch (error) {
    console.error("Failed to get enforcement rules:", error);
    return null;
  }
};

/**
 * Get a preview of what automatic allocation would do (dry-run)
 * Used to show user recommendations before allowing manual override
 */
export const verifyDryRun = async (
  caseId: number,
  strategy: string = "automatic"
): Promise<AllocationResult> => {
  try {
    const response = await Api.post(`/api/cases/${caseId}/verify-dry-run/`, {
      strategy,
    });
    return response;
  } catch (error: any) {
    return {
      success: false,
      error_message: error.message || "Dry-run preview failed",
    };
  }
};

/**
 * Helper: Check if strategy is allowed for a case
 */
export const isStrategyAllowed = (
  status: EnforcementStatus | null,
  strategy: string,
  dryRunCompleted: boolean = false
): boolean => {
  if (!status) return true; // No enforcement info, assume allowed

  // Determine if auto is mandatory
  if (status.auto_is_mandatory) {
    return strategy === "automatic";
  }

  // Check if manual requires dry-run
  if (status.manual_requires_dry_run && strategy === "manual") {
    return dryRunCompleted;
  }

  return true;
};

/**
 * Helper: Get enforcement message for UI
 */
export const getEnforcementMessage = (
  result: AllocationResult
): string | null => {
  if (!result.enforcement_blocked) {
    return null;
  }

  if (result.requires_dry_run) {
    return "Dry-run preview required before manual allocation";
  }

  return result.enforcement_reason || "Allocation strategy not allowed";
};

/**
 * Helper: Get allowed strategies list for UI
 */
export const getAllocatableStrategies = (
  result: AllocationResult
): string[] => {
  return result.allowed_strategies || ["automatic", "priority", "load_balance", "manual"];
};

