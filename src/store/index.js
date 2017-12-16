import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://media.timeout.com/images/103444978/image.jpg',
        id: '2134aser3k1',
        title: 'Meetup New York',
        date: '2017-12-16'
      },
      {
        imageUrl: 'https://blog.netsabe.com.br/wp-content/uploads/2016/08/thiago-mesquita-03.jpg',
        id: '232412kfdsa',
        title: 'Meetup Uberlândia',
        date: '2017-12-19'
      }
    ],
    user: {
      id: '23415kdsa',
      registeredMeetups: ['asesatasd']
    }
  },
  mutations: {},
  actions: {},
  getters
})
