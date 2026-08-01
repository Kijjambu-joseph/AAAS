import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { r as Icon, t as AppShell } from "./AppShell-CHdJzBdJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.audit-Ck8WdfHN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var rows = [
	{
		ts: "2023-10-27 13:58:45",
		user: "REC-204",
		action: "CASE CREATED",
		badgeClass: "bg-primary-container/10 text-on-primary-container",
		ip: "10.12.44.15",
		terminal: "CENT-TERM-09",
		desc: "New case record initialized for Client: 'Kato Services Ltd'. Case ID: REC-9002.",
		descClass: "text-on-surface-variant italic"
	},
	{
		ts: "2023-10-27 13:45:12",
		user: "ADM-001",
		action: "LOGIN",
		badgeClass: "bg-secondary-container/20 text-on-secondary-container",
		ip: "192.168.1.1",
		terminal: "CENT-HQ-01",
		desc: "Successful authentication via Kerberos. Session ID: SX8821.",
		descClass: "text-on-surface-variant italic"
	},
	{
		ts: "2023-10-27 13:10:05",
		user: "REC-312",
		action: "DOC_UPLOAD",
		badgeClass: "bg-outline-variant/30 text-on-surface-variant",
		ip: "10.12.44.89",
		terminal: "CENT-TERM-12",
		desc: "Uploaded 'CourtOrder_Final_992.pdf' to Vault. MD5 Hash verified.",
		descClass: "text-on-surface-variant italic"
	},
	{
		ts: "2023-10-27 12:55:33",
		user: "ADM-004",
		action: "DATA DELETION",
		badgeClass: "bg-error-container text-on-error-container",
		icon: "warning",
		ip: "10.12.44.102",
		terminal: "CENT-TERM-02",
		desc: "Deleted draft allocation queue from 2023-10-26.",
		descClass: "text-error font-medium",
		highRisk: true
	},
	{
		ts: "2023-10-27 12:40:01",
		user: "REC-204",
		action: "SESSION_REFRESH",
		badgeClass: "bg-primary-container/10 text-on-primary-container",
		ip: "10.12.44.15",
		terminal: "CENT-TERM-09",
		desc: "User session extended by 30m.",
		descClass: "text-on-surface-variant italic"
	},
	{
		ts: "2023-10-27 12:15:22",
		user: "ADM-001",
		action: "CFG_CHANGE",
		badgeClass: "bg-primary-container/10 text-on-primary-container",
		ip: "192.168.1.1",
		terminal: "CENT-HQ-01",
		desc: "Updated 'Max_Auction_Window' from 14 to 21 days.",
		descClass: "text-on-surface-variant italic"
	},
	{
		ts: "2023-10-27 11:59:58",
		user: "SYSTEM",
		action: "AUTO_ARCHIVE",
		badgeClass: "bg-surface-variant text-on-surface-variant",
		ip: "LOCAL_SVR",
		terminal: "SVR-CORE-01",
		desc: "Successfully archived 1,402 logs from September 2023.",
		descClass: "text-on-surface-variant italic"
	}
];
function AuditLogsPage() {
	const [detail, setDetail] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		searchPlaceholder: "Search system events...",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-display-lg text-primary",
					children: "System Audit Logs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-center space-x-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center rounded bg-on-primary-fixed-variant px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-on-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "security",
							className: "mr-1 text-[14px]"
						}), "Audit Integrity: Append-Only"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center text-body-sm text-outline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "schedule",
							className: "mr-1 text-[16px]"
						}), "Last Verified: 2 minutes ago"]
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex space-x-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex items-center rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2 text-body-md font-bold text-on-surface transition-all hover:bg-surface-container",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "download",
							className: "mr-2"
						}), "Export Ledger"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex items-center rounded-lg bg-primary px-4 py-2 text-body-md font-bold text-on-primary shadow-sm transition-all hover:opacity-90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "verified_user",
							className: "mr-2"
						}), "Verify Signatures"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-md md:grid-cols-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-label-bold uppercase text-outline",
								children: "User ID"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "w-full rounded border border-outline-variant bg-surface-container-low p-2 text-body-sm focus:border-primary focus:ring-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All Users" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "ADM-001 (Administrator)" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "REC-204 (Officer)" })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-label-bold uppercase text-outline",
								children: "Event Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "w-full rounded border border-outline-variant bg-surface-container-low p-2 text-body-sm focus:ring-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All Events" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Manual Override" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Case Created" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Terminal Login" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Data Export" })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-label-bold uppercase text-outline",
								children: "Date Range"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center rounded border border-outline-variant bg-surface-container-low px-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "calendar_today",
									className: "text-[18px] text-outline"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "w-full border-none bg-transparent py-2 text-body-sm focus:ring-0",
									type: "text",
									defaultValue: "Oct 20 - Oct 27, 2023"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-label-bold uppercase text-outline",
								children: "IP Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "w-full rounded border border-outline-variant bg-surface-container-low p-2 text-body-sm focus:ring-primary",
								placeholder: "192.168.x.x",
								type: "text"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "flex w-full items-center justify-center rounded bg-surface-container-high py-2 font-bold text-primary transition-all hover:bg-surface-variant",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "filter_list",
									className: "mr-2"
								}), "Apply Filters"]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full border-collapse text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "sticky top-0 z-10 bg-surface-container-high",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "border-b border-outline-variant px-lg py-4 text-label-bold text-on-surface-variant",
									children: "Timestamp (UTC)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "border-b border-outline-variant px-md py-4 text-label-bold text-on-surface-variant",
									children: "User ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "border-b border-outline-variant px-md py-4 text-label-bold text-on-surface-variant",
									children: "Action Type"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "border-b border-outline-variant px-md py-4 text-label-bold text-on-surface-variant",
									children: "IP Address"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "border-b border-outline-variant px-md py-4 text-label-bold text-on-surface-variant",
									children: "Terminal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "border-b border-outline-variant px-lg py-4 text-label-bold text-on-surface-variant",
									children: "Event Description (State Delta)"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-outline-variant/30 text-body-sm",
							children: rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: `${r.highRisk ? "bg-error-container/10 cursor-pointer" : ""} ${i % 2 === 0 ? "" : "bg-surface-container-low/40"} transition-colors hover:bg-surface-container-low`,
								onClick: () => {
									if (r.highRisk) setDetail(r);
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-lg py-3 text-mono-data text-outline",
										children: r.ts
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-md py-3 font-bold text-primary",
										children: r.user
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-md py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold ${r.badgeClass}`,
											children: [r.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												name: r.icon,
												className: "mr-1 text-[14px]"
											}), r.action]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-md py-3 text-mono-data",
										children: r.ip
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-md py-3 text-mono-data",
										children: r.terminal
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: `px-lg py-3 ${r.desc.length > 60 ? "max-w-[20rem] truncate" : ""} ${r.descClass}`,
										children: r.desc
									})
								]
							}, i))
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-t border-outline-variant bg-surface-container-high px-lg py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center space-x-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-body-sm text-on-surface-variant",
							children: "Showing 8 of 14,921 entries"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center text-body-sm font-bold text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "verified",
								className: "mr-1 text-[18px] text-on-secondary-container"
							}), "Log Signature: Valid (SHA-512 Secure)"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex space-x-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded border border-outline-variant p-1.5 hover:bg-surface-container-highest disabled:opacity-30",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "chevron_left" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded bg-primary px-3 py-1 text-xs font-bold text-on-primary",
								children: "1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded px-3 py-1 text-xs font-bold hover:bg-surface-container-highest",
								children: "2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded px-3 py-1 text-xs font-bold hover:bg-surface-container-highest",
								children: "3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded border border-outline-variant p-1.5 hover:bg-surface-container-highest",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "chevron_right" })
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "flex items-center justify-between border-t border-outline-variant pt-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center font-bold text-on-surface-variant",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 Centenary Bank. All Rights Reserved." })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex space-x-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center space-x-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold uppercase text-outline",
								children: "Export for Auditors:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "flex items-center rounded border border-outline-variant bg-surface-container-lowest px-3 py-1.5 text-body-sm font-bold transition-colors hover:bg-surface-container",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "policy",
									className: "mr-1 text-[16px]"
								}), "Internal Audit (PDF)"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "flex items-center rounded border border-outline-variant bg-surface-container-lowest px-3 py-1.5 text-body-sm font-bold transition-colors hover:bg-surface-container",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "account_balance",
									className: "mr-1 text-[16px]"
								}), "BoU Regulatory (XLSX)"]
							})
						]
					})
				})]
			}),
			detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-[100] flex items-center justify-center bg-primary/20 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-2xl overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between bg-primary px-lg py-4 text-on-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-title-lg font-bold",
								children: "Event Log Details"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "hover:opacity-70",
								onClick: () => setDetail(null),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "close" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-md p-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-bold uppercase text-outline",
										children: "Sequence ID"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-mono-data",
										children: "#88219-X8"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-bold uppercase text-outline",
										children: "Action ID"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-mono-data",
										children: "OVERRIDE_44921"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded border border-outline-variant bg-surface-container-low p-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 text-[10px] font-bold uppercase text-outline",
										children: "State Delta (JSON)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
										className: "whitespace-pre-wrap text-[12px] font-medium text-primary",
										children: `{
  "before": { "auctioneer_id": "A442", "status": "PENDING" },
  "after": { "auctioneer_id": "A550", "status": "ALLOCATED" },
  "metadata": { "reason": "Expedited by legal request", "ref": "LEG-022" }
}`
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center rounded border border-error/20 bg-error-container/20 p-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "gpp_maybe",
										className: "mr-3 text-error"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-error",
										children: "Warning: Manual Override Policy"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-on-error-container",
										children: "This action bypassed the automated allocation engine. Review is required by executive audit within 24 hours."
									})] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end space-x-3 border-t border-outline-variant bg-surface-container px-lg py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "px-4 py-2 text-body-md font-bold text-primary",
								onClick: () => setDetail(null),
								children: "Dismiss"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded bg-primary px-4 py-2 text-body-md font-bold text-on-primary",
								children: "Print Record"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { AuditLogsPage as component };
