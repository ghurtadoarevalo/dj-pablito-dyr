# Whole-Page Club Premium Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the entire homepage one visual system — surfaces, accent, typography, section archetype, and a restrained CSS-only motion layer — without changing copy (beyond the approved kickers and tagline), prices, JSON-LD, or the WhatsApp flow.

**Architecture:** Design tokens land in `theme.extend` and are consumed as utility classes; one `SectionHeading.astro` primitive carries the section archetype; a `src/styles/global.css` file holds the reveal utility and the reduced-motion override; each section is then recomposed on top of those three shared pieces. No new dependency, no JavaScript listener for motion.

**Tech Stack:** Astro 4, React 18, TypeScript strict, Tailwind CSS 3, Vitest 2, Chrome DevTools MCP for visual verification.

**Spec:** `docs/superpowers/specs/2026-11-02-whole-page-club-premium-design.md`

## Global Constraints

- Accent is `yellow-500` (`#eab308`); it is used for price, selection, and primary action only, never as body text on a light surface.
- One surface family only: `ink` `#0b0b0d`, `surface` `#141416`, `surface-raised` `#171719`. No `slate-*`, no `gray-*`, no raw `#141416` / `#171719` / `#f6c945` in components.
- One radius scale: `rounded-card` `0.5rem`, `rounded-control` `0.25rem`, `rounded-pill` `9999px`.
- Titles: `font-display` (Bebas Neue), `text-3xl md:text-4xl lg:text-5xl`, uppercase, `tracking-tight`, left-aligned. Every `h2` in every section.
- Kickers (verbatim): Hero `DJ · Sonido · Iluminación · Santiago`; Mixes `Nuestro sonido` / title `Mixes`; Servicios `Servicios` / `Tu evento, a tu manera`; Equipamiento `Sonido e iluminación` / `Equipamiento`; Preguntas frecuentes `Antes de reservar` / `Preguntas frecuentes`; Bio `Quién soy` / `Bio`; Contacto `Hablemos` / `Contacto`.
- Tagline: `SITE_TAGLINE = "Tu evento, nuestra pasión"` from `src/data/site.ts`, rendered in the navbar at `lg` and up and in the footer only.
- Preserve: five packs and extra-hour prices, eight FAQ entries, 11 equipment items, seven videos, the conditions block, every `data-testid`, the anchors `#home #mixing #services #equipment #faq #bio #contact`, and `wa.me/56971768418`.
- No new runtime dependency. Motion is CSS only, disabled entirely under `prefers-reduced-motion: reduce`.
- Interactive targets at least 44×44 CSS px; visible focus ring on every surface.
- 320 px is designed before desktop; no horizontal overflow at 320, 390, 768, 1440.
- Every task runs `pnpm exec prettier --write` on its changed files before its commit.
- Conventional commits, no AI attribution.

## Review Focus

- Content hidden by the reveal animation when `animation-timeline: view()` is unsupported — a visitor must always see the section; the fallback must paint visible without scrolling.
- Horizontal overflow at 320 px from `lg:text-5xl` display titles and long words like `Equipamiento`.
- The Mixes heading text word-for-word present after the long title moves into the section lead.
- Contact form behaviour preserved: both fields, both `required` attributes, and the submit handler intact after the restyle.
- JSON-LD unchanged: five `Offer` entries with `CLP` and the original five prices.

---

### Task 1: Design Tokens, Global Styles, and the Guard Test

**Files:**
- Modify: `tailwind.config.mjs`
- Create: `src/styles/global.css`
- Modify: `src/layouts/Layout.astro` (import the stylesheet, `body bg-ink`)
- Test: `src/test/design-tokens.test.ts`

**Interfaces:**
- Produces: color tokens `ink`, `surface`, `surface-raised`, `line`, `line-strong`, `accent`, `accent-bright`, `muted`; radii `card`, `control`, `pill`; `backgroundImage.glow-hero|glow-card|glow-summary`; `transitionTimingFunction.reveal`, `transitionDuration.reveal|snap`; `keyframes.reveal`.

- [ ] **Step 1: Write the failing guard test**

```ts
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOTS = ["src/components", "src/layouts"];
const BANNED = [
  /\bslate-\d/,
  /\bgray-\d/,
  /\byellow-\d/,
  /#141416/i,
  /#171719/i,
  /#f6c945/i,
  /\bbg-green-/,
  /rounded-t-l-xl/,
  /bg-white\/100/,
];

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? files(full) : [full];
  });
}

describe("design tokens", () => {
  it("no component or layout reintroduces a legacy visual value", () => {
    const offenders: string[] = [];
    for (const file of ROOTS.flatMap(files)) {
      const text = readFileSync(file, "utf8");
      for (const pattern of BANNED) {
        if (pattern.test(text)) offenders.push(`${file}: ${pattern}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
