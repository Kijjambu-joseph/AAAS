/**
 * AuctioneerMetricsCard Component
 * Displays allocation performance metrics for an auctioneer
 */

import { useEffect, useState } from "react";
import { Icon } from "@/components/AppShell";
import { getAuctioneerMetrics } from "@/lib/allocation-engine";

interface AuctioneerMetricsCardProps {
  auctioneer_id: number;
  auctioneer_name: string;
  className?: string;
}

export function AuctioneerMetricsCard({
  auctioneer_id,
  auctioneer_name,
  className = "",
}: AuctioneerMetricsCardProps) {
  const [metrics, setMetrics] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetrics = async () => {
      setLoading(true);
      const data = await getAuctioneerMetrics(auctioneer_id);
      setMetrics(data);
      setLoading(false);
    };

    loadMetrics();
  }, [auctioneer_id]);

  if (loading) {
    return (
      <div className={`rounded-lg border border-outline-variant bg-surface-container-lowest p-lg ${className}`}>
        <div className="h-40 rounded bg-surface-container animation-pulse" />
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className={`rounded-lg border border-outline-variant bg-surface-container-lowest p-lg ${className}`}>
        <p className="text-body-sm text-on-surface-variant">Unable to load metrics</p>
      </div>
    );
  }

  const m = metrics.metrics;
  const utilizationColor =
    m.utilization_rate >= 0.9
      ? "text-red-600"
      : m.utilization_rate >= 0.7
        ? "text-yellow-600"
        : "text-green-600";

  return (
    <div className={`rounded-lg border border-outline-variant bg-surface-container-lowest p-lg ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-title-md text-primary">{auctioneer_name}</h3>
          <p className="text-xs text-on-surface-variant">Performance Metrics</p>
        </div>
        <Icon name="trending_up" className="text-2xl text-primary" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Completion Rate */}
        <div className="rounded-lg bg-surface-container p-3">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase">Completion Rate</p>
          <p className="text-title-sm font-bold text-primary mt-1">{(m.completion_rate * 100).toFixed(1)}%</p>
          <div className="mt-1 h-1.5 w-full rounded-full bg-surface-container-low">
            <div
              className="h-full rounded-full bg-green-500"
              style={{ width: `${m.completion_rate * 100}%` }}
            />
          </div>
        </div>

        {/* Recovery Percentage */}
        <div className="rounded-lg bg-surface-container p-3">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase">Recovery %</p>
          <p className="text-title-sm font-bold text-primary mt-1">{(m.average_recovery_percentage).toFixed(1)}%</p>
          <div className="mt-1 h-1.5 w-full rounded-full bg-surface-container-low">
            <div
              className="h-full rounded-full bg-blue-500"
              style={{ width: `${m.average_recovery_percentage}%` }}
            />
          </div>
        </div>

        {/* Workload Utilization */}
        <div className="rounded-lg bg-surface-container p-3">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase">Utilization</p>
          <p className={`text-title-sm font-bold ${utilizationColor} mt-1`}>
            {m.current_workload} / {m.maximum_capacity}
          </p>
          <div className="mt-1 h-1.5 w-full rounded-full bg-surface-container-low">
            <div
              className={`h-full rounded-full ${
                m.utilization_rate >= 0.9
                  ? "bg-red-500"
                  : m.utilization_rate >= 0.7
                    ? "bg-yellow-500"
                    : "bg-green-500"
              }`}
              style={{ width: `${m.utilization_rate * 100}%` }}
            />
          </div>
        </div>

        {/* Avg Lead Time */}
        <div className="rounded-lg bg-surface-container p-3">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase">Avg Lead Time</p>
          <p className="text-title-sm font-bold text-primary mt-1">{m.average_days_to_recovery} days</p>
          <p className="text-[10px] text-on-surface-variant mt-1">
            {m.total_allocations} cases
          </p>
        </div>
      </div>

      {/* performance by priority */}
      {metrics.by_priority && Object.keys(metrics.by_priority).length > 0 && (
        <div className="mb-4 rounded-lg bg-surface-container-low p-3">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-2">Performance by Priority</p>
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(metrics.by_priority).map(([priority, data]: [string, any]) => (
              <div key={priority} className="rounded bg-surface-container px-2 py-1.5 text-center">
                <p className="text-[10px] font-bold text-primary">{priority}</p>
                <p className="text-[10px] text-on-surface-variant">
                  {data.count} cases
                </p>
                <p className="text-[10px] text-green-600 font-bold">
                  {(data.completion_rate * 100).toFixed(0)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Critical Priority Cases Badge */}
      {m.cases_at_critical_priority > 0 && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3">
          <div className="flex items-center gap-2">
            <Icon name="warning" className="text-red-600 text-lg" />
            <div>
              <p className="text-[11px] font-bold text-red-800">High Priority Cases</p>
              <p className="text-[10px] text-red-700">{m.cases_at_critical_priority} critical priority cases</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
