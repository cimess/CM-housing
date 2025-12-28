# Project Progress Tracker

This document tracks the progress of optimizing and enhancing the application based on the "Roadmap to Perfection".

## 📂 Documentation
- [x] Create `dev-docs` folder
- [x] Move review artifacts to `dev-docs`

## ⚡ Performance (Speed)
- [x] **Code Splitting (Lazy Loading)**
    -   [x] Create implementation plan
    -   [x] Implement `React.lazy` in `Router.jsx`
    -   [x] Verify bundle size reduction
- [x] **Image Optimization**
    -   [x] Create reusable `<Image />` component with skeleton
    -   [x] Implement WebP support
- [x] **Vite Compression**
    -   [x] Create implementation plan
    -   [x] Add `vite-plugin-compression`

## 📱 User Experience (UX)
- [x] **SEO (React Helmet)**
    -   [x] Create implementation plan
    -   [x] Install `react-helmet-async`
    -   [x] Add meta tags to `HouseDetailPage`
    -   [x] Add meta tags to `homeBody`
- [x] **Dynamic Sitemap**
    -   [x] Create implementation plan
    -   [x] Add `/sitemap.xml` route to Backend
- [x] **PWA (Progressive Web App)**
    -   [x] Create implementation plan
    -   [x] Install `vite-plugin-pwa`
    -   [x] Configure manifest and icons
- [x] **Accessibility (a11y)**
    -   [x] Fix missing `aria-labels` on buttons

## 🛠️ New Features
- [x] **Analytics (PostHog)**
    -   [x] Create implementation plan
    -   [x] Install and initialize PostHog
- [/] **Admin Dashboard (Refine)**
    -   [x] Create implementation plan
    -   [x] Initialize Refine project
    -   [x] Connect to backend API
    -   [ ] **UI Polish (Awwwards Style)** <!-- id: 16 -->
        -   [ ] Create Layout (Sidebar/TopBar)
        -   [ ] Design Dashboard Overview
        -   [ ] Style House List (Tables, Badges)
        -   [ ] Style User List
    -   [ ] **Availability Feature** <!-- id: 17 -->
        -   [ ] Update Backend Schema (isAvailable)
        -   [ ] Update Frontend Display (Detail Page)
        -   [ ] Update Admin Dashboard (Toggle Status)
- [ ] **Error Boundary**
    -   [ ] Implement global Error Boundary

## 🧹 Code Quality
- [ ] **Standardize Naming**
    -   [ ] Rename directories to `kebab-case`
