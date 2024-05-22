const ui = require('@web-apps/ui/tailwind')

module.exports = {
  presets: [ui],
  // `ui.content` includes a path to the components that are using tailwind in @web-apps/ui
  content: ui.content.concat(['./src/**/*.{js,ts,jsx,tsx}']),
}
