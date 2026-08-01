import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  ROLE_NAV,
  ROLE_LABEL,
  ROLE_HOME,
  clearSession,
  readSession,
  type SessionUser,
} from "@/lib/session";
import logoUrl from "@/assets/centenary-logo.png";

export const LOGO_URL = logoUrl;

export function useSession() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setUser(readSession());
    sync();
    setReady(true);
    window.addEventListener("aaas-session", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("aaas-session", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { user, ready };
}

export function Icon({ name, className = "" }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className}`}>{name}</span>;
}

export function BrandLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img
      src={LOGO_URL}
      alt="Centenary Bank"
      className={`${className} object-contain`}
      loading="lazy"
    />
  );
}

const NOTIFICATIONS = [
  {
    icon: "gavel",
    tone: "text-primary",
    title: "Auctioneer license expiring",
    body: "M. K. Ssekandi Auctioneers — license AUC-2023-44102 expires in 3 days.",
    time: "12 min ago",
  },
  {
    icon: "warning",
    tone: "text-error",
    title: "Allocation exception raised",
    body: "Case RECOV-2901-X could not be auto-allocated. Manual assignment required.",
    time: "48 min ago",
  },
  {
    icon: "task_alt",
    tone: "text-success",
    title: "Recovery completed",
    body: "Case CAS-092-21 closed with UGX 450M recovered.",
    time: "2 hrs ago",
  },
  {
    icon: "policy",
    tone: "text-secondary",
    title: "Compliance review due",
    body: "Quarterly audit pack for Q3 is awaiting your sign-off.",
    time: "Yesterday",
  },
];

interface AppShellProps {
  children: React.ReactNode;
  searchPlaceholder?: string;
}

export function AppShell({
  children,
  searchPlaceholder = "Search cases, auctioneers, or regions...",
}: AppShellProps) {
  const { user, ready } = useSession();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [search, setSearch] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ready && !user) navigate({ to: "/", replace: true });
  }, [ready, user, navigate]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!user) {
    return <div className="min-h-screen bg-background" />;
  }

  const home = ROLE_HOME[user.role];
  const settingsTo = `${home}/settings` as "/admin/settings";
  const supportTo = `${home}/support` as "/admin/support";
  const nav = ROLE_NAV[user.role];
  const results = search.trim()
    ? nav.filter((n) => n.label.toLowerCase().includes(search.trim().toLowerCase()))
    : [];

  return (
    <div className="min-h-screen bg-background text-on-surface">

      <aside className="fixed left-0 top-0 z-50 flex h-full w-60 flex-col bg-primary py-lg shadow-lg">

        <div className="mb-8 flex flex-col items-center gap-3 px-6">

          <BrandLogo className="h-20 w-20 shrink-0" />

          <div className="min-w-0">
            <h1 className="truncate text-[10px] tracking-wider text-white font-bold">
              Auto-Allocation Of Auctioneers System
            </h1>
            <p className="mt-0.5 text-center text-[10px] uppercase tracking-widest text-white opacity-80 font-bold">
              Centenary Bank
            </p>
          </div>

        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const active =
              item.to === pathname ||
              (item.to !== "/admin" &&
                item.to !== "/credit" &&
                item.to !== "/officer" &&
                pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={
                  active
                    ? "mx-2 my-1 flex scale-95 items-center gap-3 rounded-lg bg-secondary-container px-4 py-3 text-on-secondary-container transition-transform active:scale-90"
                    : "mx-2 my-1 flex items-center gap-3 rounded-lg px-4 py-3 text-white transition-all hover:bg-secondary-container hover:text-on-secondary-container active:scale-90"
                }
              >
                <Icon name={item.icon} />
                <span className="text-label-bold">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto space-y-1 border-t border-white/10 pt-lg">
          <Link
            to={supportTo}
            className="mx-2 my-1 flex items-center gap-3 rounded-lg px-4 py-3 text-white transition-all hover:bg-secondary-container hover:text-on-secondary-container"
          >
            <Icon name="help" />
            <span className="text-label-bold">Support</span>
          </Link>
          <button
            onClick={() => setLogoutOpen(true)}
            className="mx-2 my-1 flex w-[calc(100%-1rem)] items-center gap-3 rounded-lg px-4 py-3 text-white transition-all hover:bg-secondary-container hover:text-on-secondary-container"
          >
            <Icon name="logout" />
            <span className="text-label-bold">Sign Out</span>
          </button>
        </div>
      </aside>

      <header className="fixed left-56 top-0 z-40 flex h-16 w-[calc(100%-14rem)] items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-lg">
        <div className="flex px-8 min-w-0 items-center gap-4">
          <BrandLogo className="h-8 w-8 shrink-0" />
          <div className="relative w-96 max-w-[40vw]">
            <Icon
              name="search"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-outline-variant bg-surface-container-low py-2 pl-11 pr-4 text-body-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder={searchPlaceholder}
              type="text"
            />
            {results.length ? (
              <div className="absolute left-0 top-11 z-50 w-full overflow-hidden rounded-[10px] border border-outline-variant bg-surface-container-lowest shadow-xl">
                {results.map((r) => (
                  <Link
                    key={r.to}
                    to={r.to}
                    onClick={() => setSearch("")}
                    className="flex items-center gap-3 px-4 py-3 text-body-sm hover:bg-surface-container"
                  >
                    <Icon name={r.icon} className="text-[18px] text-primary" />
                    {r.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setNotifOpen(true)}
            aria-label="Notifications"
            className="relative rounded-full p-1 text-on-surface-variant transition-colors hover:text-primary"
          >
            <Icon name="notifications" />
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-error text-[9px] font-bold text-on-error">
              {NOTIFICATIONS.length}
            </span>
          </button>
          <Link
            to={settingsTo}
            aria-label="Settings"
            className="rounded-full p-1 text-on-surface-variant transition-colors hover:text-primary"
          >
            <Icon name="settings" />
          </Link>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full py-1 pl-3 pr-1 transition-colors hover:bg-surface-container"
            >
              <div className="hidden text-right sm:block">
                <p className="text-label-bold text-primary">{ROLE_LABEL[user.role]}</p>
                <p className="text-[11px] text-on-surface-variant">{user.name}</p>
              </div>
              <div className="h-8 w-8 overflow-hidden rounded-full border border-outline-variant">
                <img className="h-full w-full object-cover" src={user.avatar} alt={user.name} />
              </div>
            </button>

            {menuOpen ? (
              <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-[10px] border border-outline-variant bg-surface-container-lowest shadow-2xl">
                <div className="flex items-center gap-3 border-b border-outline-variant bg-surface-container-low px-4 py-3">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={user.avatar}
                    alt={user.name}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-label-bold text-primary">{user.name}</p>
                    <p className="truncate text-[11px] text-on-surface-variant">
                      {ROLE_LABEL[user.role]}
                    </p>
                  </div>
                </div>
                <Link
                  to={settingsTo}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-body-sm hover:bg-surface-container"
                >
                  <Icon name="manage_accounts" className="text-[20px] text-primary" />
                  Profile &amp; Settings
                </Link>
                <Link
                  to={supportTo}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-body-sm hover:bg-surface-container"
                >
                  <Icon name="support_agent" className="text-[20px] text-primary" />
                  Help &amp; Support
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setLogoutOpen(true);
                  }}
                  className="flex w-full items-center gap-3 border-t border-outline-variant px-4 py-3 text-body-sm text-error hover:bg-error-container/40"
                >
                  <Icon name="logout" className="text-[20px]" />
                  Sign Out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <main className="ml-56 mt-16 p-xl">
        <div className="mx-auto max-w-container-max space-y-lg">{children}</div>
      </main>

      {/* Notifications modal */}
      {notifOpen ? (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-md pt-24">
          <div
            className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]"
            onClick={() => setNotifOpen(false)}
          />
          <div className="relative z-10 w-full max-w-[32rem] overflow-hidden rounded-[10px] border border-outline-variant bg-surface-container-lowest shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant px-lg py-md">
              <div className="flex items-center gap-sm">
                <Icon name="notifications_active" className="text-primary" />
                <h3 className="text-title-lg text-primary">Notifications</h3>
              </div>
              <button
                onClick={() => setNotifOpen(false)}
                aria-label="Close notifications"
                className="rounded-full p-1 text-on-surface-variant hover:bg-surface-container"
              >
                <Icon name="close" />
              </button>
            </div>
            <div className="max-h-[50vh] divide-y divide-outline-variant overflow-y-auto">
              {NOTIFICATIONS.map((n) => (
                <div key={n.title} className="flex gap-3 px-lg py-md hover:bg-surface-container-low">
                  <Icon name={n.icon} className={`mt-0.5 shrink-0 ${n.tone}`} />
                  <div className="min-w-0">
                    <p className="text-label-bold text-on-surface">{n.title}</p>
                    <p className="text-body-sm text-on-surface-variant">{n.body}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-outline">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between border-t border-outline-variant bg-surface-container-low px-lg py-sm">
              <button
                onClick={() => setNotifOpen(false)}
                className="text-label-bold text-primary hover:underline"
              >
                MARK ALL AS READ
              </button>
              <button
                onClick={() => setNotifOpen(false)}
                className="text-label-bold text-on-surface-variant hover:underline"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Logout modal */}
      {logoutOpen ? (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-md">
          <div
            className="absolute inset-0 bg-primary/50 backdrop-blur-[2px]"
            onClick={() => setLogoutOpen(false)}
          />
          <div className="relative z-10 w-full max-w-[28rem] overflow-hidden rounded-[10px] border border-outline-variant bg-surface-container-lowest shadow-2xl">
            <div className="flex flex-col items-center gap-sm px-lg py-lg text-center">
              <BrandLogo className="h-12 w-12" />
              <h3 className="text-title-lg text-primary">Sign out of AAAS?</h3>
              <p className="text-body-sm text-on-surface-variant">
                You are signed in as <strong>{user.name}</strong> ({ROLE_LABEL[user.role]}). Any
                unsaved work on this workstation will be discarded.
              </p>
            </div>
            <div className="flex justify-end gap-sm border-t border-outline-variant bg-surface-container-low px-lg py-md">
              <button
                onClick={() => setLogoutOpen(false)}
                className="rounded-[10px] border border-outline-variant px-lg py-sm text-label-bold text-primary hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearSession();
                  navigate({ to: "/", replace: true });
                }}
                className="rounded-[10px] bg-error px-lg py-sm text-label-bold text-on-error hover:opacity-90"
              >
                Yes, sign out
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
      <div className="min-w-0">
        <h2 className="text-display-lg text-primary">{title}</h2>
        {subtitle ? <p className="text-body-md text-on-surface-variant">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-sm">{actions}</div> : null}
    </div>
  );
}
