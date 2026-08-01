globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"5d35-ry5WF2OySaARTi5CNjew7/fQ6R8\"",
		"mtime": "2026-08-01T16:52:46.004Z",
		"size": 23861,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-01T16:52:46.004Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/AppShell-CVBb_jXV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35fd-ioJXYRRyR1xbav7TWAU+0qwnGo0\"",
		"mtime": "2026-08-01T16:52:43.324Z",
		"size": 13821,
		"path": "../public/assets/AppShell-CVBb_jXV.js"
	},
	"/assets/SettingsPage-DQe6kD4T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"81c-ptzlCfoXzQPxibT12nH55ybv6HI\"",
		"mtime": "2026-08-01T16:52:43.325Z",
		"size": 2076,
		"path": "../public/assets/SettingsPage-DQe6kD4T.js"
	},
	"/assets/SupportPage-CN2qm0Eb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192b-pdAB7IJJizKW/AUjsilaXh1b9aQ\"",
		"mtime": "2026-08-01T16:52:43.326Z",
		"size": 6443,
		"path": "../public/assets/SupportPage-CN2qm0Eb.js"
	},
	"/assets/Charts-DQvsfV0H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"669f9-Zyu+Ff62HYcla0J0Fx0Pitf3t9s\"",
		"mtime": "2026-08-01T16:52:43.325Z",
		"size": 420345,
		"path": "../public/assets/Charts-DQvsfV0H.js"
	},
	"/assets/admin.auctioneers-KEXLLJVj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6561-RdMeV62QtVgtRpTj1BJUdER+M5E\"",
		"mtime": "2026-08-01T16:52:43.326Z",
		"size": 25953,
		"path": "../public/assets/admin.auctioneers-KEXLLJVj.js"
	},
	"/assets/admin.allocation-BO5VAX3Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4de1-ebkuXdkkLuW2LupmqkJDtLC0tW0\"",
		"mtime": "2026-08-01T16:52:43.326Z",
		"size": 19937,
		"path": "../public/assets/admin.allocation-BO5VAX3Z.js"
	},
	"/assets/admin.audit-DZUGlT0u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32b0-+XiVQyLXumHUzLA4Gt6XDfm/KPY\"",
		"mtime": "2026-08-01T16:52:43.326Z",
		"size": 12976,
		"path": "../public/assets/admin.audit-DZUGlT0u.js"
	},
	"/assets/admin.cases-Dj8yJn9l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6009-erXh0E3mFjm5MfWauN9u694piS0\"",
		"mtime": "2026-08-01T16:52:43.326Z",
		"size": 24585,
		"path": "../public/assets/admin.cases-Dj8yJn9l.js"
	},
	"/assets/admin.index-BMiwA_8b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57ac-fibrqijQNOTLoIEi/pN2Tj6Oa/g\"",
		"mtime": "2026-08-01T16:52:43.326Z",
		"size": 22444,
		"path": "../public/assets/admin.index-BMiwA_8b.js"
	},
	"/assets/admin.reports-1c3VRjYr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c39-33g2i02phnjZCCzXv8V7p5CO9LE\"",
		"mtime": "2026-08-01T16:52:43.326Z",
		"size": 15417,
		"path": "../public/assets/admin.reports-1c3VRjYr.js"
	},
	"/assets/admin.settings-fY3YqKRh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-cDIL74NxUOBv3OgaoY1lPka5lMw\"",
		"mtime": "2026-08-01T16:52:43.327Z",
		"size": 155,
		"path": "../public/assets/admin.settings-fY3YqKRh.js"
	},
	"/assets/admin.support-BI9QtNZi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-/RiEhSjwaeWwq5hNZSUbvUVZ6b8\"",
		"mtime": "2026-08-01T16:52:43.327Z",
		"size": 154,
		"path": "../public/assets/admin.support-BI9QtNZi.js"
	},
	"/assets/admin.transaction-limits-CoUQkCVP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a69a-UikO3JbGKIBQb0UX7YeeSevVZqo\"",
		"mtime": "2026-08-01T16:52:43.327Z",
		"size": 42650,
		"path": "../public/assets/admin.transaction-limits-CoUQkCVP.js"
	},
	"/assets/api-MxbIh_kw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4dd-mRi7TVZCASZhojSxRqkylU2pfrw\"",
		"mtime": "2026-08-01T16:52:43.327Z",
		"size": 1245,
		"path": "../public/assets/api-MxbIh_kw.js"
	},
	"/assets/centenary-logo-BLmpXd1I.png": {
		"type": "image/png",
		"etag": "\"20d58-7+tb5UrMxEjyO/1scox0gQWiqxo\"",
		"mtime": "2026-08-01T16:52:43.328Z",
		"size": 134488,
		"path": "../public/assets/centenary-logo-BLmpXd1I.png"
	},
	"/assets/clsx-CjueKrWZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"170-hIN6XMVOMUzluNGmYPaM/SbauwQ\"",
		"mtime": "2026-08-01T16:52:43.327Z",
		"size": 368,
		"path": "../public/assets/clsx-CjueKrWZ.js"
	},
	"/assets/credit.allocation-BpMiy7DR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"250c-uxgngIp9wnY6DlnPXpIbKWU+6OU\"",
		"mtime": "2026-08-01T16:52:43.327Z",
		"size": 9484,
		"path": "../public/assets/credit.allocation-BpMiy7DR.js"
	},
	"/assets/credit.cases-Di1nxkz0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a90e-Kc1s0OF5Sif8Y8fff6KJgCF8bTk\"",
		"mtime": "2026-08-01T16:52:43.327Z",
		"size": 43278,
		"path": "../public/assets/credit.cases-Di1nxkz0.js"
	},
	"/assets/credit.index-C6p_uTXw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ead-3WmGlBPTZfcEvTgoG7TszG/t/ZQ\"",
		"mtime": "2026-08-01T16:52:43.327Z",
		"size": 7853,
		"path": "../public/assets/credit.index-C6p_uTXw.js"
	},
	"/assets/credit.settings-C6uxdueP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9e-BUEYN8p/KvYYPHc3x4tN7Q6L5Uk\"",
		"mtime": "2026-08-01T16:52:43.327Z",
		"size": 158,
		"path": "../public/assets/credit.settings-C6uxdueP.js"
	},
	"/assets/credit.support-tXvi7MPe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d-UjFbEpjZc1LA5CV6h6avFoOJy6o\"",
		"mtime": "2026-08-01T16:52:43.327Z",
		"size": 157,
		"path": "../public/assets/credit.support-tXvi7MPe.js"
	},
	"/assets/officer.cases-DIr-eQCr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"da4-Ffp3zghNgDlKOCEQAyR6wgNhrGA\"",
		"mtime": "2026-08-01T16:52:43.327Z",
		"size": 3492,
		"path": "../public/assets/officer.cases-DIr-eQCr.js"
	},
	"/assets/index-DJ6MIvL9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5751c-4LQkUbD6bQEKOruZP89u88MJ3Dc\"",
		"mtime": "2026-08-01T16:52:43.323Z",
		"size": 357660,
		"path": "../public/assets/index-DJ6MIvL9.js"
	},
	"/assets/officer.index-BMEffvAH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5585-PnmEGA0W5tOCIPXkKDKvSM4Fg8I\"",
		"mtime": "2026-08-01T16:52:43.328Z",
		"size": 21893,
		"path": "../public/assets/officer.index-BMEffvAH.js"
	},
	"/assets/officer.settings-CdyMrJKw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-c5kzSqwa4ywuYcn/6M6jxIEntrE\"",
		"mtime": "2026-08-01T16:52:43.328Z",
		"size": 156,
		"path": "../public/assets/officer.settings-CdyMrJKw.js"
	},
	"/assets/officer.support-D-z4Q4lI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-nlzFP3IQvIIFYxiGtHcBrDcQMs4\"",
		"mtime": "2026-08-01T16:52:43.328Z",
		"size": 155,
		"path": "../public/assets/officer.support-D-z4Q4lI.js"
	},
	"/assets/officer.workspace-CEc5bWPj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1971-RPR0r44Db7d3AxBKR52KITKLlAE\"",
		"mtime": "2026-08-01T16:52:43.328Z",
		"size": 6513,
		"path": "../public/assets/officer.workspace-CEc5bWPj.js"
	},
	"/assets/routes-JQEfum4z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15a8-BJO4d4la/EZxnBdOcIGDW+k1bYU\"",
		"mtime": "2026-08-01T16:52:43.328Z",
		"size": 5544,
		"path": "../public/assets/routes-JQEfum4z.js"
	},
	"/assets/styles-BWTPW16N.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1928d-sUYAPbM79NCd3EgQVRN3kDyyfhw\"",
		"mtime": "2026-08-01T16:52:43.328Z",
		"size": 103053,
		"path": "../public/assets/styles-BWTPW16N.css"
	},
	"/assets/ui-kit-BiAWf_Ri.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181b-WaKpSY3Wy9gx3jB9CtrLX9FSu30\"",
		"mtime": "2026-08-01T16:52:43.328Z",
		"size": 6171,
		"path": "../public/assets/ui-kit-BiAWf_Ri.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_1YwljR = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_1YwljR
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
