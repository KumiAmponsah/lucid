/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      height: {
        '128': '28rem',
      },
      width: {
        '128': '28rem',
      }

    },
  },
  
  plugins: [require("daisyui")],
}