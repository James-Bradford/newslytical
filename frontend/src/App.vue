<template lang="pug">
  v-app.fill-height()
    v-main.fill-height
       nav-bar
       router-view.fill-height()
</template>

<script>
import NavBar from "./components/NavBar";
export default {
  name: "App",
  components: {
    NavBar
  },

};
</script>

<style scoped>
</style>