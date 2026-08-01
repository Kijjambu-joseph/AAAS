import { useEffect, useMemo, useState } from "react";
import { Icon, useSession } from "@/components/AppShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROLE_LABEL } from "@/lib/session";

export { Input, Label };

/* ---------------------------------- Modal --------------------------------- */

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  icon,
  tone = "primary",
  children,
  footer,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: string;
  tone?: "primary" | "error" | "secondary";
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const toneClasses =
    tone === "error"
      ? "bg-error-container text-on-error-container"
      : tone === "secondary"
        ? "bg-secondary-container text-on-secondary-container"
        : "bg-primary-fixed text-primary";

  const width = size === "sm" ? "max-w-[28rem]" : size === "lg" ? "max-w-3xl" : "max-w-[36rem]";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-md">
      <div
        className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-10 w-full ${width} overflow-hidden rounded-[10px] border border-outline-variant bg-surface-container-lowest shadow-2xl`}
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-md border-b border-outline-variant px-lg py-md">
          <div className="flex min-w-0 items-start gap-sm">
            {icon ? (
              <span className={`shrink-0 rounded-lg p-2 ${toneClasses}`}>
                <Icon name={icon} />
              </span>
            ) : null}
            <div className="min-w-0">
              <h3 className="truncate text-title-lg text-primary">{title}</h3>
              {subtitle ? (
                <p className="text-body-sm text-on-surface-variant">{subtitle}</p>
              ) : null}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="shrink-0 rounded-full p-1 text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            <Icon name="close" />
          </button>
        </div>
        {children ? <div className="max-h-[60vh] overflow-y-auto px-lg py-md">{children}</div> : null}
        {footer ? (
          <div className="flex flex-wrap justify-end gap-sm border-t border-outline-variant bg-surface-container-low px-lg py-md">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function Button({
  variant = "primary",
  icon,
  children,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "danger" | "gold";
  icon?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[10px] px-lg py-sm text-label-bold transition-all active:scale-[0.98] disabled:opacity-60";
  const variants: Record<string, string> = {
    primary: "bg-primary text-on-primary hover:opacity-90",
    outline:
      "border border-outline-variant bg-surface-container-lowest text-primary hover:bg-surface-container",
    ghost: "text-primary hover:bg-surface-container",
    danger: "bg-error text-on-error hover:opacity-90",
    gold: "bg-secondary-container text-on-secondary-container hover:opacity-90",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {icon ? <Icon name={icon} className="text-[18px]" /> : null}
      {children}
    </button>
  );
}

/* ------------------------------ Welcome banner ----------------------------- */

export function WelcomeBanner({
  name,
  role,
  message,
  stats,
  actions,
}: {
  name: string;
  role: string;
  message: string;
  stats?: { label: string; value: string }[];
  actions?: React.ReactNode;
}) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <section className="relative overflow-hidden rounded-xl bg-primary p-lg text-on-primary shadow-sm">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-secondary-container/20" />
      <div className="pointer-events-none absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-on-primary/5" />
      <div className="relative grid grid-cols-1 items-center gap-lg lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0">
          <p className="text-label-bold uppercase tracking-widest text-secondary-container">
            {greeting}, {role}
          </p>
          <h2 className="mt-1 truncate text-display-lg text-on-primary">{name}</h2>
          <p className="mt-xs max-w-2xl text-body-md text-on-primary/80">{message}</p>
          {actions ? <div className="mt-md flex flex-wrap gap-sm">{actions}</div> : null}
        </div>
        {stats?.length ? (
          <div className="grid grid-cols-2 gap-sm sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-on-primary/15 bg-on-primary/5 px-md py-sm"
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-on-primary/70">
                  {s.label}
                </p>
                <p className="text-headline-sm text-secondary-container">{s.value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------ Search + filter ---------------------------- */

export function useSearchFilter<T extends Record<string, unknown>>(
  rows: T[],
  keys: (keyof T)[],
  filterKey?: keyof T,
) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("ALL");

  const options = useMemo(() => {
    if (!filterKey) return [];
    return Array.from(new Set(rows.map((r) => String(r[filterKey]))));
  }, [rows, filterKey]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const matchQ =
        !q || keys.some((k) => String(r[k] ?? "").toLowerCase().includes(q));
      const matchF = !filterKey || filter === "ALL" || String(r[filterKey]) === filter;
      return matchQ && matchF;
    });
  }, [rows, keys, query, filter, filterKey]);

  return { query, setQuery, filter, setFilter, options, results };
}

export function Toolbar({
  query,
  onQuery,
  placeholder = "Search...",
  filter,
  onFilter,
  options,
  right,
}: {
  query: string;
  onQuery: (v: string) => void;
  placeholder?: string;
  filter?: string;
  onFilter?: (v: string) => void;
  options?: string[];
  right?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-sm sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
      <div className="flex min-w-0 flex-wrap items-center gap-sm">
        <div className="relative min-w-0 flex-1">
          <Icon
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant"
          />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-[10px] border border-outline-variant bg-surface-container-lowest py-2 pl-11 pr-4 text-body-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        {options?.length && onFilter ? (
          <select
            value={filter}
            onChange={(e) => onFilter(e.target.value)}
            className="rounded-[10px] border border-outline-variant bg-surface-container-lowest px-3 py-2 text-body-sm text-on-surface outline-none focus:border-primary"
          >
            <option value="ALL">All</option>
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        ) : null}
      </div>
      {right ? <div className="flex flex-wrap gap-sm">{right}</div> : null}
    </div>
  );
}

export function EmptyRow({ colSpan, label = "No matching records." }: { colSpan: number; label?: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-lg py-xl text-center text-body-sm text-on-surface-variant">
        {label}
      </td>
    </tr>
  );
}

/* --------------------------- Session-aware banner -------------------------- */

export function DashboardWelcome({
  message,
  stats,
  actions,
}: {
  message: string;
  stats?: { label: string; value: string }[];
  actions?: React.ReactNode;
}) {
  const { user } = useSession();
  if (!user) return null;
  return (
    <WelcomeBanner
      name={user.name}
      role={ROLE_LABEL[user.role]}
      message={message}
      stats={stats}
      actions={actions}
    />
  );
}
