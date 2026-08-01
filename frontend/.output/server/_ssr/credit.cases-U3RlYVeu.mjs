import { n as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { i as PageHeader, r as Icon, t as AppShell } from "./AppShell-EE99Et3W.mjs";
import { n as Modal } from "./ui-kit-BI8B3iAj.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/credit.cases-U3RlYVeu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function request(path, opts = {}, retried = false) {
	const { method = "GET", body, token } = opts;
	const headers = { Accept: "application/json" };
	if (body && !(body instanceof FormData)) headers["Content-Type"] = "application/json";
	const resolvedToken = token ?? (typeof window !== "undefined" ? localStorage.getItem("aaas.token") : null);
	if (resolvedToken) headers["Authorization"] = `Bearer ${resolvedToken}`;
	const res = await fetch(path, {
		method,
		headers,
		body: body && !(body instanceof FormData) ? JSON.stringify(body) : body,
		credentials: "same-origin"
	});
	const text = await res.text();
	const data = text ? JSON.parse(text) : null;
	if (res.status === 401 && !retried && typeof window !== "undefined") {
		const storedAuth = localStorage.getItem("aaas.auth");
		if (storedAuth) try {
			const { refresh } = JSON.parse(storedAuth);
			const refreshResponse = await fetch("/api/token/refresh/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: JSON.stringify({ refresh }),
				credentials: "same-origin"
			});
			if (refreshResponse.ok) {
				const refreshed = await refreshResponse.json();
				localStorage.setItem("aaas.token", refreshed.access);
				localStorage.setItem("aaas.auth", JSON.stringify({
					access: refreshed.access,
					refresh
				}));
				return request(path, {
					...opts,
					token: refreshed.access
				}, true);
			}
		} catch {}
	}
	if (!res.ok) {
		const err = new Error(data?.detail || res.statusText || "Request failed");
		err.status = res.status;
		err.data = data;
		throw err;
	}
	return data;
}
var Api = {
	get: (path, token) => request(path, {
		method: "GET",
		token
	}),
	post: (path, body, token) => request(path, {
		method: "POST",
		body,
		token
	}),
	put: (path, body, token) => request(path, {
		method: "PUT",
		body,
		token
	}),
	del: (path, body, token) => request(path, {
		method: "DELETE",
		body,
		token
	})
};
var kpis = [
	{
		label: "TOTAL ACTIVE CASES",
		icon: "folder_shared",
		value: "142",
		tag: "+5%",
		tagClass: "text-secondary",
		note: "Active recovery operations"
	},
	{
		label: "PENDING ALLOCATION",
		icon: "pending_actions",
		value: "28",
		tag: "Critical",
		tagClass: "text-error",
		note: "Awaiting legal review"
	},
	{
		label: "AVG. DPD",
		icon: "schedule",
		value: "184d",
		tag: "-12d",
		tagClass: "text-secondary-fixed-dim",
		note: "Across all portfolio segments"
	},
	{
		label: "RECOVERY VALUE",
		icon: "payments",
		value: "UGX 4.2B",
		tag: "In Process",
		tagClass: "text-secondary",
		note: "Total outstanding principal"
	}
];
function CaseRegistry() {
	const [cases, setCases] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [caseFormOpen, setCaseFormOpen] = (0, import_react.useState)(false);
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [collateralFilter, setCollateralFilter] = (0, import_react.useState)("all");
	const [branchFilter, setBranchFilter] = (0, import_react.useState)("all");
	const [panelOpen, setPanelOpen] = (0, import_react.useState)(false);
	const [selectedCaseId, setSelectedCaseId] = (0, import_react.useState)(null);
	const [allocationDetails, setAllocationDetails] = (0, import_react.useState)(null);
	const [openingDetails, setOpeningDetails] = (0, import_react.useState)(false);
	const [selectedAuctioneer, setSelectedAuctioneer] = (0, import_react.useState)(null);
	const [allocating, setAllocating] = (0, import_react.useState)(false);
	const [branches, setBranches] = (0, import_react.useState)([]);
	const [creatingCase, setCreatingCase] = (0, import_react.useState)(false);
	const [caseData, setCaseData] = (0, import_react.useState)({
		customer_name: "",
		national_id: "",
		loan_account_number: "",
		outstanding_balance: "",
		arrears_days: "",
		collateral_type: "Land",
		collateral_description: "",
		branch_id: ""
	});
	(0, import_react.useEffect)(() => {
		fetchCases();
		Api.get("/api/branches/").then((data) => {
			const items = data.results ?? data;
			setBranches(items);
			if (items[0]) setCaseData((current) => ({
				...current,
				branch_id: String(items[0].id)
			}));
		}).catch(() => toast.error("Failed to load branches"));
	}, []);
	async function fetchCases() {
		try {
			setLoading(true);
			const response = await Api.get("/api/cases/?ordering=-created_at");
			setCases(response);
		} catch (error) {
			console.error("Failed to fetch cases:", error);
			toast.error("Failed to load cases");
		} finally {
			setLoading(false);
		}
	}
	async function openDetails(caseId) {
		try {
			setOpeningDetails(true);
			const allocation = await Api.get(`/api/cases/${caseId}/allocation/`);
			setAllocationDetails(allocation);
			setSelectedCaseId(caseId);
			setSelectedAuctioneer(null);
			setPanelOpen(true);
		} catch (error) {
			if (error.status === 404) {
				setAllocationDetails(null);
				setSelectedCaseId(caseId);
				setSelectedAuctioneer(null);
				setPanelOpen(true);
			} else toast.error("Failed to load allocation details");
		} finally {
			setOpeningDetails(false);
		}
	}
	async function createCase() {
		if (!caseData.customer_name || !caseData.national_id || !caseData.loan_account_number || !caseData.outstanding_balance || !caseData.branch_id) {
			toast.error("Complete all required case details");
			return;
		}
		try {
			setCreatingCase(true);
			await Api.post("/api/cases/", {
				...caseData,
				case_number: `REC-${Date.now()}`,
				branch_id: Number(caseData.branch_id),
				phone_number: "Not provided",
				loan_amount: caseData.outstanding_balance,
				collateral_location: "Not provided",
				priority: "Medium",
				status: "Pending",
				recovery_stage: "Demand Notice"
			});
			toast.success("Recovery case registered successfully");
			setCaseFormOpen(false);
			setCaseData({
				customer_name: "",
				national_id: "",
				loan_account_number: "",
				outstanding_balance: "",
				arrears_days: "",
				collateral_type: "Land",
				collateral_description: "",
				branch_id: branches[0] ? String(branches[0].id) : ""
			});
			await fetchCases();
		} catch (error) {
			toast.error(error.data?.detail || "Failed to register case");
		} finally {
			setCreatingCase(false);
		}
	}
	const rows = cases.map((c) => ({
		id: c.id,
		case_number: c.case_number,
		name: c.customer_name,
		idLine: `ID: ${c.national_id}`,
		branch: c.branch?.branch_name || "Unknown Branch",
		dpd: c.arrears_days,
		dpdClass: "bg-error-container text-on-error-container",
		outstanding: Number(c.outstanding_balance || 0).toLocaleString(),
		collateralIcon: c.collateral_type === "Land" ? "landscape" : c.collateral_type === "Motor Vehicle" ? "directions_car" : "home",
		collateral: c.collateral_description || "Not specified",
		compliance: 2,
		status: c.status,
		statusClass: c.status === "Allocated" ? "bg-[#dcfce7] text-[#166534]" : c.status === "Pending" ? "bg-primary-fixed text-on-primary-fixed-variant" : "bg-surface-container-high text-on-surface-variant",
		allocation: c.allocation
	}));
	const filteredRows = rows.filter((row) => {
		const statusValue = row.status.toLowerCase();
		const collateralValue = row.collateral.toLowerCase();
		const matchesStatus = statusFilter === "all" || statusValue === statusFilter;
		const matchesCollateral = collateralFilter === "all" || collateralFilter === "land" && collateralValue.includes("land") || collateralFilter === "vehicle" && collateralValue.includes("vehicle") || collateralFilter === "commercial" && collateralValue.includes("commercial");
		const matchesBranch = branchFilter === "all" || row.branch === branchFilter;
		return matchesStatus && matchesCollateral && matchesBranch;
	});
	const selectedRow = rows.find((row) => row.id === selectedCaseId) ?? null;
	const selectedAuctioneerDetails = allocationDetails?.auctioneer ?? allocationDetails;
	function downloadCSV(filename, data) {
		const csvRows = [[
			"Case ID",
			"Borrower",
			"Branch",
			"Turn Around Time",
			"Outstanding",
			"Collateral",
			"Status"
		].join(",")];
		data.forEach((r) => {
			const vals = [
				r.id,
				r.name,
				r.branch || "",
				r.dpd,
				r.outstanding,
				r.collateral,
				r.status
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
	function downloadExcel(filename, data) {
		downloadCSV(filename, data);
	}
	function downloadPDF(data) {
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
			"Case ID",
			"Borrower",
			"Branch",
			"Turn Around Time",
			"Outstanding",
			"Collateral",
			"Status"
		];
		const rowsHtml = data.map((r) => `<tr><td>${r.id}</td><td>${r.name}</td><td>${r.branch || ""}</td><td>${r.dpd}</td><td>${r.outstanding}</td><td>${r.collateral}</td><td>${r.status}</td></tr>`).join("");
		w.document.write(`<html><head><title>Cases</title>${style}</head><body><h3>Case Registry Export</h3><table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rowsHtml}</tbody></table></body></html>`);
		w.document.close();
		w.print();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		searchPlaceholder: "Search borrower or case ID...",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Recovery Portfolio",
				subtitle: "Manage and track loan recovery cases awaiting auctioneer allocation.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => downloadExcel(`case-registry-${Date.now()}.xls`, filteredRows),
							className: "flex items-center gap-2 bg-primary text-on-primary px-3 py-2 rounded-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "grid_view" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Excel" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => downloadPDF(filteredRows),
							className: "flex items-center gap-2 bg-primary text-on-primary px-3 py-2 rounded-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "picture_as_pdf" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PDF" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => downloadCSV(`case-registry-${Date.now()}.csv`, filteredRows),
							className: "flex items-center gap-2 bg-primary text-on-primary px-3 py-2 rounded-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "download" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CSV" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "bg-primary text-on-primary px-xl py-3 rounded-lg flex items-center gap-2 text-title-lg hover:bg-tertiary transition-all shadow-sm active:scale-95",
							onClick: () => setCaseFormOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "add_circle" }), "Register New Case"]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-4 gap-lg",
				children: kpis.map((kpi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-surface-container-lowest p-md border border-outline-variant rounded-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-on-surface-variant text-label-bold",
								children: kpi.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: kpi.icon,
								className: "text-primary opacity-50"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-display-lg text-primary",
								children: kpi.value
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-xs font-bold ${kpi.tagClass}`,
								children: kpi.tag
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-on-surface-variant mt-2",
							children: kpi.note
						})
					]
				}, kpi.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded flex items-center gap-2 text-body-sm font-medium hover:bg-surface transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "filter_alt",
										className: "text-sm"
									}), "All Filters"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: statusFilter,
									onChange: (e) => setStatusFilter(e.target.value),
									className: "bg-surface-container-lowest border border-outline-variant rounded px-4 py-2 text-body-sm font-medium focus:ring-primary focus:border-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "all",
											children: "Status: All"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "pending",
											children: "Status: Pending"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "allocated",
											children: "Status: Allocated"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "in recovery",
											children: "Status: In Recovery"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "recovered",
											children: "Status: Recovered"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "closed",
											children: "Status: Closed"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: collateralFilter,
									onChange: (e) => setCollateralFilter(e.target.value),
									className: "bg-surface-container-lowest border border-outline-variant rounded px-4 py-2 text-body-sm font-medium focus:ring-primary focus:border-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "all",
											children: "Collateral: Any"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "land",
											children: "Collateral: Land"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "vehicle",
											children: "Collateral: Vehicle"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "commercial",
											children: "Collateral: Commercial"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: branchFilter,
									onChange: (e) => setBranchFilter(e.target.value),
									className: "bg-surface-container-lowest border border-outline-variant rounded px-4 py-2 text-body-sm font-medium focus:ring-primary focus:border-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "all",
											children: "Branch: All"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Kampala Regional Branch",
											children: "Branch: Kampala Regional Branch"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Entebbe Head Office",
											children: "Branch: Entebbe Head Office"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Jinja Operations",
											children: "Branch: Jinja Operations"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Mbarara Center",
											children: "Branch: Mbarara Center"
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-body-sm text-on-surface-variant",
							children: [
								"Showing ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: filteredRows.length }),
								" of ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: rows.length }),
								" cases"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left border-collapse",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "bg-surface-container-high text-on-surface text-label-bold uppercase tracking-wider",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-md border-b border-outline-variant",
										children: "Case ID"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-md border-b border-outline-variant",
										children: "Borrower Details"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-md border-b border-outline-variant text-center",
										children: "Turn Around Time"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-md border-b border-outline-variant text-right",
										children: "Outstanding (UGX)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-md border-b border-outline-variant",
										children: "Collateral"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-md border-b border-outline-variant text-center",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-md border-b border-outline-variant text-center",
										children: "Actions"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "text-body-sm text-on-surface",
								children: filteredRows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									onClick: () => openDetails(row.id),
									className: `transition-colors ${row.status === "Allocated" ? "cursor-pointer hover:bg-primary-fixed/10" : ""} ${i % 2 === 1 ? "bg-surface-container-low" : ""}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-md text-mono-data text-primary font-bold",
											children: row.case_number
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-md",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-medium",
													children: row.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[11px] text-on-surface-variant",
													children: row.branch
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[11px] text-on-surface-variant",
													children: row.idLine
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-md text-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `px-2 py-1 rounded font-bold ${row.dpdClass}`,
												children: [row.dpd, "d"]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-md text-right text-mono-data",
											children: row.outstanding
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-md",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
													name: row.collateralIcon,
													className: "text-sm text-outline"
												}), row.collateral]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-md text-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-tight ${row.statusClass}`,
												children: row.status
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-md text-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "p-1.5 hover:bg-surface-container-highest rounded-full transition-colors text-primary",
												onClick: (event) => {
													event.stopPropagation();
													openDetails(row.id);
												},
												"aria-label": `View details for ${row.name}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
													name: "visibility",
													className: "text-lg"
												})
											})
										})
									]
								}, row.id))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-md border-t border-outline-variant bg-surface-container-lowest flex justify-between items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "px-3 py-1.5 border border-outline-variant rounded hover:bg-surface-container transition-colors disabled:opacity-30",
									disabled: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "chevron_left",
										className: "text-sm"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "px-3 py-1.5 border border-primary bg-primary text-on-primary rounded text-xs font-bold",
									children: "1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "px-3 py-1.5 border border-outline-variant rounded hover:bg-surface-container transition-colors text-xs font-bold",
									children: "2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "px-3 py-1.5 border border-outline-variant rounded hover:bg-surface-container transition-colors text-xs font-bold",
									children: "3"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "px-3 py-1.5 border border-outline-variant rounded hover:bg-surface-container transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "chevron_right",
										className: "text-sm"
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] font-medium text-outline",
							children: "LAST UPDATED: 24 OCT 2023 14:32:10 EAT"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { width: 450 },
				className: `fixed right-0 top-16 z-40 h-[calc(100vh-4rem)] transform overflow-y-auto border-l border-outline-variant bg-surface-container-lowest shadow-2xl transition-transform duration-300 ${panelOpen ? "translate-x-0" : "translate-x-full"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-lg flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-headline-sm text-primary",
							children: "Auctioneer Details"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-body-sm text-on-surface-variant",
							children: selectedAuctioneerDetails?.company_name ?? (selectedRow?.status === "Allocated" ? "No auctioneer assigned" : "Not Allocated")
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "rounded-full p-2 hover:bg-surface-container",
							onClick: () => {
								setPanelOpen(false);
								setSelectedCaseId(null);
								setAllocationDetails(null);
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
										children: (selectedAuctioneerDetails?.contact_person ?? "AU").slice(0, 2).toUpperCase()
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-label-bold text-primary",
										children: selectedAuctioneerDetails?.contact_person ?? (selectedRow?.status === "Allocated" ? "No auctioneer assigned" : "Not Allocated")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-body-sm",
										children: selectedRow?.status === "Allocated" ? "Allocated Auctioneer" : "Not Allocated"
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
										children: selectedAuctioneerDetails?.license_number ?? "N/A"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-outline-variant p-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-bold uppercase text-outline",
										children: "Allocated On"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-mono-data",
										children: allocationDetails?.allocated_at ? new Date(allocationDetails.allocated_at).toLocaleDateString() : "N/A"
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
									children: selectedAuctioneerDetails?.phone_number ?? "N/A"
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
												children: selectedRow?.name ?? "Case"
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
												children: selectedRow?.id ?? "Loan ID"
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
												children: selectedRow?.branch ?? "Branch"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold text-primary",
											children: "VIEW"
										})]
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-primary/5 rounded-lg border border-primary/10 p-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "terminal",
						className: "text-primary text-sm"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-label-bold text-primary uppercase",
						children: "Recent System Activity"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-body-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-on-surface-variant text-mono-data",
							children: "14:28:11 - User [JMUKASA] initialized new recovery case LR-2024-0025."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-outline font-medium uppercase",
							children: "Draft Saved"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-body-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-on-surface-variant text-mono-data",
							children: "13:15:04 - Case LR-2024-0012 allocated to auctioneer [KAMPALA ASSET RECOVERY LTD]."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-outline font-medium uppercase",
							children: "Allocation Confirmed"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: caseFormOpen,
				onClose: () => setCaseFormOpen(false),
				title: "Register New Recovery Case",
				subtitle: "Enter borrower and collateral information to initiate recovery process",
				icon: "description",
				tone: "primary",
				size: "lg",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
						onClick: () => setCaseFormOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md",
							onClick: createCase,
							disabled: creatingCase,
							children: creatingCase ? "Registering..." : "Register Case"
						})
					})]
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block mb-2",
							children: "Borrower Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: caseData.customer_name,
							onChange: (e) => setCaseData({
								...caseData,
								customer_name: e.target.value
							}),
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
								value: caseData.national_id,
								onChange: (e) => setCaseData({
									...caseData,
									national_id: e.target.value
								}),
								type: "text",
								className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
								placeholder: "ID number"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-label-bold text-on-surface block mb-2",
								children: "Branch"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: caseData.branch_id,
								onChange: (e) => setCaseData({
									...caseData,
									branch_id: e.target.value
								}),
								className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select branch"
								}), branches.map((branch) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: branch.id,
									children: branch.branch_name
								}, branch.id))]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block mb-2",
							children: "Loan ID"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: caseData.loan_account_number,
							onChange: (e) => setCaseData({
								...caseData,
								loan_account_number: e.target.value
							}),
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
								value: caseData.outstanding_balance,
								onChange: (e) => setCaseData({
									...caseData,
									outstanding_balance: e.target.value
								}),
								type: "number",
								className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
								placeholder: "0"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-label-bold text-on-surface block mb-2",
								children: "Turn Around Time (Days)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: caseData.arrears_days,
								onChange: (e) => setCaseData({
									...caseData,
									arrears_days: e.target.value
								}),
								type: "number",
								className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
								placeholder: "0"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block mb-2",
							children: "Collateral Type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: caseData.collateral_type,
							onChange: (e) => setCaseData({
								...caseData,
								collateral_type: e.target.value
							}),
							className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Land",
									children: "Land"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Motor Vehicle",
									children: "Motor Vehicle"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Building",
									children: "Building"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Machinery",
									children: "Machinery"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Household Property",
									children: "Household Property"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Other",
									children: "Other"
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block mb-2",
							children: "Collateral Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: caseData.collateral_description,
							onChange: (e) => setCaseData({
								...caseData,
								collateral_description: e.target.value
							}),
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
