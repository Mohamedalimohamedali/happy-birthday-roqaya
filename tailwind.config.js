/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Reem Kufi', 'Cairo', 'sans-serif'],
        amiri: ['Amiri', 'Cairo', 'serif'],
        cairo: ['Cairo', 'sans-serif'],
      },
      colors: {
        rose: {
          50: '#fff5f7',
          100: '#fbcfe8',
          200: '#f9a8d4',
          300: '#f472b6',
          400: '#ec4899',
          500: '#db2777',
          600: '#be185d',
        },
        gold: {
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
        },
      },
      animation: {
        'gentle-float': 'gentle-float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
