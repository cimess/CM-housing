# Implementation Plan - Image Optimization

## Goal
Improve User Experience (UX) and Performance by handling image loading gracefully. We will replace standard `<img>` tags with a smart `<Image />` component that shows a skeleton loader while the image is fetching and handles errors.

## User Review Required
> [!NOTE]
> We will start by creating the component and replacing usages in `HouseDetailPage`. Later, we can apply it globally.

## Proposed Changes

### 1. [NEW] `src/components/ui/Image.jsx`
Create a reusable component that:
-   Accepts `src`, `alt`, `className`.
-   Maintains internal `loading` state.
-   Renders a `Skeleton` (gray box) when `loading` is true.
-   Renders the `img` tag with `opacity-0` initially, then fades in (`opacity-100`) on `onLoad`.

### 2. [MODIFY] `src/shortlet/HouseDetailPage.jsx`
Replace the direct `img` tag in the Hero Swiper with the new `<Image />` component.

#### [MODIFY] [HouseDetailPage.jsx](file:///c:/Users/USER/Dev/my-housing-site/housing-clean%20copy/src/shortlet/HouseDetailPage.jsx)
```javascript
// Before
<img src={src} alt={...} className="w-full h-full object-cover" />

// After
import Image from "@/components/ui/Image";
// ...
<Image src={src} alt={...} className="w-full h-full object-cover" />
```

## Verification Plan

### Manual Verification
1.  Navigate to a House Detail page.
2.  Observe that a gray skeleton pulse appears before the image loads.
3.  Verify the image fades in smoothly.
