---
name: DJ Pablito Dyr Producciones
description: Tu evento, nuestra pasión — DJ, sonido e iluminación para eventos en Santiago
colors:
  ink: "#0c0a09"
  surface: "#181210"
  surface-raised: "#1f1815"
  line: "#34261f"
  line-strong: "#4a382d"
  accent: "#d9a62e"
  accent-bright: "#f0c75e"
  muted: "#b9a99a"
  paper: "#f4ede4"
typography:
  display:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "clamp(2.5rem, 8vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: "0.18em"
rounded:
  control: "0.25rem"
  card: "0.5rem"
  pill: "9999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.25rem"
  xl: "2rem"
  section: "3rem"
  section-lg: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.5rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-bright}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.5rem"
    height: "3rem"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "1.25rem"
  quote-summary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "1.25rem"
  chip-highlight:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "0.25rem 0.5rem"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    height: "2.75rem"
---

# Design System: DJ Pablito Dyr Producciones

## Overview

**Creative North Star: "La Cabina Dorada"**

The system is a dark room with one warm light in it. Every surface is a warm
near-black — never a neutral gray — and the only saturated color available is a
single amber family borrowed from stage lighting. Nothing glows without
purpose: the amber sits on prices, on primary actions, and on the thin line
under the active nav item, and it stays scarce everywhere else. The
result reads as a booth at night, not as a nightclub flyer.

Type does the shouting so the layout does not have to. Bebas Neue condensed
uppercase carries every heading, plan name, and price at poster scale, while
Montserrat — in small, tight, mostly gray-cream body sizes — handles everything
that has to be read rather than scanned. Sections are separated by a single
hairline rule (`border-t border-line`) instead of large gaps, which keeps the
page dense and continuous, the way a set runs without a break.

The world is content-led and mobile-first. Video loops of real parties and the
booth itself are the primary imagery and they are the only elements allowed a
deep shadow; interface surfaces stay flat with a hairline border. Numbers are
treated as content: prices render in display type at the same weight as
headings, because a customer who already knows the price before calling is the
whole point of this site.

**Key Characteristics:**
- Warm black ground (`#0c0a09`) with warm brown-black surfaces, never gray.
- One accent hue only: amber gold, used on ≤10% of any screen.
- Poster-case display type for headings, plan names, and prices.
- Hairline section rules instead of whitespace-only separation.
- Flat interface surfaces; depth reserved for photography and video.
- Mobile-first density with 44px minimum touch targets.

## Colors

A single amber accent, warmed by brown-black neutrals, with cream as the text
tone — the palette of a lit stage in an unlit room.

### Primary
- **Amber Gold** (`#d9a62e`): the only accent. Prices, primary buttons,
  the active nav underline, the dot bullet in feature lists, the emphasised
  word in a proof line, focus rings, and the border of the quote summary card.
- **Lit Amber** (`#f0c75e`): the same hue at higher energy. Hover state of the
  primary button and of nav/plan rows, and the emphasised word inside the
  biography paragraph. Never used at rest as a fill for large areas.

### Neutral
- **Warm Ink** (`#0c0a09`): page ground and the text color on amber buttons.
  This is the darkest value in the system; pure black never appears.
- **Booth Surface** (`#181210`): panel, card, and fieldset fills sitting on the
  ink ground. Also the base for the dark overlay behind translucent media.
- **Raised Surface** (`#1f1815`): one step up, used only for the sticky mobile
  quote bar and the quote summary card where a surface must read as lifted.
- **Hairline** (`#34261f`): the default border and the section separator rule.
  Every `border-t` on a section uses this.
- **Strong Hairline** (`#4a382d`): borders that must survive against a surface
  fill — chip outlines, quote option outlines, the divider above a total.
- **Warm Gray** (`#b9a99a`): secondary text. Descriptions, feature lists,
  helper copy, inactive nav items. This is the body-copy default, not cream.
