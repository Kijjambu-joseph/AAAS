import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Icon } from "@/components/AppShell";
import { DashboardWelcome, Button, Modal } from "@/components/ui-kit";
import { ChartCard, ThroughputLineChart, StatusPieChart } from "@/components/Charts";

const THROUGHPUT = [
  { day: "Mon", allocated: 24, exceptions: 4 },
  { day: "Tue", allocated: 31, exceptions: 6 },
  { day: "Wed", allocated: 28, exceptions: 3 },
  { day: "Thu", allocated: 37, exceptions: 5 },
  { day: "Fri", allocated: 42, exceptions: 8 },
  { day: "Sat", allocated: 18, exceptions: 2 },
];

const QUEUE_SPLIT = [
  { name: "Allocating", value: 14 },
  { name: "Pending validation", value: 11 },
  { name: "Queued", value: 9 },
  { name: "Exceptions", value: 12 },
];

export const Route = createFileRoute("/credit/")({
  component: CreditDashboard,
  head: () => ({
    meta: [
      { title: "Credit Officer Dashboard | Centenary Bank AAAS" },
      {
        name: "description",
        content:
          "Recovery statistics, license expiry tracking, allocation queue and system activity for credit officers.",
      },
      { property: "og:title", content: "Credit Officer Dashboard | Centenary Bank AAAS" },
      {
        property: "og:description",
        content:
          "Recovery statistics, license expiry tracking, allocation queue and system activity for credit officers.",
      },
    ],
  }),
});

const licenseRows = [
  {
    name: "M. K. Ssekandi Auctioneers",
    branch: "Kampala Regional Branch",
    licenseId: "AUC-2023-44102",
    cases: 14,
    date: "Oct 28, 2024",
    note: "Expiring in 3 days",
    status: "URGENT",
    statusClasses: "bg-red-100 text-red-800 border-red-200",
    dateClass: "text-error",
  },
  {
    name: "Victoria Asset Recovery",
    branch: "Entebbe Head Office",
    licenseId: "AUC-2023-11928",
    cases: 9,
    date: "Nov 12, 2024",
    note: "Expiring in 18 days",
    status: "WARNING",
    statusClasses: "bg-orange-100 text-orange-800 border-orange-200",
    dateClass: "text-secondary",
  },
  {
    name: "Swift Debt Liquidators Ltd",
    branch: "Jinja Operations",
    licenseId: "AUC-2023-88210",
    cases: 22,
    date: "Nov 15, 2024",
    note: "Expiring in 21 days",
    status: "WARNING",
    statusClasses: "bg-orange-100 text-orange-800 border-orange-200",
    dateClass: "text-secondary",
  },
  {
    name: "Anchor Associates",
    branch: "Mbarara Center",
    licenseId: "AUC-2023-33921",
    cases: 5,
    date: "Dec 02, 2024",
    note: "Expiring in 38 days",
    status: "PENDING",
    statusClasses: "bg-blue-100 text-blue-800 border-blue-200",
    dateClass: "text-on-surface-variant",
  },
];

const queueItems = [
  { title: "Asset Recovery #CAS-092-21", note: "Awaiting Auctioneer Assignment", value: "UGX 450M", border: "border-primary" },
  { title: "Asset Recovery #CAS-112-99", note: "Compliance Check Stage", value: "UGX 1.2B", border: "border-outline" },
  { title: "Asset Recovery #CAS-084-55", note: "Manual Override Requested", value: "UGX 89M", border: "border-outline" },
];

const activityItems = [
  { title: "Allocation Approved", note: "S. Mubiru assigned to CASE-9921", time: "14:02 PM • Admin-02", dot: "bg-primary" },
  { title: "New Case Onboarded", note: "Legal Dept initiated recovery flow", time: "11:45 AM • System", dot: "bg-outline" },
  { title: "Exception Flagged", note: "Panel conflict detected in Fort Portal", time: "09:12 AM • Engine-X", dot: "bg-error", titleClass: "text-error" },
];

