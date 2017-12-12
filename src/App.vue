<template>
  <v-app>
    <page-header></page-header>
    <main>

    </main>
  </v-app>
</template>

<script>
import PageHeader from './components/PageHeader.vue'

export default {
  name: 'app',
  data () {
    return {
      sideNav: false
    }
  },
  components: {
    PageHeader
  }
}
</script>

<style>
</style>
