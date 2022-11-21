const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  darkMode: ["class", ".dark-mode"],
  theme: {
    extend: {
      maxWidth: {
        container: "1100px",
      },
      colors: {
        primary: {
          main: "#2b7fd5",
          secondary: "#79b8ff",
          outstand: "#9ecbff",
        },
        transparent: "transparent",
        current: "currentColor",
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
      keyframes: {
        "delay-in": {
          "0%": { opacity: 0 },
          "99%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "loading-circle": {
          "0%": { "stroke-dasharray": "1px, 200px", "stroke-dashoffset": 0 },
          "50%": {
            "stroke-dasharray": "100px, 200px",
            "stroke-dashoffset": "-15px",
          },
          "100%": {
            "stroke-dasharray": "100px, 200px",
            "stroke-dashoffset": "-125px",
          },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            "code::before": { content: "" },
            "code::after": { content: "" },
            a: { color: "#2b7fd5", "text-underline-offset": "20%" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
