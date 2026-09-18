// Full 1% opacity scale so any `/NN` modifier (e.g. white/12) is valid.
const opacity = Object.fromEntries(
  Array.from({ length: 101 }, (_, i) => [i, String(i / 100)])
);

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      opacity,
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        /* surfaces — warm ivory page, cream cards */
        paper: {
          DEFAULT: '#F5F2EA',
          soft: '#FAF8F3',
          deep: '#EFEBE1',
        },
        cream: {
          DEFAULT: '#ECE8DE',
          deep: '#E3DED2',
        },
        /* borders */
        line: {
          DEFAULT: '#D8D3C8',
          strong: '#C5BEAE',
        },
        /* type */
        graphite: {
          DEFAULT: '#111827',
          soft: '#5F6368',
        },
        /* terracotta accent — `deep` for fills under white text (4.7:1),
           `ink` for small accent text on ivory (5.5:1) */
        accent: {
          DEFAULT: '#E45B32',
          deep: '#C94A27',
          ink: '#A93E20',
          soft: '#F3B8A2',
          wash: '#FBEDE7',
          blue: '#3A6EA5',
          'blue-ink': '#2E5680',
        },
        success: '#3F7A4F',
        danger: '#B4473A',
      },
      letterSpacing: {
        tighter: '-0.045em',
        'ultra-tight': '-0.06em',
      },
      maxWidth: {
        shell: '1440px',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        900: '900ms',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, transparent, rgba(245,242,234,0.85) 70%, #F5F2EA 100%)',
        /* near-flat warm ramp; every stop holds >= 4.6:1 against white text */
        'accent-gradient': 'linear-gradient(120deg, #D6512B 0%, #C94A27 50%, #B8421F 100%)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(0,-28px,0) scale(1.04)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        'caret-blink': {
          '0%, 45%': { opacity: '1' },
          '50%, 95%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
      },
      animation: {
        'float-slow': 'float-slow 14s ease-in-out infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
        marquee: 'marquee 38s linear infinite',
        shimmer: 'shimmer 5s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.24,0.6,0.35,1) infinite',
        'caret-blink': 'caret-blink 1.15s step-end infinite',
        'scan-line': 'scan-line 6s linear infinite',
      },
    },
  },
  plugins: [],
};
