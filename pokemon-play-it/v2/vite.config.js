import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Pokémon Play It! Mobile',
        short_name: 'PPI Mobile',
        theme_color: '#3b4cca',
        background_color: '#1a1a2e',
        display: 'fullscreen',
        orientation: 'portrait-primary',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
  build: { target: 'es2020', minify: 'esbuild' }
});
