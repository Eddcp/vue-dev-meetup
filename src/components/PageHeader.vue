<template>
  <header>
    <v-navigation-drawer v-model="sideNav" temporary fixed app>
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon left>supervisor_account</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark app>
      <div class="hidden-sm-and-up">
        <v-toolbar-side-icon
        @click="sideNav = !sideNav"
        ></v-toolbar-side-icon>
      </div>
      <v-toolbar-title>DevMeetup</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-xs-only">
        <v-toolbar-items>
          <v-btn flat>
            <v-icon left>supervisor_account</v-icon>
            View Meetups
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
      sideNav: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
