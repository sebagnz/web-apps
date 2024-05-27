const path = require('path')

const withOpacity = (varName) => `rgb(var(${varName}) / <alpha-value>)`

module.exports = {
  // `content` is replaced instead of extended, so this line has to be added in
  // the `content` of each app' tailwind.config.js
  content: [path.join(path.dirname(require.resolve('@web-apps/ui')), '**/*.{js,ts,jsx,tsx}')],
  plugins: [require('tailwindcss-border-image')],
  theme: {
    extend: {
      backgroundImage: {
        conic: 'conic-gradient(var(--tw-gradient-stops) 0 0)',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 2px 4px -1px rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        none: 'none',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      black: '#000',
      accent: {
        DEFAULT: withOpacity('--color-accent-500'),
        100: withOpacity('--color-accent-100'),
        300: withOpacity('--color-accent-300'),
        500: withOpacity('--color-accent-500'),
        700: withOpacity('--color-accent-700'),
        900: withOpacity('--color-accent-900'),
      },
      error: {
        DEFAULT: withOpacity('--color-error-500'),
        100: withOpacity('--color-error-100'),
        300: withOpacity('--color-error-300'),
        500: withOpacity('--color-error-500'),
        700: withOpacity('--color-error-700'),
        900: withOpacity('--color-error-900'),
      },
      neutral: {
        DEFAULT: withOpacity('--color-neutral-500'),
        100: withOpacity('--color-neutral-100'),
        300: withOpacity('--color-neutral-300'),
        500: withOpacity('--color-neutral-500'),
        700: withOpacity('--color-neutral-700'),
        900: withOpacity('--color-neutral-900'),
      },
    },
    textColor: {
      base: withOpacity('--color-text-base'),
      muted: withOpacity('--color-text-muted'),
      accent: withOpacity('--color-text-accent'),
      error: withOpacity('--color-text-error'),
      inverted: withOpacity('--color-text-inverted'),
    },
    backgroundColor: {
      transparent: 'transparent',
      base: withOpacity('--color-background-base'),
      muted: withOpacity('--color-background-muted'),
      accent: withOpacity('--color-background-accent'),
      'accent-muted': withOpacity('--color-background-accent-muted'),
      error: withOpacity('--color-background-error'),
      inverted: withOpacity('--color-background-inverted'),
    },
    boxShadowColor: {
      base: `rgb(var(--color-background-inverted) / .3)`,
    },
    borderColor: {
      transparent: 'transparent',
      base: withOpacity('--color-border-base'),
      accent: withOpacity('--color-border-accent'),
    },
  },
}
