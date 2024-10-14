import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        sml: "1024px",
        // => @media (min-width: 1024px) { ... }

        mdl: "1281px",
        lgl: "1400px",
        // => @media (min-width: 1280px) { ... }
      },
      colors: {
        background: "#093545",
        secondary: "#224957",
        main: "#0E3337",
        dblue: "#0F123F",
        btnColor:"#2BD17E"
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        manrope: ["var(--font-manrope)"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [nextui()],
};
export default config;
