import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // In dev, forward /api/geocode?q=... directly to Photon (free, no API key)
      '/api/geocode': {
        target: 'https://photon.komoot.io',
        changeOrigin: true,
        rewrite: path => {
          const url = new URL(path, 'http://localhost')
          const q = url.searchParams.get('q') || ''
          return `/api/?q=${encodeURIComponent(q)}&limit=1&lang=en`
        },
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes, req, res) => {
            // Transform Photon GeoJSON response into the {lat, lon} shape the app expects
            let body = ''
            proxyRes.on('data', chunk => { body += chunk })
            proxyRes.on('end', () => {
              try {
                const data = JSON.parse(body)
                const feat = data?.features?.[0]
                const [lon, lat] = feat ? feat.geometry.coordinates : [null, null]
                const out = JSON.stringify(feat ? { lat, lon, source: 'photon' } : { lat: null, lon: null })
                res.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(out) })
                res.end(out)
              } catch {
                res.writeHead(500)
                res.end('{}')
              }
            })
          })
        },
      },
    },
  },
})
