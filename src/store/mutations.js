import * as types from './mutation-types'

export const mutations = {
  [types.CREATE_MEETUP] (state, payload) {
    state.loadedMeetups.push(payload)
  },

  [types.SET_LOADED_MEETUPS] (state,payload) {
    state.loadedMeetups = payload
  },

  [types.SET_USER] (state,payload){
    state.user = payload
  },

  [types.SET_LOADING] (state, payload) {
    state.loading = payload
  },

  [types.SET_ERROR] (state, payload) {
    state.error = payload
  },

  [types.CLEAR_ERROR] (state) {
    state.error = null
  }
}
