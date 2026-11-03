import { useRef, useState, type KeyboardEvent } from "react";
import { SERVICE_PLANS } from "../data/services";
import CustomQuoteBuilder from "./CustomQuoteBuilder";
import PlanCard from "./PlanCard";

type ServicesTab = "packs" | "custom";

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
      <div className="flex flex-col justify-between gap-5 py-12 md:flex-row md:items-end">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-yellow-400">
            Servicios
          </p>
          <h2
            id="services-title"
            className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl"
          >
            Tu evento, a tu manera
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
          Compara lo esencial de cada pack o configura una propuesta con el
          valor exacto antes de contactar.
        </p>
      </div>

      <div
        className="grid grid-cols-2 gap-1 rounded-md border border-zinc-800 bg-zinc-950 p-1 sm:inline-grid sm:auto-cols-max"
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
              className={`min-h-11 rounded-sm px-4 py-2.5 text-xs font-black transition-colors ${
                selected
                  ? "bg-yellow-400 text-zinc-950"
                  : "text-zinc-400 hover:text-white"
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {SERVICE_PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}

            <article className="flex min-h-64 flex-col justify-center rounded-lg border border-dashed border-yellow-400/40 bg-yellow-400/[0.035] p-5 text-white">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-yellow-400">
                ¿Otra combinación?
              </p>
              <h3 className="mt-2 text-xl font-black">Diseña tu propio pack</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Elige duración, experiencia e iluminación. Ve el total exacto
                mientras configuras.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab("custom")}
                className="mt-5 min-h-11 self-start rounded-sm bg-yellow-400 px-4 py-2.5 text-xs font-black uppercase tracking-wide text-zinc-950 transition-colors hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
              >
                Personalizar evento →
              </button>
            </article>
          </div>
          <p className="mt-4 rounded-sm border border-zinc-800 px-4 py-3 text-center text-xs leading-relaxed text-zinc-400">
            Todos los packs incluyen playlist personalizada, amplificación
            profesional y{" "}
            <strong className="text-yellow-300">
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
