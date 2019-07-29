<template>
  <div>
    <Menu></Menu>
    <Main></Main>
  </div>
</template>

<script>
  import Menu from '../view/layout/slideMenu'
  import Main from '../view/layout/mainContext'
    export default {
      name: "home.vue",
      components: {
        Menu,
        Main
      }
    }
</script>

<style scoped>

</style>
