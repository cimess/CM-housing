# Implementation Plan - Vite Compression

## Goal
Reduce the size of production assets (JavaScript, CSS) by compressing them with Gzip. This significantly reduces the amount of data users need to download, speeding up the initial load.

## User Review Required
> [!NOTE]
> This only affects the `npm run build` output. You won't see changes in `npm run dev`.

## Proposed Changes

### 1. [NEW DEPENDENCY] `vite-plugin-compression`
-   Install the package: `npm install -D vite-plugin-compression`

### 2. [MODIFY] `vite.config.js`
-   Import and add the plugin to the `plugins` array.

#### [MODIFY] [vite.config.js](file:///c:/Users/USER/Dev/my-housing-site/housing-clean%20copy/vite.config.js)
```javascript
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteCompression() // Add this
  ],
  // ...
});
```

## Verification Plan

### Automated Tests
-   Run `npm run build`.
-   Check the `dist/assets` folder.
-   Verify that for every `.js` and `.css` file, there is a corresponding `.gz` file (e.g., `index-xxxxx.js.gz`).
