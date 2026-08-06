import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as AppShell } from "./AppShell-Mf8Pngaj.mjs";
import { t as Api } from "./api-BumNLaxK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.audit-DCLxptuj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var list = (v) => Array.isArray(v) ? v : v?.results ?? [];
function AuditLogsPage() {
	const [logs, setLogs] = (0, import_react.useState)([]);
	const [q, setQ] = (0, import_react.useState)("");
	const load = () => Api.get("/api/audit-logs/?ordering=-created_at").then((v) => setLogs(list(v)));
	(0, import_react.useEffect)(() => {
		load();
		const timer = window.setInterval(load, 15e3);
		return () => window.clearInterval(timer);
	}, []);
	const rows = logs.filter((l) => `${l.user_name} ${l.action} ${l.description} ${l.object_name}`.toLowerCase().includes(q.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-display-lg text-primary",
				children: "System Audit Logs"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-lg text-on-surface-variant",
				children: "Append-only events recorded by the database. Refreshes every 15 seconds."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: load,
				className: "h-fit rounded bg-primary px-4 py-2 text-on-primary",
				children: "Refresh"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value: q,
			onChange: (e) => setQ(e.target.value),
			placeholder: "Search audit events",
			className: "mb-md w-full rounded border p-2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "bg-surface-container",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-md",
						children: "TIME"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "USER" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "ACTION" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "OBJECT" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "DESCRIPTION" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "IP" })
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-t",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-md",
						children: new Date(l.created_at).toLocaleString()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: l.user_name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: l.action }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
						l.model_name,
						": ",
						l.object_name
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: l.description }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: l.ip_address || "—" })
				]
			}, l.id)), !rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				colSpan: 6,
				className: "p-lg text-center",
				children: "No audit logs found."
			}) }) : null] })]
		})
	] });
}
//#endregion
export { AuditLogsPage as component };
