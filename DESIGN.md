# DESIGN.md — Dihas Sathnindu Portfolio

## Color Strategy: Committed
Terracotta carries the brand voice. Not a decorative accent — the emotional temperature of the whole surface.

### Tokens
| Token | Value | Role |
|---|---|---|
| bg | #0d0a08 | Page background — warm near-black |
| surface | #171210 | Card, nav backgrounds |
| surface-raised | #231e1a | Elevated surfaces, hover states |
| text-primary | #f0ebe5 | Headings, body copy |
| text-muted | #a29d9a | Meta, labels, supporting text |
| accent | #d98b6d | Terracotta — primary voice, CTAs, highlights |
| accent-cool | #7ecdc0 | Teal — secondary, used sparingly for contrast |
| border | #2c2826 | Dividers, card outlines |

### Glow values
- Terracotta glow: `0 0 40px rgba(217,139,109,0.25)`
- Teal glow: `0 0 30px rgba(126,205,192,0.15)`

## Typography
- Display / headings: Spectral (Google Fonts) — literary serif, warm, opinionated
- Body / UI: Urbanist (Google Fonts) — geometric humanist sans, clean

### Scale
All fluid with clamp(). Minimum 1.3× ratio between adjacent steps.
- display-xl: clamp(3rem, 8vw, 7rem)
- display-lg: clamp(2rem, 5vw, 4.5rem)
- display-md: clamp(1.5rem, 3.5vw, 2.75rem)
- body: 1rem / 1.75 line-height
- small: 0.875rem

### Rules
- Headings: Spectral, font-weight 400 (not bold — the elegance is in the regular weight)
- Labels / badges / nav: Urbanist, font-weight 500, tracked +0.08em
- Japanese accent text (武器庫, 作品, 経歴): Spectral italic, text-muted, small

## Motion
- Entrance: fadeInUp with stagger — transform: translateY(24px) → 0, opacity 0 → 1, ease-out-quart
- Hover lifts: translateY(-4px), transition 200ms ease-out
- 3D tilt: Framer Motion useMotionValue + useTransform, max ±12deg
- Scroll reveals: Framer Motion useInView with once:true
- Respect prefers-reduced-motion

## Layout principles
- Left-aligned compositions — NOT centered stacks
- Sections breathe differently: hero is tight, about is generous, skills is dense
- Max content width: 1280px, padding: clamp(1.5rem, 5vw, 6rem)
