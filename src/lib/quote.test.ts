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
    expect(calculateCustomQuote({ ...base, hours: 12 }).selection.hours).toBe(
      8,
    );
    expect(calculateCustomQuote({ ...base, hours: 6.9 }).selection.hours).toBe(
      6,
    );
  });

  it("returns a manual quote without totals outside Santiago", () => {
    expect(
      calculateCustomQuote({ ...base, location: "outside" }),
    ).toMatchObject({
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
      expect(decodeURIComponent(buildPackWhatsAppUrl(plan))).toContain(
        plan.title,
      );
    }
  });
});
