import * as types from './mutation-types'

export const mutations = {
  [types.CREATE_MEETUP] (state, payload) {
    state.loadedMeetups.push(payload)
  },

  [types.UPDATE_MEETUP] (state, payload) {
    const meetup = state.loadedMeetups.find(meetup => {
      return meetup.id === payload.id
    })
    if (payload.title) {
      meetup.title = payload.title
    }
    if (payload.description) {
      meetup.description = payload.description
    }
    if (payload.date) {
      meetup.date = payload.date
    }
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
  },

  [types.SET_LOADED_MEETUPS] (state,payload) {
    state.loadedMeetups = payload
  },

  [types.SET_USER] (state,payload) {
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
