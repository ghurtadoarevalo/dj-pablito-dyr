import { useState } from "react";
import {
  BASE_PACKAGE,
  CUSTOM_EXTRA_OPTIONS,
  DEFAULT_QUOTE_SELECTION,
  LIGHTING_OPTIONS,
  LOCATION_OPTIONS,
  type CustomExtraId,
  type LightingLevel,
  type LocationZone,
  type QuoteSelection,
} from "../data/services";
import {
  buildCustomQuoteWhatsAppUrl,
  calculateCustomQuote,
  formatCLP,
  toggleQuoteExtra,
} from "../lib/quote";
import { useIsInView } from "../lib/useIsInView";

const optionClassName = (selected: boolean) =>
  `flex min-h-11 items-center justify-between gap-3 rounded-sm border px-3 py-2.5 text-left text-xs transition-colors ${
    selected
      ? "border-yellow-400/80 bg-yellow-400/10 text-white"
      : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
  }`;

const CustomQuoteBuilder = () => {
  const [selection, setSelection] = useState<QuoteSelection>(
    DEFAULT_QUOTE_SELECTION,
  );
  const [panelRef, inView] = useIsInView<HTMLDivElement>();
  const quote = calculateCustomQuote(selection);
  const normalized = quote.selection;
  const quoteCtaLabel =
    quote.kind === "exact"
      ? "Enviar configuración por WhatsApp"
      : "Cotización de traslado por WhatsApp";

  const setHours = (hours: number) => {
    setSelection((current) => ({ ...current, hours }));
  };

  const setLighting = (lighting: LightingLevel) => {
    setSelection((current) => ({ ...current, lighting }));
  };

  const setLocation = (location: LocationZone) => {
    setSelection((current) => ({ ...current, location }));
  };

  const toggleExtra = (extra: CustomExtraId) => {
    setSelection((current) => toggleQuoteExtra(current, extra));
  };

  return (
    <div ref={panelRef}>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div className="grid gap-3 pb-44 lg:pb-0">
        <fieldset className="rounded-lg border border-zinc-800 bg-[#141416] p-5">
          <legend className="px-1 text-xs font-black uppercase tracking-wider text-white">
            1. Duración
          </legend>
          <p className="mt-1 text-xs leading-relaxed text-zinc-400">
            La base incluye 4 horas de DJ, sonido JBL e iluminación básica.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-2xl font-black text-white">
                {normalized.hours} horas
              </p>
              <p className="mt-1 text-[11px] text-zinc-400">
                Hora adicional: {formatCLP(BASE_PACKAGE.extraHourAmount)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Quitar una hora"
                disabled={normalized.hours <= BASE_PACKAGE.includedHours}
                onClick={() => setHours(normalized.hours - 1)}
                className="grid size-11 place-items-center rounded-sm border border-zinc-700 bg-zinc-900 text-xl text-white transition-colors hover:border-yellow-400 disabled:cursor-not-allowed disabled:opacity-30"
              >
                −
              </button>
              <span className="min-w-6 text-center text-sm font-black text-white">
                {normalized.hours}
              </span>
              <button
                type="button"
                aria-label="Agregar una hora"
                disabled={normalized.hours >= BASE_PACKAGE.maxHours}
                onClick={() => setHours(normalized.hours + 1)}
                className="grid size-11 place-items-center rounded-sm border border-zinc-700 bg-zinc-900 text-xl text-white transition-colors hover:border-yellow-400 disabled:cursor-not-allowed disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-lg border border-zinc-800 bg-[#141416] p-5">
          <legend className="px-1 text-xs font-black uppercase tracking-wider text-white">
            2. Experiencia
          </legend>
          <p className="mt-1 text-xs leading-relaxed text-zinc-400">
            Suma solo lo que quieres. La coanimación incluye animación y el
            proyector incluye karaoke.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {CUSTOM_EXTRA_OPTIONS.map((option) => {
              const selected = normalized.extras.includes(option.id);

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleExtra(option.id)}
                  className={optionClassName(selected)}
                >
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={`grid size-4 place-items-center rounded-sm border text-[10px] ${
                        selected
                          ? "border-yellow-400 bg-yellow-400 text-zinc-950"
                          : "border-zinc-600"
                      }`}
                    >
                      {selected ? "✓" : ""}
                    </span>
                    {option.label}
                  </span>
                  <span
                    className={
                      selected ? "text-yellow-400" : "text-zinc-500"
                    }
                  >
                    +{formatCLP(option.amount)}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="rounded-lg border border-zinc-800 bg-[#141416] p-5">
          <legend className="px-1 text-xs font-black uppercase tracking-wider text-white">
            3. Iluminación
          </legend>
          <p className="mt-1 text-xs leading-relaxed text-zinc-400">
            Elige un nivel; no se acumulan.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {LIGHTING_OPTIONS.map((option) => {
              const selected = normalized.lighting === option.id;

              return (
                <label
                  key={option.id}
                  className={`flex min-h-11 cursor-pointer flex-col justify-center rounded-sm border px-2 py-2 text-center text-[11px] transition-colors ${
                    selected
                      ? "border-yellow-400 bg-yellow-400/10 text-yellow-300"
                      : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
                  }`}
                >
                  <input
                    type="radio"
                    name="lighting"
                    value={option.id}
                    checked={selected}
                    onChange={() => setLighting(option.id)}
                    className="sr-only"
                  />
                  <span className="font-bold">{option.label}</span>
                  <span className="mt-1 text-[10px] opacity-75">
                    {option.amount === 0
                      ? "Incluida"
                      : `+${formatCLP(option.amount)}`}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="rounded-lg border border-zinc-800 bg-[#141416] p-5">
          <legend className="px-1 text-xs font-black uppercase tracking-wider text-white">
            4. Ubicación
          </legend>
          <p className="mt-1 text-xs leading-relaxed text-zinc-400">
            Cotización exacta dentro de Santiago y sectores rurales. Fuera de
            Santiago se coordina por WhatsApp.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {LOCATION_OPTIONS.map((option) => {
              const selected = normalized.location === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setLocation(option.id)}
                  className={optionClassName(selected)}
                >
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={`grid size-4 place-items-center rounded-full border text-[9px] ${
                        selected
                          ? "border-yellow-400 bg-yellow-400 text-zinc-950"
                          : "border-zinc-600"
                      }`}
                    >
                      {selected ? "✓" : ""}
                    </span>
                    {option.label}
                  </span>
                  <span
                    className={
                      selected ? "text-yellow-400" : "text-zinc-500"
                    }
                  >
                    {option.amount === null
                      ? "Consultar"
                      : option.amount === 0
                        ? "Gratis"
                        : `+${formatCLP(option.amount)}`}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <aside
        data-testid="desktop-quote-summary"
        aria-live="polite"
        className="hidden rounded-lg border border-yellow-400/40 bg-[linear-gradient(150deg,rgba(246,201,69,0.06),transparent_45%),#171719] p-5 lg:sticky lg:top-24 lg:block"
      >
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-yellow-400">
          Tu configuración
        </p>
        <h3 className="mt-2 text-xl font-black text-white">
          Resumen del evento
        </h3>

        <div className="mt-5 grid gap-2">
          {quote.lines.map((line) => (
            <div
              key={`${line.label}-${line.amount}`}
              className="flex items-start justify-between gap-4 text-[11px]"
            >
              <span className="text-zinc-400">{line.label}</span>
              <span className="whitespace-nowrap text-zinc-200">
                {formatCLP(line.amount)}
              </span>
            </div>
          ))}
        </div>

        {quote.kind === "exact" ? (
          <>
            <div className="mt-5 flex items-end justify-between gap-4 border-t border-zinc-700 pt-4">
              <span className="text-xs text-zinc-400">Total exacto</span>
              <strong
                data-testid="quote-total"
                className="text-2xl font-black text-yellow-400"
              >
                {formatCLP(quote.total)}
              </strong>
            </div>
            <p className="mt-2 text-right text-[10px] text-zinc-500">
              Reserva con el 20%:{" "}
              <span data-testid="quote-deposit" className="text-zinc-300">
                {formatCLP(quote.deposit)}
              </span>
            </p>
          </>
        ) : (
          <p className="mt-5 border-t border-zinc-700 pt-4 text-sm font-bold text-yellow-300">
            El traslado se cotiza según el lugar del evento.
          </p>
        )}

        <a
          href={buildCustomQuoteWhatsAppUrl(quote)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex min-h-11 items-center justify-center rounded-sm bg-yellow-400 px-4 py-3 text-center text-[11px] font-black uppercase tracking-wide text-zinc-950 transition-colors hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
        >
          {quoteCtaLabel}
        </a>
        <p className="mt-3 text-center text-[10px] leading-relaxed text-zinc-500">
          {quote.kind === "exact"
            ? "El valor no cambia al contactar. La fecha queda sujeta a disponibilidad."
            : "Enviaremos la configuración para calcular el traslado contigo."}
        </p>
      </aside>
      </div>

      {inView && (
        <div
          data-testid="mobile-quote-bar"
          className="fixed inset-x-0 bottom-0 z-30 border-t border-yellow-400/40 bg-[#171719]/95 p-3 shadow-[0_-12px_35px_rgba(0,0,0,0.45)] backdrop-blur-md lg:hidden"
          style={{
            paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
          }}
        >
          <div className="mx-auto max-w-lg">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-[0.14em] text-zinc-400">
                  {quote.kind === "exact" ? "Total exacto" : "Traslado"}
                </p>
                <p className="truncate text-lg font-black text-yellow-400">
                  {quote.kind === "exact"
                    ? formatCLP(quote.total)
                    : "Cotización por WhatsApp"}
                </p>
              </div>
              <a
                href={buildCustomQuoteWhatsAppUrl(quote)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={quoteCtaLabel}
                className="flex min-h-11 shrink-0 items-center justify-center rounded-sm bg-yellow-400 px-3 py-2 text-center text-[10px] font-black uppercase tracking-wide text-zinc-950"
              >
                <span aria-hidden="true">
                  {quote.kind === "exact" ? "Enviar" : "Cotizar"}
                </span>
              </a>
            </div>

            <details className="group mt-2 border-t border-zinc-800 pt-2">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-[11px] font-bold text-zinc-300">
                Ver desglose
                <span
                  aria-hidden="true"
                  className="text-base text-yellow-400 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="max-h-[45vh] space-y-2 overflow-y-auto pb-1">
                {quote.lines.map((line) => (
                  <div
                    key={`mobile-${line.label}-${line.amount}`}
                    className="flex items-start justify-between gap-4 text-[10px]"
                  >
                    <span className="text-zinc-400">{line.label}</span>
                    <span className="whitespace-nowrap text-zinc-200">
                      {formatCLP(line.amount)}
                    </span>
                  </div>
                ))}
                {quote.kind === "exact" && (
                  <p className="border-t border-zinc-800 pt-2 text-[10px] text-zinc-400">
                    Reserva con el 20%:{" "}
                    <span className="font-bold text-zinc-200">
                      {formatCLP(quote.deposit)}
                    </span>
                  </p>
                )}
              </div>
            </details>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomQuoteBuilder;
