import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name:"Synapse",
        short_name: "Synapse",
        description:"Personal Operating System",
        theme_color:"#020617",
        background_color:"#020617",
        display:"standalone",
        start_url:"/",
        icons:[
          {
            src:"/synapse-logo-192.png",
            sizes:"192x192",
            type:"image/png"
          },
          {
            src:"/synapse-logo-512.png",
            sizes:"512x512",
            type:"image/png"
          }
        ]
      }
    })
  ]
})
