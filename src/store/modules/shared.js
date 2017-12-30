import * as types from '../mutation-types'
import { firebaseApp } from '@/firebaseApp'

const state = {
  loading: false,
  error: null
}

const getters = {
  loading: (state) => {
    return state.loading
  },
  
  error: (state) => {
    return state.error
  }
}

const actions = {
  logout({commit}) {
    firebaseApp.auth().signOut()
    commit(types.SET_USER, null)
  },

  clearError({commit}) {
    commit(types.CLEAR_ERROR)
  }
}

const mutations = {
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

export default {
  state,
  getters,
  actions,
  mutations
}
