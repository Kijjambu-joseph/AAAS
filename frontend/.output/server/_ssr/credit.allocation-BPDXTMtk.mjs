import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { r as Icon, t as AppShell } from "./AppShell-CHdJzBdJ.mjs";
import { a as Toolbar, o as useSearchFilter, r as EmptyRow, t as Button } from "./ui-kit-D18jqlXM.mjs";
import { t as Api } from "./api-BumNLaxK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/credit.allocation-BPDXTMtk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var list = (value) => Array.isArray(value) ? value : value?.results ?? [];
var UGX = new Intl.NumberFormat("en-UG", {
	style: "currency",
	currency: "UGX",
	maximumFractionDigits: 0
});
function AllocationEngine() {
	const [cases, setCases] = (0, import_react.useState)([]);
	const [auctioneers, setAuctioneers] = (0, import_react.useState)([]);
	const [allocations, setAllocations] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const refresh = () => Promise.all([
		Api.get("/api/cases/?ordering=-created_at"),
		Api.get("/api/auctioneers/?ordering=current_workload"),
		Api.get("/api/allocations/?ordering=-allocated_at")
	]).then(([caseData, auctioneerData, allocationData]) => {
		setCases(list(caseData));
		setAuctioneers(list(auctioneerData));
		setAllocations(list(allocationData));
	}).finally(() => setLoading(false));
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	const queue = (0, import_react.useMemo)(() => cases.filter((item) => item.status === "Pending").map((item) => ({
		id: item.id,
		caseNumber: item.case_number,
		priority: item.priority,
		status: "Pending allocation",
		createdAt: item.created_at,
		region: item.branch?.region ?? "Unknown",
		valuation: Number(item.outstanding_balance || 0)
	})), [cases]);
	const queueFilter = useSearchFilter(queue, [
		"caseNumber",
		"priority",
		"status",
		"region"
	], "priority");
	const eligible = auctioneers.filter((item) => item.status && new Date(item.license_expiry) >= /* @__PURE__ */ new Date());
	const exceptions = queue.filter((item) => !eligible.some((auctioneer) => auctioneer.region === item.region));
	const candidateRanking = eligible.slice().sort((a, b) => Number(a.current_workload || 0) - Number(b.current_workload || 0)).slice(0, 3);
	const regionalLoads = Array.from(new Set(cases.map((item) => item.branch?.region).filter(Boolean))).map((region) => ({
		region,
		value: cases.filter((item) => item.branch?.region === region && ![
			"Recovered",
			"Closed",
			"Cancelled"
		].includes(item.status)).length
	}));
	const maxLoad = Math.max(...regionalLoads.map((item) => item.value), 1);
	async function allocate(caseId) {
		const recoveryCase = cases.find((item) => item.id === caseId);
		const auctioneer = eligible.filter((item) => item.region === recoveryCase?.branch?.region).sort((a, b) => Number(a.current_workload || 0) - Number(b.current_workload || 0))[0];
		if (!auctioneer) return;
		await Api.post(`/api/cases/${caseId}/allocate/`, {
			auctioneer_id: auctioneer.id,
			method: "Manual"
		});
		await refresh();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-title-lg text-primary",
					children: "Allocation Queue & Engine Monitor"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-secondary-container px-sm py-1 text-[10px] font-semibold text-secondary",
					children: "LIVE DATA"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-md md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Active queue",
						value: queue.length,
						note: "Pending recovery cases",
						icon: "queue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Manual exceptions",
						value: exceptions.length,
						note: "No eligible regional partner",
						icon: "warning",
						error: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Eligible partners",
						value: eligible.length,
						note: "Active and licence-valid",
						icon: "verified"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Recent allocations",
						value: allocations.length,
						note: "Recorded allocation history",
						icon: "assignment_turned_in"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-lg xl:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-lg xl:col-span-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-lg bg-primary-container p-lg text-on-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-headline-sm",
								children: "Auto-allocation queue"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-xs text-body-sm opacity-85",
								children: "Candidates are ranked from the live panel by current caseload. A case is only assigned to an active, licence-valid partner in its branch region."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-outline-variant bg-surface-container-low px-lg py-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-title-lg",
									children: "Recommended panel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-body-sm text-on-surface-variant",
									children: "Lowest current caseload"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "divide-y divide-outline-variant",
								children: [candidateRanking.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between px-lg py-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] text-on-primary",
											children: index + 1
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold text-primary",
											children: item.company_name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-on-surface-variant",
											children: [
												item.region,
												" · licence expires ",
												new Date(item.license_expiry).toLocaleDateString()
											]
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-mono-data text-primary",
										children: [item.current_workload, " cases"]
									})]
								}, item.id)), !loading && !candidateRanking.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "p-lg text-body-sm text-on-surface-variant",
									children: "No eligible auctioneers are available."
								}) : null]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-b border-outline-variant px-lg py-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-title-lg",
									children: "Current processing queue"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, {
									query: queueFilter.query,
									onQuery: queueFilter.setQuery,
									filter: queueFilter.filter,
									onFilter: queueFilter.setFilter,
									options: queueFilter.options,
									placeholder: "Search by case ID, priority, or region..."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										className: "bg-surface-container-high text-label-bold text-on-surface-variant",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-lg py-sm",
												children: "CREATED"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-lg py-sm",
												children: "CASE ID"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-lg py-sm",
												children: "PRIORITY"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-lg py-sm",
												children: "REGION"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-lg py-sm",
												children: "OUTSTANDING"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-lg py-sm text-right",
												children: "ACTION"
											})
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [queueFilter.results.map((item) => {
										const canAllocate = eligible.some((auctioneer) => auctioneer.region === item.region);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "even:bg-surface-container-low",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-lg py-md text-body-sm",
													children: new Date(item.createdAt).toLocaleString()
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-lg py-md font-bold text-primary",
													children: item.caseNumber
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-lg py-md",
													children: item.priority
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-lg py-md",
													children: item.region
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-lg py-md text-mono-data",
													children: UGX.format(item.valuation)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-lg py-md text-right",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														disabled: !canAllocate,
														onClick: () => allocate(item.id),
														children: "Allocate"
													})
												})
											]
										}, item.id);
									}), !queueFilter.results.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyRow, {
										colSpan: 6,
										label: loading ? "Loading queue..." : "No pending cases match your search."
									}) : null] })]
								})
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-lg xl:col-span-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-lg border border-outline-variant bg-surface-container-lowest p-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mb-md text-title-lg",
									children: "Regional workload"
								}),
								regionalLoads.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-xs flex justify-between text-body-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.region }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-mono-data",
											children: [item.value, " active"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 overflow-hidden rounded-full bg-surface-container",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full bg-primary",
											style: { width: `${item.value / maxLoad * 100}%` }
										})
									})]
								}, item.region)),
								!regionalLoads.length && !loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-body-sm text-on-surface-variant",
									children: "No active case workload."
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-b border-outline-variant px-lg py-md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-title-lg",
									children: "Unallocated exceptions"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "divide-y divide-outline-variant",
								children: [exceptions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-md",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold text-primary",
											children: item.caseNumber
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-body-sm text-error",
											children: ["No active, licence-valid auctioneer in ", item.region]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-mono-data text-body-sm",
											children: UGX.format(item.valuation)
										})
									]
								}, item.id)), !exceptions.length && !loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "p-md text-body-sm text-on-surface-variant",
									children: "No regional allocation exceptions."
								}) : null]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "border-b border-outline-variant px-lg py-md",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-title-lg",
										children: "Recent allocations"
									})
								}),
								allocations.slice(0, 5).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-b border-outline-variant p-md",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold text-primary",
											children: item.recovery_case?.case_number
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-on-surface-variant",
											children: item.auctioneer?.company_name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[10px] text-outline",
											children: new Date(item.allocated_at).toLocaleString()
										})
									]
								}, item.id)),
								!allocations.length && !loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "p-md text-body-sm text-on-surface-variant",
									children: "No allocations recorded."
								}) : null
							]
						})
					]
				})]
			})
		]
	}) });
}
function Stat({ label, value, note, icon, error = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-outline-variant bg-surface-container-lowest p-md",
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
				className: "mt-xs text-body-sm text-on-surface-variant",
				children: note
			})
		]
	});
}
//#endregion
export { AllocationEngine as component };
