import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell, Icon } from "@/components/AppShell";
import { DashboardWelcome, Button } from "@/components/ui-kit";
import { ChartCard, ThroughputLineChart, StatusPieChart } from "@/components/Charts";
import { Api } from "@/lib/api";

export const Route = createFileRoute("/credit/")({ component: CreditDashboard });

const UGX = new Intl.NumberFormat("en-UG", { style: "currency", currency: "UGX", maximumFractionDigits: 0 });
const list = (value: any) => Array.isArray(value) ? value : value?.results ?? [];
const daysUntil = (date: string) => Math.ceil((new Date(date).getTime() - Date.now()) / 86_400_000);

function CreditDashboard() {
  const [cases, setCases] = useState<any[]>([]);
  const [auctioneers, setAuctioneers] = useState<any[]>([]);
  const [allocations, setAllocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([Api.get("/api/cases/?ordering=-created_at"), Api.get("/api/auctioneers/?ordering=license_expiry"), Api.get("/api/allocations/?ordering=-allocated_at")])
      .then(([caseData, auctioneerData, allocationData]) => {
        setCases(list(caseData));
        setAuctioneers(list(auctioneerData));
        setAllocations(list(allocationData));
      })
      .finally(() => setLoading(false));
  }, []);

  const pending = cases.filter((item) => item.status === "Pending");
  const recovered = cases.filter((item) => item.status === "Recovered");
  const activeCases = cases.filter((item) => !["Recovered", "Closed", "Cancelled"].includes(item.status));
  const activePartners = auctioneers.filter((item) => item.status);
  const expiring = auctioneers.filter((item) => daysUntil(item.license_expiry) <= 30).slice(0, 5);
  const capacity = activePartners.length ? Math.round(activePartners.reduce((sum, item) => sum + Number(item.current_workload || 0), 0) / activePartners.length) : 0;
  const recoveryRate = cases.length ? Math.round((recovered.length / cases.length) * 100) : 0;

  const throughput = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, index) => {
      const day = new Date(); day.setDate(day.getDate() - (6 - index));
      return { key: day.toDateString(), day: day.toLocaleDateString("en", { weekday: "short" }), allocated: 0, exceptions: 0 };
    });
    allocations.forEach((item) => {
      const found = days.find((day) => day.key === new Date(item.allocated_at).toDateString());
      if (found) found.allocated += 1;
    });
    cases.filter((item) => item.status === "Pending").forEach((item) => {
      const found = days.find((day) => day.key === new Date(item.created_at).toDateString());
      if (found) found.exceptions += 1;
    });
    return days.map(({ day, allocated, exceptions }) => ({ day, allocated, exceptions }));
  }, [allocations, cases]);

  const queueSplit = [
    { name: "Pending", value: pending.length },
    { name: "Allocated", value: cases.filter((item) => item.status === "Allocated").length },
    { name: "In recovery", value: cases.filter((item) => item.status === "In Recovery").length },
    { name: "Recovered", value: recovered.length },
  ].filter((item) => item.value > 0);

  const recentActivity = allocations.slice(0, 4).map((item) => ({
    title: "Allocation approved",
    note: `${item.auctioneer?.company_name ?? "Auctioneer"} assigned to ${item.recovery_case?.case_number ?? "case"}`,
    time: new Date(item.allocated_at).toLocaleString(),
  }));

  return <AppShell searchPlaceholder="Search cases or auctioneers...">
    <DashboardWelcome
      message={loading ? "Loading portfolio data..." : "Live allocation, licence and recovery data from the AAAS system."}
      stats={[
        { label: "In queue", value: String(pending.length) },
        { label: "Recovery rate", value: `${recoveryRate}%` },
        { label: "Outstanding", value: UGX.format(activeCases.reduce((sum, item) => sum + Number(item.outstanding_balance || 0), 0)) },
      ]}
      actions={<Button variant="gold" icon="queue" onClick={() => window.location.assign("/credit/allocation")}>Open allocation engine</Button>}
    />

    <div className="grid grid-cols-1 gap-md md:grid-cols-2 xl:grid-cols-4">
      <Metric icon="diversity_3" label="Active partners" value={activePartners.length} note={`${new Set(activePartners.map((item) => item.region)).size} regions represented`} />
      <Metric icon="pending_actions" label="Pending allocations" value={pending.length} note="Cases awaiting assignment" />
      <Metric icon="groups" label="Average caseload" value={capacity} note="Active cases per partner" />
      <Metric icon="warning" label="Licence alerts" value={expiring.length} note="Licences expiring within 30 days" error />
    </div>

    <div className="mt-lg grid grid-cols-1 gap-lg xl:grid-cols-3">
      <section className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest xl:col-span-2">
        <div className="border-b border-outline-variant bg-surface-container-low px-md py-3"><h2 className="text-title-lg text-primary">Licence expiry tracking</h2></div>
        <div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-surface-container-high text-label-bold text-on-surface-variant"><tr><th className="px-md py-3">AUCTIONEER</th><th className="px-md py-3">LICENSE</th><th className="px-md py-3 text-center">CASES HELD</th><th className="px-md py-3">EXPIRY</th><th className="px-md py-3">STATUS</th></tr></thead><tbody className="divide-y divide-outline-variant">
          {expiring.map((item) => { const days = daysUntil(item.license_expiry); const urgent = days <= 7; return <tr key={item.id}><td className="px-md py-3 font-bold text-primary">{item.company_name}<div className="text-[11px] font-normal text-on-surface-variant">{item.region} region</div></td><td className="px-md py-3 text-body-sm">{item.license_number}</td><td className="px-md py-3 text-center text-mono-data">{item.current_workload}</td><td className="px-md py-3 text-body-sm">{new Date(item.license_expiry).toLocaleDateString()}<div className={urgent ? "text-error text-[11px]" : "text-on-surface-variant text-[11px]"}>{days < 0 ? "Expired" : `${days} days remaining`}</div></td><td className="px-md py-3"><span className={urgent ? "text-error" : "text-secondary"}>{urgent ? "URGENT" : "WARNING"}</span></td></tr>; })}
          {!loading && !expiring.length ? <tr><td className="px-md py-6 text-center text-on-surface-variant" colSpan={5}>No licence expiries in the next 30 days.</td></tr> : null}
        </tbody></table></div>
      </section>
      <aside className="space-y-lg">
        <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg"><h2 className="mb-md text-title-lg text-primary">Allocation queue</h2>{pending.slice(0, 4).map((item) => <div key={item.id} className="mb-sm flex items-center justify-between rounded-lg border-l-4 border-primary bg-surface-container p-md"><div><p className="font-bold text-primary">{item.case_number}</p><p className="text-[11px] text-on-surface-variant">{item.branch?.branch_name ?? "Unknown branch"}</p></div><span className="text-body-sm font-bold">{UGX.format(Number(item.outstanding_balance || 0))}</span></div>)}{!loading && !pending.length ? <p className="text-body-sm text-on-surface-variant">No cases are awaiting allocation.</p> : null}</section>
        <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg"><h2 className="mb-md text-title-lg text-primary">Recent activity</h2>{recentActivity.map((item, index) => <div key={`${item.note}-${index}`} className="mb-md border-l-2 border-primary pl-md"><p className="font-bold text-primary">{item.title}</p><p className="text-[11px] text-on-surface-variant">{item.note}</p><p className="mt-1 text-[10px] text-outline">{item.time}</p></div>)}{!loading && !recentActivity.length ? <p className="text-body-sm text-on-surface-variant">No allocations have been recorded yet.</p> : null}</section>
      </aside>
    </div>
    <div className="mt-lg grid grid-cols-1 gap-lg lg:grid-cols-3"><div className="lg:col-span-2"><ChartCard title="Allocation throughput" subtitle="Recorded allocations and pending cases created this week"><ThroughputLineChart data={throughput} /></ChartCard></div><ChartCard title="Portfolio composition" subtitle="Live case statuses"><StatusPieChart data={queueSplit} /></ChartCard></div>
  </AppShell>;
}

function Metric({ icon, label, value, note, error = false }: { icon: string; label: string; value: string | number; note: string; error?: boolean }) {
  return <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md"><Icon name={icon} className={error ? "text-error" : "text-primary"} /><p className="mt-md text-label-bold uppercase text-on-surface-variant">{label}</p><p className={error ? "text-display-lg text-error" : "text-display-lg text-primary"}>{value}</p><p className="mt-2 text-[11px] text-on-surface-variant">{note}</p></div>;
}
