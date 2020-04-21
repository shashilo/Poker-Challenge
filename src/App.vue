<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Header from './components/layout/Header'
import Card from './components/Card'

export default {
  name: 'App',
  components: {
    Header,
    Card
  }
}
</script>

<style lang="scss">
  // Global Styles
  @import "src/styles/main";
</style>
