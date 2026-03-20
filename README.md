# CM Housing 🏠
**Elevating the Nigerian Real Estate Experience.**

[![Website](https://img.shields.io/badge/Website-cmhousing.com.ng-blue?style=flat-square)](https://cmhousing.com.ng)
[![Tech Stack](https://img.shields.io/badge/Stack-MERN-green?style=flat-square)](#tech-stack)

CM Housing is a premium, full-stack real estate platform designed to streamline property discovery and management in Nigeria. Built with a focus on high-performance, visual excellence, and robust scalability, CM Housing offers a seamless experience for house hunters and property managers alike.

---

## 👩‍💻 Developer Bio
I am a passionate Full-Stack Developer dedicated to building high-quality, high-performance web applications that solve real-world problems. With a strong foundation in the MERN stack and a keen eye for modern UI/UX design, I focus on creating digital experiences that are not only functional but also visually stunning.

My expertise includes:
*   **Frontend**: Crafting responsive, animated, and performant interfaces using React, Vite, and Tailwind CSS.
*   **Backend**: Designing scalable RESTful APIs with Node.js, Express, and MongoDB.
*   **Optimization**: Implementing advanced caching with Redis and optimizing media with Cloudinary and Sharp.
*   **DevOps/Security**: Ensuring robust authentication flows and secure data management.

Check out my work at [cmhousing.com.ng](https://cmhousing.com.ng).

---

## 🚀 The App: What It Does
CM Housing serves as a comprehensive bridge between high-quality housing and the people who need it.

### Core Features:
-   **Dynamic Property Discovery**: Advanced search and filtering (powered by Fuse.js) to find the perfect home.
-   **Premium Property View**: Immersive galleries (Swiper), detailed property specs, and real-time availability.
-   **Multi-Tier Dashboard**: Separate, data-driven interfaces for **Admins** and **Managers** (using Refine and Recharts).
-   **Secure Authentication**: Multi-method login including JWT-based email/password and Google OAuth.
-   **Performance First**: Server-side image optimization (Sharp) and global CDN delivery (Cloudinary).
-   **Interactive UI**: Smooth transitions and micro-animations via Framer Motion and GSAP.

---

## 🏗️ Architecture & Tech Stack

CM Housing is built on a modern, decoupled architecture designed for speed and reliability.

### **Frontend (The "View")**
-   **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) (Lightning-fast HMR).
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Next-gen utility-first CSS).
-   **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/).
-   **Data Management**: [Axios](https://axios-http.com/) + [@refinedev/core](https://refine.dev/).
-   **UI Components**: [Shadcn UI](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/).

### **Backend (The "Brain")**
-   **Runtime**: [Node.js](https://nodejs.org/).
-   **Framework**: [Express.js](https://expressjs.com/).
-   **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/).
-   **Caching**: [Redis](https://redis.io/) (via ioredis) for lightning-fast data retrieval.

### **Infrastructure & Utilities**
-   **Media Storage**: [Cloudinary](https://cloudinary.com/).
-   **Image Processing**: [Sharp](https://sharp.pixelplumbing.com/).
-   **Validation**: [Joi](https://joi.dev/).
-   **Analytics**: [PostHog](https://posthog.com/).

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB
- Redis

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/cimess/CM-housing.git
   cd CM-housing
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   # Create a .env file based on .env.example
   npm run dev
   ```

3. **Setup Frontend**:
   ```bash
   cd ..
   npm install
   # Create a .env file
   npm run dev
   ```

---

## 📄 License
Internal / Private - CM Housing Project.
