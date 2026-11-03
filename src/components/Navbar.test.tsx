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
    expect(document.getElementById(controls!)).toHaveAttribute("hidden");

    await user.click(openButton);
    const closeButton = screen.getByRole("button", { name: "Cerrar menú" });
    expect(closeButton).toHaveAttribute("aria-expanded", "true");
    const menu = document.getElementById(controls!);
    expect(menu).not.toBeNull();
    for (const name of [
      "Inicio",
      "Mixes",
      "Servicios",
      "Equipos",
      "Biografía",
      "Contacto",
    ]) {
      expect(within(menu!).getByRole("link", { name })).toBeInTheDocument();
    }

    await user.keyboard("{Escape}");
    const reopenedButton = screen.getByRole("button", { name: "Abrir menú" });
    expect(reopenedButton).toHaveAttribute("aria-expanded", "false");
    expect(reopenedButton).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Abrir menú" }));
    const reopened = document.getElementById(controls!);
    await user.click(
      within(reopened!).getByRole("link", { name: "Servicios" }),
    );
    expect(screen.getByRole("button", { name: "Abrir menú" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
