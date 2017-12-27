export const loadedMeetups = (state) => {
  const meetups = state.meetup.loadedMeetups
  return meetups.sort((meetupA, meetupB) => {
    return meetupA.date > meetupB.date
  })
};

export const featuredMeetups = (state, getters) => {
  return getters.loadedMeetups.slice(0, 5)
};

export const loadMeetup = (state) => {
  return (meetupId) => {
    return state.meetup.loadedMeetups.find((meetup) => {
      return meetup.id === meetupId
    })
  }
};

export const user = (state) => {
  return state.user.user
};

export const loading = (state) => {
  return state.shared.loading
}

export const error = (state) => {
  return state.shared.error
}
