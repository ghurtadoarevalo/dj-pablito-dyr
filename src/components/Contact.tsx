import { useAtom } from "jotai";
import { FaWhatsapp } from "react-icons/fa";

import { wspMessageAtom } from "./Atom";
import SocialMedia from "./SocialMedia.tsx";

type SocialMediaName =
  | "Instagram"
  | "Youtube"
  | "Tiktok"
  | "Whatsapp"
  | "Facebook";

type SocialMediaType = {
  name: SocialMediaName;
  url: string;
};

const socialMedia: SocialMediaType[] = [
  {
    name: "Instagram",
    url: "https://www.linkedin.com/in/ghurtadoa94/",
  },
  {
    name: "Youtube",
    url: "https://github.com/ghurtadoarevalo",
  },
  {
    name: "Tiktok",
    url: "",
  },
  {
    name: "Facebook",
    url: "",
  },
];

const Contact = () => {
  const [wspMessage] = useAtom(wspMessageAtom);

  return (
    <section id="contact" className="bg-slate-950 pb-10">
      <h1 className="text-center font-customFont text-3xl bg-zinc-800 py-10">
        Contacto
      </h1>
      <div className="flex flex-col md:flex-row place-content-center place-items-center lg:mx-auto bg-slate-900/80  lg:w-4/5 xl:w-2/3 p-5 mt-10 mx-3 rounded-3xl">
        <form className="flex flex-col gap-5 md:px-5 w-full text-white/90">
          <h2 className="text-center font-bold text-xl">
            Formulario de contacto
          </h2>
          <div className="flex flex-col gap-2">
            <p className=" text-sm">Nombre</p>
            <input
              className="rounded-r-lg rounded-b-lg bg-black/10 outline outline-1 hover:outline-white p-3 italic"
              type="text"
              placeholder="Ingresa tu nombre"
            />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <p className=" text-sm">Mensaje</p>
            <textarea
              className="rounded-r-lg rounded-b-lg bg-black/10 outline outline-1 hover:outline-white p-3 italic"
              placeholder={wspMessage}
              rows={6}
            />
          </div>
          <button
            type="submit"
            className="mx-auto hover:bg-white/30 bg-green-500/5 rounded-lg p-3 outline outline-1 outline-green-500/20 font-mono"
          >
            <a
              aria-label="Chat on WhatsApp"
              href={`https://wa.me/56988182965?text=hola`}
              className="flex flex-col place-content-center place-items-center"
            >
              <div className="flex md:flex-row place-content-center place-items-center gap-2">
                <FaWhatsapp className="text-2xl text-green-500/90" />
                <span className="text-white/80">Hablemos por WhatsApp</span>
              </div>
            </a>
          </button>
        </form>
        <div className="w-full mt-5 md:mt-0">
          <div className="bg-slate-800/60  p-10 rounded-xl text-white/80">
            <p className="text-center">
              ¿Aún no estás seguro/a del servicio que deseas contratar?
            </p>
            <p className="text-center mt-8">
              <span className="">Sígueme en mis RRSS </span>y averigua por qué
              tu fiesta quedará en las mejores manos con:
            </p>
            <p className="text-center font-customFont font-bold text-yellow-500 italic text-2xl mt-1">
              DJ PLABLITO DYR
            </p>
          </div>
          <ul className="flex items-center place-content-center mt-2 lg:gap-5">
            {socialMedia.map((media) => (
              <li>
                <a
                  className="flex flex-col items-center lg:gap-2 p-2 rounded-lg hover:bg-white/5 text-4xl text-yellow-500"
                  href={media.url}
                  target="_blank"
                >
                  <SocialMedia socialName={media.name} />
                  <span className=" text-sm text-gray-400">{media.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Contact;
