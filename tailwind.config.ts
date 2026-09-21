import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif']
      },
      colors: {
        bg: 'var(--bg)',
        'bg-elev': 'var(--bg-elev)',
        fg: 'var(--fg)',
        'fg-muted': 'var(--fg-muted)',
        primary: 'var(--primary)',
        'primary-600': 'var(--primary-600)',
        accent: 'var(--accent)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        border: 'var(--border)',
        card: 'var(--card)'
      },
      boxShadow: {
        soft: '0 20px 45px -20px rgba(15, 23, 42, 0.25)',
        glow: 'var(--shadow)'
      },
      keyframes: {
        progress: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'badge-ping': {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '87.5%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(1.5)', opacity: '0' }
        },
        'badge-breathe': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.07)' }
        },
        'progress-breathe': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.65' }
        },
        'pulse-dim': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' }
        }
      },
      animation: {
        progress: 'progress 1.4s ease-out forwards',
        shimmer: 'shimmer 2.8s ease-in-out infinite',
        'spin-slow': 'spin 2.6s linear infinite',
        'badge-ping': 'badge-ping 3.2s ease-out infinite',
        'badge-breathe': 'badge-breathe 2.8s ease-in-out infinite',
        'progress-breathe': 'progress-breathe 3s ease-in-out infinite',
        'pulse-dim': 'pulse-dim 1.2s ease-in-out infinite'
      },
      ringColor: {
        DEFAULT: 'var(--ring)'
      },
      backgroundImage: {
        'hero-ambient': 'var(--hero-gradient)'
      }
    }
  },
  plugins: []
};

export default config;
