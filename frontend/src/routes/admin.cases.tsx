import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Icon } from "@/components/AppShell";
import { Modal } from "@/components/ui-kit";

export const Route = createFileRoute("/admin/cases")({
  component: CaseRegistry,
  head: () => ({
    meta: [
      { title: "Case Registry | AAAS System" },
      {
        name: "description",
        content:
          "Manage and track recovery progress for institutional debt portfolios across all active cases.",
      },
      { property: "og:title", content: "Case Registry | AAAS System" },
      {
        property: "og:description",
        content:
          "Manage and track recovery progress for institutional debt portfolios across all active cases.",
      },
    ],
  }),
});

type Case = {
  name: string;
  loanId: string;
  branch: string;
  dpd: string;
  dpdColor: string;
  balance: string;
  collateral: string;
  compliance: { icon: string; color: string; title: string }[];
  status: string;
  statusClass: string;
  auctioneerName?: string;
  auctioneerFirm?: string;
  auctioneerLicense?: string;
  auctioneerPhone?: string;
  allocationDate?: string;
};

const cases: Case[] = [
  {
    name: "Musa Kanyike",
    loanId: "LN-2023-9081",
    branch: "Kampala Regional Branch",
    dpd: "128",
    dpdColor: "text-error",
    balance: "45,200,000 UGX",
    collateral: "Commercial Property",
    compliance: [
      { icon: "task_alt", color: "text-green-600", title: "Valuation Validated" },
      { icon: "task_alt", color: "text-green-600", title: "Demand Notice Issued" },
    ],
    status: "Allocated",
    statusClass: "bg-green-100 text-green-800",
    auctioneerName: "M. K. Ssekandi",
    auctioneerFirm: "Kampala Asset Recovery Ltd",
    auctioneerLicense: "AUC-2023-44102",
    auctioneerPhone: "+256 700 123 456",
    allocationDate: "24 Oct 2023",
  },
  {
    name: "Sarah Namutebi",
    loanId: "LN-2024-1142",
    branch: "Entebbe Head Office",
    dpd: "92",
    dpdColor: "text-secondary",
    balance: "12,800,000 UGX",
    collateral: "Motor Vehicle (Toyota)",
    compliance: [
      { icon: "warning", color: "text-error", title: "Valuation Missing" },
      { icon: "task_alt", color: "text-green-600", title: "Demand Notice Issued" },
    ],
    status: "Submitted",
    statusClass: "bg-blue-100 text-blue-800",
  },
  {
    name: "John Bosco Okello",
    loanId: "LN-2024-5501",
    branch: "Jinja Operations",
    dpd: "45",
    dpdColor: "text-secondary",
    balance: "320,000,000 UGX",
    collateral: "Residential Land",
    compliance: [
      { icon: "hourglass_top", color: "text-outline-variant", title: "Pending" },
      { icon: "hourglass_top", color: "text-outline-variant", title: "Pending" },
    ],
    status: "Draft",
    statusClass: "bg-gray-100 text-gray-800",
  },
  {
    name: "Lydia Nakato",
    loanId: "LN-2023-8822",
    branch: "Mbarara Center",
    dpd: "210",
    dpdColor: "text-error",
    balance: "8,400,000 UGX",
    collateral: "Personal Assets",
    compliance: [
      { icon: "task_alt", color: "text-green-600", title: "Valuation Validated" },
      { icon: "task_alt", color: "text-green-600", title: "Demand Notice Issued" },
    ],
    status: "Allocated",
    statusClass: "bg-green-100 text-green-800",
    auctioneerName: "A. N. Katongole",
    auctioneerFirm: "Victoria Asset Recovery",
    auctioneerLicense: "AUC-2023-11928",
    auctioneerPhone: "+256 701 444 888",
    allocationDate: "22 Oct 2023",
  },
];

const filters = ["All Cases"];

