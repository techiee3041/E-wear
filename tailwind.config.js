/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
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
        "dark": "rgba(0, 0, 0, 0.4)",
        "black-dark": "rgb(0, 0, 0, 0.4)"
      },
      gridTemplateColumns: {
        'custom': 'repeat(4, minmax(0, 1fr))',
      },
      fontFamily: {
        fauna: ["Fauna One", "sans-serf"],
        cinzel: ["Cinzel", "sans-serf"],
      },
      screens: {
        xs: "480px",
        sm: "768px",
        md: "1060px",
      },
    },
  },
  plugins: [],
})

