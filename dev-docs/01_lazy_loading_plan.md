# Implementation Plan - Code Splitting (Lazy Loading)

## Goal
Improve initial load time by splitting the application bundle into smaller chunks. We will use `React.lazy` and `Suspense` to load route components only when they are needed.

## User Review Required
> [!IMPORTANT]
> This change will cause a slight delay when navigating to a new page for the first time, as the browser fetches the new chunk. We will show a loading spinner during this delay.

## Proposed Changes

### [Frontend] `src/Full-App-Structure/Router.jsx`
-   Wrap `Routes` in `React.Suspense` with a fallback loading component.
-   Replace static imports with `React.lazy()` imports for all page components.

#### [MODIFY] [Router.jsx](file:///c:/Users/USER/Dev/my-housing-site/housing-clean%20copy/src/Full-App-Structure/Router.jsx)
```javascript
// Before
import HouseDetailPage from "@/shortlet/HouseDetailPage";

// After
const HouseDetailPage = lazy(() => import("@/shortlet/HouseDetailPage"));
```

## Verification Plan

### Automated Tests
-   Run `npm run build` to verify that the build output now contains multiple `.js` chunks (e.g., `assets/HouseDetailPage-xxxx.js`) instead of one large `index.js`.

### Manual Verification
1.  Open the app in the browser.
2.  Open Network Tab in DevTools.
3.  Navigate to a page (e.g., `/Login`).
4.  Verify that a new JS file is requested when the navigation happens.
