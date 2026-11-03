# Whole-Page Club Premium Redesign

Supersedes `2026-11-02-visual-coherence-tokens-design.md`, which covered tokens only. The user escalated scope twice: the whole page must be redesigned, and the accent becomes `yellow-500`.

## Status

Awaiting user approval. Scope, accent, and motion were decided by the user in conversation; the remaining choices are marked as builder calls.

## Intent

The page currently reads as two sites stitched together: a redesigned navbar, hero, and services block, followed by five sections still in the previous visual language. This is a DJ's site: it must hit hard on the first scroll, stay legible, and feel expensive. The redesign gives the whole page one visual system, one accent, one header archetype, and one restrained motion language, without changing what the page says or how a visitor books.

## Measured Current State

Read from the running page with Chrome DevTools, not estimated:

| Region | Computed background | Heading font |
| --- | --- | --- |
| Header | `rgb(11, 11, 13)` | Montserrat |
| Videos band | `rgb(39, 39, 42)` | Bebas Neue |
| Services | transparent | **Montserrat** — only `h2` not in Bebas |
| Equipment | `rgb(39, 39, 42)` | Bebas Neue |
| FAQ | `rgb(24, 24, 27)` | Bebas Neue |
| Bio band | `rgb(39, 39, 42)` | Bebas Neue |
| Contact | `rgb(2, 6, 23)` — blue-black | Bebas Neue |
| Footer | `rgba(30, 41, 59, 0.4)` — blue | — |

Five distinct backgrounds, two heading families, two accent shades (`yellow-500` in Bio/FAQ/Contact/SocialMedia against `#f6c945` in the new components), four radii conventions, and the accent living as hardcoded hex inside three gradients. Verified non-issue: the large empty area around Equipment in a full-page capture is lazy-loading (11 images, 0 loaded until scroll), not a rendering bug.

## Goals

- One surface family, one accent (`yellow-500`), one radius scale, one section-header archetype, one motion language across every section.
- The page must remain readable and navigable at 320 px with no horizontal overflow.
- Every preserved string, price, JSON-LD `Offer`, anchor, and the WhatsApp destination stay byte-identical.
- Motion adds hierarchy, never decoration: nothing moves that a visitor must read or click.
- A visitor understands the offer in one scroll: what packs exist, what a custom event costs, how to contact.

## Non-goals

- Changing copy other than the tagline the user supplied, and section kickers where the new archetype needs one.
- New routes, booking backend, payments, or availability logic.
- Replacing photography, video, or the logo.
- Consolidating the pre-existing `Equipment.astro` / `Equipments.astro` duplication (separate task; the redesign only restyles both).
- A component library, CSS-in-JS, or any new runtime dependency.

## Anti-goals / Failure Conditions

- Any adjacent sections still show different black temperatures or two accent shades.
- Motion makes text jitter, blocks a click, or ignores `prefers-reduced-motion`.
- A section header stays in a different archetype or font family from the rest.
- The redesign drops a pack feature, a FAQ entry, an equipment item, or a condition about transport, equipment, reservation, LED names, or payment.
- Yellow is used as body text on a light surface, or as decoration on every element.
- The page exceeds one horizontal screen width at 320, 390, 768, or 1440 px.

## Constraints

- Astro 4, React 18, TypeScript strict, Tailwind 3, pnpm. No new runtime dependency; no animation library.
- Visitor-facing copy stays Spanish (`es-CL`). Identifiers, tokens, and code stay English.
- Accent is `yellow-500` (`#eab308`). Contrast on the page surface measures 10.3:1 (AAA); it must never sit on a light background.
- Content, prices, JSON-LD, canonical metadata, and `wa.me/56971768418` are preserved.
- Mobile-first: 320 px is designed and verified before desktop polish.
- Interactive targets at least 44×44 CSS px; focus visible on every surface.

## Approaches

- **A. Tokens only.** Class-level unification, no composition changes. Cheapest, but leaves every section's layout at its current quality, which is the part the user called incoherent.
- **B. Tokens plus a shared section shell.** Tokens, one `Section`/`SectionHeading` primitive, and each section adopting them with minimal markup changes. Good coherence, modest gain in impact.
- **C. Tokens, shared shell, per-section recomposition, and a CSS-only motion layer — selected.** Each section gets a considered composition at its own scale, all consuming the same system. Highest effort, and the only option that delivers "llamativa pero clara" for a DJ.

## Design System

Added to `theme.extend`:

