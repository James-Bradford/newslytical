<template>
  <v-app-bar style="position: fixed; top: 0; left: 0; width: 100%; z-index: 10">

      <v-toolbar-title><v-img src="../assets/logo.png" alt="logo" height="40px" contain /></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn id="btn-dark-mode" v-on:click="$vuetify.theme.dark = !$vuetify.theme.dark" icon><v-icon>mdi-invert-colors</v-icon></v-btn>

    </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      darkToggle: null,
    }
  },
  created() {
    //If user OS has dark mode enabled, automatically enable dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.$vuetify.theme.dark = true; } else { this.$vuetify.theme.dark = false; }
  }
};
</script>

<style>
  #btn-dark-mode {
   color: var(--v-light-lighten1);
  }
</style>