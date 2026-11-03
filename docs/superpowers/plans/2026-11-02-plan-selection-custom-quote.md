# Plan Selection and Custom Quote Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dense services cards with a Club Premium experience that compares the five existing packs and prices a custom configuration exactly, with mobile as the primary target.

**Architecture:** Keep Astro as the page shell and structured-data owner. Add one React island for the interactive services section, backed by a shared TypeScript data module and a pure quote-calculation module. Reuse the existing WhatsApp flow rather than adding a backend or booking service.

**Tech Stack:** Astro 4, React 18, TypeScript, Tailwind CSS 3, Vitest, React Testing Library, pnpm.

**Spec:** `docs/superpowers/specs/2026-11-02-plan-selection-custom-quote-design.md`

## Global Constraints

- Keep all five existing packs and their prices.
- Spanish (`es-CL`) for all visitor-facing copy.
- Existing WhatsApp number: `56971768418`.
- No new runtime dependency.
- Exact custom totals only for Santiago and rural sectors; outside Santiago is quote-by-WhatsApp.
- Lighting choices are mutually exclusive.
- Co-animation requires animation; projector requires karaoke.
- Duration is clamped from 4 to 8 hours.
- Five existing `Offer` entries remain in JSON-LD with unchanged meaning and prices.
- Mobile is designed and verified at 320 px before desktop polish.
- Interactive targets are at least 44×44 CSS pixels.
- No commit gets AI attribution; use conventional commits.

## Review Focus

- A dependent option is left selected after its prerequisite is removed, or the total double-charges an upgrade.
- The mobile quote bar covers the last control, the WhatsApp action, or the contact section.
- Long plan names, prices, or labels cause horizontal overflow at 320 px.
- Selecting “Fuera de Santiago” still displays an automated total or reservation amount.
- Tabs, option groups, disclosures, and the WhatsApp handoff lose keyboard or screen-reader access, or the message omits the configuration.

---

### Task 1: Quote Domain and Test Harness

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml` (generated)
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/data/services.ts`
- Create: `src/lib/quote.ts`
- Test: `src/lib/quote.test.ts`

**Interfaces:**
- Consumes: existing pack copy from `src/components/Services.astro`.
- Produces:
  - `SERVICE_PLANS: readonly ServicePlan[]`
  - `WHATSAPP_NUMBER: string`
  - `RESERVATION_RATE: number`
  - `BASE_PACKAGE: { label: string; amount: number; includedHours: number; maxHours: number; extraHourAmount: number }`
  - `CUSTOM_EXTRA_OPTIONS: readonly { id: CustomExtraId; label: string; amount: number; requires?: CustomExtraId }[]`
  - `LIGHTING_OPTIONS: readonly { id: LightingLevel; label: string; amount: number }[]`
  - `LOCATION_OPTIONS: readonly { id: LocationZone; label: string; amount: number | null }[]`
  - `DEFAULT_QUOTE_SELECTION: QuoteSelection`
  - `normalizeQuoteSelection(selection: QuoteSelection): QuoteSelection`
  - `toggleQuoteExtra(selection: QuoteSelection, extra: CustomExtraId): QuoteSelection`
  - `calculateCustomQuote(selection: QuoteSelection): QuoteResult`
  - `formatCLP(amount: number): string`
  - `buildCustomQuoteMessage(result: QuoteResult): string`
  - `buildCustomQuoteWhatsAppUrl(result: QuoteResult): string`
  - `buildPackWhatsAppUrl(plan: ServicePlan): string`
  - Types:
    - `ServicePlan { id: ServicePlanId; title: string; price: number; hours: number; description: string; highlights: readonly string[]; features: readonly string[]; featured: boolean }`
    - `CustomExtraId = "animation" | "coanimation" | "karaoke" | "projector" | "videos" | "smoke"`
    - `LightingLevel = "basic" | "improved" | "advanced" | "pro"`
    - `LocationZone = "santiago" | "rural" | "outside"`
    - `QuoteSelection { hours: number; extras: readonly CustomExtraId[]; lighting: LightingLevel; location: LocationZone }`
    - `QuoteLine { label: string; amount: number }`
    - `ExactQuote { kind: "exact"; selection: QuoteSelection; lines: readonly QuoteLine[]; total: number; deposit: number }`
    - `ManualQuote { kind: "manual"; selection: QuoteSelection; lines: readonly QuoteLine[]; total: null; deposit: null }`
    - `QuoteResult = ExactQuote | ManualQuote`

