import WhatsAppButtonGreenLarge from "@assets/whatsappButton.png";
import { useAtom } from "jotai";
import {wspMessageAtom} from "./Atom"

const Contact = () => {
  const [wspMessage,] = useAtom(wspMessageAtom)

  return <section id="contact">
    <h1 className="text-center font-customFont text-3xl bg-zinc-800 py-10">
      Contacto
    </h1>

    <div className="flex flex-row place-content-center mt-5">
      <a
        aria-label="Chat on WhatsApp"
        href={`https://wa.me/56988182965?text=${wspMessage}`}
        target="_blank"
      >
        <img
          alt="Chat on WhatsApp"
          src={WhatsAppButtonGreenLarge.src}
          width={200}
        />
        <a></a>
      </a>

      <div>
        Si selecc
      </div>
    </div>
  </section>
};

export default Contact