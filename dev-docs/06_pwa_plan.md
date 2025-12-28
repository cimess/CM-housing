# Implementation Plan - Progressive Web App (PWA)

## Goal
Make the application installable on mobile devices (Add to Home Screen) and capable of working offline. This transforms the website into a native-like app experience.

## User Review Required
> [!NOTE]
> You will need to provide a 192x192 and 512x512 icon file later for the "perfect" install experience. For now, we will use placeholders or existing assets.

## Proposed Changes

### 1. [NEW DEPENDENCY] `vite-plugin-pwa`
-   Install the package: `npm install -D vite-plugin-pwa`

### 2. [MODIFY] `vite.config.js`
-   Configure the PWA plugin with manifest details.

#### [MODIFY] [vite.config.js](file:///c:/Users/USER/Dev/my-housing-site/housing-clean%20copy/vite.config.js)
```javascript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    // ... other plugins
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'CMHousing',
        short_name: 'CMHousing',
        description: 'Find your dream home in Nigeria',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  // ...
});
```

### 3. [MODIFY] `index.html`
-   Add `apple-touch-icon` and `meta` tags for theme color.

## Verification Plan

### Manual Verification
1.  Run `npm run build` and `npm run preview`.
2.  Open the site in Chrome.
3.  Look for the "Install" icon in the address bar.
4.  Go offline (Network tab -> Offline) and refresh. The site should still load.
