/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:    '#0E1D2D',
        greige:  '#8B8179',
        'warm-gray': '#A09DA0',
        offwhite: '#F7F5F2',
        sand:    '#BFAE9B',
        sage:    '#9A9B87',
        taupe:   '#8A7563',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':   'fadeIn 0.4s ease-out',
        'slide-up':  'slideUp 0.4s ease-out',
        'hero-zoom': 'heroZoom 16s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn:   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:  { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        heroZoom: { '0%': { transform: 'scale(1.05)' }, '100%': { transform: 'scale(1.00)' } },
      },
    },
  },
  plugins: [],
}
