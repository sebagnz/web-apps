const colors = require('tailwindcss/colors')
const ui = require('@web-apps/ui/tailwind')

module.exports = {
  presets: [ui],
  // `ui.content` includes a path to the components that are using tailwind in @web-apps/ui
  content: ui.content.concat(['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}']),
  plugins: [],
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
      },
      colors: {
        error: colors.red[500],
        'base-primary': colors.slate[300],
        'base-secondary': colors.slate[400],
        'content-base': colors.zinc[200],
        'content-primary': colors.gray[800],
        'content-secondary': colors.gray[700],
        'content-tertiary': colors.gray[500],
        'content-accent': colors.cyan[500],
        'modal-base': 'rgba(255, 255, 255, .7)',
        'modal-overlay': 'rgba(100, 116, 139, .5)',
        'control-base': colors.zinc[100],
        'control-accent': colors.zinc[50],
        'control-content': colors.zinc[700],
        'input-base': colors.zinc[100],
        'input-accent': colors.zinc[50],
        'input-content': colors.zinc[700],
      },
      keyframes: {
        fade: { from: { opacity: 0 }, to: { opacity: 1 } },
      },
      animation: {
        'fade-in': 'fade 1s ease-in-out forwards',
      },
    },
  },
}
