import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BFUl_lhT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BWTPW16N.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-112 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-112 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$21 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "AAAS System | Centenary Bank Recovery" },
			{
				name: "description",
				content: "Auctioneer Allocation and Audit System for institutional credit recovery and asset liquidation."
			},
			{
				property: "og:title",
				content: "AAAS System | Centenary Bank Recovery"
			},
			{
				property: "og:description",
				content: "Institutional credit recovery, allocation and audit platform."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$21.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$19 = () => import("./routes-DwFB5zF1.mjs");
var Route$20 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Institutional Login | Centenary Bank AAAS" },
		{
			name: "description",
			content: "Secure gateway to the Auctioneer Allocation and Audit System for Centenary Bank recovery personnel."
		},
		{
			property: "og:title",
			content: "Institutional Login | Centenary Bank AAAS"
		},
		{
			property: "og:description",
			content: "Secure gateway to the Auctioneer Allocation and Audit System."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var BASE_URL = "";
var Route$19 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[{
			path: "/",
			changefreq: "weekly",
			priority: "1.0"
		}].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$18 = () => import("./admin.index-D8-bWZke.mjs");
var Route$18 = createFileRoute("/admin/")({
	component: lazyRouteComponent($$splitComponentImporter$18, "component"),
	head: () => ({ meta: [
		{ title: "Recovery Overview | AAAS System" },
		{
			name: "description",
			content: "Live performance metrics for Uganda regional liquidation, recovery trends, and auctioneer capacity."
		},
		{
			property: "og:title",
			content: "Recovery Overview | AAAS System"
		},
		{
			property: "og:description",
			content: "Live performance metrics for Uganda regional liquidation, recovery trends, and auctioneer capacity."
		}
	] })
});
var $$splitComponentImporter$17 = () => import("./admin.allocation-Cgr9--pr.mjs");
var Route$17 = createFileRoute("/admin/allocation")({
	component: lazyRouteComponent($$splitComponentImporter$17, "component"),
	head: () => ({ meta: [
		{ title: "Allocation Queue & Engine Monitor | AAAS" },
		{
			name: "description",
			content: "Monitor real-time case allocation, engine throughput, exceptions, and manually override auctioneer assignments."
		},
		{
			property: "og:title",
			content: "Allocation Queue & Engine Monitor | AAAS"
		},
		{
			property: "og:description",
			content: "Monitor real-time case allocation, engine throughput, exceptions, and manually override auctioneer assignments."
		}
	] })
});
var $$splitComponentImporter$16 = () => import("./admin.auctioneers-DcKMArcW.mjs");
var Route$16 = createFileRoute("/admin/auctioneers")({
	component: lazyRouteComponent($$splitComponentImporter$16, "component"),
	head: () => ({ meta: [
		{ title: "Auctioneer Panel Management | AAAS System" },
		{
			name: "description",
			content: "Manage and allocate asset recovery cases to verified third-party auctioneer partners across Uganda."
		},
		{
			property: "og:title",
			content: "Auctioneer Panel Management | AAAS System"
		},
		{
			property: "og:description",
			content: "Manage and allocate asset recovery cases to verified third-party auctioneer partners across Uganda."
		}
	] })
});
var $$splitComponentImporter$15 = () => import("./admin.audit-Ck8WdfHN.mjs");
var Route$15 = createFileRoute("/admin/audit")({
	component: lazyRouteComponent($$splitComponentImporter$15, "component"),
	head: () => ({ meta: [
		{ title: "System Audit Logs | Centenary Bank Recovery" },
		{
			name: "description",
			content: "Review append-only system audit logs including manual overrides, logins, and configuration changes with signature verification."
		},
		{
			property: "og:title",
			content: "System Audit Logs | Centenary Bank Recovery"
		},
		{
			property: "og:description",
			content: "Review append-only system audit logs including manual overrides, logins, and configuration changes with signature verification."
		}
	] })
});
var $$splitComponentImporter$14 = () => import("./admin.cases-CWSksj6K.mjs");
var Route$14 = createFileRoute("/admin/cases")({
	component: lazyRouteComponent($$splitComponentImporter$14, "component"),
	head: () => ({ meta: [
		{ title: "Case Registry | AAAS System" },
		{
			name: "description",
			content: "Manage and track recovery progress for institutional debt portfolios across all active cases."
		},
		{
			property: "og:title",
			content: "Case Registry | AAAS System"
		},
		{
			property: "og:description",
			content: "Manage and track recovery progress for institutional debt portfolios across all active cases."
		}
	] })
});
var $$splitComponentImporter$13 = () => import("./admin.reports-CFiuATKH.mjs");
var Route$13 = createFileRoute("/admin/reports")({
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	head: () => ({ meta: [
		{ title: "Reports & Analytics | Recovery Management System" },
		{
			name: "description",
			content: "Real-time recovery performance and allocation metrics overview, with exportable reports and regional distribution."
		},
		{
			property: "og:title",
			content: "Reports & Analytics | Recovery Management System"
		},
		{
			property: "og:description",
			content: "Real-time recovery performance and allocation metrics overview, with exportable reports and regional distribution."
		}
	] })
});
var $$splitComponentImporter$12 = () => import("./admin.settings-DyH8lU1_.mjs");
var Route$12 = createFileRoute("/admin/settings")({
	component: lazyRouteComponent($$splitComponentImporter$12, "component"),
	head: () => ({ meta: [
		{ title: "Admin Settings | Centenary Bank AAAS" },
		{
			name: "description",
			content: "Configure profile, notification, security and workspace preferences for the Super Admin console."
		},
		{
			property: "og:title",
			content: "Admin Settings | Centenary Bank AAAS"
		},
		{
			property: "og:description",
			content: "Super Admin workspace preferences and security controls."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] })
});
var $$splitComponentImporter$11 = () => import("./admin.support-D6f4Rmni.mjs");
var Route$11 = createFileRoute("/admin/support")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => ({ meta: [
		{ title: "Admin Support Centre | Centenary Bank AAAS" },
		{
			name: "description",
			content: "Knowledge base, service desk contacts and ticketing for Super Admin users of the recovery system."
		},
		{
			property: "og:title",
			content: "Admin Support Centre | Centenary Bank AAAS"
		},
		{
			property: "og:description",
			content: "Guides, contacts and ticketing for Super Admins."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] })
});
var $$splitComponentImporter$10 = () => import("./admin.transaction-limits-B7VrjO9r.mjs");
var Route$10 = createFileRoute("/admin/transaction-limits")({
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => ({ meta: [
		{ title: "Transaction Limits Management | AAAS" },
		{
			name: "description",
			content: "Manage transaction limits, approval thresholds, and level configurations."
		},
		{
			property: "og:title",
			content: "Transaction Limits Management | AAAS"
		},
		{
			property: "og:description",
			content: "Manage transaction limits, approval thresholds, and level configurations."
		}
	] })
});
var $$splitComponentImporter$9 = () => import("./credit.index-2D8KZg3c.mjs");
var Route$9 = createFileRoute("/credit/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./credit.allocation-BPDXTMtk.mjs");
var Route$8 = createFileRoute("/credit/allocation")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./credit.cases-BmYa42IB.mjs");
var Route$7 = createFileRoute("/credit/cases")({
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	head: () => ({ meta: [
		{ title: "Case Registry | Centenary Bank AAAS" },
		{
			name: "description",
			content: "Manage and track loan recovery cases awaiting auctioneer allocation."
		},
		{
			property: "og:title",
			content: "Case Registry | Centenary Bank AAAS"
		},
		{
			property: "og:description",
			content: "Manage and track loan recovery cases awaiting auctioneer allocation."
		}
	] })
});
var $$splitComponentImporter$6 = () => import("./credit.settings-C9nQ9X0E.mjs");
var Route$6 = createFileRoute("/credit/settings")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [
		{ title: "Credit Officer Settings | Centenary Bank AAAS" },
		{
			name: "description",
			content: "Manage allocation alerts, security and display preferences for the Credit Officer console."
		},
		{
			property: "og:title",
			content: "Credit Officer Settings | Centenary Bank AAAS"
		},
		{
			property: "og:description",
			content: "Credit Officer workspace preferences and alerts."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] })
});
var $$splitComponentImporter$5 = () => import("./credit.support-2uWd6lBs.mjs");
var Route$5 = createFileRoute("/credit/support")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [
		{ title: "Credit Officer Support | Centenary Bank AAAS" },
		{
			name: "description",
			content: "Allocation engine guides, service desk contacts and ticketing for Credit Officers."
		},
		{
			property: "og:title",
			content: "Credit Officer Support | Centenary Bank AAAS"
		},
		{
			property: "og:description",
			content: "Guides, contacts and ticketing for Credit Officers."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] })
});
var $$splitComponentImporter$4 = () => import("./officer.index-k4dmpkec.mjs");
var Route$4 = createFileRoute("/officer/")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [
		{ title: "Loan Officer Dashboard | AAAS System" },
		{
			name: "description",
			content: "Overview of active recovery cases, pending valuations, draft submissions, and allocated value for loan officers."
		},
		{
			property: "og:title",
			content: "Loan Officer Dashboard | AAAS System"
		},
		{
			property: "og:description",
			content: "Overview of active recovery cases, pending valuations, draft submissions, and allocated value for loan officers."
		}
	] })
});
var $$splitComponentImporter$3 = () => import("./officer.cases-DvmenICY.mjs");
var Route$3 = createFileRoute("/officer/cases")({
	head: () => ({ meta: [
		{ title: "Case Progress & Document Vault | AAAS" },
		{
			name: "description",
			content: "Track recovery case milestones and manage the secure document vault for each borrower file."
		},
		{
			property: "og:title",
			content: "Case Progress & Document Vault | AAAS"
		},
		{
			property: "og:description",
			content: "Milestones and secure documents per recovery case."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./officer.settings-BdD_bGCn.mjs");
var Route$2 = createFileRoute("/officer/settings")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [
		{ title: "Loan Officer Settings | Centenary Bank AAAS" },
		{
			name: "description",
			content: "Manage case alerts, security and display preferences for the Loan Officer workspace."
		},
		{
			property: "og:title",
			content: "Loan Officer Settings | Centenary Bank AAAS"
		},
		{
			property: "og:description",
			content: "Loan Officer workspace preferences and alerts."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] })
});
var $$splitComponentImporter$1 = () => import("./officer.support-DrOdZp95.mjs");
var Route$1 = createFileRoute("/officer/support")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [
		{ title: "Loan Officer Support | Centenary Bank AAAS" },
		{
			name: "description",
			content: "Case filing guides, service desk contacts and ticketing for Loan Officers."
		},
		{
			property: "og:title",
			content: "Loan Officer Support | Centenary Bank AAAS"
		},
		{
			property: "og:description",
			content: "Guides, contacts and ticketing for Loan Officers."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] })
});
var $$splitComponentImporter = () => import("./officer.workspace-Dqr2L8tW.mjs");
var Route = createFileRoute("/officer/workspace")({
	head: () => ({ meta: [
		{ title: "Loan Officer Workspace | AAAS System" },
		{
			name: "description",
			content: "Daily workspace for loan officers: assigned recovery cases, pending actions and borrower follow-ups."
		},
		{
			property: "og:title",
			content: "Loan Officer Workspace | AAAS System"
		},
		{
			property: "og:description",
			content: "Assigned cases, pending actions and follow-ups."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$20.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$21
});
var SitemapDotxmlRoute = Route$19.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$21
});
var AdminIndexRoute = Route$18.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => Route$21
});
var AdminAllocationRoute = Route$17.update({
	id: "/admin/allocation",
	path: "/admin/allocation",
	getParentRoute: () => Route$21
});
var AdminAuctioneersRoute = Route$16.update({
	id: "/admin/auctioneers",
	path: "/admin/auctioneers",
	getParentRoute: () => Route$21
});
var AdminAuditRoute = Route$15.update({
	id: "/admin/audit",
	path: "/admin/audit",
	getParentRoute: () => Route$21
});
var AdminCasesRoute = Route$14.update({
	id: "/admin/cases",
	path: "/admin/cases",
	getParentRoute: () => Route$21
});
var AdminReportsRoute = Route$13.update({
	id: "/admin/reports",
	path: "/admin/reports",
	getParentRoute: () => Route$21
});
var AdminSettingsRoute = Route$12.update({
	id: "/admin/settings",
	path: "/admin/settings",
	getParentRoute: () => Route$21
});
var AdminSupportRoute = Route$11.update({
	id: "/admin/support",
	path: "/admin/support",
	getParentRoute: () => Route$21
});
var AdminTransactionLimitsRoute = Route$10.update({
	id: "/admin/transaction-limits",
	path: "/admin/transaction-limits",
	getParentRoute: () => Route$21
});
var CreditIndexRoute = Route$9.update({
	id: "/credit/",
	path: "/credit/",
	getParentRoute: () => Route$21
});
var CreditAllocationRoute = Route$8.update({
	id: "/credit/allocation",
	path: "/credit/allocation",
	getParentRoute: () => Route$21
});
var CreditCasesRoute = Route$7.update({
	id: "/credit/cases",
	path: "/credit/cases",
	getParentRoute: () => Route$21
});
var CreditSettingsRoute = Route$6.update({
	id: "/credit/settings",
	path: "/credit/settings",
	getParentRoute: () => Route$21
});
var CreditSupportRoute = Route$5.update({
	id: "/credit/support",
	path: "/credit/support",
	getParentRoute: () => Route$21
});
var OfficerIndexRoute = Route$4.update({
	id: "/officer/",
	path: "/officer/",
	getParentRoute: () => Route$21
});
var rootRouteChildren = {
	IndexRoute,
	SitemapDotxmlRoute,
	AdminAllocationRoute,
	AdminAuctioneersRoute,
	AdminAuditRoute,
	AdminCasesRoute,
	AdminReportsRoute,
	AdminSettingsRoute,
	AdminSupportRoute,
	AdminTransactionLimitsRoute,
	CreditAllocationRoute,
	CreditCasesRoute,
	CreditSettingsRoute,
	CreditSupportRoute,
	OfficerCasesRoute: Route$3.update({
		id: "/officer/cases",
		path: "/officer/cases",
		getParentRoute: () => Route$21
	}),
	OfficerSettingsRoute: Route$2.update({
		id: "/officer/settings",
		path: "/officer/settings",
		getParentRoute: () => Route$21
	}),
	OfficerSupportRoute: Route$1.update({
		id: "/officer/support",
		path: "/officer/support",
		getParentRoute: () => Route$21
	}),
	OfficerWorkspaceRoute: Route.update({
		id: "/officer/workspace",
		path: "/officer/workspace",
		getParentRoute: () => Route$21
	}),
	AdminIndexRoute,
	CreditIndexRoute,
	OfficerIndexRoute
};
var routeTree = Route$21._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
