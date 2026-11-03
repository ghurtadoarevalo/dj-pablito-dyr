import { useRef, useState, type KeyboardEvent } from "react";
import { SERVICE_PLANS } from "../data/services";
import CustomQuoteBuilder from "./CustomQuoteBuilder";
import PlanCard from "./PlanCard";

type ServicesTab = "packs" | "custom";

// Pedido del cliente: la fila "Diseña tu pack" queda oculta, no eliminada.
const SHOW_CUSTOM_PACK = false;

const tabs: readonly { id: ServicesTab; label: string }[] = [
  { id: "packs", label: "Packs base" },
  { id: "custom", label: "Arma tu evento" },
];

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState<ServicesTab>("packs");
  const tabRefs = useRef<Record<ServicesTab, HTMLButtonElement | null>>({
    packs: null,
    custom: null,
  });

  const moveFocus = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const nextTab = activeTab === "packs" ? "custom" : "packs";
    setActiveTab(nextTab);
    tabRefs.current[nextTab]?.focus();
  };

  const packPanelId = "services-packs-panel";
  const customPanelId = "services-custom-panel";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mb-8 md:mb-12">
        <p className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.18em] text-accent">
          <span className="h-px w-6 bg-accent" aria-hidden="true" />
          Servicios
        </p>
        <h2
          id="services-title"
          className="mt-2 break-words font-display text-4xl uppercase leading-[0.9] tracking-tight text-paper sm:text-5xl lg:text-7xl"
        >
          Packs y precios
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Cinco packs con precio exacto y todo lo que incluye cada uno. Abre el
          que te interese o arma el tuyo a medida.
        </p>
      </div>

      <div
        className="grid grid-cols-2 gap-1 rounded-control border border-line bg-ink p-1 sm:inline-grid sm:auto-cols-max"
        role="tablist"
        aria-label="Cómo elegir tu servicio"
      >
        {tabs.map((tab) => {
          const selected = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[tab.id] = node;
              }}
              id={`services-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={tab.id === "packs" ? packPanelId : customPanelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={moveFocus}
              className={`min-h-11 rounded-control px-4 py-2.5 text-xs font-black transition-colors ${
                selected ? "bg-accent text-ink" : "text-muted hover:text-paper"
              }`}
            >
              {selected && <span aria-hidden="true">✓ </span>}
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "packs" ? (
        <div
          id={packPanelId}
          role="tabpanel"
          aria-labelledby="services-tab-packs"
          className="mt-5"
        >
          <div className="divide-y divide-line border-y border-line">
            {SERVICE_PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}

            {SHOW_CUSTOM_PACK && (
              /* Oculto por pedido del cliente. No borrar: cambiar SHOW_CUSTOM_PACK a true para mostrarlo de nuevo. */
              <div className="grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 py-5 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:gap-5">
                <span
                  className="font-display text-xl leading-none text-accent sm:text-2xl"
                  aria-hidden="true"
                >
                  +
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-xl uppercase leading-none tracking-tight text-paper sm:text-2xl">
                    Diseña tu pack
                  </span>
                  <span className="mt-1 block text-xs text-muted">
                    Eliges horas, extras e iluminación · desde $150.000
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab("custom")}
                  className="min-h-11 rounded-control border border-accent/50 px-3 text-xs font-black uppercase tracking-wide text-accent-bright transition-colors hover:border-accent hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-4"
                >
                  Armar →
                </button>
              </div>
            )}
          </div>
          <p className="mt-4 text-center text-xs leading-relaxed text-muted">
            Todos los packs incluyen playlist personalizada, amplificación
            profesional y{" "}
            <strong className="font-semibold text-paper">
              2 letras LED con el nombre del festejado.
            </strong>
          </p>
        </div>
      ) : (
        <div
          id={customPanelId}
          role="tabpanel"
          aria-labelledby="services-tab-custom"
          className="mt-5"
        >
          <CustomQuoteBuilder />
        </div>
      )}
    </div>
  );
};

export default ServicesSection;
