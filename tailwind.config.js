/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandOrange: '#D96846',
        brandGreen: '#596235',
        brandLight: '#CDCBD6',
        brandDark: '#2F3020',
      },
    },
  },
  plugins: [],
}