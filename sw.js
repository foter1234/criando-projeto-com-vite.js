import {warmStrategyCache} from "workbox-recipes";
import {CacheFirst, StaleWhileRevalidate} from "workbox-strategies";
import {registerRouter} from "workbox-routing";
import {CacheableResponsivePlugin} from "workbox-cacheble-response";
import {ExpirationPlugin} from "workbox-recipes";

//configurando o cache
const pageCache = new CacheFirst({
    cacheName:'primeira-pwa-cache',
    plugins:[
        new CacheableResponsivePlugin({
            statuses:[0,200],
        
        }),
        new ExpirationPlugin({
            maxAgeSeconds:30*24*60*60,
        }),
    ],
})