- [ ] **Step 1: Install the test-only toolchain and add scripts**

Run:

```bash
pnpm add -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

Add these scripts to `package.json` without removing existing scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    restoreMocks: true,
  },
});
```

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(cleanup);
```

- [ ] **Step 2: Write the failing quote-domain tests**

Create `src/lib/quote.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { SERVICE_PLANS } from "../data/services";
import {
  buildCustomQuoteMessage,
  buildCustomQuoteWhatsAppUrl,
  buildPackWhatsAppUrl,
  calculateCustomQuote,
  formatCLP,
  normalizeQuoteSelection,
  toggleQuoteExtra,
  type QuoteSelection,
} from "./quote";

const base: QuoteSelection = {
  hours: 4,
  extras: [],
  lighting: "basic",
  location: "santiago",
};

describe("calculateCustomQuote", () => {
  it("prices the minimum configuration exactly", () => {
    expect(calculateCustomQuote(base)).toMatchObject({
      kind: "exact",
      total: 150000,
      deposit: 30000,
    });
  });

  it("prices maximum hours, every extra, pro lighting, and rural transport", () => {
    expect(
      calculateCustomQuote({
        hours: 8,
        extras: [
          "animation",
          "coanimation",
          "karaoke",
          "projector",
          "videos",
          "smoke",
        ],
        lighting: "pro",
        location: "rural",
      }),
    ).toMatchObject({
      kind: "exact",
      total: 460000,
      deposit: 92000,
    });
  });

  it("clamps duration to the supported range", () => {
    expect(calculateCustomQuote({ ...base, hours: 2 }).selection.hours).toBe(4);
    expect(calculateCustomQuote({ ...base, hours: 12 }).selection.hours).toBe(8);
    expect(calculateCustomQuote({ ...base, hours: 6.9 }).selection.hours).toBe(6);
  });

  it("returns a manual quote without totals outside Santiago", () => {
    expect(calculateCustomQuote({ ...base, location: "outside" })).toMatchObject({
      kind: "manual",
      total: null,
      deposit: null,
    });
  });
});

describe("selection dependencies", () => {
  it("adds animation when co-animation is selected", () => {
    const result = normalizeQuoteSelection({
      ...base,
      extras: ["coanimation"],
    });
    expect(result.extras).toEqual(["animation", "coanimation"]);
  });

  it("adds karaoke when projector is selected", () => {
    const result = normalizeQuoteSelection({
      ...base,
      extras: ["projector"],
    });
    expect(result.extras).toEqual(["karaoke", "projector"]);
  });

  it("removes co-animation when animation is removed", () => {
    const result = toggleQuoteExtra(
      { ...base, extras: ["animation", "coanimation"] },
      "animation",
    );
    expect(result.extras).toEqual([]);
  });

  it("removes projector when karaoke is removed", () => {
    const result = toggleQuoteExtra(
      { ...base, extras: ["karaoke", "projector"] },
      "karaoke",
    );
    expect(result.extras).toEqual([]);
  });
});

