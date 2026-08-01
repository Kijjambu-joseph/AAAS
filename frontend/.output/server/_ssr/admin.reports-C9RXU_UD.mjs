import { n as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { i as PageHeader, r as Icon, t as AppShell } from "./AppShell-EE99Et3W.mjs";
import { n as Modal, t as Button } from "./ui-kit-BI8B3iAj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.reports-C9RXU_UD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReportsPage() {
	const [exportOpen, setExportOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		searchPlaceholder: "Search reports, case IDs...",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Reports & Analytics",
				subtitle: "Real-time recovery performance and allocation metrics overview.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "calendar_month",
							className: "mr-sm text-outline"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-body-md text-on-surface-variant",
							children: "Oct 1, 2023 - Oct 31, 2023"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "expand_more",
							className: "ml-md text-[18px] text-outline"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex items-center rounded-lg bg-primary px-lg py-sm font-bold text-body-md text-on-primary shadow-sm transition-all hover:bg-primary-container",
						onClick: () => setExportOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "download",
							className: "mr-sm text-[20px]"
						}), "Export Data"]
					})
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-1 gap-lg md:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-sm flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-primary-fixed p-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "folder_open",
										className: "text-primary"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-green-50 px-sm py-xs text-xs font-bold text-green-600",
									children: "+12%"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-xs text-body-sm font-label-bold uppercase tracking-wider text-on-surface-variant",
								children: "Total Cases Processed"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-headline-md text-primary",
								children: "1,284"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-sm h-1 w-full overflow-hidden rounded-full bg-surface-container",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-primary",
									style: { width: "75%" }
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-sm flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-secondary-fixed p-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "timer",
										className: "text-secondary"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-red-50 px-sm py-xs text-xs font-bold text-red-600",
									children: "-2.4h"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-xs text-body-sm font-label-bold uppercase tracking-wider text-on-surface-variant",
								children: "Avg. Allocation TAT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-headline-md text-primary",
								children: "18.5 hrs"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-sm flex items-center gap-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-body-sm text-on-surface-variant",
									children: "Below monthly threshold"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-sm flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-tertiary-fixed p-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "trending_up",
										className: "text-tertiary"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-green-50 px-sm py-xs text-xs font-bold text-green-600",
									children: "+4.2%"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-xs text-body-sm font-label-bold uppercase tracking-wider text-on-surface-variant",
								children: "Recovery Performance"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-headline-md text-primary",
								children: "92.4%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-sm flex items-center gap-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "h-8 w-full overflow-visible",
									viewBox: "0 0 100 20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M0 15 Q 10 5, 20 12 T 40 8 T 60 14 T 80 5 T 100 10",
										fill: "none",
										stroke: "#00A0DF",
										strokeWidth: "2"
									})
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-outline-variant border-l-4 border-l-error bg-surface-container-lowest p-md shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-sm flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-error-container p-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "warning",
										className: "text-error"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded px-sm py-xs text-xs font-bold text-error",
									children: "Critical"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-xs text-body-sm font-label-bold uppercase tracking-wider text-on-surface-variant",
								children: "Active Exceptions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-headline-md text-error",
								children: "24"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-sm text-body-sm font-medium text-on-surface-variant",
								children: "9 requiring immediate action"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: exportOpen,
				onClose: () => setExportOpen(false),
				title: "Export Reports",
				subtitle: "Choose a format and export the current dashboard data.",
				icon: "download",
				tone: "primary",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setExportOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							children: "Preview"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => setExportOpen(false),
							children: "Export Now"
						})]
					})]
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-body-sm font-semibold text-on-surface-variant",
							children: "Format"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "mt-2 w-full rounded-lg border border-outline-variant bg-background px-md py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "PDF" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Excel" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "CSV" })
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-body-sm text-on-surface-variant",
							children: "Export scope"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-3 text-body-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "exportScope",
									defaultChecked: true,
									className: "h-4 w-4 text-primary"
								}), "Current dashboard only"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-3 text-body-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "exportScope",
									className: "h-4 w-4 text-primary"
								}), "Full report history"]
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-12 gap-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-12 flex h-[400px] flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm xl:col-span-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-lg flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-title-lg text-primary",
							children: "Allocation Trends (Yearly)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-label-bold text-on-surface-variant",
									children: "Allocated"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-secondary-container" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-label-bold text-on-surface-variant",
									children: "Resolved"
								})]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative flex flex-1 items-end justify-between gap-md border-b border-l border-outline-variant/30 px-md pb-md",
						children: [
							{
								m: "Jan",
								a: 40,
								r: 30
							},
							{
								m: "Feb",
								a: 55,
								r: 45
							},
							{
								m: "Mar",
								a: 70,
								r: 60
							},
							{
								m: "Apr",
								a: 65,
								r: 50
							},
							{
								m: "May",
								a: 85,
								r: 75
							},
							{
								m: "Jun",
								a: 60,
								r: 40
							}
						].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group flex flex-1 flex-col items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full max-w-[40px] rounded-t bg-primary opacity-40 transition-opacity group-hover:opacity-100",
									style: { height: `${d.a}%` }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-[-2px] w-full max-w-[40px] rounded-t bg-secondary-container",
									style: { height: `${d.r}%` }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-sm text-[10px] font-bold uppercase text-outline",
									children: d.m
								})
							]
						}, d.m))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-12 flex h-[400px] flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm xl:col-span-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "mb-md text-title-lg text-primary",
							children: "Regional Distribution"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mb-md flex-1 overflow-hidden rounded-lg bg-surface-container-low",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 bg-cover bg-center opacity-80",
									style: { backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7avZkBFgAM_J0hSUAfRCo6iA9s7kt2Ps0fZRbY1YgYRVAWm-HFsOlGy7dzkgK7EX2QA5AFSIsWElP3jq6KMlEgC1kX81OPp4VhY8TzZ6mzsX8jmdSWbykdlpl3PNd73G1kBFSCr4pGxWM-8iJHu2aLiy_PEBOR7Xg2oNozymNE7eGblaMXUFU_1KARMnnHlfho0tdtjM5RK9EIDH0wEqqKQiFb9cbKnZhNXe4R9q8PZpahASRmEpGcQ1Hd4L2EOxcRuraE0aqMWTj')" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pointer-events-none absolute inset-0 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-12 w-12 animate-pulse items-center justify-center rounded-full border-2 border-primary bg-primary/20",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-4 rounded-full bg-primary" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute left-1/3 top-1/4 rounded-lg border border-outline-variant bg-surface-container-lowest p-xs text-[10px] font-bold shadow-xl",
									children: "Central: 542"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute bottom-1/3 right-1/4 rounded-lg border border-outline-variant bg-surface-container-lowest p-xs text-[10px] font-bold shadow-xl",
									children: "Eastern: 312"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-body-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-on-surface-variant",
									children: "Central Region"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-primary",
									children: "42.2%"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-body-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-on-surface-variant",
									children: "Western Region"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-primary",
									children: "24.1%"
								})]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-outline-variant p-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-title-lg text-primary",
							children: "Recent Generated Reports"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex items-center text-body-sm font-bold text-primary hover:underline",
							children: ["View Archive ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "arrow_forward",
								className: "ml-xs text-[18px]"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full border-collapse text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-surface-container-low",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-lg py-md text-xs font-label-bold uppercase tracking-wider text-outline",
										children: "Report Name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-lg py-md text-xs font-label-bold uppercase tracking-wider text-outline",
										children: "Type"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-lg py-md text-xs font-label-bold uppercase tracking-wider text-outline",
										children: "Generated By"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-lg py-md text-xs font-label-bold uppercase tracking-wider text-outline",
										children: "Date"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-lg py-md text-xs font-label-bold uppercase tracking-wider text-outline",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-lg py-md text-right text-xs font-label-bold uppercase tracking-wider text-outline",
										children: "Action"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-outline-variant/30",
								children: [
									{
										icon: "picture_as_pdf",
										iconColor: "text-primary",
										name: "Monthly_Recovery_Performance_Oct23",
										type: "Performance Summary",
										by: "System (Automated)",
										date: "Oct 31, 2023 | 23:59",
										status: "READY",
										statusColor: "bg-green-100 text-green-800"
									},
									{
										icon: "description",
										iconColor: "text-green-700",
										name: "Auctioneer_Allocation_Log_v2",
										type: "Allocation Detail",
										by: "J. Doe (Admin)",
										date: "Oct 28, 2023 | 14:22",
										status: "READY",
										statusColor: "bg-green-100 text-green-800"
									},
									{
										icon: "picture_as_pdf",
										iconColor: "text-primary",
										name: "Compliance_Audit_Quarter_3",
										type: "Compliance Audit",
										by: "Audit Dept",
										date: "Oct 15, 2023 | 09:10",
										status: "ARCHIVED",
										statusColor: "bg-blue-100 text-blue-800"
									},
									{
										icon: "history",
										iconColor: "text-orange-600",
										name: "Exception_Summary_Weekly_Final",
										type: "Incident Report",
										by: "System (Automated)",
										date: "Oct 07, 2023 | 08:00",
										status: "READY",
										statusColor: "bg-green-100 text-green-800"
									}
								].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "transition-colors hover:bg-surface-container-low/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-md",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
													name: r.icon,
													className: `text-[20px] ${r.iconColor}`
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-body-md text-primary",
													children: r.name
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-md text-body-sm text-on-surface-variant",
											children: r.type
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-md text-body-sm text-on-surface-variant",
											children: r.by
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-md text-body-sm text-on-surface-variant",
											children: r.date
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-md",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `inline-flex items-center rounded px-sm py-xs text-[11px] font-bold ${r.statusColor}`,
												children: r.status
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-lg py-md text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "rounded p-sm text-primary transition-colors hover:bg-primary-fixed",
												title: "Download Report",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "download" })
											})
										})
									]
								}, r.name))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center border-t border-outline-variant bg-surface-container-low/30 p-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "flex items-center gap-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-outline transition-colors hover:bg-surface-container-lowest",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "chevron_left",
										className: "text-[18px]"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "flex h-8 w-8 items-center justify-center rounded bg-primary text-xs font-bold text-on-primary",
									children: "1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-xs font-bold text-primary transition-colors hover:bg-surface-container-lowest",
									children: "2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-xs font-bold text-primary transition-colors hover:bg-surface-container-lowest",
									children: "3"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-xs font-bold text-outline",
									children: "..."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-xs font-bold text-primary transition-colors hover:bg-surface-container-lowest",
									children: "12"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-outline transition-colors hover:bg-surface-container-lowest",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "chevron_right",
										className: "text-[18px]"
									})
								})
							]
						})
					})
				]
			})
		]
	});
}
//#endregion
export { ReportsPage as component };
