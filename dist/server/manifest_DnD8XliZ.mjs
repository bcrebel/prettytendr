import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import './chunks/astro-designed-error-pages_D-_z4fCv.mjs';
import { g as decodeKey } from './chunks/astro/server_B6BG73ip.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/carronwhite/prettytendr/","adapterName":"@astrojs/node","routes":[{"file":"api/reward-user","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/reward-user","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/reward-user\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"reward-user","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/reward-user.ts","pathname":"/api/reward-user","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"beautyprofile/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/beautyprofile","isIndex":false,"type":"page","pattern":"^\\/beautyprofile\\/?$","segments":[[{"content":"beautyprofile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/beautyprofile.astro","pathname":"/beautyprofile","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"createtrustline/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/createtrustline","isIndex":false,"type":"page","pattern":"^\\/createtrustline\\/?$","segments":[[{"content":"createtrustline","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/createtrustline.astro","pathname":"/createtrustline","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"earn/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/earn","isIndex":false,"type":"page","pattern":"^\\/earn\\/?$","segments":[[{"content":"earn","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/earn.astro","pathname":"/earn","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"exchange/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/exchange","isIndex":false,"type":"page","pattern":"^\\/exchange\\/?$","segments":[[{"content":"exchange","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/exchange.astro","pathname":"/exchange","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/create-trustline","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/create-trustline\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"create-trustline","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/create-trustline.ts","pathname":"/api/create-trustline","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://bcrebel.github.io","base":"/prettytendr/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/carronwhite/prettytendr/src/pages/beautyprofile.astro",{"propagation":"none","containsHead":true}],["/Users/carronwhite/prettytendr/src/pages/createtrustline.astro",{"propagation":"none","containsHead":true}],["/Users/carronwhite/prettytendr/src/pages/earn.astro",{"propagation":"none","containsHead":true}],["/Users/carronwhite/prettytendr/src/pages/exchange.astro",{"propagation":"none","containsHead":true}],["/Users/carronwhite/prettytendr/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/create-trustline@_@ts":"pages/api/create-trustline.astro.mjs","\u0000@astro-page:src/pages/api/reward-user@_@ts":"pages/api/reward-user.astro.mjs","\u0000@astro-page:src/pages/beautyprofile@_@astro":"pages/beautyprofile.astro.mjs","\u0000@astro-page:src/pages/createtrustline@_@astro":"pages/createtrustline.astro.mjs","\u0000@astro-page:src/pages/earn@_@astro":"pages/earn.astro.mjs","\u0000@astro-page:src/pages/exchange@_@astro":"pages/exchange.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","/Users/carronwhite/prettytendr/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_DnD8XliZ.mjs","/Users/carronwhite/prettytendr/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","/Users/carronwhite/prettytendr/src/components/trustlineForm":"_astro/trustlineForm.BQ-0tUy-.js","/Users/carronwhite/prettytendr/src/components/Message.tsx":"_astro/Message.CemN0yDi.js","/Users/carronwhite/prettytendr/src/components/NavReact":"_astro/NavReact.DipaAQBC.js","@astrojs/react/client.js":"_astro/client.DATEE3tL.js","/Users/carronwhite/prettytendr/src/components/BeautyProfileForm":"_astro/BeautyProfileForm.Iewvtbd9.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/prettytendr/_astro/plus-jakarta-sans-vietnamese-wght-normal.Bnh6xcKr.woff2","/prettytendr/_astro/plus-jakarta-sans-latin-ext-wght-normal.Ch-K9LVU.woff2","/prettytendr/_astro/plus-jakarta-sans-latin-wght-normal.BD2oGHtS.woff2","/prettytendr/_astro/beautyprofile._V3CYLwG.css","/prettytendr/favicon.svg","/prettytendr/_astro/BeautyProfileForm.Iewvtbd9.js","/prettytendr/_astro/Button.BqX2lUCe.js","/prettytendr/_astro/Message.CemN0yDi.js","/prettytendr/_astro/NavReact.DipaAQBC.js","/prettytendr/_astro/beautyprofile.9xnOVDnU.css","/prettytendr/_astro/beautyprofile.WTprs9aw.css","/prettytendr/_astro/client.DATEE3tL.js","/prettytendr/_astro/index.CZXdLr1K.js","/prettytendr/_astro/index.RYns6xqu.js","/prettytendr/_astro/jsx-runtime.PRPpl5vZ.js","/prettytendr/_astro/message.4NwmM3Ni.js","/prettytendr/_astro/trustlineForm.BQ-0tUy-.js","/prettytendr/_astro/wallet.B0tYp2HL.js","/prettytendr/images/PT_Pink.png","/prettytendr/images/logo.svg","/prettytendr/images/scalloped.svg","/prettytendr/images/skincare.png","/prettytendr/images/will_do_for_now.png","/prettytendr/_astro/astro/assets-service.HyYwcr1R.js","/prettytendr/api/reward-user","/prettytendr/beautyprofile/index.html","/prettytendr/createtrustline/index.html","/prettytendr/earn/index.html","/prettytendr/exchange/index.html","/prettytendr/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"/aWEVatlcRG3AxX2oV8G3860Y+cCRLJY3zbekOC3DHA=","experimentalEnvGetSecretEnabled":false});

export { manifest };
