/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/views/**/*.ejs",],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand", 'sans-serif']
      },
      colors: {
        buhaha: 'rgb(38,38,38) !important'
      }
    },
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};