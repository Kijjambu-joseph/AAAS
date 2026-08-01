import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime, t as Root } from "../_libs/@radix-ui/react-label+[...].mjs";
import { r as Icon, t as AppShell } from "./AppShell-CHdJzBdJ.mjs";
import { i as Modal, t as Button } from "./ui-kit-D18jqlXM.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.transaction-limits-B7VrjO9r.js
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
var MOCK_LIMITS = [
	{
		id: "TL-001",
		level: "Level 1 - Standard",
		minimum: 0,
		maximum: 5e6,
		approvalRequired: false,
		isActive: true
	},
	{
		id: "TL-002",
		level: "Level 2 - Intermediate",
		minimum: 5e6,
		maximum: 5e7,
		approvalRequired: true,
		isActive: true
	},
	{
		id: "TL-003",
		level: "Level 3 - High Value",
		minimum: 5e7,
		maximum: 5e8,
		approvalRequired: true,
		isActive: true
	},
	{
		id: "TL-004",
		level: "Level 4 - Premium",
		minimum: 5e8,
		maximum: 5e9,
		approvalRequired: true,
		isActive: false
	}
];
function formatCurrency(value) {
	return new Intl.NumberFormat("en-UG", {
		style: "currency",
		currency: "UGX",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(value);
}
function TransactionLimitsPage() {
	const [limits, setLimits] = (0, import_react.useState)(MOCK_LIMITS);
	const [isAddModalOpen, setIsAddModalOpen] = (0, import_react.useState)(false);
	const [isEditModalOpen, setIsEditModalOpen] = (0, import_react.useState)(false);
	const [selectedLimit, setSelectedLimit] = (0, import_react.useState)(null);
	const [formData, setFormData] = (0, import_react.useState)({
		level: "",
		minimum: "",
		maximum: "",
		approvalRequired: false
	});
	const handleAddNew = () => {
		setFormData({
			level: "",
			minimum: "",
			maximum: "",
			approvalRequired: false
		});
		setSelectedLimit(null);
		setIsAddModalOpen(true);
	};
	const handleEdit = (limit) => {
		setSelectedLimit(limit);
		setFormData({
			level: limit.level,
			minimum: limit.minimum.toString(),
			maximum: limit.maximum.toString(),
			approvalRequired: limit.approvalRequired
		});
		setIsEditModalOpen(true);
	};
	const handleSaveNew = () => {
		if (!formData.level || !formData.minimum || !formData.maximum) {
			alert("Please fill all fields");
			return;
		}
		const newLimit = {
			id: `TL-${String(limits.length + 1).padStart(3, "0")}`,
			level: formData.level,
			minimum: parseInt(formData.minimum),
			maximum: parseInt(formData.maximum),
			approvalRequired: formData.approvalRequired,
			isActive: true
		};
		setLimits([...limits, newLimit]);
		setIsAddModalOpen(false);
		setFormData({
			level: "",
			minimum: "",
			maximum: "",
			approvalRequired: false
		});
	};
	const handleSaveEdit = () => {
		if (!selectedLimit) return;
		if (!formData.level || !formData.minimum || !formData.maximum) {
			alert("Please fill all fields");
			return;
		}
		setLimits(limits.map((limit) => limit.id === selectedLimit.id ? {
			...limit,
			level: formData.level,
			minimum: parseInt(formData.minimum),
			maximum: parseInt(formData.maximum),
			approvalRequired: formData.approvalRequired
		} : limit));
		setIsEditModalOpen(false);
		setSelectedLimit(null);
	};
	const handleToggleActive = (id) => {
		setLimits(limits.map((limit) => limit.id === id ? {
			...limit,
			isActive: !limit.isActive
		} : limit));
	};
	const handleDelete = (id) => {
		if (confirm("Are you sure you want to delete this transaction limit?")) setLimits(limits.filter((limit) => limit.id !== id));
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
						children: limits.filter((l) => l.isActive).length
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
						children: limits.filter((l) => l.approvalRequired).length
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
						children: formatCurrency(Math.max(...limits.map((l) => l.maximum)))
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
											children: limit.level
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-lg py-4 text-on-surface",
									children: formatCurrency(limit.minimum)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-lg py-4 text-on-surface",
									children: formatCurrency(limit.maximum)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-lg py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-2 w-2 rounded-full ${limit.approvalRequired ? "bg-secondary" : "bg-success"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-body-sm text-on-surface",
											children: limit.approvalRequired ? "Yes" : "No"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-lg py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `inline-flex items-center gap-1 rounded-full px-3 py-1 text-label-small ${limit.isActive ? "bg-success/10 text-success" : "bg-error/10 text-error"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												name: limit.isActive ? "check_circle" : "cancel",
												className: "text-sm"
											}), limit.isActive ? "Active" : "Inactive"]
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
												className: `p-2 rounded-lg transition-colors ${limit.isActive ? "text-secondary hover:bg-surface-container-high" : "text-success hover:bg-surface-container-high"}`,
												title: limit.isActive ? "Deactivate" : "Activate",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
													name: limit.isActive ? "toggle_on" : "toggle_off",
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
						value: formData.level,
						onChange: (e) => setFormData({
							...formData,
							level: e.target.value
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
							value: formData.minimum,
							onChange: (e) => setFormData({
								...formData,
								minimum: e.target.value
							})
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "maximum",
							children: "Maximum Amount (UGX)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "maximum",
							type: "number",
							placeholder: "0",
							value: formData.maximum,
							onChange: (e) => setFormData({
								...formData,
								maximum: e.target.value
							})
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							id: "approval",
							checked: formData.approvalRequired,
							onChange: (e) => setFormData({
								...formData,
								approvalRequired: e.target.checked
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
						value: formData.level,
						onChange: (e) => setFormData({
							...formData,
							level: e.target.value
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
							value: formData.minimum,
							onChange: (e) => setFormData({
								...formData,
								minimum: e.target.value
							})
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "edit-maximum",
							children: "Maximum Amount (UGX)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "edit-maximum",
							type: "number",
							placeholder: "0",
							value: formData.maximum,
							onChange: (e) => setFormData({
								...formData,
								maximum: e.target.value
							})
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							id: "edit-approval",
							checked: formData.approvalRequired,
							onChange: (e) => setFormData({
								...formData,
								approvalRequired: e.target.checked
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
