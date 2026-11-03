# Whole-Page Visual Coherence Through Design Tokens

## Status

Superseded by `2026-11-02-whole-page-club-premium-design.md`. The user escalated this change from token unification to a whole-page redesign with motion, and changed the accent to `yellow-500`. Kept for the decision history only.

## Intent

The homepage currently looks like two sites stitched together. The Club Premium redesign rewrote the navbar, hero, and services experience, but the other seven sections kept their previous surfaces, accent shade, radii, and section-header archetype. Every visitor scrolls through that seam. This change unifies the *system* the whole page consumes, so coherence is a property of the codebase instead of something each new section has to remember.

## Current Problem

Measured across `src/`:

- **Four black families.** Page body `bg-zinc-900` (`Layout.astro:217`), section bands `bg-zinc-800` (Bio, FAQ, Videos, Contact), `slate-950` / `slate-900` / `slate-900/80` / `slate-800/60` / `slate-800/40` (Contact, Videos, Footer), plus near-black literals `#0b0b0d` (Navbar), `#141416` (PlanCard, CustomQuoteBuilder), `#171719` (summary, mobile bar). `zinc` is neutral, `slate` is blue-tinted; adjacent sections visibly change temperature.
- **Two accents.** `text-yellow-500` in Bio, FAQ, Contact, SocialMedia against `text-yellow-400` / `yellow-300` in the new work, and `#f6c945` hardcoded inside three gradients.
- **Two radii systems.** `rounded-sm` / `rounded-lg` in the new components against `rounded-2xl`, `rounded-3xl`, `rounded-xl`, `rounded-full` elsewhere.
- **Two section-header archetypes.** Bio, FAQ, Videos, and Contact use a full-width `bg-zinc-800 py-10` band with a centered `font-display` heading. The new Services section uses a left-aligned kicker plus `h2` inside a padded container (`ServicesSection.tsx:34-47`). This is the loudest break, because it changes where the eye lands.
- **Dead and invalid utilities.** `rounded-t-l-xl` and `hover:bg-white/100` in `YoutubeVideo.astro:22`, `bg-white/100` elsewhere; `bg-green-500/5` in `Contact.tsx:80` introduces a semantic green that exists nowhere else.

Root cause: the new visual language lives as literals copied into three files instead of as tokens, so it cannot propagate.

## Goals

- One page surface family, one accent, one radius scale, one section-header archetype, applied from `tailwind.config.mjs`.
- No content changes, no new copy, no route changes, no JSON-LD changes.
- Keep every section's DOM structure except the Services header band (see Decisions).
- Ship an automated guard so a future section cannot reintroduce the legacy values.

## Non-goals

- Redesigning section layouts, spacing rhythm, or information architecture.
- Replacing hero imagery, video, or equipment content.
- Consolidating the `Equipment.astro` / `Equipments.astro` duplication (pre-existing; separate task).
- Introducing a component library or CSS-in-JS. Astro + Tailwind utilities stay the mechanism.
- Touching `Layout.astro` SEO metadata or the five `Offer` entries.

## Anti-goals / Failure Conditions

- The page still shows two accent shades or two black temperatures after the change.
- A section keeps a full-width band while another keeps the left-aligned header.
- Token adoption requires per-section arbitrary values again, so the next section reintroduces literals.
- Contrast regresses below WCAG AA on any surface, especially accent text on ink and ink text on accent.
- The five JSON-LD `Offer` entries or their prices change.

## Constraints

- Astro 4, React 18, TypeScript strict, Tailwind 3. Existing tokens extend `theme.extend`, no plugin.
- Visitor-facing copy stays Spanish (`es-CL`); identifiers, token names, and code stay English.
- No new runtime dependency.
- Existing 23 tests must stay green; `pnpm build` must pass.
- Mobile-first: every surface and control verified at 320 px before desktop.

## Approaches Considered

- **A. Tokens plus shared primitives — selected.** Semantic colors, radii, and gradient utilities in `tailwind.config.mjs`; each section consumes them. Class-level diff, reversible, and the next section inherits the language by default.
- **B. Manual palette swap.** `slate-*` → `zinc-*`, `yellow-500` → `yellow-400`, `rounded-3xl` → `rounded-lg` per file. Faster to write, but literals survive, the header archetypes still differ, and the same drift returns.
- **C. Redesign the seven remaining sections.** Maximum visual quality, but it becomes a separate project with new copy, content risk, and per-viewport review.

