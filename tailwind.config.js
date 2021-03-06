const colors = require("tailwindcss/colors")
const plugin = require("tailwindcss/plugin")
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      spacing: { 38: "9.5rem", 42: "10.5rem", 84: "21rem" },
      transitionDuration: { 600: "600ms" },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(0)", opacity: 0 },
          "50%": { transform: "scale(1)", opacity: 0.3 },
          "100%": { transform: "scale(1)", opacity: 0 }
        },
        "delay-in": {
          "0%": { opacity: 0 },
          "99%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        "loading-circle": {
          "0%": { "stroke-dasharray": "1px, 200px", "stroke-dashoffset": 0 },
          "50%": { "stroke-dasharray": "100px, 200px", "stroke-dashoffset": "-15px" },
          "100%": { "stroke-dasharray": "100px, 200px", "stroke-dashoffset": "-125px" }
        }
      },
      animation: { ripple: "ripple 500ms ease-in forwards" },
      backgroundImage: { "post-header": "url('/images/post-header.jpg')" }
    },
    colors: {
      primary: "#4aa8a8",
      deputy: "#c45c6e",
      secondary: "#faf7d9",
      black: "#0a0c10",
      white: "#f3f3f3",
      "black-secondary": "#424c54",
      "white-secondary": "#b7b9bb",
      light: "#eff1f5",
      dark: "#0e141b",
      "light-outstand": "#ffffff",
      "dark-outstand": "#1e262f",
      gray: colors.gray
    },
    fontFamily: {
      kitty: ["KittyKatt"],
      wotfard: ["Wotfard-Medium"]
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".clip-profile": {
          "clip-path": 'path("M 0,88 A 88,88,0,0,0,176,88 A 999,999,0,1,0,0,88")'
        }
      })
    })
  ]
}
