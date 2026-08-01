import { n as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { r as Icon } from "./AppShell-EE99Et3W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-kit-BI8B3iAj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Modal({ open, onClose, title, subtitle, icon, tone = "primary", children, footer, size = "md" }) {
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => e.key === "Escape" && onClose();
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center p-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-primary/40 backdrop-blur-[2px]",
			onClick: onClose,
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			className: `relative z-10 w-full ${size === "sm" ? "max-w-[28rem]" : size === "lg" ? "max-w-3xl" : "max-w-[36rem]"} overflow-hidden rounded-[10px] border border-outline-variant bg-surface-container-lowest shadow-2xl`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-md border-b border-outline-variant px-lg py-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-start gap-sm",
						children: [icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `shrink-0 rounded-lg p-2 ${tone === "error" ? "bg-error-container text-on-error-container" : tone === "secondary" ? "bg-secondary-container text-on-secondary-container" : "bg-primary-fixed text-primary"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: icon })
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "truncate text-title-lg text-primary",
								children: title
							}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-body-sm text-on-surface-variant",
								children: subtitle
							}) : null]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						"aria-label": "Close dialog",
						className: "shrink-0 rounded-full p-1 text-on-surface-variant transition-colors hover:bg-surface-container",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "close" })
					})]
				}),
				children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-[60vh] overflow-y-auto px-lg py-md",
					children
				}) : null,
				footer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap justify-end gap-sm border-t border-outline-variant bg-surface-container-low px-lg py-md",
					children: footer
				}) : null
			]
		})]
	});
}
function Button({ variant = "primary", icon, children, className = "", ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: `inline-flex items-center justify-center gap-2 rounded-[10px] px-lg py-sm text-label-bold transition-all active:scale-[0.98] disabled:opacity-60 ${{
			primary: "bg-primary text-on-primary hover:opacity-90",
			outline: "border border-outline-variant bg-surface-container-lowest text-primary hover:bg-surface-container",
			ghost: "text-primary hover:bg-surface-container",
			danger: "bg-error text-on-error hover:opacity-90",
			gold: "bg-secondary-container text-on-secondary-container hover:opacity-90"
		}[variant]} ${className}`,
		...rest,
		children: [icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			name: icon,
			className: "text-[18px]"
		}) : null, children]
	});
}
function useSearchFilter(rows, keys, filterKey) {
	const [query, setQuery] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("ALL");
	return {
		query,
		setQuery,
		filter,
		setFilter,
		options: (0, import_react.useMemo)(() => {
			if (!filterKey) return [];
			return Array.from(new Set(rows.map((r) => String(r[filterKey]))));
		}, [rows, filterKey]),
		results: (0, import_react.useMemo)(() => {
			const q = query.trim().toLowerCase();
			return rows.filter((r) => {
				const matchQ = !q || keys.some((k) => String(r[k] ?? "").toLowerCase().includes(q));
				const matchF = !filterKey || filter === "ALL" || String(r[filterKey]) === filter;
				return matchQ && matchF;
			});
		}, [
			rows,
			keys,
			query,
			filter,
			filterKey
		])
	};
}
function Toolbar({ query, onQuery, placeholder = "Search...", filter, onFilter, options, right }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 gap-sm sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-wrap items-center gap-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: "search",
					className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: query,
					onChange: (e) => onQuery(e.target.value),
					placeholder,
					className: "w-full rounded-[10px] border border-outline-variant bg-surface-container-lowest py-2 pl-11 pr-4 text-body-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
				})]
			}), options?.length && onFilter ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: filter,
				onChange: (e) => onFilter(e.target.value),
				className: "rounded-[10px] border border-outline-variant bg-surface-container-lowest px-3 py-2 text-body-sm text-on-surface outline-none focus:border-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "ALL",
					children: "All"
				}), options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: o,
					children: o
				}, o))]
			}) : null]
		}), right ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-sm",
			children: right
		}) : null]
	});
}
//#endregion
export { useSearchFilter as i, Modal as n, Toolbar as r, Button as t };
