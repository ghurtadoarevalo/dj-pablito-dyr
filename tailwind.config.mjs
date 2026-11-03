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
        ink: "#0c0a09",
        surface: "#181210",
        "surface-raised": "#1f1815",
        line: "#34261f",
        "line-strong": "#4a382d",
        accent: "#d9a62e",
        "accent-bright": "#f0c75e",
        muted: "#b9a99a",
        paper: "#f4ede4",
      },
      borderRadius: {
        card: "0.5rem",
        control: "0.25rem",
        pill: "9999px",
      },
      backgroundImage: {
        "glow-hero":
          "radial-gradient(circle at 75% 20%, rgba(217,166,46,0.16), transparent 36%), radial-gradient(circle at 12% 86%, rgba(224,33,138,0.10), transparent 38%)",
        "glow-card":
          "linear-gradient(145deg, rgba(217,166,46,0.08), transparent 60%)",
        "glow-summary":
          "linear-gradient(150deg, rgba(217,166,46,0.07), transparent 45%)",
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
