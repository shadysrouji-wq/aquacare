var C='aquacare-v3';
var CORE=['.','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(CORE);}));self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C;}).map(function(k){return caches.delete(k);}));}));self.clients.claim();});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(function(hit){
    var net=fetch(e.request).then(function(r){
      if(r.ok&&new URL(e.request.url).origin===location.origin)
        caches.open(C).then(function(c){c.put(e.request,r.clone());});
      return r.clone();
    }).catch(function(){return hit;});
    return hit||net;
  }));
});