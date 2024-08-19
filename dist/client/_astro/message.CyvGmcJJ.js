import{r as c}from"./index.RYns6xqu.js";var p={exports:{}},a={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var y=c,m=Symbol.for("react.element"),d=Symbol.for("react.fragment"),v=Object.prototype.hasOwnProperty,x=y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,E={key:!0,ref:!0,__self:!0,__source:!0};function _(n,t,r){var e,l={},s=null,o=null;r!==void 0&&(s=""+r),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(o=t.ref);for(e in t)v.call(t,e)&&!E.hasOwnProperty(e)&&(l[e]=t[e]);if(n&&n.defaultProps)for(e in t=n.defaultProps,t)l[e]===void 0&&(l[e]=t[e]);return{$$typeof:m,type:n,key:s,ref:o,props:l,_owner:x.current}}a.Fragment=d;a.jsx=_;a.jsxs=_;p.exports=a;var R=p.exports;let i=[],u=0;const f=4;let S=n=>{let t=[],r={get(){return r.lc||r.listen(()=>{})(),r.value},lc:0,listen(e){return r.lc=t.push(e),()=>{for(let s=u+f;s<i.length;)i[s]===e?i.splice(s,f):s+=f;let l=t.indexOf(e);~l&&(t.splice(l,1),--r.lc||r.off())}},notify(e,l){let s=!i.length;for(let o of t)i.push(o,r.value,e,l);if(s){for(u=0;u<i.length;u+=f)i[u](i[u+1],i[u+2],i[u+3]);i.length=0}},off(){},set(e){let l=r.value;l!==e&&(r.value=e,r.notify(l))},subscribe(e){let l=r.listen(e);return e(r.value),l},value:n};return r};function b(n,t,r){let e=new Set([...t,void 0]);return n.listen((l,s,o)=>{e.has(o)&&r(l,s,o)})}function O(n,t={}){let r=c.useCallback(l=>t.keys?b(n,t.keys,l):n.listen(l),[t.keys,n]),e=n.get.bind(n);return c.useSyncExternalStore(r,e,e)}const h=S("");export{S as a,R as j,h as m,O as u};