```

- [ ] **Step 2: Run it and record the current failures**

Run: `pnpm exec vitest run src/test/design-tokens.test.ts`
Expected: FAIL, listing every file still carrying a banned value. Keep that list; it is the work queue for Tasks 3-10.

- [ ] **Step 3: Add the tokens to `tailwind.config.mjs`**

```js
theme: {
  extend: {
    fontFamily: { sans: ['"Montserrat"', 'system-ui', 'sans-serif'], display: ['"Bebas Neue"', 'sans-serif'] },
    colors: {
      ink: "#0b0b0d",
      surface: "#141416",
      "surface-raised": "#171719",
      line: "#27272a",
      "line-strong": "#3f3f46",
      accent: "#eab308",
      "accent-bright": "#facc15",
      muted: "#a1a1aa",
    },
    borderRadius: { card: "0.5rem", control: "0.25rem", pill: "9999px" },
    backgroundImage: {
      "glow-hero": "radial-gradient(circle at 75% 20%, rgba(234,179,8,0.14), transparent 34%), radial-gradient(circle at 10% 80%, rgba(234,179,8,0.06), transparent 30%)",
      "glow-card": "linear-gradient(145deg, rgba(234,179,8,0.07), transparent 60%)",
      "glow-summary": "linear-gradient(150deg, rgba(234,179,8,0.06), transparent 45%)",
    },
    transitionTimingFunction: { reveal: "cubic-bezier(0.22, 1, 0.36, 1)" },
    transitionDuration: { reveal: "520ms", snap: "160ms" },
  },
},
```

- [ ] **Step 4: Create `src/styles/global.css` and import it**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

In `Layout.astro` frontmatter add `import "../styles/global.css";` and change `<body class="bg-zinc-900">` to `<body class="bg-ink">`.

- [ ] **Step 5: Run the build and the guard test to confirm tokens resolve**

Run: `pnpm build && pnpm exec vitest run src/test/design-tokens.test.ts`
Expected: build passes; guard test still fails only on component files pending Tasks 3-10, not on `Layout.astro`.

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.mjs src/styles/global.css src/layouts/Layout.astro src/test/design-tokens.test.ts
git commit -m "feat: add club premium design tokens"
```

### Task 2: Shared Section Heading

**Files:**
- Create: `src/components/SectionHeading.astro`

**Interfaces:**
- Consumes: `accent`, `muted` tokens.
- Produces: `SectionHeading({ kicker: string, title: string, lead?: string, id?: string })` rendering `<p class="kicker">`, `<h2 id={id}>`, optional `<p class="lead">`.

- [ ] **Step 1: Create the component**

Renders a wrapper `div` with `mb-8 md:mb-12`, a kicker `<p class="text-[10px] font-black uppercase tracking-[0.18em] text-accent">`, an `<h2 id={id} class="mt-2 text-3xl font-display uppercase tracking-tight text-white break-words md:text-4xl lg:text-5xl">`, and, when `lead` is provided, `<p class="mt-3 max-w-xl text-sm leading-relaxed text-muted">`. Props typed with `interface Props { kicker: string; title: string; lead?: string; id?: string; }`.

- [ ] **Step 2: Verify it renders through an existing page**

Run: `pnpm build`
Expected: build passes (the component compiles even while unused).

- [ ] **Step 3: Commit**

```bash
git add src/components/SectionHeading.astro
git commit -m "feat: add shared section heading"
```

### Task 3: Navbar, Tagline, and Site Data

**Files:**
- Create: `src/data/site.ts`
- Modify: `src/components/Navbar.tsx`
- Test: `src/components/Navbar.test.tsx`

**Interfaces:**
- Produces: `SITE_TAGLINE = "Tu evento, nuestra pasión"`.

- [ ] **Step 1: Extend the failing navbar test**

Add one assertion to the existing test: after `render(<Navbar />)`, `expect(screen.getByText("Tu evento, nuestra pasión")).toBeInTheDocument()`.

- [ ] **Step 2: Run it and watch it fail**

Run: `pnpm exec vitest run src/components/Navbar.test.tsx`
Expected: FAIL, tagline not found.

- [ ] **Step 3: Implement**

