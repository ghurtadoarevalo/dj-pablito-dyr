import { FaWhatsapp } from "react-icons/fa";
import { RESERVATION_RATE, type ServicePlan } from "../data/services";
import { buildPackWhatsAppUrl, formatCLP } from "../lib/quote";

type PlanCardProps = {
  plan: ServicePlan;
};

const PlanCard = ({ plan }: PlanCardProps) => {
  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-card border bg-surface p-5 text-white transition duration-snap hover:border-line-strong ${
        plan.featured ? "border-accent/70 bg-glow-card" : "border-line"
      }`}
    >
      {plan.featured && (
        <span className="absolute right-0 top-0 rounded-bl-card bg-accent px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-ink">
          Más elegido
        </span>
      )}

      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-muted">
        {plan.hours} horas de fiesta
      </p>

      <h3 className="mt-1 break-words font-display text-2xl uppercase leading-none tracking-tight sm:text-3xl">
        {plan.title}
      </h3>

      <p className="mt-4 flex items-baseline gap-1 font-display text-5xl leading-none text-accent">
        {formatCLP(plan.price)}
      </p>
      <p className="mt-1 text-[11px] font-semibold text-muted">
        Reserva con {formatCLP(plan.price * RESERVATION_RATE)} · hora extra{" "}
        {formatCLP(plan.extraHourPrice)}
      </p>

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
            className="rounded-control border border-line-strong px-2 py-1.5 text-[11px] text-zinc-300"
          >
            {highlight}
          </li>
        ))}
      </ul>

      <details className="group mt-5 border-t border-line pt-4">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-xs font-semibold text-muted transition-colors hover:text-accent">
          <span>Ver todo lo incluido en {plan.title}</span>
          <span
            aria-hidden="true"
            className="text-base transition-transform group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <ul className="mt-4 space-y-2 text-xs leading-relaxed text-muted">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <span aria-hidden="true" className="text-accent">
                ·
              </span>
              <span>{feature}</span>
            </li>
          ))}
          <li className="border-t border-line pt-3 font-semibold text-zinc-300">
            Hora adicional: {formatCLP(plan.extraHourPrice)}
          </li>
        </ul>
      </details>

      <a
        href={buildPackWhatsAppUrl(plan)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Elegir ${plan.title}`}
        className={`mt-auto flex min-h-11 items-center justify-center gap-2 rounded-control px-4 py-2.5 pt-2.5 text-xs font-black uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          plan.featured
            ? "bg-accent text-ink hover:bg-accent-bright"
            : "border border-line-strong text-white hover:border-accent hover:text-accent-bright"
        }`}
      >
        <FaWhatsapp aria-hidden="true" className="text-lg" />
        Elegir {plan.title}
      </a>
    </article>
  );
};

export default PlanCard;
