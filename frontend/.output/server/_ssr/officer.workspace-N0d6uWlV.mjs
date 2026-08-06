import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { i as PageHeader, r as Icon, t as AppShell } from "./AppShell-CExlMv0k.mjs";
import { i as Modal } from "./ui-kit-rxJ3QVV7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/officer.workspace-N0d6uWlV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TASKS = [
	{
		id: "CR-2041",
		client: "Kato Enterprises",
		action: "Upload demand notice",
		due: "Today",
		tone: "error"
	},
	{
		id: "CR-2038",
		client: "Nabirye Holdings",
		action: "Confirm valuation report",
		due: "Tomorrow",
		tone: "warning"
	},
	{
		id: "CR-2029",
		client: "Ssemwanga Farms",
		action: "Borrower site visit",
		due: "3 days",
		tone: "muted"
	},
	{
		id: "CR-2017",
		client: "Lira Traders Ltd",
		action: "Submit for allocation",
		due: "5 days",
		tone: "muted"
	}
];
function WorkspacePage() {
	const [selectedTask, setSelectedTask] = (0, import_react.useState)(null);
	const [taskModalOpen, setTaskModalOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "My Workspace",
			subtitle: "Assigned recovery files and outstanding actions.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "flex items-center gap-2 rounded-lg bg-primary px-lg py-sm text-label-bold text-on-primary hover:opacity-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: "add_circle",
					className: "text-[18px]"
				}), "New Case File"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-md md:grid-cols-3",
			children: [
				{
					label: "Assigned Cases",
					value: "24",
					icon: "folder_managed"
				},
				{
					label: "Pending Actions",
					value: "7",
					icon: "pending_actions"
				},
				{
					label: "Portfolio Value",
					value: "UGX 2.1B",
					icon: "payments"
				}
			].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-fit rounded-lg bg-primary-fixed p-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: k.icon,
							className: "text-primary"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-label-bold uppercase tracking-wider text-on-surface-variant",
						children: k.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 text-display-lg",
						children: k.value
					})
				]
			}, k.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-outline-variant p-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-title-lg text-primary",
					children: "Action Queue"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-label-bold text-on-surface-variant",
					children: [TASKS.length, " items"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-surface-container-low",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-label-bold uppercase text-on-surface-variant",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-lg py-3",
								children: "Case ID"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-lg py-3",
								children: "Client"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-lg py-3",
								children: "Required Action"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-lg py-3",
								children: "Due"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: TASKS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-outline-variant hover:bg-surface-container-low cursor-pointer transition-colors",
					onClick: () => {
						setSelectedTask(t);
						setTaskModalOpen(true);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-lg py-4 text-mono-data text-primary",
							children: t.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-lg py-4 text-body-md",
							children: t.client
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-lg py-4 text-body-md text-on-surface-variant",
							children: t.action
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-lg py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: t.tone === "error" ? "rounded-full bg-error-container px-3 py-1 text-label-bold text-on-error-container" : t.tone === "warning" ? "rounded-full bg-secondary-fixed px-3 py-1 text-label-bold text-on-secondary-container" : "rounded-full bg-surface-container-high px-3 py-1 text-label-bold text-on-surface-variant",
								children: t.due
							})
						})
					]
				}, t.id)) })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
			open: taskModalOpen && selectedTask !== null,
			onClose: () => {
				setTaskModalOpen(false);
				setSelectedTask(null);
			},
			title: selectedTask ? `Action Required: ${selectedTask.id}` : "Task Details",
			subtitle: selectedTask ? selectedTask.client : "",
			icon: "task_alt",
			tone: selectedTask?.tone === "error" ? "error" : selectedTask?.tone === "warning" ? "secondary" : "primary",
			size: "md",
			footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "px-md py-2 border border-error rounded-lg text-error text-label-bold hover:bg-error/10 transition-colors",
					onClick: () => {
						setTaskModalOpen(false);
						setSelectedTask(null);
					},
					children: "Defer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 border border-outline-variant rounded-lg text-on-surface text-label-bold hover:bg-surface transition-colors",
						children: "Edit Task"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-md py-2 bg-primary text-on-primary rounded-lg text-label-bold hover:bg-primary-container transition-colors shadow-md",
						children: "Mark Complete"
					})]
				})]
			}),
			children: selectedTask && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg bg-surface-container-low p-4 border border-outline-variant",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-label-bold text-on-surface-variant uppercase text-xs",
								children: "Case ID"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-body-md text-primary font-bold mt-1",
								children: selectedTask.id
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-label-bold text-on-surface-variant uppercase text-xs",
								children: "Due Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `text-body-md font-bold mt-1 ${selectedTask.tone === "error" ? "text-error" : selectedTask.tone === "warning" ? "text-secondary" : "text-primary"}`,
								children: selectedTask.due
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-label-bold text-on-surface-variant uppercase text-xs mb-2",
						children: "Required Action"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-body-md text-on-surface",
						children: selectedTask.action
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-label-bold text-on-surface-variant uppercase text-xs mb-2",
						children: "Client"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-body-md text-on-surface",
						children: selectedTask.client
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-label-bold text-on-surface mb-3 uppercase",
						children: "Priority Level"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `p-3 rounded-lg border ${selectedTask.tone === "error" ? "bg-error-container/20 border-error/30" : selectedTask.tone === "warning" ? "bg-secondary-container/20 border-secondary-container/30" : "bg-primary/5 border-primary/10"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-label-bold ${selectedTask.tone === "error" ? "text-error" : selectedTask.tone === "warning" ? "text-secondary" : "text-primary"}`,
							children: selectedTask.tone === "error" ? "URGENT - Due Today" : selectedTask.tone === "warning" ? "HIGH - Due Soon" : "STANDARD - Due Later"
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-label-bold text-on-surface mb-3 uppercase",
						children: "Notes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "w-full px-3 py-2 border border-outline-variant rounded-lg text-body-sm focus:ring-2 focus:ring-primary focus:border-transparent",
						rows: 3,
						placeholder: "Add notes about this action..."
					})] })
				]
			})
		})
	] });
}
//#endregion
export { WorkspacePage as component };
