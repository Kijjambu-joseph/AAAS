import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell, Icon } from "@/components/AppShell";
import { Modal } from "@/components/ui-kit";
import { Api } from "@/lib/api";

export const Route = createFileRoute("/admin/auctioneers")({
  component: AuctioneerPanel,
  head: () => ({
    meta: [
      { title: "Auctioneer Panel Management | AAAS System" },
      {
        name: "description",
        content:
          "Manage and allocate asset recovery cases to verified third-party auctioneer partners across Uganda.",
      },
      { property: "og:title", content: "Auctioneer Panel Management | AAAS System" },
      {
        property: "og:description",
        content:
          "Manage and allocate asset recovery cases to verified third-party auctioneer partners across Uganda.",
      },
    ],
  }),
});

function AuctioneerPanel() {
  const [addAuctioneerOpen, setAddAuctioneerOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [records, setRecords] = useState<any[]>([]);
  const [audits, setAudits] = useState<any[]>([]);
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [licenseFilter, setLicenseFilter] = useState("Any Status");
  const [capacityFilter, setCapacityFilter] = useState("Show All");
  const [selectedAuctioneer, setSelectedAuctioneer] = useState<any>(null);
  const [performanceModalOpen, setPerformanceModalOpen] = useState(false);
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [workloadModalOpen, setWorkloadModalOpen] = useState(false);
  const [suspendReason, setSuspendReason] = useState("");
  const [newWorkload, setNewWorkload] = useState({ current: 0, max: 15 });
  const [actions, setActions] = useState<any>(null);
  const [form, setForm] = useState<any>({ company_name: "", license_number: "", ura_registration: "", license_expiry: "", contact_person: "", email: "", phone_number: "", regions: [] as string[], maximum_caseload: "15", license_document: null as File | null });
  useEffect(() => { Promise.all([Api.get("/api/auctioneers/?ordering=company_name"), Api.get("/api/audit-logs/?ordering=-created_at")]).then(([data, logs]: any[]) => { setRecords(Array.isArray(data) ? data : data.results ?? []); setAudits(Array.isArray(logs) ? logs : logs.results ?? []); }); }, []);
  const auctioneers = useMemo(() => records.map((item) => {
    const days = Math.ceil((new Date(item.license_expiry).getTime() - Date.now()) / 86400000);
    const status = !item.status || days < 0 ? "Expired" : days <= 30 ? "Expiring Soon" : "Valid";
    const regions = item.regions?.length ? item.regions : [item.region];
    const max = Number(item.maximum_caseload || 15);
    return { ...item, name: item.company_name, license: item.license_number, status, statusClass: status === "Valid" ? "bg-green-100 text-green-800" : status === "Expired" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800", expiry: new Date(item.license_expiry).toLocaleDateString(), expiryClass: status === "Expired" ? "text-error" : status === "Expiring Soon" ? "text-secondary font-bold" : "", region: regions.join(", "), workload: `${item.current_workload} / ${max}`, workloadPct: Math.min(100, Math.round(Number(item.current_workload || 0) / max * 100)), workloadColor: Number(item.current_workload || 0) >= max ? "bg-secondary" : "bg-primary", leadTime: "Not recorded", success: "Not recorded", successClass: "text-on-surface-variant" };
  }).filter((item) => (regionFilter === "All Regions" || item.region.includes(regionFilter)) && (licenseFilter === "Any Status" || item.status === licenseFilter) && (capacityFilter === "Show All" || (capacityFilter === "Has Capacity" ? Number(item.current_workload) < Number(item.maximum_caseload) : Number(item.current_workload) >= Number(item.maximum_caseload)))), [records, regionFilter, licenseFilter, capacityFilter]);
  
  async function registerAuctioneer() { const payload = new FormData(); Object.entries(form).forEach(([key, value]) => { if (key === "regions") payload.append(key, JSON.stringify(value)); else if (key === "license_document") { if (value) payload.append(key, value as File); } else payload.append(key, String(value)); }); payload.append("region", form.regions[0] || "Central"); payload.append("current_workload", "0"); payload.append("office_address", ""); payload.append("status", "true"); const created = await Api.post("/api/auctioneers/", payload); setRecords([...records, created]); setAddAuctioneerOpen(false); }

  async function viewPerformance(auctioneer: any) {
    setSelectedAuctioneer(auctioneer);
    try {
      const perf = await Api.get(`/api/auctioneers/${auctioneer.id}/performance/`);
      setActions(perf);
      setPerformanceModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch performance metrics:", err);
    }
  }

  async function openSuspendDialog(auctioneer: any) {
    setSelectedAuctioneer(auctioneer);
    setSuspendReason("");
    setSuspendModalOpen(true);
  }

  async function handleSuspend() {
    if (!selectedAuctioneer) return;
    try {
      await Api.post(`/api/auctioneers/${selectedAuctioneer.id}/suspend/`, { reason: suspendReason });
      setRecords(records.map(a => a.id === selectedAuctioneer.id ? { ...a, is_active: false } : a));
      setSuspendModalOpen(false);
      alert(`${selectedAuctioneer.company_name} has been suspended`);
    } catch (err) {
      alert(`Error suspending auctioneer: ${err}`);
    }
  }

  async function handleActivate(auctioneer: any) {
    try {
      await Api.post(`/api/auctioneers/${auctioneer.id}/activate/`, {});
      setRecords(records.map(a => a.id === auctioneer.id ? { ...a, is_active: true } : a));
      alert(`${auctioneer.company_name} has been activated`);
    } catch (err) {
      alert(`Error activating auctioneer: ${err}`);
    }
  }

  async function openWorkloadDialog(auctioneer: any) {
    setSelectedAuctioneer(auctioneer);
    setNewWorkload({ current: auctioneer.current_workload, max: auctioneer.maximum_caseload });
    setWorkloadModalOpen(true);
  }

  async function handleWorkloadUpdate() {
    if (!selectedAuctioneer) return;
    try {
      const updated = await Api.post(`/api/auctioneers/${selectedAuctioneer.id}/update-workload/`, { 
        current_workload: newWorkload.current, 
        maximum_caseload: newWorkload.max 
      });
      setRecords(records.map(a => a.id === selectedAuctioneer.id ? { ...a, current_workload: newWorkload.current, maximum_caseload: newWorkload.max } : a));
      setWorkloadModalOpen(false);
      alert("Workload updated successfully");
    } catch (err) {
      alert(`Error updating workload: ${err}`);
    }
  }

  return (
    <AppShell searchPlaceholder="Search by Firm Name or License...">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-headline-md text-primary">Licensed Auctioneer Directory</h3>
          <p className="mt-1 text-body-md text-on-surface-variant">
            Manage and allocate asset recovery cases to verified third-party partners.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-label-bold text-primary transition-colors hover:bg-surface-container-low" onClick={() => setImportOpen(true)}>
            <Icon name="upload_file" className="text-[18px]" />
            Import Auctioneers
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-label-bold text-primary transition-colors hover:bg-surface-container-low" onClick={() => setExportOpen(true)}>
            <Icon name="download" className="text-[18px]" />
            Export Directory
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-label-bold text-on-primary transition-opacity hover:opacity-90" onClick={() => setAddAuctioneerOpen(true)}>
            <Icon name="add" className="text-[18px]" />
            Add Auctioneer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-md md:grid-cols-4">
        <div className="flex flex-col gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest p-md">
          <span className="text-label-bold uppercase text-on-surface-variant">Total Partners</span>
          <div className="flex items-baseline gap-2">
            <span className="text-display-lg text-primary">{records.length}</span>
            <span className="text-xs font-bold text-green-600">Live records</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest p-md">
          <span className="text-label-bold uppercase text-on-surface-variant">Avg. Success Rate</span>
          <div className="flex items-baseline gap-2">
            <span className="text-display-lg text-primary">Not recorded</span>
            <span className="text-xs font-bold text-on-surface-variant">Not stored in the database</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest p-md">
          <span className="text-label-bold uppercase text-on-surface-variant">Active Cases</span>
          <div className="flex items-baseline gap-2">
            <span className="text-display-lg text-primary">{records.reduce((sum, item) => sum + Number(item.current_workload || 0), 0)}</span>
            <span className="text-xs font-bold text-secondary">Current workload</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest p-md">
          <span className="text-label-bold uppercase text-on-surface-variant">Avg. Lead Time</span>
          <div className="flex items-baseline gap-2">
            <span className="text-display-lg text-primary">Not recorded</span>
            <span className="text-xs font-bold text-on-surface-variant">Not stored in the database</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest">
        <div className="flex flex-wrap items-center gap-lg border-b border-outline-variant bg-surface-container-low/50 p-4">
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-[10px] font-bold uppercase text-on-surface-variant">
              Region Coverage
            </label>
            <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)} className="min-w-[160px] rounded border-outline-variant bg-surface-container-lowest px-3 py-1 text-body-sm">
              <option>All Regions</option>
              <option>Central</option><option>Western</option><option>Northern</option><option>Eastern</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-[10px] font-bold uppercase text-on-surface-variant">
              License Status
            </label>
            <select value={licenseFilter} onChange={(e) => setLicenseFilter(e.target.value)} className="min-w-[160px] rounded border-outline-variant bg-surface-container-lowest px-3 py-1 text-body-sm">
              <option>Any Status</option>
              <option>Valid</option>
              <option>Expiring Soon</option>
              <option>Expired</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-[10px] font-bold uppercase text-on-surface-variant">
              Capacity
            </label>
            <select value={capacityFilter} onChange={(e) => setCapacityFilter(e.target.value)} className="min-w-[160px] rounded border-outline-variant bg-surface-container-lowest px-3 py-1 text-body-sm">
              <option>Show All</option>
              <option>Has Capacity</option>
              <option>At Limit</option>
            </select>
          </div>
          <button onClick={() => { setRegionFilter("All Regions"); setLicenseFilter("Any Status"); setCapacityFilter("Show All"); }} className="mt-4 flex items-center gap-1 text-label-bold text-primary hover:underline">
            Reset Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-surface-container text-label-bold uppercase tracking-wider text-on-surface-variant">
                <th className="border-b border-outline-variant px-6 py-4">Firm Name / License</th>
                <th className="border-b border-outline-variant px-6 py-4">Status</th>
                <th className="border-b border-outline-variant px-6 py-4">Expiry Date</th>
                <th className="border-b border-outline-variant px-6 py-4 text-center">Region</th>
                <th className="border-b border-outline-variant px-6 py-4 text-center">Workload</th>
                <th className="border-b border-outline-variant px-6 py-4 text-right">Lead Time</th>
                <th className="border-b border-outline-variant px-6 py-4 text-right">Success</th>
                <th className="border-b border-outline-variant px-6 py-4" />
              </tr>
            </thead>
            <tbody className="text-body-sm">
              {auctioneers.map((a) => (
                <tr
                  key={a.license}
                  className="group transition-colors odd:bg-surface-container-lowest even:bg-surface-container-low/40 hover:bg-surface-container-low"
                >
                  <td className="border-b border-outline-variant px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-primary">{a.name}</span>
                      <span className="text-[11px] font-medium text-on-surface-variant">
                        {a.license}
                      </span>
                    </div>
                  </td>
                  <td className="border-b border-outline-variant px-6 py-4">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold uppercase ${a.statusClass}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className={`border-b border-outline-variant px-6 py-4 text-mono-data ${a.expiryClass}`}>
                    {a.expiry}
                  </td>
                  <td className="border-b border-outline-variant px-6 py-4 text-center">{a.region}</td>
                  <td className="border-b border-outline-variant px-6 py-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`font-bold ${a.workloadPct === 0 ? "text-error" : ""}`}>
                        {a.workload}
                      </span>
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-container">
                        <div
                          className={`h-full ${a.workloadColor}`}
                          style={{ width: `${a.workloadPct}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-outline-variant px-6 py-4 text-right text-mono-data">
                    {a.leadTime}
                  </td>
                  <td className={`border-b border-outline-variant px-6 py-4 text-right font-bold ${a.successClass}`}>
                    {a.success}
                  </td>
                  <td className="border-b border-outline-variant px-6 py-4 text-right">
                    <div className="flex flex-wrap justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => viewPerformance(a)}
                        className="rounded-lg border border-outline-variant px-3 py-2 text-[11px] font-bold text-primary hover:bg-surface-container-lowest"
                      >
                        Metrics
                      </button>
                      {a.is_active ? (
                        <button
                          type="button"
                          onClick={() => openSuspendDialog(a)}
                          className="rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-[11px] font-bold text-error hover:bg-error/20"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleActivate(a)}
                          className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-[11px] font-bold text-primary hover:bg-primary/20"
                        >
                          Activate
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => openWorkloadDialog(a)}
                        className="rounded-lg border border-outline-variant px-3 py-2 text-[11px] font-bold text-primary hover:bg-surface-container-lowest"
                      >
                        Workload
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between bg-surface-container-lowest p-4">
          <span className="text-body-sm text-on-surface-variant">Showing {auctioneers.length} of {records.length} auctioneers</span>
          <div className="flex gap-2">
            <button
              disabled
              className="rounded border border-outline-variant p-2 transition-colors hover:bg-surface-container disabled:opacity-50"
            >
              <Icon name="chevron_left" className="text-sm" />
            </button>
            <button className="rounded bg-primary px-3 py-1 text-label-bold text-on-primary">1</button>
            <button className="rounded border border-outline-variant px-3 py-1 text-label-bold text-on-surface-variant hover:bg-surface-container">
              2
            </button>
            <button className="rounded border border-outline-variant px-3 py-1 text-label-bold text-on-surface-variant hover:bg-surface-container">
              3
            </button>
            <button className="rounded border border-outline-variant p-2 transition-colors hover:bg-surface-container">
              <Icon name="chevron_right" className="text-sm" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-3">
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h4 className="text-title-lg text-primary">Regional Workload Distribution</h4>
            <span className="text-xs font-medium text-on-surface-variant">Live database workload</span>
          </div>
          <div className="relative flex h-64 items-center justify-center overflow-hidden rounded bg-surface-container-low">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(#00A0DF 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative z-10 grid h-full w-full grid-cols-4 gap-4 p-4">
              {["Central", "Western", "Eastern", "Northern"].map((area) => { const count = records.filter((item) => (item.regions?.length ? item.regions : [item.region]).includes(area)).reduce((sum, item) => sum + Number(item.current_workload || 0), 0); const max = Math.max(...records.map((item) => Number(item.current_workload || 0)), 1); return <div key={area} className="mt-auto flex items-end rounded border border-primary/40 bg-primary/20 p-2" style={{ height: `${Math.max(15, count / max * 100)}%` }}><span className="text-[10px] font-bold text-primary">{area.toUpperCase()}: {count} Cases</span></div>; })}
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col rounded-lg border border-outline-variant bg-surface-container-lowest p-lg">
          <h4 className="mb-4 text-title-lg text-primary">Recent Audit Actions</h4>
          <div className="flex-grow space-y-4 overflow-y-auto">
            {audits.filter((item) => item.model_name === "auctioneer").slice(0, 3).map((item) => <div key={item.id} className="flex gap-3 border-b border-outline-variant/30 pb-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-surface-container">
                <Icon name="person_add" className="text-[16px]" />
              </div>
              <div>
                <p className="text-body-sm font-bold leading-tight text-primary">{item.action}</p>
                <p className="mt-0.5 text-[11px] text-on-surface-variant">{item.description}</p>
                <span className="text-[10px] font-medium text-on-surface-variant opacity-60">
                  {new Date(item.created_at).toLocaleString()} • {item.user_name}
                </span>
              </div>
            </div>)}
          </div>
        </div>
      </div>

      <div className="fixed bottom-xl right-xl z-50">
        <button className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container shadow-lg transition-transform hover:scale-105 active:scale-95">
          <Icon name="assignment_add" className="text-2xl" />
          <span className="absolute right-full mr-4 whitespace-nowrap rounded bg-primary px-3 py-1.5 text-xs text-on-primary opacity-0 transition-opacity group-hover:opacity-100">
            Quick Case Allocation
          </span>
        </button>
      </div>

      <Modal
        open={addAuctioneerOpen}
        onClose={() => setAddAuctioneerOpen(false)}
        title="Add New Auctioneer"
        subtitle="Register a new auctioneer partner firm to the panel"
        icon="business"
        tone="primary"
        size="lg"
        footer={
          <div className="flex justify-between gap-3">
            <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors" onClick={() => setAddAuctioneerOpen(false)}>
              Cancel
            </button>
            <div className="flex gap-2">
              <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors">
                Save Draft
              </button>
              <button onClick={registerAuctioneer} className="px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md">
                Register Auctioneer
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Firm Legal Name</label>
            <input value={form.company_name} onChange={(e) => setForm({...form, company_name:e.target.value})} type="text" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Registered business name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-label-bold text-on-surface block mb-2">License Number</label>
              <input value={form.license_number} onChange={(e) => setForm({...form, license_number:e.target.value})} type="text" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g., LIC-UG-2024-0012" />
            </div>
            <div>
              <label className="text-label-bold text-on-surface block mb-2">URA Registration</label>
              <input value={form.ura_registration} onChange={(e) => setForm({...form, ura_registration:e.target.value})} type="text" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="URA number" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-label-bold text-on-surface block mb-2">License Expiry Date</label>
              <input value={form.license_expiry} onChange={(e) => setForm({...form, license_expiry:e.target.value})} type="date" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" />
            </div>
            <div>
              <label className="text-label-bold text-on-surface block mb-2">Primary Contact Person</label>
              <input value={form.contact_person} onChange={(e) => setForm({...form, contact_person:e.target.value})} type="text" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Full name" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-label-bold text-on-surface block mb-2">Contact Email</label>
              <input value={form.email} onChange={(e) => setForm({...form, email:e.target.value})} type="email" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="email@firm.com" />
            </div>
            <div>
              <label className="text-label-bold text-on-surface block mb-2">Contact Phone</label>
              <input value={form.phone_number} onChange={(e) => setForm({...form, phone_number:e.target.value})} type="tel" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="+256..." />
            </div>
          </div>
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Region Coverage (Select All Applicable)</label>
            <div className="grid grid-cols-2 gap-2">
              {["Central Region", "Western Region", "Northern Region", "Eastern Region"].map((region) => (
                <label key={region} className="flex items-center gap-2 cursor-pointer">
                  <input checked={form.regions.includes(region.replace(" Region", ""))} onChange={(e) => { const value = region.replace(" Region", ""); setForm({...form, regions:e.target.checked ? [...form.regions, value] : form.regions.filter((item:string) => item !== value)}); }} type="checkbox" className="rounded border-outline-variant" />
                  <span className="text-body-sm text-on-surface">{region}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Maximum Caseload Capacity</label>
            <input value={form.maximum_caseload} onChange={(e) => setForm({...form, maximum_caseload:e.target.value})} type="number" className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g., 15" min="1" />
          </div>
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Upload License Document</label>
            <label className="block border-2 border-dashed border-outline-variant rounded-lg p-6 text-center hover:bg-primary/5 transition-colors cursor-pointer">
              <Icon name="cloud_upload" className="mx-auto text-2xl text-primary mb-2" />
              <p className="text-body-sm text-on-surface-variant">Click to upload or drag and drop</p>
              <p className="text-[10px] text-outline mt-1">PDF, JPG or PNG (max. 5MB)</p><input onChange={(e) => setForm({...form, license_document:e.target.files?.[0] ?? null})} type="file" accept=".pdf,.jpg,.jpeg,.png" className="sr-only" />
            </label>
          </div>
        </div>
      </Modal>

      <Modal
        open={importOpen}
        onClose={() => setImportOpen(false)}
        title="Import Auctioneer Firms"
        subtitle="Upload one or more firm data files and bring structured auctioneer records into the panel."
        icon="upload_file"
        tone="secondary"
        size="lg"
        footer={
          <div className="flex justify-between gap-3">
            <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors" onClick={() => setImportOpen(false)}>
              Cancel
            </button>
            <div className="flex gap-2">
              <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors">
                Review File
              </button>
              <button className="px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md">
                Import Now
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="rounded-lg border border-outline-variant bg-surface-container-low p-4">
            <p className="text-body-sm text-on-surface-variant">
              Multiple uploads are supported. Accepted formats: CSV, XLSX, JSON.
            </p>
            <p className="text-[10px] text-outline mt-2">
              Files are validated against existing license numbers and merged into the active auctioneer directory.
            </p>
          </div>
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Select files to import</label>
            <input type="file" multiple accept=".csv,.xlsx,.json" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-label-bold text-on-surface mb-2">Import strategy</p>
              <label className="flex items-center gap-2 text-body-sm">
                <input type="radio" name="importMode" defaultChecked className="h-4 w-4 text-primary" />
                <span>Merge with existing records</span>
              </label>
              <label className="flex items-center gap-2 text-body-sm mt-2">
                <input type="radio" name="importMode" className="h-4 w-4 text-primary" />
                <span>Create new records only</span>
              </label>
            </div>
            <div>
              <p className="text-label-bold text-on-surface mb-2">Validation options</p>
              <label className="flex items-center gap-2 text-body-sm">
                <input type="checkbox" className="h-4 w-4 text-primary" />
                <span>Skip rows with invalid data</span>
              </label>
              <label className="flex items-center gap-2 text-body-sm mt-2">
                <input type="checkbox" className="h-4 w-4 text-primary" />
                <span>Send summary to compliance inbox</span>
              </label>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        title="Export Auctioneer Directory"
        subtitle="Download the current auctioneer roster or filtered selection for external reporting."
        icon="download"
        tone="primary"
        size="lg"
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
                Export CSV
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <p className="text-body-sm text-on-surface-variant mb-3">
              Select the export scope and file type for the auctioneer panel data.
            </p>
            <div className="grid gap-3">
              <label className="flex items-center gap-3 rounded-lg border border-outline-variant p-3">
                <input type="radio" name="exportScope" defaultChecked className="h-4 w-4 text-primary" />
                <span className="text-body-sm">Current view</span>
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-outline-variant p-3">
                <input type="radio" name="exportScope" className="h-4 w-4 text-primary" />
                <span className="text-body-sm">Full directory</span>
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-outline-variant p-3">
                <input type="radio" name="exportScope" className="h-4 w-4 text-primary" />
                <span className="text-body-sm">Compliance audit package</span>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { label: "CSV", value: "csv" },
              { label: "XLSX", value: "xlsx" },
              { label: "PDF", value: "pdf" },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2 rounded-lg border border-outline-variant p-3 cursor-pointer">
                <input type="radio" name="exportType" value={option.value} className="h-4 w-4 text-primary" />
                <span className="text-body-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </Modal>

      <Modal
        open={performanceModalOpen}
        onClose={() => setPerformanceModalOpen(false)}
        title="Auctioneer Performance Metrics"
        subtitle={selectedAuctioneer ? `Metrics for ${selectedAuctioneer.company_name}` : ""}
        icon="insights"
        tone="secondary"
        size="md"
        footer={
          <button className="px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors" onClick={() => setPerformanceModalOpen(false)}>
            Close
          </button>
        }
      >
        {actions ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-label-bold text-on-surface-variant">Total Allocations</span>
                <p className="text-body-lg text-primary">{actions.total_allocations}</p>
              </div>
              <div>
                <span className="text-label-bold text-on-surface-variant">Workload</span>
                <p className="text-body-lg text-primary">{actions.current_workload} / {actions.maximum_caseload}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-label-bold text-on-surface-variant">Completion Rate</span>
                <p className="text-body-lg text-primary">{actions.completion_rate}%</p>
              </div>
              <div>
                <span className="text-label-bold text-on-surface-variant">Pending Allocations</span>
                <p className="text-body-lg text-primary">{actions.pending}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-label-bold text-on-surface-variant">Completed</span>
                <p className="text-body-lg text-primary">{actions.completed}</p>
              </div>
              <div>
                <span className="text-label-bold text-on-surface-variant">In Progress</span>
                <p className="text-body-lg text-primary">{actions.in_progress}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-body-md text-on-surface-variant">Loading performance metrics...</p>
        )}
      </Modal>

      <Modal
        open={suspendModalOpen}
        onClose={() => setSuspendModalOpen(false)}
        title="Suspend Auctioneer"
        subtitle={selectedAuctioneer ? `Suspend ${selectedAuctioneer.company_name}` : ""}
        icon="pause_circle"
        tone="error"
        size="sm"
        footer={
          <div className="flex justify-end gap-3">
            <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors" onClick={() => setSuspendModalOpen(false)}>
              Cancel
            </button>
            <button className="px-md py-2 bg-error text-on-error rounded-lg text-label-bold hover:bg-error/90 transition-colors" onClick={handleSuspend}>
              Suspend
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-body-sm text-on-surface-variant">
            Suspending an auctioneer will prevent them from receiving new auto-allocations until reactivated.
          </p>
          <label className="text-label-bold text-on-surface block">Reason</label>
          <textarea
            value={suspendReason}
            onChange={(e) => setSuspendReason(e.target.value)}
            className="w-full min-h-[120px] rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-body-md focus:ring-2 focus:ring-error/50 focus:border-transparent"
            placeholder="Enter a reason for suspension"
          />
        </div>
      </Modal>

      <Modal
        open={workloadModalOpen}
        onClose={() => setWorkloadModalOpen(false)}
        title="Update Workload"
        subtitle={selectedAuctioneer ? `Adjust capacity for ${selectedAuctioneer.company_name}` : ""}
        icon="bar_chart"
        tone="primary"
        size="sm"
        footer={
          <div className="flex justify-end gap-3">
            <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors" onClick={() => setWorkloadModalOpen(false)}>
              Cancel
            </button>
            <button className="px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors" onClick={handleWorkloadUpdate}>
              Save
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Current Workload</label>
            <input
              value={newWorkload.current}
              onChange={(e) => setNewWorkload({ ...newWorkload, current: Number(e.target.value) })}
              type="number"
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-label-bold text-on-surface block mb-2">Maximum Caseload</label>
            <input
              value={newWorkload.max}
              onChange={(e) => setNewWorkload({ ...newWorkload, max: Number(e.target.value) })}
              type="number"
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}
