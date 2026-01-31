/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vantexa-dark': '#0a0a0a',
        'vantexa-gray': '#1a1a1a',
        'vantexa-accent': '#d4af37', // Gold/Brass metallic feel default
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // We might want to use a google font later, but default sans is fine for now or we add @import
      },
    },
  },
  plugins: [],
}
