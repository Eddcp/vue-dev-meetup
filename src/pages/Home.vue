<template lang="html">
  <v-container>
    <v-layout row wrap class="mb-2">
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
          v-for="meetup in meetups"
          v-bind:src="meetup.imageUrl"
          :key="meetup.id"
          @click="onLoadMeetup(meetup.id)">
          <div class="image__title">
            {{ meetup.title }}
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awesome meetups!</p>
      </v-flex>
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
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  &__title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
}
</style>
