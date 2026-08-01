import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Icon } from "@/components/AppShell";

export const Route = createFileRoute("/admin/audit")({
  component: AuditLogsPage,
  head: () => ({
    meta: [
      { title: "System Audit Logs | Centenary Bank Recovery" },
      {
        name: "description",
        content: "Review append-only system audit logs including manual overrides, logins, and configuration changes with signature verification.",
      },
      { property: "og:title", content: "System Audit Logs | Centenary Bank Recovery" },
      {
        property: "og:description",
        content: "Review append-only system audit logs including manual overrides, logins, and configuration changes with signature verification.",
      },
    ],
  }),
});

interface AuditRow {
  ts: string;
  user: string;
  action: string;
  badgeClass: string;
  icon?: string;
  ip: string;
  terminal: string;
  desc: string;
  descClass: string;
  highRisk?: boolean;
}

const rows: AuditRow[] = [
  
  {
    ts: "2023-10-27 13:58:45",
    user: "REC-204",
    action: "CASE CREATED",
    badgeClass: "bg-primary-container/10 text-on-primary-container",
    ip: "10.12.44.15",
    terminal: "CENT-TERM-09",
    desc: "New case record initialized for Client: 'Kato Services Ltd'. Case ID: REC-9002.",
    descClass: "text-on-surface-variant italic",
  },
  {
    ts: "2023-10-27 13:45:12",
    user: "ADM-001",
    action: "LOGIN",
    badgeClass: "bg-secondary-container/20 text-on-secondary-container",
    ip: "192.168.1.1",
    terminal: "CENT-HQ-01",
    desc: "Successful authentication via Kerberos. Session ID: SX8821.",
    descClass: "text-on-surface-variant italic",
  },
  {
    ts: "2023-10-27 13:10:05",
    user: "REC-312",
    action: "DOC_UPLOAD",
    badgeClass: "bg-outline-variant/30 text-on-surface-variant",
    ip: "10.12.44.89",
    terminal: "CENT-TERM-12",
    desc: "Uploaded 'CourtOrder_Final_992.pdf' to Vault. MD5 Hash verified.",
    descClass: "text-on-surface-variant italic",
  },
  {
    ts: "2023-10-27 12:55:33",
    user: "ADM-004",
    action: "DATA DELETION",
    badgeClass: "bg-error-container text-on-error-container",
    icon: "warning",
    ip: "10.12.44.102",
    terminal: "CENT-TERM-02",
    desc: "Deleted draft allocation queue from 2023-10-26.",
    descClass: "text-error font-medium",
    highRisk: true,
  },
  {
    ts: "2023-10-27 12:40:01",
    user: "REC-204",
    action: "SESSION_REFRESH",
    badgeClass: "bg-primary-container/10 text-on-primary-container",
    ip: "10.12.44.15",
    terminal: "CENT-TERM-09",
    desc: "User session extended by 30m.",
    descClass: "text-on-surface-variant italic",
  },
  {
    ts: "2023-10-27 12:15:22",
    user: "ADM-001",
    action: "CFG_CHANGE",
    badgeClass: "bg-primary-container/10 text-on-primary-container",
    ip: "192.168.1.1",
    terminal: "CENT-HQ-01",
    desc: "Updated 'Max_Auction_Window' from 14 to 21 days.",
    descClass: "text-on-surface-variant italic",
  },
  {
    ts: "2023-10-27 11:59:58",
    user: "SYSTEM",
    action: "AUTO_ARCHIVE",
    badgeClass: "bg-surface-variant text-on-surface-variant",
    ip: "LOCAL_SVR",
    terminal: "SVR-CORE-01",
    desc: "Successfully archived 1,402 logs from September 2023.",
    descClass: "text-on-surface-variant italic",
  },
];

