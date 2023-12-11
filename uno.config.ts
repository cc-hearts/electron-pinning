import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify({
      /* preset options */
    }),
    presetUno(),
    // ...custom presets
  ],
  rules: [
    ['app-drag', { '-webkit-app-region': 'drag' }],
    ['app-no-drag', { '-webkit-app-region': 'no-drag' }],
    ['border-b-solid', { 'border-bottom-style': 'solid', 'border-bottom-width': '1px', 'border-bottom-color': 'gray'}]
  ],
})
