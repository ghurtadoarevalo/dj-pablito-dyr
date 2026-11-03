import { describe, expect, it, vi } from "vitest";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SERVICE_PLANS } from "../data/services";
import ServicesSection from "./ServicesSection";

describe("ServicesSection", () => {
  it("renders every plan and hides the custom pack by default", () => {
    render(<ServicesSection />);
    for (const plan of SERVICE_PLANS)
      expect(screen.getByText(plan.title)).toBeInTheDocument();
    expect(screen.queryByRole("tab")).not.toBeInTheDocument();
    expect(screen.queryByText("Diseña tu pack")).not.toBeInTheDocument();
  });

  it("starts on the packs tab when the custom pack is enabled", () => {
    render(<ServicesSection showCustomPack />);
    expect(screen.getByRole("tab", { name: "Packs base" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("switches to the custom builder and updates hours, total, and deposit", async () => {
    const user = userEvent.setup();
    render(<ServicesSection showCustomPack />);
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
    render(<ServicesSection showCustomPack />);
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
    render(<ServicesSection showCustomPack />);
    await user.click(screen.getByRole("tab", { name: "Arma tu evento" }));
    await user.click(screen.getByRole("button", { name: /Fuera de Santiago/ }));
    const summary = screen.getByTestId("desktop-quote-summary");
    expect(
      within(summary).getByRole("link", {
        name: /Cotización de traslado por WhatsApp/,
      }),
    ).toBeInTheDocument();
    expect(
      within(summary).queryByText("Reserva con el 20%"),
    ).not.toBeInTheDocument();
  });

  it("puts the full configuration in the WhatsApp link", async () => {
    const user = userEvent.setup();
    render(<ServicesSection showCustomPack />);
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
    render(<ServicesSection showCustomPack />);
    await user.click(screen.getByRole("tab", { name: "Arma tu evento" }));
    const bar = screen.getByTestId("mobile-quote-bar");
    expect(bar).toBeInTheDocument();
    expect(
      within(bar).getByRole("link", { name: "Ver desglose" }),
    ).toHaveAttribute("href", "#mobile-quote-breakdown");
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
    expect(screen.queryByTestId("mobile-quote-bar")).not.toBeInTheDocument();
  });
});