Create `src/data/site.ts` exporting `SITE_TAGLINE`. In `Navbar.tsx`, render it under the wordmark inside a `hidden lg:block` element as `text-[10px] uppercase tracking-[0.16em] text-muted`. Restyle the bar to `bg-ink/95`, `border-b border-line`, `backdrop-blur-md`; active link `text-accent` plus an `after:` underline, inactive `text-muted hover:text-white`; keep `min-h-11`, `aria-expanded`, `aria-controls`, Escape handling, and every `es-CL` label unchanged.

- [ ] **Step 4: Run the test and the guard test**

Run: `pnpm exec vitest run src/components/Navbar.test.tsx src/test/design-tokens.test.ts`
Expected: navbar test passes; guard test no longer lists `Navbar.tsx`.

- [ ] **Step 5: Commit**

```bash
git add src/data/site.ts src/components/Navbar.tsx src/components/Navbar.test.tsx
git commit -m "feat: apply club premium navbar and site tagline"
```

### Task 4: Hero

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Recompose**

Replace the inline gradient with `bg-glow-hero`, add `bg-ink` on the section, keep the poster image and the video with its current attributes and accessible description. Title keeps `¡Que tu fiesta se sienta enorme!` with `font-display` and `text-[clamp(2.5rem,8vw,5.5rem)]`. Proof points become a `border border-line bg-surface` strip with `divide-x divide-line`; keep the three labels `5 packs base`, `20% para reservar`, `$0 traslado en Santiago`. Primary action `Ver packs y precios` links to `#services`, uses `bg-accent text-ink hover:bg-accent-bright`, `min-h-11`.

- [ ] **Step 2: Verify**

Run: `pnpm build && pnpm exec vitest run src/test/design-tokens.test.ts`
Expected: build passes, guard test no longer lists `Hero.astro`.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: recompose hero for club premium"
```

### Task 5: Mixes and Video Cards

**Files:**
- Modify: `src/components/Videos.astro`
- Modify: `src/components/YoutubeVideo.astro`

- [ ] **Step 1: Recompose the section**

Use `SectionHeading` with kicker `Nuestro sonido`, title `Mixes`, and lead `Visitános en YouTube y conoce nuestros mixes` (verbatim from the current heading). Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6`. Section gets `py-16 md:py-24 border-t border-line`.

- [ ] **Step 2: Fix the video card**

`YoutubeVideo.astro`: `rounded-card`, `border border-line`, remove `outline-white/50`, replace `bg-black/50` with `bg-ink/60`, delete the invalid `rounded-t-l-xl` and `hover:bg-white/100`, keep the iframe `title`, `loading="lazy"`, and `allow` attributes. Hover: `hover:-translate-y-0.5 hover:border-line-strong transition duration-snap`.

- [ ] **Step 3: Verify content survived and tokens are clean**

Run: `grep -c "videoCode:" src/components/Videos.astro && grep -n "Visitános en YouTube" src/components/Videos.astro && pnpm exec vitest run src/test/design-tokens.test.ts`
Expected: `7`, one match, guard test no longer lists either file.

- [ ] **Step 4: Commit**

```bash
git add src/components/Videos.astro src/components/YoutubeVideo.astro
git commit -m "feat: recompose mixes section"
```

### Task 6: Services, Plan Card, and Quote Builder

**Files:**
- Modify: `src/components/ServicesSection.tsx`
- Modify: `src/components/PlanCard.tsx`
- Modify: `src/components/CustomQuoteBuilder.tsx`
- Test: `src/components/ServicesSection.test.tsx`, `src/components/PlanCard.test.tsx`

- [ ] **Step 1: Swap the header and tokens**

Replace the inline kicker/title block in `ServicesSection.tsx` with `SectionHeading` (kicker `Servicios`, title `Tu evento, a tu manera`, lead `Compara lo esencial de cada pack o configura una propuesta con el valor exacto antes de contactar.`, `id="services-title"`), keeping the `h2` id so `aria-labelledby` on the section keeps resolving. Replace `bg-zinc-950` with `bg-ink`, `rounded-md` with `rounded-control`, and every `yellow-400`/`yellow-300` with `accent`/`accent-bright`.

- [ ] **Step 2: Swap the same tokens in the card and the builder**

`PlanCard.tsx`: `bg-surface`, gradient `bg-glow-card`, `rounded-card`, accent borders on the featured card. `CustomQuoteBuilder.tsx`: panels `bg-surface`, summary and mobile bar `bg-surface-raised` with `bg-glow-summary`, all radii on tokens. Do not change any `data-testid`, any label text, or any computed pricing behaviour.

