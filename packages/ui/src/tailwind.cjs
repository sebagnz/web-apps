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
      base: withOpacity('--color-background-base'),
      muted: withOpacity('--color-background-muted'),
      accent: withOpacity('--color-background-accent'),
      'accent-muted': withOpacity('--color-background-accent-muted'),
      error: withOpacity('--color-background-error'),
      inverted: withOpacity('--color-background-inverted'),
      overlay: withOpacity('--color-background-overlay'),
    },
    boxShadowColor: {
      base: withOpacity('--color-shadow-base'),
    },
    borderColor: {
      transparent: 'transparent',
      base: withOpacity('--color-border-base'),
      accent: withOpacity('--color-border-accent'),
    },
  },
}
