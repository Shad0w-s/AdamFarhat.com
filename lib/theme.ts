export const theme = {
  colors: {
    light: {
      background: '#FFFFFF',
      foreground: '#0A0A0A',
      pinstripe: '#E5E5E5',
    },
    dark: {
      background: '#000000',
      foreground: '#FAFAFA',
      pinstripe: '#1A1A1A',
    },
  },
  typography: {
    fontFamily: {
      sans: ['system-ui', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
  },
  spacing: {
    section: '4rem',
    container: '1.5rem',
  },
} as const

