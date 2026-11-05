import { formatCLP } from "../lib/quote";
import {
  SERVICE_PLANS,
  type ServicePlan,
  type ServicePlanId,
} from "./services";

export type ComparisonValue = boolean | string;

export interface ComparisonRow {
  id: string;
  label: string;
  values: Record<ServicePlanId, ComparisonValue>;
}

export interface ComparisonColumn {
  id: ServicePlanId;
  label: string;
  featured: boolean;
}

const has = (plan: ServicePlan, pattern: RegExp): boolean =>
  plan.features.some((feature) => pattern.test(feature));

const LIGHTING_LABELS: Record<string, string> = {
  mejorada: "Mejorada",
  avanzada: "Avanzada",
  pro: "Profesional",
};

const lightingOf = (plan: ServicePlan): string => {
  const feature = plan.features.find((entry) =>
    entry.startsWith("Iluminación"),
  );
  const match = feature?.match(/^Iluminación(?: ([a-záéíóú]+))?:/);

  if (!match) return "Básica";

  return LIGHTING_LABELS[match[1]] ?? "Básica";
};

const valuesBy = (
  read: (plan: ServicePlan) => ComparisonValue,
): Record<ServicePlanId, ComparisonValue> =>
  SERVICE_PLANS.reduce(
    (accumulator, plan) => {
      accumulator[plan.id] = read(plan);
      return accumulator;
    },
    {} as Record<ServicePlanId, ComparisonValue>,
  );

export const COMPARISON_COLUMNS: readonly ComparisonColumn[] =
  SERVICE_PLANS.map((plan) => ({
    id: plan.id,
    label: plan.title,
    featured: plan.featured,
  }));

/**
 * Only the differences between packs earn a row here. Anything every pack
 * includes (playlist, JBL amplification, LED screens with the guest's name)
 * is stated once in the note under the table instead of becoming a column of
 * identical checks.
 */
export const COMPARISON_ROWS: readonly ComparisonRow[] = [
  {
    id: "hours",
    label: "Horas incluidas",
    values: valuesBy((plan) => `${plan.hours} h`),
  },
  {
    id: "price",
    label: "Precio",
    values: valuesBy((plan) => formatCLP(plan.price)),
  },
  {
    id: "extra-hour",
    label: "Hora adicional",
    values: valuesBy((plan) => formatCLP(plan.extraHourPrice)),
  },
  {
    id: "coanimation",
    label: "Co-animación",
    values: valuesBy((plan) => has(plan, /Co Animación/i)),
  },
  {
    id: "karaoke",
    label: "Karaoke con 2 micrófonos",
    values: valuesBy((plan) => has(plan, /Karaoke con 2 micrófonos/)),
  },
  {
    id: "projector",
    label: "Proyector y telón",
    values: valuesBy((plan) => has(plan, /Proyector y telón/)),
  },
  {
    id: "videos",
    label: "Videos musicales",
    values: valuesBy((plan) => has(plan, /^Videos$/)),
  },
  {
    id: "smoke",
    label: "Máquina de humo",
    values: valuesBy((plan) => has(plan, /Máquina de humo/)),
  },
  {
    id: "lighting",
    label: "Iluminación",
    values: valuesBy(lightingOf),
  },
];
