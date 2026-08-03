/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0D1B2A',
          950: '#071018',
          900: '#0D1B2A',
          800: '#1B2838',
          700: '#2A3A4D',
        },
        gold: {
          DEFAULT: '#D4AF37',
          600: '#C59B27',
          400: '#E0C35A',
          100: '#F5E9C0',
        },
        cream: '#F7F5F0',
      },
      fontFamily: {
        heading: ["'Instrument Serif'", 'serif'],
        body: ["'Barlow'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
