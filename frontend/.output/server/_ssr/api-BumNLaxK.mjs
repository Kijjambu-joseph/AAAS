//#region node_modules/.nitro/vite/services/ssr/assets/api-BumNLaxK.js
async function request(path, opts = {}, retried = false) {
	const { method = "GET", body, token } = opts;
	const headers = { Accept: "application/json" };
	if (body && !(body instanceof FormData)) headers["Content-Type"] = "application/json";
	const resolvedToken = token ?? (typeof window !== "undefined" ? localStorage.getItem("aaas.token") : null);
	if (resolvedToken) headers["Authorization"] = `Bearer ${resolvedToken}`;
	const res = await fetch(path, {
		method,
		headers,
		body: body && !(body instanceof FormData) ? JSON.stringify(body) : body,
		credentials: "same-origin"
	});
	const text = await res.text();
	const data = text ? JSON.parse(text) : null;
	if (res.status === 401 && !retried && typeof window !== "undefined") {
		const storedAuth = localStorage.getItem("aaas.auth");
		if (storedAuth) try {
			const { refresh } = JSON.parse(storedAuth);
			const refreshResponse = await fetch("/api/token/refresh/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: JSON.stringify({ refresh }),
				credentials: "same-origin"
			});
			if (refreshResponse.ok) {
				const refreshed = await refreshResponse.json();
				localStorage.setItem("aaas.token", refreshed.access);
				localStorage.setItem("aaas.auth", JSON.stringify({
					access: refreshed.access,
					refresh
				}));
				return request(path, {
					...opts,
					token: refreshed.access
				}, true);
			}
		} catch {}
	}
	if (!res.ok) {
		const err = new Error(data?.detail || res.statusText || "Request failed");
		err.status = res.status;
		err.data = data;
		throw err;
	}
	return data;
}
var Api = {
	get: (path, token) => request(path, {
		method: "GET",
		token
	}),
	post: (path, body, token) => request(path, {
		method: "POST",
		body,
		token
	}),
	put: (path, body, token) => request(path, {
		method: "PUT",
		body,
		token
	}),
	del: (path, body, token) => request(path, {
		method: "DELETE",
		body,
		token
	})
};
//#endregion
export { Api as t };
