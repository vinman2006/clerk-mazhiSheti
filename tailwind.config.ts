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
        }
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
