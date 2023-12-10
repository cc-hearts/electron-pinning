import { createApp } from 'vue'
import App from './App.vue'
import 'unocss'

(() => {
  const app = createApp(App)

  app.mount('#app')
})()