function AuditLogsPage() {
  const [detail, setDetail] = useState<AuditRow | null>(null);

  return (
    <AppShell searchPlaceholder="Search system events...">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-display-lg text-primary">System Audit Logs</h2>
          <div className="mt-2 flex items-center space-x-3">
            <span className="inline-flex items-center rounded bg-on-primary-fixed-variant px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-on-primary">
              <Icon name="security" className="mr-1 text-[14px]" />
              Audit Integrity: Append-Only
            </span>
            <span className="flex items-center text-body-sm text-outline">
              <Icon name="schedule" className="mr-1 text-[16px]" />
              Last Verified: 2 minutes ago
            </span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2 text-body-md font-bold text-on-surface transition-all hover:bg-surface-container">
            <Icon name="download" className="mr-2" />
            Export Ledger
          </button>
          <button className="flex items-center rounded-lg bg-primary px-4 py-2 text-body-md font-bold text-on-primary shadow-sm transition-all hover:opacity-90">
            <Icon name="verified_user" className="mr-2" />
            Verify Signatures
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-sm">
        <div className="grid grid-cols-1 gap-md md:grid-cols-5">
          <div className="space-y-1">
            <label className="text-label-bold uppercase text-outline">User ID</label>
            <select className="w-full rounded border border-outline-variant bg-surface-container-low p-2 text-body-sm focus:border-primary focus:ring-primary">
              <option>All Users</option>
              <option>ADM-001 (Administrator)</option>
              <option>REC-204 (Officer)</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-label-bold uppercase text-outline">Event Type</label>
            <select className="w-full rounded border border-outline-variant bg-surface-container-low p-2 text-body-sm focus:ring-primary">
              <option>All Events</option>
              <option>Manual Override</option>
              <option>Case Created</option>
              <option>Terminal Login</option>
              <option>Data Export</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-label-bold uppercase text-outline">Date Range</label>
            <div className="flex items-center rounded border border-outline-variant bg-surface-container-low px-2">
              <Icon name="calendar_today" className="text-[18px] text-outline" />
              <input
                className="w-full border-none bg-transparent py-2 text-body-sm focus:ring-0"
                type="text"
                defaultValue="Oct 20 - Oct 27, 2023"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-label-bold uppercase text-outline">IP Address</label>
            <input
              className="w-full rounded border border-outline-variant bg-surface-container-low p-2 text-body-sm focus:ring-primary"
              placeholder="192.168.x.x"
              type="text"
            />
          </div>
          <div className="flex items-end">
            <button className="flex w-full items-center justify-center rounded bg-surface-container-high py-2 font-bold text-primary transition-all hover:bg-surface-variant">
              <Icon name="filter_list" className="mr-2" />
              Apply Filters
            </button>
          </div>
        </div>
      </section>

      {/* Audit Table */}
      <section className="flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="sticky top-0 z-10 bg-surface-container-high">
              <tr>
                <th className="border-b border-outline-variant px-lg py-4 text-label-bold text-on-surface-variant">
                  Timestamp (UTC)
                </th>
                <th className="border-b border-outline-variant px-md py-4 text-label-bold text-on-surface-variant">
                  User ID
                </th>
                <th className="border-b border-outline-variant px-md py-4 text-label-bold text-on-surface-variant">
                  Action Type
                </th>
                <th className="border-b border-outline-variant px-md py-4 text-label-bold text-on-surface-variant">
                  IP Address
                </th>
                <th className="border-b border-outline-variant px-md py-4 text-label-bold text-on-surface-variant">
                  Terminal
                </th>
                <th className="border-b border-outline-variant px-lg py-4 text-label-bold text-on-surface-variant">
                  Event Description (State Delta)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-body-sm">
              {rows.map((r, i) => (
                <tr
                  key={i}
                  className={`${r.highRisk ? "bg-error-container/10 cursor-pointer" : ""} ${
                    i % 2 === 0 ? "" : "bg-surface-container-low/40"
                  } transition-colors hover:bg-surface-container-low`}
                  onClick={() => {
                    if (r.highRisk) setDetail(r);
                  }}
                >
                  <td className="px-lg py-3 text-mono-data text-outline">{r.ts}</td>
                  <td className="px-md py-3 font-bold text-primary">{r.user}</td>
                  <td className="px-md py-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold ${r.badgeClass}`}>
                      {r.icon && <Icon name={r.icon} className="mr-1 text-[14px]" />}
                      {r.action}
                    </span>
                  </td>
                  <td className="px-md py-3 text-mono-data">{r.ip}</td>
                  <td className="px-md py-3 text-mono-data">{r.terminal}</td>
                  <td className={`px-lg py-3 ${r.desc.length > 60 ? "max-w-[20rem] truncate" : ""} ${r.descClass}`}>
                    {r.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-outline-variant bg-surface-container-high px-lg py-4">
          <div className="flex items-center space-x-6">
            <span className="text-body-sm text-on-surface-variant">Showing 8 of 14,921 entries</span>
            <div className="flex items-center text-body-sm font-bold text-primary">
              <Icon name="verified" className="mr-1 text-[18px] text-on-secondary-container" />
              Log Signature: Valid (SHA-512 Secure)
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="rounded border border-outline-variant p-1.5 hover:bg-surface-container-highest disabled:opacity-30">
              <Icon name="chevron_left" />
            </button>
            <button className="rounded bg-primary px-3 py-1 text-xs font-bold text-on-primary">1</button>
            <button className="rounded px-3 py-1 text-xs font-bold hover:bg-surface-container-highest">2</button>
            <button className="rounded px-3 py-1 text-xs font-bold hover:bg-surface-container-highest">3</button>
            <button className="rounded border border-outline-variant p-1.5 hover:bg-surface-container-highest">
              <Icon name="chevron_right" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer Export Controls */}
      <footer className="flex items-center justify-between border-t border-outline-variant pt-lg">
        <div className="flex items-center font-bold text-on-surface-variant">
              <p>
                &copy; 2026 Centenary Bank. All Rights Reserved.
              </p>
        </div>

        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase text-outline">Export for Auditors:</span>
            <button className="flex items-center rounded border border-outline-variant bg-surface-container-lowest px-3 py-1.5 text-body-sm font-bold transition-colors hover:bg-surface-container">
              <Icon name="policy" className="mr-1 text-[16px]" />
              Internal Audit (PDF)
            </button>
            <button className="flex items-center rounded border border-outline-variant bg-surface-container-lowest px-3 py-1.5 text-body-sm font-bold transition-colors hover:bg-surface-container">
              <Icon name="account_balance" className="mr-1 text-[16px]" />
              BoU Regulatory (XLSX)
            </button>
          </div>
        </div>

      </footer>

      {/* Detail Modal */}
      {detail && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/20 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-2xl">
            <div className="flex items-center justify-between bg-primary px-lg py-4 text-on-primary">
              <h3 className="text-title-lg font-bold">Event Log Details</h3>
              <button className="hover:opacity-70" onClick={() => setDetail(null)}>
                <Icon name="close" />
              </button>
            </div>
            <div className="space-y-md p-lg">
              <div className="grid grid-cols-2 gap-md">
                <div>
                  <p className="text-[10px] font-bold uppercase text-outline">Sequence ID</p>
                  <p className="text-mono-data">#88219-X8</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-outline">Action ID</p>
                  <p className="text-mono-data">OVERRIDE_44921</p>
                </div>
              </div>
              <div className="rounded border border-outline-variant bg-surface-container-low p-md">
                <p className="mb-2 text-[10px] font-bold uppercase text-outline">State Delta (JSON)</p>
                <pre className="whitespace-pre-wrap text-[12px] font-medium text-primary">{`{
  "before": { "auctioneer_id": "A442", "status": "PENDING" },
  "after": { "auctioneer_id": "A550", "status": "ALLOCATED" },
  "metadata": { "reason": "Expedited by legal request", "ref": "LEG-022" }
}`}</pre>
              </div>
              <div className="flex items-center rounded border border-error/20 bg-error-container/20 p-md">
                <Icon name="gpp_maybe" className="mr-3 text-error" />
                <div>
                  <p className="text-xs font-bold text-error">Warning: Manual Override Policy</p>
                  <p className="text-[11px] text-on-error-container">
                    This action bypassed the automated allocation engine. Review is required by executive audit
                    within 24 hours.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 border-t border-outline-variant bg-surface-container px-lg py-4">
              <button className="px-4 py-2 text-body-md font-bold text-primary" onClick={() => setDetail(null)}>
                Dismiss
              </button>
              <button className="rounded bg-primary px-4 py-2 text-body-md font-bold text-on-primary">
                Print Record
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
