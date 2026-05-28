<div align="center">

<br/>

# ⚖️ Sudhir Garg & Namita Garg — Law Firm

### *Justice. Integrity. Results.*

<br/>

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=for-the-badge&logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

<br/>

> A **cinematic, ultra-modern 3D law firm website** built with React Three Fiber, Framer Motion, GSAP, and Lenis — designed to look and feel like an Awwwards-winning premium legal platform.

<br/>

---

</div>

## ✨ Features

### 🎨 Design & Visuals
- **Dark Luxury Aesthetic** — Navy blue, matte black, deep slate with gold/amber highlights
- **Glassmorphism UI** — Frosted-glass cards, navbar, and modals with `backdrop-filter: blur`
- **Custom Gold Cursor** — Animated dot + trailing ring cursor (desktop)
- **Gradient Orbs & Light Beams** — Cinematic depth and atmosphere throughout
- **Premium Typography** — Playfair Display (serif) + Inter (sans-serif)

### 🌐 3D & Animation
- **Golden Scales of Justice** — Interactive Three.js 3D model with mouse-reactive rotation and floating animation
- **GPU Particle Field** — 3,000 gold particles with real-time mouse parallax
- **3D Tilt Cards** — Real-time perspective tilt on service cards based on mouse position
- **3D Flip Cards** — Lawyer profile cards that flip to reveal full bio and credentials
- **Lenis Smooth Scrolling** — Buttery-smooth scroll with custom easing
- **Framer Motion Transitions** — Cinematic `AnimatePresence` page transitions
- **Scroll-triggered reveals** — Every section animates in on scroll

### 🤖 AI & Interactive
- **AI Legal Chatbot** — Floating widget with keyword-smart responses, typing indicator, and quick replies
- **WhatsApp Button** — Floating button with pulse animation for instant client contact
- **Stat Counters** — Smooth count-up animation (2,500+ Cases Won, 96% Success Rate, etc.)
- **Testimonials Carousel** — Directional slide with client reviews
- **FAQ Accordion** — Smooth expand/collapse with animated height transitions
- **Interactive Calendar UI** — Day + time slot selection on the Contact page
- **Reading Progress Bar** — Live indicator on Blog page

### 📄 Pages (6 Full Pages)
| Page | Key Features |
|---|---|
| **Home** | 3D Hero, Stats, 8 Service Cards (3D tilt), Why Choose Us, Testimonials, Timeline, CTA |
| **About** | Flipping 3D Lawyer Cards, Awards, Achievements, Full Timeline |
| **Services** | Expandable Accordion Cards for 8 Practice Areas |
| **Case Studies** | Cinematic Problem → Strategy → Result storytelling layout |
| **Blog** | Editorial layout, Featured Hero, Category Filters, Reading Progress |
| **Contact** | Booking Form, Calendar UI, Google Maps, FAQ, **English/Hindi language switch** |

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS v3 + Custom CSS |
| **3D Engine** | React Three Fiber + Drei + Three.js |
| **Animation** | Framer Motion + GSAP |
| **Smooth Scroll** | Lenis |
| **Icons** | Lucide React |
| **Routing** | React Router v6 |
| **Fonts** | Playfair Display + Inter (Google Fonts) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v20.19+ or v22.12+ (required by Vite 5)
- **npm** v9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/garg-associates.git
cd garg-associates

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

Output is in the `dist/` folder, ready for deployment on Vercel, Netlify, or any static host.

---

## 📁 Project Structure

```
@GargAssociates/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── ScalesScene.tsx       # 3D Golden Scales of Justice
│   │   │   └── ParticleField.tsx     # GPU Particle System
│   │   ├── ai/
│   │   │   └── ChatWidget.tsx        # AI Legal Chatbot
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            # Glassmorphism floating navbar
│   │   │   ├── Footer.tsx            # Animated footer
│   │   │   ├── CursorEffect.tsx      # Custom gold cursor
│   │   │   └── LoadingScreen.tsx     # Animated intro screen
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx       # Fullscreen 3D hero
│   │   │   ├── StatsSection.tsx      # Animated counters
│   │   │   ├── ServicesSection.tsx   # 8 practice area cards
│   │   │   ├── WhyChooseUsSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── TimelineSection.tsx
│   │   │   └── CTASection.tsx
│   │   └── ui/
│   │       └── WhatsAppButton.tsx    # Floating WhatsApp CTA
│   ├── data/
│   │   └── index.ts                  # All static content
│   ├── hooks/
│   │   ├── useLenis.ts               # Smooth scroll hook
│   │   ├── useMousePosition.ts       # Cursor tracking
│   │   └── useScrollProgress.ts      # Reading progress
│   ├── lib/
│   │   └── utils.ts                  # Utility functions
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── Blog.tsx
│   │   └── Contact.tsx
│   ├── App.tsx                       # Router + Layout wrapper
│   ├── main.tsx                      # Entry point
│   └── index.css                     # Global styles + design tokens
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `navy-950` | `#05080f` | Page background |
| `navy-900` | `#0a0f1e` | Section backgrounds |
| `navy-800` | `#0d1530` | Card backgrounds |
| `gold-500` | `#c9a84c` | Primary accent |
| `gold-400` | `#e0b84a` | Hover states |
| `gold-300` | `#f0cc6a` | Highlights |
| `white` | `#f8f9fc` | Primary text |
| `text-muted` | `#8892a4` | Secondary text |

### Typography

```
Headings:  Playfair Display — clamp(2rem, 5vw, 4.5rem)
Body:      Inter — 0.875rem–1.05rem
Display:   Cormorant Garamond — for decorative headings
```

---

## ⚙️ Customization

### Update Contact Details

**WhatsApp number** → [`src/components/ui/WhatsAppButton.tsx`](src/components/ui/WhatsAppButton.tsx)
```tsx
const phone = '91XXXXXXXXXX'; // Replace with actual number
```

**Phone / Email / Address** → [`src/components/layout/Navbar.tsx`](src/components/layout/Navbar.tsx) and [`src/components/layout/Footer.tsx`](src/components/layout/Footer.tsx)

**Google Maps location** → [`src/pages/Contact.tsx`](src/pages/Contact.tsx) — update the iframe `src` coordinates

### Update Firm Content

All text content, team bios, case studies, blog posts, FAQs, and services are in one place:

```
src/data/index.ts
```

Edit the exported arrays to change any content on the site.

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build
npm run build

# Drag-and-drop the dist/ folder to Netlify
# Or connect your GitHub repo for auto-deploys
```

### Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

npm run deploy
```

> **Note:** For GitHub Pages, set `base: '/repo-name/'` in `vite.config.ts`.

---

## 📜 Legal Disclaimer

This website is a professional digital presence for an actual law firm. All case studies are presented with client permission. Confidential client identities have been anonymized where required by professional ethics and Bar Council guidelines.

---

## 📄 License

This project is proprietary software developed exclusively for **Sudhir Garg & Namita Garg — Law Firm**.

Unauthorized copying, modification, or distribution of this code is prohibited.

© 2026 Sudhir Garg & Namita Garg — Law Firm. All rights reserved.

---

<div align="center">

**Built with ❤️ for justice, integrity, and results.**

*Designed to Awwwards standard · Powered by React Three Fiber · Animated by Framer Motion*

</div>
