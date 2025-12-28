# Implementation Plan - SEO (React Helmet)

## Goal
Improve Search Engine Optimization (SEO) and social media sharing by adding dynamic `<title>` and `<meta>` tags to every page. We will use `react-helmet-async` to manage these tags.

## User Review Required
> [!NOTE]
> This will allow you to see correct titles in the browser tab and nice preview cards when sharing links on WhatsApp/Twitter.

## Proposed Changes

### 1. [NEW DEPENDENCY] `react-helmet-async`
-   Install the package: `npm install react-helmet-async`

### 2. [MODIFY] `src/main.jsx`
-   Wrap the entire application in `<HelmetProvider>`.

#### [MODIFY] [main.jsx](file:///c:/Users/USER/Dev/my-housing-site/housing-clean%20copy/src/main.jsx)
```javascript
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </HelmetProvider>
)
```

### 3. [MODIFY] `src/shortlet/HouseDetailPage.jsx`
-   Import `Helmet`.
-   Add dynamic tags based on the house data.

#### [MODIFY] [HouseDetailPage.jsx](file:///c:/Users/USER/Dev/my-housing-site/housing-clean%20copy/src/shortlet/HouseDetailPage.jsx)
```javascript
import { Helmet } from 'react-helmet-async';

// Inside component...
<Helmet>
  <title>{house.houseType} in {house.location.state} | CMHousing</title>
  <meta name="description" content={house.description.substring(0, 150) + "..."} />
  <meta property="og:title" content={`${house.houseType} - ₦${displayPrice}`} />
  <meta property="og:image" content={house.images[0]} />
</Helmet>
```

## Verification Plan

### Manual Verification
1.  Navigate to a House Detail page.
2.  Observe the browser tab title changes to match the house name.
3.  Inspect Element -> `<head>` and verify that `<meta name="description">` and `og:image` tags are present and correct.