## Token Design

Added to `theme.extend` in `tailwind.config.mjs`:

| Token | Value | Replaces |
| --- | --- | --- |
| `colors.ink` | `#0b0b0d` | `bg-zinc-900` body, `bg-slate-950`, `bg-slate-900`, `bg-[#0b0b0d]` |
| `colors.surface` | `#141416` | `bg-zinc-800` bands, `bg-[#141416]`, `bg-slate-900/80`, `bg-slate-800/60` |
| `colors.surface-raised` | `#171719` | `bg-zinc-800/50`, `bg-[#171719]`, `bg-slate-800/40`, `bg-gray-600/20` |
| `colors.line` | `#27272a` | `border-zinc-800` |
| `colors.line-strong` | `#3f3f46` | `border-zinc-700`, `border-zinc-600`, `border-white/10` |
| `colors.accent` | `#f6c945` | `text-yellow-400`, `text-yellow-500`, `bg-yellow-400`, `border-yellow-400`, `outline-yellow-400`, gradient literals |
| `colors.accent-bright` | `#ffd84d` | `text-yellow-300`, `bg-yellow-300` (hover states) |
| `colors.muted` | `#a1a1aa` | `text-zinc-400`, `text-gray-400` |
| `borderRadius.card` | `0.5rem` | `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl` on cards and panels |
| `borderRadius.control` | `0.25rem` | `rounded-sm`, `rounded-md` on controls |
| `borderRadius.pill` | `9999px` | `rounded-full` where it is a pill, not an avatar |
| `backgroundImage.glow-hero` | radial accent glow at 14% and 6% | `Hero.astro:13` literal |
| `backgroundImage.glow-card` | accent gradient over `#141416` | `PlanCard.tsx:14` literal |
| `backgroundImage.glow-summary` | accent gradient over `#171719` | `CustomQuoteBuilder.tsx:239` literal |

Accent is `#f6c945`, the value the new components already use, so the redesign keeps its exact look and every other section moves to it.

## Section Header Archetype

**Decision (mine, vetoable):** adopt the existing band archetype everywhere, retuned.

Bio, FAQ, Videos, and Contact share `text-center font-display text-3xl md:text-4xl bg-zinc-800 py-10` today, so the band is the page's established pattern; keeping it costs four class edits. Services is the single outlier, so it gains the band and drops the kicker row.

Why this direction over the reverse: the reverse means inventing Spanish kicker copy for four sections (`BIO`, `MIXING`, `FAQ`, `CONTACTO`), which is new content, and this change must not add content. If you prefer the left-aligned kicker pattern instead, it needs your copy for those four kickers and a `<p>` per section; say so and the design is revised.

Band treatment after the change: `bg-surface`, `border-b border-line`, `py-10`, centered `font-display` heading in `text-white`, and an accent underline rule (`h-px w-16 bg-accent`) is *not* added, to avoid decorative accent. Yellow stays reserved for price, selection, and primary action, per the existing design direction.

## Brand Tagline

The user supplied the tagline `Tu evento, nuestra pasión` as part of this change. It is visitor-facing copy, so it stays verbatim in Spanish (`es-CL`) with no added punctuation and no translation.

It lives in one place: a new `src/data/site.ts` exporting `SITE_TAGLINE = "Tu evento, nuestra pasión"`, consumed by whichever components render it. Copying the string into two components is the same defect this design exists to remove.

**Decision (mine, vetoable):** render it twice, framed as brand identity rather than as a claim:

- Navbar, desktop only (`hidden lg:block`), as a small line under the wordmark. The navbar is fixed, so the slogan is present at every scroll position without competing with the hero.
- Footer, as the brand line above the current credit copy.

Not in the hero: the hero already carries a kicker, an `h1`, a supporting paragraph, a primary action, and three proof points. A fifth line would crowd the only above-the-fold block and weaken the `h1` on mobile.

## Files and Changes

