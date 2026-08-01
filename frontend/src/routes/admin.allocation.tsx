import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Icon } from "@/components/AppShell";

export const Route = createFileRoute("/admin/allocation")({
  component: AllocationQueuePage,
  head: () => ({
    meta: [
      { title: "Allocation Queue & Engine Monitor | AAAS" },
      {
        name: "description",
        content: "Monitor real-time case allocation, engine throughput, exceptions, and manually override auctioneer assignments.",
      },
      { property: "og:title", content: "Allocation Queue & Engine Monitor | AAAS" },
      {
        property: "og:description",
        content: "Monitor real-time case allocation, engine throughput, exceptions, and manually override auctioneer assignments.",
      },
    ],
  }),
});

function AllocationQueuePage() {
  const [modalCaseId, setModalCaseId] = useState<string | null>(null);

  return (
    <AppShell>
      <div className="-mx-xl -mt-xl mb-0">
        <div className="flex items-center gap-4 border-b border-outline-variant bg-surface-container-lowest px-xl py-4">
          <span className="text-title-lg text-primary">Allocation Queue &amp; Engine Monitor</span>
          <div className="flex items-center gap-2 rounded-full bg-surface-container px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-[11px] font-bold uppercase tracking-tight text-on-surface-variant">
              Engine: Operational
            </span>
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 gap-lg mt-5 md:grid-cols-4">

        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-sm">
          <div className="mb-2 flex items-start justify-between">
            <span className="text-label-bold uppercase text-on-surface-variant">Pending Allocation</span>
            <Icon name="hourglass_empty" className="text-primary" />
          </div>
          <div className="text-display-lg text-primary">24</div>
          <div className="mt-2 flex items-center gap-1 text-xs font-bold text-blue-600">
            <Icon name="trending_up" className="text-sm" />
            <span>8% increase vs yesterday</span>
          </div>
        </div>

        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-sm">
          <div className="mb-2 flex items-start justify-between">
            <span className="text-label-bold uppercase text-on-surface-variant">Exceptions Found</span>
            <Icon name="warning" className="text-error" />
          </div>
          <div className="text-display-lg text-error">03</div>
          <div className="mt-2 flex items-center text-xs text-on-surface-variant">
            <span>Requires Immediate Override</span>
          </div>
        </div>
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-sm">
          <div className="mb-2 flex items-start justify-between">
            <span className="text-label-bold uppercase text-on-surface-variant">Engine Throughput</span>
            <Icon name="bolt" className="text-green-600" />
          </div>
          <div className="text-display-lg text-primary">142/hr</div>
          <div className="mt-2 flex items-center text-xs font-bold text-green-600">
            <span>98.4% Accuracy Rating</span>
          </div>
        </div>
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-sm">
          <div className="mb-2 flex items-start justify-between">
            <span className="text-label-bold uppercase text-on-surface-variant">Finalization Window</span>
            <Icon name="timer" className="text-secondary" />
          </div>
          <div className="text-display-lg text-primary">01:42:15</div>
          <div className="mt-2 flex items-center text-xs text-on-surface-variant">
            <span>Next Batch Confirmation</span>
          </div>
        </div>
      </div>

      {/* Queue Table */}
      <div className="flex flex-col overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant p-lg">
          <div className="flex items-center gap-4">
            <h2 className="text-headline-sm text-primary">Real-time Allocation Queue</h2>
            <div className="flex items-center gap-2 rounded bg-surface-container px-3 py-1.5">
              <Icon name="search" className="text-sm" />
              <input
                className="w-64 border-none bg-transparent p-0 text-body-sm focus:ring-0"
                placeholder="Filter by Case ID or Auctioneer..."
                type="text"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded bg-primary px-4 py-2 text-label-bold text-on-primary transition-opacity hover:opacity-90">
              <Icon name="refresh" className="text-sm" />
              SYNC ENGINE
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">

            <thead className="border-b border-outline-variant bg-surface-container-low text-label-bold uppercase text-on-surface-variant">
              <tr>
                <th className="sticky left-0 bg-surface-container-low px-lg py-4">Case ID</th>
                <th className="px-lg py-4">Assigned Auctioneer</th>
                <th className="px-lg py-4">Scoring Matrix Summary</th>
                <th className="px-lg py-4">Countdown</th>
                <th className="px-lg py-4">Status</th>
                <th className="px-lg py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-outline-variant text-body-md">

              <tr className="transition-colors hover:bg-surface-container-high">
                <td className="sticky left-0 bg-surface-container-lowest px-lg py-3 font-bold text-mono-data text-primary">
                  CB-RE-2024-00124
                </td>
                <td className="px-lg py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-slate-200" />
                    <span>M/S Kampala Auctioneers Ltd.</span>
                  </div>
                </td>
                <td className="px-lg py-3">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase text-on-surface-variant">Location Match</span>
                      <span className="text-body-sm font-bold text-green-600">95% (Central)</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase text-on-surface-variant">Workload</span>
                      <span className="text-body-sm font-bold text-blue-600">2/10 (Low)</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase text-on-surface-variant">Rating</span>
                      <span className="text-body-sm font-bold text-primary">4.8/5.0</span>
                    </div>
                  </div>
                </td>
                <td className="px-lg py-3 text-mono-data text-on-surface-variant">01:54:22</td>
                <td className="px-lg py-3">
                  <span className="rounded border border-blue-200 bg-blue-100 px-2 py-0.5 text-[11px] font-bold uppercase text-blue-900">
                    Allocated
                  </span>
                </td>
                <td className="px-lg py-3 text-right">
                  <button
                    className="text-label-bold text-primary hover:underline"
                    onClick={() => setModalCaseId("CB-RE-2024-00124")}
                  >
                    RE-ASSIGN
                  </button>
                </td>
              </tr>


              <tr className="transition-colors hover:bg-surface-container-high">

                <td className="sticky left-0 bg-surface-container-lowest px-lg py-3 font-bold text-mono-data text-primary">
                  CB-RE-2024-00125
                </td>
                <td className="px-lg py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-slate-200" />
                    <span>Western Allied Agents</span>
                  </div>
                </td>
                <td className="px-lg py-3">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase text-on-surface-variant">Location Match</span>
                      <span className="text-body-sm font-bold text-green-600">82% (Western)</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase text-on-surface-variant">Workload</span>
                      <span className="text-body-sm font-bold text-orange-600">7/10 (High)</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase text-on-surface-variant">Rating</span>
                      <span className="text-body-sm font-bold text-primary">4.2/5.0</span>
                    </div>
                  </div>
                </td>
                <td className="px-lg py-3 text-mono-data text-on-surface-variant">01:58:10</td>
                <td className="px-lg py-3">
                  <span className="rounded border border-blue-200 bg-blue-100 px-2 py-0.5 text-[11px] font-bold uppercase text-blue-900">
                    Allocated
                  </span>
                </td>
                <td className="px-lg py-3 text-right">
                  <button
                    className="text-label-bold text-primary hover:underline"
                    onClick={() => setModalCaseId("CB-RE-2024-00125")}
                  >
                    RE-ASSIGN
                  </button>
                </td>

              </tr>

              <tr className="transition-colors hover:bg-surface-container-high">

                <td className="sticky left-0 bg-surface-container-lowest px-lg py-3 font-bold text-mono-data text-primary">
                  CB-AG-2024-01055
                </td>
                <td className="px-lg py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-slate-200" />
                    <span>Northern Estates Auctioneers</span>
                  </div>
                </td>
                <td className="px-lg py-3">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase text-on-surface-variant">Location Match</span>
                      <span className="text-body-sm font-bold text-green-600">100% (Gulu)</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase text-on-surface-variant">Workload</span>
                      <span className="text-body-sm font-bold text-blue-600">1/10 (Idle)</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase text-on-surface-variant">Rating</span>
                      <span className="text-body-sm font-bold text-primary">4.5/5.0</span>
                    </div>
                  </div>
                </td>
                <td className="px-lg py-3 text-mono-data text-on-surface-variant">01:59:59</td>
                <td className="px-lg py-3">
                  <span className="rounded border border-blue-200 bg-blue-100 px-2 py-0.5 text-[11px] font-bold uppercase text-blue-900">
                    Allocated
                  </span>
                </td>
                <td className="px-lg py-3 text-right">
                  <button
                    className="text-label-bold text-primary hover:underline"
                    onClick={() => setModalCaseId("CB-AG-2024-01055")}
                  >
                    RE-ASSIGN
                  </button>
                </td>

              </tr>
              
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-outline-variant bg-surface-container-lowest p-md">
          <span className="text-body-sm text-on-surface-variant">
            Showing 4 of 24 active allocations in current engine cycle.
          </span>
          <div className="flex gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-primary hover:bg-surface-container">
              <Icon name="chevron_left" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded border border-primary bg-primary text-xs font-bold text-on-primary">
              1
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-xs font-bold text-on-surface-variant hover:bg-surface-container">
              2
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-xs font-bold text-on-surface-variant hover:bg-surface-container">
              3
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-primary hover:bg-surface-container">
              <Icon name="chevron_right" />
            </button>
          </div>
        </div>
      </div>

      {/* Engine Logs / Mini Bento */}
      <div className="grid grid-cols-1 gap-lg lg:grid-cols-3">
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-sm lg:col-span-2">
          <h3 className="mb-md flex items-center gap-2 text-title-lg text-primary">
            <Icon name="terminal" />
            Allocation Engine Audit Log
          </h3>
          <div className="space-y-3 text-[12px] font-medium">
            <div className="flex gap-4 border-b border-surface-container-low p-2">
              <span className="text-on-surface-variant">[14:22:05]</span>
              <span className="font-bold text-green-600">INFO:</span>
              <span className="text-on-surface">
                Successfully allocated Case ID CB-RE-2024-00125 to Western Allied Agents (Score: 0.88).
              </span>
            </div>
            <div className="flex gap-4 border-b border-surface-container-low bg-red-50/50 p-2">
              <span className="text-on-surface-variant">[14:21:58]</span>
              <span className="font-bold text-error">EXCEPTION:</span>
              <span className="text-on-surface">
                Manual Override Required for Case ID CB-VE-2024-00892. No auctioneers within 200km radius.
              </span>
            </div>
            <div className="flex gap-4 border-b border-surface-container-low p-2">
              <span className="text-on-surface-variant">[14:20:12]</span>
              <span className="font-bold text-blue-600">ENGINE:</span>
              <span className="text-on-surface">
                Batch processing started for 12 new recovery cases from Core Banking.
              </span>
            </div>
            <div className="flex gap-4 border-b border-surface-container-low p-2">
              <span className="text-on-surface-variant">[14:15:00]</span>
              <span className="font-bold text-on-surface-variant">SYSTEM:</span>
              <span className="text-on-surface">Auctioneer Rating Database updated. Calculating workload shifts.</span>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg bg-primary p-lg text-on-primary shadow-sm">
          <div className="relative z-10">
            <h3 className="mb-md text-title-lg">Engine Heatmap</h3>
            <p className="mb-lg text-body-sm opacity-80">
              Visual density of currently pending allocations across regional hubs.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-label-bold uppercase">Central Hub</span>
                <span className="text-xs font-bold text-secondary-container">12 Cases</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-primary-container">
                <div className="h-full w-[80%] bg-secondary-container" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-label-bold uppercase">Northern Hub</span>
                <span className="text-xs font-bold text-secondary-container">4 Cases</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-primary-container">
                <div className="h-full w-[25%] bg-secondary-container" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-label-bold uppercase">Western Hub</span>
                <span className="text-xs font-bold text-secondary-container">8 Cases</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-primary-container">
                <div className="h-full w-[50%] bg-secondary-container" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 opacity-10">
            <Icon name="hub" className="text-[160px]" />
          </div>
        </div>
      </div>

      {/* Manual Override Modal */}
      {modalCaseId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-md">
          <div
            className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            onClick={() => setModalCaseId(null)}
          />
          <div className="relative w-full max-w-[32rem] overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-low p-lg">
              <div className="flex items-center gap-3">
                <Icon name="gavel" className="text-error" />
                <h2 className="text-title-lg text-primary">Manual Allocation Override</h2>
              </div>
              <button
                className="text-on-surface-variant transition-colors hover:text-error"
                onClick={() => setModalCaseId(null)}
              >
                <Icon name="close" />
              </button>
            </div>
            <div className="space-y-lg p-lg">
              <div className="rounded border border-outline-variant bg-surface-container-low p-md">
                <div className="mb-1 text-[10px] font-bold uppercase text-on-surface-variant">Target Case ID</div>
                <div className="text-headline-sm text-mono-data text-primary">{modalCaseId}</div>
              </div>
              <div className="space-y-base">
                <label className="block text-label-bold uppercase text-primary">Select New Auctioneer</label>
                <select className="w-full rounded border border-outline-variant bg-surface-container-lowest p-2.5 text-body-md focus:border-primary focus:ring-2 focus:ring-primary">
                  <option value="">-- Choose Priority Auctioneer --</option>
                  <option value="1">Central Court Bailiffs (Capacity: High)</option>
                  <option value="2">Apex Asset Recovery (Capacity: Normal)</option>
                  <option value="3">National Auction Services (Capacity: Low)</option>
                </select>
              </div>
              <div className="space-y-base">
                <label className="block text-label-bold uppercase text-primary">Justification Code (Mandatory)</label>
                <select className="w-full rounded border border-outline-variant bg-surface-container-lowest p-2.5 text-body-md focus:border-primary focus:ring-2 focus:ring-primary">
                  <option value="">-- Select Audit Reason --</option>
                  <option value="J1">Engine Proximity Conflict Override</option>
                  <option value="J2">Court Mandated Assignment</option>
                  <option value="J3">Relationship Manager Priority Request</option>
                  <option value="J4">Exceptional Specialized Asset Expertise</option>
                </select>
              </div>
              <div className="space-y-base">
                <label className="block text-label-bold uppercase text-primary">Override Comments</label>
                <textarea
                  className="h-24 w-full rounded border border-outline-variant bg-surface-container-lowest p-md text-body-md focus:border-primary focus:ring-2 focus:ring-primary"
                  placeholder="Provide detailed institutional justification for this manual override..."
                />
              </div>
              <div className="flex gap-3 rounded border border-error-container bg-red-50 p-md">
                <Icon name="info" className="text-error" />
                <p className="text-body-sm italic text-on-error-container">
                  This action will be permanently logged under your User ID and will trigger a Tier-2 Auditor
                  notification.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-outline-variant bg-surface-container-low p-lg">
              <button
                className="rounded px-6 py-2 text-label-bold uppercase text-on-surface-variant transition-colors hover:bg-surface-container-high"
                onClick={() => setModalCaseId(null)}
              >
                Cancel
              </button>
              <button className="rounded bg-primary px-6 py-2 text-label-bold uppercase text-on-primary transition-opacity hover:opacity-90">
                CONFIRM OVERRIDE
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
