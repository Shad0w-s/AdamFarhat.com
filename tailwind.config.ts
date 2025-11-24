import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        nitro: {
          blue: '#0099FF',
          green: '#00FF77',
          black: '#000000',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        content: '760px',
        cardStack: '85%',
        container: '1440px',
      },
      spacing: {
        'section': '120px',
        'section-sm': '80px',
      },
      boxShadow: {
        'nitro': '0px 0.6px 1.57px -1.5px rgba(0, 0, 0, 0.17), 0px 2.29px 5.95px -3px rgba(0, 0, 0, 0.14), 0px 10px 26px -4.5px rgba(0, 0, 0, 0.02)',
        'nitro-lg': '0px 4px 20px rgba(0, 0, 0, 0.08), 0px 10px 40px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
export default config

