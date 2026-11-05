import { useState } from "react";
import { formatCLP } from "../lib/quote";
import { SERVICE_PLANS, type ServicePlanId } from "../data/services";
import {
  COMPARISON_COLUMNS,
  COMPARISON_ROWS,
  type ComparisonValue,
} from "../data/comparison";

const Cell = ({ value }: { value: ComparisonValue }) => {
  if (value === true) {
    return (
      <>
        <span aria-hidden="true" className="text-accent">
          ✓
        </span>
        <span className="sr-only">Incluido</span>
      </>
    );
  }

  if (value === false) {
    return (
      <>
        <span aria-hidden="true" className="text-muted">
          —
        </span>
        <span className="sr-only">No incluido</span>
      </>
    );
  }

  return <span className="text-paper">{value}</span>;
};

const planOf = (id: ServicePlanId) => {
  const plan = SERVICE_PLANS.find((entry) => entry.id === id);
  if (!plan) throw new Error(`unknown plan: ${id}`);
  return plan;
};

const PlanComparison = () => {
  const [left, setLeft] = useState<ServicePlanId | "">("");
  const [right, setRight] = useState<ServicePlanId | "">("");

  const bothChosen = left !== "" && right !== "";
  const samePair = bothChosen && left === right;
  const comparing = bothChosen && !samePair;

  const columns = comparing
    ? COMPARISON_COLUMNS.filter(
        (column) => column.id === left || column.id === right,
      )
    : COMPARISON_COLUMNS;

  const differs = (row: { values: Record<ServicePlanId, ComparisonValue> }) =>
    comparing && row.values[left] !== row.values[right];

  const priceNote = (() => {
    if (!comparing) return null;

    const leftPlan = planOf(left);
    const rightPlan = planOf(right);
    const dearer = leftPlan.price >= rightPlan.price ? leftPlan : rightPlan;
    const cheaper = dearer === leftPlan ? rightPlan : leftPlan;
    const difference = dearer.price - cheaper.price;

    if (difference === 0) return null;

    return `${dearer.title} cuesta ${formatCLP(difference)} más que ${cheaper.title}.`;
  })();

  const reset = () => {
    setLeft("");
    setRight("");
  };

  return (
    <div className="mt-8">
      <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-accent">
        Comparación rápida
      </h3>
      <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted">
        Lo que cambia entre packs, lado a lado. Elige dos para ver solo la
        diferencia.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <div className="flex flex-col gap-1.5">
          <label
            className="text-[11px] font-bold uppercase tracking-wide text-muted"
            htmlFor="compare-left"
          >
            Pack A
          </label>
          <select
            id="compare-left"
            className="min-h-11 rounded-control border border-line bg-ink/60 px-3 text-sm text-paper outline-none transition-colors duration-snap focus-visible:border-accent [color-scheme:dark]"
            value={left}
            onChange={(event) =>
              setLeft(event.target.value as ServicePlanId | "")
            }
          >
            <option value="">Elige un pack</option>
            {COMPARISON_COLUMNS.map((column) => (
              <option key={column.id} value={column.id}>
                {column.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            className="text-[11px] font-bold uppercase tracking-wide text-muted"
            htmlFor="compare-right"
          >
            Pack B
          </label>
          <select
            id="compare-right"
            className="min-h-11 rounded-control border border-line bg-ink/60 px-3 text-sm text-paper outline-none transition-colors duration-snap focus-visible:border-accent [color-scheme:dark]"
            value={right}
            onChange={(event) =>
              setRight(event.target.value as ServicePlanId | "")
            }
          >
            <option value="">Elige un pack</option>
            {COMPARISON_COLUMNS.map((column) => (
              <option key={column.id} value={column.id}>
                {column.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={reset}
          disabled={left === "" && right === ""}
          className="min-h-11 rounded-control border border-line px-4 text-xs font-black uppercase tracking-wide text-paper transition-colors duration-snap hover:border-accent hover:text-accent-bright disabled:cursor-not-allowed disabled:opacity-40"
        >
          Ver los cinco
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        {comparing
          ? `Comparando ${planOf(left).title} con ${planOf(right).title}.`
          : "Mostrando los cinco packs."}
      </p>

      {samePair && (
        <p className="mt-3 rounded-control border border-line-strong bg-surface p-3 text-xs text-paper">
          Elige dos packs distintos para comparar. Mientras tanto ves los cinco.
        </p>
      )}

      {priceNote && (
        <p className="mt-3 text-xs font-semibold text-accent-bright">
          {priceNote}
        </p>
      )}

      <div className="mt-4 overflow-x-auto rounded-card border border-line">
        <table
          className={`w-full border-collapse text-left ${
            comparing ? "min-w-[380px]" : "min-w-[620px]"
          }`}
        >
          <caption className="sr-only">
            Comparación de los packs de DJ Pablito Dyr
          </caption>
          <thead>
            <tr className="border-b border-line-strong">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-ink px-3 py-3 text-[11px] font-black uppercase tracking-wide text-muted sm:px-4"
              >
                Incluye
              </th>
              {columns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className={`px-2 py-3 text-center text-[11px] font-black uppercase leading-tight tracking-wide ${
                    column.featured
                      ? "bg-accent/[0.06] text-accent"
                      : "text-paper"
                  }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr
                key={row.id}
                data-diff={differs(row) ? "true" : undefined}
                className={`border-b border-line last:border-0 ${
                  comparing && !differs(row) ? "opacity-55" : ""
                }`}
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-ink px-3 py-3 text-xs font-semibold text-paper sm:px-4"
                >
                  {row.label}
                  {differs(row) && <span className="sr-only"> (distinto)</span>}
                </th>
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className={`px-2 py-3 text-center text-xs ${
                      column.featured ? "bg-accent/[0.06]" : ""
                    }`}
                  >
                    <Cell value={row.values[column.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanComparison;
