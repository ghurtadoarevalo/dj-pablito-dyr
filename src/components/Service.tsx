import { SiDiscogs } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";

interface ServiceInterface {
  title: string;
  price: string;
  description: string;
  features: string[];
  chips: string[];
  featured: boolean;
  wspMessage: string;
}

type ServiceProps = {
  service: ServiceInterface;
  // `key` is a React reconciler prop, but Astro passes it explicitly when
  // rendering this component inside `.map()`. Keeping it in the type prevents
  // a TypeScript error in the parent `.astro` file.
  key?: React.Key;
};

const Service = ({ service }: ServiceProps) => {
  return service.featured ? (
    <article
      className="relative w-full bg-yellow-500/15 border border-yellow-500/50 px-5 py-7 rounded-3xl text-white/90 shadow-lg shadow-yellow-500/10"
      itemScope
      itemType="http://schema.org/Offer"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-4">
        <div>
          <span className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            Más contratado
          </span>
          <header className="mt-2 flex items-center gap-3 text-xl font-mono">
            <SiDiscogs className="text-2xl text-yellow-400" />
            <span itemProp="name">{service.title.toUpperCase()}</span>
          </header>
        </div>
        <div className="text-left md:text-right">
          <h2 className="text-4xl font-bold font-customFont">
            *<span itemProp="price">{service.price}</span>
          </h2>
          <meta itemProp="priceCurrency" content="CLP" />
        </div>
      </div>

      <p className="text-lg opacity-90 mb-4" itemProp="description">
        {service.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        {service.chips.map((chip, index) => (
          <span
            key={`chip-featured-${index}`}
            className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg px-3 py-1.5 text-sm"
          >
            {chip}
          </span>
        ))}
      </div>

      <ul className="list-disc pl-5 mb-16 space-y-1.5 text-balance text-base opacity-95">
        {service.features.map((feature, index) => (
          <li key={`featured-${index}`}>{feature}</li>
        ))}
      </ul>

      <a
        href={`https://wa.me/56971768418?text=${encodeURIComponent(service.wspMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-5 right-5 flex items-center gap-2 hover:bg-white/20 bg-white/10 text-white outline outline-2 outline-green-500/60 rounded-xl px-5 py-2 text-sm font-mono transition-colors"
      >
        <FaWhatsapp className="text-xl text-green-500" />
        <span>Contáctame</span>
      </a>
    </article>
  ) : (
    <article
      className="relative w-full bg-zinc-800 px-5 py-7 rounded-3xl text-white/90"
      itemScope
      itemType="http://schema.org/Offer"
    >
      <div className="flex justify-between items-start gap-3 mb-3">
        <header className="flex items-center gap-2 text-lg font-mono">
          <SiDiscogs className="text-xl text-yellow-500" />
          <span itemProp="name">{service.title.toUpperCase()}</span>
        </header>
        <h2 className="text-2xl font-bold font-customFont whitespace-nowrap">
          *<span itemProp="price">{service.price}</span>
        </h2>
        <meta itemProp="priceCurrency" content="CLP" />
      </div>

      <p className="text-base opacity-85 mb-3" itemProp="description">
        {service.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {service.chips.map((chip, index) => (
          <span
            key={`chip-standard-${index}`}
            className="bg-zinc-700 rounded-md px-2.5 py-1 text-xs"
          >
            {chip}
          </span>
        ))}
      </div>

      <ul
        className="list-disc pl-5 mb-16 space-y-1 text-balance text-sm opacity-90"
        style={{ listStyleType: "circle" }}
      >
        {service.features.map((feature, index) => (
          <li key={`standard-${index}`}>{feature}</li>
        ))}
      </ul>

      <a
        href={`https://wa.me/56971768418?text=${encodeURIComponent(service.wspMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-5 right-5 flex items-center gap-2 hover:bg-white/20 bg-green-500/10 text-white outline outline-1 outline-green-500/80 rounded-lg px-4 py-2 text-xs font-mono transition-colors"
      >
        <FaWhatsapp className="text-lg text-green-500" />
        <span>Contáctame</span>
      </a>
    </article>
  );
};

export default Service;
