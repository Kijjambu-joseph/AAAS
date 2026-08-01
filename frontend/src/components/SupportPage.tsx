import { useState } from "react";
import { AppShell, PageHeader, Icon } from "@/components/AppShell";
import { Button, Modal, Toolbar, useSearchFilter } from "@/components/ui-kit";
import { ROLE_LABEL, type Role } from "@/lib/session";

const ARTICLES = [
  {
    title: "How auto-allocation scoring works",
    category: "Allocation",
    body: "Cases are ranked on regional proximity (35%), historical recovery rate (30%), current caseload (20%) and licence standing (15%).",
  },
  {
    title: "Resolving an unallocated exception",
    category: "Allocation",
    body: "Open the exception row, review the reason code, then assign a qualified auctioneer manually and record the justification.",
  },
  {
    title: "Uploading valuation and demand documents",
    category: "Cases",
    body: "Documents must be PDF, under 10MB and named with the case reference. Uploads are logged to the audit trail.",
  },
  {
    title: "Renewing an auctioneer licence record",
    category: "Auctioneers",
    body: "Update the licence expiry date and attach the renewal certificate; the auctioneer becomes eligible for allocation again once approved.",
  },
  {
    title: "Reading the compliance audit log",
    category: "Compliance",
    body: "Every entry shows the actor, action, affected record and timestamp in plain language. Entries cannot be edited or deleted.",
  },
  {
    title: "Requesting additional system access",
    category: "Account",
    body: "Access changes are approved by the Super Admin. Submit a ticket describing the module and the business justification.",
  },
];

export function SupportPage({ role }: { role: Role }) {
  const { query, setQuery, filter, setFilter, options, results } = useSearchFilter(
    ARTICLES,
    ["title", "body", "category"],
    "category",
  );
  const [ticketOpen, setTicketOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [article, setArticle] = useState<(typeof ARTICLES)[number] | null>(null);

  return (
    <AppShell searchPlaceholder="Search help articles...">
      <PageHeader
        title="Help & Support"
        subtitle={`Guides, contacts and ticketing for the ${ROLE_LABEL[role]} console.`}
        actions={
          <>
            <Button variant="outline" icon="call">
              Call IT desk
            </Button>
            <Button icon="confirmation_number" onClick={() => setTicketOpen(true)}>
              Raise a ticket
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-md md:grid-cols-3">
        {[
          { icon: "support_agent", title: "Service desk", note: "Mon–Sat, 07:00–21:00 EAT", value: "+256 312 202 000" },
          { icon: "mail", title: "Email support", note: "Response within 4 working hours", value: "aaas.support@centenarybank.co.ug" },
          { icon: "emergency", title: "Critical incidents", note: "Recovery engine outages only", value: "Ext. 4477" },
        ].map((c) => (
          <div
            key={c.title}
            className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg"
          >
            <span className="inline-flex rounded-lg bg-primary-fixed p-2 text-primary">
              <Icon name={c.icon} />
            </span>
            <p className="mt-md text-title-lg text-primary">{c.title}</p>
            <p className="text-body-sm text-on-surface-variant">{c.note}</p>
            <p className="mt-xs text-body-md font-semibold text-on-surface">{c.value}</p>
          </div>
        ))}
      </div>

      <section className="space-y-md rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
        <div className="flex items-center gap-sm">
          <Icon name="menu_book" className="text-primary" />
          <h3 className="text-title-lg text-primary">Knowledge base</h3>
        </div>
        <Toolbar
          query={query}
          onQuery={setQuery}
          filter={filter}
          onFilter={setFilter}
          options={options}
          placeholder="Search guides by keyword..."
        />
        <div className="grid grid-cols-1 gap-md md:grid-cols-2">
          {results.map((a) => (
            <button
              key={a.title}
              onClick={() => setArticle(a)}
              className="rounded-[10px] border border-outline-variant p-md text-left transition-colors hover:border-primary hover:bg-surface-container-low"
            >
              <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary">
                {a.category}
              </span>
              <p className="mt-1 text-body-md font-semibold text-on-surface">{a.title}</p>
              <p className="mt-1 line-clamp-2 text-body-sm text-on-surface-variant">{a.body}</p>
            </button>
          ))}
          {!results.length ? (
            <p className="text-body-sm text-on-surface-variant">No articles match your search.</p>
          ) : null}
        </div>
      </section>

      <Modal
        open={!!article}
        onClose={() => setArticle(null)}
        title={article?.title ?? ""}
        subtitle={article?.category}
        icon="article"
        footer={
          <>
            <Button variant="outline" onClick={() => setArticle(null)}>
              Close
            </Button>
            <Button
              icon="confirmation_number"
              onClick={() => {
                setArticle(null);
                setTicketOpen(true);
              }}
            >
              Still need help
            </Button>
          </>
        }
      >
        <p className="text-body-md text-on-surface-variant">{article?.body}</p>
      </Modal>

      <Modal
        open={ticketOpen}
        onClose={() => setTicketOpen(false)}
        title="Raise a support ticket"
        subtitle="Our service desk responds within 4 working hours."
        icon="confirmation_number"
        footer={
          <>
            <Button variant="outline" onClick={() => setTicketOpen(false)}>
              Cancel
            </Button>
            <Button
              icon="send"
              onClick={() => {
                setTicketOpen(false);
                setSent(true);
              }}
            >
              Submit ticket
            </Button>
          </>
        }
      >
        <div className="space-y-md">
          <label className="block space-y-xs">
            <span className="text-label-bold uppercase text-on-surface-variant">Subject</span>
            <input
              placeholder="Short summary of the issue"
              className="w-full rounded-[10px] border border-outline-variant bg-surface-container px-4 py-3 text-body-md outline-none focus:border-primary"
            />
          </label>
          <label className="block space-y-xs">
            <span className="text-label-bold uppercase text-on-surface-variant">Priority</span>
            <select className="w-full rounded-[10px] border border-outline-variant bg-surface-container px-4 py-3 text-body-md outline-none focus:border-primary">
              <option>Normal</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </label>
          <label className="block space-y-xs">
            <span className="text-label-bold uppercase text-on-surface-variant">Description</span>
            <textarea
              rows={4}
              placeholder="Describe what happened, including case references."
              className="w-full rounded-[10px] border border-outline-variant bg-surface-container px-4 py-3 text-body-md outline-none focus:border-primary"
            />
          </label>
        </div>
      </Modal>

      <Modal
        open={sent}
        onClose={() => setSent(false)}
        title="Ticket submitted"
        subtitle="Reference SD-2291"
        icon="task_alt"
        footer={<Button onClick={() => setSent(false)}>Done</Button>}
      >
        <p className="text-body-sm text-on-surface-variant">
          The service desk has your request and will contact you on your work email.
        </p>
      </Modal>
    </AppShell>
  );
}
