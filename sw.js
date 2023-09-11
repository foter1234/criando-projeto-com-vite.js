import {warmStrategyCache, offlineFallback} from "workbox-recipes";
import {CacheFirst, StaleWhileRevalidate} from "workbox-strategies";
import {registerRoute, Route} from "workbox-routing";
import {CacheableResponsePlugin} from "workbox-cacheable-response";
import {ExpirationPlugin} from "workbox-expiration";

//configurando o cache
const pageCache = new CacheFirst({
    cacheName:'primeira-pwa-cache',
    plugins:[
        new CacheableResponsePlugin({//registra o status
            statuses:[0,200],
        
        }),
        new ExpirationPlugin({//segundos para expirar o cache
            maxAgeSeconds:30*24*60*60,
        }),
    ],
//indicando cache de página
})
warmStrategyCache({
    urls:['/index.html', '/'],
    strategy:pageCache,
  });

  //registrando a rota
  registerRoute(({request})=> request.mode === 'navigate', pageCache)


  //configurando cache de assets
  registerRoute(
   ({request})=> ['style', 'script', 'worker'].includes(request.destination),
   new StaleWhileRevalidate({
    cacheName:'asset-cache',
    plugins:[
        new CacheableResponsePlugin({
            statuses:[0, 200],
        }),
    ],
   }),
  );

  //configurando offline fallback

  offlineFallback({
    pageFallback:'/offline.html',
  });