describe("formatting and handoff", () => {
  it("formats Chilean pesos with dots", () => {
    expect(formatCLP(150000)).toBe("$150.000");
    expect(formatCLP(460000)).toBe("$460.000");
  });

  it("includes the full custom configuration and exact total in the WhatsApp message", () => {
    const result = calculateCustomQuote({
      hours: 6,
      extras: ["animation", "karaoke"],
      lighting: "advanced",
      location: "rural",
    });
    const message = buildCustomQuoteMessage(result);
    expect(message).toContain("6 horas");
    expect(message).toContain("Animación");
    expect(message).toContain("Karaoke + 2 micrófonos");
    expect(message).toContain("Avanzada");
    expect(message).toContain("Sector rural");
    expect(message).toContain("$295.000");
    expect(message).toContain("$59.000");
  });

  it("requests transport pricing instead of a total outside Santiago", () => {
    const result = calculateCustomQuote({ ...base, location: "outside" });
    const message = buildCustomQuoteMessage(result);
    expect(message).toContain("Fuera de Santiago");
    expect(message).toContain("cotización del traslado");
    expect(message).not.toContain("Total exacto");
  });

  it("encodes the custom quote URL", () => {
    const url = buildCustomQuoteWhatsAppUrl(calculateCustomQuote(base));
    expect(url).toContain("https://wa.me/56971768418?text=");
    expect(decodeURIComponent(url)).toContain("Duración: 4 horas");
  });

  it("builds a pack URL for every base plan", () => {
    for (const plan of SERVICE_PLANS) {
      expect(decodeURIComponent(buildPackWhatsAppUrl(plan))).toContain(plan.title);
    }
  });
});
```

- [ ] **Step 3: Run the quote tests and verify they fail**

Run:

```bash
pnpm exec vitest run src/lib/quote.test.ts
```

Expected: failure because `src/data/services.ts` or `src/lib/quote.ts` does not exist.

- [ ] **Step 4: Implement the data module**

Create `src/data/services.ts`. Define `ServicePlanId` as the five current titles in kebab case, `ServicePlan` with `id`, `title`, `price: number`, `hours: number`, `description`, `highlights: readonly string[]`, `features: readonly string[]`, and `featured: boolean`. Migrate the five entries verbatim from `src/components/Services.astro`, converting prices to numbers. Use these highlights:

```ts
celebration: ["DJ", "Sonido JBL", "Iluminación básica"]
fullDancing: ["DJ + animación", "Humo", "Iluminación mejorada"]
karaokeDancing: ["Karaoke", "DJ + animación", "Iluminación avanzada", "2 micrófonos"]
goldKaraoke: ["Proyector + telón", "Karaoke", "Iluminación avanzada", "Videos"]
premiumInfinity: ["Coanimación", "Proyector + telón", "Iluminación profesional", "Karaoke"]
```

Keep Karaoke Dancing as `featured: true`. Export the custom rate card and option labels exactly as specified in the design document, including all visitor-facing copy. Export `WHATSAPP_NUMBER = "56971768418"` and `RESERVATION_RATE = 0.2`.

- [ ] **Step 5: Implement the pure quote module**

Create `src/lib/quote.ts` with the exported interfaces from the Interfaces block. Implement:

- `formatCLP`: prefix `$` and format the rounded integer with `toLocaleString("es-CL")`.
- `normalizeQuoteSelection`: convert hours with `Math.trunc`, clamp to 4–8, add animation when co-animation appears, drop co-animation when animation is absent, add karaoke when projector appears, drop projector when karaoke is absent, and keep extras in rate-card order.
- `toggleQuoteExtra`: add or remove one extra, then normalize.
- `calculateCustomQuote`: build line items for base, additional hours, each extra, selected non-basic lighting, and rural transport. Return an exact quote with total and 20% deposit for Santiago/rural, or a manual quote with `total: null` and `deposit: null` outside Santiago.
- Message builders: use the Spanish labels from the data module. Custom messages include duration, extras or “Sin extras”, lighting, location, exact total/deposit when exact, and the manual transport request when applicable. Pack messages include the pack title and formatted price.
- URL builders: encode the message with `encodeURIComponent` and prefix `https://wa.me/${WHATSAPP_NUMBER}?text=`.

- [ ] **Step 6: Run the tests and verify they pass**

Run:

```bash
pnpm exec vitest run src/lib/quote.test.ts
```

Expected: all quote tests pass.

- [ ] **Step 7: Commit**

```bash
git add package.json pnpm-lock.yaml vitest.config.ts src/test/setup.ts src/data/services.ts src/lib/quote.ts src/lib/quote.test.ts
git commit -m "feat: add custom quote pricing domain"
```

### Task 2: Accessible Pack Card

**Files:**
- Create: `src/components/PlanCard.tsx`
- Test: `src/components/PlanCard.test.tsx`

**Interfaces:**
- Consumes: `ServicePlan`, `formatCLP`, `buildPackWhatsAppUrl`.
- Produces: `PlanCard({ plan }: { plan: ServicePlan })`.

- [ ] **Step 1: Write the failing pack-card test**

Create `src/components/PlanCard.test.tsx` using `renderToStaticMarkup`:

