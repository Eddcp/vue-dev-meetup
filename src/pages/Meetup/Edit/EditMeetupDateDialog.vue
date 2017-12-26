<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">
      Edit Date
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker
              v-model="editableDate"
              class="date-dialog__picker"
              locale="pt-br"
              actions>
              <template slot-scope="{save, cancel}">
                <v-btn
                  class="blue--text darken-1"
                  flat
                  @click.native="editDialog = false">
                  Close
                </v-btn>
                <v-btn
                  class="blue--text darken-1"
                  flat
                  @click.native="onSaveChanges">
                  Save
                </v-btn>
              </template>
            </v-date-picker>
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
        editableDate: null
      }
    },
    methods: {
      getNewDate() {
        let newDate = new Date(this.meetup.date),
            newDay = new Date(this.editableDate).getUTCDate(),
            newMonth = new Date(this.editableDate).getUTCMonth(),
            newYear = new Date(this.editableDate).getUTCFullYear()

        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)

        return newDate
      },
      onSaveChanges() {
        let newDate = this.getNewDate()

        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate
        })

      }
    },
    created() {
      let pickerDate = new Date(this.meetup.date)
      console.log(this.meetup.date)
      this.editableDate = pickerDate.getUTCFullYear() + '-' + (pickerDate.getUTCMonth() + 1) + '-' + pickerDate.getUTCDate()
    }
  }
</script>

<style lang="scss">
  .date-dialog {
    &__picker {
      width: 100%;
    }
  }
</style>
