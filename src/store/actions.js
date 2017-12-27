import * as types from './mutation-types'
import { firebaseApp } from '../firebaseApp'

export const registerUserForMeetup = ({commit, getters}, payload) => {
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
}

export const unregisterUserFromMeetup = ({commit, getters}, payload) => {
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
}

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
          location: obj[key].location,
          date: obj[key].date,
          creatorId: obj[key].creatorId
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

export const createMeetup = ({commit, getters}, payload) => {
  const meetup = {
    title: payload.title,
    location: payload.location,
    description: payload.description,
    date: payload.date.toISOString(),
    creatorId: getters.user.id
  }
  let imageUrl, key

  firebaseApp.database().ref('meetups').push(meetup)
    .then((data) => {
      key = data.key
      return key
    })
    .then(key => {
      const filename = payload.image.name
      const ext = filename.slice(filename.lastIndexOf('.'))
      return firebaseApp.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
    })
    .then(fileData => {
      imageUrl = fileData.metadata.downloadURLs[0]
      return firebaseApp.database().ref('meetups').child(key).update({imageUrl: imageUrl})
    })
    .then(() => {
      commit(types.CREATE_MEETUP, {
        ...meetup,
        imageUrl: imageUrl,
        id: key
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

export const updateMeetupData = ({commit}, payload) => {
  commit(types.SET_LOADING, true)
  const updateObj = {}

  if (payload.title) {
    updateObj.title = payload.title
  }
  if (payload.description) {
    updateObj.description = payload.description
  }
  if (payload.date) {
    updateObj.date = payload.date
  }

  firebaseApp.database().ref('meetups').child(payload.id).update(updateObj)
    .then(() => {
      commit(types.SET_LOADING, false)
      commit(types.UPDATE_MEETUP, payload)
    })
    .catch(error => {
      console.log(error)
      commit(types.SET_LOADING, false)
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
}

export const autoSignIn = ({commit}, payload) => {
  commit(types.SET_USER , {
    id: payload.uid,
    registeredMeetups: [],
    fbKeys: {}
  })
}

export const fetchUserData = ({commit, getters}) => {
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

export const logout = ({commit}) => {
  firebaseApp.auth().signOut()
  commit(types.SET_USER, null)
}

export const clearError = ({commit}) => {
  commit(types.CLEAR_ERROR)
}
