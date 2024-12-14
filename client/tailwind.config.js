/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#0059FB",
        button: "#D3FFF7",
        primaryRed: "#E43D12",
        secondaryRed: "#D6536D",
        lightPink: "#FFA2B6",
        yellowAccent: "#EFB11D",
        offWhite: "#EBE9E1",
      },
      fontFamily: {
        heading: ["Vollkorn", "serif"], // Vollkorn for headings
        body: ["Work Sans", "sans-serif"], // Work Sans for body
      },
    },
    screens: {
      sm: "320px",

      md: "425px",

      lg: "768px",

      xl: "1024px",

      "2xl": "1440px",
    },
  },
  plugins: [],
};
