let cacheName="jogo da velha"
let filesToCache =["/","index.html","css/index.css","js/index.js"]

//inicializando a service worker e fazendo o download do conteudo da aplicação

self.addEventListener("install",(e)=>{
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            return cache.addAll(filesToCache)
        })
    )
})

//disponibizando o conteudo quando estiver offline

self.addEventListener("fetch",(e)=>{
    e.respondWith(
        caches.match(e.request).then((response)=>{
     return response || fetch(e.request);
        })
    )
})