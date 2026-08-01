import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell, Icon, PageHeader } from "@/components/AppShell";
import { Modal } from "@/components/ui-kit";
import AuctioneerAutocomplete from "@/components/AuctioneerAutocomplete";
import { Api } from "@/lib/api";
import { Toaster, toast } from "sonner";
import {
  Download,
  ChevronRight,
  Plus,
  X,
  Search,
  Filter,
  File,
  MoreHorizontal,
} from "lucide-react";

export const Route = createFileRoute("/credit/cases")({
  component: CaseRegistry,
  head: () => ({
    meta: [
      { title: "Case Registry | Centenary Bank AAAS" },
      {
        name: "description",
        content: "Manage and track loan recovery cases awaiting auctioneer allocation.",
      },
      { property: "og:title", content: "Case Registry | Centenary Bank AAAS" },
      {
        property: "og:description",
        content: "Manage and track loan recovery cases awaiting auctioneer allocation.",
      },
    ],
  }),
});

const kpis = [
  { label: "TOTAL ACTIVE CASES", icon: "folder_shared", value: "142", tag: "+5%", tagClass: "text-secondary", note: "Active recovery operations" },
  { label: "PENDING ALLOCATION", icon: "pending_actions", value: "28", tag: "Critical", tagClass: "text-error", note: "Awaiting legal review" },
  { label: "AVG. DPD", icon: "schedule", value: "184d", tag: "-12d", tagClass: "text-secondary-fixed-dim", note: "Across all portfolio segments" },
  { label: "RECOVERY VALUE", icon: "payments", value: "UGX 4.2B", tag: "In Process", tagClass: "text-secondary", note: "Total outstanding principal" },
];

const rows = [
  {
    id: "#LR-2024-0012",
    name: "Musa K. Walusimbi",
    idLine: "ID: 100928374 | Corporate",
    branch: "Kampala Regional Branch",
    dpd: 214,
    dpdClass: "bg-error-container text-on-error-container",
    outstanding: "850,000,000",
    collateralIcon: "landscape",
    collateral: "Commercial Land",
    compliance: 3,
    status: "Allocated",
    statusClass: "bg-[#dcfce7] text-[#166534]",
    auctioneerName: "M. K. Ssekandi",
    auctioneerFirm: "Kampala Asset Recovery Ltd",
    auctioneerLicense: "AUC-2023-44102",
    auctioneerPhone: "+256 700 123 456",
    allocationDate: "24 Oct 2023",
  },
  {
    id: "#LR-2024-0015",
    name: "Sarah Namulondo",
    idLine: "ID: 211093345 | Individual",
    branch: "Entebbe Head Office",
    dpd: 92,
    dpdClass: "bg-secondary-fixed text-on-secondary-container",
    outstanding: "42,500,000",
    collateralIcon: "directions_car",
    collateral: "Logbook: Toyota Prado",
    compliance: 2,
    status: "Draft",
    statusClass: "bg-surface-container-high text-on-surface-variant",
  },
  {
    id: "#LR-2024-0018",
    name: "Jubilee Agri-Trade Ltd",
    idLine: "ID: 887221094 | SME",
    branch: "Jinja Operations",
    dpd: 184,
    dpdClass: "bg-error-container text-on-error-container",
    outstanding: "1,240,000,000",
    collateralIcon: "factory",
    collateral: "Plant & Machinery",
    compliance: 3,
    status: "Submitted",
    statusClass: "bg-primary-fixed text-on-primary-fixed-variant",
  },
  {
    id: "#LR-2024-0021",
    name: "Ocen Emmanuel",
    idLine: "ID: 554302911 | Individual",
    branch: "Mbarara Center",
    dpd: 105,
    dpdClass: "bg-secondary-fixed text-on-secondary-container",
    outstanding: "128,400,000",
    collateralIcon: "home",
    collateral: "Residential House",
    compliance: 1,
    status: "Draft",
    statusClass: "bg-surface-container-high text-on-surface-variant",
  },
  {
    id: "#LR-2024-0022",
    name: "Greenways Logistics",
    idLine: "ID: 991827364 | Corporate",
    branch: "Kampala Regional Branch",
    dpd: 256,
    dpdClass: "bg-error-container text-on-error-container",
    outstanding: "2,100,000,000",
    collateralIcon: "local_shipping",
    collateral: "Heavy Duty Fleet",
    compliance: 3,
    status: "Allocated",
    statusClass: "bg-[#dcfce7] text-[#166534]",
    auctioneerName: "A. N. Katongole",
    auctioneerFirm: "Victoria Asset Recovery",
    auctioneerLicense: "AUC-2023-11928",
    auctioneerPhone: "+256 701 444 888",
    allocationDate: "22 Oct 2023",
  },
];