| Token | Value | Role |
| --- | --- | --- |
| `colors.ink` | `#0b0b0d` | Page and section base |
| `colors.surface` | `#141416` | Cards, panels, band surfaces |
| `colors.surface-raised` | `#171719` | Sticky summary, mobile bar, hovered panels |
| `colors.line` | `#27272a` | Default border |
| `colors.line-strong` | `#3f3f46` | Emphasis border, focus ring on dark |
| `colors.accent` | `#eab308` | Price, selection, primary action only |
| `colors.accent-bright` | `#facc15` | Accent hover state |
| `colors.muted` | `#a1a1aa` | Secondary text |
| `borderRadius.card` | `0.5rem` | Cards and panels |
| `borderRadius.control` | `0.25rem` | Buttons, inputs, small controls |
| `borderRadius.pill` | `9999px` | Pills and avatars only |
| `backgroundImage.glow-hero` | accent radial at 14% / 6% | Hero atmosphere |
| `backgroundImage.glow-card` | accent gradient over surface | Featured pack card |
| `backgroundImage.glow-summary` | accent gradient over surface-raised | Sticky quote summary |
| `transitionTimingFunction.reveal` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrance and hover easing |
| `transitionDuration.reveal` | `520ms` | Entrance duration |
| `transitionDuration.snap` | `160ms` | Hover and focus duration |

Type: `font-display` (Bebas Neue) for section titles and hero; `font-sans` (Montserrat) for everything readable. Section titles use one shared scale — `text-3xl md:text-4xl lg:text-5xl`, uppercase, `tracking-tight` — and one alignment: left, inside the content container. No centered full-width heading bands anywhere.

Section rhythm: `py-16 md:py-24`, one container `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`, separated by `border-t border-line` instead of color blocks. Adjacent sections differ by content, not by background temperature.

## Section Archetype

Every section renders, in order: a kicker (`text-[10px] font-black uppercase tracking-[0.18em] text-accent`), an `h2` with the shared title scale, an optional one-line lead (`text-sm text-muted max-w-xl`), then the content. Services already follows this; the other seven adopt it, which is why they stop looking like a different site. Kicker copy is decided by the builder from each section's existing heading, keeping it short and `es-CL` (for example `Equipamiento`, `Preguntas frecuentes`, `Bio`, `Contacto`, `Mixes`).

**Decision (builder call):** the existing full-width `bg-zinc-800` bands are removed rather than adopted. Keeping them would force Services back into a centred band and lose the section hierarchy the redesign established; removing them costs four class changes and no content.

## Section Treatments

- **Hero.** Keep imagery and the current copy. Add depth: the accent glow token, a subtle vignette, and a display title that scales with `clamp`. Primary action stays `Ver packs y precios`; proof points become a bordered strip on `surface` instead of free-floating numbers.
- **Navbar.** Keep the six `es-CL` labels, the wordmark, `SITE_TAGLINE` under the wordmark on `lg`, Escape-to-close, and the 44 px menu button. Restyle to `bg-ink/95`, `border-line`, `backdrop-blur`, accent for active state only, plus an accent underline (not a yellow block) for the active link.
- **Videos (Mixes).** Keep all seven videos and titles. Grid becomes 1 column on phones, 2 on tablet, 3 from `lg`, with `rounded-card` frames, `border-line`, and a hover that lifts the frame 2 px and brightens the overlay. Behaviour stays as it is today: the YouTube iframes render in place with `loading="lazy"` and their existing accessible titles; the redesign adds no click-to-load gate, because hiding a visitor's first sight of the mixes behind a click would cost more than the network it saves on a page this small.
- **Section kickers (decided by the user, option A).** Each section carries a short `es-CL` kicker that adds meaning instead of repeating the title:

  | Section | Kicker | Title (`h2`) |
  | --- | --- | --- |
  | Hero | `DJ · Sonido · Iluminación · Santiago` (unchanged) | `¡Que tu fiesta se sienta enorme!` (unchanged) |
  | Mixes | `Nuestro sonido` | `Mixes` |
  | Servicios | `Servicios` | `Tu evento, a tu manera` |
  | Equipamiento | `Sonido e iluminación` | `Equipamiento` |
  | Preguntas frecuentes | `Antes de reservar` | `Preguntas frecuentes` |
  | Bio | `Quién soy` | `Bio` |
  | Contacto | `Hablemos` | `Contacto` |

  The Mixes section's current heading text (`Visitános en YouTube y conoce nuestros mixes`) moves verbatim into the section lead so no words are lost; every other title keeps its existing wording, only recased to sentence case for the shared title scale.
- **Services (packs and quote).** Preserve the two tabs, five packs with all features and extra-hour prices, the custom builder, the itemized summary, the sticky mobile bar, and every `data-testid`. Only the tokens, the header (now the shared archetype with kicker `Servicios`), and the motion layer change.
- **Equipment.** Keep all 11 items and images. Cards become a `surface` panel with `border-line`, image on top, name plus capability line, and a hover that reveals the accent border. Grid 2 columns on phones, 3 at `md`, 4 at `xl`. Images get explicit width and height to stop layout shift.
- **FAQ.** Keep all eight questions and answers verbatim. Native `<details>` per item on `surface` with `border-line`, `summary` at 44 px minimum with an accent chevron that rotates 180° on open via CSS, no JavaScript.
- **Bio.** Keep both paragraphs, the accent-highlighted phrases, the portrait, and the social links. Two-column at `lg` (portrait left, text right), one column on phones. Portrait gets `rounded-card` and `border-line`.
- **Contact.** Keep the form, its fields and validation behaviour, the WhatsApp action, and the social links. Remove the semantic green (`bg-green-500/5`): the form panel becomes `surface` with `border-line`, and the primary action uses accent. Two columns at `lg`.
- **Footer.** Keep the credit and the developer link. `surface` bar, `border-t border-line`, `SITE_TAGLINE` as the brand line, links at 44 px target height.

