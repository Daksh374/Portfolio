# Daksh Yadav — Portfolio

A warm, editorial, motion-heavy personal portfolio built around four real
shipped products.

**Stack:** React 19 · Vite · Tailwind CSS 3 · Framer Motion · Lenis (smooth scroll) · lucide-react

---

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build
```

---

## Colour theme

All colour lives in design tokens (`tailwind.config.js`) plus a handful of
component layers in `src/index.css` — change a token and it propagates.

| Token | Value | Used for |
| --- | --- | --- |
| `paper` | `#F5F2EA` | Page background (`paper-soft` `#FAF8F3`, `paper-deep` `#EFEBE1`) |
| `cream` | `#ECE8DE` | Card surfaces (`cream-deep` `#E3DED2` on hover) |
| `line` | `#D8D3C8` | Borders (`line-strong` `#C5BEAE` on hover) |
| `graphite` | `#111827` | Primary text; opacity steps give the muted greys |
| `accent` | `#E45B32` | Terracotta — fills, rules, dots |
| `accent-deep` | `#C94A27` | Button fills (4.7:1 under white text) |
| `accent-ink` | `#A93E20` | Small accent text on ivory (5.5:1) |
| `accent-blue` | `#3A6EA5` | Muted secondary accent |
| `success` / `danger` | `#3F7A4F` / `#B4473A` | Status colours inside the mockups |

Three accent shades exist for contrast reasons: terracotta at `#E45B32` is only
3.2:1 on ivory, so small text uses `accent-ink` and button fills use
`accent-deep`. Body-text opacity steps bottom out at `/60`, which is the point
where charcoal on ivory still clears 4.5:1.

Each project keeps its own accent identity in `src/data/projects.js`
(`theme.from` / `to` / `text` / `tint` / `glowA` / `glowB`):

| Project | Identity | Accent |
| --- | --- | --- |
| TravelEase | Travel + AI | Muted blue `#3A6EA5` |
| JobLio | Jobs + recruitment | Terracotta `#E45B32` |
| PropFind | AI/RAG + real estate | Ochre `#C2871F` |
| Expense Tracker | Finance + analytics | Olive `#5C7A4A` |

---

## Editing content

Everything text-level lives in two files — no need to touch components:

| File | Holds |
| --- | --- |
| `src/data/site.js` | Name, headline, tagline, email, phone, GitHub, LinkedIn, location, résumé link, nav links, capabilities, tech stack groups, hero metrics |
| `src/data/projects.js` | The four projects: summary, description, key features, stack groups, architecture notes, links, tags and per-project accent colours |

Project details were taken from the repositories themselves (README,
`package.json` / `requirements.txt` and the source tree) rather than invented.

### Résumé link

One constant, used by the navbar, hero and closing CTA:

```js
// src/data/site.js
resume: 'https://drive.google.com/file/d/1hwodUYGiMh1nmJ4RXY-ZGKLjnRdI91cu/view?usp=sharing'
```

### Contact form

There is no backend. Submitting composes a pre-filled `mailto:` draft addressed
to the email in `site.js` — the UI says so explicitly rather than pretending a
message was sent.

A `mailto:` link is a **silent no-op** for anyone with no desktop mail client
registered, so the form also offers two fallbacks that always work: *Open in
Gmail* (a webmail compose URL carrying the same subject and body) and *copy the
message* (clipboard). The email and phone cards have their own copy buttons.

---

## Structure

```
src/
├── App.jsx                   # section order, smooth scroll + intro handoff
├── index.css                 # design tokens, shell, glass/grid/noise utilities
├── data/
│   ├── site.js               # personal info + copy
│   └── projects.js           # project case-study data
├── lib/scroll.js             # Lenis instance, scrollTo helpers, scroll lock
├── hooks/useMediaQuery.js    # pointer / breakpoint / reduced-motion queries
└── components/
    ├── Preloader.jsx         # intro curtain (counter + name)
    ├── Background.jsx        # fixed gradient orbs, grid, grain, vignette
    ├── CustomCursor.jsx      # desktop dot + ring, reacts to data-cursor
    ├── ScrollProgress.jsx    # top progress bar
    ├── Navbar.jsx            # active-section pill, mobile sheet, résumé CTA
    ├── Hero.jsx              # name reveal, rotating roles, metrics
    ├── About.jsx             # narrative, portrait, terminal card, capabilities
    ├── Projects.jsx          # showcase wrapper + right-edge rail + overlay
    ├── ProjectPanel.jsx      # one project: sticky visual, scrolling detail
    ├── ProjectMockup.jsx     # the four hand-built product UI mockups
    ├── CaseStudy.jsx         # full-screen case-study overlay
    ├── Stack.jsx             # marquee + grouped toolkit
    ├── Contact.jsx           # email/phone/GitHub CTAs + mailto form
    ├── Footer.jsx            # closing CTA, wordmark, footer nav
    ├── Magnetic.jsx          # magnetic hover + pointer tilt
    ├── AnimatedText.jsx      # masked word/char reveals, stagger helpers
    └── ui.jsx                # buttons, section headings, chips
```

## Motion notes

- Smooth scrolling uses Lenis and is skipped when the visitor has
  `prefers-reduced-motion: reduce`; `MotionConfig reducedMotion="user"` applies
  the same respect to every Framer Motion animation.
- Scroll-linked effects animate **transform only**. Filters, `background-position`
  and blend modes were deliberately avoided in scroll handlers because they
  force a full-viewport repaint every frame.
- The intro curtain never depends on `requestAnimationFrame` alone to get out of
  the way — browsers suspend rAF in background tabs, so timers back it up.

---

## Deploy

Static output, so any host works. For Vercel:

```bash
npm run build     # outputs dist/
```

Framework preset **Vite**, build command `npm run build`, output directory `dist`.
