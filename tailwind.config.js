/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      keyframes: {
        bubble: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.7' },
          '50%': { transform: 'translateY(-40px) scale(1.05)', opacity: '1' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '0.7' }
        },
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0)' }
        },
        pulseDot: {
          '0%,100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.3)' }
        },
        fall: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '70%': { opacity: '1' },
          '100%': { transform: 'translateY(200%)', opacity: '0' }
        },
        gridPulse: {
          '0%,100%': { opacity: '0.15' },
          '50%': { opacity: '0.35' }
        }
      },
      animation: {
        bubble: 'bubble 6s ease-in-out infinite',
        bubbleSlow: 'bubble 10s ease-in-out infinite',
        floatSlow: 'float 8s ease-in-out infinite',
        pulseDot: 'pulseDot 4s ease-in-out infinite',
        fallSlow: 'fall 12s linear infinite',
        gridPulse: 'gridPulse 5s ease-in-out infinite'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
