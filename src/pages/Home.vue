<template lang="html">
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups" class="info">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to='/meetup/new' class="info">Organize Meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-carousel>
        <v-carousel-item
          v-for="(meetup,i) in meetups"
          v-bind:src="meetup.imageUrl"
          :key="meetup.id"></v-carousel-item>
      </v-carousel>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      meetups: [
        { imageUrl: 'https://media.timeout.com/images/103444978/image.jpg', id: '2134aser3k1', title: 'Meetup New York'},
        { imageUrl: 'https://blog.netsabe.com.br/wp-content/uploads/2016/08/thiago-mesquita-03.jpg', id: '232412kfdsa', title: 'Meetup Uberlândia'}
      ]
    }
  }
}
</script>

<style lang="css">
</style>
