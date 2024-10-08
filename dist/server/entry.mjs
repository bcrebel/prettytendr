import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BVcfONSJ.mjs';
import { manifest } from './manifest_DnD8XliZ.mjs';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/create-trustline.astro.mjs');
const _page2 = () => import('./pages/api/reward-user.astro.mjs');
const _page3 = () => import('./pages/beautyprofile.astro.mjs');
const _page4 = () => import('./pages/createtrustline.astro.mjs');
const _page5 = () => import('./pages/earn.astro.mjs');
const _page6 = () => import('./pages/exchange.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/api/create-trustline.ts", _page1],
    ["src/pages/api/reward-user.ts", _page2],
    ["src/pages/beautyprofile.astro", _page3],
    ["src/pages/createtrustline.astro", _page4],
    ["src/pages/earn.astro", _page5],
    ["src/pages/exchange.astro", _page6],
    ["src/pages/index.astro", _page7]
]);
const serverIslandMap = new Map();

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "mode": "standalone",
    "client": "file:///Users/carronwhite/prettytendr/dist/client/",
    "server": "file:///Users/carronwhite/prettytendr/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
