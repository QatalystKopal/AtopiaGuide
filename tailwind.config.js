/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        parchment: "#FBF8F2",
        "parchment-warm": "#F3EDE2",
        "parchment-deep": "#EAE2D3",
        espresso: "#241C18",
        "espresso-soft": "#4A3F39",
        "espresso-muted": "#7A6E67",
        sage: "#4A6349",
        "sage-soft": "#8A9F89",
        "sage-subtle": "#E8EFE6",
        terracotta: "#B85D43",
        "terracotta-soft": "#F6EAE6",
        "ink-line": "rgba(36, 28, 24, 0.12)",
      },
      fontFamily: {
        serif: ["Newsreader", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        xs: "0 1px 2px rgba(36, 28, 24, 0.05)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
