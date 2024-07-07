import { SiDiscogs } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";

interface ServiceInterface {
  title: string;
  price: string;
  description: string;
  features: string[];
  featured: boolean;
  wspMessage: string;
}

type ServiceProps = {
  service: ServiceInterface;
};

const Service = ({ service }: ServiceProps) => {

  return service.featured ? (
    <div className="relative w-full shadow-inner shadow-white/40 bg-yellow-500/65 px-3 p-8  rounded-3xl text-white/80">
      <header className="place-content-center items-center font-mono text-lg flex flex-row gap-4">
        <SiDiscogs className="text-2xl" /> {service.title.toUpperCase()}
      </header>
      <h2 className="text-center text-4xl font-bold font-customFont">
        *{service.price}
      </h2>
      <p className="mt-5 text-center w-5/6 md:w-full mx-auto">{service.description}</p>
      <ul className="list-disc mt-5 mb-16 mx-auto w-[70%] lg:w-full lg:px-8 text-balance">
        {service.features.map((feature: string) => (
          <li>{feature}</li>
        ))}
      </ul>

      <a
        aria-label="Chat on WhatsApp"
        href={`https://wa.me/56971768418?text=${service.wspMessage}`}
        target="_blank"
      >
        <button
          className="absolute bottom-5 md:bottom-8 right-0 left-0 mx-auto hover:bg-white/30 bg-white/5 text-white/90 outline outline-2 outline-green-500/50 rounded-xl w-2/3 p-3 font-mono"
        >
          <div className="flex md:flex-row place-content-center place-items-center gap-2">
            <FaWhatsapp className="text-3xl text-green-500/90" />
            <span className="font">Contáctame</span>
          </div>
        </button>
      </a>
    </div>
  ) : (
    <div className="relative w-full lg:w-5/6 py-10 px-4  bg-zinc-800 rounded-3xl text-white/80">
      <header className="place-content-center items-center font-mono text-lg flex flex-row gap-4">
        <SiDiscogs className="text-2xl" /> {service.title.toUpperCase()}
      </header>
      <h2 className="text-center text-2xl font-bold font-customFont">
        *{service.price}
      </h2>
      <hr className="mt-6 w-2/3 mx-auto" />
      <p className="mt-3 text-center">{service.description}</p>
      <ul className="list-disc mt-5 mb-16 mx-auto w-[70%] lg:w-full lg:px-4 text-balance">
        {service.features.map((feature: string) => (
          <li style={{ listStyleType: "circle" }}>{feature}</li>
        ))}
      </ul>

      <a
        aria-label="Chat on WhatsApp"
        href={`https://wa.me/56971768418?text=${service.wspMessage}`}
        target="_blank"
        className="flex flex-col place-content-center place-items-center"
      >
        <button className="absolute bottom-5 right-0 left-0 mx-auto hover:bg-white/30 bg-green-500/5 rounded-lg w-2/3 p-3 outline outline-1 outline-green-500/20 font-mono">
          <div className="flex md:flex-row place-content-center place-items-center gap-2">
            <FaWhatsapp className="text-2xl text-green-500/90" />
            <span>Contáctame</span>
          </div>
        </button>
      </a>
    </div>
  );
};

export default Service;
