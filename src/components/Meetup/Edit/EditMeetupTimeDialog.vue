<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">
      Edit Time
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Time</v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="editableTime" class="time-dialog__picker" actions format="24hr">
              <template slot-scope="{save, cancel}">
                <v-btn
                  class="blue--text darken-1"
                  flat
                  @click="editDialog = false">
                  Close
                </v-btn>
                <v-btn
                  class="blue--text darken-1"
                  flat
                  @click="onSaveChanges">
                  Save
                </v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data() {
      return {
        editDialog: false,
        editableTime: null
      }
    },
    methods: {
      getNewTime() {
        let newDate = new Date(this.meetup.date)
        let hours = this.editableTime.match(/^(\d+)/)[1]
        let minutes = this.editableTime.match(/:(\d+)/)[1]

        newDate.setHours(hours)
        newDate.setMinutes(minutes)

        return newDate
      },
      onSaveChanges() {
        let newDate = this.getNewTime()

        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate
        })

      }
    },
    created() {
      this.editableTime = new Date(this.meetup.date).toTimeString()
    }
  }
</script>

<style lang="scss">
  .time-dialog {
    &__picker {
      width: 100%;
    }
  }
</style>
