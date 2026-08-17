/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        ameltan: {
          DEFAULT: "#1f6f54",
          dark: "#14523e",
          light: "#eaf6f0",
          pale: "#f5f7f6",
        },
      },

      fontFamily: {
        sans: ["Arial", "sans-serif"],
      },

      boxShadow: {
        ameltan:
          "0 10px 30px rgba(31, 111, 84, 0.10)",
      },
    },
  },

  plugins: [],
};