```tsx
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { SERVICE_PLANS } from "../data/services";
import PlanCard from "./PlanCard";

describe("PlanCard", () => {
  it("renders every plan with its price, highlights, complete features, and WhatsApp action", () => {
    for (const plan of SERVICE_PLANS) {
      const html = renderToStaticMarkup(<PlanCard plan={plan} />);
      expect(html).toContain(plan.title);
      expect(html).toContain(plan.description);
      expect(html).toContain(`$${plan.price.toLocaleString("es-CL")}`);
      for (const highlight of plan.highlights) expect(html).toContain(highlight);
      for (const feature of plan.features) expect(html).toContain(feature);
      expect(html).toContain("<details");
      expect(html).toContain("<summary");
      expect(html).toContain("wa.me/56971768418");
    }
  });

  it("marks the featured plan and gives every action an accessible name", () => {
    const html = renderToStaticMarkup(
      <PlanCard plan={SERVICE_PLANS.find((plan) => plan.featured)!} />,
    );
    expect(html).toContain("Más elegido");
    expect(html).toContain("Elegir Karaoke Dancing");
    expect(html).toContain("Ver todo lo incluido en Karaoke Dancing");
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
pnpm exec vitest run src/components/PlanCard.test.tsx
```

Expected: failure because `PlanCard.tsx` does not exist.

- [ ] **Step 3: Implement `PlanCard`**

Render a semantic `<article>` with a compact header, formatted price, duration, description, highlights, and an `<a>` named `Elegir ${plan.title}` pointing to `buildPackWhatsAppUrl(plan)`. Add a native `<details>` whose `<summary>` is `Ver todo lo incluido en ${plan.title}` and whose content lists every feature. Keep all feature text in the DOM even when collapsed. Apply the Club Premium card treatment from the approved mockup and use yellow only for price, featured state, and primary action.

- [ ] **Step 4: Run the test and verify it passes**

Run:

```bash
pnpm exec vitest run src/components/PlanCard.test.tsx
```

Expected: all pack-card tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/PlanCard.tsx src/components/PlanCard.test.tsx
git commit -m "feat: add accessible service plan card"
```

### Task 3: Integrated Services Tabs and Custom Builder

**Files:**
- Create: `src/components/ServicesSection.tsx`
- Create: `src/components/CustomQuoteBuilder.tsx`
- Test: `src/components/ServicesSection.test.tsx`
- Modify: `src/components/Services.astro`
- Delete: `src/components/Service.tsx`

**Interfaces:**
- Consumes: all exports from `src/data/services.ts` and `src/lib/quote.ts`; `PlanCard`.
- Produces: `ServicesSection()` as the single interactive services island; `CustomQuoteBuilder()` rendering the four configuration groups, live summary, and handoff.

- [ ] **Step 1: Write the failing interaction tests**

Create `src/components/ServicesSection.test.tsx` with React Testing Library:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SERVICE_PLANS } from "../data/services";
import ServicesSection from "./ServicesSection";

describe("ServicesSection", () => {
  it("starts on the packs tab and renders every plan", () => {
    render(<ServicesSection />);
    expect(screen.getByRole("tab", { name: "Packs base" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    for (const plan of SERVICE_PLANS) expect(screen.getByText(plan.title)).toBeInTheDocument();
  });

  it("switches to the custom builder and updates hours, total, and deposit", async () => {
    const user = userEvent.setup();
    render(<ServicesSection />);
    await user.click(screen.getByRole("tab", { name: "Arma tu evento" }));
    expect(screen.getByRole("tab", { name: "Arma tu evento" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByTestId("quote-total")).toHaveTextContent("$150.000");
    await user.click(screen.getByRole("button", { name: "Agregar una hora" }));
    expect(screen.getByTestId("quote-total")).toHaveTextContent("$175.000");
    expect(screen.getByTestId("quote-deposit")).toHaveTextContent("$35.000");
  });

  it("enforces option dependencies and updates the total", async () => {
    const user = userEvent.setup();
    render(<ServicesSection />);
    await user.click(screen.getByRole("tab", { name: "Arma tu evento" }));
    const coanimation = screen.getByRole("button", { name: /Coanimación/ });
    const animation = screen.getByRole("button", { name: /^Animación/ });
    await user.click(coanimation);
    expect(animation).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("quote-total")).toHaveTextContent("$195.000");
    await user.click(animation);
    expect(coanimation).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByTestId("quote-total")).toHaveTextContent("$150.000");
  });

  it("requests manual transport pricing outside Santiago", async () => {
    const user = userEvent.setup();
    render(<ServicesSection />);
    await user.click(screen.getByRole("tab", { name: "Arma tu evento" }));
    await user.click(screen.getByRole("button", { name: /Fuera de Santiago/ }));
    expect(screen.getByRole("link", { name: /Cotización de traslado por WhatsApp/ })).toBeInTheDocument();
    expect(screen.queryByText("Reserva con el 20%")).not.toBeInTheDocument();
  });

  it("puts the full configuration in the WhatsApp link", async () => {
    const user = userEvent.setup();
    render(<ServicesSection />);
    await user.click(screen.getByRole("tab", { name: "Arma tu evento" }));
    await user.click(screen.getByRole("button", { name: /Karaoke/ }));
    const summary = screen.getByTestId("desktop-quote-summary");
    const link = within(summary).getByRole("link", {
      name: /Enviar configuración por WhatsApp/,
    });
    const decoded = decodeURIComponent(link.getAttribute("href") ?? "");
    expect(decoded).toContain("Karaoke + 2 micrófonos");
    expect(decoded).toContain("Duración: 4 horas");
  });
});
```

