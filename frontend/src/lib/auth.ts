export const AUTH_KEY = "aaas.auth";
export const TOKEN_KEY = "aaas.token";

export function setToken(access: string, refresh?: string) {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, access);
      if (refresh) {
        localStorage.setItem(AUTH_KEY, JSON.stringify({ access, refresh }));
      }
    }
  } catch (e) {
    // ignore
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(AUTH_KEY);
}

export async function login(username: string, password: string) {
  const identifier = username.trim();

  const res = await fetch("/api/token/", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ username: identifier, password }),
    credentials: "same-origin",
  });
  if (!res.ok) throw new Error("Invalid employee ID or password");
  const data = await res.json();
  setToken(data.access, data.refresh);
  return data;
}

export async function refreshToken() {
  const raw = typeof window !== "undefined" ? localStorage.getItem(AUTH_KEY) : null;
  if (!raw) throw new Error("No refresh token available");
  const { refresh } = JSON.parse(raw);
  const res = await fetch("/api/token/refresh/", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ refresh }),
    credentials: "same-origin",
  });
  if (!res.ok) throw new Error("Refresh failed");
  const data = await res.json();
  setToken(data.access);
  return data;
}

export default { setToken, getToken, clearAuth, login, refreshToken };
