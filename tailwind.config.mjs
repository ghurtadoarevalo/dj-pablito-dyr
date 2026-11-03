/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Montserrat"', "system-ui", "sans-serif"],
        display: ['"Bebas Neue"', "sans-serif"],
      },
      colors: {
        ink: "#0b0b0d",
        surface: "#141416",
        "surface-raised": "#171719",
        line: "#27272a",
        "line-strong": "#3f3f46",
        accent: "#eab308",
        "accent-bright": "#facc15",
        muted: "#a1a1aa",
      },
      borderRadius: {
        card: "0.5rem",
        control: "0.25rem",
        pill: "9999px",
      },
      backgroundImage: {
        "glow-hero":
          "radial-gradient(circle at 75% 20%, rgba(234,179,8,0.14), transparent 34%), radial-gradient(circle at 10% 80%, rgba(234,179,8,0.06), transparent 30%)",
        "glow-card":
          "linear-gradient(145deg, rgba(234,179,8,0.07), transparent 60%)",
        "glow-summary":
          "linear-gradient(150deg, rgba(234,179,8,0.06), transparent 45%)",
      },
      transitionTimingFunction: {
        reveal: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        reveal: "520ms",
        snap: "160ms",
      },
    },
  },
  plugins: [],
};
