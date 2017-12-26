<template lang="html">
  <v-container fluid>
    <v-layout v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
            indeterminate
            class="primary--text"
            :width="7"
            :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
			<v-flex xs12>
				<v-card>
          <v-card-title>
            <h2 class="primary--text">{{meetup.title}}</h2>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <edit-meetup-dialog
                v-if="userIsCreator"
                :meetup="meetup"></edit-meetup-dialog>
            </template>
          </v-card-title>
          <v-card-media :src="meetup.imageUrl"
          height="400px"></v-card-media>
          <v-card-text>
            <div class="info--text">{{ meetup.date | date }} - {{ meetup.location }}</div>
            <div>
              <edit-meetup-date-dialog :meetup="meetup" v-if="userIsCreator"></edit-meetup-date-dialog>
              <edit-meetup-time-dialog :meetup="meetup" v-if="userIsCreator"></edit-meetup-time-dialog>
            </div>
            <div>{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <register-dialog :meetupId="meetup.id"></register-dialog>
          </v-card-actions>
				</v-card>
			</v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditMeetupDialog from './Edit/EditMeetupDialog.vue'
import EditMeetupDateDialog from './Edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from './Edit/EditMeetupTimeDialog.vue'
import RegisterDialog from './Registration/RegisterDialog.vue'

export default {
  props: ['id'],
  computed: {
    meetup() {
      return this.$store.getters.loadMeetup(this.id)
    },
    userIsAuthenticated() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false
      } else {
        return this.$store.getters.user.id === this.meetup.creatorId
      }
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  components: {
    EditMeetupDialog,
    EditMeetupDateDialog,
    EditMeetupTimeDialog,
    RegisterDialog
  }
}
</script>

<style lang="css">
</style>
