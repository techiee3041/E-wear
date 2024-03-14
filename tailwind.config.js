/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-100": "#FFE1E0",
        "primary-200": "#999999",
        "primary-300": "##666666",
        "primary-400": "#333333",
        "primary-500": "#000000",
        "secondary-100": "#f7ccd2",
        "secondary-200": "#ef99a4",
        "secondary-300": "#e66677",
        "secondary-400": "#de3349",
        "secondary-500": "#d6001c",
        "secondary-600": "#ab0016",
        "secondary-700": "#800011",
        "secondary-800": "#56000b",
        "secondary-900": "#2b0006",
        "neutral-dark-700": "#FFC132",
        "neutral-main-500": "#FFC132",
        "neutral-light-100": "#FFC132",
        "background": "rgba(255,255,255,0.95)",
      },
      // backgroundImage: (theme) => ({
      //   "gradient-yellowred":
      //     "linear-gradient(90deg, #FF616A 0%, #FFC837 100%)",
      //   "mobile-home": "url('./assets/HomePageGraphic.png')",
      // }),
      fontFamily: {
        fauna: ["Fauna One", "sans-serf"],
        cinzel: ["Cinzel", "sans-serf"],
      },
      // content: {
      //   evolvetext: "url('./assets/EvolveText.png')",
      //   abstractwaves: "url('./assets/AbstractWaves.png')",
      //   sparkles: "url('./assets/Sparkles.png')",
      //   circles: "url('./assets/Circles.png')",
      // },
      screens: {
        xs: "480px",
        sm: "768px",
        md: "1060px",
      },
    },
  },
  plugins: [],
}

