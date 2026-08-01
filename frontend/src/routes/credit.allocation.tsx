import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Icon } from "@/components/AppShell";
import { Button, EmptyRow, Toolbar, useSearchFilter } from "@/components/ui-kit";
import { EnforcementStatusBadge } from "@/components/EnforcementStatusBadge";
import { DryRunPreviewModal } from "@/components/DryRunPreviewModal";
import { allocateCase } from "@/lib/allocation-engine";
import { Api } from "@/lib/api";

export const Route = createFileRoute("/credit/allocation")({ component: AllocationEngine });
const list = (value: any) => Array.isArray(value) ? value : value?.results ?? [];
const UGX = new Intl.NumberFormat("en-UG", { style: "currency", currency: "UGX", maximumFractionDigits: 0 });

function AllocationEngine() {
  const [cases, setCases] = useState<any[]>([]);
  const [auctioneers, setAuctioneers] = useState<any[]>([]);
  const [allocations, setAllocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeCaseId, setActiveCaseId] = useState<number | null>(null);
  const [activeAuctioneerId, setActiveAuctioneerId] = useState<number | null>(null);
  const [autoAllocated, setAutoAllocated] = useState(false);

  const refresh = () => Promise.all([Api.get("/api/cases/?ordering=-created_at"), Api.get("/api/auctioneers/?ordering=current_workload"), Api.get("/api/allocations/?ordering=-allocated_at")])
    .then(([caseData, auctioneerData, allocationData]) => { setCases(list(caseData)); setAuctioneers(list(auctioneerData)); setAllocations(list(allocationData)); })
    .finally(() => setLoading(false));
  useEffect(() => { refresh(); }, []);

  useEffect(() => {
    if (loading || autoAllocated || !cases.length) return;
    const pendingCount = cases.filter((item) => item.status === "Pending").length;
    if (!pendingCount) return;

    const runAutoAllocation = async () => {
      try {
        await Api.post("/api/cases/auto-allocate-pending/");
        setAutoAllocated(true);
        await refresh();
      } catch {
        setAutoAllocated(true);
      }
    };

    runAutoAllocation();
  }, [loading, autoAllocated, cases]);

  const queue = useMemo(() => cases.filter((item) => item.status === "Pending").map((item) => ({
    id: item.id, caseNumber: item.case_number, priority: item.priority, status: "Pending allocation", createdAt: item.created_at,
    region: item.branch?.region ?? "Unknown", valuation: Number(item.outstanding_balance || 0),
  })), [cases]);
  const queueFilter = useSearchFilter(queue, ["caseNumber", "priority", "status", "region"], "priority");
  const eligible = auctioneers.filter((item) => item.status && new Date(item.license_expiry) >= new Date());
  const exceptions = queue.filter((item) => !eligible.some((auctioneer) => auctioneer.region === item.region));
  const candidateRanking = eligible.slice().sort((a, b) => Number(a.current_workload || 0) - Number(b.current_workload || 0)).slice(0, 3);
  const regionalLoads = Array.from(new Set(cases.map((item) => item.branch?.region).filter(Boolean))).map((region) => ({ region, value: cases.filter((item) => item.branch?.region === region && !["Recovered", "Closed", "Cancelled"].includes(item.status)).length }));
  const maxLoad = Math.max(...regionalLoads.map((item) => item.value), 1);

  async function allocate(caseId: number) {
    const recoveryCase = cases.find((item) => item.id === caseId);
    const auctioneer = eligible.filter((item) => item.region === recoveryCase?.branch?.region).sort((a, b) => Number(a.current_workload || 0) - Number(b.current_workload || 0))[0];
    setActiveCaseId(caseId);
    setActiveAuctioneerId(auctioneer?.id ?? null);
    setPreviewOpen(true);
  }

  async function commitAllocation(caseId: number) {
    const result = await allocateCase(caseId, "automatic", activeAuctioneerId ?? undefined, false);
    if (!result.success && result.enforcement_blocked) {
      return;
    }
    await refresh();
  }

  return <AppShell><div className="space-y-lg">
    <div className="flex items-center gap-md"><h1 className="text-title-lg text-primary">Allocation Queue &amp; Engine Monitor</h1><span className="rounded-full bg-secondary-container px-sm py-1 text-[10px] font-semibold text-secondary">LIVE DATA</span></div>
    <div className="grid grid-cols-1 gap-md md:grid-cols-4">
      <Stat label="Active queue" value={queue.length} note="Pending recovery cases" icon="queue" />
      <Stat label="Manual exceptions" value={exceptions.length} note="No eligible regional partner" icon="warning" error />
      <Stat label="Eligible partners" value={eligible.length} note="Active and licence-valid" icon="verified" />
      <Stat label="Recent allocations" value={allocations.length} note="Recorded allocation history" icon="assignment_turned_in" />
    </div>
    <div className="grid grid-cols-1 gap-lg xl:grid-cols-12">
      <div className="space-y-lg xl:col-span-8">
        <section className="rounded-lg bg-primary-container p-lg text-on-primary"><h2 className="text-headline-sm">Auto-allocation queue</h2><p className="mt-xs text-body-sm opacity-85">Candidates are ranked from the live panel by current caseload. A case is only assigned to an active, licence-valid partner in its branch region.</p></section>
        <div className="flex items-center justify-between gap-sm rounded-lg border border-outline-variant bg-surface-container-lowest px-lg py-md">
          <div>
            <p className="text-title-sm text-primary">Automatic allocation</p>
            <p className="text-body-sm text-on-surface-variant">Pending cases are sent through the engine on load and via the button below.</p>
          </div>
          <Button onClick={async () => {
            await Api.post("/api/cases/auto-allocate-pending/");
            await refresh();
          }}>
            Run auto allocation
          </Button>
        </div>
        {queue[0] ? (
          <section className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg">
            <div className="flex flex-wrap items-center justify-between gap-sm">
              <div>
                <h2 className="text-title-lg text-primary">Enforcement status</h2>
                <p className="text-body-sm text-on-surface-variant">Automatic allocation is enforced by case priority and policy.</p>
              </div>
              <EnforcementStatusBadge caseId={queue[0].id} />
            </div>
          </section>
        ) : null}
        <section className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest"><div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-low px-lg py-md"><h2 className="text-title-lg">Recommended panel</h2><span className="text-body-sm text-on-surface-variant">Lowest current caseload</span></div><div className="divide-y divide-outline-variant">
          {candidateRanking.map((item, index) => <div className="flex items-center justify-between px-lg py-md" key={item.id}><div className="flex items-center gap-sm"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] text-on-primary">{index + 1}</span><div><p className="font-bold text-primary">{item.company_name}</p><p className="text-[11px] text-on-surface-variant">{item.region} · licence expires {new Date(item.license_expiry).toLocaleDateString()}</p></div></div><span className="text-mono-data text-primary">{item.current_workload} cases</span></div>)}
          {!loading && !candidateRanking.length ? <p className="p-lg text-body-sm text-on-surface-variant">No eligible auctioneers are available.</p> : null}
        </div></section>
        <section className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest"><div className="border-b border-outline-variant px-lg py-md"><h2 className="text-title-lg">Current processing queue</h2><Toolbar query={queueFilter.query} onQuery={queueFilter.setQuery} filter={queueFilter.filter} onFilter={queueFilter.setFilter} options={queueFilter.options} placeholder="Search by case ID, priority, or region..." /></div><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-surface-container-high text-label-bold text-on-surface-variant"><tr><th className="px-lg py-sm">CREATED</th><th className="px-lg py-sm">CASE ID</th><th className="px-lg py-sm">PRIORITY</th><th className="px-lg py-sm">REGION</th><th className="px-lg py-sm">OUTSTANDING</th><th className="px-lg py-sm text-right">ACTION</th></tr></thead><tbody>
          {queueFilter.results.map((item) => { const canAllocate = eligible.some((auctioneer) => auctioneer.region === item.region); return <tr key={item.id} className="even:bg-surface-container-low"><td className="px-lg py-md text-body-sm">{new Date(item.createdAt).toLocaleString()}</td><td className="px-lg py-md font-bold text-primary">{item.caseNumber}</td><td className="px-lg py-md">{item.priority}</td><td className="px-lg py-md">{item.region}</td><td className="px-lg py-md text-mono-data">{UGX.format(item.valuation)}</td><td className="px-lg py-md text-right"><Button disabled={!canAllocate} onClick={() => allocate(item.id)}>Preview</Button></td></tr>; })}
          {!queueFilter.results.length ? <EmptyRow colSpan={6} label={loading ? "Loading queue..." : "No pending cases match your search."} /> : null}
        </tbody></table></div></section>
      </div>
      <aside className="space-y-lg xl:col-span-4">
        <section className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg"><h2 className="mb-md text-title-lg">Regional workload</h2>{regionalLoads.map((item) => <div className="mb-md" key={item.region}><div className="mb-xs flex justify-between text-body-sm"><span>{item.region}</span><span className="text-mono-data">{item.value} active</span></div><div className="h-2 overflow-hidden rounded-full bg-surface-container"><div className="h-full bg-primary" style={{ width: `${(item.value / maxLoad) * 100}%` }} /></div></div>)}{!regionalLoads.length && !loading ? <p className="text-body-sm text-on-surface-variant">No active case workload.</p> : null}</section>
        <section className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest"><div className="border-b border-outline-variant px-lg py-md"><h2 className="text-title-lg">Unallocated exceptions</h2></div><div className="divide-y divide-outline-variant">{exceptions.map((item) => <div key={item.id} className="p-md"><p className="font-bold text-primary">{item.caseNumber}</p><p className="text-body-sm text-error">No active, licence-valid auctioneer in {item.region}</p><p className="mt-1 text-mono-data text-body-sm">{UGX.format(item.valuation)}</p></div>)}{!exceptions.length && !loading ? <p className="p-md text-body-sm text-on-surface-variant">No regional allocation exceptions.</p> : null}</div></section>
        <section className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest"><div className="border-b border-outline-variant px-lg py-md"><h2 className="text-title-lg">Recent allocations</h2></div>{allocations.slice(0, 5).map((item) => <div key={item.id} className="border-b border-outline-variant p-md"><p className="font-bold text-primary">{item.recovery_case?.case_number}</p><p className="text-[11px] text-on-surface-variant">{item.auctioneer?.company_name}</p><p className="mt-1 text-[10px] text-outline">{new Date(item.allocated_at).toLocaleString()}</p></div>)}{!allocations.length && !loading ? <p className="p-md text-body-sm text-on-surface-variant">No allocations recorded.</p> : null}</section>
      </aside>
    </div>
    <DryRunPreviewModal
      open={previewOpen}
      caseId={activeCaseId}
      strategy="automatic"
      auctioneerId={activeAuctioneerId}
      onClose={() => setPreviewOpen(false)}
      onAccept={async () => {
        if (!activeCaseId) return;
        setPreviewOpen(false);
        await commitAllocation(activeCaseId);
      }}
    />
  </div></AppShell>;
}

function Stat({ label, value, note, icon, error = false }: { label: string; value: number; note: string; icon: string; error?: boolean }) { return <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md"><Icon name={icon} className={error ? "text-error" : "text-primary"} /><p className="mt-md text-label-bold uppercase text-on-surface-variant">{label}</p><p className={error ? "text-display-lg text-error" : "text-display-lg text-primary"}>{value}</p><p className="mt-xs text-body-sm text-on-surface-variant">{note}</p></div>; }
