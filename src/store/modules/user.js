import * as types from '../mutation-types'
import { firebaseApp } from '@/firebaseApp'

const state = {
  user: null
}

const getters = {
  user: (state) => {
    return state.user
  }
}

const actions = {
  registerUserForMeetup ({commit, getters}, payload) {
    commit(types.SET_LOADING, true)
    const user = getters.user
    firebaseApp.database().ref(`users/${user.id}`).child('/registrations/')
      .push(payload)
      .then(data => {
        commit(types.SET_LOADING, false)
        commit(types.REGISTER_USER_FOR_MEETUP, {id: payload, fbKey: data.key})
      })
      .catch(error => {
        console.log(error)
        commit(types.SET_LOADING, false)
      })
  },

  unregisterUserFromMeetup ({commit, getters}, payload) {
    commit(types.SET_LOADING, true)
    const user = getters.user
    if (!user.fbKeys) {
      return
    }
    const fbKey = user.fbKeys[payload]
    firebaseApp.database().ref(`/users/${user.id}/registrations/`).child(fbKey)
      .remove()
      .then(() => {
        commit(types.SET_LOADING, false)
        commit(types.UNREGISTER_USER_FROM_MEETUP, payload)
      })
      .catch(error => {
        console.log(error)
        commit(types.SET_LOADING, false)
      })
  },

  signUserUp ({commit}, payload) {
    commit(types.SET_LOADING, true)
    commit(types.CLEAR_ERROR)
    firebaseApp.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit(types.SET_LOADING, false)
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          }
          commit(types.SET_USER, newUser)
        }
      )
      .catch(
        error => {
          commit(types.SET_LOADING, false)
          commit(types.SET_ERROR, error)
          console.log(error)
        }
      )
  },

  signUserIn ({commit}, payload) {
    commit(types.SET_LOADING, true)
    commit(types.CLEAR_ERROR)
    firebaseApp.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit(types.SET_LOADING, false)
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          }
          commit(types.SET_USER, newUser)
        }
      )
      .catch(
        error => {
          commit(types.SET_LOADING, false)
          commit(types.SET_ERROR, error)
          console.log(error)
        }
      )
  },

  autoSignIn({commit}, payload) {
    commit(types.SET_USER , {
      id: payload.uid,
      registeredMeetups: [],
      fbKeys: {}
    })
  },

  fetchUserData({commit, getters}) {
    commit(types.SET_LOADING, true)
    firebaseApp.database().ref(`/users/${getters.user.id}/registrations`).once('value')
      .then(data => {
        const dataPairs = data.val()
        let registeredMeetups = []
        let swappedPairs = {}

        for (let key in dataPairs) {
          registeredMeetups.push(dataPairs[key])
          swappedPairs[dataPairs[key]] = key
        }

        const updatedUser = {
          id: getters.user.id,
          registeredMeetups: registeredMeetups,
          fbKeys: swappedPairs
        }
        commit(types.SET_LOADING, false)
        commit(types.SET_USER, updatedUser)
      })
      .catch(error => {
        console.log(error)
        commit(types.SET_LOADING, false)
      })
  }
}

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

export default {
  state,
  getters,
  actions,
  mutations
}
