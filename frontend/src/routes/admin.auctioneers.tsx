import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button, Modal } from "@/components/ui-kit";
import { Api } from "@/lib/api";

export const Route = createFileRoute("/admin/auctioneers")({ component: AuctioneerPanel });
const list = (value: any) => Array.isArray(value) ? value : value?.results ?? [];

const emptyForm = {
  company_name: "", contact_person: "", phone_number: "", email: "", license_number: "",
  license_expiry: "", region: "Central", office_address: "", current_workload: 0, status: true,
};

function AuctioneerPanel() {
  const [items, setItems] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const load = () => Api.get("/api/auctioneers/?ordering=company_name").then((value) => setItems(list(value)));
  useEffect(() => { load(); }, []);
  const shown = items.filter((item) => `${item.company_name} ${item.license_number} ${item.region}`.toLowerCase().includes(query.toLowerCase()));
  const expiring = items.filter((item) => new Date(item.license_expiry).getTime() - Date.now() < 30 * 86_400_000).length;

  async function saveAuctioneer() {
    setSaving(true);
    try {
      await Api.post("/api/auctioneers/", form);
      setForm(emptyForm);
      setFormOpen(false);
      await load();
    } finally { setSaving(false); }
  }

  function exportRows() {
    return shown.map((item) => [item.company_name, item.contact_person, item.license_number, item.region, item.license_expiry, item.current_workload, item.status ? "Active" : "Inactive"]);
  }
  function exportCsv(extension = "csv") {
    const rows = [["Firm", "Contact", "Licence", "Region", "Licence expiry", "Workload", "Status"], ...exportRows()];
    const content = rows.map((row) => row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([content], { type: "text/csv;charset=utf-8" }));
    link.download = `auctioneers-${new Date().toISOString().slice(0, 10)}.${extension}`;
    link.click();
    URL.revokeObjectURL(link.href);
  }
  function exportPdf() {
    const popup = window.open("", "_blank", "noopener,noreferrer");
    if (!popup) return;
    const rows = exportRows().map((row) => `<tr>${row.map((value) => `<td>${String(value ?? "")}</td>`).join("")}</tr>`).join("");
    popup.document.write(`<html><head><title>Auctioneer directory</title><style>table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background:#eee}</style></head><body><h1>Auctioneer Directory</h1><table><thead><tr><th>Firm</th><th>Contact</th><th>Licence</th><th>Region</th><th>Licence expiry</th><th>Workload</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></body></html>`);
    popup.document.close(); popup.print();
  }

  return <AppShell searchPlaceholder="Search by firm name or licence...">
    <div className="flex flex-wrap items-start justify-between gap-md"><div><h1 className="text-headline-md text-primary">Licensed Auctioneer Directory</h1><p className="text-on-surface-variant">Live partner records from the AAAS database.</p></div><div className="flex flex-wrap gap-sm"><Button variant="outline" icon="table_view" onClick={() => exportCsv("xls")}>Excel</Button><Button variant="outline" icon="picture_as_pdf" onClick={exportPdf}>PDF</Button><Button variant="outline" icon="download" onClick={() => exportCsv("csv")}>CSV</Button><Button icon="add" onClick={() => setFormOpen(true)}>Add auctioneer</Button></div></div>
    <div className="mt-lg grid grid-cols-1 gap-md md:grid-cols-4"><Stat label="Total partners" value={items.length}/><Stat label="Active partners" value={items.filter((item) => item.status).length}/><Stat label="Active cases" value={items.reduce((sum, item) => sum + Number(item.current_workload || 0), 0)}/><Stat label="Licence alerts" value={expiring}/></div>
    <section className="mt-lg overflow-hidden rounded-xl border border-outline-variant"><div className="p-md"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search firm, licence, or region" className="w-full rounded border p-2"/></div><table className="w-full text-left"><thead className="bg-surface-container"><tr><th className="p-md">FIRM</th><th>LICENCE</th><th>REGION</th><th>EXPIRY</th><th>WORKLOAD</th><th>STATUS</th></tr></thead><tbody>{shown.map((item) => { const expired = new Date(item.license_expiry) < new Date(); return <tr className="border-t" key={item.id}><td className="p-md font-bold">{item.company_name}<div className="text-xs text-on-surface-variant">{item.contact_person}</div></td><td>{item.license_number}</td><td>{item.region}</td><td>{new Date(item.license_expiry).toLocaleDateString()}</td><td>{item.current_workload}</td><td className={item.status && !expired ? "text-secondary" : "text-error"}>{item.status && !expired ? "Active" : "Unavailable"}</td></tr>; })}{!shown.length ? <tr><td colSpan={6} className="p-lg text-center">No auctioneers found.</td></tr> : null}</tbody></table></section>
    <Modal open={formOpen} onClose={() => setFormOpen(false)} title="Add auctioneer" subtitle="Create a new panel partner." icon="gavel" footer={<><Button variant="outline" onClick={() => setFormOpen(false)}>Cancel</Button><Button disabled={saving} onClick={saveAuctioneer}>{saving ? "Saving..." : "Save auctioneer"}</Button></>}><div className="grid grid-cols-1 gap-md sm:grid-cols-2">{(["company_name", "contact_person", "phone_number", "email", "license_number", "license_expiry", "office_address"] as const).map((field) => <label key={field} className={field === "office_address" ? "sm:col-span-2" : ""}><span className="text-label-bold capitalize">{field.replaceAll("_", " ")}</span><input required type={field === "license_expiry" ? "date" : field === "email" ? "email" : "text"} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="mt-1 w-full rounded border p-2"/></label>)}<label><span className="text-label-bold">Region</span><select value={form.region} onChange={(event) => setForm({ ...form, region: event.target.value })} className="mt-1 w-full rounded border p-2">{["Central", "Eastern", "Northern", "Western"].map((region) => <option key={region}>{region}</option>)}</select></label></div></Modal>
  </AppShell>;
}
function Stat({ label, value }: { label: string; value: number }) { return <div className="rounded-xl border p-md"><p className="text-label-bold uppercase">{label}</p><p className="text-display-lg text-primary">{value}</p></div>; }
