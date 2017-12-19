import * as types from './mutation-types'

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