- [ ] **Step 2: Run the tests and verify they fail**

Run:

```bash
pnpm exec vitest run src/components/ServicesSection.test.tsx
```

Expected: failure because `ServicesSection.tsx` does not exist.

- [ ] **Step 3: Implement `CustomQuoteBuilder`**

Render four fieldsets with legends `Duración`, `Experiencia`, `Iluminación`, and `Ubicación`. Use buttons with `aria-pressed` for extras and location; use native radio inputs for lighting so exactly one can be chosen. Selected extra and location buttons must show a visible check in addition to yellow styling; the active tab must use more than color to indicate selection. Use labeled stepper buttons `Agregar una hora` and `Quitar una hora`, both at least 44×44 px. Compute the normalized selection and quote on every render through the pure domain functions. Render every line item, `Total exacto`, and `Reserva con el 20%` for exact quotes. For manual quotes, omit both totals and show the label `Cotización de traslado por WhatsApp`.

The itemized desktop summary must expose `data-testid="desktop-quote-summary"`. The exact total and deposit elements must expose `data-testid="quote-total"` and `data-testid="quote-deposit"`. The WhatsApp link must be named `Enviar configuración por WhatsApp` for exact quotes and `Cotización de traslado por WhatsApp` for manual quotes. Keep the default summary visible on desktop; use a stacked summary on mobile until Task 4 adds the sticky treatment.

- [ ] **Step 4: Implement `ServicesSection` and integrate it**

Render two buttons with `role="tab"`, `aria-selected`, and `aria-controls`, plus one active panel with `role="tabpanel"`. Start on `Packs base`. Render only the active panel and unmount the inactive one, avoiding duplicate prices and focusable controls. Render all five `PlanCard`s in a responsive grid and a secondary custom entry card. Render `CustomQuoteBuilder` when the custom tab is active.

Modify `Services.astro` to:

- Import `SERVICE_PLANS`.
- Build the same five `Offer` JSON-LD entries from `SERVICE_PLANS`, preserving prices, descriptions, currency, provider, area, and URL.
- Render `<ServicesSection client:load />` inside `<section id="services">`.
- Keep the existing conditions content about transport, equipment, reservation, free LED names, and payment, restyled to match Club Premium.
- Remove the old `featured`/`regular` card split.
- Delete `src/components/Service.tsx` after no imports remain.

- [ ] **Step 5: Run the interaction tests and verify they pass**

Run:

```bash
pnpm exec vitest run src/components/ServicesSection.test.tsx
```

Expected: all five interaction tests pass.

- [ ] **Step 6: Verify Astro and TypeScript integration**

Run:

```bash
pnpm build
```

