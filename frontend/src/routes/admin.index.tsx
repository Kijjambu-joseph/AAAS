import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Icon } from "@/components/AppShell";
import { DashboardWelcome, Button, Modal } from "@/components/ui-kit";
import { ChartCard, RecoveryTrendChart, RegionBarChart, StatusPieChart } from "@/components/Charts";

const TREND = [
  { month: "Jan", recovered: 18, target: 22 },
  { month: "Feb", recovered: 24, target: 24 },
  { month: "Mar", recovered: 21, target: 25 },
  { month: "Apr", recovered: 31, target: 27 },
  { month: "May", recovered: 28, target: 28 },
  { month: "Jun", recovered: 36, target: 30 },
];

const STATUS = [
  { name: "Allocated", value: 512 },
  { name: "In auction", value: 268 },
  { name: "Pending", value: 331 },
  { name: "Exceptions", value: 173 },
];

const REGION_DATA = [
  { region: "Central", cases: 420 },
  { region: "Western", cases: 221 },
  { region: "Northern", cases: 180 },
  { region: "Eastern", cases: 186 },
];

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
  head: () => ({
    meta: [
      { title: "Recovery Overview | AAAS System" },
      {
        name: "description",
        content:
          "Live performance metrics for Uganda regional liquidation, recovery trends, and auctioneer capacity.",
      },
      { property: "og:title", content: "Recovery Overview | AAAS System" },
      {
        property: "og:description",
        content:
          "Live performance metrics for Uganda regional liquidation, recovery trends, and auctioneer capacity.",
      },
    ],
  }),
});

const monthlyBars = [
  { label: "JAN", height: 40, opacity: "opacity-40" },
  { label: "FEB", height: 55, opacity: "opacity-50" },
  { label: "MAR", height: 45, opacity: "opacity-60" },
  { label: "APR", height: 75, opacity: "opacity-70" },
  { label: "MAY", height: 60, opacity: "opacity-80" },
];

const regions = [
  { name: "Central (Kampala)", pct: "42%", highlight: true },
  { name: "Western (Mbarara)", pct: "22%", highlight: false },
  { name: "Northern (Gulu)", pct: "18%", highlight: false },
  { name: "Eastern (Mbale)", pct: "18%", highlight: false },
];

const auctioneers = [
  { name: "Abbey & Associates", pct: 92, color: "bg-error" },
  { name: "Heritage Recoveries", pct: 64, color: "bg-primary" },
  { name: "Pearl Asset Liquidators", pct: 41, color: "bg-primary" },
];

