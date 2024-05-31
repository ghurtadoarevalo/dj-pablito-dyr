import { useAtom } from "jotai";
import { wspMessageAtom } from "./Atom";
import { SiDiscogs } from "react-icons/si";

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
  const [, setWspServiceMessage] = useAtom(wspMessageAtom);

  const contactForm = (wspServiceMessage: string) => {
    console.log("aaa");
    setWspServiceMessage(wspServiceMessage);
  };

  return service.featured ? (
    <div className="relative w-full shadow-inner shadow-white/40 bg-[#4B1B6B]/60 p-8  rounded-3xl text-white/90">
      <header className="place-content-center items-center font-mono text-lg flex flex-row gap-4">
        <SiDiscogs className="text-2xl" /> {service.title.toUpperCase()}
      </header>
      <h3 className="text-center text-4xl font-bold font-customFont">
        {service.price}
      </h3>
      <p className="mt-10  text-center">{service.description}</p>
      <ul className="list-disc ml-8 mt-5 px-4 mb-16">
        {service.features.map((feature: string) => (
          <li>{feature}</li>
        ))}
      </ul>

      <a href="#contact">
        <button
          onClick={() => contactForm(service.wspMessage)}
          className="absolute bottom-5 md:bottom-14 right-0 left-0 mx-auto hover:bg-white/30 bg-zinc-700/90 text-white/90 outline outline-1 outline-white/30 rounded-xl w-1/2 p-3 font-mono"
        >
          Contáctame
        </button>
      </a>
    </div>
  ) : (
    <div className="relative w-full lg:w-5/6 py-10 px-8  bg-zinc-800 rounded-3xl text-white/90">
      <header className="place-content-center items-center font-mono text-lg flex flex-row gap-4">
        <SiDiscogs className="text-2xl" /> {service.title.toUpperCase()}
      </header>
      <h3 className="text-center text-2xl font-bold font-customFont">
        {service.price}
      </h3>
      <hr className="mt-6 w-2/3 mx-auto" />
      <p className="mt-3 text-center">{service.description}</p>
      <ul className="list-disc ml-8 mt-5 mb-16">
        {service.features.map((feature: string) => (
          <li style={{ listStyleType: "circle" }}>{feature}</li>
        ))}
      </ul>

      <a href="#contact">
        <button
          onClick={() => contactForm(service.wspMessage)}
          className="absolute bottom-5 right-0 left-0 mx-auto hover:bg-white/30 rounded-lg w-1/2 p-3 outline outline-1 outline-[#6B2E94] font-mono"
        >
          Contáctame
        </button>
      </a>
    </div>
  );
};

export default Service;
