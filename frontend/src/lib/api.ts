export interface ApiOptions {
  method?: string;
  body?: any;
  token?: string | null;
}

async function request(path: string, opts: ApiOptions = {}) {
  const { method = "GET", body, token } = opts;
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // prefer explicitly provided token, otherwise try stored token in localStorage
  const resolvedToken = token ?? (typeof window !== "undefined" ? localStorage.getItem("aaas.token") : null);
  if (resolvedToken) {
    headers["Authorization"] = `Bearer ${resolvedToken}`;
  }

  const res = await fetch(path, {
    method,
    headers,
    body: body && !(body instanceof FormData) ? JSON.stringify(body) : body,
    credentials: "same-origin",
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err = new Error(data?.detail || res.statusText || "Request failed");
    // @ts-ignore
    err.status = res.status;
    // @ts-ignore
    err.data = data;
    throw err;
  }
  return data;
}

export const Api = {
  get: (path: string, token?: string | null) => request(path, { method: "GET", token }),
  post: (path: string, body?: any, token?: string | null) => request(path, { method: "POST", body, token }),
  put: (path: string, body?: any, token?: string | null) => request(path, { method: "PUT", body, token }),
  del: (path: string, body?: any, token?: string | null) => request(path, { method: "DELETE", body, token }),
};

export default Api;