function AdminDashboard() {
  const [cycleOpen, setCycleOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [initiateOpen, setInitiateOpen] = useState(false);

  return (
    <AppShell>
      <DashboardWelcome
        message="Institution-wide recovery performance across all Uganda regions. Review exceptions, approve allocations and publish the monthly board pack."
        stats={[
          { label: "Active cases", value: "1,284" },
          { label: "Recovered YTD", value: "UGX 42.6B" },
        ]}
        actions={
          <>
            <Button variant="gold" icon="rocket_launch" onClick={() => setCycleOpen(true)}>Run allocation cycle</Button>
            <Button variant="outline" icon="download" onClick={() => setExportOpen(true)}>Export board pack</Button>
          </>
        }
      />
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-display-lg text-primary">Recovery Overview</h2>
          <p className="text-body-md text-on-surface-variant">
            Live performance metrics for Uganda regional liquidation.
          </p>
        </div>
        <div className="flex gap-sm">
          <button className="flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-high px-lg py-sm text-label-bold text-primary transition-colors hover:bg-surface-variant">
            <Icon name="calendar_today" className="text-[18px]" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-lg py-sm text-label-bold text-on-primary transition-opacity hover:opacity-90" onClick={() => setInitiateOpen(true)}>
            <Icon name="add_circle" className="text-[18px]" />
            Initiate Recovery
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-sm">
          <div className="flex items-start justify-between">
            <div className="rounded-lg bg-primary-fixed p-2">
              <Icon name="folder_managed" className="text-primary" />
            </div>
            <span className="flex items-center gap-1 text-label-bold text-green-600">
              <Icon name="trending_up" className="text-[14px]" /> +4.2%
            </span>
          </div>
          <div className="mt-3">
            <p className="text-label-bold uppercase tracking-wider text-on-surface-variant">
              Total Active Cases
            </p>
            <h3 className="mt-1 text-display-lg">1,284</h3>
            <p className="mt-2 text-body-sm text-on-surface-variant">Active: 840 | Closed: 444</p>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-sm">
          <div className="flex items-start justify-between">
            <div className="rounded-lg bg-secondary-fixed p-2">
              <Icon name="verified" className="text-secondary" />
            </div>
            <span className="flex items-center gap-1 text-label-bold text-green-600">
              <Icon name="trending_up" className="text-[14px]" /> +1.8%
            </span>
          </div>
          <div className="mt-3">
            <p className="text-label-bold uppercase tracking-wider text-on-surface-variant">
              Success Rate
            </p>
            <h3 className="mt-1 text-display-lg">78.5%</h3>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high">
              <div className="h-full bg-secondary" style={{ width: "78.5%" }} />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-sm">
          <div className="flex items-start justify-between">
            <div className="rounded-lg bg-tertiary-fixed p-2">
              <Icon name="bolt" className="text-tertiary" />
            </div>
            <span className="flex items-center gap-1 text-label-bold text-green-600">
              <Icon name="speed" className="text-[14px]" /> -82%
            </span>
          </div>
          <div className="mt-3">
            <p className="text-label-bold uppercase tracking-wider text-on-surface-variant">
              Allocation Speed
            </p>
            <h3 className="mt-1 text-display-lg">18.4 hrs</h3>
            <p className="mt-2 text-body-sm text-on-surface-variant">Down from 5 days baseline</p>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-sm">
          <div className="flex items-start justify-between">
            <div className="rounded-lg bg-primary-container p-2">
              <Icon name="payments" className="text-on-primary" />
            </div>
            <span className="text-label-bold text-primary">Target reached</span>
          </div>
          <div className="mt-3">
            <p className="text-label-bold uppercase tracking-wider text-on-surface-variant">
              Value Under Recovery
            </p>
            <h3 className="mt-1 text-display-lg">UGX 14.2B</h3>
            <p className="mt-2 text-body-sm text-on-surface-variant">Recovered YTD: UGX 8.6B</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-3">
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h4 className="text-title-lg text-primary">Recovery Performance Trends</h4>
            <select className="border-none bg-transparent text-label-bold text-on-surface-variant focus:ring-0">
              <option>Volume (UGX)</option>
              <option>Case Count</option>
            </select>
          </div>
          <div className="flex h-64 items-stretch justify-between gap-2 px-4">
            {monthlyBars.map((bar) => (
              <div key={bar.label} className="group flex flex-1 flex-col justify-end">
                <div
                  className={`w-full rounded-t-sm bg-primary-fixed-dim transition-opacity hover:opacity-80 ${bar.opacity}`}
                  style={{ height: `${bar.height}%` }}
                />
                <span className="mt-2 text-center text-[10px] font-semibold tracking-[0.05em]">{bar.label}</span>
              </div>
            ))}
            <div className="group flex flex-1 flex-col justify-end">
              <div className="w-full rounded-t-sm bg-primary" style={{ height: "90%" }} />
              <span className="mt-2 text-center text-[10px] font-bold tracking-[0.05em]">JUN</span>
            </div>
          </div>

        </div>

        <div className="group relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm">
          <h4 className="mb-4 text-title-lg text-primary">Regional Distribution</h4>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10 transition-opacity group-hover:opacity-20"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAELQE5XHRGTyAC0P6TKNV92a0-6MtXXMAFyg7iL-UnTZrf2hnZ_0uECs9uzOHGHKwi-HPn-0Xca3M_Mei_lJhUXFi3LN8_lKF5sBJnGU5h8C9RvliT1nUzC2ve_7md1iljhXM5Ayfb1ze7YPUwzuGYFJhyD3V4vh45v0LEbm3ZLIubAXaVpzdA6Lli0VrMYzGIeHZC9JXclaQm_7sR0lLRGmVBs6fHCErAeESWeijUPxz_hE4i442L9sk03w9NM_c5V1YM4-EcBFKB')",
            }}
          />
          <div className="relative z-10 space-y-4">
            {regions.map((r) => (
              <div
                key={r.name}
                className="flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors hover:bg-surface-container"
              >
                <span className="text-body-md">{r.name}</span>
                <span
                  className={`rounded px-2 py-0.5 text-mono-data ${
                    r.highlight ? "bg-primary-fixed" : "bg-surface-container-high"
                  }`}
                >
                  {r.pct}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <button className="flex items-center gap-1 text-label-bold text-primary hover:underline">
              View District Details <Icon name="arrow_forward" className="text-[16px]" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-2">
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm">
          <h4 className="mb-6 text-title-lg text-primary">Top Auctioneer Capacity</h4>
          <div className="space-y-6">
            {auctioneers.map((a) => (
              <div key={a.name}>
                <div className="mb-2 flex items-end justify-between">
                  <span className="text-label-bold">{a.name}</span>
                  <span className="text-mono-data">{a.pct}% Capacity</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                  <div className={`h-full ${a.color}`} style={{ width: `${a.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm">
          <div className="flex items-center justify-between border-b border-outline-variant p-lg">
            <h4 className="text-title-lg text-primary">System Activity Audit</h4>
            <span className="animate-pulse rounded-full bg-error-container px-2 py-0.5 text-[10px] font-bold text-on-error-container">
              2 CRITICAL ALERTS
            </span>
          </div>
          <div className="max-h-75 flex-1 overflow-y-auto">
            <div className="flex gap-4 border-b border-outline-variant bg-error-container/10 p-lg">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-error-container">
                <Icon name="warning" className="text-error" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-label-bold text-error">HIGH-VALUE OVERRIDE</p>
                  <span className="text-[10px] font-medium text-on-surface-variant">2 mins ago</span>
                </div>
                <p className="mt-1 text-body-md">
                  Manual allocation of <span className="font-bold">Case #88219 (UGX 450M)</span> by
                  Admin. Primary logic bypassed.
                </p>
              </div>
            </div>
            <div className="flex gap-4 border-b border-outline-variant p-lg">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high">
                <Icon name="assignment_turned_in" className="text-on-surface-variant" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-label-bold text-primary">AUTO-ALLOCATION</p>
                  <span className="text-[10px] font-medium text-on-surface-variant">14 mins ago</span>
                </div>
                <p className="mt-1 text-body-md">
                  Case #88224 assigned to <span className="font-bold">Heritage Recoveries</span> based
                  on proximity score (9.8/10).
                </p>
              </div>
            </div>
            <div className="flex gap-4 border-b border-outline-variant p-lg">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high">
                <Icon name="person_add" className="text-on-surface-variant" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-label-bold text-primary">NEW REGISTRATION</p>
                  <span className="text-[10px] font-medium text-on-surface-variant">1 hr ago</span>
                </div>
                <p className="mt-1 text-body-md">
                  Added <span className="font-bold">Swift Bailiffs Ltd</span> to Central Region pool.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard title="Recovery trend" subtitle="Recovered value vs target (UGX bn)">
            <RecoveryTrendChart data={TREND} />
          </ChartCard>
        </div>
        <ChartCard title="Portfolio status" subtitle="Share of active recovery cases">
          <StatusPieChart data={STATUS} />
        </ChartCard>
      </div>
      <ChartCard title="Regional caseload" subtitle="Active cases by region">
        <RegionBarChart data={REGION_DATA} />
      </ChartCard>

      <Modal
        open={cycleOpen}
        onClose={() => setCycleOpen(false)}
        title="Run Allocation Cycle"
        subtitle="Execute automatic case-to-auctioneer allocation engine with current queue"
        icon="rocket_launch"
        tone="primary"
        size="md"
        footer={
          <div className="flex justify-between gap-3">
            <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors" onClick={() => setCycleOpen(false)}>
              Cancel
            </button>
            <div className="flex gap-2">
              <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors">
                Schedule
              </button>
              <button className="px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md">
                Launch Engine
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
            <p className="text-body-sm text-on-surface"><span className="font-bold">Current Queue:</span> 42 cases pending allocation</p>
            <p className="text-body-sm text-on-surface-variant mt-1">Last run: Today, 09:15 AM</p>
          </div>
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Allocation Parameters</label>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={true} className="rounded border-outline-variant" readOnly />
                <span className="text-body-sm text-on-surface">Prioritize high-DPD cases</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={true} className="rounded border-outline-variant" readOnly />
                <span className="text-body-sm text-on-surface">Balance auctioneer workload</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-outline-variant" />
                <span className="text-body-sm text-on-surface">Override compliance flags</span>
              </label>
            </div>
          </div>
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Email Report To</label>
            <input type="email" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="admin@centenary.ug" />
          </div>
        </div>
      </Modal>

      <Modal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        title="Export Board Pack"
        subtitle="Generate monthly board report with performance metrics and exceptions"
        icon="download"
        tone="primary"
        size="md"
        footer={
          <div className="flex justify-between gap-3">
            <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors" onClick={() => setExportOpen(false)}>
              Cancel
            </button>
            <div className="flex gap-2">
              <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors">
                Preview
              </button>
              <button className="px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md">
                Export PDF
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Report Month</label>
            <select className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>June 2024 (Current)</option>
              <option>May 2024</option>
              <option>April 2024</option>
            </select>
          </div>
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Report Sections</label>
            <div className="space-y-2">
              {["Executive Summary", "Recovery Performance", "Regional Analysis", "Auctioneer Metrics", "Exceptions & Flags", "Audit Trail"].map((section) => (
                <label key={section} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={true} className="rounded border-outline-variant" readOnly />
                  <span className="text-body-sm text-on-surface">{section}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Distribution List</label>
            <input type="text" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="board@centenary.ug; cfo@centenary.ug" />
          </div>
        </div>
      </Modal>

      <Modal
        open={initiateOpen}
        onClose={() => setInitiateOpen(false)}
        title="Initiate Recovery"
        subtitle="Register a new recovery case into the system workflow"
        icon="add_circle"
        tone="primary"
        size="lg"
        footer={
          <div className="flex justify-between gap-3">
            <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors" onClick={() => setInitiateOpen(false)}>
              Cancel
            </button>
            <div className="flex gap-2">
              <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors">
                Save Draft
              </button>
              <button className="px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md">
                Create Recovery
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Borrower Name</label>
            <input type="text" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Full legal name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-label-bold text-on-surface block mb-2">National ID / Registration</label>
              <input type="text" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="ID number" />
            </div>
            <div>
              <label className="text-label-bold text-on-surface block mb-2">Borrower Type</label>
              <select className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Individual</option>
                <option>Corporate</option>
                <option>SME</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Loan ID</label>
            <input type="text" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g., LOAN-2024-001234" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-label-bold text-on-surface block mb-2">Outstanding Principal (UGX)</label>
              <input type="number" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="0" />
            </div>
            <div>
              <label className="text-label-bold text-on-surface block mb-2">Days Past Due (DPD)</label>
              <input type="number" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="0" />
            </div>
          </div>
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Collateral Type</label>
            <select className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>Land & Buildings</option>
              <option>Motor Vehicles</option>
              <option>Plant & Machinery</option>
              <option>Commercial Stock</option>
              <option>Securities & Bonds</option>
            </select>
          </div>
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Collateral Description</label>
            <textarea className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" rows={3} placeholder="Details about the collateral..." />
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}