- **Cream Paper** (`#f4ede4`): primary text, headings, and the text color on
  dark buttons. The system's "white", deliberately off-white.

### Named Rules

**The One Accent Rule.** There is exactly one accent hue. No second saturated
color enters the system — not for success, not for a badge, not for a social
platform's brand color. `src/test/design-tokens.test.ts` enforces this against
Tailwind's default palettes; treat that test as the rule's implementation.

**The No Neutral Gray Rule.** Every dark value is warm. `#000`, `#fff`, slate,
zinc, and cool grays are banned. If a surface needs to be darker or lighter,
mix the warm ink toward the warm paper, not toward gray.

**The Scarcity Rule.** Amber is the price of attention and the budget is small.
If two elements compete for the accent on one screen, one of them is wrong.

## Typography

**Display Font:** Bebas Neue (with sans-serif)
**Body Font:** Montserrat (with system-ui, sans-serif)
**Label Font:** Montserrat at 11px / 900

**Character:** A condensed poster face against a humanist geometric sans. Bebas
Neue supplies the shouting room-sign energy and compresses long Spanish plan
names into one line; Montserrat keeps the paragraphs legible at small sizes on
a phone. Two families only — the pairing is the whole hierarchy.

### Hierarchy
- **Display** (400, `clamp(2.5rem, 8vw, 5.5rem)`, 0.92): the hero headline
  only. Uppercase, tight tracking, breaking across lines rather than shrinking.
- **Headline** (400, 4xl → 5xl → 7xl across sm/lg, 0.9): section titles via
  `SectionHeading`. Uppercase, tight, allowed to wrap.
- **Title** (400, 1.25rem–1.5rem, 1): plan names, the hours number on a plan
  row, and the plan price in summary rows. Uppercase for names, as-is for
  numbers.
- **Body** (400, 0.875rem–1rem, 1.625): descriptions and copy. Secondary text
  is warm gray, primary text is cream. Line length is capped near 65ch by the
  `max-w-2xl` / `max-w-xl` wrappers.
- **Label** (900, 0.6875rem, 0.14–0.2em tracking, uppercase): button text,
  chips, fieldset legends, the "Más elegido" badge, and the small reservation
  line under a price.

### Named Rules

**The Poster Case Rule.** Display type is always uppercase; body type is never
uppercase. There is no third case rule and no sentence-case heading.

**The Numbers Are Content Rule.** A price renders in Bebas Neue at heading
scale with the accent color. Prices never get demoted to a gray label — the
published price is the argument.

**The Two Families Rule.** Adding a third family is a system change, not a
detail. If Montserrat cannot carry a role, the answer is weights and tracking,
not a new font.

## Layout

Fixed 64px header (`h-16`) with the page content offset by `pt-16`; sections
carry `scroll-margin-top: 5rem` so anchor jumps clear the header.

The container is `max-w-7xl` with a mobile-first gutter of `px-4`, then
`sm:px-6`, then `lg:px-8`. Content is single-column on phones and splits at
`lg` into a two-column grid; the recurring split is
`lg:grid-cols-[minmax(0,1fr)_340px]` (content plus a sticky side panel) or a
media-plus-copy split of roughly `1fr` / `420–520px`.

Density is compact and continuous. Sections use `py-12 md:py-20` and are
separated by a `border-t border-line` hairline rather than large gaps, so the
page reads as one long strip. Internal card padding is `p-5` (1.25rem); lists
and grids use 8–12px gaps (`gap-2`, `gap-3`) with larger 16–20px gaps between
form groups. The hero is the exception: `py-10 md:py-16 lg:py-20`, and it is the
one section with a media ground: the console loop (hands on the mixer, 1280×720)
full-bleed under a `bg-ink/90` scrim and the amber glow. From `lg` it splits into the
lockup at 420px on the left and the selling block on the right; below `lg` the
lockup centres above the copy. The ground keeps the fold alive without spending
a column on media, which is what the brand mark now needs. The styles ledger —
the genres the DJ actually plays, label 11px/900 with an amber dot each — closes
the fold, because the range of styles is the claim no competitor can copy.

