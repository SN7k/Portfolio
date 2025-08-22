/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', 'Menlo', 'Consolas', 'monospace'],
        sans: ['Inter', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'gradient-shift': 'gradient-shift 15s ease infinite',
        'gradient-pulse': 'gradient-pulse 4s ease-in-out infinite',
        'float-smooth': 'float-smooth 6s ease-in-out infinite',
        'blob-morph': 'blob-morph 20s ease-in-out infinite',
        'particle-float': 'particle-float 8s linear infinite',
        'text-shimmer': 'text-shimmer 2s infinite',
        'magnetic-pull': 'magnetic-pull 0.6s ease-in-out',
        'reveal-up': 'reveal-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'reveal-left': 'reveal-left 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'reveal-right': 'reveal-right 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'card-hover': 'card-hover 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'gradient-pulse': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
        },
        'float-smooth': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(2deg)' },
          '66%': { transform: 'translateY(-10px) rotate(-1deg)' },
        },
        'blob-morph': {
          '0%, 100%': {
            'border-radius': '60% 40% 30% 70% / 60% 30% 70% 40%',
            transform: 'translate(0px, 0px) scale(1)',
          },
          '25%': {
            'border-radius': '30% 60% 70% 40% / 50% 60% 30% 60%',
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '50%': {
            'border-radius': '50% 60% 30% 60% / 30% 60% 70% 40%',
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '75%': {
            'border-radius': '60% 40% 60% 30% / 70% 30% 60% 40%',
            transform: 'translate(50px, 50px) scale(1.05)',
          },
        },
        'particle-float': {
          '0%, 100%': {
            transform: 'translateY(0px) translateX(0px)',
            opacity: '0.4',
          },
          '25%': {
            transform: 'translateY(-100px) translateX(50px)',
            opacity: '0.8',
          },
          '50%': {
            transform: 'translateY(-200px) translateX(-30px)',
            opacity: '0.6',
          },
          '75%': {
            transform: 'translateY(-150px) translateX(80px)',
            opacity: '0.9',
          },
        },
        'text-shimmer': {
          '0%': { 'background-position': '-200% center' },
          '100%': { 'background-position': '200% center' },
        },
        'magnetic-pull': {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.05) rotate(1deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        'reveal-up': {
          from: {
            opacity: '0',
            transform: 'translateY(100px) scale(0.95)',
            filter: 'blur(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
            filter: 'blur(0px)',
          },
        },
        'reveal-left': {
          from: {
            opacity: '0',
            transform: 'translateX(-100px) scale(0.95)',
            filter: 'blur(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0) scale(1)',
            filter: 'blur(0px)',
          },
        },
        'reveal-right': {
          from: {
            opacity: '0',
            transform: 'translateX(100px) scale(0.95)',
            filter: 'blur(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0) scale(1)',
            filter: 'blur(0px)',
          },
        },
        'card-hover': {
          from: {
            transform: 'translateY(0) scale(1)',
            'box-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
          to: {
            transform: 'translateY(-10px) scale(1.02)',
            'box-shadow': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          },
        },
        'glow-pulse': {
          '0%, 100%': { 'box-shadow': '0 0 20px rgba(59, 130, 246, 0.3)' },
          '50%': { 'box-shadow': '0 0 40px rgba(59, 130, 246, 0.6)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'glass-white': 'rgba(255, 255, 255, 0.1)',
        'glass-black': 'rgba(0, 0, 0, 0.1)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
    },
  },
  plugins: [],
};