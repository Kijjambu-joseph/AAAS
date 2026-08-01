import { useEffect, useState } from "react";
import { Icon } from "@/components/AppShell";
import { getEnforcementStatus, type EnforcementStatus } from "@/lib/allocation-engine";

interface EnforcementStatusBadgeProps {
  caseId: number;
  className?: string;
}

function getTone(status: EnforcementStatus | null) {
  if (!status) return "bg-surface-container text-on-surface-variant";
  if (status.auto_is_mandatory) return "bg-error-container text-on-error-container";
  if (status.manual_requires_dry_run) return "bg-secondary-container text-on-secondary-container";
  return "bg-primary-container text-on-primary-container";
}

function getLabel(status: EnforcementStatus | null) {
  if (!status) return "Enforcement unavailable";
  if (status.auto_is_mandatory) return "Automatic required";
  if (status.manual_requires_dry_run) return "Manual needs preview";
  if (status.auto_is_default) return "Auto allocation enabled";
  return "Allocation rules loaded";
}

export function EnforcementStatusBadge({ caseId, className = "" }: EnforcementStatusBadgeProps) {
  const [status, setStatus] = useState<EnforcementStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      const response = await getEnforcementStatus(caseId);
      if (active) {
        setStatus(response);
        setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [caseId]);

  const tone = getTone(status);
  const iconName = loading ? "hourglass_empty" : status?.auto_is_mandatory ? "lock" : status?.manual_requires_dry_run ? "schedule" : "verified";

  return (
    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold ${tone} ${className}`}>
      <Icon name={iconName} className="text-[14px]" />
      <span>{loading ? "Loading allocation rules" : getLabel(status)}</span>
    </div>
  );
}