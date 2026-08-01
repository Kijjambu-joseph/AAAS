import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { a as ROLE_HOME, l as writeSession, n as BrandLogo, r as Icon, s as sessionUserFromDatabase } from "./AppShell-CHdJzBdJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DwFB5zF1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AUTH_KEY = "aaas.auth";
var TOKEN_KEY = "aaas.token";
function setToken(access, refresh) {
	try {
		if (typeof window !== "undefined") {
			localStorage.setItem(TOKEN_KEY, access);
			if (refresh) localStorage.setItem(AUTH_KEY, JSON.stringify({
				access,
				refresh
			}));
		}
	} catch (e) {}
}
async function login(username, password) {
	const res = await fetch("/api/token/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({
			username,
			password
		}),
		credentials: "same-origin"
	});
	if (!res.ok) throw new Error("Invalid employee ID or password");
	const data = await res.json();
	setToken(data.access, data.refresh);
	return data;
}
function LoginPage() {
	const navigate = useNavigate();
	const [employeeId, setEmployeeId] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const signIn = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const user = sessionUserFromDatabase((await login(employeeId, password)).user);
			writeSession(user);
			navigate({ to: ROLE_HOME[user.role] });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to sign in");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "relative z-10 grid w-full max-w-[1200px] grid-cols-1 overflow-hidden rounded-[10px] border border-outline-variant bg-surface-container-lowest shadow-xl md:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative hidden flex-col justify-center overflow-hidden bg-primary p-xl text-center text-on-primary md:col-span-7 md:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex flex-col items-center justify-center gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-40 w-40 items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { className: "h-36 w-36" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-[40px] font-bold leading-tight tracking-tight text-on-primary",
							children: "Centenary Bank"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[15px] text-white font-semibold uppercase leading-5 tracking-[0.25em] text-on-primary-container opacity-90",
							children: "Auto-Allocation of Auctioneers System"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "text-center py-3 border-top mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 Centenary Bank. All Rights Reserved." })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "col-span-1 flex flex-col bg-surface-container-lowest p-xl md:col-span-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-xl flex items-center gap-md md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { className: "h-12 w-12" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-headline-sm text-primary",
						children: "Centenary Bank"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-label-bold uppercase text-outline",
						children: "AAAS System"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-lg",
					onSubmit: signIn,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-label-bold text-on-surface-variant",
								htmlFor: "employee_id",
								children: "EMPLOYEE ID / EMAIL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "badge",
									className: "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-outline"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "employee_id",
									value: employeeId,
									onChange: (e) => setEmployeeId(e.target.value),
									className: "w-full rounded-[10px] border border-outline-variant bg-surface-container py-md pl-13 pr-md text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary",
									placeholder: "EMP-000000"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center justify-between",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-label-bold text-on-surface-variant",
										htmlFor: "password",
										children: "PASSWORD"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "lock",
										className: "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-outline"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "password",
										type: "password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										className: "w-full rounded-[10px] border border-outline-variant bg-surface-container py-md pl-13 pr-md text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary",
										placeholder: "••••••••••••"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "text-label-bold text-primary hover:underline",
									href: "#",
									children: "FORGOT PASSWORD?"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-body-sm text-on-surface-variant",
							children: "Your access role is assigned securely from your account."
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md bg-error-container px-3 py-2 text-body-sm text-on-error-container",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: loading,
							className: "flex w-full items-center justify-center gap-md rounded-[10px] bg-primary py-lg text-title-lg text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-[0.98] disabled:opacity-70",
							children: [loading ? "Authenticating..." : "Sign In", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: loading ? "progress_activity" : "login",
								className: loading ? "animate-spin" : ""
							})]
						})
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none fixed bottom-md left-md right-md z-20 flex items-center justify-between opacity-50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 animate-pulse rounded-full bg-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-mono-data text-on-surface",
						children: "AAAS_CORE: ONLINE"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "border-l border-outline-variant pl-md text-mono-data text-on-surface",
					children: "LOC: KAMPALA_HQ"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-mono-data text-on-surface",
				children: "v2.4.0-SECURE"
			})]
		})]
	});
}
//#endregion
export { LoginPage as component };