Horizontal scrollers (`overflow-x-auto` with `snap-x snap-mandatory` and a
hidden scrollbar) are the mobile pattern for repeating media, becoming a grid
at `lg`. Touch targets never drop below 44px (`min-h-11` / `size-11`).

## Elevation & Depth

Flat by default, lit by exception. Interface surfaces — panels, fieldsets,
quote options — convey elevation with a hairline border plus a one-step surface
fill, never a shadow. Shadows exist for two things only: photography and video
that should feel lifted off the page, and the mobile sticky bar that must
detach from the content scrolling beneath it.

The amber radial and linear gradients (`glow-hero`, `glow-hero-media`,
`glow-card`, `glow-summary`) are the other depth cue: they read as light falling
on a surface rather than as elevation. They are low-opacity washes, never a
filled color block. Both hero glows are amber only: the second radial of
`glow-hero` used to be magenta, which broke the One Accent Rule.

### Shadow Vocabulary
- **Media Lift** (`0 30px 80px -40px rgba(0,0,0,0.9)`): hero video tiles and
  their framed borders. Deep, heavily negative-spread, so it reads as a pool
  of darkness rather than a drop shadow.
- **Portrait Lift** (`0 24px 70px -30px rgba(0,0,0,0.9)`): the bio portrait.
- **Product Drop** (`drop-shadow 0 18px 28px rgba(0,0,0,0.55)`): equipment
  cut-outs, so the gear floats on its own tile.
- **Sticky Bar** (`0 -12px 35px rgba(0,0,0,0.45)`): the mobile quote bar,
  cast upward.
- **Card Wash** (`linear-gradient(145deg, rgba(217,166,46,0.08), transparent
  60%)`): light falling across a card, in place of a shadow.

### Named Rules

**The Lit Media Rule.** Only media lifts. A button, panel, fieldset, or card
gets a border and a surface step; if it needs a shadow to be seen, the fill or
the border is wrong.

**The Warm Light Rule.** Depth gradients are amber at 7–16% opacity, falling
away to transparent. A gray or black gradient fill is a different system.

## Shapes

Soft, small, and consistent. Controls (buttons, chips, options, nav items) use
a 4px radius (`rounded-control`); containers (panels, cards, media frames) use
8px (`rounded-card`); only the selection dot indicator uses a full pill
(`rounded-pill`). There is no large-radius card, no blob, no rounded-full
button, and no `rounded-3xl` anywhere.

Edges are always defined by a 1px hairline in `line` or `line-strong`, never by
a shadow alone. Media frames add an amber border at 30% (`border-accent/30`) so
a video tile announces itself as a lit object. Nothing is clipped to a shape
other than the rectangle with these radii; the only crop is `object-cover` on
16:20 portrait media and `aspect-[4/5]` framing.

## Components

### Logo
The brand is one lockup: ring, `PD` monogram, microphone, the
`DJ / ANIMACIÓN / KARAOKE` ribbon and the script signature. It is the identity
being sold and its art is never cropped — a derived monogram was tried and
rejected by the owner. Do not cut the ring, the ribbon or the signature.

Two files, same art:

- `public/logo.png` (408×612): the canonical file. Keep it untouched.
- `src/assets/logo-lockup.png` (408×397): the same art with the transparent
  padding trimmed — the ink occupies `y=104..496`, so 36% of the canonical
  canvas is empty and renders as dead air around the crest. The hero uses this
  one. Trimming canvas is not cropping art.

The lockup needs roughly 200px of width before its microtext stops being gold
noise, so the hero gives it the left column: 230px wide on phones, 280px from
`sm`, and the full 420px column from `lg`. It breathes with a 4s `hero-pulse`
(scale 1 → 1.035) — the fold's only continuous motion — and rests under
`prefers-reduced-motion`. Never render it under 200px wide.

