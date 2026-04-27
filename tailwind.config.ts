import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        bg: {
          primary: '#0A0F1E',
          secondary: '#111827',
          card: 'rgba(255,255,255,0.04)',
        },
        accent: {
          lime: '#C8F135',
          coral: '#FF6B6B',
          sky: '#38BDF8',
          gold: '#F5C518',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#475569',
        },
        border: {
          default: 'rgba(255,255,255,0.08)',
          accent: 'rgba(200,241,53,0.3)',
        },
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #0A0F1E 0%, #0F1B3D 50%, #0A1628 100%)',
        'gradient-accent': 'linear-gradient(90deg, #C8F135, #38BDF8)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
