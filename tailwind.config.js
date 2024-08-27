/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    screens: {
      base: '0em', // 0px
      sm: '30em', // ~480px
      md: '48em', // ~768px
      lg: '62em', // ~992px
      xl: '80em', // ~1280px
      '2xl': '96em', // ~1536px
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'l-main-text': '#1a365d', // blue.900 - white
        'l-main-element': '#3182ce', //blue.500 - blue.850
        'l-second-element': '#1a365d', // blue.900 - gray.500
        'l-second-element-light': '#3182ce', // blue.500 - white
        'l-blue-light-element': '#3182ce80', // blue.500 + 80% - gray.500
        'l-black-light-element': '#1a365d80', // blue.900 + 80% - gray.500 + 80%
        'l-card': '#EDF2F7', // gray.100 - gray.700
        'l-main': '#fff', // white - gray.800
        'l-account-actions': '#ffffff', // white - gray.700
        'l-exit-button': '#63171B', // red.900 - red.500
        'l-tab': '#EDF2F7', // gray.100 - gray.800
        'l-blue-element': '#2B6CB0', // blue.500 - gray.500
        'l-tab-teacher': '#CBD5E0',

        'd-main-text': '#fff', // white
        'd-main-element': '#223D61', // blue.850
        'd-second-element': '#718096', // gray.500
        'd-second-element-light': '#fff', // white
        'd-blue-light-element': '#718096', // gray.500
        'd-black-light-element': '#71809680', // gray.500 + 80%
        'd-card': '#2D3748', // gray.700
        'd-main': '#171923', // gray.900
        'd-account-actions': '#2D3748', //gray.700
        'd-exit-button': '#E53E3E', // red.500
        'd-tab': '#1A202C', // gray.800
        'd-blue-element': '#53A6E7', //gray.500
        'd-tab-teacher': '#4A5568',

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
