export type Role = "super-admin" | "credit-officer" | "loan-officer";

export interface SessionUser {
  role: Role;
  name: string;
  title: string;
  avatar: string;
}

export const ROLE_LABEL: Record<Role, string> = {
  "super-admin": "Super Admin",
  "credit-officer": "Credit Officer",
  "loan-officer": "Loan Officer",
};

export const AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCdh0izp6zCUt-68fDJqipBTdvIpFPJMVTp0LOrFoZXZyTkxTG4jhmt0ZBJciimouBhyLA7pVpOr8rTqg7tJHnzJyJwS2DvRjHP_I2EFEbSSZhCTxjQZrgHY1nv9qEz5LrkJQXbNxJBtEu_gRsufNhucDGohTWaxrdu1XxNseibvPfpP_88MwS_0ieWW3_s_FVhDnNrg_al1Hz1Sq8IAkt3YxjSh83rJ3bWrXpjD7UNJkVkCATHjXI9RBzgOlJhyI5EzJKhhZ1fPIsA";

export const DEFAULT_USERS: Record<Role, SessionUser> = {
  "super-admin": {
    role: "super-admin",
    name: "Kijjambu Joseph",
    title: "Super Admin",
    avatar: AVATAR,
  },
  "credit-officer": {
    role: "credit-officer",
    name: "A. Nakato",
    title: "Credit Officer",
    avatar: AVATAR,
  },
  "loan-officer": {
    role: "loan-officer",
    name: "J. Okello",
    title: "Loan Officer",
    avatar: AVATAR,
  },
};

export interface NavItem {
  label: string;
  icon: string;
  to: string;
}

export const ROLE_NAV: Record<Role, NavItem[]> = {
  "super-admin": [
    { label: "Dashboard", icon: "dashboard", to: "/admin" },
    { label: "Case Registry", icon: "inventory_2", to: "/admin/cases" },
    { label: "Auctioneer Panel", icon: "gavel", to: "/admin/auctioneers" },
    { label: "Allocation Queue", icon: "queue", to: "/admin/allocation" },
    { label: "Transaction Limits", icon: "account_balance", to: "/admin/transaction-limits" },
    { label: "Reports", icon: "assessment", to: "/admin/reports" },
    { label: "Audit Logs", icon: "history", to: "/admin/audit" },
  ],
  "credit-officer": [
    { label: "Dashboard", icon: "dashboard", to: "/credit" },
    { label: "Case Registry", icon: "inventory_2", to: "/credit/cases" },
    { label: "Allocation Engine", icon: "queue", to: "/credit/allocation" },
  ],
  "loan-officer": [
    { label: "Dashboard", icon: "dashboard", to: "/officer" },
    { label: "My Workspace", icon: "work", to: "/officer/workspace" },
    { label: "Case Progress", icon: "folder_open", to: "/officer/cases" },
  ],
};

export const ROLE_HOME: Record<Role, string> = {
  "super-admin": "/admin",
  "credit-officer": "/credit",
  "loan-officer": "/officer",
};

const KEY = "aaas.session";

export function readSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
}

export function writeSession(user: SessionUser) {
  window.localStorage.setItem(KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("aaas-session"));
}

export function clearSession() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("aaas-session"));
}
