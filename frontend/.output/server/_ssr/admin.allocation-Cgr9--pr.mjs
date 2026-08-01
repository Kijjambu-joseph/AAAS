import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { r as Icon, t as AppShell } from "./AppShell-CHdJzBdJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.allocation-Cgr9--pr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AllocationQueuePage() {
	const [modalCaseId, setModalCaseId] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "-mx-xl -mt-xl mb-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 border-b border-outline-variant bg-surface-container-lowest px-xl py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-title-lg text-primary",
					children: "Allocation Queue & Engine Monitor"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-full bg-surface-container px-3 py-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-green-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold uppercase tracking-tight text-on-surface-variant",
						children: "Engine: Operational"
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-lg mt-5 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-label-bold uppercase text-on-surface-variant",
								children: "Pending Allocation"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "hourglass_empty",
								className: "text-primary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-display-lg text-primary",
							children: "24"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center gap-1 text-xs font-bold text-blue-600",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "trending_up",
								className: "text-sm"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "8% increase vs yesterday" })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-label-bold uppercase text-on-surface-variant",
								children: "Exceptions Found"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "warning",
								className: "text-error"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-display-lg text-error",
							children: "03"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex items-center text-xs text-on-surface-variant",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Requires Immediate Override" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-label-bold uppercase text-on-surface-variant",
								children: "Engine Throughput"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "bolt",
								className: "text-green-600"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-display-lg text-primary",
							children: "142/hr"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex items-center text-xs font-bold text-green-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "98.4% Accuracy Rating" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-label-bold uppercase text-on-surface-variant",
								children: "Finalization Window"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "timer",
								className: "text-secondary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-display-lg text-primary",
							children: "01:42:15"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex items-center text-xs text-on-surface-variant",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Next Batch Confirmation" })
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-outline-variant p-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-headline-sm text-primary",
							children: "Real-time Allocation Queue"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded bg-surface-container px-3 py-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "search",
								className: "text-sm"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "w-64 border-none bg-transparent p-0 text-body-sm focus:ring-0",
								placeholder: "Filter by Case ID or Auctioneer...",
								type: "text"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex items-center gap-2 rounded bg-primary px-4 py-2 text-label-bold text-on-primary transition-opacity hover:opacity-90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "refresh",
								className: "text-sm"
							}), "SYNC ENGINE"]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full border-collapse text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-outline-variant bg-surface-container-low text-label-bold uppercase text-on-surface-variant",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "sticky left-0 bg-surface-container-low px-lg py-4",
									children: "Case ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-lg py-4",
									children: "Assigned Auctioneer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-lg py-4",
									children: "Scoring Matrix Summary"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-lg py-4",
									children: "Countdown"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-lg py-4",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-lg py-4 text-right",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
							className: "divide-y divide-outline-variant text-body-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "transition-colors hover:bg-surface-container-high",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "sticky left-0 bg-surface-container-lowest px-lg py-3 font-bold text-mono-data text-primary",
											children: "CB-RE-2024-00124"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-6 rounded-full bg-slate-200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "M/S Kampala Auctioneers Ltd." })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-bold uppercase text-on-surface-variant",
															children: "Location Match"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-body-sm font-bold text-green-600",
															children: "95% (Central)"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-bold uppercase text-on-surface-variant",
															children: "Workload"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-body-sm font-bold text-blue-600",
															children: "2/10 (Low)"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-bold uppercase text-on-surface-variant",
															children: "Rating"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-body-sm font-bold text-primary",
															children: "4.8/5.0"
														})]
													})
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-3 text-mono-data text-on-surface-variant",
											children: "01:54:22"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded border border-blue-200 bg-blue-100 px-2 py-0.5 text-[11px] font-bold uppercase text-blue-900",
												children: "Allocated"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-3 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "text-label-bold text-primary hover:underline",
												onClick: () => setModalCaseId("CB-RE-2024-00124"),
												children: "RE-ASSIGN"
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "transition-colors hover:bg-surface-container-high",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "sticky left-0 bg-surface-container-lowest px-lg py-3 font-bold text-mono-data text-primary",
											children: "CB-RE-2024-00125"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-6 rounded-full bg-slate-200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Western Allied Agents" })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-bold uppercase text-on-surface-variant",
															children: "Location Match"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-body-sm font-bold text-green-600",
															children: "82% (Western)"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-bold uppercase text-on-surface-variant",
															children: "Workload"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-body-sm font-bold text-orange-600",
															children: "7/10 (High)"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-bold uppercase text-on-surface-variant",
															children: "Rating"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-body-sm font-bold text-primary",
															children: "4.2/5.0"
														})]
													})
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-3 text-mono-data text-on-surface-variant",
											children: "01:58:10"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded border border-blue-200 bg-blue-100 px-2 py-0.5 text-[11px] font-bold uppercase text-blue-900",
												children: "Allocated"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-3 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "text-label-bold text-primary hover:underline",
												onClick: () => setModalCaseId("CB-RE-2024-00125"),
												children: "RE-ASSIGN"
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "transition-colors hover:bg-surface-container-high",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "sticky left-0 bg-surface-container-lowest px-lg py-3 font-bold text-mono-data text-primary",
											children: "CB-AG-2024-01055"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-6 rounded-full bg-slate-200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Northern Estates Auctioneers" })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-bold uppercase text-on-surface-variant",
															children: "Location Match"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-body-sm font-bold text-green-600",
															children: "100% (Gulu)"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-bold uppercase text-on-surface-variant",
															children: "Workload"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-body-sm font-bold text-blue-600",
															children: "1/10 (Idle)"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-bold uppercase text-on-surface-variant",
															children: "Rating"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-body-sm font-bold text-primary",
															children: "4.5/5.0"
														})]
													})
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-3 text-mono-data text-on-surface-variant",
											children: "01:59:59"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded border border-blue-200 bg-blue-100 px-2 py-0.5 text-[11px] font-bold uppercase text-blue-900",
												children: "Allocated"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-3 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "text-label-bold text-primary hover:underline",
												onClick: () => setModalCaseId("CB-AG-2024-01055"),
												children: "RE-ASSIGN"
											})
										})
									]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-t border-outline-variant bg-surface-container-lowest p-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-body-sm text-on-surface-variant",
						children: "Showing 4 of 24 active allocations in current engine cycle."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-primary hover:bg-surface-container",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "chevron_left" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "flex h-8 w-8 items-center justify-center rounded border border-primary bg-primary text-xs font-bold text-on-primary",
								children: "1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-xs font-bold text-on-surface-variant hover:bg-surface-container",
								children: "2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-xs font-bold text-on-surface-variant hover:bg-surface-container",
								children: "3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-primary hover:bg-surface-container",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "chevron_right" })
							})
						]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-lg lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-sm lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "mb-md flex items-center gap-2 text-title-lg text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "terminal" }), "Allocation Engine Audit Log"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 text-[12px] font-medium",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 border-b border-surface-container-low p-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-on-surface-variant",
									children: "[14:22:05]"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-green-600",
									children: "INFO:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-on-surface",
									children: "Successfully allocated Case ID CB-RE-2024-00125 to Western Allied Agents (Score: 0.88)."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 border-b border-surface-container-low bg-red-50/50 p-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-on-surface-variant",
									children: "[14:21:58]"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-error",
									children: "EXCEPTION:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-on-surface",
									children: "Manual Override Required for Case ID CB-VE-2024-00892. No auctioneers within 200km radius."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 border-b border-surface-container-low p-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-on-surface-variant",
									children: "[14:20:12]"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-blue-600",
									children: "ENGINE:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-on-surface",
									children: "Batch processing started for 12 new recovery cases from Core Banking."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 border-b border-surface-container-low p-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-on-surface-variant",
									children: "[14:15:00]"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-on-surface-variant",
									children: "SYSTEM:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-on-surface",
									children: "Auctioneer Rating Database updated. Calculating workload shifts."
								})
							]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-lg bg-primary p-lg text-on-primary shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-md text-title-lg",
							children: "Engine Heatmap"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-lg text-body-sm opacity-80",
							children: "Visual density of currently pending allocations across regional hubs."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-label-bold uppercase",
										children: "Central Hub"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-secondary-container",
										children: "12 Cases"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 w-full overflow-hidden rounded-full bg-primary-container",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-[80%] bg-secondary-container" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-label-bold uppercase",
										children: "Northern Hub"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-secondary-container",
										children: "4 Cases"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 w-full overflow-hidden rounded-full bg-primary-container",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-[25%] bg-secondary-container" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-label-bold uppercase",
										children: "Western Hub"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-secondary-container",
										children: "8 Cases"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 w-full overflow-hidden rounded-full bg-primary-container",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-[50%] bg-secondary-container" })
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute -bottom-10 -right-10 opacity-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "hub",
						className: "text-[160px]"
					})
				})]
			})]
		}),
		modalCaseId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-[60] flex items-center justify-center p-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 bg-primary/40 backdrop-blur-sm",
				onClick: () => setModalCaseId(null)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full max-w-[32rem] overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-outline-variant bg-surface-container-low p-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "gavel",
								className: "text-error"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-title-lg text-primary",
								children: "Manual Allocation Override"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "text-on-surface-variant transition-colors hover:text-error",
							onClick: () => setModalCaseId(null),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "close" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-lg p-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded border border-outline-variant bg-surface-container-low p-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-1 text-[10px] font-bold uppercase text-on-surface-variant",
									children: "Target Case ID"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-headline-sm text-mono-data text-primary",
									children: modalCaseId
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-base",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-label-bold uppercase text-primary",
									children: "Select New Auctioneer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "w-full rounded border border-outline-variant bg-surface-container-lowest p-2.5 text-body-md focus:border-primary focus:ring-2 focus:ring-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "-- Choose Priority Auctioneer --"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "1",
											children: "Central Court Bailiffs (Capacity: High)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "2",
											children: "Apex Asset Recovery (Capacity: Normal)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "3",
											children: "National Auction Services (Capacity: Low)"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-base",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-label-bold uppercase text-primary",
									children: "Justification Code (Mandatory)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "w-full rounded border border-outline-variant bg-surface-container-lowest p-2.5 text-body-md focus:border-primary focus:ring-2 focus:ring-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "-- Select Audit Reason --"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "J1",
											children: "Engine Proximity Conflict Override"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "J2",
											children: "Court Mandated Assignment"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "J3",
											children: "Relationship Manager Priority Request"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "J4",
											children: "Exceptional Specialized Asset Expertise"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-base",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-label-bold uppercase text-primary",
									children: "Override Comments"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									className: "h-24 w-full rounded border border-outline-variant bg-surface-container-lowest p-md text-body-md focus:border-primary focus:ring-2 focus:ring-primary",
									placeholder: "Provide detailed institutional justification for this manual override..."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 rounded border border-error-container bg-red-50 p-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "info",
									className: "text-error"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-body-sm italic text-on-error-container",
									children: "This action will be permanently logged under your User ID and will trigger a Tier-2 Auditor notification."
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-3 border-t border-outline-variant bg-surface-container-low p-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "rounded px-6 py-2 text-label-bold uppercase text-on-surface-variant transition-colors hover:bg-surface-container-high",
							onClick: () => setModalCaseId(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "rounded bg-primary px-6 py-2 text-label-bold uppercase text-on-primary transition-opacity hover:opacity-90",
							children: "CONFIRM OVERRIDE"
						})]
					})
				]
			})]
		})
	] });
}
//#endregion
export { AllocationQueuePage as component };
