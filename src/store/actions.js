import * as types from './mutation-types'
import { firebaseApp } from '../firebaseApp'

export const createMeetup = ({commit}, payload) => {
  const meetup = {
    title: payload.title,
    location: payload.location,
    imageUrl: payload.imageUrl,
    description: payload.description,
    date: payload.date,
    id: 'stw1t1431k2'
  }
  // Reach out to firebase and store it
  commit(types.CREATE_MEETUP, meetup)
}

export const signUserUp = ({commit}, payload) => {
  firebaseApp.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then(user => {
        const newUser = {
          id: user.uid,
          registeredMeetups: []
        }
        commit(types.SET_USER, newUser)
      }
    )
    .catch(error => {
        console.log(error)
      }
    )
}

export const signUserIn = ({commit}, payload) => {
  firebaseApp.auth().signInWithEmailAndPassword(payload.email, payload.password)
    .then(
      user => {
        const newUser = {
          id: user.uid,
          registeredMeetups: []
        }
        commit(types.SET_USER, newUser)
      }
    )
    .catch(
      error => {
        console.log(error)
      }
    )
}
