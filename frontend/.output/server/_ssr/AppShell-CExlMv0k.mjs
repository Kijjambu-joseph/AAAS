import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useNavigate, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-CExlMv0k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DATABASE_ROLE_MAP = {
	"CREDIT_OFFICER_H/O": "credit-Officer H/O",
	"LOAN_OFFICER_BRANCH": "loan-officer-branch",
	"SYSTEM_ADMIN": "credit-Officer H/O"
};
function sessionUserFromDatabase(user) {
	const name = `${user.first_name} ${user.last_name}`.trim() || user.username;
	const role = DATABASE_ROLE_MAP[user.role];
	return {
		role,
		name,
		title: ROLE_LABEL[role],
		avatar: AVATAR
	};
}
var ROLE_LABEL = {
	"credit-Officer H/O": "Credit Officer H/O",
	"loan-officer-branch": "Loan Officer - Branch"
};
var AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuCdh0izp6zCUt-68fDJqipBTdvIpFPJMVTp0LOrFoZXZyTkxTG4jhmt0ZBJciimouBhyLA7pVpOr8rTqg7tJHnzJyJwS2DvRjHP_I2EFEbSSZhCTxjQZrgHY1nv9qEz5LrkJQXbNxJBtEu_gRsufNhucDGohTWaxrdu1XxNseibvPfpP_88MwS_0ieWW3_s_FVhDnNrg_al1Hz1Sq8IAkt3YxjSh83rJ3bWrXpjD7UNJkVkCATHjXI9RBzgOlJhyI5EzJKhhZ1fPIsA";
var ROLE_NAV = {
	"credit-Officer H/O": [
		{
			label: "Dashboard",
			icon: "dashboard",
			to: "/admin"
		},
		{
			label: "Case Registry",
			icon: "inventory_2",
			to: "/credit/cases"
		},
		{
			label: "Auctioneer Panel",
			icon: "gavel",
			to: "/admin/auctioneers"
		},
		{
			label: "Allocation Queue",
			icon: "queue",
			to: "/admin/allocation"
		},
		{
			label: "Transaction Limits",
			icon: "account_balance",
			to: "/admin/transaction-limits"
		},
		{
			label: "Reports",
			icon: "assessment",
			to: "/admin/reports"
		},
		{
			label: "Audit Logs",
			icon: "history",
			to: "/admin/audit"
		}
	],
	"loan-officer-branch": [
		{
			label: "Dashboard",
			icon: "dashboard",
			to: "/credit"
		},
		{
			label: "Case Registry",
			icon: "inventory_2",
			to: "/credit/cases"
		},
		{
			label: "Allocation Engine",
			icon: "queue",
			to: "/credit/allocation"
		}
	]
};
var ROLE_HOME = {
	"credit-Officer H/O": "/admin",
	"loan-officer-branch": "/credit"
};
var KEY = "aaas.session";
function readSession() {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
function writeSession(user) {
	window.localStorage.setItem(KEY, JSON.stringify(user));
	window.dispatchEvent(new Event("aaas-session"));
}
function clearSession() {
	window.localStorage.removeItem(KEY);
	window.dispatchEvent(new Event("aaas-session"));
}
var LOGO_URL = "/assets/centenary-logo-BLmpXd1I.png";
function useSession() {
	const [user, setUser] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const sync = () => setUser(readSession());
		sync();
		setReady(true);
		window.addEventListener("aaas-session", sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener("aaas-session", sync);
			window.removeEventListener("storage", sync);
		};
	}, []);
	return {
		user,
		ready
	};
}
function Icon({ name, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `material-symbols-outlined ${className}`,
		children: name
	});
}
function BrandLogo({ className = "h-10 w-10" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: LOGO_URL,
		alt: "Centenary Bank",
		className: `${className} object-contain`,
		loading: "lazy"
	});
}
var NOTIFICATIONS = [
	{
		icon: "gavel",
		tone: "text-primary",
		title: "Auctioneer license expiring",
		body: "M. K. Ssekandi Auctioneers — license AUC-2023-44102 expires in 3 days.",
		time: "12 min ago"
	},
	{
		icon: "warning",
		tone: "text-error",
		title: "Allocation exception raised",
		body: "Case RECOV-2901-X could not be auto-allocated. Manual assignment required.",
		time: "48 min ago"
	},
	{
		icon: "task_alt",
		tone: "text-success",
		title: "Recovery completed",
		body: "Case CAS-092-21 closed with UGX 450M recovered.",
		time: "2 hrs ago"
	},
	{
		icon: "policy",
		tone: "text-secondary",
		title: "Compliance review due",
		body: "Quarterly audit pack for Q3 is awaiting your sign-off.",
		time: "Yesterday"
	}
];
function AppShell({ children, searchPlaceholder = "Search cases, auctioneers, or regions..." }) {
	const { user, ready } = useSession();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [logoutOpen, setLogoutOpen] = (0, import_react.useState)(false);
	const [notifOpen, setNotifOpen] = (0, import_react.useState)(false);
	const [search, setSearch] = (0, import_react.useState)("");
	const menuRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (ready && !user) navigate({
			to: "/",
			replace: true
		});
	}, [
		ready,
		user,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		const onClick = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
		};
		document.addEventListener("mousedown", onClick);
		return () => document.removeEventListener("mousedown", onClick);
	}, []);
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-screen bg-background" });
	const home = ROLE_HOME[user.role];
	const settingsTo = `${home}/settings`;
	const supportTo = `${home}/support`;
	const nav = ROLE_NAV[user.role];
	const results = search.trim() ? nav.filter((n) => n.label.toLowerCase().includes(search.trim().toLowerCase())) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-on-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed left-0 top-0 z-50 flex h-full w-60 flex-col bg-primary py-lg shadow-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex flex-col items-center gap-3 px-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { className: "h-20 w-20 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "truncate text-[10px] tracking-wider text-white font-bold",
								children: "Auto-Allocation Of Auctioneers System"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-center text-[10px] uppercase tracking-widest text-white opacity-80 font-bold",
								children: "Centenary Bank"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 space-y-1 overflow-y-auto",
						children: nav.map((item) => {
							const active = item.to === pathname || item.to !== "/admin" && item.to !== "/credit" && item.to !== "/officer" && pathname.startsWith(item.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: active ? "mx-2 my-1 flex scale-95 items-center gap-3 rounded-lg bg-secondary-container px-4 py-3 text-on-secondary-container transition-transform active:scale-90" : "mx-2 my-1 flex items-center gap-3 rounded-lg px-4 py-3 text-white transition-all hover:bg-secondary-container hover:text-on-secondary-container active:scale-90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: item.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-label-bold",
									children: item.label
								})]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto space-y-1 border-t border-white/10 pt-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: supportTo,
							className: "mx-2 my-1 flex items-center gap-3 rounded-lg px-4 py-3 text-white transition-all hover:bg-secondary-container hover:text-on-secondary-container",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "help" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-label-bold",
								children: "Support"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setLogoutOpen(true),
							className: "mx-2 my-1 flex w-[calc(100%-1rem)] items-center gap-3 rounded-lg px-4 py-3 text-white transition-all hover:bg-secondary-container hover:text-on-secondary-container",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "logout" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-label-bold",
								children: "Sign Out"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "fixed left-56 top-0 z-40 flex h-16 w-[calc(100%-14rem)] items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex px-8 min-w-0 items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { className: "h-8 w-8 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-96 max-w-[40vw]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "search",
								className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: search,
								onChange: (e) => setSearch(e.target.value),
								className: "w-full rounded-full border border-outline-variant bg-surface-container-low py-2 pl-11 pr-4 text-body-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary",
								placeholder: searchPlaceholder,
								type: "text"
							}),
							results.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute left-0 top-11 z-50 w-full overflow-hidden rounded-[10px] border border-outline-variant bg-surface-container-lowest shadow-xl",
								children: results.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: r.to,
									onClick: () => setSearch(""),
									className: "flex items-center gap-3 px-4 py-3 text-body-sm hover:bg-surface-container",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: r.icon,
										className: "text-[18px] text-primary"
									}), r.label]
								}, r.to))
							}) : null
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setNotifOpen(true),
							"aria-label": "Notifications",
							className: "relative rounded-full p-1 text-on-surface-variant transition-colors hover:text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "notifications" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-error text-[9px] font-bold text-on-error",
								children: NOTIFICATIONS.length
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: settingsTo,
							"aria-label": "Settings",
							className: "rounded-full p-1 text-on-surface-variant transition-colors hover:text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "settings" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							ref: menuRef,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setMenuOpen((v) => !v),
								className: "flex items-center gap-2 rounded-full py-1 pl-3 pr-1 transition-colors hover:bg-surface-container",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hidden text-right sm:block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-label-bold text-primary",
										children: ROLE_LABEL[user.role]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-on-surface-variant",
										children: user.name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-8 w-8 overflow-hidden rounded-full border border-outline-variant",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										className: "h-full w-full object-cover",
										src: user.avatar,
										alt: user.name
									})
								})]
							}), menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-[10px] border border-outline-variant bg-surface-container-lowest shadow-2xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 border-b border-outline-variant bg-surface-container-low px-4 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											className: "h-10 w-10 rounded-full object-cover",
											src: user.avatar,
											alt: user.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate text-label-bold text-primary",
												children: user.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate text-[11px] text-on-surface-variant",
												children: ROLE_LABEL[user.role]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: settingsTo,
										onClick: () => setMenuOpen(false),
										className: "flex items-center gap-3 px-4 py-3 text-body-sm hover:bg-surface-container",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											name: "manage_accounts",
											className: "text-[20px] text-primary"
										}), "Profile & Settings"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: supportTo,
										onClick: () => setMenuOpen(false),
										className: "flex items-center gap-3 px-4 py-3 text-body-sm hover:bg-surface-container",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											name: "support_agent",
											className: "text-[20px] text-primary"
										}), "Help & Support"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											setMenuOpen(false);
											setLogoutOpen(true);
										},
										className: "flex w-full items-center gap-3 border-t border-outline-variant px-4 py-3 text-body-sm text-error hover:bg-error-container/40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											name: "logout",
											className: "text-[20px]"
										}), "Sign Out"]
									})
								]
							}) : null]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "ml-56 mt-16 p-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-container-max space-y-lg",
					children
				})
			}),
			notifOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-[100] flex items-start justify-center p-md pt-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-primary/40 backdrop-blur-[2px]",
					onClick: () => setNotifOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 w-full max-w-[32rem] overflow-hidden rounded-[10px] border border-outline-variant bg-surface-container-lowest shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-outline-variant px-lg py-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "notifications_active",
									className: "text-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-title-lg text-primary",
									children: "Notifications"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setNotifOpen(false),
								"aria-label": "Close notifications",
								className: "rounded-full p-1 text-on-surface-variant hover:bg-surface-container",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "close" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-h-[50vh] divide-y divide-outline-variant overflow-y-auto",
							children: NOTIFICATIONS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 px-lg py-md hover:bg-surface-container-low",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: n.icon,
									className: `mt-0.5 shrink-0 ${n.tone}`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-label-bold text-on-surface",
											children: n.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-body-sm text-on-surface-variant",
											children: n.body
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[11px] uppercase tracking-wider text-outline",
											children: n.time
										})
									]
								})]
							}, n.title))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between border-t border-outline-variant bg-surface-container-low px-lg py-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setNotifOpen(false),
								className: "text-label-bold text-primary hover:underline",
								children: "MARK ALL AS READ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setNotifOpen(false),
								className: "text-label-bold text-on-surface-variant hover:underline",
								children: "CLOSE"
							})]
						})
					]
				})]
			}) : null,
			logoutOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-[110] flex items-center justify-center p-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-primary/50 backdrop-blur-[2px]",
					onClick: () => setLogoutOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 w-full max-w-[28rem] overflow-hidden rounded-[10px] border border-outline-variant bg-surface-container-lowest shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-sm px-lg py-lg text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { className: "h-12 w-12" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-title-lg text-primary",
								children: "Sign out of AAAS?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-body-sm text-on-surface-variant",
								children: [
									"You are signed in as ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: user.name }),
									" (",
									ROLE_LABEL[user.role],
									"). Any unsaved work on this workstation will be discarded."
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-sm border-t border-outline-variant bg-surface-container-low px-lg py-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setLogoutOpen(false),
							className: "rounded-[10px] border border-outline-variant px-lg py-sm text-label-bold text-primary hover:bg-surface-container",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								clearSession();
								navigate({
									to: "/",
									replace: true
								});
							},
							className: "rounded-[10px] bg-error px-lg py-sm text-label-bold text-on-error hover:opacity-90",
							children: "Yes, sign out"
						})]
					})]
				})]
			}) : null
		]
	});
}
function PageHeader({ title, subtitle, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 items-end gap-4 sm:grid-cols-[minmax(0,1fr)_auto]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-display-lg text-primary",
				children: title
			}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-body-md text-on-surface-variant",
				children: subtitle
			}) : null]
		}), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-sm",
			children: actions
		}) : null]
	});
}
//#endregion
export { ROLE_HOME as a, useSession as c, PageHeader as i, writeSession as l, BrandLogo as n, ROLE_LABEL as o, Icon as r, sessionUserFromDatabase as s, AppShell as t };
