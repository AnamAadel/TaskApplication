/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#CFEFA6",
        dark: "#50493E",
      }
    },
  },
  plugins: [require("daisyui")],
}


