import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Icon } from "@/components/AppShell";
import { DashboardWelcome, Button, Modal } from "@/components/ui-kit";
import { ChartCard, RecoveryTrendChart, StatusPieChart } from "@/components/Charts";

const MY_TREND = [
  { month: "Feb", recovered: 4, target: 5 },
  { month: "Mar", recovered: 6, target: 5 },
  { month: "Apr", recovered: 5, target: 6 },
  { month: "May", recovered: 8, target: 6 },
  { month: "Jun", recovered: 7, target: 7 },
];

const MY_STATUS = [
  { name: "Allocated", value: 9 },
  { name: "Submitted", value: 5 },
  { name: "Draft", value: 2 },
  { name: "Closed", value: 2 },
];

export const Route = createFileRoute("/officer/")({
  component: OfficerDashboard,
  head: () => ({
    meta: [
      { title: "Loan Officer Dashboard | AAAS System" },
      {
        name: "description",
        content:
          "Overview of active recovery cases, pending valuations, draft submissions, and allocated value for loan officers.",
      },
      { property: "og:title", content: "Loan Officer Dashboard | AAAS System" },
      {
        property: "og:description",
        content:
          "Overview of active recovery cases, pending valuations, draft submissions, and allocated value for loan officers.",
      },
    ],
  }),
});

const cases = [
  {
    id: "#REC-9821-K",
    name: "Tumusiime Emmanuel",
    asset: "Real Estate (Residential)",
    status: "Allocated",
    statusClass: "bg-green-100 text-green-800",
    action: "View Details",
  },
  {
    id: "#REC-0452-P",
    name: "Agaba Martha Rita",
    asset: "Commercial Vehicle",
    status: "Submitted",
    statusClass: "bg-blue-100",
    statusStyle: { color: "#001b3e" },
    action: "View Details",
  },
  {
    id: "#REC-1109-W",
    name: "Mukasa Furniture Ltd",
    asset: "Industrial Machinery",
    status: "Draft",
    statusClass: "bg-slate-100 text-slate-800",
    action: "Continue Editing",
  },
  {
    id: "#REC-7732-S",
    name: "Nakato Josephine",
    asset: "Real Estate (Land)",
    status: "Allocated",
    statusClass: "bg-green-100 text-green-800",
    action: "View Details",
  },
  {
    id: "#REC-2101-B",
    name: "Baluku & Sons Cargo",
    asset: "Logistics Fleet",
    status: "Submitted",
    statusClass: "bg-blue-100",
    statusStyle: { color: "#001b3e" },
    action: "View Details",
  },
];

const pendingValuations = [
  { id: "Asset Val-4491", name: "Kireka Residential Complex", note: "Assigned: Today, 9:00 AM", action: "Ping Valuer", highlight: true },
  { id: "Asset Val-4488", name: "Mercedes Actros Tipper", note: "Assigned: Yesterday", action: "Details", highlight: false },
  { id: "Asset Val-4480", name: "Entebbe Plot 12A", note: "Assigned: 2 days ago", action: "Details", highlight: false },
];

const auditTrail = [
  { title: "Case #REC-9821-K Allocated", detail: "Auctioneer 'Standard Assets' assigned by Registry Dept.", time: "14:32 PM", color: "bg-primary" },
  { title: "Draft Updated", detail: "John Mukasa edited collateral details for Mukasa Furniture Ltd.", time: "11:15 AM", color: "bg-secondary-container" },
  { title: "System Login", detail: "User session started on Terminal-04.", time: "08:00 AM", color: "bg-outline" },
];

