import Vue from 'vue'
import Vuetify from 'vuetify'

import App from './App.vue'

import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import { firebaseApp } from './firebaseApp'

import './stylus/main.scss'

//Vuetify Config
Vue.use(Vuetify,{
  theme: {
    primary: '#2196F3',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})

Vue.config.productionTip = false

//Filters
Vue.filter('date', DateFilter)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    //Firebase authentication
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
