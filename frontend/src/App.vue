<template lang="pug">
  v-app(style="height: calc(100vh);")
    v-main
       nav-bar
       router-view(class="fill-height" style="padding-top: 100px; padding-bottom: 100px")
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