function CreditDashboard() {
  const [engineOpen, setEngineOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [allocationOpen, setAllocationOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  return (
    <AppShell searchPlaceholder="Search Cases or Auctioneers...">
      <DashboardWelcome

        message="Your allocation queue, licence expiries and compliance checks for today. The auto-allocation engine is running normally."
        stats={[
          { label: "In queue", value: "42" },
          { label: "success Rate", value: "84.5%" },
          { label: "Recovered YTD", value: "UGX 42.68B" },
        ]}
        actions={

          <>
            <Button variant="gold" icon="bolt" onClick={() => setEngineOpen(true)}>
              Open allocation engine
            </Button>
            
          </>
        }
      />

      <div className="flex justify-between items-end mb-md">

        <div>
          <p className="text-label-bold text-secondary uppercase tracking-widest mb-1">Operational Overview</p>
          <h3 className="text-display-lg text-primary">Recovery Statistics</h3>
        </div>

        <div className="flex gap-md">
          <button
            className="px-md py-2 border border-primary text-primary rounded-lg text-label-bold hover:bg-primary/5 transition-colors flex items-center gap-2"
            onClick={() => setExportOpen(true)}
          >
            <Icon name="download" className="text-[18px]" /> Export Report
          </button>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-md">

        <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-md">
            <Icon name="diversity_3" className="text-primary bg-primary-fixed p-2 rounded-lg" />
            <span className="text-xs font-bold text-green-600 flex items-center gap-1">
              <Icon name="trending_up" className="text-xs" /> +3%
            </span>
          </div>
          <h3 className="text-on-surface-variant text-label-bold uppercase">Total Partners</h3>
          <p className="text-display-lg text-primary mt-1">128</p>
          <p className="text-xs text-outline mt-2">Active across 14 regions</p>
        </div>

        <div className="bg-surface-container-lowest p-md border border-outline-variant rounded-xl flex flex-col gap-4 hover:shadow-md transition-shadow group">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-primary-fixed rounded-lg text-primary">
              <Icon name="pending_actions" />
            </div>
            <span className="text-green-600 text-body-sm flex items-center gap-1">
              <Icon name="trending_up" className="text-[16px]" /> +8%
            </span>
          </div>
          <div className="mt-md">
            <p className="text-on-surface-variant text-label-bold uppercase">Pending Allocations</p>
            <h4 className="text-display-lg text-primary">42</h4>
          </div>
          <div className="mt-md h-1 bg-surface-container rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-primary transition-all duration-1000 group-hover:bg-secondary" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-md border border-outline-variant rounded-xl flex flex-col gap-4 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-secondary-fixed rounded-lg text-secondary">
              <Icon name="groups" />
            </div>
            <span className="text-on-surface-variant text-body-sm">Active Panel</span>
          </div>
          <div className="mt-sm">
            <p className="text-on-surface-variant text-label-bold uppercase">Panel Capacity</p>
            <h4 className="text-display-lg text-primary">88%</h4>
          </div>
          <p className="mt-md text-[11px] text-on-surface-variant italic">12 auctioneers currently at max load</p>
        </div>

        <div className="bg-error-container p-md border border-error/20 rounded-xl flex flex-col gap-4 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-error rounded-lg text-on-error">
              <Icon name="warning" />
            </div>
            <span className="text-error text-body-sm font-bold">CRITICAL</span>
          </div>
          <div className="mt-sm">
            <p className="text-on-error-container text-label-bold uppercase">License Expiry Alerts</p>
            <h4 className="text-display-lg text-error">07</h4>
          </div>
          <p className="mt-md text-[11px] text-on-error-container font-medium">Action required within 48 hours</p>
        </div>

        
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-lg">
        <div className="xl:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
            <h5 className="text-title-lg text-primary flex items-center gap-2">
              <Icon name="assignment_late" className="text-error" />
              License Expiry Tracking
            </h5>
            <button className="text-primary hover:underline text-body-sm font-bold">View Full Panel</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-high border-b border-outline-variant">
                <tr>
                  <th className="px-md py-3 text-label-bold text-on-surface-variant uppercase">Auctioneer Name</th>
                  <th className="px-md py-3 text-label-bold text-on-surface-variant uppercase">License ID</th>
                  <th className="px-md py-3 text-label-bold text-on-surface-variant uppercase text-center">Cases Held</th>
                  <th className="px-md py-3 text-label-bold text-on-surface-variant uppercase">Expiry Date</th>
                  <th className="px-md py-3 text-label-bold text-on-surface-variant uppercase">Status</th>
                  <th className="px-md py-3 text-label-bold text-on-surface-variant uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {licenseRows.map((row) => (
                  <tr key={row.licenseId} className="hover:bg-surface-container transition-colors group">
                    <td className="px-md py-3">
                      <div className="flex flex-col">
                        <span className="font-bold text-primary">{row.name}</span>
                        <span className="text-[11px] text-on-surface-variant">{row.branch}</span>
                      </div>
                    </td>
                    <td className="px-md py-3 text-body-sm">{row.licenseId}</td>
                    <td className="px-md py-3 text-center text-mono-data">{String(row.cases).padStart(2, "0")}</td>
                    <td className="px-md py-3">
                      <div className="flex flex-col">
                        <span className={`font-bold text-body-sm ${row.dateClass}`}>{row.date}</span>
                        <span className={`text-[11px] ${row.dateClass}`}>{row.note}</span>
                      </div>
                    </td>
                    <td className="px-md py-3">
                      <span className={`px-2 py-1 text-[10px] rounded-full font-bold border ${row.statusClasses}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-md py-3 text-right">
                      <button className="p-1 hover:bg-outline-variant rounded transition-colors">
                        <Icon name="more_vert" className="text-[20px] text-primary" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-sm bg-surface-container-lowest border-t border-outline-variant text-center">
            <button className="text-label-bold text-primary/50 hover:text-primary transition-colors flex items-center justify-center gap-1 mx-auto">
              LOAD MORE ENTRIES <Icon name="expand_more" className="text-[16px]" />
            </button>
          </div>
        </div>

        <div className="space-y-lg">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-lg overflow-hidden relative">
            <h5 className="text-title-lg text-primary mb-md flex items-center gap-2">
              <Icon name="queue" className="text-primary" />
              Allocation Queue
            </h5>
            <div className="space-y-md">
              {queueItems.map((item) => (
                <div key={item.title} className={`flex items-center gap-md p-md bg-surface-container rounded-lg border-l-4 ${item.border}`}>
                  <div className="flex-1">
                    <p className="text-body-sm font-bold text-primary">{item.title}</p>
                    <p className="text-[11px] text-on-surface-variant">{item.note}</p>
                  </div>
                  <span className="text-body-sm font-bold text-primary">{item.value}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-lg py-2 border border-outline text-primary text-label-bold rounded hover:bg-surface transition-colors">
              GO TO QUEUE
            </button>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-lg">
            <h5 className="text-title-lg text-primary mb-md flex items-center gap-2">
              <Icon name="history" />
              Recent Activity
            </h5>
            <div className="space-y-md relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-outline-variant">
              {activityItems.map((item) => (
                <div key={item.title} className="relative pl-lg">
                  <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-4 border-surface-container-lowest ${item.dot}`} />
                  <p className={`text-body-sm font-bold ${item.titleClass ?? ""}`}>{item.title}</p>
                  <p className="text-[11px] text-on-surface-variant">{item.note}</p>
                  <p className="text-[10px] text-outline font-medium mt-1">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional bento sections from Credit Administrator Console */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-md">

        <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-md">
            <Icon name="diversity_3" className="text-primary bg-primary-fixed p-2 rounded-lg" />
            <span className="text-xs font-bold text-green-600 flex items-center gap-1">
              <Icon name="trending_up" className="text-xs" /> +3%
            </span>
          </div>
          <h3 className="text-on-surface-variant text-label-bold uppercase">Total Partners</h3>
          <p className="text-display-lg text-primary mt-1">128</p>
          <p className="text-xs text-outline mt-2">Active across 14 regions</p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-md">
            <Icon name="timer" className="text-secondary bg-secondary-fixed p-2 rounded-lg" />
            <span className="text-xs font-bold text-error flex items-center gap-1">
              <Icon name="trending_down" className="text-xs" /> +0.4d
            </span>
          </div>
          <h3 className="text-on-surface-variant text-label-bold uppercase">Avg. Lead Time</h3>
          <p className="text-display-lg text-primary mt-1">
            4.2 <span className="text-headline-sm font-normal">days</span>
          </p>
          <p className="text-xs text-outline mt-2">From allocation to listing</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-md">
            <Icon name="verified_user" className="text-tertiary bg-tertiary-fixed p-2 rounded-lg" />
            <span className="text-xs font-bold text-green-600">98.2%</span>
          </div>
          <h3 className="text-on-surface-variant text-label-bold uppercase">Compliance Rate</h3>
          <p className="text-display-lg text-primary mt-1">Valid</p>
          <p className="text-xs text-outline mt-2">8 licenses expiring soon</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-md">
            <Icon name="monitoring" className="text-primary bg-primary-fixed p-2 rounded-lg" />
            <span className="text-xs font-bold text-primary">High</span>
          </div>
          <h3 className="text-on-surface-variant text-label-bold uppercase">Success Rate</h3>
          <p className="text-display-lg text-primary mt-1">84.5%</p>
          <p className="text-xs text-outline mt-2">Recovery vs. Appraised val</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-lg">
        <h5 className="text-label-bold text-on-surface-variant uppercase mb-md tracking-wider">Engine Status</h5>
        <div className="flex items-center gap-md mb-md">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-surface-container-high"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="text-green-500"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="90, 100"
                strokeWidth="3"
              />
            </svg>
            <span className="text-[10px] font-bold">90%</span>
          </div>
          <div>
            <p className="text-body-sm font-bold">Auto-Allocation Live</p>
            <p className="text-[11px] text-on-surface-variant">42 ms latency</p>
          </div>
        </div>
        <div className="space-y-sm">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-on-surface-variant">Queue Depth</span>
            <span className="font-bold">12 Assets</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-on-surface-variant">Compliance Gate</span>
            <span className="text-green-600 font-bold">Active</span>
          </div>
        </div>
      </div>

      <footer className="p-lg border-t border-outline-variant text-center bg-surface-container-low rounded-lg">
        <p className="text-label-bold text-on-surface-variant opacity-80 uppercase tracking-widest font-bold">
          Centenary Bank Auto-Allocation of Auctioneers System (AAAS) &copy; 2026 Centenary Bank
        </p>
      </footer>

      <Modal
        open={engineOpen}
        onClose={() => setEngineOpen(false)}
        title="Launch Allocation Engine"
        subtitle="Confirm engine execution with the current queue and allocation settings."
        icon="bolt"
        tone="primary"
        footer={
          <div className="flex justify-between gap-3 w-full">
            <Button variant="ghost" onClick={() => setEngineOpen(false)}>
              Cancel
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                View Queue
              </Button>
              <Button onClick={() => setEngineOpen(false)}>
                Launch Engine
              </Button>
            </div>
          </div>
        }
      >
        <div className="space-y-md">
          <p className="text-body-md text-on-surface-variant">
            The auto-allocation engine will attempt to match pending cases with available auctioneers.
            Review the queue size and exception backlog before launching.
          </p>
          <div className="grid grid-cols-1 gap-sm sm:grid-cols-2">
            <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md">
              <p className="text-[11px] uppercase tracking-[0.15em] text-on-surface-variant">Pending Cases</p>
              <p className="text-headline-sm font-semibold text-primary">42</p>
            </div>
            <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md">
              <p className="text-[11px] uppercase tracking-[0.15em] text-on-surface-variant">Open Exceptions</p>
              <p className="text-headline-sm font-semibold text-error">3</p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        title="Export Allocation Report"
        subtitle="Choose the format for export and download the latest dashboard data."
        icon="download"
        footer={
          <div className="flex justify-between gap-3 w-full">
            <Button variant="ghost" onClick={() => setExportOpen(false)}>
              Cancel
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                Preview
              </Button>
              <Button onClick={() => setExportOpen(false)}>
                Export
              </Button>
            </div>
          </div>
        }
      >
        <div className="space-y-md">
          <label className="block text-body-sm font-semibold text-on-surface-variant">
            Export format
          </label>
          <select className="w-full rounded-lg border border-outline-variant bg-background px-md py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary">
            <option>PDF</option>
            <option>Excel</option>
            <option>CSV</option>
          </select>
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md">
            <p className="text-body-sm text-on-surface-variant">
              Export scope: current dashboard snapshot.
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        open={allocationOpen}
        onClose={() => setAllocationOpen(false)}
        title="Create Manual Allocation"
        subtitle="Start a new allocation workflow for a selected case or auctioneer."
        icon="add"
        footer={
          <div className="flex justify-between gap-3 w-full">
            <Button variant="ghost" onClick={() => setAllocationOpen(false)}>
              Cancel
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                Recommendation
              </Button>
              <Button onClick={() => setAllocationOpen(false)}>
                Create Allocation
              </Button>
            </div>
          </div>
        }
      >
        <div className="space-y-md">
          <p className="text-body-md text-on-surface-variant">
            Use this workflow to manually assign a case, review scoring, and confirm the auctioneer match.
          </p>
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md">
            <p className="text-[11px] uppercase tracking-[0.15em] text-on-surface-variant">Recommended action</p>
            <p className="mt-2 text-body-md text-primary">Review candidate pool before assignment.</p>
          </div>
        </div>
      </Modal>

      <Modal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        title="Compliance Review"
        subtitle="Review flagged items and compliance exceptions before finalizing allocations."
        icon="policy"
        footer={
          <div className="flex justify-between gap-3 w-full">
            <Button variant="ghost" onClick={() => setReviewOpen(false)}>
              Close
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                View Details
              </Button>
              <Button onClick={() => setReviewOpen(false)}>
                Confirm Review
              </Button>
            </div>
          </div>
        }
      >
        <div className="space-y-md">
          <p className="text-body-md text-on-surface-variant">
            This review will open compliance checks for the latest queue, license status, and risk exceptions.
          </p>
          <ul className="space-y-2 text-body-sm text-on-surface-variant">
            <li>• Validation of auctioneer licenses</li>
            <li>• Verification of collateral documentation</li>
            <li>• Monitoring of exception rates</li>
          </ul>
        </div>
      </Modal>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard title="Allocation throughput" subtitle="Cases allocated vs exceptions this week">
            <ThroughputLineChart data={THROUGHPUT} />
          </ChartCard>
        </div>
        <ChartCard title="Queue composition" subtitle="Current allocation queue by state">
          <StatusPieChart data={QUEUE_SPLIT} />
        </ChartCard>
      </div>
    </AppShell>
  );
}
