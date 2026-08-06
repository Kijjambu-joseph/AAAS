import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { i as PageHeader, o as ROLE_LABEL, r as Icon, t as AppShell } from "./AppShell-CExlMv0k.mjs";
import { a as Toolbar, i as Modal, o as useSearchFilter, t as Button } from "./ui-kit-rxJ3QVV7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SupportPage-DueILIB8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ARTICLES = [
	{
		title: "How auto-allocation scoring works",
		category: "Allocation",
		body: "Cases are ranked on regional proximity (35%), historical recovery rate (30%), current caseload (20%) and licence standing (15%)."
	},
	{
		title: "Resolving an unallocated exception",
		category: "Allocation",
		body: "Open the exception row, review the reason code, then assign a qualified auctioneer manually and record the justification."
	},
	{
		title: "Uploading valuation and demand documents",
		category: "Cases",
		body: "Documents must be PDF, under 10MB and named with the case reference. Uploads are logged to the audit trail."
	},
	{
		title: "Renewing an auctioneer licence record",
		category: "Auctioneers",
		body: "Update the licence expiry date and attach the renewal certificate; the auctioneer becomes eligible for allocation again once approved."
	},
	{
		title: "Reading the compliance audit log",
		category: "Compliance",
		body: "Every entry shows the actor, action, affected record and timestamp in plain language. Entries cannot be edited or deleted."
	},
	{
		title: "Requesting additional system access",
		category: "Account",
		body: "Access changes are approved by the Super Admin. Submit a ticket describing the module and the business justification."
	}
];
function SupportPage({ role }) {
	const { query, setQuery, filter, setFilter, options, results } = useSearchFilter(ARTICLES, [
		"title",
		"body",
		"category"
	], "category");
	const [ticketOpen, setTicketOpen] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(false);
	const [article, setArticle] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		searchPlaceholder: "Search help articles...",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Help & Support",
				subtitle: `Guides, contacts and ticketing for the ${ROLE_LABEL[role]} console.`,
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					icon: "call",
					children: "Call IT desk"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					icon: "confirmation_number",
					onClick: () => setTicketOpen(true),
					children: "Raise a ticket"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-md md:grid-cols-3",
				children: [
					{
						icon: "support_agent",
						title: "Service desk",
						note: "Mon–Sat, 07:00–21:00 EAT",
						value: "+256 312 202 000"
					},
					{
						icon: "mail",
						title: "Email support",
						note: "Response within 4 working hours",
						value: "aaas.support@centenarybank.co.ug"
					},
					{
						icon: "emergency",
						title: "Critical incidents",
						note: "Recovery engine outages only",
						value: "Ext. 4477"
					}
				].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex rounded-lg bg-primary-fixed p-2 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: c.icon })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-md text-title-lg text-primary",
							children: c.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-body-sm text-on-surface-variant",
							children: c.note
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-xs text-body-md font-semibold text-on-surface",
							children: c.value
						})
					]
				}, c.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-md rounded-xl border border-outline-variant bg-surface-container-lowest p-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "menu_book",
							className: "text-primary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-title-lg text-primary",
							children: "Knowledge base"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, {
						query,
						onQuery: setQuery,
						filter,
						onFilter: setFilter,
						options,
						placeholder: "Search guides by keyword..."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-md md:grid-cols-2",
						children: [results.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setArticle(a),
							className: "rounded-[10px] border border-outline-variant p-md text-left transition-colors hover:border-primary hover:bg-surface-container-low",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-semibold uppercase tracking-widest text-secondary",
									children: a.category
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-body-md font-semibold text-on-surface",
									children: a.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 line-clamp-2 text-body-sm text-on-surface-variant",
									children: a.body
								})
							]
						}, a.title)), !results.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-body-sm text-on-surface-variant",
							children: "No articles match your search."
						}) : null]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: !!article,
				onClose: () => setArticle(null),
				title: article?.title ?? "",
				subtitle: article?.category,
				icon: "article",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setArticle(null),
					children: "Close"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					icon: "confirmation_number",
					onClick: () => {
						setArticle(null);
						setTicketOpen(true);
					},
					children: "Still need help"
				})] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-body-md text-on-surface-variant",
					children: article?.body
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: ticketOpen,
				onClose: () => setTicketOpen(false),
				title: "Raise a support ticket",
				subtitle: "Our service desk responds within 4 working hours.",
				icon: "confirmation_number",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setTicketOpen(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					icon: "send",
					onClick: () => {
						setTicketOpen(false);
						setSent(true);
					},
					children: "Submit ticket"
				})] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block space-y-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-label-bold uppercase text-on-surface-variant",
								children: "Subject"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Short summary of the issue",
								className: "w-full rounded-[10px] border border-outline-variant bg-surface-container px-4 py-3 text-body-md outline-none focus:border-primary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block space-y-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-label-bold uppercase text-on-surface-variant",
								children: "Priority"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "w-full rounded-[10px] border border-outline-variant bg-surface-container px-4 py-3 text-body-md outline-none focus:border-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Normal" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "High" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Critical" })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block space-y-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-label-bold uppercase text-on-surface-variant",
								children: "Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 4,
								placeholder: "Describe what happened, including case references.",
								className: "w-full rounded-[10px] border border-outline-variant bg-surface-container px-4 py-3 text-body-md outline-none focus:border-primary"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: sent,
				onClose: () => setSent(false),
				title: "Ticket submitted",
				subtitle: "Reference SD-2291",
				icon: "task_alt",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => setSent(false),
					children: "Done"
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-body-sm text-on-surface-variant",
					children: "The service desk has your request and will contact you on your work email."
				})
			})
		]
	});
}
//#endregion
export { SupportPage as t };
