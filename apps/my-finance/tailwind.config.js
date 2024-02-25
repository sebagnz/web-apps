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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        'base-1': colors.zinc[100],
        'base-content-1': colors.black,
        'base-content-2': colors.gray[700],
        'base-content-3': colors.gray[500],
        accent: colors.zinc[200],
        'accent-focus': colors.zinc[300],
        'accent-content': colors.zinc[700],
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
