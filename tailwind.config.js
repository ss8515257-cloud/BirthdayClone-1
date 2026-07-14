/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './hooks/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'soft-pink': '#F8E8EE',
        'rose-pink': '#E8A0BF',
        'lavender': '#C8B6E2',
        'cream-white': '#FFF8F0',
        'light-purple': '#D4BBFC',
        'peach': '#FFDAB9',
        'rose-gold': '#B76E79',
        'champagne-gold': '#F7E7CE',
        'night-sky': '#0F0C29',
        'deep-purple': '#302B63',
        'twilight': '#24243E',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        dancing: ['var(--font-dancing)', 'cursive'],
      },
      backgroundImage: {
        'gradient-luxury':
          'linear-gradient(135deg, #F8E8EE 0%, #C8B6E2 50%, #E8A0BF 100%)',
        'gradient-night':
          'linear-gradient(180deg, #0F0C29 0%, #302B63 50%, #24243E 100%)',
        'gradient-sunrise':
          'linear-gradient(180deg, #FF6B6B 0%, #FFE66D 50%, #F8E8EE 100%)',
        'gradient-aurora':
          'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      },
      boxShadow: {
        glow: '0 0 20px rgba(232, 160, 191, 0.4)',
        'glow-lg': '0 0 40px rgba(232, 160, 191, 0.6)',
        'glow-gold': '0 0 30px rgba(247, 231, 206, 0.5)',
        glass: '0 8px 32px rgba(31, 38, 135, 0.15)',
        premium: '0 20px 60px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        sparkle: 'sparkle 2s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(232, 160, 191, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(232, 160, 191, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
