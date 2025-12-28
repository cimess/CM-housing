# Implementation Plan - House Availability Status

## Goal
Add an "Availability" status to houses (Open/Available vs Closed/Taken) to both the backend schema and frontend display.

## User Review Required
> [!NOTE]
> We will add a boolean field `isAvailable` to the House model.
> Default value will be `true` (Available).

## Proposed Changes

### 1. [MODIFY] `mern-auth-backend/models/House.js`
-   Add `isAvailable: { type: Boolean, default: true }` to the schema.

### 2. [MODIFY] `mern-auth-backend/controllers/HouseController.js`
-   Update `createHouse` to accept `isAvailable` (optional).
-   Update `getHouses` to potentially filter by availability (optional, but good for future).
-   Ensure `isAvailable` is returned in responses.

### 3. [MODIFY] `src/shortlet/HouseDetailPage.jsx`
-   Display a badge indicating status:
    -   **Available**: Green badge "Available" / "Open"
    -   **Unavailable**: Red badge "Taken" / "Closed"
-   Disable "Book Now" or contact buttons if unavailable (optional but recommended).

### 4. [MODIFY] `src/admin/pages/houses/list.jsx`
-   Add an "Availability" column to the table.
-   Allow toggling this status directly from the admin dashboard (using a switch or button).

### 5. [MODIFY] `src/body component/homeBody.jsx`
-   Display a small status indicator on the house cards.

## Verification Plan
1.  **Backend**:
    -   Restart backend.
    -   Check if new houses have `isAvailable: true`.
2.  **Frontend**:
    -   Check `HouseDetailPage` for the badge.
    -   Check Admin Dashboard to see if the column appears.
