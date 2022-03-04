module.exports = {
  content: ["./index.html", "./src/**/*.{ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      transitionDuration: {
        600: "600ms"
      }
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
      "dark-outstand": "#1e262f"
    },
    fontFamily: {
      kitty: ["KittyKatt"],
      wotfard: ["Wotfard-Medium"]
    }
  },
  plugins: []
}
