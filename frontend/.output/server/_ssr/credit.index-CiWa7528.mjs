import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { r as Icon, t as AppShell } from "./AppShell-CHdJzBdJ.mjs";
import { t as Api } from "./api-BumNLaxK.mjs";
import { n as DashboardWelcome, t as Button } from "./ui-kit-D18jqlXM.mjs";
import { i as ThroughputLineChart, r as StatusPieChart, t as ChartCard } from "./Charts-B39A64-B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/credit.index-CiWa7528.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var UGX = new Intl.NumberFormat("en-UG", {
	style: "currency",
	currency: "UGX",
	maximumFractionDigits: 0
});
var list = (value) => Array.isArray(value) ? value : value?.results ?? [];
var daysUntil = (date) => Math.ceil((new Date(date).getTime() - Date.now()) / 864e5);
function CreditDashboard() {
	const [cases, setCases] = (0, import_react.useState)([]);
	const [auctioneers, setAuctioneers] = (0, import_react.useState)([]);
	const [allocations, setAllocations] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		Promise.all([
			Api.get("/api/cases/?ordering=-created_at"),
			Api.get("/api/auctioneers/?ordering=license_expiry"),
			Api.get("/api/allocations/?ordering=-allocated_at")
		]).then(([caseData, auctioneerData, allocationData]) => {
			setCases(list(caseData));
			setAuctioneers(list(auctioneerData));
			setAllocations(list(allocationData));
		}).finally(() => setLoading(false));
	}, []);
	const pending = cases.filter((item) => item.status === "Pending");
	const recovered = cases.filter((item) => item.status === "Recovered");
	const activeCases = cases.filter((item) => ![
		"Recovered",
		"Closed",
		"Cancelled"
	].includes(item.status));
	const activePartners = auctioneers.filter((item) => item.status);
	const expiring = auctioneers.filter((item) => daysUntil(item.license_expiry) <= 30).slice(0, 5);
	const capacity = activePartners.length ? Math.round(activePartners.reduce((sum, item) => sum + Number(item.current_workload || 0), 0) / activePartners.length) : 0;
	const recoveryRate = cases.length ? Math.round(recovered.length / cases.length * 100) : 0;
	const throughput = (0, import_react.useMemo)(() => {
		const days = Array.from({ length: 7 }, (_, index) => {
			const day = /* @__PURE__ */ new Date();
			day.setDate(day.getDate() - (6 - index));
			return {
				key: day.toDateString(),
				day: day.toLocaleDateString("en", { weekday: "short" }),
				allocated: 0,
				exceptions: 0
			};
		});
		allocations.forEach((item) => {
			const found = days.find((day) => day.key === new Date(item.allocated_at).toDateString());
			if (found) found.allocated += 1;
		});
		cases.filter((item) => item.status === "Pending").forEach((item) => {
			const found = days.find((day) => day.key === new Date(item.created_at).toDateString());
			if (found) found.exceptions += 1;
		});
		return days.map(({ day, allocated, exceptions }) => ({
			day,
			allocated,
			exceptions
		}));
	}, [allocations, cases]);
	const queueSplit = [
		{
			name: "Pending",
			value: pending.length
		},
		{
			name: "Allocated",
			value: cases.filter((item) => item.status === "Allocated").length
		},
		{
			name: "In recovery",
			value: cases.filter((item) => item.status === "In Recovery").length
		},
		{
			name: "Recovered",
			value: recovered.length
		}
	].filter((item) => item.value > 0);
	const recentActivity = allocations.slice(0, 4).map((item) => ({
		title: "Allocation approved",
		note: `${item.auctioneer?.company_name ?? "Auctioneer"} assigned to ${item.recovery_case?.case_number ?? "case"}`,
		time: new Date(item.allocated_at).toLocaleString()
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		searchPlaceholder: "Search cases or auctioneers...",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardWelcome, {
				message: loading ? "Loading portfolio data..." : "Live allocation, licence and recovery data from the AAAS system.",
				stats: [
					{
						label: "In queue",
						value: String(pending.length)
					},
					{
						label: "Recovery rate",
						value: `${recoveryRate}%`
					},
					{
						label: "Outstanding",
						value: UGX.format(activeCases.reduce((sum, item) => sum + Number(item.outstanding_balance || 0), 0))
					}
				],
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "gold",
					icon: "queue",
					onClick: () => window.location.assign("/credit/allocation"),
					children: "Open allocation engine"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-md md:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						icon: "diversity_3",
						label: "Active partners",
						value: activePartners.length,
						note: `${new Set(activePartners.map((item) => item.region)).size} regions represented`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						icon: "pending_actions",
						label: "Pending allocations",
						value: pending.length,
						note: "Cases awaiting assignment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						icon: "groups",
						label: "Average caseload",
						value: capacity,
						note: "Active cases per partner"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						icon: "warning",
						label: "Licence alerts",
						value: expiring.length,
						note: "Licences expiring within 30 days",
						error: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-lg grid grid-cols-1 gap-lg xl:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest xl:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b border-outline-variant bg-surface-container-low px-md py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-title-lg text-primary",
							children: "Licence expiry tracking"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-surface-container-high text-label-bold text-on-surface-variant",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-md py-3",
										children: "AUCTIONEER"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-md py-3",
										children: "LICENSE"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-md py-3 text-center",
										children: "CASES HELD"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-md py-3",
										children: "EXPIRY"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-md py-3",
										children: "STATUS"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
								className: "divide-y divide-outline-variant",
								children: [expiring.map((item) => {
									const days = daysUntil(item.license_expiry);
									const urgent = days <= 7;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-md py-3 font-bold text-primary",
											children: [item.company_name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[11px] font-normal text-on-surface-variant",
												children: [item.region, " region"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-md py-3 text-body-sm",
											children: item.license_number
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-md py-3 text-center text-mono-data",
											children: item.current_workload
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-md py-3 text-body-sm",
											children: [new Date(item.license_expiry).toLocaleDateString(), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: urgent ? "text-error text-[11px]" : "text-on-surface-variant text-[11px]",
												children: days < 0 ? "Expired" : `${days} days remaining`
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-md py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: urgent ? "text-error" : "text-secondary",
												children: urgent ? "URGENT" : "WARNING"
											})
										})
									] }, item.id);
								}), !loading && !expiring.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-md py-6 text-center text-on-surface-variant",
									colSpan: 5,
									children: "No licence expiries in the next 30 days."
								}) }) : null]
							})]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-md text-title-lg text-primary",
								children: "Allocation queue"
							}),
							pending.slice(0, 4).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-sm flex items-center justify-between rounded-lg border-l-4 border-primary bg-surface-container p-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-primary",
									children: item.case_number
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-on-surface-variant",
									children: item.branch?.branch_name ?? "Unknown branch"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-body-sm font-bold",
									children: UGX.format(Number(item.outstanding_balance || 0))
								})]
							}, item.id)),
							!loading && !pending.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-body-sm text-on-surface-variant",
								children: "No cases are awaiting allocation."
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-md text-title-lg text-primary",
								children: "Recent activity"
							}),
							recentActivity.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-md border-l-2 border-primary pl-md",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-primary",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-on-surface-variant",
										children: item.note
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[10px] text-outline",
										children: item.time
									})
								]
							}, `${item.note}-${index}`)),
							!loading && !recentActivity.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-body-sm text-on-surface-variant",
								children: "No allocations have been recorded yet."
							}) : null
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-lg grid grid-cols-1 gap-lg lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
						title: "Allocation throughput",
						subtitle: "Recorded allocations and pending cases created this week",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThroughputLineChart, { data: throughput })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Portfolio composition",
					subtitle: "Live case statuses",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPieChart, { data: queueSplit })
				})]
			})
		]
	});
}
function Metric({ icon, label, value, note, error = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				name: icon,
				className: error ? "text-error" : "text-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-md text-label-bold uppercase text-on-surface-variant",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: error ? "text-display-lg text-error" : "text-display-lg text-primary",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-[11px] text-on-surface-variant",
				children: note
			})
		]
	});
}
//#endregion
export { CreditDashboard as component };
