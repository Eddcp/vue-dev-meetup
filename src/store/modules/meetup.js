import * as types from '../mutation-types'

const mutations = {
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

  [types.SET_LOADED_MEETUPS] (state,payload) {
    state.loadedMeetups = payload
  }
}

const state = {
  loadedMeetups: []
}

export default {
  state,
  mutations
}