## Motion Layer

CSS only, no dependency, no scroll listener:

- **Entrance reveal.** Sections fade and rise 12 px using a single reusable utility (`opacity` 0 → 1, `translateY(12px)` → 0) driven by `animation-timeline: view()` where supported, with a `@supports` fallback that shows content immediately. Content is never hidden without a paint path to visible.
- **Hover and focus.** Cards lift 2 px and swap `border-line` for `border-line-strong` over `snap`. Links and buttons transition color and outline only.
- **Accent pulse.** The featured pack's accent border breathes once on first view, never loops.
- **Reduced motion.** A single `@media (prefers-reduced-motion: reduce)` block removes all transforms and animations, keeping only color transitions.
- **Budget.** No parallax, no autoplaying slider, no element that moves while a visitor reads or aims at a control.

## Tagline

`SITE_TAGLINE = "Tu evento, nuestra pasión"` in a new `src/data/site.ts`, rendered in the navbar at `lg` and up and in the footer. Not in the hero: that block already carries kicker, `h1`, lead, action, and proof points.

## Files

| File | Change |
| --- | --- |
| `tailwind.config.mjs` | Colors, radii, gradients, easing and duration tokens; `keyframes` for the reveal |
| `src/styles/global.css` (new) | Reveal utility, reduced-motion block, focus-ring baseline; imported from `Layout.astro` frontmatter. The project has no styles directory today and Tailwind is injected by `@astrojs/tailwind`, so this file carries only the motion utilities and the reduced-motion override |
| `src/layouts/Layout.astro` | `body bg-ink`, import the new stylesheet |
| `src/data/site.ts` | New: `SITE_TAGLINE` |
| `src/components/Hero.astro` | Glow token, vignette, clamp title, proof-point strip |
| `src/components/Navbar.tsx` | Tokens, accent underline, tagline |
| `src/components/Videos.astro` | Shared header, poster-frame grid, hover lift |
| `src/components/YoutubeVideo.astro` | Click-to-load iframe, `rounded-card`, token borders, fix `rounded-t-l-xl` and `bg-white/100` |
| `src/components/ServicesSection.tsx` | Shared header, tokens, motion |
| `src/components/PlanCard.tsx` | Tokens, glow token, hover lift, accent border for featured |
| `src/components/CustomQuoteBuilder.tsx` | Tokens, mobile bar and summary on `surface-raised`, motion |
| `src/components/Equipments.astro` | Shared header, 2/3/4 grid, panel restyle, image dimensions |
| `src/components/Equipment.astro` | Card restyle on tokens |
| `src/components/FAQ.astro` | Shared header, `<details>` restyle, rotating chevron |
| `src/components/Bio.astro` | Shared header, two-column composition, token restyle |
| `src/components/Contact.tsx` | Shared header, remove green, token restyle, two columns |
| `src/components/Footer.astro` | Token bar, tagline, 44 px links |
| `src/components/SocialMedia.tsx` | Accent tokens, 44 px targets |
| `src/test/design-tokens.test.ts` | New guard test: no legacy `slate-*`, `gray-*`, `yellow-4*`, `yellow-5*` in components, no raw `#141416` / `#171719` / `#f6c945`, no `bg-green-` |

`Services.astro`, `pages/index.astro`, and `Layout.astro` metadata stay out of scope except the body class; the JSON-LD block is not touched.

## Verification

- `pnpm test` keeps the existing 23 tests green plus the new guard test; `pnpm build` passes `astro check`.
- `prettier --check` on every changed file; `eslint` on `.astro` files.
- Chrome DevTools MCP, desktop pass at 1440 and 768: full-page capture reviewed, `document.documentElement.scrollWidth <= window.innerWidth`, computed background per section is `ink`, `surface`, or `surface-raised` only, and every `h2` computes to Bebas Neue.
- Mobile at 390 and 320: the MCP's `--viewport` is reconfigured for this check because `emulate` is broken in v1.12.0 and the window will not shrink below ~500 px; overflow and tap-target measurements are recorded as numbers.
- Reduced motion: `prefers-reduced-motion` emulation or a stylesheet audit shows transforms disabled.
- Content preservation: all eight FAQ entries, 11 equipment items, seven videos, five packs with extra-hour prices, the conditions block, and the JSON-LD `Offer` count and prices compared before and after. The counts are verified mechanically: `grep -c "question:"` in FAQ, `grep -c "name:"` in Equipments, `grep -c "videoCode:"` in Videos, and the `Offer` count in `dist/index.html`.

## Risk

Item 6: this is a visual and structural change with no automated test that catches a rendering regression. The guard test pins tokens, not composition, so the MCP captures and the content-preservation comparison are required evidence. Item 3 applies to `Layout.astro` only if its metadata is touched, which this design forbids.
