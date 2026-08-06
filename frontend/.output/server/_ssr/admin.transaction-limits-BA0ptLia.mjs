import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime, t as Root } from "../_libs/@radix-ui/react-label+[...].mjs";
import { r as Icon, t as AppShell } from "./AppShell-Mf8Pngaj.mjs";
import { t as Api } from "./api-BumNLaxK.mjs";
import { i as Modal, t as Button } from "./ui-kit-CA-wP0NN.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.transaction-limits-BA0ptLia.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
var formatCurrency = (value) => new Intl.NumberFormat("en-UG", {
	style: "currency",
	currency: "UGX",
	maximumFractionDigits: 0
}).format(value);
function TransactionLimitsPage() {
	const [limits, setLimits] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [isAddModalOpen, setIsAddModalOpen] = (0, import_react.useState)(false);
	const [isEditModalOpen, setIsEditModalOpen] = (0, import_react.useState)(false);
	const [selectedLimit, setSelectedLimit] = (0, import_react.useState)(null);
	const [formData, setFormData] = (0, import_react.useState)({
		level_name: "",
		minimum_amount: "",
		maximum_amount: "",
		requires_approval: false
	});
	(0, import_react.useEffect)(() => {
		fetchLimits();
	}, []);
	const fetchLimits = async () => {
		try {
			setLoading(true);
			const data = await Api.get("/api/transaction-limits/?ordering=id");
			setLimits(Array.isArray(data) ? data : data.results ?? []);
		} catch (err) {
			console.error("Failed to fetch transaction limits:", err);
		} finally {
			setLoading(false);
		}
	};
	const handleAddNew = () => {
		setFormData({
			level_name: "",
			minimum_amount: "",
			maximum_amount: "",
			requires_approval: false
		});
		setSelectedLimit(null);
		setIsAddModalOpen(true);
	};
	const handleEdit = (limit) => {
		setSelectedLimit(limit);
		setFormData({
			level_name: limit.level_name,
			minimum_amount: limit.minimum_amount.toString(),
			maximum_amount: limit.maximum_amount.toString(),
			requires_approval: limit.requires_approval
		});
		setIsEditModalOpen(true);
	};
	const handleSaveNew = async () => {
		if (!formData.level_name || !formData.minimum_amount || !formData.maximum_amount) {
			alert("Please fill all fields");
			return;
		}
		try {
			const newLimit = await Api.post("/api/transaction-limits/", {
				level_name: formData.level_name,
				minimum_amount: parseInt(formData.minimum_amount),
				maximum_amount: parseInt(formData.maximum_amount),
				requires_approval: formData.requires_approval,
				is_active: true
			});
			setLimits([...limits, newLimit]);
			setIsAddModalOpen(false);
			setFormData({
				level_name: "",
				minimum_amount: "",
				maximum_amount: "",
				requires_approval: false
			});
		} catch (err) {
			alert(`Error creating limit: ${err}`);
		}
	};
	const handleSaveEdit = async () => {
		if (!selectedLimit) return;
		if (!formData.level_name || !formData.minimum_amount || !formData.maximum_amount) {
			alert("Please fill all fields");
			return;
		}
		try {
			const updated = await Api.patch(`/api/transaction-limits/${selectedLimit.id}/`, {
				level_name: formData.level_name,
				minimum_amount: parseInt(formData.minimum_amount),
				maximum_amount: parseInt(formData.maximum_amount),
				requires_approval: formData.requires_approval
			});
			setLimits(limits.map((limit) => limit.id === selectedLimit.id ? updated : limit));
			setIsEditModalOpen(false);
			setSelectedLimit(null);
		} catch (err) {
			alert(`Error updating limit: ${err}`);
		}
	};
	const handleToggleActive = async (id) => {
		const limit = limits.find((l) => l.id === id);
		if (!limit) return;
		try {
			const updated = await Api.patch(`/api/transaction-limits/${id}/`, { is_active: !limit.is_active });
			setLimits(limits.map((l) => l.id === id ? updated : l));
		} catch (err) {
			alert(`Error toggling active status: ${err}`);
		}
	};
	const handleDelete = async (id) => {
		if (!confirm("Are you sure you want to delete this transaction limit?")) return;
		try {
			await Api.delete(`/api/transaction-limits/${id}/`);
			setLimits(limits.filter((limit) => limit.id !== id));
		} catch (err) {
			alert(`Error deleting limit: ${err}`);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "-mx-xl -mt-xl mb-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-xl py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-title-lg text-primary",
					children: "Transaction Limits Management"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-body-sm text-on-surface-variant",
					children: "Configure transaction limits and approval thresholds for each level"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleAddNew,
					variant: "gold",
					icon: "add_circle",
					className: "shrink-0",
					children: "New Limit"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-lg mt-5 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-label-bold uppercase text-on-surface-variant",
							children: "Total Levels"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "layers",
							className: "text-primary"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-display-lg text-primary",
						children: limits.length
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-label-bold uppercase text-on-surface-variant",
							children: "Active Limits"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "check_circle",
							className: "text-success"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-display-lg text-success",
						children: limits.filter((l) => l.is_active).length
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-label-bold uppercase text-on-surface-variant",
							children: "Approval Required"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "verified",
							className: "text-secondary"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-display-lg text-secondary",
						children: limits.filter((l) => l.requires_approval).length
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-label-bold uppercase text-on-surface-variant",
							children: "Max Threshold"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "trending_up",
							className: "text-primary"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-headline-sm text-primary",
						children: formatCurrency(Math.max(...limits.map((l) => l.maximum_amount), 0))
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-outline-variant bg-surface-container",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-lg py-4 text-left text-label-bold text-on-surface",
									children: "Level"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-lg py-4 text-left text-label-bold text-on-surface",
									children: "Minimum Amount"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-lg py-4 text-left text-label-bold text-on-surface",
									children: "Maximum Amount"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-lg py-4 text-left text-label-bold text-on-surface",
									children: "Approval Required"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-lg py-4 text-left text-label-bold text-on-surface",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-lg py-4 text-center text-label-bold text-on-surface",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: limits.map((limit, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: `border-b border-outline-variant transition-colors hover:bg-surface-container ${index % 2 === 0 ? "bg-surface-container-lowest" : "bg-surface-container"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-lg py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-8 w-8 flex items-center justify-center rounded-full bg-primary/10",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												name: "layers",
												className: "text-sm text-primary"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-on-surface",
											children: limit.level_name
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-lg py-4 text-on-surface",
									children: formatCurrency(limit.minimum_amount)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-lg py-4 text-on-surface",
									children: formatCurrency(limit.maximum_amount)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-lg py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-2 w-2 rounded-full ${limit.requires_approval ? "bg-secondary" : "bg-success"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-body-sm text-on-surface",
											children: limit.requires_approval ? "Yes" : "No"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-lg py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `inline-flex items-center gap-1 rounded-full px-3 py-1 text-label-small ${limit.is_active ? "bg-success/10 text-success" : "bg-error/10 text-error"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												name: limit.is_active ? "check_circle" : "cancel",
												className: "text-sm"
											}), limit.is_active ? "Active" : "Inactive"]
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-lg py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleEdit(limit),
												className: "p-2 text-primary hover:bg-surface-container-high rounded-lg transition-colors",
												title: "Edit limit",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
													name: "edit",
													className: "text-lg"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleToggleActive(limit.id),
												className: `p-2 rounded-lg transition-colors ${limit.is_active ? "text-secondary hover:bg-surface-container-high" : "text-success hover:bg-surface-container-high"}`,
												title: limit.is_active ? "Deactivate" : "Activate",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
													name: limit.is_active ? "toggle_on" : "toggle_off",
													className: "text-lg"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleDelete(limit.id),
												className: "p-2 text-error hover:bg-surface-container-high rounded-lg transition-colors",
												title: "Delete limit",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
													name: "delete",
													className: "text-lg"
												})
											})
										]
									})
								})
							]
						}, limit.id)) })]
					})
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			open: isAddModalOpen,
			onClose: () => setIsAddModalOpen(false),
			title: "Create New Transaction Limit",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "level",
						children: "Transaction Level Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "level",
						placeholder: "e.g., Level 1 - Standard",
						value: formData.level_name,
						onChange: (e) => setFormData({
							...formData,
							level_name: e.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "minimum",
							children: "Minimum Amount (UGX)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "minimum",
							type: "number",
							placeholder: "0",
							value: formData.minimum_amount,
							onChange: (e) => setFormData({
								...formData,
								minimum_amount: e.target.value
							})
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "maximum",
							children: "Maximum Amount (UGX)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "maximum",
							type: "number",
							placeholder: "0",
							value: formData.maximum_amount,
							onChange: (e) => setFormData({
								...formData,
								maximum_amount: e.target.value
							})
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							id: "approval",
							checked: formData.requires_approval,
							onChange: (e) => setFormData({
								...formData,
								requires_approval: e.target.checked
							}),
							className: "h-4 w-4 rounded border border-outline"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "approval",
							className: "cursor-pointer",
							children: "Approval Required for this level"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 justify-end pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setIsAddModalOpen(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "gold",
							onClick: handleSaveNew,
							children: "Create Limit"
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			open: isEditModalOpen,
			onClose: () => setIsEditModalOpen(false),
			title: "Edit Transaction Limit",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "edit-level",
						children: "Transaction Level Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "edit-level",
						placeholder: "e.g., Level 1 - Standard",
						value: formData.level_name,
						onChange: (e) => setFormData({
							...formData,
							level_name: e.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "edit-minimum",
							children: "Minimum Amount (UGX)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "edit-minimum",
							type: "number",
							placeholder: "0",
							value: formData.minimum_amount,
							onChange: (e) => setFormData({
								...formData,
								minimum_amount: e.target.value
							})
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "edit-maximum",
							children: "Maximum Amount (UGX)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "edit-maximum",
							type: "number",
							placeholder: "0",
							value: formData.maximum_amount,
							onChange: (e) => setFormData({
								...formData,
								maximum_amount: e.target.value
							})
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							id: "edit-approval",
							checked: formData.requires_approval,
							onChange: (e) => setFormData({
								...formData,
								requires_approval: e.target.checked
							}),
							className: "h-4 w-4 rounded border border-outline"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "edit-approval",
							className: "cursor-pointer",
							children: "Approval Required for this level"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 justify-end pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setIsEditModalOpen(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "gold",
							onClick: handleSaveEdit,
							children: "Update Limit"
						})]
					})
				]
			})
		})
	] });
}
//#endregion
export { TransactionLimitsPage as component };
