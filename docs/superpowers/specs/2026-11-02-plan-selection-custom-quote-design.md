# Plan Selection and Custom Quote Redesign

## Status

Awaiting user approval of this written design. The structure, visual direction, provisional pricing, and mobile priority were approved interactively through browser mockups.

## Intent

Redesign the DJ Pablito Dyr homepage so visitors can understand the five existing packs quickly or configure a custom service with an exact price. The experience should feel more premium, reduce comparison effort, and work especially well for the substantial share of visitors using mobile devices.

## Current Problem

The services section presents five long cards with repeated equipment details and inconsistent visual hierarchy. Visitors must read most of each card to understand the meaningful differences: duration, animation, karaoke, projection, and lighting. There is no way to price a combination that does not match an existing pack.

## Goals

- Preserve all five current packs, their prices, complete feature information, and WhatsApp contact path.
- Make the main differences between packs scannable before visitors open full details.
- Add an integrated custom configurator with deterministic, exact pricing and a visible breakdown.
- Carry the selected pack or custom configuration into a prefilled WhatsApp message.
- Establish a coherent Club Premium visual direction using the existing dark and yellow brand identity.
- Treat mobile as a primary design target, not a desktop layout scaled down.
- Preserve service structured data and existing page content outside the agreed redesign scope.

## Non-goals

- Online payment, reservation, availability, or calendar functionality.
- A backend pricing service or persistent quote storage.
- Exact automated pricing for events outside Santiago and its supported rural areas.
- Replacing the five packs with the configurator.
- Rebuilding unrelated sections such as videos, equipment, FAQ, biography, or contact.

## Anti-goals / Failure Conditions

- A custom total that is ambiguous, changes without explanation, or hides mandatory fees.
- Mobile horizontal comparison tables, hover-only information, tiny controls, or a sticky summary that covers content.
- Repeating every equipment specification in the collapsed card view.
- A configurator that visually dominates or removes the base-pack journey.
- A light or generic visual treatment that discards the existing brand identity.

## Constraints

- Keep the existing Astro, React, TypeScript, and Tailwind stack.
- Use Spanish (`es-CL`) for visitor-facing content.
- Keep the existing WhatsApp destination used by pack cards and contact: `56971768418`.
- The approved prices are provisional business configuration and must be centralized so they can be adjusted without rewriting UI logic.
- The calculated total is exact for the selected configuration; only date availability remains subject to confirmation.
- No new runtime dependency is required by this design.

## Considered Approaches

### A. Integrated packs and configurator — selected

Base packs and the custom configurator share one services section through two tabs. Visitors can compare packs, open their complete details, or switch to custom configuration without changing page.

Advantages: preserves the current journey, supports comparison, and makes personalization a natural next step. Tradeoff: the section needs disciplined disclosure to avoid becoming dense again.

### B. Configurator-first homepage

The custom wizard becomes the primary journey and packs move to a secondary position.

Advantages: highly guided flow. Tradeoff: weakens the proven pack journey and makes initial comparison harder. Rejected because the user explicitly wants base packs to remain prominent.

### C. Separate configurator page

The homepage links to a dedicated custom-quote page.

Advantages: more space for the configurator and a lighter homepage. Tradeoff: adds navigation and separates pack comparison from customization. Rejected in favor of one continuous experience.

## Visual Direction

**Club Premium**, selected over a warmer plum/peach direction and a light editorial direction.

- Near-black background with restrained yellow accents.
- Strong condensed display typography for major headings; highly legible sans-serif for controls and body copy.
- Sharper, more deliberate cards with generous spacing rather than large rounded containers everywhere.
- Yellow communicates selection, price, and primary action; it is not used as decoration on every element.
- Motion is subtle and never required to understand or operate the page.

The redesign scope covers the shared visual treatment of the navbar, hero, and services/custom-quote experience. Unrelated sections retain their content and behavior; only minimal shared color or typography alignment is allowed where necessary to avoid a broken transition.

## Base Pack Experience

- Two tabs: **Packs base** and **Arma tu evento**.
- Pack cards show name, duration, price, short event-oriented description, and three or four meaningful included features.
- Karaoke Dancing remains visually highlighted as the most selected pack.
- Complete equipment and feature lists, including each pack's existing extra-hour price, remain available through an accessible expandable detail control; nothing is removed from the offering.
- Each pack has a clear selection action that opens WhatsApp with the pack name and price prefilled.
- A sixth, visually secondary entry point leads to the custom configurator.
- Shared benefits and conditions remain visible without being repeated inside every card.
- No horizontal feature matrix is required on mobile.

## Custom Configurator

The configurator appears inside the same services section and uses four labeled groups: duration, experience, lighting, and location. Desktop uses configuration controls beside a sticky summary. Mobile uses one column and a compact sticky bottom total/action with access to the complete breakdown.

### Pricing

