# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three customer segments carry equal priority; no segment wins when the site
has to choose between them:

1. **Private celebrations** — someone organizing a birthday for an adult
   (roughly 30–60) who wants the party to actually happen without hiring and
   coordinating several vendors.
2. **Weddings and golden anniversaries** — couples and families planning a
   formal celebration with a longer lead time and higher production
   expectations.
3. **Companies and municipalities** — corporate and public events that need a
   formal quote, invoicing, and enough equipment for a large venue.

Also served, without being a priority segment: graduations and baptisms.

The person deciding is usually not a technical buyer. They are comparing DJs
on Instagram, they care whether the night will feel full, and they want to
know the price before they call.

## Product Purpose

DJ Pablito Dyr Producciones is a DJ, sound, and lighting production company
based in Maipú, Santiago, Chile. It runs private and institutional events end
to end: music, animation, karaoke, professional amplification, and stage
lighting, set up and operated by the same team.

The site exists to turn an Instagram or Google search into a booked event. It
does that by showing the five packages with their real prices, letting a
visitor build a custom quote, proving the track record with real Instagram
reels and reviews, and routing the conversation to WhatsApp.

Success: a visitor who arrived unsure of the price and unsure whether this DJ
is serious leaves knowing the price, what is included, and how to reserve.

## Positioning

Three claims the business can defend:

- **Complete own production.** DJ, animation, sound, and lighting come from
  one provider. The customer does not coordinate three separate companies on
  the day of the event.
- **Transparent published prices.** Every package price and every add-on is
  public on the site, plus a 20% reservation rate. This is uncommon in the
  category, where price is usually hidden until after a call.
- **Range of styles and music built around the client.** The owner names two
  differentiators explicitly: a wide repertoire of styles, and a playlist
  personalized to each party. Neither competitor's copy can claim this
  generically, so it belongs in the positioning, not only in the pack
  descriptions.
- **Years of experience and the best energy on the floor.** More than three
  years running events, from neighborhood venues in Maipú to municipal
  theatres, with the stated promise that the party stays up all night.

## Operating Context

- Parent brand: **DJ Pablito Dyr Producciones**, a small production company
  working in alliance with other brands for barwoman service, waiters
  (garzones), cocktail bar, and 360° camera.
- Booking channel: WhatsApp, with the number wired into the site. The quoted
  price is built from plan selection plus add-ons, hours, lighting level, and
  location zone.
- Proof lives on Instagram (`@dj_dyr_producciones`): reels of real events and
  reviews written by real clients, embedded on the site rather than
  re-hosted.
- Coverage: Santiago and the Región Metropolitana, with Maipú as base.
  Out-of-Santiago events are quoted individually.
- Visitor-facing copy is Chilean Spanish (`es-CL`). The customer writes and
  reads in Spanish; the business speaks plainly, not in corporate register.

## Capabilities and Constraints

Confirmed and implemented:

- Five packages with fixed published prices in CLP, from Celebration
  ($150.000, 4 h) through Premium Infinity ($400.000, 8 h), each with an
  extra-hour price, plus a comparison table that lays the differences side by
  side.
- A custom quote builder exists in the codebase (`CustomQuoteBuilder`, with
  contracts in `src/lib/quote.ts`) but is **hidden by default**: the
  "Arma tu evento" tab renders only when `ServicesSection` receives
  `showCustomPack`. It was hidden at the client's request, not removed. Do not
  advertise a configurator in copy unless it is switched back on.
- Each plan includes 2 LED screens personalized with the name of the person
  being celebrated. Must not be dropped from package descriptions. The owner
  corrected the positioning: this is **not** the differentiator, so the
  marketing copy must not lead with it.
- Equipment is documented with photos and specs as a separate view, so a
  visitor can judge whether the gear suits the venue.
- FAQ answers the recurring questions: zones covered, price, pack differences,
  what animation and karaoke include, payment, event types, lighting, and
  extra-hour cost.
- Site is statically built and mobile-first; most visitors arrive from a phone.

Commercial facts confirmed by the owner as current and binding: all five plan
prices, the add-on prices, and the 20% reservation rate.

Undecided, do not invent an answer:

- Whether prices include IVA or are quoted as-is.
- Team size behind the "producciones" label and who operates lighting when two
  events overlap.

Resolved:

- **Business phone: `+56 9 7176 8418`.** Confirmed by the owner. Every CTA,
  the visible contact number, the WhatsApp deep link, and the structured data
  must use it. `+56 9 9429 6961` was a leftover and is not the business line.

## Brand Commitments

- Name: **DJ Pablito Dyr Producciones**, shortened to **DJ Pablito Dyr**.
- Tagline in use: **"Tu evento, nuestra pasión"**.
- Voice: direct, warm, confident, first person from the DJ. Speaks to the
  person organizing the party, not to a procurement department.
- Audience-facing language is Chilean Spanish; do not translate the site into
  another language without an explicit request.
- Existing assets are binding: the logo (`public/logo.png`), the professional
  portrait, the hero video loops, the equipment photography, and the
  Instagram-sourced reviews with their real handles.

## Evidence on Hand

Real, verifiable material — future work must use it rather than fabricate proof:

- **8 client reviews** with real Instagram handles and quotes
  (`src/data/testimonials.ts`), one marked as the highlighted review.
- **4 Instagram reels** of real events embedded on the site
  (`src/components/Eventos.astro`): golden anniversary, a birthday in Calera de
  Tango, a private party, and a municipal event at Teatro Oriente.
- **Video work** on YouTube (`@VDJDP`) and video embeds on the site.
- **Equipment photography** with model references — JBL speakers, LED spider
  lights, beam 360°, LED bars, microphones, projector (`src/assets/equipments/`).
- **Hero video loops** of actual parties and booth setups (`src/assets/hero/`).
- **Professional portrait** of the DJ (`src/assets/portrait.webp`).

Absent, and not to be invented: named corporate clients, attendance figures,
awards, press coverage, or a founding date beyond "more than three years".

## Product Principles

1. **The price is never a surprise.** Published prices and the quote builder
   exist because hidden pricing is the category's default failure. Any design
   that hides or softens the numbers works against the business.
2. **Proof over adjectives.** Real reels, real handles, real gear photos. When
   there is no evidence for a claim, drop the claim.
3. **One provider, one night, no coordination work for the customer.** The
   offer is production completeness, and the site should read that way.
4. **Every segment gets an entry point.** Birthdays, weddings, and corporate
   buyers use the same site; the packages and the quote builder must let each
   one find their size without a separate funnel.
5. **The phone decides.** Most of these visitors arrive on mobile from
   Instagram. Desktop polish that degrades the phone experience is a net loss.
