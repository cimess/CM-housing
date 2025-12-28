# Implementation Plan - Admin Dashboard (Refine)

## Goal
Create an internal Admin Dashboard to manage users and house listings. We will use **Refine**, a React-based framework for internal tools, integrated directly into the existing application under the `/admin` route.

## User Review Required
> [!NOTE]
> We will be installing several `@refinedev` packages.
> The dashboard will be accessible at `/admincimess`.
> We will need to secure this route later (ensure only users with `role: "admin"` can access it), but for now, we'll focus on the UI and data connection.

## Proposed Changes

### 1. [NEW DEPENDENCIES]
-   `@refinedev/core`: The core logic.
-   `@refinedev/react-router-v6`: For routing integration.
-   `@refinedev/simple-rest`: Data provider to connect to your Express backend.
-   `@refinedev/inferencer` (Optional): For quick prototyping of views.

### 2. [NEW DIRECTORY] `src/admin`
-   We will keep all admin-related components here to keep the project organized.

### 3. [NEW FILES]
-   `src/admin/App.jsx`: The entry point for the Admin sub-app.
-   `src/admin/pages/houses/list.jsx`: List all houses.
-   `src/admin/pages/houses/edit.jsx`: Edit a house.
-   `src/admin/pages/users/list.jsx`: List all users.

### 4. [MODIFY] `src/Full-App-Structure/Router.jsx`
-   Add a new route `/admin/*` that renders the Refine app.

### 5. [MODIFY] `vite.config.js`
-   Ensure no conflicts (usually none needed).

## Detailed Steps

### Step 1: Install Dependencies
```bash
npm install @refinedev/core @refinedev/react-router-v6 @refinedev/simple-rest
```

### Step 2: Create Data Provider Wrapper
Refine needs a "Data Provider" to talk to your API. We will use `simple-rest` but might need to tweak it to include your **Authentication Token** in headers.

#### [NEW] `src/admin/dataProvider.js`
Custom wrapper around `simple-rest` to inject `Authorization: Bearer ...`.

### Step 3: Setup Admin Router
#### [NEW] `src/admin/AdminRouter.jsx`
Configures the `<Refine />` component with resources:
-   `houses`: list, show, edit, delete
-   `users`: list, show, delete

### Step 4: Integrate into Main Router
#### [MODIFY] `src/Full-App-Structure/Router.jsx`
```javascript
<Route path="/admincimess/*" element={<AdminRouter />} />
```

## Verification Plan
1.  Navigate to `/admincimess`.
2.  Verify the Refine UI loads.
3.  Check if it fetches data from your backend (`/api/houses`).
