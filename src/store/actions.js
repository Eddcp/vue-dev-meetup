import * as types from './mutation-types'
import { firebaseApp } from '../firebaseApp'

export const loadMeetups = ({commit}) => {
  commit(types.SET_LOADING, true)
  firebaseApp.database().ref('meetups').once('value')
    .then((data) => {
      const meetups = []
      const obj = data.val()
      for (let key in obj) {
        meetups.push({
          id: key,
          title: obj[key].title,
          description: obj[key].description,
          imageUrl: obj[key].imageUrl,
          date: obj[key].date
        })
      }
      commit(types.SET_LOADED_MEETUPS, meetups)
      commit(types.SET_LOADING, false)
    })
    .catch((error) => {
      console.log(error)
      commit(types.SET_LOADING, false)
    })
}

export const createMeetup = ({commit}, payload) => {
  const meetup = {
    title: payload.title,
    location: payload.location,
    imageUrl: payload.imageUrl,
    description: payload.description,
    date: payload.date.toISOString(),
  }

  firebaseApp.database().ref('meetups').push(meetup)
    .then((data) => {
      const key = data.key
      commit(types.CREATE_MEETUP, {
        ...meetup,
        id: key
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

export const signUserUp = ({commit}, payload) => {
  commit(types.SET_LOADING, true)
  commit(types.CLEAR_ERROR)
  firebaseApp.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then(
      user => {
        commit(types.SET_LOADING, false)
        const newUser = {
          id: user.uid,
          registeredMeetups: []
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
}

export const signUserIn = ({commit}, payload) => {
  commit(types.SET_LOADING, true)
  commit(types.CLEAR_ERROR)
  firebaseApp.auth().signInWithEmailAndPassword(payload.email, payload.password)
    .then(
      user => {
        commit(types.SET_LOADING, false)
        const newUser = {
          id: user.uid,
          registeredMeetups: []
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
}

export const clearError = ({commit}) => {
  commit(types.CLEAR_ERROR)
}
