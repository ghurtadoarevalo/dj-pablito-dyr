# SEO Audit Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the highest-impact SEO issues identified on `djpablitodyr.cl` and verify the site still builds correctly.

**Architecture:** Single-page Astro site. Changes are localized to the page component, layout, and React/Astro components that render meta tags, headings, social links, and images.

**Tech Stack:** Astro v4, React, Tailwind CSS, TypeScript, Cloudflare Pages.

---

### Task 1: Shorten meta description to SERP-safe length

**Files:**
- Modify: `src/pages/index.astro`

**Why:** Current description is ~285 characters and will be truncated in Google results.

- [ ] **Step 1: Replace the long description prop**

Change the `description` prop passed to `<Layout>`:

```astro
<Layout
  title="DJ Pablito Dyr"
  description="DJ profesional en Santiago y Maipú. Servicio de DJ, animación, karaoke, iluminación y sonido para matrimonios, cumpleaños y eventos corporativos."
>
```

- [ ] **Step 2: Verify character count**

The new description is ~153 characters (within 150-160).

---

### Task 2: Fix duplicate H1 (Contact section)

**Files:**
- Modify: `src/components/Contact.tsx`

**Why:** Pages should have exactly one `<h1>`. The Contact section currently uses `<h1>`.

- [ ] **Step 1: Change Contact heading to H2**

```tsx
<h2 className="text-center text-white font-customFont text-3xl bg-zinc-800 py-10">
  Contacto
</h2>
```

---

### Task 3: Correct structured data `sameAs` links

**Files:**
- Modify: `src/layouts/Layout.astro`

**Why:** The schema `sameAs` Instagram URL does not match the real profile link used elsewhere on the site. YouTube and Facebook profiles are also missing.

- [ ] **Step 1: Update sameAs array**

```js
"sameAs": [
  "https://www.instagram.com/dj_pablito_dyr_/",
  "https://www.youtube.com/@DVJPD",
  "https://www.tiktok.com/@djpablitodyr",
  "https://www.facebook.com/profile.php?id=100083210888590"
]
```

- [ ] **Step 2: Remove misleading aggregateRating**

Delete the entire `aggregateRating` block from the LocalBusiness schema. There are no visible reviews on the site; a 5-star rating with 1 review can be flagged as misleading.

---

### Task 4: Add `rel="noopener noreferrer"` to external links

**Files:**
- Modify: `src/components/SocialMedia.tsx`
- Modify: `src/components/YoutubeVideo.astro`
- Modify: `src/components/Footer.astro`

**Why:** All `target="_blank"` links should use `rel="noopener noreferrer"` for security and referrer handling.

- [ ] **Step 1: Update SocialMedia links**

In `src/components/SocialMedia.tsx`, add `rel` to the anchor:

```tsx
<a
  className="..."
  href={media.url}
  target="_blank"
  rel="noopener noreferrer"
  key={media.name}
  aria-label={media.label}
>
```

- [ ] **Step 2: Update YoutubeVideo link**

In `src/components/YoutubeVideo.astro`, add `rel` to the anchor:

```astro
<a
  href={`https://www.youtube.com/watch?v=${videoCode}`}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="video con mix de dj pablito dyr"
>
```

- [ ] **Step 3: Update Footer developer link**

In `src/components/Footer.astro`, add `rel` to the developer anchor:

```astro
<a
  href="https://ghurtadoarevalo.github.io/portfolio/"
  target="_blank"
  rel="noopener noreferrer"
  class="text-center"
  aria-label="..."
>
```

---

### Task 5: Add explicit dimensions to Bio portrait image

**Files:**
- Modify: `src/components/Bio.astro`

**Why:** The portrait image lacks rendered width/height, which can cause Cumulative Layout Shift (CLS).

- [ ] **Step 1: Add width and height to Image component**

```astro
<Image
  class="object-contain w-[60%] md:w-[40%] lg:w-[35%] rounded-2xl place-self-center"
  src={portrait}
  alt="DJ Pablito Dyr - Retrato profesional del DJ en Santiago de Chile"
  width={540}
  height={675}
/>
```

---

### Task 6: Add poster to background video

**Files:**
- Modify: `src/components/Hero.astro`

**Why:** Video without a poster can delay LCP and may show a blank frame while loading.

- [ ] **Step 1: Add poster attribute**

Use the logo as the poster (already preloaded):

```astro
<video
  class="absolute blur-md -z-10 pt-4"
  src={djBackground}
  width={2000}
  height={600}
  autoplay
  loop
  muted
  playsinline
  preload="metadata"
  poster="/logo.webp"
  aria-label="Video de fondo mostrando ambiente de fiesta con DJ"
></video>
```

---

### Task 7: Remove redundant srcset on hero logo

**Files:**
- Modify: `src/components/Hero.astro`

**Why:** The current `srcset` references the same image three times with different widths, which provides no value and bloats markup.

- [ ] **Step 1: Replace the img tag with a simpler Astro Image**

Import `Image` from `astro:assets` and use the local `logo` import:

```astro
---
import { Image } from "astro:assets";
import logo from "../../public/logo.webp";
import djBackground from "@assets/djBackground.mp4";
---

<Image
  src={logo}
  alt="DJ Pablito Dyr - DJ Profesional en Santiago, Maipú y toda la Región Metropolitana"
  title="Logo DJ Pablito Dyr Producciones"
  loading="eager"
  fetchpriority="high"
  width={800}
  height={725}
  decoding="async"
  class="object-contain w-[70%] px-2 md:px-0 md:w-[60%] lg:w-[40%] md:animate-pulse"
/>
```

Remove the old `<img>` tag with the manual `srcset`.

---

### Task 8: Build and verify

**Files:**
- Run: project root

- [ ] **Step 1: Run the build**

```bash
pnpm build
```

Expected: Build completes with no errors.

- [ ] **Step 2: Run Astro check**

This is already part of `pnpm build`, but confirm no TypeScript errors in the output.

- [ ] **Step 3: Inspect the generated `dist/index.html`**

Confirm:
- `<meta name="description">` is the new shorter text.
- Only one `<h1>` exists and the Contact section uses `<h2>`.
- External links include `rel="noopener noreferrer"`.
- The portrait `<img>` has explicit `width` and `height`.
- The video has a `poster` attribute.

---

## Rollout Notes

- All changes are on the existing single page; no new routes are introduced.
- The sitemap will continue to contain only `/` until additional pages are created (out of scope for this quick-win audit).
- After deploy, verify the live canonical URL remains `https://djpablitodyr.cl/` and that the trailing-slash configuration is unchanged.
