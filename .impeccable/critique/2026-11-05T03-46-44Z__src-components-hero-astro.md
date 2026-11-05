---
target: src/components/Hero.astro
total_score: 18
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 0
p1_count: 2
p2_count: 2
target_identity: "file:/Users/n4m999/Documents/Repos/dj-pablito-dyr/src/components/Hero.astro"
target_fingerprint: "sha256:03f22a546c78532a944ab81f304bc277612e4277d9ad2580051a53b26c250c76"
target_path: /Users/n4m999/Documents/Repos/dj-pablito-dyr/src/components/Hero.astro
timestamp: 2026-11-05T03-46-44Z
slug: src-components-hero-astro
---
# Critique: hero (src/components/Hero.astro)

Method: ⚠️ DEGRADED — single-context (subagent tool denied by runtime permission)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Video playback is state-aware (pauses on hidden tab and reduced-motion); the folded entrance is the only status the fold needs. |
| 2 | Match System / Real World | 3 | Spanish is fluent and domain-true, but the proof paragraph speaks in category table stakes instead of the owner's own claims. |
| 3 | User Control and Freedom | 3 | Two exits, no autoplay audio, motion respects the OS setting. |
| 4 | Consistency and Standards | 3 | System-consistent; the eyebrow duplicates the header wordmark's job. |
| 5 | Error Prevention | n/a | A fold has no input and no destructive path. |
| 6 | Recognition Rather Than Recall | 3 | Everything the fold claims is visible, but the price — the fact the positioning rests on — is one screen away. |
| 7 | Flexibility and Efficiency | n/a | No accelerator path exists or is expected on a hero. |
| 8 | Aesthetic and Minimalist Design | 3 | Strong and confident; one crop wastes the best asset and the mobile fold shows nothing after the media. |
| 9 | Error Recovery | n/a | No error surface exists on a hero. |
| 10 | Help and Documentation | n/a | Help lives in the FAQ; a hero does not carry it. |
| **Total** | | **18/24 (75%)** | **Good** |

Heuristics 5, 7, 9 and 10 scored n/a: a single fold has no input, no error, no accelerator and no help surface. Maximum renormalized to 24.

## Design Specificity Verdict

**LLM assessment**: The composition is authored: one dominant booth tile, two supporting, a 96px two-line headline, and an entrance that lands in reading order. It reads as a working DJ's page, not a wedding template. The problem is that its *voice* is not as specific as its *form*: the paragraph recites the category ("sonido, luces, karaoke y la mejor animación") and lists event types, while the two claims that no neighbouring DJ could copy — one provider for the whole production, and published prices — are absent. The most differentiating object on the page is even present as an image: the LED sign with the guest of honor's name. It is the smallest tile and it is cropped to illegibility.

**Deterministic scan**: `impeccable detect` over `src/components/Hero.astro` returns 0 findings. In the browser, the hero contributes `hero-eyebrow-chip` at desktop and shares the site-wide `kicker-above-heading`, `radial-spotlight-glow` and `overused-font` (Montserrat). `gpt-thin-border-wide-shadow` no longer fires: it used to hit all three hero tiles as "1px border + 80px shadow repeated across the row", and the asymmetric cluster broke that repetition. That is measurable evidence the hierarchy change did what it was meant to.

**Visual overlays**: injection succeeded in one fresh tab at 1440x900 and 390x844. 11 anti-patterns at desktop, 10 at mobile, zero contrast failures in the hero at either size.

## Overall Impression

The fold finally has a subject and a voice of type. What it still lacks is a reason to trust it in the first five seconds: it says what a DJ does, not what this one does that others cannot. Fix the paragraph and the crop and the hero stops being handsome and starts being persuasive.

## What's Working

1. **One dominant object.** The booth tile at 320x481 owns the fold and the DJ is visibly operating his own gear — the product is the person. Before the change, three equal tiles gave the eye nowhere to land.
2. **Type at full strength.** 96px Bebas Neue, two lines, 0.88 leading, balanced: "TU EVENTO," / "NUESTRA PASIÓN". It reads as a poster, not a banner.
3. **Alive without ornament.** Looping footage plus a 620ms staggered rise is the entire motion budget, and it is enough. Nothing was added that a competitor could point at as decoration.

## Priority Issues

