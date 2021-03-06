import Vue from 'vue'
import Vuetify from 'vuetify'

import App from './App.vue'

import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import { firebaseApp } from './firebaseApp'

import './styles/main.scss'

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

Vue.filter('date', DateFilter)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
