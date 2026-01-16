/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F9F7F2",
        charcoal: "#2D2D2D",
        "lotus-green": "#4A5D4E",
        "petal-pink": "#D8A7B1",
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
