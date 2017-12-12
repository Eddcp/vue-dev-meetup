<template>
  <header>
    <v-navigation-drawer v-model="sideNav" temporary fixed app>
      <v-list>
        <v-list-tile
          v-for="(item, index) in menuItems"
          :key="item.title"
          router
          :to="item.link">
          <v-list-tile-action>
            <v-icon left>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary" app>
      <div class="hidden-sm-and-up">
        <v-toolbar-side-icon
        @click="sideNav = !sideNav"
        ></v-toolbar-side-icon>
      </div>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="header__title">DevMeetup</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-xs-only">
        <v-toolbar-items>
          <v-btn
            flat
            v-for="item in menuItems"
            :key="item.title"
            router
            :to="item.link">
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
      </div>
    </v-toolbar>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
  data () {
    return {
      sideNav: false,
      menuItems: [
        { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups' },
        { icon: 'room', title: 'Organize Meetup', link: '/meetup/new' },
        { icon: 'person', title: 'Profile', link: '/profile' },
        { icon: 'face', title: 'Sign up', link: '/signup' },
        { icon: 'lock_open', title: 'Sign in', link: '/signin'},

      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  &__title {
    cursor: pointer;
  }
}
</style>
