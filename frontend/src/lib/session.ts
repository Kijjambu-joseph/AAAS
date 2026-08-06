export type Role = "credit-Officer H/O" | "loan-officer-branch" | "credit-Officer H/O";

export interface SessionUser {
  role: Role;
  name: string;
  title: string;
  avatar: string;
}

export type DatabaseUser = {
  username: string;
  first_name: string;
  last_name: string;
  role: "LOAN_OFFICER_BRANCH" | "CREDIT_OFFICER_H/O" | "SYSTEM_ADMIN";
};

const DATABASE_ROLE_MAP: Record<DatabaseUser["role"], Role> = {
  "CREDIT_OFFICER_H/O": "credit-Officer H/O",
  "LOAN_OFFICER_BRANCH": "loan-officer-branch",
  "SYSTEM_ADMIN": "credit-Officer H/O",
};

export function sessionUserFromDatabase(user: DatabaseUser): SessionUser {
  const name = `${user.first_name} ${user.last_name}`.trim() || user.username;
  const role = DATABASE_ROLE_MAP[user.role];
  return { role, name, title: ROLE_LABEL[role], avatar: AVATAR };
}

export const ROLE_LABEL: Record<Role, string> = {
  "credit-Officer H/O": "Credit Officer H/O",
  "loan-officer-branch": "Loan Officer - Branch",
};

export const AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCdh0izp6zCUt-68fDJqipBTdvIpFPJMVTp0LOrFoZXZyTkxTG4jhmt0ZBJciimouBhyLA7pVpOr8rTqg7tJHnzJyJwS2DvRjHP_I2EFEbSSZhCTxjQZrgHY1nv9qEz5LrkJQXbNxJBtEu_gRsufNhucDGohTWaxrdu1XxNseibvPfpP_88MwS_0ieWW3_s_FVhDnNrg_al1Hz1Sq8IAkt3YxjSh83rJ3bWrXpjD7UNJkVkCATHjXI9RBzgOlJhyI5EzJKhhZ1fPIsA";

export const DEFAULT_USERS: Record<Role, SessionUser> = {
  "credit-Officer H/O": {
    role: "credit-Officer H/O",
    name: "A. Nakato",
    title: "Credit Officer H/O",
    avatar: AVATAR,
  },
  "loan-officer-branch": {
    role: "loan-officer-branch",
    name: "J. Okello",
    title: "Loan Officer - Branch",
    avatar: AVATAR,
  },
};

export interface NavItem {
  label: string;
  icon: string;
  to: string;
}

export const ROLE_NAV: Record<Role, NavItem[]> = {
  "credit-Officer H/O": [
    { label: "Dashboard", icon: "dashboard", to: "/admin" },
    { label: "Case Registry", icon: "inventory_2", to: "/credit/cases" },
    { label: "Auctioneer Panel", icon: "gavel", to: "/admin/auctioneers" },
    { label: "Allocation Queue", icon: "queue", to: "/admin/allocation" },
    { label: "Transaction Limits", icon: "account_balance", to: "/admin/transaction-limits" },
    { label: "Reports", icon: "assessment", to: "/admin/reports" },
    { label: "Audit Logs", icon: "history", to: "/admin/audit" },
  ],
  "loan-officer-branch": [
    { label: "Dashboard", icon: "dashboard", to: "/credit" },
    { label: "Case Registry", icon: "inventory_2", to: "/credit/cases" },
    { label: "Allocation Engine", icon: "queue", to: "/credit/allocation" },
  ],
};

export const ROLE_HOME: Record<Role, string> = {
  "credit-Officer H/O": "/admin",
  "loan-officer-branch": "/credit",
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
