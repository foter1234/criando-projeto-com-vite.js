import {warmStrategyCache} from "workbox-recipes";
import {CacheFirst, StaleWhileRevalidate} from "workbox-strategies";
import {registerRouter} from "workbox-routing";
import {CacheableResponsivePlugin} from "workbox-cacheble-response";
import {ExpirationPlugin} from "workbox-recipes";

//configurando o cache
const pageCache = new CacheFirst({
    cacheName:'primeira-pwa-cache',
    plugins:[
        new CacheableResponsivePlugin({//registra o status
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
  registerRouter(({request})=> request.mode === 'navigate', pageCache)


  //configurando cache de assets

  registerRoute(
   ({request})=> ['style', 'script', 'worker'].includes(request.destination),
   new StaleWhileRevalidate({
    cacheName:'asset-cache',
    plugins:[
        new CacheableResponsivePlugin({
            statuses:[0, 200],
        }),
    ],
   }),
  );
  
