<template lang="html">
  <v-container>
  	<v-layout row>
  		<v-flex xs12 sm6 offset-sm3>
  			<h2 class="primary--text">Create a new Meetup</h2>
  		</v-flex>
  	</v-layout>
  	<v-layout row>
  		<v-flex xs12>
  		  <form @submit.prevent="onCreateMeetup">
  		    <v-layout row>
  		      <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required>
              </v-text-field>
            </v-flex>
  		    </v-layout>
  		    <v-layout row>
  		      <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required>
              </v-text-field>
            </v-flex>
  		    </v-layout>
  		    <v-layout row>
  		      <v-flex xs12 sm6 offset-sm3>
              <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
              <input
                type="file"
                class="invisible"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"/>
            </v-flex>
  		    </v-layout>
  		    <v-layout row>
  		      <v-flex xs12 sm6 offset-sm3>
              <img v-show="imageUrl" :src="imageUrl" height="200">
            </v-flex>
  		    </v-layout>
  		    <v-layout row>
  		      <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="description"
                multi-line
                required>
              </v-text-field>
            </v-flex>
  		    </v-layout>
  		    <v-layout row>
  		      <v-flex xs12 sm6 offset-sm3>
              <p>Choose a Date & Time</p>
            </v-flex>
  		    </v-layout>
  		    <v-layout row class="mb-2">
  		      <v-flex xs12 sm6 offset-sm3>
              <v-date-picker
                v-model="date" locale="pt-br"></v-date-picker>
            </v-flex>
  		    </v-layout>
          <v-layout row>
           <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit">
                Create Meetup
              </v-btn>
            </v-flex>
          </v-layout>
  		  </form>
  		</v-flex>
  	</v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: null,
      time: null,
      image: null
    }
  },
  computed: {
    formIsValid () {
      return this.title != '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== ''
    },
    submittableDateTime () {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        let hours = this.time.match(/^(\d+)/)[1]
        let minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      return date
    }
  },
  methods: {
    getMeetupData() {
      return {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime
      }
    },
    onCreateMeetup() {
      if (!this.formIsValid || !this.image) {
        return
      }
      const meetupData = this.getMeetupData();
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    },
    onPickFile() {
      this.$refs.fileInput.click()
    },
    onFilePicked(e) {
      const files = e.currentTarget.files
      let filename = files[0].name

      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file')
      }

      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>

<style lang="scss">
  .invisible {
    display: none;
  }
</style>
