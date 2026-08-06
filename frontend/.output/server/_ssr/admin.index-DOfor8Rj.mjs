import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { r as Icon, t as AppShell } from "./AppShell-Mf8Pngaj.mjs";
import { t as Api } from "./api-BumNLaxK.mjs";
import { n as DashboardWelcome } from "./ui-kit-CA-wP0NN.mjs";
import { i as ThroughputLineChart, r as StatusPieChart, t as ChartCard } from "./Charts-B39A64-B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-DOfor8Rj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var list = (v) => Array.isArray(v) ? v : v?.results ?? [];
var UGX = new Intl.NumberFormat("en-UG", {
	style: "currency",
	currency: "UGX",
	maximumFractionDigits: 0
});
function AdminDashboard() {
	const [data, setData] = (0, import_react.useState)({
		cases: [],
		auctioneers: [],
		allocations: []
	});
	(0, import_react.useEffect)(() => {
		Promise.all([
			Api.get("/api/cases/?ordering=-created_at"),
			Api.get("/api/auctioneers/"),
			Api.get("/api/allocations/?ordering=-allocated_at")
		]).then(([cases, auctioneers, allocations]) => setData({
			cases: list(cases),
			auctioneers: list(auctioneers),
			allocations: list(allocations)
		}));
	}, []);
	const active = data.cases.filter((c) => ![
		"Recovered",
		"Closed",
		"Cancelled"
	].includes(c.status));
	const pending = data.cases.filter((c) => c.status === "Pending");
	const statuses = Object.entries(data.cases.reduce((a, c) => ({
		...a,
		[c.status]: (a[c.status] || 0) + 1
	}), {})).map(([name, value]) => ({
		name,
		value
	}));
	const trend = (0, import_react.useMemo)(() => Array.from({ length: 7 }, (_, i) => {
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() - 6 + i);
		const key = d.toDateString();
		return {
			day: d.toLocaleDateString("en", { weekday: "short" }),
			allocated: data.allocations.filter((a) => new Date(a.allocated_at).toDateString() === key).length,
			exceptions: data.cases.filter((c) => c.status === "Pending" && new Date(c.created_at).toDateString() === key).length
		};
	}), [data]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardWelcome, {
			message: "Institution-wide recovery and allocation data from the live AAAS database.",
			stats: [
				{
					label: "Active cases",
					value: String(active.length)
				},
				{
					label: "Pending allocation",
					value: String(pending.length)
				},
				{
					label: "Outstanding",
					value: UGX.format(active.reduce((s, c) => s + Number(c.outstanding_balance || 0), 0))
				}
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-md md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					icon: "groups",
					label: "Active partners",
					value: data.auctioneers.filter((a) => a.status).length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					icon: "assignment",
					label: "Allocations",
					value: data.allocations.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					icon: "warning",
					label: "Exceptions",
					value: pending.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					icon: "payments",
					label: "Recovered cases",
					value: data.cases.filter((c) => c.status === "Recovered").length
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-lg grid grid-cols-1 gap-lg lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Allocation throughput",
					subtitle: "Live records for the last seven days",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThroughputLineChart, { data: trend })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
				title: "Case status",
				subtitle: "Current portfolio",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPieChart, { data: statuses })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-lg overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "border-b border-outline-variant p-md text-title-lg",
				children: "Recent allocations"
			}), data.allocations.slice(0, 6).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between border-b border-outline-variant p-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: a.recovery_case?.case_number }),
					" → ",
					a.auctioneer?.company_name
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-on-surface-variant",
					children: new Date(a.allocated_at).toLocaleString()
				})]
			}, a.id))]
		})
	] });
}
function Card(p) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				name: p.icon,
				className: "text-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-md text-label-bold uppercase text-on-surface-variant",
				children: p.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-display-lg text-primary",
				children: p.value
			})
		]
	});
}
//#endregion
export { AdminDashboard as component };
