/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'atmos-dark': '#0a0f12',
        'atmos-card': '#131b20',
        'atmos-border': '#202a30',
        'atmos-mint': '#00e5ff',
        'atmos-green': '#00ff88',
      }
    },
  },
  plugins: [],
}
