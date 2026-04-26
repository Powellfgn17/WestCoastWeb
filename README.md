# Powell Digital — Websites for Local Businesses in 5 Days

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-38bdf8?logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-r184-black?logo=three.js)
![License](https://img.shields.io/badge/License-MIT-green)

A premium, dark-themed landing page for **Powell Digital** — a solo web agency that builds fast, mobile-first websites for local businesses (barbershops, garages, restaurants) across the US, UK, and French-speaking Africa.

> **Live:** _Coming soon_  
> **Built by:** [Treasure Fagnon (Powell)](https://github.com/Powellfgn17) from Cotonou, Benin 🇧🇯

---

## ✨ Features

- **Interactive 3D Globe** — Three.js globe with pulsing arcs connecting Cotonou, Charlotte, Birmingham, and Lyon
- **EN / FR Language Toggle** — Full client-side i18n with instant language switching (persisted in localStorage)
- **Contact Form → Resend** — Server-side API route (`/api/contact`) powered by [Resend](https://resend.com) for email delivery
- **Scroll Animations** — Framer Motion entrance animations + IntersectionObserver-based reveals
- **Custom Cursor** — Bespoke cursor with hover states (auto-hidden on touch devices)
- **Animated Stats** — `requestAnimationFrame`-driven number counters with easeOutExpo easing
- **Portfolio Flip Cards** — CSS 3D perspective transforms showing before/after transformations
- **Responsive Design** — Mobile-first with hamburger nav, tested across breakpoints
- **SEO Optimized** — Meta tags, Open Graph, semantic HTML, heading hierarchy

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| Language | TypeScript 5.7 (strict) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| 3D | [Three.js](https://threejs.org/) via `@react-three/fiber` + `@react-three/drei` |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| UI Components | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| Email | [Resend](https://resend.com/) (API route) |
| Fonts | Syne · DM Sans · JetBrains Mono (Google Fonts) |
| Analytics | Vercel Analytics (production only) |

## 📁 Project Structure

```
├── app/
│   ├── api/contact/route.ts    # Resend email handler
│   ├── globals.css             # Design tokens, mesh-bg, noise, cursor
│   ├── layout.tsx              # Root layout + providers
│   └── page.tsx                # Page assembly
├── components/
│   ├── sections/
│   │   ├── hero.tsx            # Hero + 3D globe
│   │   ├── how-it-works.tsx    # 3-step pipeline
│   │   ├── portfolio.tsx       # Before/after flip cards
│   │   ├── services.tsx        # Pricing tiers + 3D backdrop
│   │   ├── reviews.tsx         # Testimonials + filter tabs
│   │   └── cta-final.tsx       # Contact form + Calendly
│   ├── three/
│   │   ├── globe-scene.tsx     # Three.js globe with city nodes
│   │   └── service-cards-3d.tsx
│   ├── ui/                     # shadcn/ui primitives
│   ├── site-header.tsx         # Nav + EN/FR toggle
│   ├── site-footer.tsx         # Links + social + language
│   ├── stats-counter.tsx       # Animated metric counters
│   ├── custom-cursor.tsx
│   ├── scroll-progress.tsx
│   └── reveal.tsx              # Scroll-triggered animation wrapper
├── lib/
│   ├── i18n.tsx                # EN/FR translations + React context
│   └── utils.ts                # cn() utility
└── public/
    └── portfolio/              # Before/after project images
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
git clone https://github.com/Powellfgn17/WestCoastWeb.git
cd WestCoastWeb
npm install
```

### Environment Variables

```bash
cp .env.local.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | For emails | Get yours at [resend.com/api-keys](https://resend.com/api-keys) |
| `RESEND_FROM_EMAIL` | Optional | Verified sender (default: Resend sandbox) |
| `CONTACT_EMAIL` | Optional | Where submissions go (default: hello@powelldigital.com) |

> **Note:** The contact form works without env vars — submissions log to the console in dev mode.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## 🌍 Internationalization

The site supports **English** and **French** via a client-side i18n system:

- Toggle in the header (pill switcher) or footer
- Persisted in `localStorage` — visitors see their last choice on return
- All 8 sections fully translated
- Testimonials stay in their original language (authentic quotes)

Translation strings live in `lib/i18n.tsx`.

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#0A0F1E` (deep navy) |
| Primary | `#3B82F6` (electric blue) |
| Accent | `#F59E0B` (amber/gold) |
| Heading | Syne 500–800 |
| Body | DM Sans 400–700 |
| Mono | JetBrains Mono 400–600 |

## 📊 Target Markets

| City | Country | Market |
|---|---|---|
| Cotonou | 🇧🇯 Benin | Francophone Africa |
| Charlotte | 🇺🇸 USA | US Southeast |
| Birmingham | 🇬🇧 UK | UK Midlands |
| Lyon | 🇫🇷 France | Francophone Europe |

## 📄 License

MIT © 2026 [Treasure Fagnon (Powell)](https://github.com/Powellfgn17)
