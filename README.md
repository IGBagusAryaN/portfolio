# I Gede Bagus Arya Negara — Minimalist Portfolio (Next.js + GSAP + Tailwind CSS)

A minimalist, Notion-inspired developer portfolio built with Next.js (App Router), Tailwind CSS, TypeScript, and GreenSock (GSAP + ScrollTrigger).

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: GSAP 3 + ScrollTrigger
- **Typography**: Plus Jakarta Sans & JetBrains Mono (via `next/font/google`)
- **Icons**: Minimal inline SVGs & Lucide

## Features & Motion
- **Hero Reveal**: Cryptographic character scrambling effect on name load and hover.
- **Magnetic Navigation**: Cursor-tracking navigation links with elastic spring return and sliding indicator bar.
- **ScrollTrigger Kinetic Typography**: Line/word-level illumination as the user scrolls through bio paragraphs.
- **Interactive Tech Stack**: 24 tool badges with subtle desynchronized sine wave floating and elastic hover scale (`ease: "elastic.out(1, 0.3)"`).
- **Parallax Rocket & CTA**: Multi-axis mouse parallax and click liftoff Easter egg.
- **Button Micro-interaction**: Rolling text container with sweeping background.
- **Dark Mode**: System-aware with persistent theme toggle.

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
