# DESIGN.md — Dihas Sathnindu Portfolio

## Color Strategy: Full Palette
Warm cream base. Four accent hues each with a distinct role. Inspired by vibecoding.to.

### Tokens
| Token | Value | Role |
|---|---|---|
| cream | #f9f5ef | Page background — warm off-white |
| surface | #f0e9de | Card, nav backgrounds |
| surface-raised | #e8ddd0 | Elevated surfaces, hover states |
| text-primary | #1c1714 | Headings, primary text — warm near-black |
| text-body | #4a4238 | Body copy |
| text-muted | #7a6f68 | Meta, labels, supporting text |
| border | #ddd0c0 | Dividers, card outlines |
| mint | #9fead3 | Decorative mint — badge backgrounds |
| mint-dark | #0d7f60 | Interactive mint — links, icons, active states |
| sunshine | #f9c840 | Warm yellow — DarvinCode, education accents |
| sunshine-dark | #7a4800 | Text on sunshine bg |
| coral | #ffd0bc | Soft coral — decorative |
| hot-pink | #e30057 | Vivid magenta — strong CTA moments |
| electric-blue | #2540ff | Vivid blue — research/purple badge replacement |
| lavender | #dce4ff | Soft purple — research badge backgrounds |
| lavender-dark | #3440c0 | Text on lavender bg |

### Film grain
`body::after` — SVG feTurbulence noise at 2.8% opacity, fixed overlay. Gives surfaces tactile warmth.

## Typography
- Display / headings: **Fraunces** (Google Fonts) — chunky editorial serif, variable optical size
- Body / UI: **Plus Jakarta Sans** (Google Fonts) — geometric humanist sans, warm
- Pixel labels / badges: **Silkscreen** (Google Fonts) — mono pixel font for Silkscreen labels

### CSS variables
- `--font-fraunces`: 'Fraunces', Georgia, serif
- `--font-jakarta`: 'Plus Jakarta Sans', system-ui, sans-serif
- `--font-silkscreen`: 'Silkscreen', monospace

### Tailwind classes
- `font-fraunces` — display headings
- `font-jakarta` — body, UI, buttons
- `font-silkscreen` — section labels, badges, tech tags, stats

### Scale
All fluid with clamp(). Minimum 1.3× ratio between adjacent steps.
- display-xl: clamp(3rem, 8vw, 7rem) / lh 1.0
- display-lg: clamp(2rem, 5vw, 4.5rem) / lh 1.05
- display-md: clamp(1.5rem, 3.5vw, 2.75rem) / lh 1.12
- body: 17px / 1.7 line-height

### Rules
- Headings: Fraunces, font-weight 700–900
- Section labels (ex-`// COMMENTS`): Silkscreen, text-[8–10px], tracking-widest, uppercase, color mint-dark
- Body copy: Jakarta 400–500
- Badge/tag text: Silkscreen, 9–10px

## Motion
- Entrance: fadeInUp with stagger — translateY(24px→0), opacity 0→1, ease [0.16,1,0.3,1]
- Hover lifts: translateY(-4px) + borderColor transition, 200ms ease-out
- 3D tilt on cards: Framer Motion useMotionValue + useTransform, max ±4deg (reduced from old ±12 for warmth)
- Scroll reveals: Framer Motion useInView with once:true
- No glitch effects, no scan lines, no HUD corners
- Respect prefers-reduced-motion

## Layout principles
- Left-aligned compositions — NOT centered stacks (except Contact)
- Sections breathe differently: hero tight, about generous, skills dense
- Max content width: 1280px, padding: clamp(1.5rem, 5vw, 6rem)
- Hero: two-column (text left, photo right) on md+

## Section dividers
Animated SVG wave stroke in border color (#ddd0c0), alternating flip.
Draws on scroll with pathLength animation.