Expected: `astro check` and `astro build` complete without errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/ServicesSection.tsx src/components/CustomQuoteBuilder.tsx src/components/ServicesSection.test.tsx src/components/Services.astro
git rm src/components/Service.tsx
git commit -m "feat: add integrated pack and custom quote experience"
```

### Task 4: Mobile Quote Bar and Responsive Hardening

**Files:**
- Create: `src/lib/useIsInView.ts`
- Test: `src/lib/useIsInView.test.tsx`
- Modify: `src/components/CustomQuoteBuilder.tsx`
- Modify: `src/components/ServicesSection.tsx`
- Modify: `src/components/ServicesSection.test.tsx`

**Interfaces:**
- Consumes: existing builder and quote result.
- Produces: `useIsInView<T extends Element>(): [RefObject<T>, boolean]`, where `false` means the services panel has left the viewport and the fixed mobile summary must stop intercepting or receiving focus.

- [ ] **Step 1: Write the failing in-view hook test**

Create `src/lib/useIsInView.test.tsx`:

```tsx
import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useIsInView } from "./useIsInView";

let callback: IntersectionObserverCallback = () => {};
const observe = vi.fn();
const disconnect = vi.fn();

class MockIntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds = [];
  constructor(next: IntersectionObserverCallback) {
    callback = next;
  }
  observe = observe;
  disconnect = disconnect;
  unobserve = vi.fn();
  takeRecords = () => [];
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
afterEach(() => vi.clearAllMocks());

function Probe() {
  const [ref, inView] = useIsInView<HTMLDivElement>();
  return <div ref={ref}>{inView ? "in-view" : "out-of-view"}</div>;
}

describe("useIsInView", () => {
  it("tracks intersection and disconnects on unmount", () => {
    const { unmount } = render(<Probe />);
    expect(screen.getByText("in-view")).toBeInTheDocument();
    act(() =>
      callback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      ),
    );
    expect(screen.getByText("out-of-view")).toBeInTheDocument();
    act(() =>
      callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      ),
    );
    expect(screen.getByText("in-view")).toBeInTheDocument();
    expect(observe).toHaveBeenCalledTimes(1);
    unmount();
    expect(disconnect).toHaveBeenCalledTimes(1);
    vi.unstubAllGlobals();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
pnpm exec vitest run src/lib/useIsInView.test.tsx
```

Expected: failure because `useIsInView.ts` does not exist.

- [ ] **Step 3: Implement `useIsInView`**

Return a `RefObject<T>` and a boolean that starts `true`. In `useEffect`, return early when `IntersectionObserver` is unavailable; otherwise observe the ref element and update state from `entry.isIntersecting`. Disconnect on cleanup.

- [ ] **Step 4: Write the failing mobile-bar test**

Append this test to `src/components/ServicesSection.test.tsx`, adding `act` to the Testing Library import and `vi` to the Vitest import:

```tsx
it("hides mobile quote controls out of view and switches to manual transport", async () => {
  let observerCallback: IntersectionObserverCallback = () => {};
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      root = null;
      rootMargin = "";
      thresholds = [];
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    },
  );

  const user = userEvent.setup();
  render(<ServicesSection />);
  await user.click(screen.getByRole("tab", { name: "Arma tu evento" }));
  const bar = screen.getByTestId("mobile-quote-bar");
  expect(bar).toHaveAttribute("aria-hidden", "false");
  expect(within(bar).getByText("Ver desglose")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: /Fuera de Santiago/ }));
  expect(
    within(bar).getByRole("link", {
      name: /Cotización de traslado por WhatsApp/,
    }),
  ).toBeInTheDocument();
  act(() =>
    observerCallback(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    ),
  );
  expect(bar).toHaveAttribute("aria-hidden", "true");
  vi.unstubAllGlobals();
});
```

- [ ] **Step 5: Run the test and verify it fails**

Run:

```bash
pnpm exec vitest run src/components/ServicesSection.test.tsx
```

Expected: failure because no element has `data-testid="mobile-quote-bar"`.

- [ ] **Step 6: Apply the mobile behavior**

In `CustomQuoteBuilder`:

- Attach the in-view ref to the custom panel container.
- Keep the full itemized summary on desktop with `hidden lg:block`.
- Add a separate `data-testid="mobile-quote-bar"` for below `lg`, containing the total, a `Ver desglose` disclosure, and the primary WhatsApp action. Hide it with `lg:hidden`.
- Set `aria-hidden` from the in-view boolean. When out of view, also translate the bar off-screen and set `tabIndex={-1}` on its disclosure and link.
- Respect the safe area with `padding-bottom: max(0.75rem, env(safe-area-inset-bottom))`.
- Add bottom spacing to the configuration content so the bar never covers the last group.
- Ensure every tab, stepper, option, disclosure, and CTA has a minimum 44×44 px target.
- Use `break-words` and minimum-width-safe flex layouts for plan names, prices, and labels.

- [ ] **Step 7: Run the focused tests**

Run:

```bash
pnpm exec vitest run src/lib/useIsInView.test.tsx src/components/ServicesSection.test.tsx
```

Expected: all tests pass.

- [ ] **Step 8: Verify overflow and obstruction at mobile widths**

Run `pnpm dev`, open the page in a browser, and check 320 px, 390 px, and 768 px widths with the custom tab active. At each width, confirm:

```js
document.documentElement.scrollWidth <= window.innerWidth
```

Also confirm the fixed summary does not cover the last configuration group, the WhatsApp action, the conditions block, or the contact section, and that it disappears after leaving the services section.

- [ ] **Step 9: Commit**

```bash
git add src/lib/useIsInView.ts src/lib/useIsInView.test.tsx src/components/CustomQuoteBuilder.tsx src/components/ServicesSection.tsx src/components/ServicesSection.test.tsx
git commit -m "fix: harden custom quote experience on mobile"
```

### Task 5: Club Premium Hero and Navigation

**Files:**
- Modify: `src/components/Hero.astro`
- Modify: `src/components/Navbar.tsx`
- Test: `src/components/Navbar.test.tsx`

**Interfaces:**
- Consumes: approved Club Premium visual direction, existing `SocialMedia` and navigation anchors.
- Produces: redesigned fixed navbar and hero; no new page routes.

- [ ] **Step 1: Write the failing navigation test**

Create `src/components/Navbar.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

