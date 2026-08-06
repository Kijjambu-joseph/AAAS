import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { r as Icon, t as AppShell } from "./AppShell-CExlMv0k.mjs";
import { i as Modal, n as DashboardWelcome, t as Button } from "./ui-kit-rxJ3QVV7.mjs";
import { n as RecoveryTrendChart, r as StatusPieChart, t as ChartCard } from "./Charts-B39A64-B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/officer.index-DZf8L6Wc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MY_TREND = [
	{
		month: "Feb",
		recovered: 4,
		target: 5
	},
	{
		month: "Mar",
		recovered: 6,
		target: 5
	},
	{
		month: "Apr",
		recovered: 5,
		target: 6
	},
	{
		month: "May",
		recovered: 8,
		target: 6
	},
	{
		month: "Jun",
		recovered: 7,
		target: 7
	}
];
var MY_STATUS = [
	{
		name: "Allocated",
		value: 9
	},
	{
		name: "Submitted",
		value: 5
	},
	{
		name: "Draft",
		value: 2
	},
	{
		name: "Closed",
		value: 2
	}
];
var cases = [
	{
		id: "#REC-9821-K",
		name: "Tumusiime Emmanuel",
		asset: "Real Estate (Residential)",
		status: "Allocated",
		statusClass: "bg-green-100 text-green-800",
		action: "View Details"
	},
	{
		id: "#REC-0452-P",
		name: "Agaba Martha Rita",
		asset: "Commercial Vehicle",
		status: "Submitted",
		statusClass: "bg-blue-100",
		statusStyle: { color: "#001b3e" },
		action: "View Details"
	},
	{
		id: "#REC-1109-W",
		name: "Mukasa Furniture Ltd",
		asset: "Industrial Machinery",
		status: "Draft",
		statusClass: "bg-slate-100 text-slate-800",
		action: "Continue Editing"
	},
	{
		id: "#REC-7732-S",
		name: "Nakato Josephine",
		asset: "Real Estate (Land)",
		status: "Allocated",
		statusClass: "bg-green-100 text-green-800",
		action: "View Details"
	},
	{
		id: "#REC-2101-B",
		name: "Baluku & Sons Cargo",
		asset: "Logistics Fleet",
		status: "Submitted",
		statusClass: "bg-blue-100",
		statusStyle: { color: "#001b3e" },
		action: "View Details"
	}
];
var pendingValuations = [
	{
		id: "Asset Val-4491",
		name: "Kireka Residential Complex",
		note: "Assigned: Today, 9:00 AM",
		action: "Ping Valuer",
		highlight: true
	},
	{
		id: "Asset Val-4488",
		name: "Mercedes Actros Tipper",
		note: "Assigned: Yesterday",
		action: "Details",
		highlight: false
	},
	{
		id: "Asset Val-4480",
		name: "Entebbe Plot 12A",
		note: "Assigned: 2 days ago",
		action: "Details",
		highlight: false
	}
];
var auditTrail = [
	{
		title: "Case #REC-9821-K Allocated",
		detail: "Auctioneer 'Standard Assets' assigned by Registry Dept.",
		time: "14:32 PM",
		color: "bg-primary"
	},
	{
		title: "Draft Updated",
		detail: "John Mukasa edited collateral details for Mukasa Furniture Ltd.",
		time: "11:15 AM",
		color: "bg-secondary-container"
	},
	{
		title: "System Login",
		detail: "User session started on Terminal-04.",
		time: "08:00 AM",
		color: "bg-outline"
	}
];
function OfficerDashboard() {
	const [newCaseOpen, setNewCaseOpen] = (0, import_react.useState)(false);
	const [uploadOpen, setUploadOpen] = (0, import_react.useState)(false);
	const [registerOpen, setRegisterOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardWelcome, {
			message: "Here are your assigned recovery files, pending valuations and drafts awaiting submission.",
			stats: [
				{
					label: "My cases",
					value: "18"
				},
				{
					label: "Pending valuations",
					value: "3"
				},
				{
					label: "Drafts",
					value: "2"
				}
			],
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "gold",
				icon: "add_circle",
				onClick: () => setNewCaseOpen(true),
				children: "New case file"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				icon: "upload_file",
				onClick: () => setUploadOpen(true),
				children: "Upload document"
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-display-lg text-primary",
				children: "System Overview"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-2xl text-body-md text-on-surface-variant",
				children: "Manage institutional recovery cases, monitor valuation statuses, and finalize draft submissions for auction allocation."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "flex items-center gap-2 rounded-xl bg-primary px-xl py-lg text-on-primary shadow-lg transition-all hover:bg-primary-container active:scale-95",
				onClick: () => setRegisterOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "add_circle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-title-lg",
					children: "Register New Case"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-lg md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-base flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-lg bg-primary-fixed p-2 text-primary-container",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "cases" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded bg-success/10 px-2 py-1 text-[11px] text-success font-semibold tracking-[0.05em]",
								children: "+4.2%"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold tracking-[0.05em]",
							children: "My Active Cases"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-display-lg text-primary",
							children: "128"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-base flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-lg bg-secondary-fixed p-2 text-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "pending_actions" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded bg-secondary-fixed-dim/20 px-2 py-1 text-[11px] text-secondary font-semibold tracking-[0.05em]",
								children: "Urgent"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold tracking-[0.05em]",
							children: "Pending Valuations"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-display-lg text-primary",
							children: "14"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-base flex items-start justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-lg bg-tertiary-fixed p-2 text-on-tertiary-container",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "history_edu" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold tracking-[0.05em]",
							children: "Draft Submissions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-display-lg text-primary",
							children: "23"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex flex-col justify-between overflow-hidden rounded-xl bg-primary p-md text-on-primary",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] uppercase tracking-wider opacity-70 font-semibold tracking-[0.05em]",
								children: "Allocated Value"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "mt-1 text-display-lg text-secondary-container",
								children: ["4.2B ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-normal text-on-primary",
									children: "UGX"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "relative z-10 flex items-center gap-1 text-label-bold",
							children: ["View Detailed Report ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "arrow_forward",
								className: "text-sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-[-20px] right-[-20px] rotate-12 scale-150 opacity-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "account_balance",
								className: "text-9xl"
							})
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-lg lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-lg lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-outline-variant bg-surface-container-low px-lg py-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-title-lg text-primary",
								children: "Recent Case Activity"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "flex items-center gap-1 rounded border border-outline-variant px-3 py-1.5 text-body-sm text-on-surface-variant hover:bg-surface-variant text-label-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "filter_list",
										className: "text-sm"
									}), " Filter"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "flex items-center gap-1 rounded border border-outline-variant px-3 py-1.5 text-body-sm text-on-surface-variant hover:bg-surface-variant text-label-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "download",
										className: "text-sm"
									}), " Export"]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full border-collapse text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-outline-variant bg-surface-container-high",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-lg py-3 uppercase text-on-surface-variant text-label-bold",
											children: "Case ID"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-lg py-3 uppercase text-on-surface-variant text-label-bold",
											children: "Borrower Name"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-lg py-3 uppercase text-on-surface-variant text-label-bold",
											children: "Asset Type"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-lg py-3 uppercase text-on-surface-variant text-label-bold",
											children: "Status"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-lg py-3 text-right uppercase text-on-surface-variant text-label-bold",
											children: "Action"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-outline-variant",
									children: cases.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "transition-colors hover:bg-surface-container-low",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-lg py-3 font-bold text-primary text-mono-data",
												children: c.id
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-lg py-3 text-body-md text-on-surface",
												children: c.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-lg py-3 text-body-sm text-on-surface-variant",
												children: c.asset
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-lg py-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs text-label-bold ${c.statusClass}`,
													style: c.statusStyle,
													children: c.status
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-lg py-3 text-right",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "text-xs uppercase tracking-tight text-primary hover:text-primary-container font-semibold tracking-[0.05em]",
													children: c.action
												})
											})
										]
									}, c.id))
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-t border-outline-variant bg-surface-container-low px-lg py-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-body-sm text-on-surface-variant",
								children: "Showing 5 of 128 active cases"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded border border-outline-variant px-3 py-1 opacity-50",
									disabled: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "chevron_left",
										className: "text-sm"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded border border-outline-variant px-3 py-1 transition-colors hover:bg-surface-variant",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "chevron_right",
										className: "text-sm"
									})
								})]
							})]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "mb-md flex items-center gap-2 text-title-lg text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "request_quote",
								className: "text-secondary"
							}), " Pending Valuations"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-md",
							children: pendingValuations.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `rounded-r-lg border-l-4 bg-surface-container-low p-3 ${v.highlight ? "border-secondary" : "border-outline-variant opacity-80"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-on-surface text-label-bold",
										children: v.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-body-sm text-on-surface-variant",
										children: v.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate text-[11px] italic text-on-surface-variant",
											children: v.note
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "shrink-0 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.05em] text-primary hover:underline",
											children: v.action
										})]
									})
								]
							}, v.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "mt-lg w-full rounded border border-primary/20 py-2 text-center text-primary transition-colors hover:bg-primary-fixed text-label-bold",
							children: "View All Pending (14)"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-md text-title-lg text-primary",
						children: "System Audit Trail"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative space-y-lg before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-[2px] before:bg-outline-variant before:content-['']",
						children: auditTrail.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative pl-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute left-0 top-1 h-6 w-6 rounded-full border-4 border-surface-container-lowest ${a.color}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold text-on-surface font-medium",
									children: a.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-body-sm text-on-surface-variant",
									children: a.detail
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase text-outline font-semibold tracking-[0.05em]",
									children: a.time
								})
							]
						}, i))
					})]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-lg lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "My submissions",
					subtitle: "Cases submitted vs allocated over recent months",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecoveryTrendChart, { data: MY_TREND })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
				title: "Case status",
				subtitle: "Breakdown of my portfolio",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPieChart, { data: MY_STATUS })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			open: newCaseOpen,
			onClose: () => setNewCaseOpen(false),
			title: "Create New Case File",
			subtitle: "Initiate a new recovery case with borrower and collateral information",
			icon: "add_circle",
			tone: "primary",
			size: "lg",
			footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
					onClick: () => setNewCaseOpen(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
						children: "Save Draft"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md",
						children: "Create File"
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
							children: "National ID"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
							placeholder: "ID number"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block mb-2",
							children: "Loan ID"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
							placeholder: "LOAN-2024-001234"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block mb-2",
							children: "Outstanding Amount (UGX)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
							placeholder: "0"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block mb-2",
							children: "Asset Type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Real Estate (Residential)" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Real Estate (Commercial)" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Motor Vehicle" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Industrial Machinery" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Logistics Fleet" })
							]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-label-bold text-on-surface block mb-2",
						children: "Asset Description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
						rows: 3,
						placeholder: "Details about the asset..."
					})] })
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			open: uploadOpen,
			onClose: () => setUploadOpen(false),
			title: "Upload Case Document",
			subtitle: "Upload supporting documentation for case files or valuations",
			icon: "upload_file",
			tone: "primary",
			size: "md",
			footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
					onClick: () => setUploadOpen(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
						children: "Preview"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md",
						children: "Upload"
					})]
				})]
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-label-bold text-on-surface block mb-2",
						children: "Case ID"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "#REC-9821-K - Tumusiime Emmanuel" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "#REC-0452-P - Agaba Martha Rita" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "#REC-1109-W - Mukasa Furniture Ltd" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "#REC-7732-S - Nakato Josephine" })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-label-bold text-on-surface block mb-2",
						children: "Document Type"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Valuation Report" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Legal Opinion" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Proof of Ownership" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Compliance Certificate" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Other" })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-label-bold text-on-surface block mb-2",
						children: "Upload File"
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
								children: "PDF, JPG, PNG or DOCX (max. 10MB)"
							})
						]
					})] })
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			open: registerOpen,
			onClose: () => setRegisterOpen(false),
			title: "Register Recovery Case",
			subtitle: "Formally register a new recovery case in the system",
			icon: "description",
			tone: "primary",
			size: "lg",
			footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
					onClick: () => setRegisterOpen(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
						children: "Review"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md",
						children: "Register Case"
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
							children: "National ID"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
							placeholder: "ID number"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block mb-2",
							children: "Loan Reference"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
							placeholder: "LOAN-2024-001234"
						})] })]
					}),
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
							children: "Days Past Due"
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Real Estate (Residential)" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Real Estate (Commercial)" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Motor Vehicle" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Industrial Machinery" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Logistics Fleet" })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-label-bold text-on-surface block mb-2",
						children: "Collateral Description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
						rows: 2,
						placeholder: "Detailed description..."
					})] })
				]
			})
		})
	] });
}
//#endregion
export { OfficerDashboard as component };
