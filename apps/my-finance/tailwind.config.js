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
        base: {
          primary: colors.slate[100],
          secondary: colors.slate[400],
          accent: colors.purple[950],
        },
        content: {
          primary: colors.gray[800],
          secondary: colors.gray[700],
          tertiary: colors.gray[500],
          accent: colors.gray[200],
        },
        modal: {
          base: 'rgba(255, 255, 255, .7)',
          overlay: 'rgba(100, 116, 139, .5)',
        },
        control: {
          base: colors.zinc[100],
          content: colors.zinc[700],
          focus: colors.zinc[50],
          accent: colors.purple[800],
          'accent-content': colors.purple[800],
        },
        input: {
          base: colors.zinc[100],
          content: colors.zinc[700],
          focus: colors.zinc[50],
          accent: colors.purple[800],
          'accent-content': colors.purple[800],
        },
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
