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
    <article className="relative w-full shadow-inner shadow-white/40 bg-yellow-500/65 px-3 p-8  rounded-3xl text-white/80" itemScope itemType="http://schema.org/Offer">
      <header className="place-content-center items-center font-mono text-lg flex flex-row gap-4">
        <SiDiscogs className="text-2xl" /> <span itemProp="name">{service.title.toUpperCase()}</span>
      </header>
      <h2 className="text-center text-4xl font-bold font-customFont">
        *<span itemProp="price">{service.price}</span>
        <meta itemProp="priceCurrency" content="CLP" />
      </h2>
      <p className="mt-5 text-center w-5/6 md:w-full mx-auto text-lg" itemProp="description">{service.description}</p>
      <ul className="list-disc mt-5 mb-16 mx-auto w-[70%] lg:w-full lg:px-8 text-balance text-lg">
        {service.features.map((feature: string) => (
          <li>{feature}</li>
        ))}
      </ul>

      <a
        aria-label="Chat on WhatsApp"
        href={`https://wa.me/56971768418?text=${service.wspMessage}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          className="absolute bottom-5 md:bottom-8 right-0 left-0 mx-auto hover:bg-white/30 bg-white/5 text-white/90 outline outline-2 outline-green-500/50 rounded-xl w-2/3 p-3 font-mono"
        >
          <div className="flex md:flex-row place-content-center place-items-center gap-2">
            <FaWhatsapp className="text-3xl text-green-500/90" />
            <span className="text-xl">Contáctame</span>
          </div>
        </button>
      </a>
    </article>
  ) : (
    <article className="relative w-full lg:w-5/6 py-10 px-4  bg-zinc-800 rounded-3xl text-white/80" itemScope itemType="http://schema.org/Offer">
      <header className="place-content-center items-center font-mono text-lg flex flex-row gap-4">
        <SiDiscogs className="text-2xl" /> <span itemProp="name">{service.title.toUpperCase()}</span>
      </header>
      <h2 className="text-center text-2xl font-bold font-customFont">
        *<span itemProp="price">{service.price}</span>
        <meta itemProp="priceCurrency" content="CLP" />
      </h2>
      <hr className="mt-6 w-2/3 mx-auto" />
      <p className="mt-3 text-center text-lg" itemProp="description">{service.description}</p>
      <ul className="list-disc mt-5 mb-16 mx-auto w-[70%] lg:w-full lg:px-4 text-balance text-lg">
        {service.features.map((feature: string) => (
          <li style={{ listStyleType: "circle" }}>{feature}</li>
        ))}
      </ul>

      <a
        aria-label="Chat on WhatsApp"
        href={`https://wa.me/56971768418?text=${service.wspMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col place-content-center place-items-center"
      >
        <button className="absolute bottom-5 right-0 left-0 mx-auto hover:bg-white/30 bg-green-500/5 rounded-lg w-2/3 p-3 outline outline-1 outline-green-500/80 font-mono">
          <div className="flex md:flex-row place-content-center place-items-center gap-2">
            <FaWhatsapp className="text-3xl text-green-500/100" />
            <span className="text-lg">Contáctame</span>
          </div>
        </button>
      </a>
    </article>
  );
};

export default Service;
