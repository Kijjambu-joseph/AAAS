import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { r as Icon, t as AppShell } from "./AppShell-CHdJzBdJ.mjs";
import { i as Modal } from "./ui-kit-D18jqlXM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.auctioneers-DcKMArcW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var auctioneers = [
	{
		name: "Quick-Exit Recoveries Ltd",
		license: "LIC-UG-2024-0012",
		status: "Valid",
		statusClass: "bg-green-100 text-green-800",
		expiry: "Oct 12, 2025",
		expiryClass: "",
		region: "Central, Eastern",
		workload: "8 / 15",
		workloadPct: 53,
		workloadColor: "bg-primary",
		leadTime: "12.5 Days",
		success: "92%",
		successClass: "text-green-600"
	},
	{
		name: "Summit Asset Liquidators",
		license: "LIC-UG-2023-0892",
		status: "Expiring Soon",
		statusClass: "bg-yellow-100 text-yellow-800",
		expiry: "Feb 28, 2024",
		expiryClass: "text-secondary font-bold",
		region: "Western, Northern",
		workload: "14 / 15",
		workloadPct: 93,
		workloadColor: "bg-secondary",
		leadTime: "18.2 Days",
		success: "74%",
		successClass: "text-on-surface-variant"
	},
	{
		name: "Nile Delta Auctions",
		license: "LIC-UG-2022-1104",
		status: "Expired",
		statusClass: "bg-red-100 text-red-800",
		expiry: "Dec 31, 2023",
		expiryClass: "text-error",
		region: "Northern",
		workload: "0 / 15",
		workloadPct: 0,
		workloadColor: "bg-error",
		leadTime: "22.0 Days",
		success: "61%",
		successClass: "text-on-surface-variant"
	},
	{
		name: "Equity Link Bailiffs",
		license: "LIC-UG-2024-0341",
		status: "Valid",
		statusClass: "bg-green-100 text-green-800",
		expiry: "Nov 05, 2025",
		expiryClass: "",
		region: "Central",
		workload: "3 / 15",
		workloadPct: 20,
		workloadColor: "bg-primary",
		leadTime: "9.8 Days",
		success: "96%",
		successClass: "text-green-600"
	}
];
function AuctioneerPanel() {
	const [addAuctioneerOpen, setAddAuctioneerOpen] = (0, import_react.useState)(false);
	const [importOpen, setImportOpen] = (0, import_react.useState)(false);
	const [exportOpen, setExportOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		searchPlaceholder: "Search by Firm Name or License...",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-headline-md text-primary",
					children: "Licensed Auctioneer Directory"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-body-md text-on-surface-variant",
					children: "Manage and allocate asset recovery cases to verified third-party partners."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-label-bold text-primary transition-colors hover:bg-surface-container-low",
							onClick: () => setImportOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "upload_file",
								className: "text-[18px]"
							}), "Import Auctioneers"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-label-bold text-primary transition-colors hover:bg-surface-container-low",
							onClick: () => setExportOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "download",
								className: "text-[18px]"
							}), "Export Directory"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-label-bold text-on-primary transition-opacity hover:opacity-90",
							onClick: () => setAddAuctioneerOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "add",
								className: "text-[18px]"
							}), "Add Auctioneer"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-md md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest p-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-label-bold uppercase text-on-surface-variant",
							children: "Total Partners"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-display-lg text-primary",
								children: "124"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-green-600",
								children: "+4 this month"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest p-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-label-bold uppercase text-on-surface-variant",
							children: "Avg. Success Rate"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-display-lg text-primary",
								children: "78.4%"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-on-surface-variant",
								children: "Industry: 72%"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest p-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-label-bold uppercase text-on-surface-variant",
							children: "Active Cases"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-display-lg text-primary",
								children: "412"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-secondary",
								children: "85% Capacity"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest p-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-label-bold uppercase text-on-surface-variant",
							children: "Avg. Lead Time"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-display-lg text-primary",
								children: "14.2d"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-green-600",
								children: "-1.2d improvement"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-lg border-b border-outline-variant bg-surface-container-low/50 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "ml-1 text-[10px] font-bold uppercase text-on-surface-variant",
									children: "Region Coverage"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "min-w-[160px] rounded border-outline-variant bg-surface-container-lowest px-3 py-1 text-body-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All Regions" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Central Region" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Western Region" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Northern Region" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Eastern Region" })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "ml-1 text-[10px] font-bold uppercase text-on-surface-variant",
									children: "License Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "min-w-[160px] rounded border-outline-variant bg-surface-container-lowest px-3 py-1 text-body-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Any Status" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Valid" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Expiring Soon" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Expired" })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "ml-1 text-[10px] font-bold uppercase text-on-surface-variant",
									children: "Capacity"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "min-w-[160px] rounded border-outline-variant bg-surface-container-lowest px-3 py-1 text-body-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Show All" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Has Capacity" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "At Limit" })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "mt-4 flex items-center gap-1 text-label-bold text-primary hover:underline",
								children: "Reset Filters"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full border-collapse text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "bg-surface-container text-label-bold uppercase tracking-wider text-on-surface-variant",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "border-b border-outline-variant px-6 py-4",
										children: "Firm Name / License"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "border-b border-outline-variant px-6 py-4",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "border-b border-outline-variant px-6 py-4",
										children: "Expiry Date"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "border-b border-outline-variant px-6 py-4 text-center",
										children: "Region"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "border-b border-outline-variant px-6 py-4 text-center",
										children: "Workload"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "border-b border-outline-variant px-6 py-4 text-right",
										children: "Lead Time"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "border-b border-outline-variant px-6 py-4 text-right",
										children: "Success"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "border-b border-outline-variant px-6 py-4" })
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "text-body-sm",
								children: auctioneers.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "group transition-colors odd:bg-surface-container-lowest even:bg-surface-container-low/40 hover:bg-surface-container-low",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "border-b border-outline-variant px-6 py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-primary",
													children: a.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] font-medium text-on-surface-variant",
													children: a.license
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "border-b border-outline-variant px-6 py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `rounded-full px-2 py-0.5 text-[11px] font-bold uppercase ${a.statusClass}`,
												children: a.status
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: `border-b border-outline-variant px-6 py-4 text-mono-data ${a.expiryClass}`,
											children: a.expiry
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "border-b border-outline-variant px-6 py-4 text-center",
											children: a.region
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "border-b border-outline-variant px-6 py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `font-bold ${a.workloadPct === 0 ? "text-error" : ""}`,
													children: a.workload
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-1.5 w-20 overflow-hidden rounded-full bg-surface-container",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: `h-full ${a.workloadColor}`,
														style: { width: `${a.workloadPct}%` }
													})
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "border-b border-outline-variant px-6 py-4 text-right text-mono-data",
											children: a.leadTime
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: `border-b border-outline-variant px-6 py-4 text-right font-bold ${a.successClass}`,
											children: a.success
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "border-b border-outline-variant px-6 py-4 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "text-on-surface-variant opacity-0 transition-colors group-hover:opacity-100 hover:text-primary",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "edit" })
											})
										})
									]
								}, a.license))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between bg-surface-container-lowest p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-body-sm text-on-surface-variant",
							children: "Showing 1 to 4 of 124 auctioneers"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									disabled: true,
									className: "rounded border border-outline-variant p-2 transition-colors hover:bg-surface-container disabled:opacity-50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "chevron_left",
										className: "text-sm"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded bg-primary px-3 py-1 text-label-bold text-on-primary",
									children: "1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded border border-outline-variant px-3 py-1 text-label-bold text-on-surface-variant hover:bg-surface-container",
									children: "2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded border border-outline-variant px-3 py-1 text-label-bold text-on-surface-variant hover:bg-surface-container",
									children: "3"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded border border-outline-variant p-2 transition-colors hover:bg-surface-container",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "chevron_right",
										className: "text-sm"
									})
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-lg lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-outline-variant bg-surface-container-lowest p-lg lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-title-lg text-primary",
							children: "Regional Workload Distribution"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium text-on-surface-variant",
							children: "Live Data: Updated 2 mins ago"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex h-64 items-center justify-center overflow-hidden rounded bg-surface-container-low",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 opacity-10",
							style: {
								backgroundImage: "radial-gradient(#00A0DF 1px, transparent 1px)",
								backgroundSize: "20px 20px"
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 grid h-full w-full grid-cols-4 gap-4 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-end rounded border border-primary/40 bg-primary/20 p-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-primary",
										children: "CENTRAL: 184 Cases"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-auto flex h-[60%] items-end rounded border border-secondary/40 bg-secondary/20 p-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-secondary",
										children: "WEST: 92 Cases"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-auto flex h-[40%] items-end rounded border border-primary/20 bg-primary/10 p-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-primary",
										children: "EAST: 68 Cases"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-auto flex h-[45%] items-end rounded border border-primary/20 bg-primary/10 p-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-primary",
										children: "NORTH: 68 Cases"
									})
								})
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-full flex-col rounded-lg border border-outline-variant bg-surface-container-lowest p-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "mb-4 text-title-lg text-primary",
						children: "Recent Audit Actions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-grow space-y-4 overflow-y-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 border-b border-outline-variant/30 pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-surface-container",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "person_add",
										className: "text-[16px]"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-body-sm font-bold leading-tight text-primary",
										children: "New Partner Onboarded"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-[11px] text-on-surface-variant",
										children: "Quick-Exit Recoveries Ltd added to Central Region Panel."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-medium text-on-surface-variant opacity-60",
										children: "Today, 09:42 AM • J. Doe"
									})
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 border-b border-outline-variant/30 pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-error-container",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "warning",
										className: "text-[16px] text-error"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-body-sm font-bold leading-tight text-primary",
										children: "License Expiry Warning"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-[11px] text-on-surface-variant",
										children: "Summit Asset Liquidators license expires in 12 days."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-medium text-on-surface-variant opacity-60",
										children: "Yesterday, 04:15 PM • System"
									})
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-surface-container",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "edit",
										className: "text-[16px]"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-body-sm font-bold leading-tight text-primary",
										children: "Profile Updated"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-[11px] text-on-surface-variant",
										children: "Contact information updated for Nile Delta Auctions."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-medium text-on-surface-variant opacity-60",
										children: "12 Feb, 11:20 AM • S. Mukasa"
									})
								] })]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-xl right-xl z-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "group relative flex h-14 w-14 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container shadow-lg transition-transform hover:scale-105 active:scale-95",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "assignment_add",
						className: "text-2xl"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute right-full mr-4 whitespace-nowrap rounded bg-primary px-3 py-1.5 text-xs text-on-primary opacity-0 transition-opacity group-hover:opacity-100",
						children: "Quick Case Allocation"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: addAuctioneerOpen,
				onClose: () => setAddAuctioneerOpen(false),
				title: "Add New Auctioneer",
				subtitle: "Register a new auctioneer partner firm to the panel",
				icon: "business",
				tone: "primary",
				size: "lg",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
						onClick: () => setAddAuctioneerOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
							children: "Save Draft"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md",
							children: "Register Auctioneer"
						})]
					})]
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block mb-2",
							children: "Firm Legal Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
							placeholder: "Registered business name"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-label-bold text-on-surface block mb-2",
								children: "License Number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
								placeholder: "e.g., LIC-UG-2024-0012"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-label-bold text-on-surface block mb-2",
								children: "URA Registration"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
								placeholder: "URA number"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-label-bold text-on-surface block mb-2",
								children: "License Expiry Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-label-bold text-on-surface block mb-2",
								children: "Primary Contact Person"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
								placeholder: "Full name"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-label-bold text-on-surface block mb-2",
								children: "Contact Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
								placeholder: "email@firm.com"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-label-bold text-on-surface block mb-2",
								children: "Contact Phone"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "tel",
								className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
								placeholder: "+256..."
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block mb-2",
							children: "Region Coverage (Select All Applicable)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [
								"Central Region",
								"Western Region",
								"Northern Region",
								"Eastern Region"
							].map((region) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									className: "rounded border-outline-variant"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-body-sm text-on-surface",
									children: region
								})]
							}, region))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block mb-2",
							children: "Maximum Caseload Capacity"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
							placeholder: "e.g., 15",
							min: "1"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block mb-2",
							children: "Upload License Document"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-2 border-dashed border-outline-variant rounded-lg p-6 text-center hover:bg-primary/5 transition-colors cursor-pointer",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "cloud_upload",
									className: "mx-auto text-2xl text-primary mb-2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-body-sm text-on-surface-variant",
									children: "Click to upload or drag and drop"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-outline mt-1",
									children: "PDF, JPG or PNG (max. 5MB)"
								})
							]
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: importOpen,
				onClose: () => setImportOpen(false),
				title: "Import Auctioneer Firms",
				subtitle: "Upload one or more firm data files and bring structured auctioneer records into the panel.",
				icon: "upload_file",
				tone: "secondary",
				size: "lg",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
						onClick: () => setImportOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
							children: "Review File"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md",
							children: "Import Now"
						})]
					})]
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-outline-variant bg-surface-container-low p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-body-sm text-on-surface-variant",
								children: "Multiple uploads are supported. Accepted formats: CSV, XLSX, JSON."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-outline mt-2",
								children: "Files are validated against existing license numbers and merged into the active auctioneer directory."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block mb-2",
							children: "Select files to import"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							multiple: true,
							accept: ".csv,.xlsx,.json",
							className: "w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-label-bold text-on-surface mb-2",
									children: "Import strategy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-body-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "importMode",
										defaultChecked: true,
										className: "h-4 w-4 text-primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Merge with existing records" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-body-sm mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "importMode",
										className: "h-4 w-4 text-primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Create new records only" })]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-label-bold text-on-surface mb-2",
									children: "Validation options"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-body-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										className: "h-4 w-4 text-primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Skip rows with invalid data" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-body-sm mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										className: "h-4 w-4 text-primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Send summary to compliance inbox" })]
								})
							] })]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: exportOpen,
				onClose: () => setExportOpen(false),
				title: "Export Auctioneer Directory",
				subtitle: "Download the current auctioneer roster or filtered selection for external reporting.",
				icon: "download",
				tone: "primary",
				size: "lg",
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
							children: "Export CSV"
						})]
					})]
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-body-sm text-on-surface-variant mb-3",
						children: "Select the export scope and file type for the auctioneer panel data."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-3 rounded-lg border border-outline-variant p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "exportScope",
									defaultChecked: true,
									className: "h-4 w-4 text-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-body-sm",
									children: "Current view"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-3 rounded-lg border border-outline-variant p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "exportScope",
									className: "h-4 w-4 text-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-body-sm",
									children: "Full directory"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-3 rounded-lg border border-outline-variant p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "exportScope",
									className: "h-4 w-4 text-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-body-sm",
									children: "Compliance audit package"
								})]
							})
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-3",
						children: [
							{
								label: "CSV",
								value: "csv"
							},
							{
								label: "XLSX",
								value: "xlsx"
							},
							{
								label: "PDF",
								value: "pdf"
							}
						].map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 rounded-lg border border-outline-variant p-3 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								name: "exportType",
								value: option.value,
								className: "h-4 w-4 text-primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-body-sm",
								children: option.label
							})]
						}, option.value))
					})]
				})
			})
		]
	});
}
//#endregion
export { AuctioneerPanel as component };
