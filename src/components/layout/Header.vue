<template>
  <header>
    <h1 class="-text-uppercase"><router-link to="/deck/new">{{ title }}</router-link></h1>
  </header>
</template>

<script>
export default {
  name: 'header',
  props: [ 'title' ]
}
</script>

<style lang="scss" scoped>
  @import "src/styles/abstracts/variables";

  header {
    align-items: center;
    background-color: $green;
    display: flex;
    height: 12rem;
    justify-content: center;
  }
</style>
