import Vue from 'vue'
import Vuetify from 'vuetify'

import App from './App.vue'
import router from './router'

import './stylus/main.scss'

Vue.use(Vuetify,{
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
