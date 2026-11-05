import { FaWhatsapp } from "react-icons/fa";
import { useRef, useState } from "react";
import SocialMedia from "./SocialMedia.tsx";
import { EVENT_TYPES } from "../data/site";
import { WHATSAPP_NUMBER } from "../data/services";
import { buildWhatsAppUrl } from "../lib/quote";

const displayPhone = "+56 9 7176 8418";

type FieldErrors = {
  name?: string;
  message?: string;
};

const Contact = () => {
  const [formClientName, setFormClientName] = useState("");
  const [formClientDate, setFormClientDate] = useState("");
  const [formClientEventType, setFormClientEventType] = useState("");
  const [formClientMessage, setFormClientMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [popupBlocked, setPopupBlocked] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const fieldClassName = (invalid: boolean) =>
    `rounded-control border bg-ink/60 p-3 text-paper outline-none transition-colors duration-snap placeholder:text-paper/60 focus-visible:border-accent ${
      invalid ? "border-accent-bright" : "border-line"
    }`;

  const validateForm = () => {
    const nextErrors: FieldErrors = {};

    if (formClientName.trim() === "") {
      nextErrors.name = "Escribe tu nombre para saber cómo llamarte.";
    }

    if (formClientMessage.trim() === "") {
      nextErrors.message = "Cuéntame qué necesitas para tu evento.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildMessage = () =>
    [
      `Nombre: ${formClientName}`,
      formClientDate ? `Fecha del evento: ${formClientDate}` : null,
      formClientEventType ? `Tipo de evento: ${formClientEventType}` : null,
      `Mensaje: ${formClientMessage}`,
    ]
      .filter((line): line is string => line !== null)
      .join("\n");

  const whatsappUrl = buildWhatsAppUrl(buildMessage());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPopupBlocked(false);

    if (!validateForm()) {
      if (formClientName.trim() === "") {
        nameRef.current?.focus();
      } else {
        messageRef.current?.focus();
      }
      return;
    }

    const opened = window.open(whatsappUrl, "_blank");

    if (!opened) {
      setPopupBlocked(true);
    }
  };

  const errorMessages = [errors.name, errors.message].filter(
    (message): message is string => Boolean(message),
  );

  return (
    <section
      id="contact"
      className="reveal border-t border-line bg-ink py-12 md:py-20"
      aria-label="Sección de contacto para contratar servicios con DJ Pablito Dyr"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-12">
          <h2 className="break-words font-display text-4xl uppercase leading-[0.9] tracking-tight text-paper sm:text-5xl lg:text-7xl">
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
            noValidate
          >
            <h3 className="text-lg font-bold text-paper">
              Cuéntame de tu evento
            </h3>

            {errorMessages.length > 0 && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-control border border-accent-bright/60 bg-accent/10 p-3"
              >
                <span aria-hidden="true" className="mt-0.5 text-accent-bright">
                  ⚠
                </span>
                <ul className="flex flex-col gap-1 text-sm font-semibold text-paper">
                  {errorMessages.map((message) => (
                    <li key={message}>{message}</li>
                  ))}
                </ul>
              </div>
            )}

            {popupBlocked && (
              <div
                role="alert"
                className="flex flex-col gap-1 rounded-control border border-accent-bright/60 bg-accent/10 p-3 text-sm text-paper"
              >
                <span className="font-semibold">
                  No pudimos abrir WhatsApp: tu navegador bloqueó la ventana.
                </span>
                <a
                  className="font-bold text-accent-bright underline underline-offset-2"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir WhatsApp con el mensaje escrito
                </a>
                <span>
                  O escríbeme directo al{" "}
                  <a
                    className="font-bold text-paper underline underline-offset-2"
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {displayPhone}
                  </a>
                  .
                </span>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm text-paper/80" htmlFor="contact-name">
                Nombre
              </label>
              <input
                ref={nameRef}
                id="contact-name"
                name="nombre"
                className={fieldClassName(Boolean(errors.name))}
                type="text"
                placeholder="Ingresa tu nombre"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? "contact-name-error" : undefined
                }
                value={formClientName}
                onChange={(event) => setFormClientName(event.target.value)}
              />
              {errors.name && (
                <p id="contact-name-error" className="text-xs text-paper/80">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-paper/80" htmlFor="contact-date">
                  Fecha del evento
                </label>
                <input
                  id="contact-date"
                  name="fecha"
                  className={`${fieldClassName(false)} [color-scheme:dark]`}
                  type="date"
                  value={formClientDate}
                  onChange={(event) => setFormClientDate(event.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-sm text-paper/80"
                  htmlFor="contact-event-type"
                >
                  Tipo de evento
                </label>
                <select
                  id="contact-event-type"
                  name="tipo-evento"
                  className={fieldClassName(false)}
                  value={formClientEventType}
                  onChange={(event) =>
                    setFormClientEventType(event.target.value)
                  }
                >
                  <option value="">Elige una opción</option>
                  {EVENT_TYPES.map((eventType) => (
                    <option key={eventType} value={eventType}>
                      {eventType}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-sm text-paper/80"
                htmlFor="contact-message"
              >
                Mensaje
              </label>
              <textarea
                ref={messageRef}
                id="contact-message"
                name="mensaje"
                className={fieldClassName(Boolean(errors.message))}
                placeholder="Comensales, lugar, qué te gustaría incluir."
                value={formClientMessage}
                rows={5}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
                onChange={(event) => setFormClientMessage(event.target.value)}
              />
              {errors.message && (
                <p id="contact-message-error" className="text-xs text-paper/80">
                  {errors.message}
                </p>
              )}
            </div>

            <p className="text-xs leading-relaxed text-muted">
              Se abre WhatsApp con tu mensaje ya escrito, listo para enviar. No
              se envía nada desde esta página.
            </p>

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
