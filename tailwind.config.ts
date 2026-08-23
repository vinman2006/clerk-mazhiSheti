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
        // Official Indian e-Governance Portal Palette
        gov: {
          navy: '#0B3D91',
          'navy-dark': '#07265E',
          'navy-light': '#EAF1FB',
          'navy-subtle': '#F0F4FA',
          orange: '#F5821F',
          'orange-dark': '#D66D10',
          'orange-light': '#FFF5EB',
          green: '#1E7A34',
          'green-dark': '#145524',
          'green-light': '#E8F5E9',
          bg: '#F4F6F9',
          surface: '#FFFFFF',
          border: '#E0E0E0',
          'border-strong': '#CBD5E1',
          'text-dark': '#1A1A1A',
          'text-muted': '#4B5563',
          'text-dim': '#6B7280',
          'footer-dark': '#0A192F',
          'footer-black': '#050D1A'
        },
        // Core Nexora dark & trust tokens (maintained for backward compatibility)
        background: '#FFFFFF',
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F8FAFC',
          hover: '#F1F5F9',
          border: '#E2E8F0',
          'border-light': '#CBD5E1',
        },
        brand: {
          teal: '#0B3D91',
          'teal-glow': 'rgba(11, 61, 145, 0.15)',
          coral: '#F5821F',
          'coral-glow': 'rgba(245, 130, 31, 0.15)',
          warning: '#F5821F',
          'warning-glow': 'rgba(245, 130, 31, 0.15)',
        },
        text: {
          primary: '#1A1A1A',
          muted: '#4B5563',
          dim: '#6B7280',
        },
        // Portal & Auth spec tokens
        portal: {
          blue: '#0B3D91',
          'blue-dark': '#07265E',
          'blue-light': '#EAF1FB',
          orange: '#F5821F',
          'orange-light': '#FDBA74',
          green: '#1E7A34',
          'green-dark': '#145524',
          'surface-white': '#FFFFFF',
          'footer-black': '#0A192F',
          'legal-black': '#050D1A',
          'text-main': '#1A1A1A',
          'text-sub': '#4B5563',
          'border-light': '#E0E0E0',
          'input-bg': '#F8FAFC'
        },
        // Nexora Theme Tokens (Light Institutional Palette)
        nexora: {
          'bg-base': '#F4F6F9',
          'bg-surface': '#FFFFFF',
          'bg-elevated': '#FFFFFF',
          'bg-elevated-2': '#F8FAFC',
          'bg-header': '#0B3D91',

          'steel-700': '#0B3D91',
          'steel-500': '#154B9E',
          'steel-400': '#2B6CB0',
          'steel-300': '#EAF1FB',

          'orange-600': '#D66D10',
          'orange-500': '#F5821F',
          'orange-400': '#FB923C',
          'orange-subtle': 'rgba(245,130,31,0.12)',

          'green-status': '#1E7A34',
          'green-subtle': 'rgba(30,122,52,0.12)',
          'amber-status': '#D97706',
          'info-status': '#0B3D91',
          'neutral-status': '#64748B',

          'text-primary': '#1A1A1A',
          'text-secondary': '#4B5563',
          'text-muted': '#6B7280',
          'text-on-orange': '#FFFFFF',

          'border-subtle': '#E0E0E0',
          'border-strong': '#CBD5E1',
        }
      },
      fontFamily: {
        sans: ['Noto Sans', 'Inter', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Noto Sans', 'Inter', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'gov-card': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        'gov-elevated': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        'portal-card': '0 1px 4px rgba(0,0,0,0.08)',
        'portal-elevated': '0 4px 12px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        'gov': '6px',
        'gov-lg': '8px',
        'portal-card': '8px',
        'portal-input': '6px',
        'portal-button': '6px',
      }
    },
  },
  plugins: [],
}
export default config
