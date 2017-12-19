import * as types from './mutation-types'

export const mutations = {
  [types.CREATE_MEETUP] (state, payload) {
    state.loadedMeetups.push(payload)
  },

  [types.SET_USER] (state,payload){
    state.user = payload
  }
}
