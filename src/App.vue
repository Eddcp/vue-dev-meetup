<template>
  <v-app>
    <page-header></page-header>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
import PageHeader from './components/PageHeader.vue'

export default {
  name: 'app',
  components: {
    PageHeader
  }
}
</script>

<style>
</style>
