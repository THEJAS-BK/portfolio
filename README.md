# Thejas — Portfolio

A dark, editorial portfolio for a computer science student and full-stack developer.
Oversized type, a restrained accent, and an interactive Three.js sculpture that reacts to
the pointer — built to load fast and stay readable.

## Stack

| Layer      | Choice                                             |
| ---------- | -------------------------------------------------- |
| Framework  | React 19 + TypeScript                              |
| Build      | Vite 7                                              |
| Styling    | Tailwind CSS 4 (`@theme` tokens in `src/index.css`) |
| 3D         | Three.js + React Three Fiber + Drei                 |
| Animation  | Motion for React                                    |
| Icons      | Lucide React                                        |
| Hosting    | Netlify                                             |

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to /dist
npm run preview  # serve the production build locally
```

Requires Node 20+.

## Editing content

**All copy lives in `src/data.ts`.** No strings are hard-coded in components.

- `profile` — name, initials, role, email, social links
- `copy` — section eyebrows, headings, and hero copy
- `about` — intro paragraphs, interests, current learning focus
- `projects` — name, description, highlight, tech stack, optional `href`
- `skills` — grouped skill lists
- `nav` — section order and labels

To add a project, append an object to `projects`; the row layout, numbering, and
hover states are generated automatically.

## Structure

```
src/
├─ data.ts                  # every string and list on the site
├─ hooks.ts                 # active section, scroll progress, media queries
├─ index.css                # theme tokens, grain, focus styles
├─ components/
│  ├─ Nav.tsx               # sticky nav, scroll progress, mobile drawer
│  ├─ Hero.tsx              # headline, CTAs, lazy 3D scene
│  ├─ Scene.tsx             # Three.js sculpture
│  ├─ Sections.tsx          # About, Projects, Skills, Contact
│  └─ ErrorBoundary.tsx     # keeps a WebGL failure from breaking the page
└─ main.tsx
```

## Performance notes

- The 3D bundle is split into its own chunk (`three`) and loaded lazily, so it never
  blocks the first paint of the headline.
- The WebGL render loop is stopped while the hero is off-screen
  (`frameloop="never"`), saving battery when reading the rest of the page.
- On mobile the sculpture drops a subdivision level, uses a lower DPR, and skips the
  contact shadow.
- If WebGL is unavailable, a static fallback renders instead and an error boundary
  catches context failures.

## Accessibility

- Skip link, landmarks, and `aria-labelledby` on every section.
- The mobile drawer locks background scroll, traps focus on open, closes on `Escape`,
  and restores focus to the toggle button.
- All motion is gated behind `prefers-reduced-motion`; the 3D scene freezes rather
  than disappearing.
- Visible focus rings for keyboard users only, and AA-contrast text throughout.

## Deployment

Netlify reads `netlify.toml`: builds with `npm run build`, publishes `dist`, and sets
immutable caching for fingerprinted assets plus baseline security headers.

## Customising

Before publishing, replace the placeholders in `src/data.ts`:

- `profile.email` (`you@example.com`)
- `profile.links[].href`
- `projects[].href`

Then update the social preview metadata and JSON-LD `sameAs` entries in `index.html`.
