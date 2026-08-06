import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { i as PageHeader, o as ROLE_LABEL, r as Icon, t as AppShell } from "./AppShell-Mf8Pngaj.mjs";
import { t as Button } from "./ui-kit-CA-wP0NN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SettingsPage-xNfZU2QJ.js
var import_jsx_runtime = require_jsx_runtime();
var SECTIONS = [{
	id: "profile",
	label: "Profile",
	icon: "person"
}];
function SettingsPage({ role }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		searchPlaceholder: "Search settings...",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Settings",
			subtitle: `Workspace preferences for the ${ROLE_LABEL[role]} console.`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				icon: "lock",
				children: "Profile is read-only"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-lg lg:grid-cols-[220px_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "space-y-1 rounded-xl border border-outline-variant bg-surface-container-lowest p-sm",
				children: SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "flex w-full items-center gap-3 rounded-[10px] bg-primary px-4 py-3 text-label-bold text-on-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: s.icon,
						className: "text-[20px]"
					}), s.label]
				}, s.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "space-y-lg rounded-xl border border-outline-variant bg-surface-container-lowest p-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-title-lg text-primary",
							children: "Profile details"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-body-sm text-on-surface-variant",
							children: "Profile information is managed centrally and cannot be edited by users."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-md md:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Full name",
									value: "Officer name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Employee ID",
									value: "EMP-004821"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Branch",
									value: "Kampala HQ"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Work email",
									value: "officer@centenarybank.co.ug"
								})
							]
						})
					]
				})
			})]
		})]
	});
}
function Field({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block space-y-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-label-bold uppercase text-on-surface-variant",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			readOnly: true,
			"aria-readonly": "true",
			className: "w-full cursor-not-allowed rounded-[10px] border border-outline-variant bg-surface-container px-4 py-3 text-body-md text-on-surface-variant outline-none"
		})]
	});
}
//#endregion
export { SettingsPage as t };
