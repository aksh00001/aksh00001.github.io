# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `client/`:

```bash
cd client
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:5173)
npm run build      # production build → client/dist/
npm run preview    # preview production build
npm run lint       # ESLint (js,jsx, zero warnings enforced)
```

No test framework is configured.

## Deployment

Pushes to `main` auto-deploy via GitHub Actions (`.github/workflows/deploy.yml`):
build → copy root `CNAME` into `dist/` → publish `client/dist/` to `gh-pages` branch.
Custom domain: `aksh21h.me`.

## Architecture

Single-page React 18 portfolio app. All source lives under `client/src/`.

**Entry flow:** `main.jsx` → `ThemeProvider` → `App.jsx`

**App.jsx** composes page sections in order: `LogoSplash` → `Background3D` + `Navbar` → `Hero` → `About` → `Skills` → `Work` → `ZoomParallax` → `AngledMarquee` → `AnimatedFooter`

**Key layers:**
- `components/` — Page sections (Hero, About, Skills, Work, Contact) and visual effects (Background3D, LogoSplash, AngledMarquee, ParallaxGallery, VortexBackground, Preloader)
- `components/ui/` — Reusable UI primitives (tubelight-navbar, display-cards, gradient-button, sky-toggle, glowing-effect, atc-shader, zoom-parallax)
- `context/ThemeContext.jsx` — Day/night toggle via React Context (`useTheme` hook). Day mode = animations on; toggling off adds `no-animations` class to root
- `data/projects.js` — Project data array (id, title, description, tech, image)
- `lib/utils.js` — `cn()` helper for merging class names

**Animation stack:** GSAP (`@gsap/react`), Framer Motion, and Three.js (`@react-three/fiber` + `@react-three/drei`) are all used. Components mix these freely.

**Styling:** Tailwind CSS 3 with a custom dark color palette defined in `tailwind.config.js` (background, surface, primary/champagne, secondary/rose, accent/mauve, and `theme-*` variants). Font: Inter. Some components also use styled-components.

## Conventions

- React functional components with hooks (no class components)
- JSX file extension (`.jsx`) for all React files
- 4-space indentation
- Vite base URL is `/` (GitHub Pages user site)
