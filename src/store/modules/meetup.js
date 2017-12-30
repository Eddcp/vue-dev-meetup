import * as types from '../mutation-types'
import { firebaseApp } from '@/firebaseApp'

const state = {
  loadedMeetups: []
}

const getters = {
  loadedMeetups: (state) => {
    const meetups = state.loadedMeetups
    return meetups.sort((meetupA, meetupB) => {
      return meetupA.date > meetupB.date
    })
  },

  featuredMeetups: (state, getters) => {
    return getters.loadedMeetups.slice(0, 5)
  },

  loadMeetup: (state) => {
    return (meetupId) => {
      return state.loadedMeetups.find((meetup) => {
        return meetup.id === meetupId
      })
    }
  }
}

const actions = {
  loadMeetups ({commit}) {
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
  },

  createMeetup ({commit, getters}, payload) {
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
  },

  updateMeetupData ({commit}, payload){
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
}

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

export default {
  state,
  getters,
  actions,
  mutations
}
