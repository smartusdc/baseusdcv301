/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '22': '5.5rem',
      },
      colors: {
        base: {
          50: '#F5F7FF',
          100: '#EBEFFF',
          200: '#D6DFFF',
          300: '#B3C5FF',
          400: '#809CFF',
          500: '#4D73FF',
          600: '#1A4AFF',
          700: '#0033FF',
          800: '#0026CC',
          900: '#001A8C',
        },
      },
      fontSize: {
        'stat': ['4.5rem', '1'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-stat': 'linear-gradient(135deg, #1A4AFF 0%, #0033FF 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}