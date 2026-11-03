import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import SocialMedia from "./SocialMedia.tsx";
import { WHATSAPP_NUMBER } from "../data/services";

const displayPhone = "+56 9 7176 8418";

const Contact = () => {
  const [formClientName, setFormClientName] = useState("");
  const [formClientMessage, setFormClientMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      redirectToWhatsApp();
    }
  };

  const validateForm = () => {
    if (formClientName.trim() === "" || formClientMessage.trim() === "") {
      setIsFormValid(false);
      return false;
    }
    setIsFormValid(true);
    return true;
  };

  const redirectToWhatsApp = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Nombre cliente: ${formClientName}\nMensaje: ${formClientMessage}`,
      )}`,
      "_blank",
    );
  };

  return (
    <section
      id="contact"
      className="reveal border-t border-line bg-ink py-12 md:py-20"
      aria-label="Sección de contacto para contratar servicios con DJ Pablito Dyr"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-12">
          <p className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.18em] text-accent">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            Hablemos
          </p>
          <h2 className="mt-2 break-words font-display text-4xl uppercase leading-[0.9] tracking-tight text-paper sm:text-5xl lg:text-7xl">
            Contacto
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Cuéntame la fecha y qué tienes en mente. Te respondo con
            disponibilidad y el valor exacto.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <form
            className="flex flex-col gap-5 rounded-card border border-line bg-surface p-5 sm:p-7"
            onSubmit={handleSubmit}
          >
            <h3 className="text-lg font-bold text-paper">
              Formulario de contacto
            </h3>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-paper/80" htmlFor="contact-name">
                Nombre
              </label>
              <input
                id="contact-name"
                className="rounded-control border border-line bg-ink/60 p-3 text-paper outline-none transition-colors duration-snap placeholder:text-paper/45 focus-visible:border-accent"
                type="text"
                placeholder="Ingresa tu nombre"
                autoComplete="name"
                required
                value={formClientName}
                onChange={(event) => setFormClientName(event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-sm text-paper/80"
                htmlFor="contact-message"
              >
                Mensaje
              </label>
              <textarea
                id="contact-message"
                className="rounded-control border border-line bg-ink/60 p-3 text-paper outline-none transition-colors duration-snap placeholder:text-paper/45 focus-visible:border-accent"
                placeholder="Fecha del evento, tipo de celebración y qué te gustaría incluir."
                value={formClientMessage}
                rows={6}
                required
                onChange={(event) => setFormClientMessage(event.target.value)}
              />
            </div>
            {!isFormValid && (
              <p
                role="alert"
                className="text-sm font-semibold text-accent-bright"
              >
                Completa tu nombre y el mensaje para continuar.
              </p>
            )}
            <button
              type="submit"
              className="flex min-h-12 items-center justify-center gap-2 rounded-control bg-accent p-3 font-sans transition-colors duration-snap hover:bg-accent-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <FaWhatsapp className="text-xl text-ink" aria-hidden="true" />
              <span className="text-sm font-black uppercase tracking-wide text-ink">
                Hablemos por WhatsApp
              </span>
            </button>
          </form>

          <aside className="flex flex-col gap-6">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-muted">
                Directo
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex min-h-11 items-center gap-2 font-display text-2xl tracking-tight text-accent-bright transition-colors hover:text-accent"
              >
                <FaWhatsapp aria-hidden="true" className="text-xl" />
                {displayPhone}
              </a>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Lunes a domingo, 9:00 a 22:00.
              </p>
            </div>

            <div className="border-t border-line pt-6">
              <p className="text-sm leading-relaxed text-paper/80">
                ¿Todavía no sabes qué pack te conviene? Escríbeme y lo vemos
                juntos, sin compromiso.
              </p>
            </div>

            <div className="border-t border-line pt-6">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-muted">
                Redes
              </p>
              <div className="mt-2">
                <SocialMedia namesRequired={false} align="start" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Contact;
