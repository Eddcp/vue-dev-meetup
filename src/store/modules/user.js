import * as types from '../mutation-types'

const mutations = {
  [types.SET_USER] (state,payload) {
    state.user = payload
  },

  [types.REGISTER_USER_FOR_MEETUP] (state, payload) {
    const id = payload.id
    if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
      return
    }
    state.user.registeredMeetups.push(id)
    state.user.fbKeys[id] = payload.fbKey
  },

  [types.UNREGISTER_USER_FROM_MEETUP] (state, payload) {
    const registeredMeetups = state.user.registeredMeetups
    registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
    Reflect.deleteProperty(state.user.fbKeys, payload)
  }
}

const state = {
  user: null
}

export default {
  state,
  mutations
}
