import { FaWhatsapp } from "react-icons/fa";
import { RESERVATION_RATE, type ServicePlan } from "../data/services";
import { buildPackWhatsAppUrl, formatCLP } from "../lib/quote";

type PlanCardProps = {
  plan: ServicePlan;
};

const PlanCard = ({ plan }: PlanCardProps) => {
  return (
    <details className="group" open={plan.featured}>
      <summary className="grid cursor-pointer list-none grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-3 py-5 transition-colors hover:text-accent-bright sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:gap-5">
        <span className="flex flex-wrap items-baseline gap-x-1 text-muted">
          <span className="font-display text-xl leading-none sm:text-2xl">
            {plan.hours}
          </span>
          <span className="text-[11px] font-bold">horas</span>
        </span>
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-x-2 sm:flex-nowrap">
            <span className="font-display text-xl uppercase leading-none tracking-tight text-paper sm:text-2xl">
              {plan.title}
            </span>
            {plan.featured && (
              <span className="rounded-control bg-accent px-1.5 py-0.5 text-[11px] font-black uppercase tracking-wide text-ink">
                Más elegido
              </span>
            )}
            <span
              className="hidden h-px flex-1 bg-line sm:block"
              aria-hidden="true"
            />
          </span>
          <span className="mt-1 block text-xs leading-relaxed text-muted">
            {plan.adds}
          </span>
          <span className="sr-only">Ver detalle de {plan.title}</span>
        </span>
        <span className="text-right">
          <span className="block font-display text-2xl leading-none text-accent sm:text-3xl">
            {formatCLP(plan.price)}
          </span>
          <span className="mt-1 hidden text-[11px] text-muted sm:block">
            Reserva {formatCLP(plan.price * RESERVATION_RATE)}
          </span>
        </span>
      </summary>

      <div className="pb-7 sm:pl-[3.75rem]">
        <p className="text-sm leading-relaxed text-paper/80">
          {plan.description}
        </p>

        <ul
          className="mt-4 flex flex-wrap gap-1.5"
          aria-label={`Incluye ${plan.title}`}
        >
          {plan.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-control border border-line-strong px-2 py-1 text-[11px] text-paper/80"
            >
              {highlight}
            </li>
          ))}
        </ul>

        <ul className="mt-5 space-y-2 text-xs leading-relaxed text-muted">          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <span aria-hidden="true" className="text-accent">
                ·
              </span>
              <span>{feature}</span>
            </li>
          ))}
          <li className="border-t border-line pt-3 font-semibold text-paper/80">
            Hora adicional: {formatCLP(plan.extraHourPrice)}
          </li>
        </ul>

        <a
          href={buildPackWhatsAppUrl(plan)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Elegir ${plan.title}`}
          className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-control bg-accent px-4 py-2.5 text-xs font-black uppercase tracking-wide text-ink transition-colors hover:bg-accent-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex sm:w-auto"
        >
          <FaWhatsapp aria-hidden="true" className="text-lg" />
          Elegir {plan.title}
        </a>
      </div>
    </details>
  );
};

export default PlanCard;