It sits on the ink ground on its own transparency, with no plate, border or
shadow behind it: the gold is the lit object, and the `glow-hero-media` pool
behind it is the light.

### Buttons
- **Shape:** 4px radius (`rounded-control`), `min-h-12` on the hero, `min-h-11`
  when stacked in a card.
- **Primary:** amber fill, warm-ink text, 11–14px black uppercase with wide
  tracking, `px-6 py-3`. Label is an action verb in Spanish, never "click
  here" and never "submit".
- **Hover / Focus:** fill shifts to lit amber, 160ms color transition. Focus is
  a 2px amber outline at 2px offset — the global `:focus-visible` rule.
- **Secondary:** transparent fill, `border-line` hairline, cream text, semibold
  (not black). On hover the border and text both move to amber. Used for the
  WhatsApp side action, never for the primary conversion.

### Chips
- **Style:** transparent background, `border-line-strong` hairline, 4px radius,
  11px cream-at-80% text, `px-2 py-1`. They read as tags on a spec sheet, not
  as interactive filters.
- **State:** highlight chips on a plan row are static; the one amber-filled
  badge in the system is "Más elegido", with warm-ink text.
- No chip in this system is clickable. Interactive selections use the quote
  option pattern below.

### Cards / Containers
- **Corner Style:** 8px (`rounded-card`).
- **Background:** `surface` for panels and fieldsets, `surface-raised` for the
  quote summary and the mobile sticky bar.
- **Shadow Strategy:** none. See Elevation — cards never lift.
- **Border:** 1px `line` by default; the quote summary and the contact error
  state use `border-accent/40` and `border-accent-bright/60` to mark
  themselves as live or failing.
- **Internal Padding:** `p-5` (1.25rem). Nested lists use `mt-4` / `mt-5`.

### Comparison Table (signature)
The five packs side by side, under the plan rows, with a two-pack comparator on
top of it. Real `<table>` with a `<caption>` for screen readers, `<th
scope="col">` per pack and `<th scope="row">` per feature; never a grid of divs.
Rows carry only what differs between packs — anything every pack includes stays
in the single note below.
- **Comparator:** two native `<select>` elements ("Pack A" / "Pack B") and a
  "Ver los cinco" reset. Choosing two different packs collapses the table to
  those two columns, prints the price difference above it, and dims the rows
  that are equal so the eye lands on what changes. Picking the same pack twice
  keeps the full table and explains why.
- **Label column:** sticky left on mobile (`bg-ink`), 11px uppercase `muted`
  header, 12px semibold `paper` row labels.
- **Cells:** `✓` in amber for included, `—` in `muted` for absent, plain
  `paper` for values. Booleans always pair the glyph with an `sr-only`
  "Incluido" / "No incluido". A summary line in an `aria-live` region announces
  what is being compared.
- **Featured column:** `bg-accent/[0.06]` wash and an amber header, so the
  recommended pack is found without a second color.
- **Overflow:** `overflow-x-auto` with `min-w-[620px]` for five packs and
  `min-w-[380px]` for two; the helper line tells the visitor to swipe.
- **Equal rows:** `opacity-55`. Never mark differences with a colored bar —
  when every row differs the bar becomes a line down the table edge.

### Inputs / Fields
`surface` fill over an `ink/60` well, 4px radius, 1px `line` border, 12–14px
`paper` text. Labels sit above the field in `paper/80`; nothing is
placeholder-only.
- **Placeholder:** `paper/60`. `paper/45` measured 4.1:1 against the well and
  failed WCAG AA.
- **Native controls:** date inputs carry `[color-scheme:dark]` so the calendar
  affordance and its placeholder render for the dark theme. Selects reuse the
  field styling with a visible "Elige una opción" default, never an empty
  first row.
