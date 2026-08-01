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
		"mtime": "2026-08-01T13:54:21.742Z",
		"size": 23861,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-01T13:54:21.742Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/AppShell-ZZZdAIUV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35f6-S9gvaWOHBYVHKjqTFxnlD7InEjs\"",
		"mtime": "2026-08-01T13:54:21.137Z",
		"size": 13814,
		"path": "../public/assets/AppShell-ZZZdAIUV.js"
	},
	"/assets/SettingsPage-RI6BrYhM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"81c-yV2lXv34dwjYkHOPcOonqGjrhzc\"",
		"mtime": "2026-08-01T13:54:21.137Z",
		"size": 2076,
		"path": "../public/assets/SettingsPage-RI6BrYhM.js"
	},
	"/assets/SupportPage-wCoI61GI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192b-B8XCV+tqBOdbfcrtQ/uStpWhTVU\"",
		"mtime": "2026-08-01T13:54:21.137Z",
		"size": 6443,
		"path": "../public/assets/SupportPage-wCoI61GI.js"
	},
	"/assets/admin.reports-73TfY5bO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c39-QpqImRgLLjQFxwaonKw8RkXvlJI\"",
		"mtime": "2026-08-01T13:54:21.137Z",
		"size": 15417,
		"path": "../public/assets/admin.reports-73TfY5bO.js"
	},
	"/assets/admin.settings-bpHXMgHz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-qbr2UQEBHojk8WMngNXbWIWwqUg\"",
		"mtime": "2026-08-01T13:54:21.137Z",
		"size": 155,
		"path": "../public/assets/admin.settings-bpHXMgHz.js"
	},
	"/assets/admin.support-BIRJcuRh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-Dflg9NYH4MwGQs7e0jFgJTJIdSU\"",
		"mtime": "2026-08-01T13:54:21.137Z",
		"size": 154,
		"path": "../public/assets/admin.support-BIRJcuRh.js"
	},
	"/assets/admin.transaction-limits-BLrpqiZj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7dd-j/kxJWDRyxsKmZRtfD4p00g1G+Q\"",
		"mtime": "2026-08-01T13:54:21.137Z",
		"size": 42973,
		"path": "../public/assets/admin.transaction-limits-BLrpqiZj.js"
	},
	"/assets/credit.cases-BlF_O4wS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ade7-L0JfeKYiZ0PrFsZkaGHzHhmqMek\"",
		"mtime": "2026-08-01T13:54:21.137Z",
		"size": 44519,
		"path": "../public/assets/credit.cases-BlF_O4wS.js"
	},
	"/assets/credit.settings-CZyuZWqK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9e-MSmsfo/noUBQDuz9+fndKnFddYw\"",
		"mtime": "2026-08-01T13:54:21.137Z",
		"size": 158,
		"path": "../public/assets/credit.settings-CZyuZWqK.js"
	},
	"/assets/centenary-logo-BLmpXd1I.png": {
		"type": "image/png",
		"etag": "\"20d58-7+tb5UrMxEjyO/1scox0gQWiqxo\"",
		"mtime": "2026-08-01T13:54:21.137Z",
		"size": 134488,
		"path": "../public/assets/centenary-logo-BLmpXd1I.png"
	},
	"/assets/credit.support-BiZBiiQQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d-cCTPxd0/lk7UE6Grfkg2Xzps614\"",
		"mtime": "2026-08-01T13:54:21.137Z",
		"size": 157,
		"path": "../public/assets/credit.support-BiZBiiQQ.js"
	},
	"/assets/officer.settings-BLkfmc2d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-Pox7jwRJBSfB5fQ2s6mdO3j7PKc\"",
		"mtime": "2026-08-01T13:54:21.137Z",
		"size": 156,
		"path": "../public/assets/officer.settings-BLkfmc2d.js"
	},
	"/assets/officer.support-CZxFjwEI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-4DNTYnLrnq7mBTUTn0D89gSUfmQ\"",
		"mtime": "2026-08-01T13:54:21.137Z",
		"size": 155,
		"path": "../public/assets/officer.support-CZxFjwEI.js"
	},
	"/assets/routes-DPcWiOn3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15a3-3+uGPac0d0Igp1gu5DBnRMMnFOs\"",
		"mtime": "2026-08-01T13:54:21.137Z",
		"size": 5539,
		"path": "../public/assets/routes-DPcWiOn3.js"
	},
	"/assets/ui-kit-B2FYkR3B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10db-V5ERqOox4fPJKivsefxt6lgX8Oo\"",
		"mtime": "2026-08-01T13:54:21.137Z",
		"size": 4315,
		"path": "../public/assets/ui-kit-B2FYkR3B.js"
	},
	"/assets/styles-B7J6lYwp.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"16498-vjYoMOmyvJTpmdvCLz1jFNjC1y8\"",
		"mtime": "2026-08-01T13:54:21.137Z",
		"size": 91288,
		"path": "../public/assets/styles-B7J6lYwp.css"
	},
	"/assets/index-pjCEO_YO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55d2c-3H8q/wuflgQQKrtVBSk5AVYeaOo\"",
		"mtime": "2026-08-01T13:54:21.136Z",
		"size": 351532,
		"path": "../public/assets/index-pjCEO_YO.js"
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
