/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        farmer: {
          light: '#86efac',
          DEFAULT: '#22c55e',
          dark: '#15803d',
        },
        student: {
          light: '#93c5fd',
          DEFAULT: '#3b82f6',
          dark: '#1e40af',
        },
        startup: {
          light: '#fdba74',
          DEFAULT: '#f97316',
          dark: '#c2410c',
        },
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [],
}
