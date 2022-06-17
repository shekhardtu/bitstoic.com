module.exports = {
  content: [
    "./src/pages/**/*.{page.js,page.ts,page.jsx,page.tsx,js,ts,jsx,tsx}",
    "./src/components/**/*.{component.js,component.ts,component.jsx,component.tsx,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["nunito", "Roboto", "Helvetica", "Arial", "sans-serif"],
    },
    colors: {
      primary: "#4E60FF",
      neutral: "#545563",
      gray: {
        1: "#545563",
        2: "#C7C8D2",
        5: "#333333",
      },
      black: "#000",
      white: "#fff",
    },
    extend: {},
  },
  plugins: [],
};