- **Focus:** the global rule is `outline: 2px solid currentColor` at 2px
  offset, so a field focuses in cream. Elements sitting on ink override it
  with an amber outline.
- **Error:** the field takes `border-accent-bright` and
  `aria-invalid="true"`, with inline text wired through `aria-describedby`.
  The summary is a single `role="alert"` panel — amber border at 60%,
  `bg-accent/10` wash, `⚠` glyph, messages as a list — and focus moves to the
  first invalid field. An error is a state, never a colored word in the
  emphasis accent.
- **Disabled:** 30% opacity with `cursor-not-allowed`.

### Quote Options (selectable control)
The input pattern of this system. A real radio input sits inside a `<label>`
sized to `min-h-11`, styled as a bordered row or tile.
- **Unselected:** transparent fill, `border-line-strong`, cream text.
- **Selected:** `border-accent/80` with an `bg-accent/10` wash and the label
  turning amber; check mark or dot indicator in the same amber.
- **Focus:** `focus-within` 2px amber outline, so keyboard focus is visible on
  the tile rather than the hidden input.
- **Disabled:** 30% opacity with `cursor-not-allowed` (used on the hour
  steppers at their limits).

### Navigation
Fixed header, `bg-ink/95` with `backdrop-blur-md`, bottom hairline in `line`.
Brand is 14px black tracking-wide, cream with the second word in amber.
Desktop links are 12px bold uppercase, `tracking-wide`, muted at rest, cream on
hover, amber with a 1px amber underline (`after:` pseudo-element) when the
section is in view — the active state is scroll-driven, not click-driven.
Mobile collapses to a button with a menu sheet; the sheet reuses the same link
styling at 14px and closes on Escape, restoring focus to the trigger.

### Plan Row (signature)
A `<details>`/`<summary>` accordion row that carries the pricing argument in
three columns: hours (display type, muted) · plan name plus a one-line "what it
adds" (display uppercase, cream) · price plus reservation amount (display,
amber). A hairline stretches between the name and the price on wide screens.
The featured plan is open by default and carries the amber "Más elegido" badge.
Expanded content holds the feature list, spec chips, the extra-hour price, and
one amber WhatsApp button. Hovering the summary row shifts the text to lit
amber — the row behaves like a link without being one.

### Quote Summary (signature)
Sticky side panel (`lg:sticky lg:top-24`) on desktop, a bottom bar on mobile.
`surface-raised` fill, `border-accent/40`, amber-washed background, a small
uppercase label, line-item rows (muted label left, cream value right), a hairline divider
above a large amber total with a small reservation line beneath, and the
primary WhatsApp action. On mobile it detaches with the sticky-bar shadow and
`backdrop-blur-md`.

### Hero (signature)
The page's one authored arrival, and the one place where a media ground carries
the fold. The console loop runs full-bleed behind everything under a
`bg-ink/90` scrim plus `glow-hero`, so the fold is lit without competing with
the type.

- **Composition:** two columns from `lg` — the brand lockup at 420px on the
  left, the selling block on the right. Below `lg` it becomes one column with
  the lockup centred above the copy (230px on phones, 280px from `sm`).
- **Headline:** display type at `clamp(2.5rem, 6.4vw, 5.5rem)`,
  `leading-[0.86]`, forced onto two lines with two `block` spans so it never
  strands a single word at any width.
- **Price:** `$150.000` renders in display type in amber at `text-4xl sm:text-5xl`,
  derived from `SERVICE_PLANS` through `formatCLP`, with `Desde` and the
  reservation percentage as labels. The Numbers Are Content Rule applies from
  the first screen.
- **Styles ledger:** the genres close the fold under a hairline, label 11px/900,
  one amber dot each, `tracking-[0.14em]`. `flex flex-wrap` below `xl`; a four
  column grid from `xl`, where the eight entries land as a 4 + 4 ledger instead
  of a wrapping row that leaves the last item alone.
