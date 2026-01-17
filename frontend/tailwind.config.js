/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        leaf: '#A8D5BA',
        'leaf-dark': '#7AB893',
        forest: '#4A7C59',
        'forest-dark': '#2F5039',
        cream: '#F8F4E6',
        sand: '#EDE4D4',
        earth: '#D9CDBD',
        sprout: '#C4E4B5',
        lime: '#B5E61D',
        moss: '#8ABF7A',
        wilt: '#F4D03F',
        spoil: '#E74C3C',
      },
      animation: {
        'fade-in-leaf': 'fadeInLeaf 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-gentle': 'pulseGentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInLeaf: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px) rotate(-5deg)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) rotate(0deg)',
          },
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        pulseGentle: {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.7',
          },
        },
      },
    },
  },
  plugins: [],
};
