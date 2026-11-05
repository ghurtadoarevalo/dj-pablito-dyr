import { describe, expect, it } from "vitest";
import { COMPARISON_COLUMNS, COMPARISON_ROWS } from "./comparison";
import { SERVICE_PLANS } from "./services";
import { formatCLP } from "../lib/quote";

const row = (id: string) => {
  const found = COMPARISON_ROWS.find((entry) => entry.id === id);
  if (!found) throw new Error(`missing comparison row: ${id}`);
  return found;
};

describe("plan comparison", () => {
  it("covers every plan with one column, keeping the featured flag", () => {
    expect(COMPARISON_COLUMNS.map((column) => column.id)).toEqual(
      SERVICE_PLANS.map((plan) => plan.id),
    );
    expect(COMPARISON_COLUMNS.filter((column) => column.featured)).toHaveLength(
      1,
    );
  });

  it("quotes the same prices as the plans themselves", () => {
    for (const plan of SERVICE_PLANS) {
      expect(row("price").values[plan.id]).toBe(formatCLP(plan.price));
      expect(row("extra-hour").values[plan.id]).toBe(
        formatCLP(plan.extraHourPrice),
      );
    }
  });

  it("marks karaoke only from the Karaoke Dancing pack upward", () => {
    expect(row("karaoke").values).toEqual({
      celebration: false,
      "full-dancing": false,
      "karaoke-dancing": true,
      "gold-karaoke": true,
      "premium-infinity": true,
    });
  });

  it("marks the projector only on the packs that list it", () => {
    expect(row("projector").values).toEqual({
      celebration: false,
      "full-dancing": false,
      "karaoke-dancing": false,
      "gold-karaoke": true,
      "premium-infinity": true,
    });
  });

  it("names the lighting level each pack actually lists", () => {
    expect(row("lighting").values).toEqual({
      celebration: "Básica",
      "full-dancing": "Mejorada",
      "karaoke-dancing": "Avanzada",
      "gold-karaoke": "Avanzada",
      "premium-infinity": "Profesional",
    });
  });
});