- **Rhythm:** measured at 390×844 the hero is 787px and at 1440×900 it is 640px,
  so the next section's hairline always shows at the fold.
- **Ground:** `preload="metadata"` with a webp poster, `tabindex="-1"` and
  `aria-hidden` on its wrapper — it is scenery, never a tab stop. An inline
  script pauses it when the tab is hidden or reduced-motion is on.
- **WhatsApp:** the fold's action is the highest-intent click on the page, so it
  opens with the opener already written
  (`Hola, vengo de la web. Quiero cotizar un evento.`) through
  `buildWhatsAppUrl`. It never arrives as an empty chat.
- **Focus:** on the amber primary button the focus ring is `paper`, not amber —
  an amber ring two pixels outside an amber fill reads as a thicker border, not
  as state. Amber stays the ring on every control that sits on ink.

### Section Heading
The heading alone: display type, uppercase, 4xl → 5xl → 7xl across sm/lg, with
an optional lead paragraph at `mt-3`, `max-w-xl`, 14px, warm gray, relaxed
leading, and `text-balance` so a short lead never leaves a one-word orphan line.

There is no kicker or eyebrow above it. The label-plus-hairline device was
removed from all eight sections because it repeated the heading it introduced
and delayed the first real sentence, most visibly on the hero. The heading now
carries its own weight.

## Do's and Don'ts

### Do:
- **Do** keep every dark value warm; pull new neutrals by mixing toward
  `#f4ede4` and `#0c0a09`, never toward gray.
- **Do** set prices, plan names, and section titles in Bebas Neue uppercase at
  heading scale.
- **Do** separate sections with `border-t border-line` and keep vertical
  rhythm at `py-12 md:py-20`.
- **Do** give every control a 44px minimum touch target and a visible focus ring
  — amber on ink, cream on an amber fill.
- **Do** theme what the browser draws from the palette too: `::selection` is
  amber on ink, never the OS blue.
- **Do** use the amber wash gradients for depth instead of shadows on
  interface surfaces.
- **Do** write Spanish-first UI copy and keep Spanish plan names on one line
  via display type rather than shrinking the size.
- **Do** let a section heading stand alone; no kicker, eyebrow or label above it.
- **Do** put `text-balance` on short leads and captions so they never leave a
  one-word last line.
- **Do** label nav items with the name of the section they land on.
- **Do** fade in an element that appears after a state change (120ms,
  `pack-fade`, opacity only). `<details>` cannot animate height without
  measuring, so a fade is the whole budget.
- **Do** keep every animation to one property and give it a
  `prefers-reduced-motion` escape.

### Don't:
- **Don't** introduce a second accent hue, including for semantic states,
  badges, or third-party brand colors.
- **Don't** use pure black, pure white, slate, zinc, or cool grays — the
  `design-tokens` test enforces this and will fail the build.
- **Don't** put shadows on buttons, cards, fieldsets, or nav.
- **Don't** use radii above 8px on containers or `rounded-full` on buttons.
- **Don't** put a kicker, eyebrow or label above a heading. It repeats the
  heading, delays the first sentence, and the craft floor treats it as a ban.
- **Don't** set body copy in uppercase, or display copy in sentence case. A
  full sentence in uppercase at 11px — a caption, a footnote, a helper line —
  is body copy, not a label.
- **Don't** lower the price to a secondary gray label or hide it behind a
  "cotizar" CTA — published price is the positioning.
- **Don't** use clickable `div`s; interactive patterns are real links, real
  buttons, or real radio inputs inside a label.
- **Don't** invent muted variants of `paper` (`paper-muted`, `surface-muted`, and
  the like). They are not defined in `tailwind.config.mjs`, so the class
  silently does nothing and the element inherits its parent color. Soften
  primary body copy with `text-paper/80`; use `muted` for helper, metadata, and
  secondary-value text. `src/test/design-tokens.test.ts` rejects both names.
