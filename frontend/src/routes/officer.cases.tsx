import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, Icon } from "@/components/AppShell";

export const Route = createFileRoute("/officer/cases")({
  head: () => ({
    meta: [
      { title: "Case Progress & Document Vault | AAAS" },
      {
        name: "description",
        content:
          "Track recovery case milestones and manage the secure document vault for each borrower file.",
      },
      { property: "og:title", content: "Case Progress & Document Vault | AAAS" },
      { property: "og:description", content: "Milestones and secure documents per recovery case." },
    ],
  }),
  component: CaseProgressPage,
});

const STAGES = [
  { name: "Case Registered", done: true },
  { name: "Demand Notice Issued", done: true },
  { name: "Valuation Complete", done: true },
  { name: "Auctioneer Allocated", done: false },
  { name: "Notice of Sale", done: false },
  { name: "Liquidation & Closure", done: false },
];

const DOCS = [
  { name: "Notice of Sale", type: "PDF", size: "412 KB", status: "Pending" },
  { name: "Valuation Report", type: "PDF", size: "1.8 MB", status: "Verified" },
  { name: "Loan Agreement", type: "PDF", size: "740 KB", status: "Verified" },
  { name: "Title Deed Copy", type: "PDF", size: "2.4 MB", status: "Verified" },
];

function CaseProgressPage() {
  return (
    <AppShell>
      <PageHeader
        title="Case Progress"
        subtitle="CR-2041 — Kato Enterprises · Kampala Central"
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-primary px-lg py-sm text-label-bold text-on-primary hover:opacity-90">
            <Icon name="upload_file" className="text-[18px]" />
            Upload Document
          </button>
        }
      />

      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm">
        <h4 className="mb-6 text-title-lg text-primary">Recovery Milestones</h4>
        <div className="flex flex-wrap gap-4">
          {STAGES.map((s, i) => (
            <div key={s.name} className="flex flex-1 min-w-[160px] flex-col gap-2">
              <div
                className={
                  s.done ? "h-1.5 rounded-full bg-secondary-container" : "h-1.5 rounded-full bg-surface-container-high"
                }
              />
              <div className="flex items-center gap-2">
                <Icon
                  name={s.done ? "check_circle" : "radio_button_unchecked"}
                  className={s.done ? "text-[18px] text-secondary" : "text-[18px] text-outline"}
                />
                <span className="text-body-sm text-on-surface-variant">
                  {i + 1}. {s.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant p-lg">
          <h4 className="text-title-lg text-primary">Document Vault</h4>
          <span className="text-label-bold text-on-surface-variant">{DOCS.length} files</span>
        </div>
        <table className="w-full text-left">
          <thead className="bg-surface-container-low">
            <tr className="text-label-bold uppercase text-on-surface-variant">
              <th className="px-lg py-3">Document</th>
              <th className="px-lg py-3">Type</th>
              <th className="px-lg py-3">Size</th>
              <th className="px-lg py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {DOCS.map((d) => (
              <tr key={d.name} className="border-t border-outline-variant hover:bg-surface-container-low">
                <td className="flex items-center gap-2 px-lg py-4 text-body-md">
                  <Icon name="description" className="text-outline" />
                  {d.name}
                </td>
                <td className="px-lg py-4 text-mono-data text-on-surface-variant">{d.type}</td>
                <td className="px-lg py-4 text-mono-data text-on-surface-variant">{d.size}</td>
                <td className="px-lg py-4">
                  <span
                    className={
                      d.status === "Verified"
                        ? "rounded-full bg-success-container px-3 py-1 text-label-bold text-on-success-container"
                        : "rounded-full bg-secondary-fixed px-3 py-1 text-label-bold text-on-secondary-container"
                    }
                  >
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
