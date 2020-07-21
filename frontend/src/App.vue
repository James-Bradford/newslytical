<template lang="pug">
  v-app
    v-main.fill-height
       nav-bar
       router-view
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