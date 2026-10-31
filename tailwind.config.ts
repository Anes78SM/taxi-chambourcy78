import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Univers Executive Chauffeur — voir src/app/globals.css pour les tokens CSS
        ink: {
          900: '#080D10', // noir profond
          800: '#101B24', // bleu nuit
          700: '#16242E',
          600: '#1E2E38',
        },
        champagne: {
          DEFAULT: '#D8B98B',
          light: '#E7CFA8',
          dark: '#B8986A',
        },
        cream: '#F4F0E9',
        mist: '#A9ADB0',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.75rem, 5.5vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.035em' }],
        h2: ['clamp(2rem, 3vw, 2.9rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        eyebrow: '0.3em',
        wide: '0.18em',
      },
      maxWidth: {
        container: '1320px',
        prose: '68ch',
      },
      spacing: {
        gutter: 'clamp(1.25rem, 4vw, 3rem)',
      },
      boxShadow: {
        card: '0 24px 60px -30px rgba(8, 13, 16, 0.45)',
        'card-hover': '0 34px 80px -34px rgba(8, 13, 16, 0.55)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