- [ ] **Step 3: Run both test files**

Run: `pnpm exec vitest run src/components/ServicesSection.test.tsx src/components/PlanCard.test.tsx`
Expected: all pass, unchanged assertions.

- [ ] **Step 4: Commit**

```bash
git add src/components/ServicesSection.tsx src/components/PlanCard.tsx src/components/CustomQuoteBuilder.tsx
git commit -m "refactor: move services experience onto club premium tokens"
```

### Task 7: Equipment

**Files:**
- Modify: `src/components/Equipments.astro`
- Modify: `src/components/Equipment.astro`

- [ ] **Step 1: Recompose**

`SectionHeading` with kicker `Sonido e iluminación`, title `Equipamiento`, lead `Sonido, iluminación y tecnología profesional para tu evento` (verbatim from the current subtitle). Section: `bg-ink py-16 md:py-24 border-t border-line`. Grid `grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6`.

- [ ] **Step 2: Restyle the card**

`Equipment.astro`: `rounded-card border border-line bg-surface`, `hover:-translate-y-0.5 hover:border-line-strong transition duration-snap`, image with explicit `width`/`height` and `loading="lazy"`, caption `text-xs font-bold uppercase tracking-wide text-muted`.

- [ ] **Step 3: Verify**

Run: `grep -c "name:" src/components/Equipments.astro && pnpm exec vitest run src/test/design-tokens.test.ts`
Expected: `11`, guard test no longer lists either file.

- [ ] **Step 4: Commit**

```bash
git add src/components/Equipments.astro src/components/Equipment.astro
git commit -m "feat: recompose equipment section"
```

### Task 8: FAQ

**Files:**
- Modify: `src/components/FAQ.astro`

- [ ] **Step 1: Recompose**

`SectionHeading` with kicker `Antes de reservar`, title `Preguntas frecuentes`, `id="faq-title"`. Each entry becomes `<details class="group rounded-card border border-line bg-surface">` with `<summary class="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 p-5 text-sm font-bold">` plus a chevron `span` with `aria-hidden="true"` and `transition-transform duration-snap group-open:rotate-180`. Answer body `p-5 pt-0 text-sm leading-relaxed text-muted`.

- [ ] **Step 2: Verify**

Run: `grep -c "question:" src/components/FAQ.astro && pnpm exec vitest run src/test/design-tokens.test.ts`
Expected: `8`, guard test no longer lists `FAQ.astro`.

- [ ] **Step 3: Commit**

```bash
git add src/components/FAQ.astro
git commit -m "feat: recompose faq section"
```

### Task 9: Bio

**Files:**
- Modify: `src/components/Bio.astro`

- [ ] **Step 1: Recompose**

`SectionHeading` with kicker `Quién soy`, title `Bio`, `id="bio-title"`. Two-column at `lg`: portrait `lg:col-start-1` with `rounded-card border border-line`, text `lg:col-start-2`. Keep both paragraphs and every accent-highlighted phrase verbatim; convert `text-yellow-500` spans to `text-accent`. Social links keep `min-h-11 min-w-11`.

- [ ] **Step 2: Verify**

Run: `pnpm build && pnpm exec vitest run src/test/design-tokens.test.ts`
Expected: build passes, guard test no longer lists `Bio.astro`.

- [ ] **Step 3: Commit**

```bash
git add src/components/Bio.astro
git commit -m "feat: recompose bio section"
```

### Task 10: Contact, Footer, and Social Links

**Files:**
- Modify: `src/components/Contact.tsx`
- Modify: `src/components/Footer.astro`
- Modify: `src/components/SocialMedia.tsx`

- [ ] **Step 1: Recompose contact**

Section `bg-ink py-16 md:py-24 border-t border-line`; `SectionHeading` with kicker `Hablemos`, title `Contacto`. Form panel `rounded-card border border-line bg-surface`; remove `bg-green-500/5` and `bg-slate-900/80`; primary submit uses `bg-accent text-ink hover:bg-accent-bright`; the WhatsApp action keeps `wa.me/56971768418`. Keep both inputs, both `required` attributes, the `useState` fields, and `handleSubmit`.

- [ ] **Step 2: Recompose footer and socials**

`Footer.astro`: `border-t border-line bg-surface`, `SITE_TAGLINE` as the brand line, links at `min-h-11`. `SocialMedia.tsx`: icons `text-accent`, targets `min-h-11 min-w-11`, `rounded-control`.

