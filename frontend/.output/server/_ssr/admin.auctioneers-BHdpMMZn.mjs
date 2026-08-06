import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { r as Icon, t as AppShell } from "./AppShell-CExlMv0k.mjs";
import { t as Api } from "./api-BumNLaxK.mjs";
import { i as Modal } from "./ui-kit-rxJ3QVV7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.auctioneers-BHdpMMZn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuctioneerPanel() {
	const [addAuctioneerOpen, setAddAuctioneerOpen] = (0, import_react.useState)(false);
	const [importOpen, setImportOpen] = (0, import_react.useState)(false);
	const [exportOpen, setExportOpen] = (0, import_react.useState)(false);
	const [records, setRecords] = (0, import_react.useState)([]);
	const [audits, setAudits] = (0, import_react.useState)([]);
	const [regionFilter, setRegionFilter] = (0, import_react.useState)("All Regions");
	const [licenseFilter, setLicenseFilter] = (0, import_react.useState)("Any Status");
	const [capacityFilter, setCapacityFilter] = (0, import_react.useState)("Show All");
	const [selectedAuctioneer, setSelectedAuctioneer] = (0, import_react.useState)(null);
	const [performanceModalOpen, setPerformanceModalOpen] = (0, import_react.useState)(false);
	const [suspendModalOpen, setSuspendModalOpen] = (0, import_react.useState)(false);
	const [workloadModalOpen, setWorkloadModalOpen] = (0, import_react.useState)(false);
	const [suspendReason, setSuspendReason] = (0, import_react.useState)("");
	const [newWorkload, setNewWorkload] = (0, import_react.useState)({
		current: 0,
		max: 15
	});
	const [actions, setActions] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		company_name: "",
		license_number: "",
		ura_registration: "",
		license_expiry: "",
		contact_person: "",
		email: "",
		phone_number: "",
		regions: [],
		maximum_caseload: "15",
		license_document: null
	});
	(0, import_react.useEffect)(() => {
		Promise.all([Api.get("/api/auctioneers/?ordering=company_name"), Api.get("/api/audit-logs/?ordering=-created_at")]).then(([data, logs]) => {
			setRecords(Array.isArray(data) ? data : data.results ?? []);
			setAudits(Array.isArray(logs) ? logs : logs.results ?? []);
		});
	}, []);
	const auctioneers = (0, import_react.useMemo)(() => records.map((item) => {
		const days = Math.ceil((new Date(item.license_expiry).getTime() - Date.now()) / 864e5);
		const status = !item.status || days < 0 ? "Expired" : days <= 30 ? "Expiring Soon" : "Valid";
		const regions = item.regions?.length ? item.regions : [item.region];
		const max = Number(item.maximum_caseload || 15);
		return {
			...item,
			name: item.company_name,
			license: item.license_number,
			status,
			statusClass: status === "Valid" ? "bg-green-100 text-green-800" : status === "Expired" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800",
			expiry: new Date(item.license_expiry).toLocaleDateString(),
			expiryClass: status === "Expired" ? "text-error" : status === "Expiring Soon" ? "text-secondary font-bold" : "",
			region: regions.join(", "),
			workload: `${item.current_workload} / ${max}`,
			workloadPct: Math.min(100, Math.round(Number(item.current_workload || 0) / max * 100)),
			workloadColor: Number(item.current_workload || 0) >= max ? "bg-secondary" : "bg-primary",
			leadTime: "Not recorded",
			success: "Not recorded",
			successClass: "text-on-surface-variant"
		};
	}).filter((item) => (regionFilter === "All Regions" || item.region.includes(regionFilter)) && (licenseFilter === "Any Status" || item.status === licenseFilter) && (capacityFilter === "Show All" || (capacityFilter === "Has Capacity" ? Number(item.current_workload) < Number(item.maximum_caseload) : Number(item.current_workload) >= Number(item.maximum_caseload)))), [
		records,
		regionFilter,
		licenseFilter,
		capacityFilter
	]);
	async function registerAuctioneer() {
		const payload = new FormData();
		Object.entries(form).forEach(([key, value]) => {
			if (key === "regions") payload.append(key, JSON.stringify(value));
			else if (key === "license_document") {
				if (value) payload.append(key, value);
			} else payload.append(key, String(value));
		});
		payload.append("region", form.regions[0] || "Central");
		payload.append("current_workload", "0");
		payload.append("office_address", "");
		payload.append("status", "true");
		const created = await Api.post("/api/auctioneers/", payload);
		setRecords([...records, created]);
		setAddAuctioneerOpen(false);
	}
	async function viewPerformance(auctioneer) {
		setSelectedAuctioneer(auctioneer);
		try {
			const perf = await Api.get(`/api/auctioneers/${auctioneer.id}/performance/`);
			setActions(perf);
			setPerformanceModalOpen(true);
		} catch (err) {
			console.error("Failed to fetch performance metrics:", err);
		}
	}
	async function openSuspendDialog(auctioneer) {
		setSelectedAuctioneer(auctioneer);
		setSuspendReason("");
		setSuspendModalOpen(true);
	}
	async function handleSuspend() {
		if (!selectedAuctioneer) return;
		try {
			await Api.post(`/api/auctioneers/${selectedAuctioneer.id}/suspend/`, { reason: suspendReason });
			setRecords(records.map((a) => a.id === selectedAuctioneer.id ? {
				...a,
				is_active: false
			} : a));
			setSuspendModalOpen(false);
			alert(`${selectedAuctioneer.company_name} has been suspended`);
		} catch (err) {
			alert(`Error suspending auctioneer: ${err}`);
		}
	}
	async function handleActivate(auctioneer) {
		try {
			await Api.post(`/api/auctioneers/${auctioneer.id}/activate/`, {});
			setRecords(records.map((a) => a.id === auctioneer.id ? {
				...a,
				is_active: true
			} : a));
			alert(`${auctioneer.company_name} has been activated`);
		} catch (err) {
			alert(`Error activating auctioneer: ${err}`);
		}
	}
	async function openWorkloadDialog(auctioneer) {
		setSelectedAuctioneer(auctioneer);
		setNewWorkload({
			current: auctioneer.current_workload,
			max: auctioneer.maximum_caseload
		});
		setWorkloadModalOpen(true);
	}
	async function handleWorkloadUpdate() {
		if (!selectedAuctioneer) return;
		try {
			await Api.post(`/api/auctioneers/${selectedAuctioneer.id}/update-workload/`, {
				current_workload: newWorkload.current,
				maximum_caseload: newWorkload.max
			});
			setRecords(records.map((a) => a.id === selectedAuctioneer.id ? {
				...a,
				current_workload: newWorkload.current,
				maximum_caseload: newWorkload.max
			} : a));
			setWorkloadModalOpen(false);
			alert("Workload updated successfully");
		} catch (err) {
			alert(`Error updating workload: ${err}`);
		}
	}
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
								children: records.length
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-green-600",
								children: "Live records"
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
								children: "Not recorded"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-on-surface-variant",
								children: "Not stored in the database"
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
								children: records.reduce((sum, item) => sum + Number(item.current_workload || 0), 0)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-secondary",
								children: "Current workload"
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
								children: "Not recorded"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-on-surface-variant",
								children: "Not stored in the database"
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
									value: regionFilter,
									onChange: (e) => setRegionFilter(e.target.value),
									className: "min-w-[160px] rounded border-outline-variant bg-surface-container-lowest px-3 py-1 text-body-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All Regions" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Central" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Western" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Northern" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Eastern" })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "ml-1 text-[10px] font-bold uppercase text-on-surface-variant",
									children: "License Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: licenseFilter,
									onChange: (e) => setLicenseFilter(e.target.value),
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
									value: capacityFilter,
									onChange: (e) => setCapacityFilter(e.target.value),
									className: "min-w-[160px] rounded border-outline-variant bg-surface-container-lowest px-3 py-1 text-body-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Show All" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Has Capacity" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "At Limit" })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setRegionFilter("All Regions");
									setLicenseFilter("Any Status");
									setCapacityFilter("Show All");
								},
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
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap justify-end gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => viewPerformance(a),
														className: "rounded-lg border border-outline-variant px-3 py-2 text-[11px] font-bold text-primary hover:bg-surface-container-lowest",
														children: "Metrics"
													}),
													a.is_active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => openSuspendDialog(a),
														className: "rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-[11px] font-bold text-error hover:bg-error/20",
														children: "Suspend"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => handleActivate(a),
														className: "rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-[11px] font-bold text-primary hover:bg-primary/20",
														children: "Activate"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => openWorkloadDialog(a),
														className: "rounded-lg border border-outline-variant px-3 py-2 text-[11px] font-bold text-primary hover:bg-surface-container-lowest",
														children: "Workload"
													})
												]
											})
										})
									]
								}, a.license))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between bg-surface-container-lowest p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-body-sm text-on-surface-variant",
							children: [
								"Showing ",
								auctioneers.length,
								" of ",
								records.length,
								" auctioneers"
							]
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
							children: "Live database workload"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex h-64 items-center justify-center overflow-hidden rounded bg-surface-container-low",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 opacity-10",
							style: {
								backgroundImage: "radial-gradient(#00A0DF 1px, transparent 1px)",
								backgroundSize: "20px 20px"
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative z-10 grid h-full w-full grid-cols-4 gap-4 p-4",
							children: [
								"Central",
								"Western",
								"Eastern",
								"Northern"
							].map((area) => {
								const count = records.filter((item) => (item.regions?.length ? item.regions : [item.region]).includes(area)).reduce((sum, item) => sum + Number(item.current_workload || 0), 0);
								const max = Math.max(...records.map((item) => Number(item.current_workload || 0)), 1);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-auto flex items-end rounded border border-primary/40 bg-primary/20 p-2",
									style: { height: `${Math.max(15, count / max * 100)}%` },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] font-bold text-primary",
										children: [
											area.toUpperCase(),
											": ",
											count,
											" Cases"
										]
									})
								}, area);
							})
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-full flex-col rounded-lg border border-outline-variant bg-surface-container-lowest p-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "mb-4 text-title-lg text-primary",
						children: "Recent Audit Actions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-grow space-y-4 overflow-y-auto",
						children: audits.filter((item) => item.model_name === "auctioneer").slice(0, 3).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
									children: item.action
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-[11px] text-on-surface-variant",
									children: item.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] font-medium text-on-surface-variant opacity-60",
									children: [
										new Date(item.created_at).toLocaleString(),
										" • ",
										item.user_name
									]
								})
							] })]
						}, item.id))
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
							onClick: registerAuctioneer,
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
							value: form.company_name,
							onChange: (e) => setForm({
								...form,
								company_name: e.target.value
							}),
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
								value: form.license_number,
								onChange: (e) => setForm({
									...form,
									license_number: e.target.value
								}),
								type: "text",
								className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
								placeholder: "e.g., LIC-UG-2024-0012"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-label-bold text-on-surface block mb-2",
								children: "URA Registration"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.ura_registration,
								onChange: (e) => setForm({
									...form,
									ura_registration: e.target.value
								}),
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
								value: form.license_expiry,
								onChange: (e) => setForm({
									...form,
									license_expiry: e.target.value
								}),
								type: "date",
								className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-label-bold text-on-surface block mb-2",
								children: "Primary Contact Person"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.contact_person,
								onChange: (e) => setForm({
									...form,
									contact_person: e.target.value
								}),
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
								value: form.email,
								onChange: (e) => setForm({
									...form,
									email: e.target.value
								}),
								type: "email",
								className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
								placeholder: "email@firm.com"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-label-bold text-on-surface block mb-2",
								children: "Contact Phone"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.phone_number,
								onChange: (e) => setForm({
									...form,
									phone_number: e.target.value
								}),
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
									checked: form.regions.includes(region.replace(" Region", "")),
									onChange: (e) => {
										const value = region.replace(" Region", "");
										setForm({
											...form,
											regions: e.target.checked ? [...form.regions, value] : form.regions.filter((item) => item !== value)
										});
									},
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
							value: form.maximum_caseload,
							onChange: (e) => setForm({
								...form,
								maximum_caseload: e.target.value
							}),
							type: "number",
							className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent",
							placeholder: "e.g., 15",
							min: "1"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block mb-2",
							children: "Upload License Document"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block border-2 border-dashed border-outline-variant rounded-lg p-6 text-center hover:bg-primary/5 transition-colors cursor-pointer",
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
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									onChange: (e) => setForm({
										...form,
										license_document: e.target.files?.[0] ?? null
									}),
									type: "file",
									accept: ".pdf,.jpg,.jpeg,.png",
									className: "sr-only"
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: performanceModalOpen,
				onClose: () => setPerformanceModalOpen(false),
				title: "Auctioneer Performance Metrics",
				subtitle: selectedAuctioneer ? `Metrics for ${selectedAuctioneer.company_name}` : "",
				icon: "insights",
				tone: "secondary",
				size: "md",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors",
					onClick: () => setPerformanceModalOpen(false),
					children: "Close"
				}),
				children: actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-label-bold text-on-surface-variant",
								children: "Total Allocations"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-body-lg text-primary",
								children: actions.total_allocations
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-label-bold text-on-surface-variant",
								children: "Workload"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-body-lg text-primary",
								children: [
									actions.current_workload,
									" / ",
									actions.maximum_caseload
								]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-label-bold text-on-surface-variant",
								children: "Completion Rate"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-body-lg text-primary",
								children: [actions.completion_rate, "%"]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-label-bold text-on-surface-variant",
								children: "Pending Allocations"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-body-lg text-primary",
								children: actions.pending
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-label-bold text-on-surface-variant",
								children: "Completed"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-body-lg text-primary",
								children: actions.completed
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-label-bold text-on-surface-variant",
								children: "In Progress"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-body-lg text-primary",
								children: actions.in_progress
							})] })]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-body-md text-on-surface-variant",
					children: "Loading performance metrics..."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: suspendModalOpen,
				onClose: () => setSuspendModalOpen(false),
				title: "Suspend Auctioneer",
				subtitle: selectedAuctioneer ? `Suspend ${selectedAuctioneer.company_name}` : "",
				icon: "pause_circle",
				tone: "error",
				size: "sm",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
						onClick: () => setSuspendModalOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 bg-error text-on-error rounded-lg text-label-bold hover:bg-error/90 transition-colors",
						onClick: handleSuspend,
						children: "Suspend"
					})]
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-body-sm text-on-surface-variant",
							children: "Suspending an auctioneer will prevent them from receiving new auto-allocations until reactivated."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-label-bold text-on-surface block",
							children: "Reason"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: suspendReason,
							onChange: (e) => setSuspendReason(e.target.value),
							className: "w-full min-h-[120px] rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-body-md focus:ring-2 focus:ring-error/50 focus:border-transparent",
							placeholder: "Enter a reason for suspension"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: workloadModalOpen,
				onClose: () => setWorkloadModalOpen(false),
				title: "Update Workload",
				subtitle: selectedAuctioneer ? `Adjust capacity for ${selectedAuctioneer.company_name}` : "",
				icon: "bar_chart",
				tone: "primary",
				size: "sm",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
						onClick: () => setWorkloadModalOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors",
						onClick: handleWorkloadUpdate,
						children: "Save"
					})]
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-label-bold text-on-surface block mb-2",
						children: "Current Workload"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: newWorkload.current,
						onChange: (e) => setNewWorkload({
							...newWorkload,
							current: Number(e.target.value)
						}),
						type: "number",
						className: "w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-label-bold text-on-surface block mb-2",
						children: "Maximum Caseload"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: newWorkload.max,
						onChange: (e) => setNewWorkload({
							...newWorkload,
							max: Number(e.target.value)
						}),
						type: "number",
						className: "w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-body-md focus:ring-2 focus:ring-primary focus:border-transparent"
					})] })]
				})
			})
		]
	});
}
//#endregion
export { AuctioneerPanel as component };
