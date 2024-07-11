/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./Main.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "sans": ["Itim", "cursive"]
      }
    },
  },
  plugins: [],
}