| File | Change |
| --- | --- |
| `tailwind.config.mjs` | Add the colors, radii, and background-image tokens above |
| `src/data/site.ts` | New: export `SITE_TAGLINE = "Tu evento, nuestra pasión"` |
| `src/layouts/Layout.astro` | `body bg-zinc-900` → `bg-ink` |
| `src/components/Bio.astro` | Band → `bg-surface`; `text-yellow-500` spans → `text-accent`; image `rounded-2xl` → `rounded-card` |
| `src/components/FAQ.astro` | Band → `bg-surface`; `bg-zinc-800/50` / `hover:bg-zinc-800/70` → `bg-surface-raised` / `hover:bg-surface`; `text-yellow-500` → `text-accent` |
| `src/components/Videos.astro` | Band → `bg-surface`; `bg-slate-900` → `bg-ink` |
| `src/components/Contact.tsx` | `bg-slate-950` → `bg-ink`; band → `bg-surface`; `bg-slate-900/80` → `bg-surface`; `bg-green-500/5` → removed, hover becomes `hover:bg-surface`; `bg-slate-800/60` → `bg-surface-raised`; `rounded-xl` → `rounded-card`; `text-yellow-500` → `text-accent`; `font-sans` stays |
| `src/components/Footer.astro` | `bg-slate-800/40` → `bg-surface`; `bg-gray-600/20` → `bg-surface-raised`; `rounded-full` → `rounded-pill`; render `SITE_TAGLINE` as the brand line |
| `src/components/SocialMedia.tsx` | `text-yellow-500` → `text-accent`; `rounded-lg` → `rounded-control` |
| `src/components/Equipments.astro` | `bg-zinc-800` → `bg-surface`; card radii → `rounded-card` |
| `src/components/Equipment.astro` | `rounded-3xl` → `rounded-card`; `border-white/10` → `border-line`; `bg-white/5` → `bg-surface` |
| `src/components/YoutubeVideo.astro` | `outline-white/50` → `outline-line-strong`; `rounded-xl` → `rounded-card`; `bg-black/50` → `bg-ink/60`; fix invalid `rounded-t-l-xl` and `hover:bg-white/100` |
| `src/components/Hero.astro` | Gradient literal → `bg-glow-hero`; `text-yellow-400/300` → `text-accent/accent-bright`; radii → tokens |
| `src/components/Navbar.tsx` | `#0b0b0d` literals → `bg-ink`; `border-zinc-800/80` → `border-line`; `text-yellow-*` → accent tokens; render `SITE_TAGLINE` under the wordmark on `lg` and up |
| `src/components/ServicesSection.tsx` | Header adopts the band archetype; `bg-zinc-950` → `bg-ink`; radii and accent → tokens |
| `src/components/PlanCard.tsx` | `bg-[#141416]` → `bg-surface`; gradient literal → `bg-glow-card`; radii and accent → tokens |
| `src/components/CustomQuoteBuilder.tsx` | `bg-[#141416]` → `bg-surface`; `bg-[#171719]` → `bg-surface-raised`; gradient → `bg-glow-summary`; radii, `size-11` and accent → tokens |
| `src/test/design-tokens.test.ts` | New guard test (see Verification) |

`Services.astro` is **not** modified: its JSON-LD and conditions block stay byte-identical.

## Verification

- `pnpm test` (existing 23 tests) and `pnpm build` stay green.
- New `src/test/design-tokens.test.ts` reads every file under `src/components` and `src/layouts` and fails if any of these legacy patterns reappears: `slate-`, `gray-`, `yellow-5`, `yellow-4`, `yellow-3`, `rounded-(t-)?[lr]?-(2xl|3xl|xl)\b` on card contexts, `#141416`, `#171719`, `#f6c945`, `bg-green-`, and the invalid `rounded-t-l-xl`. Token definitions in `tailwind.config.mjs` are excluded by path.
- Contrast spot checks, computed not eyeballed: `accent` on `ink` = 12.4:1, `muted` on `ink` = 7.4:1, `ink` on `accent` = 12.4:1. All AA, most AAA.
- Manual browser pass at 320/390/768/1440 px: no seam between adjacent sections, no horizontal overflow, focus rings still visible on the new surfaces.
- `SITE_TAGLINE` renders in the navbar at `lg` and up and in the footer at every width, and appears nowhere else, so there is no second copy of the string.

## Builder Discretion

The builder may choose token names as long as the mapping stays one-to-one with the table above, may convert repeated band markup into an Astro component if that keeps the diff smaller than editing four class strings, and may drop the guard test if a simpler equivalent pins the same invariant.

## Risk

Item 6 (no automated test catches a visual regression) — this is a class-level visual change; the guard test pins the token invariant but not the rendering, so the manual pass above is required evidence, not optional.
