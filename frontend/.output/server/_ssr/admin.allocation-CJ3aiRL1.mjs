import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as AppShell } from "./AppShell-Mf8Pngaj.mjs";
import { t as Api } from "./api-BumNLaxK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.allocation-CJ3aiRL1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var list = (v) => Array.isArray(v) ? v : v?.results ?? [];
function AllocationQueuePage() {
	const [cases, setCases] = (0, import_react.useState)([]);
	const [allocations, setAllocations] = (0, import_react.useState)([]);
	const load = () => Promise.all([Api.get("/api/cases/?ordering=-created_at"), Api.get("/api/allocations/?ordering=-allocated_at")]).then(([c, a]) => {
		setCases(list(c));
		setAllocations(list(a));
	});
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const pending = cases.filter((c) => c.status === "Pending");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-title-lg text-primary",
			children: "Allocation Queue & Engine Monitor"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "my-lg grid grid-cols-1 gap-md md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Pending allocation",
					value: pending.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Active allocations",
					value: allocations.filter((a) => a.allocation_status === "Active").length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Total allocations",
					value: allocations.length
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "overflow-hidden rounded-lg border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "p-md text-title-lg",
				children: "Live allocation records"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-surface-container",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-md",
							children: "CASE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "AUCTIONEER" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "METHOD" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "STATUS" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "ALLOCATED" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: allocations.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-md",
							children: a.recovery_case?.case_number
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: a.auctioneer?.company_name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: a.allocation_method }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: a.allocation_status }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: new Date(a.allocated_at).toLocaleString() })
					]
				}, a.id)) })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-lg overflow-hidden rounded-lg border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "p-md text-title-lg",
					children: "Unallocated cases"
				}),
				pending.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between border-t p-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						c.case_number,
						" — ",
						c.customer_name
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.branch?.region })]
				}, c.id)),
				!pending.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-md",
					children: "No pending cases."
				}) : null
			]
		})
	] });
}
function Stat(p) {
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
export { AllocationQueuePage as component };
