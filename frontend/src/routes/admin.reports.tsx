import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Icon, PageHeader } from "@/components/AppShell";
import { Modal, Button } from "@/components/ui-kit";

export const Route = createFileRoute("/admin/reports")({
  component: ReportsPage,
  head: () => ({
    meta: [
      { title: "Reports & Analytics | Recovery Management System" },
      {
        name: "description",
        content: "Real-time recovery performance and allocation metrics overview, with exportable reports and regional distribution.",
      },
      { property: "og:title", content: "Reports & Analytics | Recovery Management System" },
      {
        property: "og:description",
        content: "Real-time recovery performance and allocation metrics overview, with exportable reports and regional distribution.",
      },
    ],
  }),
});

function ReportsPage() {
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <AppShell searchPlaceholder="Search reports, case IDs...">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Real-time recovery performance and allocation metrics overview."
        actions={
          <>
            <div className="flex items-center rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-sm">
              <Icon name="calendar_month" className="mr-sm text-outline" />
              <span className="text-body-md text-on-surface-variant">Oct 1, 2023 - Oct 31, 2023</span>
              <Icon name="expand_more" className="ml-md text-[18px] text-outline" />
            </div>
            <div className="relative">
              <button
                className="flex items-center rounded-lg bg-primary px-lg py-sm font-bold text-body-md text-on-primary shadow-sm transition-all hover:bg-primary-container"
                onClick={() => setExportOpen(true)}
              >
                <Icon name="download" className="mr-sm text-[20px]" />
                Export Data
              </button>
            </div>
          </>
        }
      />

      {/* KPI Grid */}
      <section className="grid grid-cols-1 gap-lg md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-sm">
          <div className="mb-sm flex items-start justify-between">
            <div className="rounded-lg bg-primary-fixed p-sm">
              <Icon name="folder_open" className="text-primary" />
            </div>
            <span className="rounded bg-green-50 px-sm py-xs text-xs font-bold text-green-600">+12%</span>
          </div>
          <p className="mb-xs text-body-sm font-label-bold uppercase tracking-wider text-on-surface-variant">
            Total Cases Processed
          </p>
          <h3 className="text-headline-md text-primary">1,284</h3>
          <div className="mt-sm h-1 w-full overflow-hidden rounded-full bg-surface-container">
            <div className="h-full bg-primary" style={{ width: "75%" }} />
          </div>
        </div>
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-sm">
          <div className="mb-sm flex items-start justify-between">
            <div className="rounded-lg bg-secondary-fixed p-sm">
              <Icon name="timer" className="text-secondary" />
            </div>
            <span className="rounded bg-red-50 px-sm py-xs text-xs font-bold text-red-600">-2.4h</span>
          </div>
          <p className="mb-xs text-body-sm font-label-bold uppercase tracking-wider text-on-surface-variant">
            Avg. Allocation TAT
          </p>
          <h3 className="text-headline-md text-primary">18.5 hrs</h3>
          <div className="mt-sm flex items-center gap-xs">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            <p className="text-body-sm text-on-surface-variant">Below monthly threshold</p>
          </div>
        </div>
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-sm">
          <div className="mb-sm flex items-start justify-between">
            <div className="rounded-lg bg-tertiary-fixed p-sm">
              <Icon name="trending_up" className="text-tertiary" />
            </div>
            <span className="rounded bg-green-50 px-sm py-xs text-xs font-bold text-green-600">+4.2%</span>
          </div>
          <p className="mb-xs text-body-sm font-label-bold uppercase tracking-wider text-on-surface-variant">
            Recovery Performance
          </p>
          <h3 className="text-headline-md text-primary">92.4%</h3>
          <div className="mt-sm flex items-center gap-xs">
            <svg className="h-8 w-full overflow-visible" viewBox="0 0 100 20">
              <path
                d="M0 15 Q 10 5, 20 12 T 40 8 T 60 14 T 80 5 T 100 10"
                fill="none"
                stroke="#00A0DF"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        <div className="rounded-xl border border-outline-variant border-l-4 border-l-error bg-surface-container-lowest p-md shadow-sm">
          <div className="mb-sm flex items-start justify-between">
            <div className="rounded-lg bg-error-container p-sm">
              <Icon name="warning" className="text-error" />
            </div>
            <span className="rounded px-sm py-xs text-xs font-bold text-error">Critical</span>
          </div>
          <p className="mb-xs text-body-sm font-label-bold uppercase tracking-wider text-on-surface-variant">
            Active Exceptions
          </p>
          <h3 className="text-headline-md text-error">24</h3>
          <p className="mt-sm text-body-sm font-medium text-on-surface-variant">9 requiring immediate action</p>
        </div>
      </section>

      <Modal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        title="Export Reports"
        subtitle="Choose a format and export the current dashboard data."
        icon="download"
        tone="primary"
        footer={
          <div className="flex justify-between gap-3">
            <Button variant="outline" onClick={() => setExportOpen(false)}>
              Cancel
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                Preview
              </Button>
              <Button onClick={() => setExportOpen(false)}>
                Export Now
              </Button>
            </div>
          </div>
        }
      >
        <div className="space-y-md">
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md">
            <label className="block text-body-sm font-semibold text-on-surface-variant">Format</label>
            <select className="mt-2 w-full rounded-lg border border-outline-variant bg-background px-md py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary">
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
            </select>
          </div>
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md">
            <p className="text-body-sm text-on-surface-variant">Export scope</p>
            <div className="mt-3 space-y-sm">
              <label className="flex items-center gap-3 text-body-sm">
                <input type="radio" name="exportScope" defaultChecked className="h-4 w-4 text-primary" />
                Current dashboard only
              </label>
              <label className="flex items-center gap-3 text-body-sm">
                <input type="radio" name="exportScope" className="h-4 w-4 text-primary" />
                Full report history
              </label>
            </div>
          </div>
        </div>
      </Modal>

      {/* Charts */}
      <section className="grid grid-cols-12 gap-lg">
        <div className="col-span-12 flex h-[400px] flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm xl:col-span-8">
          <div className="mb-lg flex items-center justify-between">
            <h4 className="text-title-lg text-primary">Allocation Trends (Yearly)</h4>
            <div className="flex gap-md">
              <div className="flex items-center gap-xs">
                <span className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-xs font-label-bold text-on-surface-variant">Allocated</span>
              </div>
              <div className="flex items-center gap-xs">
                <span className="h-3 w-3 rounded-full bg-secondary-container" />
                <span className="text-xs font-label-bold text-on-surface-variant">Resolved</span>
              </div>
            </div>
          </div>
          <div className="relative flex flex-1 items-end justify-between gap-md border-b border-l border-outline-variant/30 px-md pb-md">
            {[
              { m: "Jan", a: 40, r: 30 },
              { m: "Feb", a: 55, r: 45 },
              { m: "Mar", a: 70, r: 60 },
              { m: "Apr", a: 65, r: 50 },
              { m: "May", a: 85, r: 75 },
              { m: "Jun", a: 60, r: 40 },
            ].map((d) => (
              <div key={d.m} className="group flex flex-1 flex-col items-center">
                <div
                  className="w-full max-w-[40px] rounded-t bg-primary opacity-40 transition-opacity group-hover:opacity-100"
                  style={{ height: `${d.a}%` }}
                />
                <div
                  className="mt-[-2px] w-full max-w-[40px] rounded-t bg-secondary-container"
                  style={{ height: `${d.r}%` }}
                />
                <span className="mt-sm text-[10px] font-bold uppercase text-outline">{d.m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 flex h-[400px] flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm xl:col-span-4">
          <h4 className="mb-md text-title-lg text-primary">Regional Distribution</h4>
          <div className="relative mb-md flex-1 overflow-hidden rounded-lg bg-surface-container-low">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7avZkBFgAM_J0hSUAfRCo6iA9s7kt2Ps0fZRbY1YgYRVAWm-HFsOlGy7dzkgK7EX2QA5AFSIsWElP3jq6KMlEgC1kX81OPp4VhY8TzZ6mzsX8jmdSWbykdlpl3PNd73G1kBFSCr4pGxWM-8iJHu2aLiy_PEBOR7Xg2oNozymNE7eGblaMXUFU_1KARMnnHlfho0tdtjM5RK9EIDH0wEqqKQiFb9cbKnZhNXe4R9q8PZpahASRmEpGcQ1Hd4L2EOxcRuraE0aqMWTj')",
              }}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full border-2 border-primary bg-primary/20">
                <div className="h-4 w-4 rounded-full bg-primary" />
              </div>
            </div>
            <div className="absolute left-1/3 top-1/4 rounded-lg border border-outline-variant bg-surface-container-lowest p-xs text-[10px] font-bold shadow-xl">
              Central: 542
            </div>
            <div className="absolute bottom-1/3 right-1/4 rounded-lg border border-outline-variant bg-surface-container-lowest p-xs text-[10px] font-bold shadow-xl">
              Eastern: 312
            </div>
          </div>
          <div className="space-y-sm">
            <div className="flex items-center justify-between text-body-sm">
              <span className="text-on-surface-variant">Central Region</span>
              <span className="font-bold text-primary">42.2%</span>
            </div>
            <div className="flex items-center justify-between text-body-sm">
              <span className="text-on-surface-variant">Western Region</span>
              <span className="font-bold text-primary">24.1%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Reports Table */}
      <section className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant p-lg">
          <h4 className="text-title-lg text-primary">Recent Generated Reports</h4>
          <button className="flex items-center text-body-sm font-bold text-primary hover:underline">
            View Archive <Icon name="arrow_forward" className="ml-xs text-[18px]" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="px-lg py-md text-xs font-label-bold uppercase tracking-wider text-outline">
                  Report Name
                </th>
                <th className="px-lg py-md text-xs font-label-bold uppercase tracking-wider text-outline">Type</th>
                <th className="px-lg py-md text-xs font-label-bold uppercase tracking-wider text-outline">
                  Generated By
                </th>
                <th className="px-lg py-md text-xs font-label-bold uppercase tracking-wider text-outline">Date</th>
                <th className="px-lg py-md text-xs font-label-bold uppercase tracking-wider text-outline">Status</th>
                <th className="px-lg py-md text-right text-xs font-label-bold uppercase tracking-wider text-outline">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {[
                {
                  icon: "picture_as_pdf",
                  iconColor: "text-primary",
                  name: "Monthly_Recovery_Performance_Oct23",
                  type: "Performance Summary",
                  by: "System (Automated)",
                  date: "Oct 31, 2023 | 23:59",
                  status: "READY",
                  statusColor: "bg-green-100 text-green-800",
                },
                {
                  icon: "description",
                  iconColor: "text-green-700",
                  name: "Auctioneer_Allocation_Log_v2",
                  type: "Allocation Detail",
                  by: "J. Doe (Admin)",
                  date: "Oct 28, 2023 | 14:22",
                  status: "READY",
                  statusColor: "bg-green-100 text-green-800",
                },
                {
                  icon: "picture_as_pdf",
                  iconColor: "text-primary",
                  name: "Compliance_Audit_Quarter_3",
                  type: "Compliance Audit",
                  by: "Audit Dept",
                  date: "Oct 15, 2023 | 09:10",
                  status: "ARCHIVED",
                  statusColor: "bg-blue-100 text-blue-800",
                },
                {
                  icon: "history",
                  iconColor: "text-orange-600",
                  name: "Exception_Summary_Weekly_Final",
                  type: "Incident Report",
                  by: "System (Automated)",
                  date: "Oct 07, 2023 | 08:00",
                  status: "READY",
                  statusColor: "bg-green-100 text-green-800",
                },
              ].map((r) => (
                <tr key={r.name} className="transition-colors hover:bg-surface-container-low/50">
                  <td className="px-lg py-md">
                    <div className="flex items-center gap-sm">
                      <Icon name={r.icon} className={`text-[20px] ${r.iconColor}`} />
                      <span className="font-semibold text-body-md text-primary">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-lg py-md text-body-sm text-on-surface-variant">{r.type}</td>
                  <td className="px-lg py-md text-body-sm text-on-surface-variant">{r.by}</td>
                  <td className="px-lg py-md text-body-sm text-on-surface-variant">{r.date}</td>
                  <td className="px-lg py-md">
                    <span className={`inline-flex items-center rounded px-sm py-xs text-[11px] font-bold ${r.statusColor}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-lg py-md text-right">
                    <button className="rounded p-sm text-primary transition-colors hover:bg-primary-fixed" title="Download Report">
                      <Icon name="download" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center border-t border-outline-variant bg-surface-container-low/30 p-md">
          <nav className="flex items-center gap-xs">
            <button className="flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-outline transition-colors hover:bg-surface-container-lowest">
              <Icon name="chevron_left" className="text-[18px]" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded bg-primary text-xs font-bold text-on-primary">
              1
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-xs font-bold text-primary transition-colors hover:bg-surface-container-lowest">
              2
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-xs font-bold text-primary transition-colors hover:bg-surface-container-lowest">
              3
            </button>
            <span className="px-xs font-bold text-outline">...</span>
            <button className="flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-xs font-bold text-primary transition-colors hover:bg-surface-container-lowest">
              12
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-outline transition-colors hover:bg-surface-container-lowest">
              <Icon name="chevron_right" className="text-[18px]" />
            </button>
          </nav>
        </div>
      </section>
    </AppShell>
  );
}
