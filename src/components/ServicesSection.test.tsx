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
    for (const plan of SERVICE_PLANS)
      expect(screen.getByText(plan.title)).toBeInTheDocument();
  });

  it("switches to the custom builder and updates hours, total, and deposit", async () => {
    const user = userEvent.setup();
    render(<ServicesSection />);
    await user.click(screen.getByRole("tab", { name: "Arma tu evento" }));
    expect(
      screen.getByRole("tab", { name: "Arma tu evento" }),
    ).toHaveAttribute("aria-selected", "true");
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
    expect(
      screen.getByRole("link", {
        name: /Cotización de traslado por WhatsApp/,
      }),
    ).toBeInTheDocument();
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
