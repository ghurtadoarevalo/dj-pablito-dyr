export type ServicePlanId =
  | "celebration"
  | "full-dancing"
  | "karaoke-dancing"
  | "gold-karaoke"
  | "premium-infinity";

export interface ServicePlan {
  id: ServicePlanId;
  title: string;
  price: number;
  hours: number;
  extraHourPrice: number;
  description: string;
  highlights: readonly string[];
  features: readonly string[];
  featured: boolean;
}

export type CustomExtraId =
  | "animation"
  | "coanimation"
  | "karaoke"
  | "projector"
  | "videos"
  | "smoke";

export type LightingLevel = "basic" | "improved" | "advanced" | "pro";
export type LocationZone = "santiago" | "rural" | "outside";

export interface QuoteSelection {
  hours: number;
  extras: readonly CustomExtraId[];
  lighting: LightingLevel;
  location: LocationZone;
}

export const WHATSAPP_NUMBER = "56971768418";
export const RESERVATION_RATE = 0.2;

export const SERVICE_PLANS: readonly ServicePlan[] = [
  {
    id: "celebration",
    title: "Celebration",
    price: 150000,
    hours: 4,
    extraHourPrice: 25000,
    description: "4 Horas de Baile y música para celebraciones íntimas.",
    highlights: ["DJ", "Sonido JBL", "Iluminación básica"],
    features: [
      "DJ",
      "Playlist personalizada",
      "Iluminación: 2 LED Spider RGB, 2 Luces LED 18 RGB, 2 Beam 360°",
      "2 atriles de iluminación",
      "Amplificación profesional · 2 parlantes profesionales JBL",
      "2 Pantallas Led Luminosas personalizadas con el nombre del festejado(a)",
    ],
    featured: false,
  },
  {
    id: "full-dancing",
    title: "Full Dancing",
    price: 200000,
    hours: 5,
    extraHourPrice: 30000,
    description:
      "5 Horas de Baile non stop con animación para levantar tu fiesta.",
    highlights: ["DJ + animación", "Humo", "Iluminación mejorada"],
    features: [
      "DJ - Animación · Playlist personalizada",
      "Iluminación mejorada: 2 LED Spider RGB, 2 Luces LED RGB 18, 2 Beam 360°, 2 Láser RGB",
      "2 atriles de iluminación",
      "Amplificación profesional · 2 parlantes profesionales JBL",
      "2 Pantallas Led Luminosas personalizadas con el nombre del festejado(a)",
      "Máquina de humo",
    ],
    featured: false,
  },
  {
    id: "karaoke-dancing",
    title: "Karaoke Dancing",
    price: 250000,
    hours: 6,
    extraHourPrice: 35000,
    description: "6 Horas de Música, baile y karaoke para una fiesta completa.",
    highlights: [
      "Karaoke",
      "DJ + animación",
      "Iluminación avanzada",
      "2 micrófonos",
    ],
    features: [
      "DJ - Animación · Playlist personalizada",
      "Iluminación avanzada: 2 LED Spider RGB, 4 Luces LED RGB 18, 2 Beam 360°, 2 Láser RGB",
      "2 atriles o arco de iluminación (según espacio disponible)",
      "Videos",
      "Amplificación profesional · 2 parlantes profesionales JBL",
      "2 Pantallas Led Luminosas personalizadas con el nombre del festejado(a)",
      "Karaoke con 2 micrófonos",
      "Máquina de humo",
    ],
    featured: true,
  },
  {
    id: "gold-karaoke",
    title: "Gold Karaoke",
    price: 320000,
    hours: 7,
    extraHourPrice: 35000,
    description:
      "7 Horas de FULL Música, baile y Karaoke con telón y proyector.",
    highlights: [
      "Proyector + telón",
      "Karaoke",
      "Iluminación avanzada",
      "Videos",
    ],
    features: [
      "DJ - Animación · Playlist personalizada",
      "Iluminación avanzada: 2 LED Spider RGB, 6 Luces LED RGB 18, 2 Beam RGB 360°, 3 Láser RGB",
      "2 atriles o arco de iluminación (según espacio disponible)",
      "Proyector y telón",
      "Videos",
      "Amplificación profesional · 2 parlantes profesionales JBL",
      "2 Pantallas Led Luminosas personalizadas con el nombre del festejado(a)",
      "Karaoke con 2 micrófonos",
      "Máquina de humo",
    ],
    featured: false,
  },
  {
    id: "premium-infinity",
    title: "Premium Infinity",
    price: 400000,
    hours: 8,
    extraHourPrice: 40000,
    description:
      "8 Horas de FULL Música, videos, baile y karaoke con iluminación pro.",
    highlights: [
      "Coanimación",
      "Proyector + telón",
      "Iluminación profesional",
      "Karaoke",
    ],
    features: [
      "DJ - Animación · Co Animación (si fuese necesario) · Playlist personalizada",
      "Iluminación pro: 2 LED Spider RGB, 10 Luces LED RGB 18, 2 Beam RGB 360°, 3 Láser RGB",
      "Arco de iluminación Full",
      "Proyector y telón",
      "Videos",
      "Amplificación profesional · 2 parlantes profesionales JBL",
      "2 Pantallas Led Luminosas personalizadas con el nombre del festejado(a)",
      "Karaoke con 2 micrófonos",
      "Máquina de humo",
    ],
    featured: false,
  },
];

export const BASE_PACKAGE = {
  label: "Base · DJ, sonido e iluminación básica",
  amount: 150000,
  includedHours: 4,
  maxHours: 8,
  extraHourAmount: 25000,
} as const;

export const CUSTOM_EXTRA_OPTIONS: readonly {
  id: CustomExtraId;
  label: string;
  amount: number;
  requires?: CustomExtraId;
}[] = [
  { id: "animation", label: "Animación", amount: 20000 },
  {
    id: "coanimation",
    label: "Coanimación",
    amount: 25000,
    requires: "animation",
  },
  { id: "karaoke", label: "Karaoke + 2 micrófonos", amount: 30000 },
  {
    id: "projector",
    label: "Mejora a proyector + telón",
    amount: 20000,
    requires: "karaoke",
  },
  { id: "videos", label: "Videos musicales", amount: 10000 },
  { id: "smoke", label: "Máquina de humo", amount: 5000 },
];

export const LIGHTING_OPTIONS: readonly {
  id: LightingLevel;
  label: string;
  amount: number;
}[] = [
  { id: "basic", label: "Básica", amount: 0 },
  { id: "improved", label: "Mejorada", amount: 10000 },
  { id: "advanced", label: "Avanzada", amount: 25000 },
  { id: "pro", label: "Profesional", amount: 80000 },
];

export const LOCATION_OPTIONS: readonly {
  id: LocationZone;
  label: string;
  amount: number | null;
}[] = [
  { id: "santiago", label: "Santiago", amount: 0 },
  { id: "rural", label: "Sector rural", amount: 20000 },
  { id: "outside", label: "Fuera de Santiago", amount: null },
];

export const DEFAULT_QUOTE_SELECTION: QuoteSelection = {
  hours: BASE_PACKAGE.includedHours,
  extras: [],
  lighting: "basic",
  location: "santiago",
};
