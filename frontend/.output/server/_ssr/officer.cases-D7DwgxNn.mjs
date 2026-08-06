import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { i as PageHeader, r as Icon, t as AppShell } from "./AppShell-Mf8Pngaj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/officer.cases-D7DwgxNn.js
var import_jsx_runtime = require_jsx_runtime();
var STAGES = [
	{
		name: "Case Registered",
		done: true
	},
	{
		name: "Demand Notice Issued",
		done: true
	},
	{
		name: "Valuation Complete",
		done: true
	},
	{
		name: "Auctioneer Allocated",
		done: false
	},
	{
		name: "Notice of Sale",
		done: false
	},
	{
		name: "Liquidation & Closure",
		done: false
	}
];
var DOCS = [
	{
		name: "Notice of Sale",
		type: "PDF",
		size: "412 KB",
		status: "Pending"
	},
	{
		name: "Valuation Report",
		type: "PDF",
		size: "1.8 MB",
		status: "Verified"
	},
	{
		name: "Loan Agreement",
		type: "PDF",
		size: "740 KB",
		status: "Verified"
	},
	{
		name: "Title Deed Copy",
		type: "PDF",
		size: "2.4 MB",
		status: "Verified"
	}
];
function CaseProgressPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Case Progress",
			subtitle: "CR-2041 — Kato Enterprises · Kampala Central",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "flex items-center gap-2 rounded-lg bg-primary px-lg py-sm text-label-bold text-on-primary hover:opacity-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: "upload_file",
					className: "text-[18px]"
				}), "Upload Document"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "mb-6 text-title-lg text-primary",
				children: "Recovery Milestones"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-4",
				children: STAGES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 min-w-[160px] flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: s.done ? "h-1.5 rounded-full bg-secondary-container" : "h-1.5 rounded-full bg-surface-container-high" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: s.done ? "check_circle" : "radio_button_unchecked",
							className: s.done ? "text-[18px] text-secondary" : "text-[18px] text-outline"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-body-sm text-on-surface-variant",
							children: [
								i + 1,
								". ",
								s.name
							]
						})]
					})]
				}, s.name))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-outline-variant p-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-title-lg text-primary",
					children: "Document Vault"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-label-bold text-on-surface-variant",
					children: [DOCS.length, " files"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-surface-container-low",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-label-bold uppercase text-on-surface-variant",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-lg py-3",
								children: "Document"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-lg py-3",
								children: "Type"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-lg py-3",
								children: "Size"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-lg py-3",
								children: "Status"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: DOCS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-outline-variant hover:bg-surface-container-low",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "flex items-center gap-2 px-lg py-4 text-body-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "description",
								className: "text-outline"
							}), d.name]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-lg py-4 text-mono-data text-on-surface-variant",
							children: d.type
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-lg py-4 text-mono-data text-on-surface-variant",
							children: d.size
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-lg py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: d.status === "Verified" ? "rounded-full bg-success-container px-3 py-1 text-label-bold text-on-success-container" : "rounded-full bg-secondary-fixed px-3 py-1 text-label-bold text-on-secondary-container",
								children: d.status
							})
						})
					]
				}, d.name)) })]
			})]
		})
	] });
}
//#endregion
export { CaseProgressPage as component };