1. **[P1] The fold sells the category, not this business.**
   - What: The paragraph reads "Ya hicimos cumpleaños, graduaciones, bodas de oro y hasta eventos municipales. Tú invitas, eliges la música y nosotros montamos todo: sonido, luces, karaoke y la mejor animación." It names event types and table-stakes services. PRODUCT.md's defensible claims — complete own production from one provider, transparent published prices — are not on the fold, and no price appears anywhere above it.
   - Why it matters: every competitor's landing page says "sonido, luces y animación". The visitor arrives from Instagram with two questions: how much, and are you serious. The fold answers neither.
   - Fix: one sentence naming the mechanism and the anchor, drawing only on confirmed facts, for example: "Sonido, luces, karaoke y animación con una sola productora, desde $150.000." No invented claims.
   - Suggested command: `$impeccable clarify`

2. **[P1] Three identity marks before any promise.**
   - What: On mobile the order is logo, then the eyebrow "DJ · Sonido · Iluminación · Santiago", then the headline, then the paragraph. Both the logo and the eyebrow repeat what the fixed header already says. The detector flags `hero-eyebrow-chip` at desktop, and the craft floor treats an eyebrow above a heading as a ban.
   - Why it matters: it delays the first real sentence by two blocks on the smallest screen, and it makes the site's own signature device (the kicker, used in eight sections) compete with the wordmark right above it.
   - Fix: delete the hero eyebrow. If the kicker is removed, remove it across all eight sections in the same pass so the system stays coherent.
   - Suggested command: `$impeccable distill`

3. **[P2] The differentiator is cropped out of legibility.**
   - What: The LED sign tile renders "FELIZ TRIPLE CUMPLE" as "ELIZ / IPLE / MPLE" in a 188x235 frame. It is the only asset on the page a competitor cannot reproduce.
   - Why it matters: the visitor sees an abstract bright rectangle instead of the proof that their guest's name gets made into a sign.
   - Fix: give that tile a wider aspect or a different `object-position` so the sentence survives, or promote it to the dominant slot.
   - Suggested command: `$impeccable layout`

4. **[P2] The hero's WhatsApp button sends an empty message; the contact form sends a written one.**
   - What: `Hero.astro` links to `https://wa.me/56971768418` with no `?text=`, while `Contact` builds a prefilled message with name, date, event type and message.
   - Why it matters: the fold is the highest-intent click on the page and it produces the emptiest message. The user lands in a chat with nothing typed, on the device where typing costs the most.
   - Fix: prefill a short, honest opener from the hero, e.g. "Hola, vengo de la web. Quiero cotizar un evento."
   - Suggested command: `$impeccable harden`

5. **[P3] The mobile fold shows nothing of what follows.**
   - What: the hero measures ~850px at 390x844, so the media cluster fills the screen and the next section never peeks.
   - Why it matters: no scroll cue and no sense of what is below; the visitor has to take the scroll on faith.
   - Fix: trim mobile padding and the media cluster's minimum height so the next hairline shows at the fold bottom.
   - Suggested command: `$impeccable adapt`

## Persona Red Flags

**Jordan (First-Timer)**: reads the paragraph and still cannot answer "cuánto sale" — the word precio appears only after a scroll. The LED sign reads as an abstract bright photo because the text is cut, so the one thing that would make him say "ah, hacen eso" does not land.

**Casey (Distracted Mobile User)**: the two CTAs are full-width and inside the thumb zone, and the buttons are 48px tall, so the primary action is easy. But she gets ~850px of hero first, and the prefilled WhatsApp message she would expect from a site this polished is missing — she arrives at an empty chat and has to compose from scratch.

**Riley (Stress Tester)**: clicks the hero's WhatsApp button and the contact form's button in sequence and gets two different behaviours — one empty chat, one prefilled — from two controls that both say "escríbenos". Also checks the heading: "Tu evento, nuestra pasión" appears again at 7xl in the mid-page band, so the H1's weight is spent twice.

## Minor Observations

- The tagline is rendered at display scale twice: as the H1 and again as the mid-page CTA band's heading. The second use dilutes the first.
- `radial-spotlight-glow` on the section background is sanctioned by DESIGN.md's Warm Light Rule; not a defect.
- `overused-font` for Montserrat remains a taste flag against a recorded brand pairing.
- No low-contrast text anywhere in the fold at 390 or 1440.
- The media cluster is flush to the container's right edge while the text starts at the left gutter; deliberate asymmetry, and it now reads as one composition rather than three floating tiles.

## Questions to Consider

1. If the personalized LED sign is the only claim a competitor cannot copy, why is it the smallest tile and the only one that is cropped?
2. What would the fold look like if it answered "cuánto sale" before the first scroll?
3. Does the hero need its own logo when the header already carries the wordmark 64px above it?
4. Should the tagline be spent once, as the H1, instead of twice?
