---
target: src/pages/index.astro
total_score: 24
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 3
p2_count: 2
target_identity: "file:/Users/n4m999/Documents/Repos/dj-pablito-dyr/src/pages/index.astro"
target_fingerprint: "sha256:8cedd68240eb0be6af7b1abb067b2d6b58af22e04f67c6ce1d1899d41f239710"
target_path: /Users/n4m999/Documents/Repos/dj-pablito-dyr/src/pages/index.astro
timestamp: 2026-11-05T02-30-04Z
slug: src-pages-index-astro
---
# Critique: DJ Pablito Dyr — home (src/pages/index.astro)

Method: ⚠️ DEGRADED — single-context (subagent tool denied by runtime permission)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Scroll-driven nav state and inline error alert work; the contact form opens a new tab with no on-page confirmation. |
| 2 | Match System / Real World | 3 | Spanish copy is fluent and domain-true; two promises ("configurador", "formulario") describe things that don't behave as named. |
| 3 | User Control and Freedom | 3 | Carousel has prev/next/pause, accordions are native `<details>`; no skip link on a 9-section page with 8 nav links. |
| 4 | Consistency and Standards | 3 | Strong token system; error text uses the emphasis accent, nav labels diverge from section headings, two phone numbers ship. |
| 5 | Error Prevention | 2 | Native `required` and a React `role="alert"` compete; the highest-stakes form collects date, event type and contents in one free-text box. |
| 6 | Recognition Rather Than Recall | 2 | Comparing five packs means opening five accordions and remembering differences across 8-feature lists. |
| 7 | Flexibility and Efficiency | n/a | Marketing landing page; no accelerator path exists or is expected. |
| 8 | Aesthetic and Minimalist Design | 3 | Disciplined and legible; the equipment bento runs long and the tagline repeats at full display scale mid-page. |
| 9 | Error Recovery | 2 | The alert is generic ("Completa tu nombre y el mensaje"), does not name the failing field, and is likely pre-empted by native validation. |
| 10 | Help and Documentation | 3 | A real 8-question FAQ answers zones, price, pack differences, payment and extra hours; it is not contextual. |
| **Total** | | **24/36 (67%)** | **Acceptable** |

Heuristic 7 scored n/a on a Persuade surface. Maximum renormalized to 36.

## Design Specificity Verdict

**LLM assessment**: Authored, not template. The system has a point of view: warm-black ground, one amber, Bebas Neue at poster scale, and prices rendered as display type. The plan rows are the proof — hours, name, "suma…" delta and price with the reservation amount underneath is a pricing argument, not a feature list. The equipment bento with quantity badges (×1, ×10, ×2) is specific to a production company and could not be lifted onto a generic wedding vendor unchanged.

Where it thins out: the hero video triptych and the testimonial carousel are category-standard, and the strongest differentiator — 2 personalized LED screens with the guest of honor's name — sits at the bottom of a collapsed accordion, invisible to anyone who doesn't open a pack.

**Deterministic scan**: 1 finding from `impeccable detect` over `src/components src/pages src/layouts` — `overused-font` (Montserrat, 88% of text) at `src/layouts/Layout.astro:216`. Treated as a taste flag, not a defect: the two-family pairing is a recorded brand commitment in DESIGN.md, and the rule's stated offenders (Inter, Roboto, Fraunces, Geist, Plus Jakarta, Space Grotesk) do not include Montserrat.

**Visual overlays**: injection succeeded in exactly one fresh tab; live-server on port 8400 served `/detect.js`, then stopped with `--keep-inject`. The console reported 16 anti-patterns: `kicker-above-heading` ×7, `gpt-thin-border-wide-shadow` ×3, `low-contrast` ×2 (input and textarea placeholder 4.1:1, need 4.5:1), `hero-eyebrow-chip`, `call-caps-body` (uppercase on 94 chars of body text), `overused-font` (Montserrat, 88% of text). Two browser audit issues also surfaced: a form field without id/name, and a deprecated feature.

## Overall Impression

The identity is real and the pricing section is the best thing on the page. The gap is between what the page promises and what it does: it advertises a configurator that is not rendered, it presents five packs in a format that resists comparison, and its only conversion form secretly changes medium. Fix those three and this stops being a good-looking page and starts being a closing page.

## What's Working

1. **Prices in display type with the reservation amount underneath.** `$250.000` in Bebas Neue with `Reserva $50.000` under it answers the two questions that kill DJ bookings — how much, and how much now. No "cotiza con nosotros".
2. **The equipment bento with quantity badges.** ×10 blue LEDs, ×2 JBL cabinets, ×1 smoke machine. This is evidence in a category where every competitor says "sonido profesional" and shows nothing.
3. **The full-amber CTA band.** The one place the accent covers a whole viewport, and it lands on the conversion moment rather than on decoration. The ink-on-amber inversion gives it a different voice without a second color.

## Priority Issues

1. **[P1] The page promises a configurator that does not exist.**
   - What: The CTA band says "5 packs base, cotización exacta en el configurador y 20% para reservar". `ServicesSection` renders with `showCustomPack = false`, so neither the "Arma tu evento" tab nor `CustomQuoteBuilder` reaches the DOM — measured: 0 tabs, 0 fieldsets, 0 radio inputs.
   - Why it matters: A visitor reads a concrete promise at the exact moment they are deciding, looks for it, and finds a dead end. That is the worst place on the page to look unreliable.
   - Fix: Either render the tab (`<ServicesSection client:load showCustomPack />`) — the component exists, is typed, and has tests — or delete "configurador" from the copy and replace it with what actually happens.
   - Suggested command: `$impeccable clarify`