function OfficerDashboard() {
  const [newCaseOpen, setNewCaseOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <AppShell>
      <DashboardWelcome
        message="Here are your assigned recovery files, pending valuations and drafts awaiting submission."
        stats={[
          { label: "My cases", value: "18" },
          { label: "Pending valuations", value: "3" },
          { label: "Drafts", value: "2" },
        ]}
        actions={
          <>
            <Button variant="gold" icon="add_circle" onClick={() => setNewCaseOpen(true)}>New case file</Button>
            <Button variant="outline" icon="upload_file" onClick={() => setUploadOpen(true)}>Upload document</Button>
          </>
        }
      />
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-display-lg text-primary">System Overview</h1>
          <p className="mt-1 max-w-2xl text-body-md text-on-surface-variant">
            Manage institutional recovery cases, monitor valuation statuses, and finalize draft submissions for
            auction allocation.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-xl py-lg text-on-primary shadow-lg transition-all hover:bg-primary-container active:scale-95" onClick={() => setRegisterOpen(true)}>
          <Icon name="add_circle" />
          <span className="text-title-lg">Register New Case</span>
        </button>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 gap-lg md:grid-cols-4">
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md">
          <div className="mb-base flex items-start justify-between">
            <span className="rounded-lg bg-primary-fixed p-2 text-primary-container">
              <Icon name="cases" />
            </span>
            <span className="rounded bg-success/10 px-2 py-1 text-[11px] text-success font-semibold tracking-[0.05em]">+4.2%</span>
          </div>
          <p className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold tracking-[0.05em]">My Active Cases</p>
          <h3 className="mt-2 text-display-lg text-primary">128</h3>
        </div>
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md">
          <div className="mb-base flex items-start justify-between">
            <span className="rounded-lg bg-secondary-fixed p-2 text-secondary">
              <Icon name="pending_actions" />
            </span>
            <span className="rounded bg-secondary-fixed-dim/20 px-2 py-1 text-[11px] text-secondary font-semibold tracking-[0.05em]">Urgent</span>
          </div>
          <p className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold tracking-[0.05em]">Pending Valuations</p>
          <h3 className="mt-2 text-display-lg text-primary">14</h3>
        </div>
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md">
          <div className="mb-base flex items-start justify-between">
            <span className="rounded-lg bg-tertiary-fixed p-2 text-on-tertiary-container">
              <Icon name="history_edu" />
            </span>
          </div>
          <p className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold tracking-[0.05em]">Draft Submissions</p>
          <h3 className="mt-2 text-display-lg text-primary">23</h3>
        </div>
        <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-primary p-md text-on-primary">
          <div className="relative z-10">
            <p className="text-[11px] uppercase tracking-wider opacity-70 font-semibold tracking-[0.05em]">Allocated Value</p>
            <h3 className="mt-1 text-display-lg text-secondary-container">
              4.2B <span className="text-sm font-normal text-on-primary">UGX</span>
            </h3>
          </div>
          <button className="relative z-10 flex items-center gap-1 text-label-bold">
            View Detailed Report <Icon name="arrow_forward" className="text-sm" />
          </button>
          <div className="absolute bottom-[-20px] right-[-20px] rotate-12 scale-150 opacity-10">
            <Icon name="account_balance" className="text-9xl" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-3">
        {/* Main table */}
        <div className="space-y-lg lg:col-span-2">
          <section className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm">
            <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-low px-lg py-md">
              <h3 className="text-title-lg text-primary">Recent Case Activity</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 rounded border border-outline-variant px-3 py-1.5 text-body-sm text-on-surface-variant hover:bg-surface-variant text-label-bold">
                  <Icon name="filter_list" className="text-sm" /> Filter
                </button>
                <button className="flex items-center gap-1 rounded border border-outline-variant px-3 py-1.5 text-body-sm text-on-surface-variant hover:bg-surface-variant text-label-bold">
                  <Icon name="download" className="text-sm" /> Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-high">
                    <th className="px-lg py-3 uppercase text-on-surface-variant text-label-bold">Case ID</th>
                    <th className="px-lg py-3 uppercase text-on-surface-variant text-label-bold">Borrower Name</th>
                    <th className="px-lg py-3 uppercase text-on-surface-variant text-label-bold">Asset Type</th>
                    <th className="px-lg py-3 uppercase text-on-surface-variant text-label-bold">Status</th>
                    <th className="px-lg py-3 text-right uppercase text-on-surface-variant text-label-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {cases.map((c) => (
                    <tr key={c.id} className="transition-colors hover:bg-surface-container-low">
                      <td className="px-lg py-3 font-bold text-primary text-mono-data">{c.id}</td>
                      <td className="px-lg py-3 text-body-md text-on-surface">{c.name}</td>
                      <td className="px-lg py-3 text-body-sm text-on-surface-variant">{c.asset}</td>
                      <td className="px-lg py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs text-label-bold ${c.statusClass}`}
                          style={c.statusStyle}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="px-lg py-3 text-right">
                        <button className="text-xs uppercase tracking-tight text-primary hover:text-primary-container font-semibold tracking-[0.05em]">
                          {c.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-outline-variant bg-surface-container-low px-lg py-md">
              <p className="text-body-sm text-on-surface-variant">Showing 5 of 128 active cases</p>
              <div className="flex gap-2">
                <button className="rounded border border-outline-variant px-3 py-1 opacity-50" disabled>
                  <Icon name="chevron_left" className="text-sm" />
                </button>
                <button className="rounded border border-outline-variant px-3 py-1 transition-colors hover:bg-surface-variant">
                  <Icon name="chevron_right" className="text-sm" />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-lg">
          <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm">
            <h3 className="mb-md flex items-center gap-2 text-title-lg text-primary">
              <Icon name="request_quote" className="text-secondary" /> Pending Valuations
            </h3>
            <div className="space-y-md">
              {pendingValuations.map((v) => (
                <div
                  key={v.id}
                  className={`rounded-r-lg border-l-4 bg-surface-container-low p-3 ${
                    v.highlight ? "border-secondary" : "border-outline-variant opacity-80"
                  }`}
                >
                  <p className="text-on-surface text-label-bold">{v.id}</p>
                  <p className="text-body-sm text-on-surface-variant">{v.name}</p>
                  <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-sm">
                    <span className="truncate text-[11px] italic text-on-surface-variant">{v.note}</span>
                    <button className="shrink-0 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.05em] text-primary hover:underline">
                      {v.action}
                    </button>
                  </div>

                </div>
              ))}
            </div>
            <button className="mt-lg w-full rounded border border-primary/20 py-2 text-center text-primary transition-colors hover:bg-primary-fixed text-label-bold">
              View All Pending (14)
            </button>
          </section>

          <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm">
            <h3 className="mb-md text-title-lg text-primary">System Audit Trail</h3>
            <div className="relative space-y-lg before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-[2px] before:bg-outline-variant before:content-['']">
              {auditTrail.map((a, i) => (
                <div key={i} className="relative pl-8">
                  <div className={`absolute left-0 top-1 h-6 w-6 rounded-full border-4 border-surface-container-lowest ${a.color}`} />
                  <p className="text-xs font-bold text-on-surface font-medium">{a.title}</p>
                  <p className="text-body-sm text-on-surface-variant">{a.detail}</p>
                  <span className="text-[10px] uppercase text-outline font-semibold tracking-[0.05em]">{a.time}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard title="My submissions" subtitle="Cases submitted vs allocated over recent months">
            <RecoveryTrendChart data={MY_TREND} />
          </ChartCard>
        </div>
        <ChartCard title="Case status" subtitle="Breakdown of my portfolio">
          <StatusPieChart data={MY_STATUS} />
        </ChartCard>
      </div>

      <Modal
        open={newCaseOpen}
        onClose={() => setNewCaseOpen(false)}
        title="Create New Case File"
        subtitle="Initiate a new recovery case with borrower and collateral information"
        icon="add_circle"
        tone="primary"
        size="lg"
        footer={
          <div className="flex justify-between gap-3">
            <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors" onClick={() => setNewCaseOpen(false)}>
              Cancel
            </button>
            <div className="flex gap-2">
              <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors">
                Save Draft
              </button>
              <button className="px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md">
                Create File
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
              <label className="text-label-bold text-on-surface block mb-2">National ID</label>
              <input type="text" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="ID number" />
            </div>
            <div>
              <label className="text-label-bold text-on-surface block mb-2">Loan ID</label>
              <input type="text" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="LOAN-2024-001234" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-label-bold text-on-surface block mb-2">Outstanding Amount (UGX)</label>
              <input type="number" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="0" />
            </div>
            <div>
              <label className="text-label-bold text-on-surface block mb-2">Asset Type</label>
              <select className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Real Estate (Residential)</option>
                <option>Real Estate (Commercial)</option>
                <option>Motor Vehicle</option>
                <option>Industrial Machinery</option>
                <option>Logistics Fleet</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Asset Description</label>
            <textarea className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" rows={3} placeholder="Details about the asset..." />
          </div>
        </div>
      </Modal>

      <Modal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        title="Upload Case Document"
        subtitle="Upload supporting documentation for case files or valuations"
        icon="upload_file"
        tone="primary"
        size="md"
        footer={
          <div className="flex justify-between gap-3">
            <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors" onClick={() => setUploadOpen(false)}>
              Cancel
            </button>
            <div className="flex gap-2">
              <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors">
                Preview
              </button>
              <button className="px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md">
                Upload
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Case ID</label>
            <select className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>#REC-9821-K - Tumusiime Emmanuel</option>
              <option>#REC-0452-P - Agaba Martha Rita</option>
              <option>#REC-1109-W - Mukasa Furniture Ltd</option>
              <option>#REC-7732-S - Nakato Josephine</option>
            </select>
          </div>
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Document Type</label>
            <select className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>Valuation Report</option>
              <option>Legal Opinion</option>
              <option>Proof of Ownership</option>
              <option>Compliance Certificate</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Upload File</label>
            <div className="border-2 border-dashed border-outline-variant rounded-lg p-6 text-center hover:bg-primary/5 transition-colors cursor-pointer">
              <Icon name="cloud_upload" className="mx-auto text-2xl text-primary mb-2" />
              <p className="text-body-sm text-on-surface-variant">Click to upload or drag and drop</p>
              <p className="text-[10px] text-outline mt-1">PDF, JPG, PNG or DOCX (max. 10MB)</p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        title="Register Recovery Case"
        subtitle="Formally register a new recovery case in the system"
        icon="description"
        tone="primary"
        size="lg"
        footer={
          <div className="flex justify-between gap-3">
            <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors" onClick={() => setRegisterOpen(false)}>
              Cancel
            </button>
            <div className="flex gap-2">
              <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors">
                Review
              </button>
              <button className="px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md">
                Register Case
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
              <label className="text-label-bold text-on-surface block mb-2">National ID</label>
              <input type="text" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="ID number" />
            </div>
            <div>
              <label className="text-label-bold text-on-surface block mb-2">Loan Reference</label>
              <input type="text" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="LOAN-2024-001234" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-label-bold text-on-surface block mb-2">Outstanding Principal (UGX)</label>
              <input type="number" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="0" />
            </div>
            <div>
              <label className="text-label-bold text-on-surface block mb-2">Days Past Due</label>
              <input type="number" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="0" />
            </div>
          </div>
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Collateral Type</label>
            <select className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>Real Estate (Residential)</option>
              <option>Real Estate (Commercial)</option>
              <option>Motor Vehicle</option>
              <option>Industrial Machinery</option>
              <option>Logistics Fleet</option>
            </select>
          </div>
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Collateral Description</label>
            <textarea className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" rows={2} placeholder="Detailed description..." />
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}