// function ComplianceDots({ count }: { count: number }) {
//   return (
//     <div className="flex justify-center gap-1">
//       {[0, 1, 2].map((i) => (
//         <Icon
//           key={i}
//           name="check_circle"
//           className={i < count ? "text-secondary text-sm" : "text-outline-variant text-sm"}
//         />
//       ))}
//     </div>
//   );
// }

function CaseRegistry() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [caseFormOpen, setCaseFormOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [collateralFilter, setCollateralFilter] = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [allocationDetails, setAllocationDetails] = useState<any | null>(null);
  const [openingDetails, setOpeningDetails] = useState(false);
  const [selectedAuctioneer, setSelectedAuctioneer] = useState<any | null>(null);
  const [allocating, setAllocating] = useState(false);

  // Fetch cases on mount
  useEffect(() => {
    fetchCases();
  }, []);

  async function fetchCases() {
    try {
      setLoading(true);
      const response = await Api.get("/api/cases/?ordering=-created_at");
      setCases(response);
    } catch (error: any) {
      console.error("Failed to fetch cases:", error);
      toast.error("Failed to load cases");
    } finally {
      setLoading(false);
    }
  }

  async function openDetails(caseId: string) {
    try {
      setOpeningDetails(true);
      const allocation = await Api.get(`/api/cases/${caseId}/allocation/`);
      setAllocationDetails(allocation);
      setSelectedCaseId(caseId);
      setSelectedAuctioneer(null);
      setPanelOpen(true);
    } catch (error: any) {
      if (error.status === 404) {
        // Case not allocated yet
        setAllocationDetails(null);
        setSelectedCaseId(caseId);
        setSelectedAuctioneer(null);
        setPanelOpen(true);
      } else {
        toast.error("Failed to load allocation details");
      }
    } finally {
      setOpeningDetails(false);
    }
  }

  async function allocateManual() {
    if (!selectedCaseId || !selectedAuctioneer?.id) {
      toast.error("Please select an auctioneer");
      return;
    }

    try {
      setAllocating(true);
      await Api.post(`/api/cases/${selectedCaseId}/allocate/`, {
        auctioneer_id: selectedAuctioneer.id,
        method: "manual",
      });
      toast.success("Case allocated successfully");
      setAllocationDetails(selectedAuctioneer);
      setSelectedAuctioneer(null);
      await fetchCases();
    } catch (error: any) {
      console.error("Allocation error:", error);
      toast.error(error.data?.detail || "Failed to allocate case");
    } finally {
      setAllocating(false);
    }
  }

  // Transform API cases to table row format
  const rows = cases.map((c: any) => ({
    id: c.id,
    case_number: c.case_number,
    name: c.borrower_name,
    idLine: `ID: ${c.borrower_id} | ${c.customer_type || "Individual"}`,
    branch: c.branch?.name || "Unknown Branch",
    dpd: Math.floor((new Date().getTime() - new Date(c.created_at).getTime()) / (1000 * 60 * 60 * 24)),
    dpdClass: "bg-error-container text-on-error-container",
    outstanding: c.outstanding_principal?.toLocaleString() || "N/A",
    collateralIcon: c.collateral_type === "land" ? "landscape" : c.collateral_type === "vehicle" ? "directions_car" : "home",
    collateral: c.collateral_description || "Not specified",
    compliance: 2,
    status: c.status === "allocated" ? "Allocated" : c.status === "submitted" ? "Submitted" : "Draft",
    statusClass: c.status === "allocated" ? "bg-[#dcfce7] text-[#166534]" : c.status === "submitted" ? "bg-primary-fixed text-on-primary-fixed-variant" : "bg-surface-container-high text-on-surface-variant",
    allocation: c.allocation,
  }));

  const filteredRows = rows.filter((row) => {
    const statusValue = row.status.toLowerCase();
    const collateralValue = row.collateral.toLowerCase();
    const matchesStatus = statusFilter === "all" || statusValue === statusFilter;
    const matchesCollateral =
      collateralFilter === "all" ||
      (collateralFilter === "land" && collateralValue.includes("land")) ||
      (collateralFilter === "vehicle" && collateralValue.includes("vehicle")) ||
      (collateralFilter === "commercial" && collateralValue.includes("commercial"));
    const matchesBranch = branchFilter === "all" || row.branch === branchFilter;
    return matchesStatus && matchesCollateral && matchesBranch;
  });

  function downloadCSV(filename: string, data: any[]) {
    const headers = ["Case ID", "Borrower", "Branch", "Turn Around Time", "Outstanding", "Collateral", "Status"];
    const csvRows = [headers.join(",")];
    data.forEach((r: any) => {
      const vals = [r.id, r.name, r.branch || "", r.dpd, r.outstanding, r.collateral, r.status];
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

  function downloadExcel(filename: string, data: any[]) {
    downloadCSV(filename, data);
  }

  function downloadPDF(data: any[]) {
    const w = window.open("", "_blank", "noopener,noreferrer");
    if (!w) return;
    const style = `
      <style>
        table{border-collapse:collapse;width:100%;}
        th,td{border:1px solid #ddd;padding:8px;text-align:left}
        th{background:#f4f4f4}
      </style>
    `;
    const headers = ["Case ID","Borrower","Branch","Turn Around Time","Outstanding","Collateral","Status"];
    const rowsHtml = data
      .map((r: any) => `<tr><td>${r.id}</td><td>${r.name}</td><td>${r.branch || ""}</td><td>${r.dpd}</td><td>${r.outstanding}</td><td>${r.collateral}</td><td>${r.status}</td></tr>`)
      .join("");
    w.document.write(`<html><head><title>Cases</title>${style}</head><body><h3>Case Registry Export</h3><table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rowsHtml}</tbody></table></body></html>`);
    w.document.close();
    w.print();
  }

  return (
    <AppShell searchPlaceholder="Search borrower or case ID...">
      <PageHeader
        title="Recovery Portfolio"
        subtitle="Manage and track loan recovery cases awaiting auctioneer allocation."
        actions={
          <div className="flex items-center gap-3">
            <button onClick={() => downloadExcel(`case-registry-${Date.now()}.xls`, filteredRows)} className="flex items-center gap-2 bg-primary text-on-primary px-3 py-2 rounded-lg">
              <Icon name="grid_view" /> <span>Excel</span>
            </button>
            <button onClick={() => downloadPDF(filteredRows)} className="flex items-center gap-2 bg-primary text-on-primary px-3 py-2 rounded-lg">
              <Icon name="picture_as_pdf" /> <span>PDF</span>
            </button>
            <button onClick={() => downloadCSV(`case-registry-${Date.now()}.csv`, filteredRows)} className="flex items-center gap-2 bg-primary text-on-primary px-3 py-2 rounded-lg">
              <Icon name="download" /> <span>CSV</span>
            </button>
            <button className="bg-primary text-on-primary px-xl py-3 rounded-lg flex items-center gap-2 text-title-lg hover:bg-tertiary transition-all shadow-sm active:scale-95" onClick={() => setCaseFormOpen(true)}>
              <Icon name="add_circle" />
              Register New Case
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-surface-container-lowest p-md border border-outline-variant rounded-xl">
            <div className="flex justify-between items-start">
              <span className="text-on-surface-variant text-label-bold">{kpi.label}</span>
              <Icon name={kpi.icon} className="text-primary opacity-50" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-display-lg text-primary">{kpi.value}</span>
              <span className={`text-xs font-bold ${kpi.tagClass}`}>{kpi.tag}</span>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-2">{kpi.note}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col shadow-sm">
        <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded flex items-center gap-2 text-body-sm font-medium hover:bg-surface transition-colors">
              <Icon name="filter_alt" className="text-sm" />
              All Filters
            </button>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-surface-container-lowest border border-outline-variant rounded px-4 py-2 text-body-sm font-medium focus:ring-primary focus:border-primary">
              <option>Status: All</option>
              <option>Status: Draft</option>
              <option>Status: Submitted</option>
              <option>Status: Allocated</option>
            </select>
            <select value={collateralFilter} onChange={(e) => setCollateralFilter(e.target.value)} className="bg-surface-container-lowest border border-outline-variant rounded px-4 py-2 text-body-sm font-medium focus:ring-primary focus:border-primary">
              <option>Collateral: Any</option>
              <option>Collateral: Land</option>
              <option>Collateral: Vehicle</option>
              <option>Collateral: Commercial</option>
            </select>
            <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)} className="bg-surface-container-lowest border border-outline-variant rounded px-4 py-2 text-body-sm font-medium focus:ring-primary focus:border-primary">
              <option value="all">Branch: All</option>
              <option value="Kampala Regional Branch">Branch: Kampala Regional Branch</option>
              <option value="Entebbe Head Office">Branch: Entebbe Head Office</option>
              <option value="Jinja Operations">Branch: Jinja Operations</option>
              <option value="Mbarara Center">Branch: Mbarara Center</option>
            </select>
          </div>
          <div className="text-body-sm text-on-surface-variant">
            Showing <b>25</b> of <b>142</b> cases
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>

              <tr className="bg-surface-container-high text-on-surface text-label-bold uppercase tracking-wider">
                <th className="p-md border-b border-outline-variant">Case ID</th>
                <th className="p-md border-b border-outline-variant">Borrower Details</th>
                <th className="p-md border-b border-outline-variant text-center">Turn Around Time</th>
                <th className="p-md border-b border-outline-variant text-right">Outstanding (UGX)</th>
                <th className="p-md border-b border-outline-variant">Collateral</th>

                {/* <th className="p-md border-b border-outline-variant text-center">Compliance</th> */}

                <th className="p-md border-b border-outline-variant text-center">Status</th>
                <th className="p-md border-b border-outline-variant text-center">Actions</th>
              </tr>

            </thead>
            <tbody className="text-body-sm text-on-surface">
              {filteredRows.map((row, i) => (
                <tr
                  key={row.id}
                  onClick={() => openDetails(row.id)}
                  className={`transition-colors ${row.status === "Allocated" ? "cursor-pointer hover:bg-primary-fixed/10" : ""} ${i % 2 === 1 ? "bg-surface-container-low" : ""}`}
                >
                  <td className="p-md text-mono-data text-primary font-bold">{row.case_number}</td>
                  <td className="p-md">
                    <div className="font-medium">{row.name}</div>
                    <div className="text-[11px] text-on-surface-variant">{row.branch}</div>
                    <div className="text-[11px] text-on-surface-variant">{row.idLine}</div>
                  </td>

                  <td className="p-md text-center">
                    <span className={`px-2 py-1 rounded font-bold ${row.dpdClass}`}>{row.dpd}d</span>
                  </td>

                  <td className="p-md text-right text-mono-data">{row.outstanding}</td>

                  <td className="p-md">
                    <div className="flex items-center gap-1.5">
                      <Icon name={row.collateralIcon} className="text-sm text-outline" />
                      {row.collateral}
                    </div>
                  </td>

                  {/* <td className="p-md text-center">
                    <ComplianceDots count={row.compliance} />
                  </td> */}

                  <td className="p-md text-center">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-tight ${row.statusClass}`}>
                      {row.status}
                    </span>
                  </td>

                  <td className="p-md text-center">
                    <button
                      type="button"
                      className="p-1.5 hover:bg-surface-container-highest rounded-full transition-colors text-primary"
                      onClick={(event) => {
                        event.stopPropagation();
                        openDetails(row.id);
                      }}
                      aria-label={`View details for ${row.name}`}
                    >
                      <Icon name="visibility" className="text-lg" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-md border-t border-outline-variant bg-surface-container-lowest flex justify-between items-center">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-outline-variant rounded hover:bg-surface-container transition-colors disabled:opacity-30" disabled>
              <Icon name="chevron_left" className="text-sm" />
            </button>
            <button className="px-3 py-1.5 border border-primary bg-primary text-on-primary rounded text-xs font-bold">1</button>
            <button className="px-3 py-1.5 border border-outline-variant rounded hover:bg-surface-container transition-colors text-xs font-bold">2</button>
            <button className="px-3 py-1.5 border border-outline-variant rounded hover:bg-surface-container transition-colors text-xs font-bold">3</button>
            <button className="px-3 py-1.5 border border-outline-variant rounded hover:bg-surface-container transition-colors">
              <Icon name="chevron_right" className="text-sm" />
            </button>
          </div>
          <div className="text-[11px] font-medium text-outline">LAST UPDATED: 24 OCT 2023 14:32:10 EAT</div>
        </div>
      </div>

      <div
        style={{ width: 450 }}
        className={`fixed right-0 top-16 z-40 h-[calc(100vh-4rem)] transform overflow-y-auto border-l border-outline-variant bg-surface-container-lowest shadow-2xl transition-transform duration-300 ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-lg">
          <div className="mb-lg flex items-start justify-between">
            <div>
              <h3 className="text-headline-sm text-primary">Auctioneer Details</h3>
              <p className="text-body-sm text-on-surface-variant">
                {selectedRow?.auctioneerFirm ?? (selectedRow?.status === "Allocated" ? "No auctioneer assigned" : "Not Allocated")}
              </p>
            </div>
            <button
              className="rounded-full p-2 hover:bg-surface-container"
              onClick={() => {
                setPanelOpen(false);
                setSelectedRow(null);
              }}
            >
              <Icon name="close" />
            </button>
          </div>

          <div className="space-y-xl">
            <div className="rounded-lg bg-surface-container-low p-md">
              <div className="flex items-center gap-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-on-primary">
                  {(selectedRow?.auctioneerName ?? "AU").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-label-bold text-primary">
                    {selectedRow?.auctioneerName ?? (selectedRow?.status === "Allocated" ? "No auctioneer assigned" : "Not Allocated")}
                  </p>
                  <p className="text-body-sm">
                    {selectedRow?.status === "Allocated" ? "Allocated Auctioneer" : "Not Allocated"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-md">
              <div className="rounded-lg border border-outline-variant p-md">
                <p className="text-[10px] font-bold uppercase text-outline">License ID</p>
                <p className="text-mono-data">{selectedRow?.auctioneerLicense ?? "N/A"}</p>
              </div>
              <div className="rounded-lg border border-outline-variant p-md">
                <p className="text-[10px] font-bold uppercase text-outline">Allocated On</p>
                <p className="text-mono-data">{selectedRow?.allocationDate ?? "N/A"}</p>
              </div>
            </div>

            <div className="rounded-lg border border-outline-variant p-md">
              <p className="text-[10px] font-bold uppercase text-outline">Contact</p>
              <p className="text-mono-data">{selectedRow?.auctioneerPhone ?? "N/A"}</p>
            </div>

            <div>
              <h4 className="mb-md text-label-bold text-primary">Related Case</h4>
              <div className="space-y-sm">
                <div className="flex items-center justify-between rounded-lg border border-outline-variant bg-green-50 p-3">
                  <div className="flex items-center gap-3">
                    <Icon name="check_circle" className="text-green-600" />
                    <span className="text-body-md">{selectedRow?.name ?? "Case"}</span>
                  </div>
                  <span className="text-[10px] font-bold text-green-700">ALLOCATED</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-outline-variant bg-green-50 p-3">
                  <div className="flex items-center gap-3">
                    <Icon name="check_circle" className="text-green-600" />
                    <span className="text-body-md">{selectedRow?.id ?? "Loan ID"}</span>
                  </div>
                  <span className="text-[10px] font-bold text-green-700">OPEN</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-dashed border-outline-variant p-3">
                  <div className="flex items-center gap-3">
                    <Icon name="description" className="text-outline" />
                    <span className="text-body-md">{selectedRow?.branch ?? "Branch"}</span>
                  </div>
                  <span className="text-[11px] font-bold text-primary">VIEW</span>
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

      <div className="bg-primary/5 rounded-lg border border-primary/10 p-md">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="terminal" className="text-primary text-sm" />
          <span className="text-label-bold text-primary uppercase">Recent System Activity</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-body-sm">
            <span className="text-on-surface-variant text-mono-data">
              14:28:11 - User [JMUKASA] initialized new recovery case LR-2024-0025.
            </span>
            <span className="text-[10px] text-outline font-medium uppercase">Draft Saved</span>
          </div>
          <div className="flex justify-between text-body-sm">
            <span className="text-on-surface-variant text-mono-data">
              13:15:04 - Case LR-2024-0012 allocated to auctioneer [KAMPALA ASSET RECOVERY LTD].
            </span>
            <span className="text-[10px] text-outline font-medium uppercase">Allocation Confirmed</span>
          </div>
        </div>
      </div>

      <Modal
        open={caseFormOpen}
        onClose={() => setCaseFormOpen(false)}
        title="Register New Recovery Case"
        subtitle="Enter borrower and collateral information to initiate recovery process"
        icon="description"
        tone="primary"
        size="lg"
        footer={
          <div className="flex justify-between gap-3">
            <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors" onClick={() => setCaseFormOpen(false)}>
              Cancel
            </button>
            <div className="flex gap-2">
              <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors">
                Save as Draft
              </button>
              <button className="px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md">
                Create & Submit
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
