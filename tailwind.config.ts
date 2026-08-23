import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core Nexora dark & trust tokens
        background: '#0B0E17',
        surface: {
          DEFAULT: '#141826',
          subtle: '#101420',
          hover: '#1B2032',
          border: '#242A3D',
          'border-light': '#323B54',
        },
        brand: {
          teal: '#2DE8C8',
          'teal-glow': 'rgba(45, 232, 200, 0.15)',
          coral: '#FF6B5B',
          'coral-glow': 'rgba(255, 107, 91, 0.15)',
          warning: '#FFB648',
          'warning-glow': 'rgba(255, 182, 72, 0.15)',
        },
        text: {
          primary: '#F4F6FB',
          muted: '#8B93A8',
          dim: '#596279',
        },
        // Portal & Auth spec tokens
        portal: {
          blue: '#1E3A8A',
          'blue-dark': '#152A63',
          'blue-light': '#EAF0FB',
          orange: '#F5820D',
          'orange-light': '#FDBA74',
          green: '#2E7D32',
          'green-dark': '#1B5E20',
          'surface-white': '#FFFFFF',
          'footer-black': '#0D0D0D',
          'legal-black': '#000000',
          'text-main': '#111827',
          'text-sub': '#4B5563',
          'border-light': '#E2E8F0',
          'input-bg': '#F8FAFC'
        },
        // Nexora — Trust-First Color Palette Tokens
        nexora: {
          'bg-base': '#0A0F1E',
          'bg-surface': '#0F1526',
          'bg-elevated': '#151C30',
          'bg-elevated-2': '#1B2438',
          'bg-header': '#0B1220',

          'steel-700': '#1E3A5F',
          'steel-500': '#2C5282',
          'steel-400': '#4A7FB5',
          'steel-300': '#7CA3CE',

          'orange-600': '#C2660A',
          'orange-500': '#E0821F',
          'orange-400': '#F0A24D',
          'orange-subtle': 'rgba(224,130,31,0.12)',

          'green-status': '#22A567',
          'green-subtle': 'rgba(34,165,103,0.12)',
          'amber-status': '#D9A441',
          'info-status': '#5B8DEF',
          'neutral-status': '#64748B',

          'text-primary': '#F1F5F9',
          'text-secondary': '#A8B3C7',
          'text-muted': '#6B7794',
          'text-on-orange': '#1A1004',

          'border-subtle': '#1E2740',
          'border-strong': '#2C3A57',
        }
      },
      backgroundImage: {
        'nexora-hero': 'radial-gradient(ellipse at top, #111B33 0%, #0A0F1E 60%)',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-teal': '0 0 25px -5px rgba(45, 232, 200, 0.25)',
        'glow-coral': '0 0 25px -5px rgba(255, 107, 91, 0.25)',
        'glow-orange': '0 0 25px -5px rgba(245, 130, 13, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'portal-card': '0 8px 24px rgba(0,0,0,0.08)',
        'portal-elevated': '0 12px 32px rgba(0,0,0,0.15)',
      },
      borderRadius: {
        'portal-card': '10px',
        'portal-input': '6px',
        'portal-button': '8px',
      }
    },
  },
  plugins: [],
}
export default config
