import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import meetup from './modules/meetup'
import shared from './modules/shared'
import user from './modules/user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    meetup,
    shared,
    user
  },
  actions,
  getters
})
