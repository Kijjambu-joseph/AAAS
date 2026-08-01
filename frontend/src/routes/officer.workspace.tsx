import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader, Icon } from "@/components/AppShell";
import { Modal } from "@/components/ui-kit";

export const Route = createFileRoute("/officer/workspace")({
  head: () => ({
    meta: [
      { title: "Loan Officer Workspace | AAAS System" },
      {
        name: "description",
        content:
          "Daily workspace for loan officers: assigned recovery cases, pending actions and borrower follow-ups.",
      },
      { property: "og:title", content: "Loan Officer Workspace | AAAS System" },
      { property: "og:description", content: "Assigned cases, pending actions and follow-ups." },
    ],
  }),
  component: WorkspacePage,
});

const TASKS = [
  { id: "CR-2041", client: "Kato Enterprises", action: "Upload demand notice", due: "Today", tone: "error" },
  { id: "CR-2038", client: "Nabirye Holdings", action: "Confirm valuation report", due: "Tomorrow", tone: "warning" },
  { id: "CR-2029", client: "Ssemwanga Farms", action: "Borrower site visit", due: "3 days", tone: "muted" },
  { id: "CR-2017", client: "Lira Traders Ltd", action: "Submit for allocation", due: "5 days", tone: "muted" },
];

function WorkspacePage() {
  const [selectedTask, setSelectedTask] = useState<typeof TASKS[0] | null>(null);
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  return (
    <AppShell>
      <PageHeader
        title="My Workspace"
        subtitle="Assigned recovery files and outstanding actions."
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-primary px-lg py-sm text-label-bold text-on-primary hover:opacity-90">
            <Icon name="add_circle" className="text-[18px]" />
            New Case File
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-md md:grid-cols-3">
        {[
          { label: "Assigned Cases", value: "24", icon: "folder_managed" },
          { label: "Pending Actions", value: "7", icon: "pending_actions" },
          { label: "Portfolio Value", value: "UGX 2.1B", icon: "payments" },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm"
          >
            <div className="w-fit rounded-lg bg-primary-fixed p-2">
              <Icon name={k.icon} className="text-primary" />
            </div>
            <p className="mt-4 text-label-bold uppercase tracking-wider text-on-surface-variant">
              {k.label}
            </p>
            <h3 className="mt-1 text-display-lg">{k.value}</h3>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant p-lg">
          <h4 className="text-title-lg text-primary">Action Queue</h4>
          <span className="text-label-bold text-on-surface-variant">{TASKS.length} items</span>
        </div>
        <table className="w-full text-left">
          <thead className="bg-surface-container-low">
            <tr className="text-label-bold uppercase text-on-surface-variant">
              <th className="px-lg py-3">Case ID</th>
              <th className="px-lg py-3">Client</th>
              <th className="px-lg py-3">Required Action</th>
              <th className="px-lg py-3">Due</th>
            </tr>
          </thead>
          <tbody>
            {TASKS.map((t) => (
              <tr key={t.id} className="border-t border-outline-variant hover:bg-surface-container-low cursor-pointer transition-colors" onClick={() => { setSelectedTask(t); setTaskModalOpen(true); }}>
                <td className="px-lg py-4 text-mono-data text-primary">{t.id}</td>
                <td className="px-lg py-4 text-body-md">{t.client}</td>
                <td className="px-lg py-4 text-body-md text-on-surface-variant">{t.action}</td>
                <td className="px-lg py-4">
                  <span
                    className={
                      t.tone === "error"
                        ? "rounded-full bg-error-container px-3 py-1 text-label-bold text-on-error-container"
                        : t.tone === "warning"
                          ? "rounded-full bg-secondary-fixed px-3 py-1 text-label-bold text-on-secondary-container"
                          : "rounded-full bg-surface-container-high px-3 py-1 text-label-bold text-on-surface-variant"
                    }
                  >
                    {t.due}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={taskModalOpen && selectedTask !== null}
        onClose={() => { setTaskModalOpen(false); setSelectedTask(null); }}
        title={selectedTask ? `Action Required: ${selectedTask.id}` : "Task Details"}
        subtitle={selectedTask ? selectedTask.client : ""}
        icon="task_alt"
        tone={selectedTask?.tone === "error" ? "error" : selectedTask?.tone === "warning" ? "secondary" : "primary"}
        size="md"
        footer={
          <div className="flex justify-between gap-3">
            <button className="px-md py-2 border border-error rounded-lg text-error text-label-bold hover:bg-error/10 transition-colors" onClick={() => { setTaskModalOpen(false); setSelectedTask(null); }}>
              Defer
            </button>
            <div className="flex gap-2">
              <button className="px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors">
                Edit Task
              </button>
              <button className="px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md">
                Mark Complete
              </button>
            </div>
          </div>
        }
      >
        {selectedTask && (
          <div className="space-y-4">
            <div className="rounded-lg bg-surface-container-low p-4 border border-outline-variant">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-label-bold text-on-surface-variant uppercase text-xs">Case ID</p>
                  <p className="text-body-md text-primary font-bold mt-1">{selectedTask.id}</p>
                </div>
                <div>
                  <p className="text-label-bold text-on-surface-variant uppercase text-xs">Due Date</p>
                  <p className={`text-body-md font-bold mt-1 ${selectedTask.tone === "error" ? "text-error" : selectedTask.tone === "warning" ? "text-secondary" : "text-primary"}`}>
                    {selectedTask.due}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-label-bold text-on-surface-variant uppercase text-xs mb-2">Required Action</p>
              <p className="text-body-md text-on-surface">{selectedTask.action}</p>
            </div>

            <div>
              <p className="text-label-bold text-on-surface-variant uppercase text-xs mb-2">Client</p>
              <p className="text-body-md text-on-surface">{selectedTask.client}</p>
            </div>

            <div>
              <p className="text-label-bold text-on-surface mb-3 uppercase">Priority Level</p>
              <div className={`p-3 rounded-lg border ${selectedTask.tone === "error" ? "bg-error-container/20 border-error/30" : selectedTask.tone === "warning" ? "bg-secondary-container/20 border-secondary-container/30" : "bg-primary/5 border-primary/10"}`}>
                <p className={`text-label-bold ${selectedTask.tone === "error" ? "text-error" : selectedTask.tone === "warning" ? "text-secondary" : "text-primary"}`}>
                  {selectedTask.tone === "error" ? "URGENT - Due Today" : selectedTask.tone === "warning" ? "HIGH - Due Soon" : "STANDARD - Due Later"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-label-bold text-on-surface mb-3 uppercase">Notes</p>
              <textarea className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-sm focus:ring-2 focus:ring-primary focus:border-transparent" rows={3} placeholder="Add notes about this action..." />
            </div>
          </div>
        )}
      </Modal>
    </AppShell>
  );
}
