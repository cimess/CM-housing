# Admin Dashboard UI Polish Plan

## Goal
Transform the basic Admin Dashboard into a premium, "Awwwards-style" interface.
**Key Aesthetics:** Minimalist, clean typography, subtle shadows, rounded corners, and smooth transitions.

## Proposed Changes

### 1. [NEW] `src/admin/components/AdminLayout.jsx`
-   **Sidebar**: Fixed left navigation with icons (Lucide React).
    -   Glassmorphism effect or solid dark/light theme (matching main site).
    -   Links: Dashboard, Houses, Users, Back to App.
-   **Top Bar**: Breadcrumbs, User Profile, Theme Toggle.
-   **Content Area**: Padding and background color (light gray/off-white).

### 2. [NEW] `src/admin/pages/dashboard/index.jsx`
-   **Stats Cards**: Total Houses, Total Users, Active Listings.
-   **Recent Activity**: Small list of recently added houses.

### 3. [MODIFY] `src/admin/pages/houses/list.jsx`
-   **Table Design**:
    -   Custom Tailwind table.
    -   Columns: Image (thumbnail), Title, Location, Price, Type, Actions (Edit/Delete).
    -   Status Badges: "Short Let" vs "Long Let" with distinct colors.
    -   Hover effects on rows.

### 4. [MODIFY] `src/admin/pages/users/list.jsx`
-   **Table Design**:
    -   Columns: Name, Email, Role, Joined Date.
    -   Avatar placeholders.

## Design System (Tailwind)
-   **Colors**: Use `doc-blue` and `doc-dark` from the main site config.
-   **Fonts**: Ensure `Poppins` or `Montserrat` is used.
-   **Shadows**: `shadow-lg` for cards.

## Implementation Steps
1.  Create `AdminLayout` and update `AdminRouter` to use it.
2.  Create `Dashboard` overview page.
3.  Style `HouseList` with a premium table component.
4.  Style `UserList`.
