import '../css/style.css'
import javascriptLogo from '../javascript.svg'
import viteLogo from '../public/vite.svg'
import { setupCounter } from '../counter.js'


if ('serviceWorker' in navigator) {
  window.addEventListener('load', async ()=>{
    try {
      let reg;
      reg = await navigator.serviceWorker.register('/sw.js',{type:"module"});
      console.log('Service Worker registrada', reg);
    } catch (err) {
      console.log("service worker registro falhou:", err)
      
    }
  })
  
}


