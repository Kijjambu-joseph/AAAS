import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Icon } from "@/components/AppShell";
import { Button, Modal, Toolbar, EmptyRow, useSearchFilter } from "@/components/ui-kit";

export const Route = createFileRoute("/credit/allocation")({
  component: AllocationEngine,
  head: () => ({
    meta: [
      { title: "Allocation Queue & Engine Monitor | AAAS System" },
      {
        name: "description",
        content:
          "Live telemetry, scoring breakdown, and manual override tools for the auto-allocation heuristic engine.",
      },
      { property: "og:title", content: "Allocation Queue & Engine Monitor | AAAS System" },
      {
        property: "og:description",
        content:
          "Live telemetry, scoring breakdown, and manual override tools for the auto-allocation heuristic engine.",
      },
    ],
  }),
});

const exceptions = [
  {
    id: "RECOV-2901-X",
    reason: "No Qualified Auctioneer",
    valuation: "UGX 1.2B",
    region: "Kampala Central",
    action: "ASSIGN MANUALLY",
  },
  {
    id: "RECOV-3112-L",
    reason: "Address Conflict",
    valuation: "UGX 450M",
    region: "Entebbe",
    action: "RESOLVE",
  },
  {
    id: "RECOV-4005-B",
    reason: "Multiple Security Interests",
    valuation: "UGX 8.9B",
    region: "Jinja Industrial",
    action: "ASSIGN MANUALLY",
  },
];

const queue = [
  {
    time: "14:22:01",
    id: "RECOV-5091-M",
    priority: "HIGH",
    priorityClasses: "bg-primary-fixed text-on-primary-fixed",
    status: "Allocating...",
    statusClass: "text-secondary",
    eta: "12s",
  },
  {
    time: "14:21:45",
    id: "RECOV-5088-A",
    priority: "NORMAL",
    priorityClasses: "bg-surface-container text-on-surface-variant",
    status: "Pending Validation",
    statusClass: "text-primary",
    eta: "45s",
  },
  {
    time: "14:21:30",
    id: "RECOV-5085-K",
    priority: "URGENT",
    priorityClasses: "bg-secondary-fixed text-on-secondary-fixed-variant",
    status: "Pre-processing",
    statusClass: "text-primary",
    eta: "1m 12s",
  },
  {
    time: "14:21:12",
    id: "RECOV-5082-Z",
    priority: "NORMAL",
    priorityClasses: "bg-surface-container text-on-surface-variant",
    status: "Queued",
    statusClass: "text-primary",
    eta: "1m 55s",
  },
];

const candidateRanking = [
  {
    name: "B. Mubiru Auctioneers",
    score: 94,
    weightBreakdown: [
      { label: "Regional Proximity", value: 35, max: 35 },
      { label: "Historical Recovery Rate", value: 30, max: 30 },
      { label: "Current Caseload", value: 18, max: 20 },
      { label: "License Standing", value: 11, max: 15 },
    ],
  },
  {
    name: "Standard Assets Ltd",
    score: 87,
    weightBreakdown: [
      { label: "Regional Proximity", value: 28, max: 35 },
      { label: "Historical Recovery Rate", value: 27, max: 30 },
      { label: "Current Caseload", value: 17, max: 20 },
      { label: "License Standing", value: 15, max: 15 },
    ],
  },
  {
    name: "Pearl Asset Liquidators",
    score: 72,
    weightBreakdown: [
      { label: "Regional Proximity", value: 20, max: 35 },
      { label: "Historical Recovery Rate", value: 24, max: 30 },
      { label: "Current Caseload", value: 13, max: 20 },
      { label: "License Standing", value: 15, max: 15 },
    ],
  },
];

const systemLog = [
  {
    time: "14:25:02",
    label: "SUCCESS:",
    labelClass: "text-primary",
    text: (
      <>
        Case #RECOV-1029 allocated to Auctioneer <span className="underline">B. Mubiru</span>
      </>
    ),
  },
  {
    time: "14:24:58",
    label: "EXCEPTION:",
    labelClass: "text-error",
    text: "Heuristic mismatch on Case #RECOV-2901-X. Escalated to Credit Admin.",
  },
  {
    time: "14:24:40",
    label: "BATCH:",
    labelClass: "text-primary",
    text: "New workload detected in Kampala Central (12 assets).",
  },
  {
    time: "14:24:32",
    label: "INFO:",
    labelClass: "text-secondary",
    text: "Load balance complete. Engine re-indexed.",
  },
];

