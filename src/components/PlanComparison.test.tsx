import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PlanComparison from "./PlanComparison";

const columnHeaders = () =>
  screen.getAllByRole("columnheader").map((cell) => cell.textContent?.trim());

describe("Plan comparison", () => {
  it("shows all five packs before a pair is chosen", () => {
    render(<PlanComparison />);

    expect(columnHeaders()).toEqual([
      "Incluye",
      "Celebration",
      "Full Dancing",
      "Karaoke Dancing",
      "Gold Karaoke",
      "Premium Infinity",
    ]);
  });

  it("keeps all five packs when the same pack is picked twice", async () => {
    const user = userEvent.setup();
    render(<PlanComparison />);

    await user.selectOptions(screen.getByLabelText("Pack A"), "celebration");
    await user.selectOptions(screen.getByLabelText("Pack B"), "celebration");

    expect(columnHeaders()).toHaveLength(6);
    expect(
      screen.getByText(/elig[eé] dos packs distintos/i),
    ).toBeInTheDocument();
  });

  it("compares only the two chosen packs", async () => {
    const user = userEvent.setup();
    render(<PlanComparison />);

    await user.selectOptions(screen.getByLabelText("Pack A"), "celebration");
    await user.selectOptions(
      screen.getByLabelText("Pack B"),
      "premium-infinity",
    );

    expect(columnHeaders()).toEqual([
      "Incluye",
      "Celebration",
      "Premium Infinity",
    ]);
  });

  it("marks only the rows that differ", async () => {
    const user = userEvent.setup();
    render(<PlanComparison />);

    await user.selectOptions(screen.getByLabelText("Pack A"), "full-dancing");
    await user.selectOptions(
      screen.getByLabelText("Pack B"),
      "karaoke-dancing",
    );

    expect(
      screen.getByRole("row", { name: /Karaoke con 2 micrófonos/ }),
    ).toHaveAttribute("data-diff", "true");
    expect(
      screen.getByRole("row", { name: /Máquina de humo/ }),
    ).not.toHaveAttribute("data-diff");
    expect(
      screen.getByRole("row", { name: /Proyector y telón/ }),
    ).not.toHaveAttribute("data-diff");
  });

  it("states how much the dearer pack costs more", async () => {
    const user = userEvent.setup();
    render(<PlanComparison />);

    await user.selectOptions(screen.getByLabelText("Pack A"), "celebration");
    await user.selectOptions(
      screen.getByLabelText("Pack B"),
      "premium-infinity",
    );

    expect(
      screen.getByText(/premium infinity cuesta \$250\.000 más/i),
    ).toBeInTheDocument();
  });

  it("returns to the full table when the comparison is cleared", async () => {
    const user = userEvent.setup();
    render(<PlanComparison />);

    await user.selectOptions(screen.getByLabelText("Pack A"), "celebration");
    await user.selectOptions(
      screen.getByLabelText("Pack B"),
      "premium-infinity",
    );
    await user.click(screen.getByRole("button", { name: /ver los cinco/i }));

    expect(columnHeaders()).toHaveLength(6);
  });
});
