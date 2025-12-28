Implementation Plan - Toaster & Notifications
Goal Description
Enhance user experience by replacing browser alerts with modern toast notifications and fixing the non-functional notification bell in the Admin Dashboard. Additionally, improve overall visual aesthetics to match "Awwwards" standards.

User Review Required
Toaster Library: I plan to use react-hot-toast for its simplicity and clean design.
Design Direction: Will use a "premium" aesthetic with cleaner typography and subtle animations.
Proposed Changes
Toaster Integration
[NEW] Dependency
react-hot-toast
[MODIFY]
src/App.jsx
Add <Toaster /> component to the root.
[MODIFY] Various Files
Replace alert("message") with toast.success("message") or toast.error("message").
Targets:
src/components/AdminDashboard/HousingForm.jsx
src/context/AuthContext.jsx
src/components/HomeBody.jsx
Admin Notification Bell
[MODIFY] src/components/AdminDashboard/AdminDashboard.jsx (or relevant topbar component)
Inspect the Bell icon implementation.
Add state for notifications (mock or fetch from backend if available).
Create a dropdown/popover to show notifications when clicked.
Verification Plan
Automated Tests
None planned for this visual change.
Manual Verification
Toaster: Trigger actions that previously showed alerts (e.g., login, form submission) and verify the toast appears.
Notifications: Click the bell icon in Admin Dashboard and verify the dropdown appears with items.
