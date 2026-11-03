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
      expect(html).toContain(plan.adds);
      expect(html).toContain(`$${plan.price.toLocaleString("es-CL")}`);
      for (const highlight of plan.highlights)
        expect(html).toContain(highlight);
      for (const feature of plan.features) expect(html).toContain(feature);
      expect(html).toContain("<details");
      expect(html).toContain("<summary");
      expect(html).toContain(
        `Hora adicional: $${plan.extraHourPrice.toLocaleString("es-CL")}`,
      );
      expect(html).toContain("wa.me/56971768418");
    }
  });

  it("marks the featured plan and gives every action an accessible name", () => {
    const html = renderToStaticMarkup(
      <PlanCard plan={SERVICE_PLANS.find((plan) => plan.featured)!} />,
    );
    expect(html).toContain("Más elegido");
    expect(html).toContain("Elegir Karaoke Dancing");
    expect(html).toContain("Ver detalle de Karaoke Dancing");
  });
});
