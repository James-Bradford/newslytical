<template lang="pug">
  v-app-bar(fixed dense)
    v-toolbar-title
      v-img(src="../assets/logo.png" alt="logo" height="40px" contain)
    v-spacer
    v-btn(id="btn-dark-mode" v-on:click="$vuetify.theme.dark = !$vuetify.theme.dark" icon)
      v-icon mdi-invert-colors

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