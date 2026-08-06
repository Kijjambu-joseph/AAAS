import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { i as PageHeader, t as AppShell } from "./AppShell-CExlMv0k.mjs";
import { t as Api } from "./api-BumNLaxK.mjs";
import { i as ThroughputLineChart, r as StatusPieChart, t as ChartCard } from "./Charts-B39A64-B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.reports-BWxp3iV6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var list = (v) => Array.isArray(v) ? v : v?.results ?? [];
var money = (n) => new Intl.NumberFormat("en-UG", {
	style: "currency",
	currency: "UGX",
	maximumFractionDigits: 0
}).format(n);
function ReportsPage() {
	const [cases, setCases] = (0, import_react.useState)([]);
	const [allocations, setAllocations] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		Promise.all([Api.get("/api/cases/?ordering=-created_at"), Api.get("/api/allocations/?ordering=-allocated_at")]).then(([c, a]) => {
			setCases(list(c));
			setAllocations(list(a));
		});
	}, []);
	const active = cases.filter((c) => ![
		"Recovered",
		"Closed",
		"Cancelled"
	].includes(c.status));
	const recovered = cases.filter((c) => c.status === "Recovered");
	const status = Object.entries(cases.reduce((x, c) => ({
		...x,
		[c.status]: (x[c.status] || 0) + 1
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
			allocated: allocations.filter((a) => new Date(a.allocated_at).toDateString() === key).length,
			exceptions: cases.filter((c) => c.status === "Pending" && new Date(c.created_at).toDateString() === key).length
		};
	}), [cases, allocations]);
	const regions = Object.entries(cases.reduce((x, c) => ({
		...x,
		[c.branch?.region || "Unknown"]: (x[c.branch?.region || "Unknown"] || 0) + 1
	}), {}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Reports & Analytics",
			subtitle: "Metrics calculated from live recovery and allocation records."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-md md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(K, {
					label: "Total cases",
					value: cases.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(K, {
					label: "Allocations",
					value: allocations.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(K, {
					label: "Recovery rate",
					value: `${cases.length ? Math.round(recovered.length / cases.length * 100) : 0}%`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(K, {
					label: "Active outstanding",
					value: money(active.reduce((s, c) => s + Number(c.outstanding_balance || 0), 0))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-lg grid grid-cols-1 gap-lg lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Allocation trend",
					subtitle: "Recorded allocations and pending cases",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThroughputLineChart, { data: trend })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
				title: "Portfolio status",
				subtitle: "Live case composition",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPieChart, { data: status })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-lg rounded-xl border p-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-md text-title-lg",
				children: "Cases by region"
			}), regions.map(([region, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-sm flex justify-between border-b pb-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: region }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: count })]
			}, region))]
		})
	] });
}
function K(p) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border p-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-label-bold uppercase",
			children: p.label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-display-lg text-primary",
			children: p.value
		})]
	});
}
//#endregion
export { ReportsPage as component };
