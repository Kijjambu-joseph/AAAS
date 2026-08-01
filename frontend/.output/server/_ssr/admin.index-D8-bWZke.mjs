import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { r as Icon, t as AppShell } from "./AppShell-CHdJzBdJ.mjs";
import { i as Modal, n as DashboardWelcome, t as Button } from "./ui-kit-D18jqlXM.mjs";
import { i as StatusPieChart, n as RecoveryTrendChart, r as RegionBarChart, t as ChartCard } from "./Charts-PtUEWSYD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-D8-bWZke.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TREND = [
	{
		month: "Jan",
		recovered: 18,
		target: 22
	},
	{
		month: "Feb",
		recovered: 24,
		target: 24
	},
	{
		month: "Mar",
		recovered: 21,
		target: 25
	},
	{
		month: "Apr",
		recovered: 31,
		target: 27
	},
	{
		month: "May",
		recovered: 28,
		target: 28
	},
	{
		month: "Jun",
		recovered: 36,
		target: 30
	}
];
var STATUS = [
	{
		name: "Allocated",
		value: 512
	},
	{
		name: "In auction",
		value: 268
	},
	{
		name: "Pending",
		value: 331
	},
	{
		name: "Exceptions",
		value: 173
	}
];
var REGION_DATA = [
	{
		region: "Central",
		cases: 420
	},
	{
		region: "Western",
		cases: 221
	},
	{
		region: "Northern",
		cases: 180
	},
	{
		region: "Eastern",
		cases: 186
	}
];
var monthlyBars = [
	{
		label: "JAN",
		height: 40,
		opacity: "opacity-40"
	},
	{
		label: "FEB",
		height: 55,
		opacity: "opacity-50"
	},
	{
		label: "MAR",
		height: 45,
		opacity: "opacity-60"
	},
	{
		label: "APR",
		height: 75,
		opacity: "opacity-70"
	},
	{
		label: "MAY",
		height: 60,
		opacity: "opacity-80"
	}
];
var regions = [
	{
		name: "Central (Kampala)",
		pct: "42%",
		highlight: true
	},
	{
		name: "Western (Mbarara)",
		pct: "22%",
		highlight: false
	},
	{
		name: "Northern (Gulu)",
		pct: "18%",
		highlight: false
	},
	{
		name: "Eastern (Mbale)",
		pct: "18%",
		highlight: false
	}
];
var auctioneers = [
	{
		name: "Abbey & Associates",
		pct: 92,
		color: "bg-error"
	},
	{
		name: "Heritage Recoveries",
		pct: 64,
		color: "bg-primary"
	},
	{
		name: "Pearl Asset Liquidators",
		pct: 41,
		color: "bg-primary"
	}
];
function AdminDashboard() {
	const [cycleOpen, setCycleOpen] = (0, import_react.useState)(false);
	const [exportOpen, setExportOpen] = (0, import_react.useState)(false);
	const [initiateOpen, setInitiateOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardWelcome, {
			message: "Institution-wide recovery performance across all Uganda regions. Review exceptions, approve allocations and publish the monthly board pack.",
			stats: [{
				label: "Active cases",
				value: "1,284"
			}, {
				label: "Recovered YTD",
				value: "UGX 42.6B"
			}],
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "gold",
				icon: "rocket_launch",
				onClick: () => setCycleOpen(true),
				children: "Run allocation cycle"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				icon: "download",
				onClick: () => setExportOpen(true),
				children: "Export board pack"
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-display-lg text-primary",
				children: "Recovery Overview"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-body-md text-on-surface-variant",
				children: "Live performance metrics for Uganda regional liquidation."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-high px-lg py-sm text-label-bold text-primary transition-colors hover:bg-surface-variant",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "calendar_today",
						className: "text-[18px]"
					}), "Last 30 Days"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "flex items-center gap-2 rounded-lg bg-primary px-lg py-sm text-label-bold text-on-primary transition-opacity hover:opacity-90",
					onClick: () => setInitiateOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "add_circle",
						className: "text-[18px]"
					}), "Initiate Recovery"]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg bg-primary-fixed p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "folder_managed",
								className: "text-primary"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 text-label-bold text-green-600",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "trending_up",
								className: "text-[14px]"
							}), " +4.2%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-label-bold uppercase tracking-wider text-on-surface-variant",
								children: "Total Active Cases"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 text-display-lg",
								children: "1,284"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-body-sm text-on-surface-variant",
								children: "Active: 840 | Closed: 444"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg bg-secondary-fixed p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "verified",
								className: "text-secondary"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 text-label-bold text-green-600",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "trending_up",
								className: "text-[14px]"
							}), " +1.8%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-label-bold uppercase tracking-wider text-on-surface-variant",
								children: "Success Rate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 text-display-lg",
								children: "78.5%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-secondary",
									style: { width: "78.5%" }
								})
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg bg-tertiary-fixed p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "bolt",
								className: "text-tertiary"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 text-label-bold text-green-600",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "speed",
								className: "text-[14px]"
							}), " -82%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-label-bold uppercase tracking-wider text-on-surface-variant",
								children: "Allocation Speed"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 text-display-lg",
								children: "18.4 hrs"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-body-sm text-on-surface-variant",
								children: "Down from 5 days baseline"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg bg-primary-container p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "payments",
								className: "text-on-primary"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-label-bold text-primary",
							children: "Target reached"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-label-bold uppercase tracking-wider text-on-surface-variant",
								children: "Value Under Recovery"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 text-display-lg",
								children: "UGX 14.2B"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-body-sm text-on-surface-variant",
								children: "Recovered YTD: UGX 8.6B"
							})
						]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-lg lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-title-lg text-primary",
						children: "Recovery Performance Trends"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "border-none bg-transparent text-label-bold text-on-surface-variant focus:ring-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Volume (UGX)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Case Count" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-64 items-stretch justify-between gap-2 px-4",
					children: [monthlyBars.map((bar) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group flex flex-1 flex-col justify-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `w-full rounded-t-sm bg-primary-fixed-dim transition-opacity hover:opacity-80 ${bar.opacity}`,
							style: { height: `${bar.height}%` }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 text-center text-[10px] font-semibold tracking-[0.05em]",
							children: bar.label
						})]
					}, bar.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group flex flex-1 flex-col justify-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full rounded-t-sm bg-primary",
							style: { height: "90%" }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 text-center text-[10px] font-bold tracking-[0.05em]",
							children: "JUN"
						})]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "mb-4 text-title-lg text-primary",
						children: "Regional Distribution"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 bg-cover bg-center opacity-10 transition-opacity group-hover:opacity-20",
						style: { backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAELQE5XHRGTyAC0P6TKNV92a0-6MtXXMAFyg7iL-UnTZrf2hnZ_0uECs9uzOHGHKwi-HPn-0Xca3M_Mei_lJhUXFi3LN8_lKF5sBJnGU5h8C9RvliT1nUzC2ve_7md1iljhXM5Ayfb1ze7YPUwzuGYFJhyD3V4vh45v0LEbm3ZLIubAXaVpzdA6Lli0VrMYzGIeHZC9JXclaQm_7sR0lLRGmVBs6fHCErAeESWeijUPxz_hE4i442L9sk03w9NM_c5V1YM4-EcBFKB')" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative z-10 space-y-4",
						children: regions.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors hover:bg-surface-container",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-body-md",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded px-2 py-0.5 text-mono-data ${r.highlight ? "bg-primary-fixed" : "bg-surface-container-high"}`,
								children: r.pct
							})]
						}, r.name))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex items-center gap-1 text-label-bold text-primary hover:underline",
							children: ["View District Details ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "arrow_forward",
								className: "text-[16px]"
							})]
						})
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-lg lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "mb-6 text-title-lg text-primary",
					children: "Top Auctioneer Capacity"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-6",
					children: auctioneers.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-end justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-label-bold",
							children: a.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-mono-data",
							children: [a.pct, "% Capacity"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 w-full overflow-hidden rounded-full bg-surface-container-high",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `h-full ${a.color}`,
							style: { width: `${a.pct}%` }
						})
					})] }, a.name))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-outline-variant p-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-title-lg text-primary",
						children: "System Activity Audit"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "animate-pulse rounded-full bg-error-container px-2 py-0.5 text-[10px] font-bold text-on-error-container",
						children: "2 CRITICAL ALERTS"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-75 flex-1 overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 border-b border-outline-variant bg-error-container/10 p-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-error-container",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "warning",
									className: "text-error"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-label-bold text-error",
									children: "HIGH-VALUE OVERRIDE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-medium text-on-surface-variant",
									children: "2 mins ago"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-body-md",
								children: [
									"Manual allocation of ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: "Case #88219 (UGX 450M)"
									}),
									" by Admin. Primary logic bypassed."
								]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 border-b border-outline-variant p-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "assignment_turned_in",
									className: "text-on-surface-variant"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-label-bold text-primary",
									children: "AUTO-ALLOCATION"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-medium text-on-surface-variant",
									children: "14 mins ago"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-body-md",
								children: [
									"Case #88224 assigned to ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: "Heritage Recoveries"
									}),
									" based on proximity score (9.8/10)."
								]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 border-b border-outline-variant p-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "person_add",
									className: "text-on-surface-variant"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-label-bold text-primary",
									children: "NEW REGISTRATION"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-medium text-on-surface-variant",
									children: "1 hr ago"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-body-md",
								children: [
									"Added ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: "Swift Bailiffs Ltd"
									}),
									" to Central Region pool."
								]
							})] })]
						})
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-lg lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Recovery trend",
					subtitle: "Recovered value vs target (UGX bn)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecoveryTrendChart, { data: TREND })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
				title: "Portfolio status",
				subtitle: "Share of active recovery cases",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPieChart, { data: STATUS })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
			title: "Regional caseload",
			subtitle: "Active cases by region",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegionBarChart, { data: REGION_DATA })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			open: cycleOpen,
			onClose: () => setCycleOpen(false),
			title: "Run Allocation Cycle",
			subtitle: "Execute automatic case-to-auctioneer allocation engine with current queue",
			icon: "rocket_launch",
			tone: "primary",
			size: "md",
			footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
					onClick: () => setCycleOpen(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
						children: "Schedule"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md",
						children: "Launch Engine"
					})]
				})]
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-primary/5 border border-primary/20 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-body-sm text-on-surface",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold",
								children: "Current Queue:"
							}), " 42 cases pending allocation"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-body-sm text-on-surface-variant mt-1",
							children: "Last run: Today, 09:15 AM"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-label-bold text-on-surface block mb-2",
						children: "Allocation Parameters"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: true,
									className: "rounded border-outline-variant",
									readOnly: true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-body-sm text-on-surface",
									children: "Prioritize high-DPD cases"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: true,
									className: "rounded border-outline-variant",
									readOnly: true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-body-sm text-on-surface",
									children: "Balance auctioneer workload"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									className: "rounded border-outline-variant"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-body-sm text-on-surface",
									children: "Override compliance flags"
								})]
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-label-bold text-on-surface block mb-2",
						children: "Email Report To"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "email",
						className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
						placeholder: "admin@centenary.ug"
					})] })
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			open: exportOpen,
			onClose: () => setExportOpen(false),
			title: "Export Board Pack",
			subtitle: "Generate monthly board report with performance metrics and exceptions",
			icon: "download",
			tone: "primary",
			size: "md",
			footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
					onClick: () => setExportOpen(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
						children: "Preview"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md",
						children: "Export PDF"
					})]
				})]
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-label-bold text-on-surface block mb-2",
						children: "Report Month"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "June 2024 (Current)" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "May 2024" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "April 2024" })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-label-bold text-on-surface block mb-2",
						children: "Report Sections"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: [
							"Executive Summary",
							"Recovery Performance",
							"Regional Analysis",
							"Auctioneer Metrics",
							"Exceptions & Flags",
							"Audit Trail"
						].map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: true,
								className: "rounded border-outline-variant",
								readOnly: true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-body-sm text-on-surface",
								children: section
							})]
						}, section))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-label-bold text-on-surface block mb-2",
						children: "Distribution List"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
						placeholder: "board@centenary.ug; cfo@centenary.ug"
					})] })
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			open: initiateOpen,
			onClose: () => setInitiateOpen(false),
			title: "Initiate Recovery",
			subtitle: "Register a new recovery case into the system workflow",
			icon: "add_circle",
			tone: "primary",
			size: "lg",
			footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
					onClick: () => setInitiateOpen(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
						children: "Save Draft"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md",
						children: "Create Recovery"
					})]
				})]
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-label-bold text-on-surface block mb-2",
						children: "Borrower Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
						placeholder: "Full legal name"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block mb-2",
							children: "National ID / Registration"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
							placeholder: "ID number"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block mb-2",
							children: "Borrower Type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Individual" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Corporate" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "SME" })
							]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-label-bold text-on-surface block mb-2",
						children: "Loan ID"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
						placeholder: "e.g., LOAN-2024-001234"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block mb-2",
							children: "Outstanding Principal (UGX)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
							placeholder: "0"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block mb-2",
							children: "Days Past Due (DPD)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
							placeholder: "0"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-label-bold text-on-surface block mb-2",
						children: "Collateral Type"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Land & Buildings" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Motor Vehicles" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Plant & Machinery" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Commercial Stock" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Securities & Bonds" })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-label-bold text-on-surface block mb-2",
						children: "Collateral Description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
						rows: 3,
						placeholder: "Details about the collateral..."
					})] })
				]
			})
		})
	] });
}
//#endregion
export { AdminDashboard as component };
