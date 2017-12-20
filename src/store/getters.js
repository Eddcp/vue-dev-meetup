export const loadedMeetups = (state) => {
  return state.loadedMeetups.sort((meetupA, meetupB) => {
    return meetupA.date > meetupB.date
  })
};

export const featuredMeetups = (state, getters) => {
  return getters.loadedMeetups.slice(0, 5)
};

export const loadMeetup = (state) => {
  return (meetupId) => {
    return state.loadedMeetups.find((meetup) => {
      return meetup.id === meetupId
    })
  }
};

export const user = (state) => {
  return state.user
};

export const loading = (state) => {
  return state.loading
}

export const error = (state) => {
  return state.error
}
