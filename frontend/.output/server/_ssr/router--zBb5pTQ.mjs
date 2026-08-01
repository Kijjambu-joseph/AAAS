import { n as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router--zBb5pTQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-B7J6lYwp.css";
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
var Route$11 = createRootRouteWithContext()({
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
	const { queryClient } = Route$11.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$9 = () => import("./routes-CieXV-Nb.mjs");
var Route$10 = createFileRoute("/")({
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
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var BASE_URL = "";
var Route$9 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
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
var $$splitComponentImporter$8 = () => import("./admin.reports-C9RXU_UD.mjs");
var Route$8 = createFileRoute("/admin/reports")({
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
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
var $$splitComponentImporter$7 = () => import("./admin.settings-DqkmIR1k.mjs");
var Route$7 = createFileRoute("/admin/settings")({
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
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
var $$splitComponentImporter$6 = () => import("./admin.support-CN13yczI.mjs");
var Route$6 = createFileRoute("/admin/support")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
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
var $$splitComponentImporter$5 = () => import("./admin.transaction-limits-D7eOV0DV.mjs");
var Route$5 = createFileRoute("/admin/transaction-limits")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
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
var $$splitComponentImporter$4 = () => import("./credit.cases-U3RlYVeu.mjs");
var Route$4 = createFileRoute("/credit/cases")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
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
var $$splitComponentImporter$3 = () => import("./credit.settings-gWmVoQl8.mjs");
var Route$3 = createFileRoute("/credit/settings")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
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
var $$splitComponentImporter$2 = () => import("./credit.support-ivtZAEPs.mjs");
var Route$2 = createFileRoute("/credit/support")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
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
var $$splitComponentImporter$1 = () => import("./officer.settings-Di0Aaaid.mjs");
var Route$1 = createFileRoute("/officer/settings")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
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
var $$splitComponentImporter = () => import("./officer.support-C1hHQxHn.mjs");
var Route = createFileRoute("/officer/support")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
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
var rootRouteChildren = {
	IndexRoute: Route$10.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$11
	}),
	SitemapDotxmlRoute: Route$9.update({
		id: "/sitemap.xml",
		path: "/sitemap.xml",
		getParentRoute: () => Route$11
	}),
	AdminReportsRoute: Route$8.update({
		id: "/admin/reports",
		path: "/admin/reports",
		getParentRoute: () => Route$11
	}),
	AdminSettingsRoute: Route$7.update({
		id: "/admin/settings",
		path: "/admin/settings",
		getParentRoute: () => Route$11
	}),
	AdminSupportRoute: Route$6.update({
		id: "/admin/support",
		path: "/admin/support",
		getParentRoute: () => Route$11
	}),
	AdminTransactionLimitsRoute: Route$5.update({
		id: "/admin/transaction-limits",
		path: "/admin/transaction-limits",
		getParentRoute: () => Route$11
	}),
	CreditCasesRoute: Route$4.update({
		id: "/credit/cases",
		path: "/credit/cases",
		getParentRoute: () => Route$11
	}),
	CreditSettingsRoute: Route$3.update({
		id: "/credit/settings",
		path: "/credit/settings",
		getParentRoute: () => Route$11
	}),
	CreditSupportRoute: Route$2.update({
		id: "/credit/support",
		path: "/credit/support",
		getParentRoute: () => Route$11
	}),
	OfficerSettingsRoute: Route$1.update({
		id: "/officer/settings",
		path: "/officer/settings",
		getParentRoute: () => Route$11
	}),
	OfficerSupportRoute: Route.update({
		id: "/officer/support",
		path: "/officer/support",
		getParentRoute: () => Route$11
	})
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
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
