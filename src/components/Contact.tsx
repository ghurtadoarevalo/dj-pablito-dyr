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
    <section id="contact" className="bg-slate-950 pb-10" aria-label="Sección de contacto para contratar servicios con dj pablito dyr">
      <h1 className="text-center font-customFont text-3xl bg-zinc-800 py-10">
        Contacto
      </h1>
      <div className="flex flex-col md:flex-row place-content-center place-items-center lg:mx-auto bg-slate-900/80  lg:w-4/5 xl:w-2/3 p-5 mt-10 mx-3 rounded-3xl">
        <form
          className="flex flex-col gap-5 md:px-5 w-full text-white/90"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center font-bold text-xl">
            Formulario de contacto
          </h2>
          <div className="flex flex-col gap-2">
            <p className=" text-sm">Nombre</p>
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
            <p className=" text-sm">Mensaje</p>
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
            className="flex flex-col place-content-center place-items-center mx-auto hover:bg-white/30 bg-green-500/5 rounded-lg p-3 outline outline-1 outline-green-500/20 font-mono"
          >
            <div className="flex md:flex-row place-content-center place-items-center gap-2">
              <FaWhatsapp className="text-2xl text-green-500/90" />
              <span className="text-white/80">Hablemos por WhatsApp</span>
            </div>
          </button>
        </form>
        <div className="w-full mt-5 md:mt-0">
          <div className="bg-slate-800/60  p-10 rounded-xl text-white/80 mb-5">
            <p className="text-center">
              ¿Aún no estás seguro/a del servicio que deseas contratar?
            </p>
            <p className="text-center mt-8">
              <span className="">Sígueme en mis RRSS </span>y averigua por qué
              tu fiesta quedará en las mejores manos con:
            </p>
            <p className="text-center font-customFont font-bold text-yellow-500 italic text-2xl mt-1">
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
