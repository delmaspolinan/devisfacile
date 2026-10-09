const V="df-v1",F=["./","index.html","jspdf.umd.min.js","manifest.json","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
e.respondWith(caches.open(V).then(async c=>{const r=await c.match(e.request);
const n=fetch(e.request).then(x=>{if(x.ok)c.put(e.request,x.clone());return x}).catch(()=>r);return r||n}))});
