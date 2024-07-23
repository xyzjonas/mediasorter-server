import './assets/main.css'

import { createApp } from 'vue'

import { Quasar, LoadingBar, Notify } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'

const myApp = createApp(App)

myApp.use(Quasar, {
  config: {
    dark: 'auto',
    loadingBar: {
      position: 'bottom',
      color: 'primary',
      size: '1rem'
    }
  },
  plugins: {
    LoadingBar,
    Notify
  }
})

myApp.mount('#app')