- [ ] **Step 3: Verify form behaviour survived**

Run: `grep -c "required" src/components/Contact.tsx && grep -n "handleSubmit" src/components/Contact.tsx && pnpm exec vitest run src/test/design-tokens.test.ts`
Expected: `2`, one match, guard test passes with an empty offender list.

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.tsx src/components/Footer.astro src/components/SocialMedia.tsx
git commit -m "feat: recompose contact and footer"
```

### Task 11: Motion Layer

**Files:**
- Modify: `src/styles/global.css`
- Modify: the section files from Tasks 4-10 (add the reveal class only)

- [ ] **Step 1: Add the reveal utility with a visible-by-default fallback**

```css
@layer utilities {
  .reveal {
    opacity: 1;
    transform: none;
  }

  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
      .reveal {
        animation: reveal linear both;
        animation-timeline: view();
        animation-range: entry 10% cover 30%;
      }
    }
  }
}

@keyframes reveal {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal * {
    animation: none !important;
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
```

If `@keyframes reveal` is already declared in `tailwind.config.mjs`, delete that copy and keep only this one, so exactly one definition exists.

- [ ] **Step 2: Apply the class**

Add `reveal` to the section wrapper of Hero, Videos, Services, Equipamiento, FAQ, Bio, and Contact. Do not add it to the navbar, the sticky mobile bar, or any element whose visibility a test asserts.

- [ ] **Step 3: Verify the fallback cannot hide content**

Run: `grep -n "opacity: 1;" src/styles/global.css | head -3 && grep -c "reveal" src/styles/global.css`
Expected: the base `.reveal` rule sets `opacity: 1` before the `@supports` block appears, and `reveal` appears at least six times.

- [ ] **Step 4: Run the whole suite**

Run: `pnpm test && pnpm build`
Expected: 24 tests pass (23 existing plus the guard test), build clean.

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css src/components
git commit -m "feat: add css-only reveal motion"
```

### Task 12: Full Verification

**Files:**
- Modify if needed: any file the checks below flag

- [ ] **Step 1: Automated gates**

Run: `pnpm test && pnpm build && pnpm exec prettier --check src && pnpm exec eslint src/components --ext .astro`
Expected: 24 tests pass, `astro check` clean, Prettier clean, ESLint clean.

- [ ] **Step 2: Content preservation, counted**

Run: `grep -c "question:" src/components/FAQ.astro; grep -c "name:" src/components/Equipments.astro; grep -c "videoCode:" src/components/Videos.astro; grep -o '"@type":"Offer"' dist/index.html | wc -l; grep -o '"price":"[0-9]*"' dist/index.html | sort -u`
Expected: `8`, `11`, `7`, `7` (five packs plus the two pre-existing offers in `Layout.astro`), and the prices `150000 200000 250000 320000 400000` present.

- [ ] **Step 3: Desktop measurement with the Chrome DevTools MCP**

Navigate to `http://localhost:4321`, width 1440, then 768. For each: `document.documentElement.scrollWidth <= window.innerWidth`; every `h2` computes to Bebas Neue; distinct computed section backgrounds are only `rgb(11, 11, 13)`, `rgb(20, 20, 22)`, `rgb(23, 23, 25)`, or transparent. Save a full-page capture per width and review it.

- [ ] **Step 4: Mobile measurement**

Reconfigure the MCP server with `--viewport 375x812` (the `emulate` tool is broken in v1.12.0 and the window will not shrink below ~500 px), restart it, then repeat Step 3 at 375 and 320. Record `scrollWidth` and `innerWidth` as numbers, plus the count of elements smaller than 44×44 CSS px among `a, button, summary, input, textarea`.

- [ ] **Step 5: Reduced motion**

Audit that every `animation` and `transition` in `global.css` and component classes is neutralised by the single `prefers-reduced-motion: reduce` block, and that no component ships a JS scroll listener: `grep -rn "addEventListener(\"scroll\"\|IntersectionObserver" src/components src/pages`

- [ ] **Step 6: Commit any fixes, or record a clean worktree**

```bash
git add -A
git commit -m "fix: verify club premium redesign across breakpoints"
```

Skip the commit when Steps 1-5 changed nothing.

## Risk

Item 6 (no automated test catches a rendering regression). The guard test pins tokens and Steps 2-5 of Task 12 pin content and measurements, but composition quality is judged from the saved captures, so that evidence is required, not optional.
