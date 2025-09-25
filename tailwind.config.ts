import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
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
        }
      },
      animation: {
        progress: 'progress 1.4s ease-out forwards',
        shimmer: 'shimmer 2.8s ease-in-out infinite'
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
