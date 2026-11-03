import { FaWhatsapp } from "react-icons/fa";
import type { ServicePlan } from "../data/services";
import { buildPackWhatsAppUrl, formatCLP } from "../lib/quote";

type PlanCardProps = {
  plan: ServicePlan;
};

const PlanCard = ({ plan }: PlanCardProps) => {
  return (
    <article
      className={`relative flex h-full flex-col rounded-lg border bg-[#141416] p-5 text-white ${
        plan.featured
          ? "border-yellow-400/60 bg-[linear-gradient(145deg,rgba(246,201,69,0.07),transparent_60%)]"
          : "border-zinc-800"
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-2.5 left-5 rounded-sm bg-yellow-400 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-zinc-950">
          Más elegido
        </span>
      )}

      <div className="flex flex-wrap items-start justify-between gap-3 pt-1">
        <div className="min-w-0">
          <h3 className="break-words text-sm font-black uppercase tracking-wide">
            {plan.title}
          </h3>
          <p className="mt-1 text-xs text-zinc-400">{plan.hours} horas</p>
        </div>
        <p className="whitespace-nowrap text-xl font-black text-yellow-400">
          {formatCLP(plan.price)}
        </p>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-zinc-300">
        {plan.description}
      </p>

      <ul
        className="mt-4 flex flex-wrap gap-1.5"
        aria-label={`Incluye ${plan.title}`}
      >
        {plan.highlights.map((highlight) => (
          <li
            key={highlight}
            className="rounded-sm border border-zinc-700 px-2 py-1.5 text-[11px] text-zinc-300"
          >
            {highlight}
          </li>
        ))}
      </ul>

      <details className="group mt-5 border-t border-zinc-800 pt-4">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-xs font-semibold text-zinc-400 transition-colors hover:text-yellow-400">
          <span>Ver todo lo incluido en {plan.title}</span>
          <span
            aria-hidden="true"
            className="text-base transition-transform group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <ul className="mt-4 space-y-2 text-xs leading-relaxed text-zinc-400">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <span aria-hidden="true" className="text-yellow-400">
                ·
              </span>
              <span>{feature}</span>
            </li>
          ))}
          <li className="border-t border-zinc-800 pt-3 font-semibold text-zinc-300">
            Hora adicional: {formatCLP(plan.extraHourPrice)}
          </li>
        </ul>
      </details>

      <a
        href={buildPackWhatsAppUrl(plan)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Elegir ${plan.title}`}
        className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-sm bg-yellow-400 px-4 py-2.5 text-xs font-black uppercase tracking-wide text-zinc-950 transition-colors hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
      >
        <FaWhatsapp aria-hidden="true" className="text-lg" />
        Elegir pack
      </a>
    </article>
  );
};

export default PlanCard;