2. **[P1] Comparing five packs requires five accordion opens and your memory.**
   - What: Only Karaoke Dancing is open at rest. The other four show one line of "suma…". Each opened pack lists 8 features in prose, and features are partly repeated rather than expressed as deltas.
   - Why it matters: This is a $150.000–$400.000 decision across five options. The visitor must hold four feature lists in working memory to answer "what do I get for $150.000 more". Working-memory limit is 4 items; this asks for 40.
   - Fix: Add a compact comparison matrix under the rows — features as rows, the five packs as columns, marks for included. Keep the accordions for detail and for the WhatsApp per-pack action. The delta data already exists as `adds`.
   - Suggested command: `$impeccable layout`

3. **[P1] The contact form does not submit — it opens WhatsApp, and says nothing about it.**
   - What: The section is titled "Formulario de contacto" with Nombre + Mensaje fields, then a submit button that calls `window.open('https://wa.me/…', '_blank')`. No helper text, no success state, no fallback if the popup is blocked. Separately, `required` on both fields fires native validation first, so the custom `role="alert"` message is effectively dead code.
   - Why it matters: The user believes they are sending a message. They get a new tab. If the popup is blocked, the button does nothing at all and there is no explanation.
   - Fix: State the outcome in the button or a helper line ("Se abrirá WhatsApp con tu mensaje listo para enviar"), keep exactly one validation mechanism, and add a visible fallback (the direct number is already in the aside — surface it in the failure path).
   - Suggested command: `$impeccable harden`

4. **[P2] The mobile form asks for three facts in one free-text box.**
   - What: The textarea placeholder asks for "Fecha del evento, tipo de celebración y qué te gustaría incluir" in a 6-row box. No date input, no event-type select, despite the five packs and the event taxonomy already existing in `src/data`.
   - Why it matters: Casey is typing one-handed on a phone. Three unstructured asks in one box produces short, useless messages and shifts the work of clarification onto WhatsApp.
   - Fix: Date input, event-type select drawn from the existing taxonomy, optional free text. Prefill the pack the visitor was last looking at.
   - Suggested command: `$impeccable harden`

5. **[P2] Two phone numbers ship in production.**
   - What: Structured data and metadata use `+56 9 9429 6961`; every CTA, the visible number and the WhatsApp deep link use `+56 9 7176 8418`.
   - Why it matters: The number Google shows in a local-business result may differ from the number every button dials. Inconsistency at the contact point costs calls and undermines the "directo, sin intermediarios" claim.
   - Fix: Pick the business line and use it in both places.
   - Suggested command: `$impeccable harden`

## Persona Red Flags

**Jordan (First-Timer)**: Reads the CTA band, sees "cotización exacta en el configurador", scrolls the services section, finds no configurator, and has no way to tell whether he missed it. Opens "Celebration", sees eight bullet lines, doesn't know whether "2 atriles de iluminación" matters for his venue, and closes it. Reaches the contact form, fills it, presses submit, and lands in WhatsApp with no prior warning.

**Casey (Distracted Mobile User)**: The pricing rows are genuinely thumb-friendly (44px+ targets, price at the right edge). The form is not: the textarea placeholder asks for a date she would rather pick, an event type she would rather tap, and contents she has to compose. If she leaves to check the date in her calendar app, the form state survives — but she has to scroll past the equipment bento (2.369px on mobile) to get back to it.

**Riley (Deliberate Stress Tester)**: Submits the empty form and gets the native browser bubble, not the page's own alert — two mechanisms, and the one with the accessible `role="alert"` never runs. Submits a valid form with a popup blocker on and nothing happens, with no message. Inserts a long name and a message with emoji: it URL-encodes fine, but the name is concatenated into the WhatsApp text as `Nombre cliente: …` — a label the recipient sees, not the sender.

## Minor Observations

- No skip link, on a page with 8 nav links and 9 sections.
- Nav labels diverge from the headings they land on: "Servicios" → "Packs y precios", "Eventos" → "Así se vive", "Equipos" → "Equipamiento".
- The full-amber band's tagline is a `<p>` with `text-transform: uppercase` at display size — semantically a heading, marked up as body copy (detector: `call-caps-body`). The section has no heading at all, only an `aria-label`.
- Input and textarea placeholders measure 4.1:1 against the field background; 4.5:1 is required (detector: `low-contrast` ×2).
- The error message uses `text-accent-bright` — the same amber as prices and emphasis. In a one-accent system that is a structural choice, but an error that looks like emphasis is weak feedback.
- `kicker-above-heading` fires 7 times. It is the recorded signature of the system (DESIGN.md), so it is deliberate — but seven identical kicker/hairline/heading triads is also monotony. Dropping the kicker on one or two self-explanatory sections would cost nothing.
- `gpt-thin-border-wide-shadow` ×3 on the hero video tiles: the 1px amber border plus a 80px-blur shadow is the detector's "AI landing page" tell. It is doing real work here (framing video as a lit object), so this is a flag to be aware of, not a defect.
- The hero's third video tile is hidden below `sm`, so mobile shows two tiles with a staggered offset that reads as misalignment rather than composition.

## Questions to Consider

1. If the configurator were the primary path instead of the accordions, would the page need five packs at all — or five starting points?
2. What if the personalized LED screens were the hero image instead of the third video tile? It is the only claim on this page a competitor cannot copy tomorrow.
3. The contact form is a message composer, not a form. What would it look like if it were honest about that?
4. Is the page trying to serve three buyer segments at once (birthday, wedding, corporate) well enough that any one of them feels addressed?
