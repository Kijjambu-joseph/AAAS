/**
 * AllocationRecommendationsPanel Component
 * Displays top allocation recommendations for a recovery case
 */

import { useEffect, useState } from "react";
import { Icon } from "@/components/AppShell";
import { getAllocationRecommendations, getScoreColor, getScoreBgColor } from "@/lib/allocation-engine";

interface AllocationRecommendationsPanelProps {
  caseId: number;
  casePriority?: string;
  collateralType?: string;
  onRecommendationSelect?: (auctioneer_id: number, score: number) => void;
  loading?: boolean;
}

export function AllocationRecommendationsPanel({
  caseId,
  casePriority = "Medium",
  collateralType = "Unknown",
  onRecommendationSelect,
  loading = false,
}: AllocationRecommendationsPanelProps) {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadRecommendations = async () => {
      setIsLoading(true);
      const recs = await getAllocationRecommendations(caseId, 5);
      setRecommendations(recs);
      setIsLoading(false);
    };

    if (caseId) {
      loadRecommendations();
    }
  }, [caseId]);

  if (isLoading || loading) {
    return (
      <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-title-md text-primary">Recommended Auctioneers</h3>
          <span className="text-xs font-medium text-on-surface-variant animate-spin">
            <Icon name="loading" className="text-sm" />
          </span>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded bg-surface-container animation-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!recommendations.length) {
    return (
      <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg">
        <h3 className="text-title-md text-primary mb-4">Recommended Auctioneers</h3>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Icon name="info" className="text-3xl text-on-surface-variant mb-2 opacity-50" />
          <p className="text-body-sm text-on-surface-variant">No recommendations available</p>
          <p className="text-xs text-on-surface-variant mt-1">No eligible auctioneers match the allocation criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-title-md text-primary">Recommended Auctioneers</h3>
        <span className="text-xs font-bold text-secondary bg-secondary-container px-2 py-1 rounded-full">
          {recommendations.length} Options
        </span>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <button
            key={rec.auctioneer_id}
            onClick={() => onRecommendationSelect?.(rec.auctioneer_id, rec.score)}
            className={`w-full rounded-lg border border-outline-variant p-3 text-left transition-all hover:shadow-md hover:border-primary ${
              getScoreBgColor(rec.score)
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-on-surface">#{idx + 1}</span>
                  <span className="font-bold text-primary">{rec.auctioneer_name}</span>
                  {rec.feasible && (
                    <span className="text-[10px] font-bold bg-green-200 text-green-800 px-1.5 py-0.5 rounded">
                      ✓ ELIGIBLE
                    </span>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant mt-1">Auctioneer ID: {rec.auctioneer_id}</p>
              </div>

              <div className="text-right ml-2">
                <div className={`text-title-sm font-bold ${getScoreColor(rec.score)}`}>
                  {rec.score.toFixed(1)}
                </div>
                <p className="text-[10px] text-on-surface-variant">Score</p>
              </div>
            </div>

            {rec.factors && (
              <div className="mt-2 grid grid-cols-5 gap-1 text-[10px]">
                <div className="rounded bg-surface-container p-1">
                  <p className="font-bold text-primary">{rec.factors.workload.toFixed(0)}</p>
                  <p className="text-on-surface-variant">Workload</p>
                </div>
                <div className="rounded bg-surface-container p-1">
                  <p className="font-bold text-primary">{rec.factors.priority.toFixed(0)}</p>
                  <p className="text-on-surface-variant">Priority</p>
                </div>
                <div className="rounded bg-surface-container p-1">
                  <p className="font-bold text-primary">{rec.factors.specialization.toFixed(0)}</p>
                  <p className="text-on-surface-variant">Specialty</p>
                </div>
                <div className="rounded bg-surface-container p-1">
                  <p className="font-bold text-primary">{rec.factors.regional_demand.toFixed(0)}</p>
                  <p className="text-on-surface-variant">Regional</p>
                </div>
                <div className="rounded bg-surface-container p-1">
                  <p className="font-bold text-primary">{rec.factors.performance.toFixed(0)}</p>
                  <p className="text-on-surface-variant">Performance</p>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-surface-container rounded text-xs text-on-surface-variant">
        <p className="font-bold text-on-surface mb-1">ℹ Allocation Engine</p>
        <p>
          Scored on: workload balance (35%), priority handling (25%), specialization (20%), regional
          demand (15%), and performance track record (5%).
        </p>
      </div>
    </div>
  );
}