describe("Navbar mobile menu", () => {
  it("exposes state, closes on Escape, and closes after navigation", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const openButton = screen.getByRole("button", { name: "Abrir menú" });
    const controls = openButton.getAttribute("aria-controls");
    expect(openButton).toHaveAttribute("aria-expanded", "false");
    expect(controls).toBeTruthy();

    await user.click(openButton);
    const closeButton = screen.getByRole("button", { name: "Cerrar menú" });
    expect(closeButton).toHaveAttribute("aria-expanded", "true");
    const menu = document.getElementById(controls!);
    expect(menu).not.toBeNull();
    for (const name of ["Home", "Mixing", "Servicios", "Equipos", "Bio", "Contacto"]) {
      expect(within(menu!).getByRole("link", { name })).toBeInTheDocument();
    }

    await user.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: "Abrir menú" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );

    await user.click(screen.getByRole("button", { name: "Abrir menú" }));
    const reopened = document.getElementById(controls!);
    await user.click(within(reopened!).getByRole("link", { name: "Servicios" }));
    expect(screen.getByRole("button", { name: "Abrir menú" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
pnpm exec vitest run src/components/Navbar.test.tsx
```

Expected: failure because the current menu button lacks `aria-expanded` and `aria-controls`.

- [ ] **Step 3: Implement the navigation**

Keep the same six anchors and social links. Apply the compact Club Premium bar: near-black background, restrained border, prominent `PABLITO DYR` wordmark, yellow active/hover treatment. Make the menu button at least 44×44 px, set its accessible name to `Abrir menú` or `Cerrar menú`, and close the mobile menu on link activation and Escape. Keep desktop navigation visible from `lg`.

- [ ] **Step 4: Implement the hero**

Replace the current split logo/header treatment with the approved hero copy:

- Kicker: `DJ · Sonido · Iluminación · Santiago`
- Heading: `Que tu fiesta se sienta enorme.`
- Supporting copy: `Elige un pack probado o arma tu evento a medida. Precios claros, producción completa y coordinación directa por WhatsApp.`
- Primary action: `Ver packs y precios`
- Proof points: `5 packs base`, `20% para reservar`, `$0 traslado en Santiago`

Link the primary action to `#services`. Keep a prominent brand image. Do not put the `autoplay` attribute on the video. Render the poster image as the mobile background and mark the video container `hidden md:block` with `data-hero-video`, `preload="none"`, `muted`, `loop`, and `playsinline`. Add a small inline script that calls `video.play()` only when the viewport is at least 768 px and `prefers-reduced-motion: reduce` does not match; catch rejected playback. Re-evaluate on viewport changes. Preserve the current accessible video description when the video is rendered.

- [ ] **Step 5: Run the navigation test and build**

Run:

```bash
pnpm exec vitest run src/components/Navbar.test.tsx
pnpm build
```

Expected: navigation tests pass and the production build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.astro src/components/Navbar.tsx src/components/Navbar.test.tsx
git commit -m "feat: apply club premium hero and navigation"
```

### Task 6: Final Accessibility, SEO, and Regression Verification

**Files:**
- Modify if needed: `src/components/Services.astro`
- Modify if needed: `src/components/ServicesSection.tsx`
- Modify if needed: `src/components/CustomQuoteBuilder.tsx`
- Modify if needed: `src/components/Hero.astro`
- Modify if needed: `src/components/Navbar.tsx`

**Interfaces:**
- Consumes: all prior tasks.
- Produces: final verified feature; no new interfaces.

- [ ] **Step 1: Run the complete automated suite**

Run:

```bash
pnpm test
pnpm build
```

Expected: all tests pass and the Astro production build succeeds.

- [ ] **Step 2: Verify formatting and lint on changed source files**

Run:

```bash
pnpm exec prettier --check src/data/services.ts src/lib/quote.ts src/lib/quote.test.ts src/lib/useIsInView.ts src/lib/useIsInView.test.tsx src/components/PlanCard.tsx src/components/PlanCard.test.tsx src/components/CustomQuoteBuilder.tsx src/components/ServicesSection.tsx src/components/ServicesSection.test.tsx src/components/Navbar.tsx src/components/Navbar.test.tsx src/components/Services.astro src/components/Hero.astro
pnpm exec eslint src/data/services.ts src/lib/quote.ts src/lib/useIsInView.ts src/components/PlanCard.tsx src/components/CustomQuoteBuilder.tsx src/components/ServicesSection.tsx src/components/Navbar.tsx
```

Expected: no formatting or lint errors in changed files. Fix only changed-file issues.

- [ ] **Step 3: Verify structured data and content preservation**

Inspect the production HTML or built page and confirm:

- All five plans still appear as `Offer` entries with `CLP`, original prices, descriptions, provider, Santiago area, and `https://djpablitodyr.cl/#services`.
- No dynamic custom quote is emitted as a fixed offer.
- Every original pack feature remains present in the DOM.
- The conditions about transport, equipment, 20% reservation, free LED names, and payment remain visible.
- The WhatsApp destination is `56971768418`.

- [ ] **Step 4: Verify keyboard and reduced-motion behavior**

Using keyboard only, switch tabs, change every option dependency, open a plan disclosure, change lighting, choose outside Santiago, reach both WhatsApp actions, and open/close the mobile navigation. Confirm visible focus, correct announced selected states, and no focus left on the hidden mobile bar. Enable reduced motion and confirm the hero does not autoplay.

- [ ] **Step 5: Verify representative prices manually**

Confirm these visible totals:

| Configuration | Total | Reservation |
| --- | ---: | ---: |
| 4 h, no extras, basic, Santiago | $150.000 | $30.000 |
| 6 h, animation + karaoke + advanced, rural | $295.000 | $59.000 |
| 8 h, all extras, pro, rural | $460.000 | $92.000 |
| Any configuration, outside Santiago | Quote by WhatsApp | Not shown |

- [ ] **Step 6: Verify mobile breakpoints**

At 320 px, 390 px, 768 px, and 1440 px:

- No horizontal page overflow.
- Plan names and prices wrap cleanly.
- Pack cards become one column on phones.
- The quote bar is compact, remains clear of controls, and disappears outside the services section.
- The complete pack details and price breakdown remain reachable without hover.
- The mobile menu, tabs, options, and CTAs are comfortably tappable.

- [ ] **Step 7: Commit any verification fixes**

```bash
git add src
git commit -m "fix: verify responsive quote experience"
```

Only commit if Step 1–6 required changes; skip this commit when the worktree is already clean.