| Option | Price (CLP) |
| --- | ---: |
| Base: DJ, JBL sound, basic lighting, 4 hours | 150,000 |
| Additional hour, up to 8 total hours | 25,000 |
| Animation | 20,000 |
| Co-animation | 25,000 |
| Karaoke, two microphones, and screen | 30,000 |
| Music videos | 10,000 |
| Projector and screen upgrade | 20,000 |
| Smoke machine | 5,000 |
| Improved lighting | 10,000 |
| Advanced lighting | 25,000 |
| Professional lighting | 80,000 |
| Transport within Santiago | 0 |
| Rural-area transport | 20,000 |

### Calculation Rules

- Base price includes four hours. Only hours beyond four are added.
- Duration ranges from four to eight hours.
- Lighting levels are mutually exclusive, not additive.
- Selecting co-animation also selects animation. Removing animation removes co-animation.
- Selecting projector and screen also selects karaoke. Removing karaoke removes the projector upgrade.
- The projector replaces the standard karaoke screen; it is not presented as a second screen.
- Santiago transport costs zero. Rural transport adds 20,000.
- Location offers three explicit choices: Santiago, rural sector, and outside Santiago.
- Selecting outside Santiago replaces the automated total and reservation amount with a quote-by-WhatsApp state. The prefilled message states that the event is outside Santiago and requests transport pricing. Automated exact pricing is not attempted for that selection.
- Total is the sum of base duration, selected extras, one lighting level, and transport.
- The reservation amount displayed is exactly 20% of the resulting total.
- Format all visitor-facing values as Chilean pesos using the existing `$150.000` style.

Example: six hours, animation, karaoke, music videos, smoke, and advanced lighting costs 290,000 CLP custom, while the six-hour Karaoke Dancing pack remains 250,000 CLP. This preserves the value of bundled packs.

## Summary and WhatsApp Handoff

The summary always includes the current total and an itemized breakdown. It updates immediately after every valid change. It also displays the 20% reservation amount and states that the date is subject to availability.

The WhatsApp message must contain:

- That the request is for a custom event.
- Duration.
- Every selected extra.
- Lighting level.
- Location category.
- Exact total and reservation amount when the event is in Santiago or a rural sector.
- A request for manual transport pricing when the event is outside Santiago.

No personal information is collected by the configurator. The user continues in WhatsApp to confirm date, transport for events outside Santiago, and event details.

## Mobile Requirements

- Design and verify mobile layouts before desktop polish, including narrow screens around 320 px wide.
- Use a single-column pack and configurator layout.
- Make both tabs full-width and easy to reach.
- All interactive targets must be at least 44 by 44 CSS pixels with visible spacing between adjacent actions.
- Use steppers and explicit option controls rather than precision-dependent sliders.
- Keep the current total and primary action visible through a compact sticky bottom bar while configuring; respect safe-area insets.
- The sticky bar must not cover the final configuration controls, summary, footer, focused content, or WhatsApp action. Provide sufficient spacing and a non-sticky summary at the end.
- Let users expand the complete price breakdown without leaving the configurator.
- Do not rely on hover, horizontal scrolling, or densely packed chips for essential information.
- Long plan names, prices, and WhatsApp labels must wrap without clipping or forcing page-level horizontal overflow.

## Accessibility

- Use semantic tabs, buttons, groups, headings, and expandable details with appropriate state announcements.
- Maintain visible keyboard focus and logical keyboard order.
- Ensure text, prices, selected states, and controls meet WCAG AA contrast.
- Never communicate selection through yellow color alone; include a check, label, or other visual state.
- Respect reduced-motion preferences.
- Preserve useful alt text and avoid adding decorative media that slows mobile rendering.

## SEO and Content Integrity

- Preserve JSON-LD offers for the five base packs and their existing prices.
- Do not publish the dynamic custom configuration as a fixed structured-data offer.
- Preserve the complete pack content in the DOM or accessible disclosure content.
- Keep the existing Spanish metadata and local-business information unchanged unless a separate correction is requested.

## Builder Discretion

The builder may choose component boundaries, data-module names, and whether disclosure uses native HTML or React state, provided the behavior above is preserved. Prefer one shared source of truth for pack data, custom rates, labels, and calculation rules. Keep pricing calculation pure and independent from rendering so it can be tested directly.

## Acceptance Evidence

- All five packs retain their current prices and complete details.
- Every custom option and dependency follows the pricing rules above.
- The total and 20% reservation amount update correctly for representative minimum, maximum, and dependent-option configurations.
- Selecting outside Santiago removes the automated totals and produces a WhatsApp message requesting transport pricing.
- WhatsApp receives the selected pack or complete custom breakdown.
- Base-pack structured data remains valid and unchanged in meaning.
- Keyboard and screen-reader-oriented semantics work for tabs, disclosures, and option groups.
- Functional visual checks cover 320 px mobile, a typical modern phone, tablet, and desktop, with no page-level horizontal overflow or obscured controls.
- The production Astro build and relevant focused tests pass.
