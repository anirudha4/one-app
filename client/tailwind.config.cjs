/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'black',
        secondary: 'white'
      },
      fontSize: {
      }
    },
  },
  plugins: [],
}