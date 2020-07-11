<template lang="pug">
  v-app(style="height: calc(100vh);")
    v-overlay(v-if='isLoading')
        v-progress-circular(indeterminate='' color='primary' size='200' v-if='isLoading')
    v-main
       nav-bar
       router-view(v-if='!isLoading' class="fill-height" style="padding-top: 100px; padding-bottom: 100px")
</template>

<script>
import NavBar from "./components/NavBar";
export default {
  name: "App",
  components: {
    NavBar
  },
  data: () => ({
    isLoading: false
  }),
  created() {
    this.isLoading = true;
    this.$store.dispatch("loadRawTweet", this.$route.params.id);
    this.$store.dispatch("loadTweet", this.$route.params.id);
    this.isLoading = false;
  }
};
</script>

<style scoped>
</style>