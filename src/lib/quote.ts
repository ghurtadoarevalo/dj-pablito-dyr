import {
  BASE_PACKAGE,
  CUSTOM_EXTRA_OPTIONS,
  LIGHTING_OPTIONS,
  LOCATION_OPTIONS,
  RESERVATION_RATE,
  WHATSAPP_NUMBER,
  type CustomExtraId,
  type LightingLevel,
  type LocationZone,
  type QuoteSelection,
  type ServicePlan,
} from "../data/services";

export type {
  CustomExtraId,
  LightingLevel,
  LocationZone,
  QuoteSelection,
} from "../data/services";

export interface QuoteLine {
  label: string;
  amount: number;
}

export interface ExactQuote {
  kind: "exact";
  selection: QuoteSelection;
  lines: readonly QuoteLine[];
  total: number;
  deposit: number;
}

export interface ManualQuote {
  kind: "manual";
  selection: QuoteSelection;
  lines: readonly QuoteLine[];
  total: null;
  deposit: null;
}

export type QuoteResult = ExactQuote | ManualQuote;

const EXTRA_IDS = new Set(CUSTOM_EXTRA_OPTIONS.map((option) => option.id));
const LIGHTING_IDS = new Set(LIGHTING_OPTIONS.map((option) => option.id));
const LOCATION_IDS = new Set(LOCATION_OPTIONS.map((option) => option.id));

export function formatCLP(amount: number): string {
  return `$${Math.round(amount).toLocaleString("es-CL")}`;
}

export function normalizeQuoteSelection(
  selection: QuoteSelection,
): QuoteSelection {
  const rawHours = Number.isFinite(selection.hours)
    ? Math.trunc(selection.hours)
    : BASE_PACKAGE.includedHours;
  const hours = Math.min(
    BASE_PACKAGE.maxHours,
    Math.max(BASE_PACKAGE.includedHours, rawHours),
  );
  const extras = new Set(
    selection.extras.filter((extra) => EXTRA_IDS.has(extra)),
  );

  if (extras.has("coanimation")) extras.add("animation");
  if (!extras.has("animation")) extras.delete("coanimation");
  if (extras.has("projector")) extras.add("karaoke");
  if (!extras.has("karaoke")) extras.delete("projector");

  const orderedExtras = CUSTOM_EXTRA_OPTIONS.filter((option) =>
    extras.has(option.id),
  ).map((option) => option.id);

  return {
    hours,
    extras: orderedExtras,
    lighting: LIGHTING_IDS.has(selection.lighting)
      ? selection.lighting
      : "basic",
    location: LOCATION_IDS.has(selection.location)
      ? selection.location
      : "santiago",
  };
}

export function toggleQuoteExtra(
  selection: QuoteSelection,
  extra: CustomExtraId,
): QuoteSelection {
  const current = normalizeQuoteSelection(selection);
  const extras = new Set(current.extras);

  if (extras.has(extra)) {
    extras.delete(extra);
    if (extra === "animation") extras.delete("coanimation");
    if (extra === "karaoke") extras.delete("projector");
  } else {
    extras.add(extra);
  }

  return normalizeQuoteSelection({
    ...current,
    extras: [...extras],
  });
}

export function calculateCustomQuote(selection: QuoteSelection): QuoteResult {
  const normalized = normalizeQuoteSelection(selection);
  const lines: QuoteLine[] = [
    { label: BASE_PACKAGE.label, amount: BASE_PACKAGE.amount },
  ];
  const additionalHours = normalized.hours - BASE_PACKAGE.includedHours;

  if (additionalHours > 0) {
    lines.push({
      label: `Horas adicionales (${additionalHours})`,
      amount: additionalHours * BASE_PACKAGE.extraHourAmount,
    });
  }

  for (const option of CUSTOM_EXTRA_OPTIONS) {
    if (normalized.extras.includes(option.id)) {
      lines.push({ label: option.label, amount: option.amount });
    }
  }

  const lighting = LIGHTING_OPTIONS.find(
    (option) => option.id === normalized.lighting,
  );
  if (lighting && lighting.amount > 0) {
    lines.push({
      label: `Iluminación ${lighting.label.toLowerCase()}`,
      amount: lighting.amount,
    });
  }

  const location = LOCATION_OPTIONS.find(
    (option) => option.id === normalized.location,
  );
  if (location?.id === "rural") {
    lines.push({ label: location.label, amount: location.amount ?? 0 });
  }

  if (normalized.location === "outside") {
    return {
      kind: "manual",
      selection: normalized,
      lines,
      total: null,
      deposit: null,
    };
  }

  const total = lines.reduce((sum, line) => sum + line.amount, 0);

  return {
    kind: "exact",
    selection: normalized,
    lines,
    total,
    deposit: Math.round(total * RESERVATION_RATE),
  };
}

function getLocationLabel(location: LocationZone): string {
  return (
    LOCATION_OPTIONS.find((option) => option.id === location)?.label ??
    LOCATION_OPTIONS[0].label
  );
}

function getLightingLabel(lighting: LightingLevel): string {
  return (
    LIGHTING_OPTIONS.find((option) => option.id === lighting)?.label ??
    LIGHTING_OPTIONS[0].label
  );
}

export function buildCustomQuoteMessage(result: QuoteResult): string {
  const { selection } = result;
  const extras =
    selection.extras.length > 0
      ? CUSTOM_EXTRA_OPTIONS.filter((option) =>
          selection.extras.includes(option.id),
        )
          .map((option) => option.label)
          .join(", ")
      : "Sin extras";

  const lines = [
    "¡Hola! Quiero cotizar un evento personalizado con DJ Pablito Dyr.",
    "",
    `Duración: ${selection.hours} horas`,
    `Extras: ${extras}`,
    `Iluminación: ${getLightingLabel(selection.lighting)}`,
    `Ubicación: ${getLocationLabel(selection.location)}`,
    "",
  ];

  if (result.kind === "exact") {
    lines.push(
      `Total exacto: ${formatCLP(result.total)}`,
      `Reserva (${Math.round(RESERVATION_RATE * 100)}%): ${formatCLP(result.deposit)}`,
      "",
      "La fecha queda sujeta a disponibilidad.",
    );
  } else {
    lines.push(
      "El evento es fuera de Santiago. Necesito cotización del traslado.",
    );
  }

  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildCustomQuoteWhatsAppUrl(result: QuoteResult): string {
  return buildWhatsAppUrl(buildCustomQuoteMessage(result));
}

export function buildPackWhatsAppUrl(plan: ServicePlan): string {
  return buildWhatsAppUrl(
    `Hola, quiero contratar el pack ${plan.title} por ${formatCLP(plan.price)}. ¿Me podrías dar más información?`,
  );
}
