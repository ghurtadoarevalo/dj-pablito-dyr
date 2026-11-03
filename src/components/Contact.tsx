import { FaWhatsapp } from "react-icons/fa";
import SocialMedia from "./SocialMedia.tsx";
import { useState } from "react";

const Contact = () => {
  const [formClienttName, setFormClienttName] = useState("");
  const [formClientMessage, setFormClientMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);

  const handleSubmit = () => {
    if (validateForm()) {
      redirectToWhatsApp();
    }
  };

  const validateForm = () => {
    if (formClienttName.trim() === "" || formClientMessage.trim() === "") {
      setIsFormValid(false);
      return false;
    }
    setIsFormValid(true);
    return true;
  };

  const redirectToWhatsApp = () => {
    window.open(
      `https://wa.me/56971768418?text=${encodeURIComponent(
        `Nombre cliente: ${formClienttName}\nMensaje: ${formClientMessage}`,
      )}`,
      "_blank",
    );
  };

  return (
    <section
      id="contact"
      className="reveal border-t border-line bg-ink py-16 md:py-24"
      aria-label="Sección de contacto para contratar servicios con dj pablito dyr"
    >
      <div className="mx-auto mb-8 max-w-7xl px-4 sm:px-6 md:mb-12 lg:px-8">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent">
          Hablemos
        </p>
        <h2 className="mt-2 break-words font-display text-3xl uppercase tracking-tight text-white md:text-4xl lg:text-5xl">
          Contacto
        </h2>
      </div>
      <div className="flex flex-col md:flex-row place-content-center place-items-center lg:mx-auto bg-surface  lg:w-4/5 xl:w-2/3 p-5 mt-10 mx-3 rounded-card">
        <form
          className="flex flex-col gap-5 md:px-5 w-full text-white"
          onSubmit={handleSubmit}
        >
          <h3 className="text-center font-bold text-2xl">
            Formulario de contacto
          </h3>
          <div className="flex flex-col gap-2">
            <p className="text-base">Nombre</p>
            <input
              className="rounded-r-lg rounded-b-lg bg-black/10 outline outline-1 hover:outline-white p-3 italic"
              type="text"
              placeholder="Ingresa tu nombre"
              required
              value={formClienttName}
              onChange={(event) => setFormClienttName(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <p className="text-base">Mensaje</p>
            <textarea
              className="rounded-r-lg rounded-b-lg bg-black/10 outline outline-1 hover:outline-white p-3 italic"
              placeholder={
                "Ejemplo: Hola, me interesa saber más sobre los servicios que entrega."
              }
              value={formClientMessage}
              rows={6}
              required
              onChange={(event) => setFormClientMessage(event.target.value)}
            />
          </div>
          {!isFormValid && (
            <p className="text-red-600">
              Por favor, completa todos los campos.
            </p>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            className="flex flex-col place-content-center place-items-center mx-auto hover:bg-white/30 bg-surface rounded-card p-3 outline outline-1 outline-green-500/20 font-sans"
          >
            <div className="flex md:flex-row place-content-center place-items-center gap-2">
              <FaWhatsapp className="text-2xl text-green-500/90" />
              <span className="text-white/80">Hablemos por WhatsApp</span>
            </div>
          </button>
        </form>
        <div className="w-full mt-5 md:mt-0">
          <div className="bg-surface-raised  p-10 rounded-card text-white/80 mb-5">
            <p className="text-center">
              ¿Aún no estás seguro/a del servicio que deseas contratar?
            </p>
            <p className="text-center mt-8">
              <span className="">Sígueme en mis RRSS </span>y averigua por qué
              tu fiesta quedará en las mejores manos con:
            </p>
            <p className="text-center font-sans font-bold text-accent italic text-2xl mt-1">
              DJ PABLITO DYR
            </p>
          </div>
          <SocialMedia namesRequired={true} />
        </div>
      </div>
    </section>
  );
};

export default Contact;
