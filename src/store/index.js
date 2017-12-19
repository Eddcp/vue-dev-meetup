import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import { mutations } from './mutations'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://media.timeout.com/images/103444978/image.jpg',
        id: '2134aser3k1',
        title: 'Meetup New York',
        date: new Date(),
        location: 'New York',
        description: 'New York, New York!'
      },
      {
        imageUrl: 'https://blog.netsabe.com.br/wp-content/uploads/2016/08/thiago-mesquita-03.jpg',
        id: '232412kfdsa',
        title: 'Meetup Uberlândia',
        date: new Date(),
        location: 'Uberlândia',
        description: 'Descrição'
      }
    ],
    user: null
  },
  mutations,
  actions,
  getters
})
