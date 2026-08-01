import { AppShell, PageHeader, Icon } from "@/components/AppShell";
import { Button } from "@/components/ui-kit";
import { ROLE_LABEL, type Role } from "@/lib/session";

const SECTIONS = [
  { id: "profile", label: "Profile", icon: "person" },
];

export function SettingsPage({ role }: { role: Role }) {
  return (
    <AppShell searchPlaceholder="Search settings...">
      <PageHeader
        title="Settings"
        subtitle={`Workspace preferences for the ${ROLE_LABEL[role]} console.`}
        actions={
          <Button variant="outline" icon="lock">
            Profile is read-only
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav className="space-y-1 rounded-xl border border-outline-variant bg-surface-container-lowest p-sm">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className="flex w-full items-center gap-3 rounded-[10px] bg-primary px-4 py-3 text-label-bold text-on-primary"
            >
              <Icon name={s.icon} className="text-[20px]" />
              {s.label}
            </button>
          ))}
        </nav>

        <section className="space-y-lg rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <div className="space-y-md">
            <h3 className="text-title-lg text-primary">Profile details</h3>
            <p className="text-body-sm text-on-surface-variant">
              Profile information is managed centrally and cannot be edited by users.
            </p>
            <div className="grid grid-cols-1 gap-md md:grid-cols-2">
              <Field label="Full name" value="Officer name" />
              <Field label="Employee ID" value="EMP-004821" />
              <Field label="Branch" value="Kampala HQ" />
              <Field label="Work email" value="officer@centenarybank.co.ug" />
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block space-y-xs">
      <span className="text-label-bold uppercase text-on-surface-variant">{label}</span>
      <input
        value={value}
        readOnly
        aria-readonly="true"
        className="w-full cursor-not-allowed rounded-[10px] border border-outline-variant bg-surface-container px-4 py-3 text-body-md text-on-surface-variant outline-none"
      />
    </label>
  );
}
