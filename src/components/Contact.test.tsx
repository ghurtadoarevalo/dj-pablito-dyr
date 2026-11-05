import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "./Contact";

const openWhatsApp = (value: Window | null) =>
  vi.spyOn(window, "open").mockReturnValue(value);

describe("Contact form", () => {
  beforeEach(() => {
    openWhatsApp({} as Window);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("blocks an empty submit and does not open WhatsApp", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(
      screen.getByRole("button", { name: /Hablemos por WhatsApp/i }),
    );

    expect(window.open).not.toHaveBeenCalled();
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent(/nombre/i);
    expect(screen.getByLabelText(/Nombre/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("opens WhatsApp with name, date, event type and message", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText(/Nombre/i), "Camila");
    await user.type(
      screen.getByLabelText(/Mensaje/i),
      "Cumpleaños de 40, 30 personas",
    );
    fireEvent.change(screen.getByLabelText(/Fecha del evento/i), {
      target: { value: "2026-12-31" },
    });
    fireEvent.change(screen.getByLabelText(/Tipo de evento/i), {
      target: { value: "Cumpleaños" },
    });

    await user.click(
      screen.getByRole("button", { name: /Hablemos por WhatsApp/i }),
    );

    expect(window.open).toHaveBeenCalledTimes(1);
    const [url, target] = vi.mocked(window.open).mock.calls[0];
    expect(target).toBe("_blank");
    const decoded = decodeURIComponent(String(url));
    expect(decoded).toContain("Camila");
    expect(decoded).toContain("2026-12-31");
    expect(decoded).toContain("Cumpleaños");
    expect(decoded).toContain("Cumpleaños de 40, 30 personas");
  });

  it("offers the direct number when the popup is blocked", async () => {
    vi.mocked(window.open).mockReturnValue(null);
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText(/Nombre/i), "Camila");
    await user.type(screen.getByLabelText(/Mensaje/i), "Consulta por un pack");
    await user.click(
      screen.getByRole("button", { name: /Hablemos por WhatsApp/i }),
    );

    const fallback = screen.getByRole("alert");
    expect(fallback).toHaveTextContent(/bloqueó|no pudimos/i);
    expect(
      within(fallback).getByRole("link", { name: /\+56 9 7176 8418/ }),
    ).toBeInTheDocument();
  });

  it("tells the visitor that the button opens WhatsApp", () => {
    render(<Contact />);

    expect(
      screen.getByText(/se abre WhatsApp con tu mensaje/i),
    ).toBeInTheDocument();
  });
});
