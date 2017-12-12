import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue'
import Meetups from '@/pages/Meetup/Meetups.vue'
import CreateMeetup from '@/pages/Meetup/CreateMeetup.vue'
import Profile from '@/pages/User/Profile.vue'
import Signin from '@/pages/User/Signin.vue'
import Signup from '@/pages/User/Signup.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/meetup/new',
      name: 'CreateMeetup',
      component: CreateMeetup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ],
  mode: 'history'
})
