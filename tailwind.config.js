const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: ["class", ".dark-mode"],
  theme: {
    extend: {
      maxWidth: {
        container: "1100px",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      sky: colors.sky,
      dark: {
        main: "#24292e",
        deep: "#1f2428",
      },
      light: {
        main: "#f3f3f3",
        deep: "#ffffff",
        dim: "#e8ebef",
      },
      black: "#000000",
      white: "#ffffff",
    },
  },
  plugins: [],
};
