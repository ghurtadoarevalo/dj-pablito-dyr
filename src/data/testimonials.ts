export const INSTAGRAM_PROFILE_URL =
  "https://www.instagram.com/dj_dyr_producciones/";

export interface Testimonial {
  handle: string;
  quote: string;
  context: string;
  sourceUrl: string;
  highlighted: boolean;
}

const profile = INSTAGRAM_PROFILE_URL;

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    handle: "@tamaritaandrea",
    quote:
      "100% recomendado!!! Nos encantó tenerte en el cumple de mi esposo. La música estuvo demasiado buena, bailamos toda la noche. Y además muy buena onda y preocupado de que todo saliera bien.",
    context: "Cumpleaños",
    sourceUrl: profile,
    highlighted: true,
  },
  {
    handle: "@moniquita36molina",
    quote:
      "Estuvo espectacular la música las luces la producción todo. … Se pasaron 5 estrellas estos dj. Amables complaciendo todo el rato un amor. Muy recomendable excelente servicio",
    context: "Reseña en Instagram",
    sourceUrl: profile,
    highlighted: false,
  },
  {
    handle: "@jeca_mora",
    quote: "Muchas gracias a ti, lo pasamos regio, muy bueno todo",
    context: "Reseña en Instagram",
    sourceUrl: profile,
    highlighted: false,
  },
  {
    handle: "@ceciliamolinalillo",
    quote: "Maravillos todo excelente gracias gracias",
    context: "Bodas de oro",
    sourceUrl: profile,
    highlighted: false,
  },
  {
    handle: "@xmora.b",
    quote: "… muchas gracias al Dj que fue parte de que todos disfrutarán",
    context: "Reseña en Instagram",
    sourceUrl: profile,
    highlighted: false,
  },
];