function AllocationEngine() {
  const [heartbeat] = useState([10, 40, 30, 80, 60, 95, 20, 50, 10, 40, 30, 80]);
  const [forceOpen, setForceOpen] = useState(false);
  const [overrideOpen, setOverrideOpen] = useState(false);
  const [exception, setException] = useState<(typeof exceptions)[number] | null>(null);
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const queueFilter = useSearchFilter(queue, ["id", "status", "priority"], "priority");

  return (
    <AppShell>
      <div className="space-y-lg">
        <div className="flex items-center gap-md">
          <h1 className="text-title-lg text-primary">Allocation Queue &amp; Engine Monitor</h1>
          <div className="flex items-center gap-xs rounded-full bg-secondary-container/20 px-sm py-1">
            <div className="h-2 w-2 rounded-full bg-secondary" />
            <span className="text-[10px] uppercase text-secondary font-semibold tracking-[0.05em]">Engine: ACTIVE</span>
          </div>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-1 gap-md md:grid-cols-4">
          <div className="flex flex-col rounded-lg border border-outline-variant bg-surface-container-lowest p-md">
            <span className="mb-xs uppercase text-on-surface-variant text-label-bold">Active Queue</span>
            <div className="flex items-baseline gap-sm">
              <span className="text-display-lg text-primary">42</span>
              <span className="text-body-sm text-secondary text-mono-data">+5 new</span>
            </div>
            <div className="mt-auto h-1 overflow-hidden rounded-full bg-surface-container pt-sm">
              <div className="h-full w-2/3 bg-primary" />
            </div>
          </div>
          <div className="flex flex-col rounded-lg border border-outline-variant bg-surface-container-lowest p-md">
            <span className="mb-xs uppercase text-on-surface-variant text-label-bold">Exceptions (Manual)</span>
            <div className="flex items-baseline gap-sm">
              <span className="text-display-lg text-error">12</span>
              <span className="rounded bg-error px-1 text-body-sm text-error-container text-mono-data">Critical</span>
            </div>
            <p className="mt-xs text-body-sm text-on-surface-variant">Requires immediate oversight</p>
          </div>
          <div className="flex flex-col rounded-lg border border-outline-variant bg-surface-container-lowest p-md">
            <span className="mb-xs uppercase text-on-surface-variant text-label-bold">Engine Latency</span>
            <div className="flex items-baseline gap-sm">
              <span className="text-display-lg text-primary">140ms</span>
              <span className="text-body-sm text-on-primary-container text-mono-data">Optimal</span>
            </div>
            <div className="mt-sm flex gap-1">
              <div className="h-4 w-2 bg-secondary-container" />
              <div className="h-4 w-2 bg-secondary-container" />
              <div className="h-4 w-2 bg-secondary-container opacity-30" />
              <div className="h-4 w-2 bg-secondary-container opacity-10" />
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg border border-outline-variant bg-surface-container-lowest p-md">
            <span className="uppercase text-on-surface-variant text-label-bold">Engine Health</span>
            <div className="flex items-center gap-md">
              <div className="relative h-12 w-12">
                <svg className="h-full w-full" viewBox="0 0 36 36">
                  <path
                    className="stroke-surface-container"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeWidth="3"
                  />
                  <path
                    className="stroke-secondary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeDasharray="98, 100"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-medium">98%</span>
                </div>
              </div>
              <div>
                <p className="text-primary text-label-bold">Uptime</p>
                <p className="text-body-sm text-on-surface-variant">24d 14h 02m</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-lg xl:grid-cols-12">
          {/* Left column */}
          <div className="space-y-lg xl:col-span-8">
            {/* Engine Real-Time Monitor */}
            <section className="relative min-h-[200px] overflow-hidden rounded-lg bg-primary-container p-lg text-on-primary-container">
              <div className="relative z-10 flex flex-col gap-md lg:flex-row lg:items-start lg:justify-between">
                <div className="w-full min-w-0 lg:flex-1">
                  <h2 className="mb-xs text-headline-sm text-on-primary">Auto-Allocation Engine Monitor</h2>
                  <p className="max-w-[36rem] text-white text-body-sm opacity-80">
                    Real-time telemetry of the institutional recovery heuristic processor. Status: Processing
                    regional batch #9421.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-sm">
                  <button
                    onClick={() => setForceOpen(true)}
                    className="rounded-[10px] bg-surface-container-lowest px-md py-sm font-semibold tracking-[0.05em] text-primary transition-colors hover:bg-primary-fixed"
                  >
                    Force Allocation
                  </button>
                  <button
                    onClick={() => setOverrideOpen(true)}
                    className="rounded-[10px] border border-on-primary/30 px-md py-sm font-semibold tracking-[0.05em] text-on-primary transition-colors hover:bg-white/10"
                  >
                    Manual Override
                  </button>
                </div>

              </div>
              <div className="relative z-10 mt-lg grid grid-cols-6 gap-sm">
                <div className="col-span-6 flex h-12 items-end gap-1">
                  {heartbeat.map((h, i) => (
                    <div
                      key={i}
                      className="w-full animate-pulse bg-secondary-container"
                      style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Live Score Breakdown / Candidate Ranking */}
            <section className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest">
              <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-low px-lg py-md">
                <div className="flex items-center gap-sm">
                  <Icon name="insights" className="text-primary" />
                  <h3 className="text-title-lg">Live Allocation Score Breakdown</h3>
                </div>
                <span className="rounded-full bg-primary-fixed px-2 py-0.5 text-[10px] text-on-primary-fixed font-semibold tracking-[0.05em]">
                  CASE: RECOV-5091-M
                </span>
              </div>
              <div className="divide-y divide-outline-variant">
                {candidateRanking.map((c, idx) => (
                  <div key={c.name} className="px-lg py-md">
                    <div className="mb-sm flex items-center justify-between">
                      <div className="flex items-center gap-sm">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] text-on-primary font-semibold tracking-[0.05em]">
                          {idx + 1}
                        </span>
                        <span className="text-primary text-label-bold">{c.name}</span>
                      </div>
                      <span className="text-headline-sm text-primary">{c.score}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-sm md:grid-cols-4">
                      {c.weightBreakdown.map((w) => (
                        <div key={w.label} className="rounded border border-outline-variant p-sm">
                          <p className="mb-xs text-[10px] uppercase text-on-surface-variant font-semibold tracking-[0.05em]">
                            {w.label}
                          </p>
                          <div className="mb-xs h-1.5 overflow-hidden rounded-full bg-surface-container">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${(w.value / w.max) * 100}%` }}
                            />
                          </div>
                          <p className="text-body-sm text-mono-data">
                            {w.value}/{w.max}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-outline-variant bg-surface-container-low px-lg py-sm text-body-sm text-on-surface-variant">
                Weightings: Regional Proximity (35%), Historical Recovery Rate (30%), Current Caseload (20%),
                License Standing (15%)
              </div>
            </section>

            {/* Unallocated Exceptions */}
            <section className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest">
              <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-low px-lg py-md">
                <div className="flex items-center gap-sm">
                  <Icon name="warning" className="text-error" />
                  <h3 className="text-title-lg">Unallocated Exceptions</h3>
                </div>
                <span className="rounded bg-error-container px-2 py-0.5 text-[10px] text-on-error-container font-semibold tracking-[0.05em]">
                  12 ACTION REQUIRED
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead className="bg-surface-container-high text-on-surface-variant text-label-bold">
                    <tr>
                      <th className="px-lg py-sm">CASE ID</th>
                      <th className="px-lg py-sm">REASON</th>
                      <th className="px-lg py-sm">VALUATION</th>
                      <th className="px-lg py-sm">REGION</th>
                      <th className="px-lg py-sm text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exceptions.map((e) => (
                      <tr key={e.id} className="transition-colors even:bg-surface-container-low hover:bg-surface-container-high">
                        <td className="whitespace-nowrap px-lg py-md text-primary text-mono-data">{e.id}</td>
                        <td className="px-lg py-md">
                          <span className="whitespace-nowrap font-medium text-body-sm text-error">{e.reason}</span>
                        </td>
                        <td className="px-lg py-md text-body-sm text-mono-data">{e.valuation}</td>
                        <td className="px-lg py-md text-body-sm">{e.region}</td>
                        <td className="px-lg py-md text-right">
                          <button
                            onClick={() => setException(e)}
                            className="rounded-[10px] border border-outline-variant px-3 py-1.5 text-label-bold text-primary transition-colors hover:bg-surface-container"
                          >
                            {e.action}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Active Queue List */}
            <section className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest">
              <div className="space-y-md border-b border-outline-variant px-lg py-md">
                <h3 className="text-title-lg">Current Processing Queue</h3>
                <Toolbar
                  query={queueFilter.query}
                  onQuery={queueFilter.setQuery}
                  filter={queueFilter.filter}
                  onFilter={queueFilter.setFilter}
                  options={queueFilter.options}
                  placeholder="Search by case ID or status..."
                  right={
                    <Button variant="outline" icon="bolt" onClick={() => setForceOpen(true)}>
                      Allocate all
                    </Button>
                  }
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead className="bg-surface-container-high text-on-surface-variant text-label-bold">
                    <tr>
                      <th className="px-lg py-sm">TIMESTAMP</th>
                      <th className="px-lg py-sm">CASE ID</th>
                      <th className="px-lg py-sm">PRIORITY</th>
                      <th className="px-lg py-sm">STATUS</th>
                      <th className="px-lg py-sm">ETA</th>
                      <th className="px-lg py-sm text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="text-body-sm text-mono-data">
                    {queueFilter.results.map((q) => (
                      <tr key={q.id} className="transition-colors even:bg-surface-container-low hover:bg-surface-container-high">
                        <td className="px-lg py-md text-on-surface-variant">{q.time}</td>
                        <td className="px-lg py-md font-bold text-primary">{q.id}</td>
                        <td className="px-lg py-md">
                          <span className={`rounded-full px-2 py-1 text-[10px] ${q.priorityClasses}`}>{q.priority}</span>
                        </td>
                        <td className={`px-lg py-md ${q.statusClass}`}>{q.status}</td>
                        <td className="px-lg py-md">{q.eta}</td>
                        <td className="px-lg py-md text-right">
                          <button
                            onClick={() => setConfirmed(q.id)}
                            className="rounded-[10px] border border-outline-variant px-3 py-1.5 text-label-bold text-primary hover:bg-surface-container"
                          >
                            REVIEW
                          </button>
                        </td>
                      </tr>
                    ))}
                    {!queueFilter.results.length ? <EmptyRow colSpan={6} label="No queued cases match your search." /> : null}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center border-t border-outline-variant bg-surface-container-low px-lg py-sm">
                <button className="flex items-center gap-sm text-primary text-label-bold">
                  LOAD MORE CASES
                  <Icon name="expand_more" className="text-sm" />
                </button>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-lg xl:col-span-4">
            {/* Regional Workload Map */}
            <section className="flex h-full max-h-[600px] flex-col overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest">
              <div className="border-b border-outline-variant px-lg py-md">
                <h3 className="text-title-lg">Regional Workload Distribution</h3>
                <p className="text-body-sm text-on-surface-variant">Live allocation density by geographic sector</p>
              </div>
              <div className="relative min-h-[350px] flex-grow bg-surface-container-high">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBGasQP25_5UDg6c1pstd8pHIjv4JHCMJnKEU5lIc4vcHyAkedZtxOjZXm4QrON-knLaZstszGKYbPvmQ9F4rab0qYvUyqKHyQmpmwmITIaNEVmvyi2dl3Ff0sTsGhgT_PyeNaOb8ni5Qkf2Tp--8YVLi0_9J_kljIlp6sRUwKhF9LPloufdmsASDMK4ByCscOpr1nHUel6yifGHsZ4i55GVpG8AJ4QntMVvRJQ_bye_vnahms93LoOzHzu9J3L5TugiogVIX22n-ij')",
                  }}
                />
                <div className="absolute bottom-md left-md space-y-xs rounded border border-outline-variant bg-white/90 p-sm shadow-sm backdrop-blur-sm">
                  <div className="flex items-center gap-sm">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    <span className="text-[10px] uppercase font-semibold tracking-[0.05em]">High Volume</span>
                  </div>
                  <div className="flex items-center gap-sm">
                    <div className="h-3 w-3 rounded-full bg-secondary-container" />
                    <span className="text-[10px] uppercase font-semibold tracking-[0.05em]">Moderate</span>
                  </div>
                  <div className="flex items-center gap-sm">
                    <div className="h-3 w-3 rounded-full bg-surface-container-highest" />
                    <span className="text-[10px] uppercase font-semibold tracking-[0.05em]">Low Activity</span>
                  </div>
                </div>
              </div>
              <div className="space-y-md border-t border-outline-variant p-lg">
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-on-surface-variant">Kampala Central</span>
                  <span className="text-primary text-mono-data">64% Capacity</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
                  <div className="h-full w-[64%] bg-primary" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-on-surface-variant">Western Region</span>
                  <span className="text-primary text-mono-data">22% Capacity</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
                  <div className="h-full w-[22%] bg-secondary" />
                </div>
              </div>
            </section>

            {/* Engine System Log */}
            <section className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest">
              <div className="border-b border-outline-variant bg-surface-container-low px-lg py-md">
                <h3 className="text-title-lg">Engine System Log</h3>
              </div>
              <div className="space-y-sm p-md">
                {systemLog.map((l, i) => (
                  <div key={i} className="flex items-start gap-md">
                    <div className="mt-1 whitespace-nowrap text-[11px] text-on-surface-variant font-medium">
                      {l.time}
                    </div>
                    <div className="text-body-sm">
                      <span className={`font-bold ${l.labelClass}`}>{l.label}</span> {l.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-outline-variant p-md">
                <a href="/credit/audit" className="flex items-center justify-between text-primary hover:underline text-label-bold">
                  VIEW FULL AUDIT LOG
                  <Icon name="open_in_new" className="text-sm" />
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Modal
        open={forceOpen}
        onClose={() => setForceOpen(false)}
        title="Force allocation cycle"
        subtitle="Runs the heuristic engine immediately across the active queue."
        icon="bolt"
        footer={
          <>
            <Button variant="outline" onClick={() => setForceOpen(false)}>
              Cancel
            </Button>
            <Button
              icon="play_arrow"
              onClick={() => {
                setForceOpen(false);
                setConfirmed("FORCE");
              }}
            >
              Run now
            </Button>
          </>
        }
      >
        <p className="text-body-md text-on-surface-variant">
          42 cases will be scored against all eligible auctioneers. Cases with unresolved
          exceptions are skipped and remain for manual assignment.
        </p>
      </Modal>

      <Modal
        open={overrideOpen}
        onClose={() => setOverrideOpen(false)}
        title="Manual override"
        subtitle="Assign an auctioneer directly and record the justification."
        icon="edit_note"
        tone="secondary"
        footer={
          <>
            <Button variant="outline" onClick={() => setOverrideOpen(false)}>
              Cancel
            </Button>
            <Button
              icon="assignment_turned_in"
              onClick={() => {
                setOverrideOpen(false);
                setConfirmed("OVERRIDE");
              }}
            >
              Apply override
            </Button>
          </>
        }
      >
        <div className="space-y-md">
          <label className="block space-y-xs">
            <span className="text-label-bold uppercase text-on-surface-variant">Case reference</span>
            <input
              defaultValue="RECOV-5091-M"
              className="w-full rounded-[10px] border border-outline-variant bg-surface-container px-4 py-3 text-body-md outline-none focus:border-primary"
            />
          </label>
          <label className="block space-y-xs">
            <span className="text-label-bold uppercase text-on-surface-variant">Auctioneer</span>
            <select className="w-full rounded-[10px] border border-outline-variant bg-surface-container px-4 py-3 text-body-md outline-none focus:border-primary">
              {candidateRanking.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>
          </label>
          <label className="block space-y-xs">
            <span className="text-label-bold uppercase text-on-surface-variant">Justification</span>
            <textarea
              rows={3}
              placeholder="Explain why the engine recommendation is being overridden."
              className="w-full rounded-[10px] border border-outline-variant bg-surface-container px-4 py-3 text-body-md outline-none focus:border-primary"
            />
          </label>
        </div>
      </Modal>

      <Modal
        open={!!exception}
        onClose={() => setException(null)}
        title={exception ? `Exception — ${exception.id}` : ""}
        subtitle={exception?.reason}
        icon="warning"
        tone="error"
        footer={
          <>
            <Button variant="outline" onClick={() => setException(null)}>
              Close
            </Button>
            <Button
              icon="how_to_reg"
              onClick={() => {
                setException(null);
                setConfirmed("EXCEPTION");
              }}
            >
              Assign manually
            </Button>
          </>
        }
      >
        {exception ? (
          <dl className="space-y-sm text-body-md">
            <div className="flex justify-between gap-md">
              <dt className="text-on-surface-variant">Valuation</dt>
              <dd className="font-semibold">{exception.valuation}</dd>
            </div>
            <div className="flex justify-between gap-md">
              <dt className="text-on-surface-variant">Region</dt>
              <dd className="font-semibold">{exception.region}</dd>
            </div>
            <div className="flex justify-between gap-md">
              <dt className="text-on-surface-variant">Reason</dt>
              <dd className="font-semibold text-error">{exception.reason}</dd>
            </div>
          </dl>
        ) : null}
      </Modal>

      <Modal
        open={!!confirmed}
        onClose={() => setConfirmed(null)}
        title="Action recorded"
        subtitle={confirmed ?? undefined}
        icon="task_alt"
        footer={<Button onClick={() => setConfirmed(null)}>Done</Button>}
      >
        <p className="text-body-md text-on-surface-variant">
          The engine has accepted your instruction. A full entry has been written to the compliance
          audit trail.
        </p>
      </Modal>
    </AppShell>

  );
}
