/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#faf8f5',
          100: '#f0ebe3',
          200: '#ddd0c0',
          300: '#c4aa8a',
          400: '#a8825a',
          500: '#6f4e37',
          600: '#5a3d2b',
          700: '#4a3020',
          800: '#3d2618',
          900: '#2e1c10',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
