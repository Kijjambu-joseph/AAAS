import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { r as Icon, t as AppShell } from "./AppShell-CHdJzBdJ.mjs";
import { i as Modal } from "./ui-kit-D18jqlXM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.cases-CWSksj6K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var cases = [
	{
		name: "Musa Kanyike",
		loanId: "LN-2023-9081",
		branch: "Kampala Regional Branch",
		dpd: "128",
		dpdColor: "text-error",
		balance: "45,200,000 UGX",
		collateral: "Commercial Property",
		compliance: [{
			icon: "task_alt",
			color: "text-green-600",
			title: "Valuation Validated"
		}, {
			icon: "task_alt",
			color: "text-green-600",
			title: "Demand Notice Issued"
		}],
		status: "Allocated",
		statusClass: "bg-green-100 text-green-800",
		auctioneerName: "M. K. Ssekandi",
		auctioneerFirm: "Kampala Asset Recovery Ltd",
		auctioneerLicense: "AUC-2023-44102",
		auctioneerPhone: "+256 700 123 456",
		allocationDate: "24 Oct 2023"
	},
	{
		name: "Sarah Namutebi",
		loanId: "LN-2024-1142",
		branch: "Entebbe Head Office",
		dpd: "92",
		dpdColor: "text-secondary",
		balance: "12,800,000 UGX",
		collateral: "Motor Vehicle (Toyota)",
		compliance: [{
			icon: "warning",
			color: "text-error",
			title: "Valuation Missing"
		}, {
			icon: "task_alt",
			color: "text-green-600",
			title: "Demand Notice Issued"
		}],
		status: "Submitted",
		statusClass: "bg-blue-100 text-blue-800"
	},
	{
		name: "John Bosco Okello",
		loanId: "LN-2024-5501",
		branch: "Jinja Operations",
		dpd: "45",
		dpdColor: "text-secondary",
		balance: "320,000,000 UGX",
		collateral: "Residential Land",
		compliance: [{
			icon: "hourglass_top",
			color: "text-outline-variant",
			title: "Pending"
		}, {
			icon: "hourglass_top",
			color: "text-outline-variant",
			title: "Pending"
		}],
		status: "Draft",
		statusClass: "bg-gray-100 text-gray-800"
	},
	{
		name: "Lydia Nakato",
		loanId: "LN-2023-8822",
		branch: "Mbarara Center",
		dpd: "210",
		dpdColor: "text-error",
		balance: "8,400,000 UGX",
		collateral: "Personal Assets",
		compliance: [{
			icon: "task_alt",
			color: "text-green-600",
			title: "Valuation Validated"
		}, {
			icon: "task_alt",
			color: "text-green-600",
			title: "Demand Notice Issued"
		}],
		status: "Allocated",
		statusClass: "bg-green-100 text-green-800",
		auctioneerName: "A. N. Katongole",
		auctioneerFirm: "Victoria Asset Recovery",
		auctioneerLicense: "AUC-2023-11928",
		auctioneerPhone: "+256 701 444 888",
		allocationDate: "22 Oct 2023"
	}
];
var filters = ["All Cases"];
function CaseRegistry() {
	const [activeFilter, setActiveFilter] = (0, import_react.useState)("All Cases");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [collateralFilter, setCollateralFilter] = (0, import_react.useState)("all");
	const [branchFilter, setBranchFilter] = (0, import_react.useState)("all");
	const [panelOpen, setPanelOpen] = (0, import_react.useState)(false);
	const [registerOpen, setRegisterOpen] = (0, import_react.useState)(false);
	const [selectedCase, setSelectedCase] = (0, import_react.useState)(null);
	const filteredCases = cases.filter((c) => {
		const matchesStatus = statusFilter === "all" || c.status.toLowerCase() === statusFilter;
		const matchesCollateral = collateralFilter === "all" || collateralFilter === "land" && c.collateral.toLowerCase().includes("land") || collateralFilter === "vehicles" && c.collateral.toLowerCase().includes("vehicle") || collateralFilter === "machinery" && c.collateral.toLowerCase().includes("machinery") || collateralFilter === "stock" && c.collateral.toLowerCase().includes("stock") || collateralFilter === "securities" && c.collateral.toLowerCase().includes("security");
		const matchesBranch = branchFilter === "all" || c.branch === branchFilter;
		return matchesStatus && matchesCollateral && matchesBranch;
	});
	function downloadCSV(filename, rows) {
		const csvRows = [[
			"Borrower",
			"Loan ID",
			"Branch",
			"Turn Around Time",
			"Outstanding Balance",
			"Collateral",
			"Status"
		].join(",")];
		rows.forEach((c) => {
			const vals = [
				c.name,
				c.loanId,
				c.branch,
				c.dpd,
				c.balance,
				c.collateral,
				c.status
			];
			csvRows.push(vals.map((v) => `"${String(v).replace(/"/g, "\"\"")}"`).join(","));
		});
		const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		a.remove();
		URL.revokeObjectURL(url);
	}
	function downloadExcel(filename, rows) {
		downloadCSV(filename, rows);
	}
	function downloadPDF(rows) {
		const w = window.open("", "_blank", "noopener,noreferrer");
		if (!w) return;
		const style = `
      <style>
        table{border-collapse:collapse;width:100%;}
        th,td{border:1px solid #ddd;padding:8px;text-align:left}
        th{background:#f4f4f4}
      </style>
    `;
		const headers = [
			"Borrower",
			"Loan ID",
			"Branch",
			"Turn Around Time",
			"Outstanding Balance",
			"Collateral",
			"Status"
		];
		const rowsHtml = rows.map((c) => `<tr><td>${c.name}</td><td>${c.loanId}</td><td>${c.branch}</td><td>${c.dpd}</td><td>${c.balance}</td><td>${c.collateral}</td><td>${c.status}</td></tr>`).join("");
		w.document.write(`<html><head><title>Cases</title>${style}</head><body><h3>Case Registry Export</h3><table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rowsHtml}</tbody></table></body></html>`);
		w.document.close();
		w.print();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		searchPlaceholder: "Search Loan ID or Borrower...",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-xl flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-display-lg text-primary",
					children: "Case Registry"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-body-md text-on-surface-variant",
					children: "Manage and track recovery progress for institutional debt portfolios."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => downloadExcel(`case-registry-${Date.now()}.xls`, filteredCases),
							className: "flex items-center gap-2 bg-primary text-on-primary px-3 py-2 rounded-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "grid_view" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Excel" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => downloadPDF(filteredCases),
							className: "flex items-center gap-2 bg-primary text-on-primary px-3 py-2 rounded-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "picture_as_pdf" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PDF" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => downloadCSV(`case-registry-${Date.now()}.csv`, filteredCases),
							className: "flex items-center gap-2 bg-primary text-on-primary px-3 py-2 rounded-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "download" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CSV" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex items-center gap-2 rounded-lg bg-primary px-lg py-3 text-label-bold text-on-primary shadow-md transition-all hover:opacity-90 active:scale-95",
							onClick: () => setRegisterOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "add_circle" }), "Register New Case"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-xl grid grid-cols-1 gap-lg md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-label-bold uppercase text-outline",
							children: "Active Cases"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-display-lg text-primary",
								children: "124"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-green-600",
								children: "+8.4%"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-label-bold uppercase text-outline",
							children: "Total Recovery"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-display-lg text-primary",
								children: "4.2B"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-body-sm text-label-bold text-on-surface-variant",
								children: "UGX"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-label-bold uppercase text-outline",
							children: "Pending Valuation"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-display-lg text-error",
								children: "18"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-body-sm text-label-bold text-on-surface-variant",
								children: "Cases"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-label-bold uppercase text-outline",
							children: "Success Rate"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-display-lg text-primary",
								children: "68%"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-blue-600",
								children: "Avg 45 Days"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-md rounded-t-xl border border-outline-variant bg-surface-container-lowest p-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-md flex-wrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex cursor-pointer items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2 text-body-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "filter_list",
								className: "text-body-sm"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-label-bold",
								children: "Filters"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-px bg-outline-variant" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2",
							children: filters.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								onClick: () => setActiveFilter(f),
								className: `cursor-pointer rounded-full px-3 py-1 text-label-bold ${activeFilter === f ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant hover:bg-outline-variant"}`,
								children: f
							}, f))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-px bg-outline-variant" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: statusFilter,
							onChange: (e) => setStatusFilter(e.target.value),
							className: "rounded-lg border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "draft",
									children: "Draft"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "submitted",
									children: "Submitted"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "allocated",
									children: "Allocated"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "completed",
									children: "Completed"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: collateralFilter,
							onChange: (e) => setCollateralFilter(e.target.value),
							className: "rounded-lg border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All Collateral"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "land",
									children: "Land & Buildings"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "vehicles",
									children: "Motor Vehicles"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "machinery",
									children: "Plant & Machinery"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "stock",
									children: "Commercial Stock"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "securities",
									children: "Securities & Bonds"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: branchFilter,
							onChange: (e) => setBranchFilter(e.target.value),
							className: "rounded-lg border border-outline-variant bg-surface-container px-3 py-2 text-body-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All Branches"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Kampala Regional Branch",
									children: "Kampala Regional Branch"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Entebbe Head Office",
									children: "Entebbe Head Office"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Jinja Operations",
									children: "Jinja Operations"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Mbarara Center",
									children: "Mbarara Center"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "rounded-lg p-2 text-on-surface-variant hover:bg-surface-container",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "download" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "rounded-lg p-2 text-on-surface-variant hover:bg-surface-container",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "sort" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden border-x border-b border-outline-variant bg-surface-container-lowest",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full border-collapse text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b border-outline-variant bg-surface-container-low",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-lg py-4 text-label-bold uppercase text-outline",
								children: "Borrower Details"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-lg py-4 text-center text-label-bold uppercase text-outline",
								children: "Turn Around Time"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-lg py-4 text-label-bold uppercase text-outline",
								children: "Outstanding Balance"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-lg py-4 text-label-bold uppercase text-outline",
								children: "Collateral"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-lg py-4 text-label-bold uppercase text-outline",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-lg py-4 text-right text-label-bold uppercase text-outline",
								children: "Action"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-outline-variant",
						children: filteredCases.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							onClick: () => {
								setSelectedCase(c);
								setPanelOpen(true);
							},
							className: "cursor-pointer transition-colors hover:bg-surface-container-low",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-lg py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-label-bold text-primary",
												children: c.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-body-sm text-on-surface-variant",
												children: c.branch
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-mono-data text-outline",
												children: c.loanId
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-lg py-3 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-mono-data font-bold ${c.dpdColor}`,
										children: c.dpd
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-lg py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-mono-data",
										children: c.balance
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-lg py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-body-md",
										children: c.collateral
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-lg py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded px-2 py-1 text-[11px] font-bold uppercase ${c.statusClass}`,
										children: c.status
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-lg py-3 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: (event) => {
											event.stopPropagation();
											setSelectedCase(c);
											setPanelOpen(true);
										},
										className: "rounded-full p-2 text-primary transition-colors hover:bg-surface-container-highest",
										"aria-label": `View details for ${c.name}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											name: "visibility",
											className: "text-lg"
										})
									})
								})
							]
						}, c.loanId))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between bg-surface-container-low px-lg py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-body-sm text-on-surface-variant",
						children: "Showing 1-10 of 124 cases"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "rounded border border-outline-variant p-1 hover:bg-surface-container",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "chevron_left" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "rounded border border-outline-variant p-1 hover:bg-surface-container",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "chevron_right" })
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `fixed right-0 top-16 z-40 h-[calc(100vh-4rem)] w-112.5 transform overflow-y-auto border-l border-outline-variant bg-surface-container-lowest shadow-2xl transition-transform duration-300 ${panelOpen ? "translate-x-0" : "translate-x-full"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-lg flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-headline-sm text-primary",
							children: "Auctioneer Details"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-body-sm text-on-surface-variant",
							children: selectedCase?.auctioneerFirm ?? "No auctioneer assigned"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "rounded-full p-2 hover:bg-surface-container",
							onClick: () => {
								setPanelOpen(false);
								setSelectedCase(null);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "close" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-lg bg-surface-container-low p-md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-on-primary",
										children: (selectedCase?.auctioneerName ?? "NA").slice(0, 2).toUpperCase()
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-label-bold text-primary",
										children: selectedCase?.auctioneerName ?? "Not Allocated"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-body-sm",
										children: selectedCase?.status === "Allocated" ? "Allocated Auctioneer" : "Not Allocated"
									})] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-outline-variant p-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-bold uppercase text-outline",
										children: "License ID"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-mono-data",
										children: selectedCase?.auctioneerLicense ?? "N/A"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-outline-variant p-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-bold uppercase text-outline",
										children: "Allocated On"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-mono-data",
										children: selectedCase?.allocationDate ?? "N/A"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-outline-variant p-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-bold uppercase text-outline",
									children: "Contact"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-mono-data",
									children: selectedCase?.auctioneerPhone ?? "N/A"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mb-md text-label-bold text-primary",
								children: "Related Case"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between rounded-lg border border-outline-variant bg-green-50 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												name: "check_circle",
												className: "text-green-600"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-body-md",
												children: selectedCase?.name ?? "Case"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold text-green-700",
											children: "ALLOCATED"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between rounded-lg border border-outline-variant bg-green-50 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												name: "check_circle",
												className: "text-green-600"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-body-md",
												children: selectedCase?.loanId ?? "Loan ID"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold text-green-700",
											children: "OPEN"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between rounded-lg border border-dashed border-outline-variant p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												name: "description",
												className: "text-outline"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-body-md",
												children: selectedCase?.branch ?? "Branch"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold text-primary",
											children: "VIEW"
										})]
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mb-md text-label-bold text-primary",
								children: "Allocation Timeline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative ml-2 space-y-lg border-l-2 border-outline-variant pl-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-8.25 top-0 h-4 w-4 rounded-full border-4 border-surface-container-lowest bg-primary" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-label-bold",
												children: "Case Allocated"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-on-surface-variant",
												children: [selectedCase?.allocationDate ?? "N/A", " • System Admin"]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-8.25 top-0 h-4 w-4 rounded-full border-4 border-surface-container-lowest bg-outline" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-label-bold",
												children: "Auctioneer Accepted"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-on-surface-variant",
												children: selectedCase?.auctioneerFirm ?? "Pending"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-8.25 top-0 h-4 w-4 rounded-full border-4 border-surface-container-lowest bg-outline" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-label-bold",
												children: "Contact Confirmed"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-on-surface-variant",
												children: selectedCase?.auctioneerPhone ?? "N/A"
											})
										]
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-md pt-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "w-full rounded-lg bg-primary py-3 text-label-bold text-on-primary hover:opacity-90",
									children: "Open Allocation File"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "w-full rounded-lg border border-primary py-3 text-label-bold text-primary hover:bg-surface-container-low",
									children: "Print Details"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: registerOpen,
				onClose: () => setRegisterOpen(false),
				title: "Register New Recovery Case",
				subtitle: "Enter borrower and collateral information to initiate recovery process",
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
							children: "Save Draft"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md",
							children: "Create Case"
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block mb-2",
							children: "Case Submission Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent"
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
								children: "Turn Around Time (Days)"
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
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-label-bold text-on-surface block mb-2",
								children: "Attach Documents"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-body-sm text-on-surface-variant mb-3",
								children: "Upload supporting documents (loan agreements, property valuations, identification, collateral photos, etc.)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-2 border-dashed border-outline-variant rounded-lg p-8 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									multiple: true,
									accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png",
									className: "hidden",
									id: "doc-upload"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "doc-upload",
									className: "cursor-pointer block",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center justify-center gap-2 text-primary mb-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-2xl",
												children: "📎"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-label-bold text-primary",
											children: "Click to upload documents"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-body-sm text-on-surface-variant",
											children: "or drag and drop"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-outline mt-2",
											children: "PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 space-y-2",
								id: "document-list"
							})
						] })
					]
				})
			})
		]
	});
}
//#endregion
export { CaseRegistry as component };
