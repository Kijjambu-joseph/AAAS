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
		"mtime": "2026-08-02T08:14:42.680Z",
		"size": 23861,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-02T08:14:42.680Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/AppShell-BPxdPT4M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35fd-pPrIzhKTxOlhtpFND224GYji8Ww\"",
		"mtime": "2026-08-02T08:14:41.613Z",
		"size": 13821,
		"path": "../public/assets/AppShell-BPxdPT4M.js"
	},
	"/assets/SettingsPage-D8-rd6yM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"81c-dEXrkKWoTkdOsny71iUPZ1NcW2I\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 2076,
		"path": "../public/assets/SettingsPage-D8-rd6yM.js"
	},
	"/assets/SupportPage-C0DVE0d4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192b-pkFoT0riFZz5Djx8HgJ9PieN/TY\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 6443,
		"path": "../public/assets/SupportPage-C0DVE0d4.js"
	},
	"/assets/admin.allocation-DVZXRWEO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9dd-5MFTBbGZ+TZ9uZ0eUztcBDEPxws\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 2525,
		"path": "../public/assets/admin.allocation-DVZXRWEO.js"
	},
	"/assets/admin.auctioneers-Bbh2Hcct.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80b9-3b0/kztKrJEopzMtxZGZzN83ljM\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 32953,
		"path": "../public/assets/admin.auctioneers-Bbh2Hcct.js"
	},
	"/assets/admin.audit-ChtiqCQk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"838-kh9ZASB/i766uj0HIIRqqdHyWAs\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 2104,
		"path": "../public/assets/admin.audit-ChtiqCQk.js"
	},
	"/assets/admin.cases-DEqXKYpT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6009-LcYm6Ub2mEn/eRCprjYtxz8HciI\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 24585,
		"path": "../public/assets/admin.cases-DEqXKYpT.js"
	},
	"/assets/admin.index-Bi5FJiH1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d62-zN49gIy/k1gaxJpHxYTkziIhF6k\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 3426,
		"path": "../public/assets/admin.index-Bi5FJiH1.js"
	},
	"/assets/admin.reports--2vLx9Pw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ab5-00z+0+1Y9Zr2eoRoTq2La9ufBYI\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 2741,
		"path": "../public/assets/admin.reports--2vLx9Pw.js"
	},
	"/assets/admin.settings-FJnGiQhN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-ffGv1It0PBY7aIDAnmdMj+HXLzQ\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 155,
		"path": "../public/assets/admin.settings-FJnGiQhN.js"
	},
	"/assets/Charts-ZgPeWm7x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"666b4-6mcEBNv/H5ZryjZnNQPhGxsUby4\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 419508,
		"path": "../public/assets/Charts-ZgPeWm7x.js"
	},
	"/assets/admin.support-DKfo8i1K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-5015H0w0QYAkTlNLYnK0f7NsuQA\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 154,
		"path": "../public/assets/admin.support-DKfo8i1K.js"
	},
	"/assets/api-MxbIh_kw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4dd-mRi7TVZCASZhojSxRqkylU2pfrw\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 1245,
		"path": "../public/assets/api-MxbIh_kw.js"
	},
	"/assets/admin.transaction-limits-Crf8L3Q7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8b4-oRvxMb/E06QO1Nwb/UuwlmNmXNA\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 43188,
		"path": "../public/assets/admin.transaction-limits-Crf8L3Q7.js"
	},
	"/assets/clsx-CjueKrWZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"170-hIN6XMVOMUzluNGmYPaM/SbauwQ\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 368,
		"path": "../public/assets/clsx-CjueKrWZ.js"
	},
	"/assets/credit.allocation-XKIbEt65.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e4d-VKNbxWWokpo7/BQP+oQ/e8t+XMk\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 15949,
		"path": "../public/assets/credit.allocation-XKIbEt65.js"
	},
	"/assets/centenary-logo-BLmpXd1I.png": {
		"type": "image/png",
		"etag": "\"20d58-7+tb5UrMxEjyO/1scox0gQWiqxo\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 134488,
		"path": "../public/assets/centenary-logo-BLmpXd1I.png"
	},
	"/assets/credit.index-ChYACN-8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ead-vR501ppNnZb3YuWyRCnAgXEOfZg\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 7853,
		"path": "../public/assets/credit.index-ChYACN-8.js"
	},
	"/assets/credit.cases-ms-F0WlC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a90e-qaQd3sePpPDKsmWmeknKKOQHsIk\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 43278,
		"path": "../public/assets/credit.cases-ms-F0WlC.js"
	},
	"/assets/credit.settings-Dxx0v6KI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9e-CMJlqOamdZG28nrPxYjs1UtGYWI\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 158,
		"path": "../public/assets/credit.settings-Dxx0v6KI.js"
	},
	"/assets/credit.support-DDFoArn3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d-s9AsNZZPBx1W2B4tSaB6Vyy6Jt8\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 157,
		"path": "../public/assets/credit.support-DDFoArn3.js"
	},
	"/assets/officer.cases-D9rwY2de.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"da4-16/HtkJaaLGnAf63NzkdeaCiX4w\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 3492,
		"path": "../public/assets/officer.cases-D9rwY2de.js"
	},
	"/assets/index-Ck35WO-3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"56e42-/eIoLSjAai9meC9xUu1iXmZQa6s\"",
		"mtime": "2026-08-02T08:14:41.612Z",
		"size": 355906,
		"path": "../public/assets/index-Ck35WO-3.js"
	},
	"/assets/officer.index-BeoM8g1T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5585-yYHwWDFJ1cIKni13JCMXVOwJdLI\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 21893,
		"path": "../public/assets/officer.index-BeoM8g1T.js"
	},
	"/assets/officer.settings-B_E3ipow.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-khiV93GHTfSzp7rbq6sW5zcyXEc\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 156,
		"path": "../public/assets/officer.settings-B_E3ipow.js"
	},
	"/assets/officer.workspace-CKADbaQJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1971-h1Z6eGckiG11Uqkl6baIcNFHXwE\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 6513,
		"path": "../public/assets/officer.workspace-CKADbaQJ.js"
	},
	"/assets/officer.support-CZgzUhFy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-MaARZjavdvpy/cf2IP0L7yeEom0\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 155,
		"path": "../public/assets/officer.support-CZgzUhFy.js"
	},
	"/assets/routes-XbnT3gbF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15a8-eeEjPXJgs78U23Wi1/JFiwi/20g\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 5544,
		"path": "../public/assets/routes-XbnT3gbF.js"
	},
	"/assets/styles-BNsV1l-b.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1816c-cxgVpyQkIsOomJeM1ihDw73lviQ\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 98668,
		"path": "../public/assets/styles-BNsV1l-b.css"
	},
	"/assets/ui-kit-BfeC6rQU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181b-B0t6UExe622L83e6rIA+aq59eO0\"",
		"mtime": "2026-08-02T08:14:41.614Z",
		"size": 6171,
		"path": "../public/assets/ui-kit-BfeC6rQU.js"
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