function CaseRegistry() {
  const [activeFilter, setActiveFilter] = useState("All Cases");
  const [statusFilter, setStatusFilter] = useState("all");
  const [collateralFilter, setCollateralFilter] = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");
  const [panelOpen, setPanelOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const filteredCases = cases.filter((c) => {
    const matchesStatus = statusFilter === "all" || c.status.toLowerCase() === statusFilter;
    const matchesCollateral =
      collateralFilter === "all" ||
      (collateralFilter === "land" && c.collateral.toLowerCase().includes("land")) ||
      (collateralFilter === "vehicles" && c.collateral.toLowerCase().includes("vehicle")) ||
      (collateralFilter === "machinery" && c.collateral.toLowerCase().includes("machinery")) ||
      (collateralFilter === "stock" && c.collateral.toLowerCase().includes("stock")) ||
      (collateralFilter === "securities" && c.collateral.toLowerCase().includes("security"));
    const matchesBranch = branchFilter === "all" || c.branch === branchFilter;
    return matchesStatus && matchesCollateral && matchesBranch;
  });

  function downloadCSV(filename: string, rows: Case[]) {
    const headers = [
      "Borrower",
      "Loan ID",
      "Branch",
      "Turn Around Time",
      "Outstanding Balance",
      "Collateral",
      "Status",
    ];
    const csvRows = [headers.join(",")];
    rows.forEach((c) => {
      const vals = [c.name, c.loanId, c.branch, c.dpd, c.balance, c.collateral, c.status];
      csvRows.push(vals.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","));
    });
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function downloadExcel(filename: string, rows: Case[]) {
    // simple Excel-compatible CSV blob
    downloadCSV(filename, rows);
  }

  function downloadPDF(rows: Case[]) {
    const w = window.open("", "_blank", "noopener,noreferrer");
    if (!w) return;
    const style = `
      <style>
        table{border-collapse:collapse;width:100%;}
        th,td{border:1px solid #ddd;padding:8px;text-align:left}
        th{background:#f4f4f4}
      </style>
    `;
    const headers = ["Borrower","Loan ID","Branch","Turn Around Time","Outstanding Balance","Collateral","Status"];
    const rowsHtml = rows
      .map(
        (c) =>
          `<tr><td>${c.name}</td><td>${c.loanId}</td><td>${c.branch}</td><td>${c.dpd}</td><td>${c.balance}</td><td>${c.collateral}</td><td>${c.status}</td></tr>`
      )
      .join("");
    w.document.write(`<html><head><title>Cases</title>${style}</head><body><h3>Case Registry Export</h3><table><thead><tr>${headers
      .map((h) => `<th>${h}</th>`)
      .join("")}</tr></thead><tbody>${rowsHtml}</tbody></table></body></html>`);
    w.document.close();
    w.print();
  }

  return (
    <AppShell searchPlaceholder="Search Loan ID or Borrower...">
      <div className="mb-xl flex items-end justify-between">
        <div>
          <h2 className="text-display-lg text-primary">Case Registry</h2>
          <p className="mt-1 text-body-md text-on-surface-variant">
            Manage and track recovery progress for institutional debt portfolios.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => downloadExcel(`case-registry-${Date.now()}.xls`, filteredCases)}
            className="flex items-center gap-2 bg-primary text-on-primary px-3 py-2 rounded-lg"
          >
            <Icon name="grid_view" /> <span>Excel</span>
          </button>
          <button
            onClick={() => downloadPDF(filteredCases)}
            className="flex items-center gap-2 bg-primary text-on-primary px-3 py-2 rounded-lg"
          >
            <Icon name="picture_as_pdf" /> <span>PDF</span>
          </button>
          <button
            onClick={() => downloadCSV(`case-registry-${Date.now()}.csv`, filteredCases)}
            className="flex items-center gap-2 bg-primary text-on-primary px-3 py-2 rounded-lg"
          >
            <Icon name="download" /> <span>CSV</span>
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-lg py-3 text-label-bold text-on-primary shadow-md transition-all hover:opacity-90 active:scale-95" onClick={() => setRegisterOpen(true)}>
            <Icon name="add_circle" />
            Register New Case
          </button>
        </div>
      </div>

      <div className="mb-xl grid grid-cols-1 gap-lg md:grid-cols-4">
        <div className="flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <span className="text-label-bold uppercase text-outline">Active Cases</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-display-lg text-primary">124</span>
            <span className="text-green-600">+8.4%</span>
          </div>
        </div>
        <div className="flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <span className="text-label-bold uppercase text-outline">Total Recovery</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-display-lg text-primary">4.2B</span>
            <span className="text-body-sm text-label-bold text-on-surface-variant">UGX</span>
          </div>
        </div>
        <div className="flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <span className="text-label-bold uppercase text-outline">Pending Valuation</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-display-lg text-error">18</span>
            <span className="text-body-sm text-label-bold text-on-surface-variant">Cases</span>
          </div>
        </div>
        <div className="flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <span className="text-label-bold uppercase text-outline">Success Rate</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-display-lg text-primary">68%</span>
            <span className="text-blue-600">Avg 45 Days</span>
          </div>
        </div>
      </div>

        <div className="flex items-center justify-between gap-md rounded-t-xl border border-outline-variant bg-surface-container-lowest p-md">
        <div className="flex items-center gap-md flex-wrap">
          <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2 text-body-sm">
            <Icon name="filter_list" className="text-body-sm" />
            <span className="text-label-bold">Filters</span>
          </div>
          <div className="h-6 w-px bg-outline-variant" />
          <div className="flex gap-2">
            {filters.map((f) => (
              <span
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`cursor-pointer rounded-full px-3 py-1 text-label-bold ${
                  activeFilter === f
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container text-on-surface-variant hover:bg-outline-variant"
                }`}
              >
                {f}
              </span>
            ))}
          </div>
          <div className="h-6 w-px bg-outline-variant" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer">
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
            <option value="allocated">Allocated</option>
            <option value="completed">Completed</option>
          </select>
          <select value={collateralFilter} onChange={(e) => setCollateralFilter(e.target.value)} className="rounded-lg border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer">
            <option value="all">All Collateral</option>
            <option value="land">Land & Buildings</option>
            <option value="vehicles">Motor Vehicles</option>
            <option value="machinery">Plant & Machinery</option>
            <option value="stock">Commercial Stock</option>
            <option value="securities">Securities & Bonds</option>
          </select>
          <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)} className="rounded-lg border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer">
            <option value="all">All Branches</option>
            <option value="Kampala Regional Branch">Kampala Regional Branch</option>
            <option value="Entebbe Head Office">Entebbe Head Office</option>
            <option value="Jinja Operations">Jinja Operations</option>
            <option value="Mbarara Center">Mbarara Center</option>
          </select>
        </div>
        <div className="flex items-center gap-sm">
          <button className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container">
            <Icon name="download" />
          </button>
          <button className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container">
            <Icon name="sort" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden border-x border-b border-outline-variant bg-surface-container-lowest">
        <table className="w-full border-collapse text-left">

          <thead className="border-b border-outline-variant bg-surface-container-low">
            <tr>
              <th className="px-lg py-4 text-label-bold uppercase text-outline">Borrower Details</th>
              <th className="px-lg py-4 text-center text-label-bold uppercase text-outline">Turn Around Time</th>
              <th className="px-lg py-4 text-label-bold uppercase text-outline">Outstanding Balance</th>
              <th className="px-lg py-4 text-label-bold uppercase text-outline">Collateral</th>

              {/* <th className="px-lg py-4 text-label-bold uppercase text-outline">Compliance</th> */}

              <th className="px-lg py-4 text-label-bold uppercase text-outline">Status</th>
              <th className="px-lg py-4 text-right text-label-bold uppercase text-outline">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-outline-variant">
            {filteredCases.map((c) => (
              <tr
                key={c.loanId}
                onClick={() => {
                  setSelectedCase(c);
                  setPanelOpen(true);
                }}
                className="cursor-pointer transition-colors hover:bg-surface-container-low"
              >
                <td className="px-lg py-3">
                  <div className="flex flex-col">
                    <span className="text-label-bold text-primary">{c.name}</span>
                    <span className="text-body-sm text-on-surface-variant">{c.branch}</span>
                    <span className="text-mono-data text-outline">{c.loanId}</span>
                  </div>
                </td>

                <td className="px-lg py-3 text-center">
                  <span className={`text-mono-data font-bold ${c.dpdColor}`}>{c.dpd}</span>
                </td>

                <td className="px-lg py-3">
                  <span className="text-mono-data">{c.balance}</span>
                </td>

                <td className="px-lg py-3">
                  <span className="text-body-md">{c.collateral}</span>
                </td>

                {/* <td className="px-lg py-3">
                  <div className="flex gap-1">
                    {c.compliance.map((comp, i) => (
                      <Icon key={i} name={comp.icon} className={`text-[18px] ${comp.color}`} />
                    ))}
                  </div>
                </td> */}

                <td className="px-lg py-3">
                  <span
                    className={`rounded px-2 py-1 text-[11px] font-bold uppercase ${c.statusClass}`}
                  >
                    {c.status}
                  </span>
                </td>

                <td className="px-lg py-3 text-right">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedCase(c);
                      setPanelOpen(true);
                    }}
                    className="rounded-full p-2 text-primary transition-colors hover:bg-surface-container-highest"
                    aria-label={`View details for ${c.name}`}
                  >
                    <Icon name="visibility" className="text-lg" />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between bg-surface-container-low px-lg py-3">
          <span className="text-body-sm text-on-surface-variant">Showing 1-10 of 124 cases</span>
          <div className="flex items-center gap-2">
            <button className="rounded border border-outline-variant p-1 hover:bg-surface-container">
              <Icon name="chevron_left" />
            </button>
            <button className="rounded border border-outline-variant p-1 hover:bg-surface-container">
              <Icon name="chevron_right" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed right-0 top-16 z-40 h-[calc(100vh-4rem)] w-112.5 transform overflow-y-auto border-l border-outline-variant bg-surface-container-lowest shadow-2xl transition-transform duration-300 ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-lg">
          <div className="mb-lg flex items-start justify-between">
            <div>
              <h3 className="text-headline-sm text-primary">Auctioneer Details</h3>
              <p className="text-body-sm text-on-surface-variant">
                {selectedCase?.auctioneerFirm ?? "No auctioneer assigned"}
              </p>
            </div>
            <button
              className="rounded-full p-2 hover:bg-surface-container"
              onClick={() => {
                setPanelOpen(false);
                setSelectedCase(null);
              }}
            >
              <Icon name="close" />
            </button>
          </div>
          <div className="space-y-xl">
            <div className="rounded-lg bg-surface-container-low p-md">
              <div className="flex items-center gap-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-on-primary">
                  {(selectedCase?.auctioneerName ?? "NA").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-label-bold text-primary">
                    {selectedCase?.auctioneerName ?? "Not Allocated"}
                  </p>
                  <p className="text-body-sm">
                    {selectedCase?.status === "Allocated" ? "Allocated Auctioneer" : "Not Allocated"}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-md">
              <div className="rounded-lg border border-outline-variant p-md">
                <p className="text-[10px] font-bold uppercase text-outline">License ID</p>
                <p className="text-mono-data">{selectedCase?.auctioneerLicense ?? "N/A"}</p>
              </div>
              <div className="rounded-lg border border-outline-variant p-md">
                <p className="text-[10px] font-bold uppercase text-outline">Allocated On</p>
                <p className="text-mono-data">{selectedCase?.allocationDate ?? "N/A"}</p>
              </div>
            </div>
            <div className="rounded-lg border border-outline-variant p-md">
              <p className="text-[10px] font-bold uppercase text-outline">Contact</p>
              <p className="text-mono-data">{selectedCase?.auctioneerPhone ?? "N/A"}</p>
            </div>
            <div>
              <h4 className="mb-md text-label-bold text-primary">Related Case</h4>
              <div className="space-y-sm">
                <div className="flex items-center justify-between rounded-lg border border-outline-variant bg-green-50 p-3">
                  <div className="flex items-center gap-3">
                    <Icon name="check_circle" className="text-green-600" />
                    <span className="text-body-md">{selectedCase?.name ?? "Case"}</span>
                  </div>
                  <span className="text-[10px] font-bold text-green-700">ALLOCATED</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-outline-variant bg-green-50 p-3">
                  <div className="flex items-center gap-3">
                    <Icon name="check_circle" className="text-green-600" />
                    <span className="text-body-md">{selectedCase?.loanId ?? "Loan ID"}</span>
                  </div>
                  <span className="text-[10px] font-bold text-green-700">OPEN</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-dashed border-outline-variant p-3">
                  <div className="flex items-center gap-3">
                    <Icon name="description" className="text-outline" />
                    <span className="text-body-md">{selectedCase?.branch ?? "Branch"}</span>
                  </div>
                  <span className="text-[11px] font-bold text-primary">VIEW</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="mb-md text-label-bold text-primary">Allocation Timeline</h4>
              <div className="relative ml-2 space-y-lg border-l-2 border-outline-variant pl-6">
                <div className="relative">
                  <div className="absolute -left-8.25 top-0 h-4 w-4 rounded-full border-4 border-surface-container-lowest bg-primary" />
                  <p className="font-bold text-label-bold">Case Allocated</p>
                  <p className="text-[11px] text-on-surface-variant">{selectedCase?.allocationDate ?? "N/A"} • System Admin</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-8.25 top-0 h-4 w-4 rounded-full border-4 border-surface-container-lowest bg-outline" />
                  <p className="font-bold text-label-bold">Auctioneer Accepted</p>
                  <p className="text-[11px] text-on-surface-variant">{selectedCase?.auctioneerFirm ?? "Pending"}</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-8.25 top-0 h-4 w-4 rounded-full border-4 border-surface-container-lowest bg-outline" />
                  <p className="font-bold text-label-bold">Contact Confirmed</p>
                  <p className="text-[11px] text-on-surface-variant">{selectedCase?.auctioneerPhone ?? "N/A"}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-md pt-xl">
              <button className="w-full rounded-lg bg-primary py-3 text-label-bold text-on-primary hover:opacity-90">
                Open Allocation File
              </button>
              <button className="w-full rounded-lg border border-primary py-3 text-label-bold text-primary hover:bg-surface-container-low">
                Print Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        title="Register New Recovery Case"
        subtitle="Enter borrower and collateral information to initiate recovery process"
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
                Save Draft
              </button>
              <button className="px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md">
                Create Case
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
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Case Submission Date</label>
            <input type="date" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-label-bold text-on-surface block mb-2">Outstanding Principal (UGX)</label>
              <input type="number" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="0" />
            </div>
            <div>
              <label className="text-label-bold text-on-surface block mb-2">Turn Around Time (Days)</label>
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
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Attach Documents</label>
            <p className="text-body-sm text-on-surface-variant mb-3">Upload supporting documents (loan agreements, property valuations, identification, collateral photos, etc.)</p>
            <div className="border-2 border-dashed border-outline-variant rounded-lg p-8 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
              <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="hidden" id="doc-upload" />
              <label htmlFor="doc-upload" className="cursor-pointer block">
                <div className="flex items-center justify-center gap-2 text-primary mb-2">
                  <span className="text-2xl">📎</span>
                </div>
                <p className="text-label-bold text-primary">Click to upload documents</p>
                <p className="text-body-sm text-on-surface-variant">or drag and drop</p>
                <p className="text-[11px] text-outline mt-2">PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)</p>
              </label>
            </div>
            <div className="mt-4 space-y-2" id="document-list">
              {/* Uploaded documents will appear here */}
            </div>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}
