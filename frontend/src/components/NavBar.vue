<template lang="pug">
  v-app-bar(fixed dense)
    v-toolbar-title
      v-img(v-if="tab == 0 || tab == undefined" src="../assets/logo.png" alt="logo" height="40px" contain)
      v-img(v-if="tab == 1" src="../assets/logo-success.png" alt="logo" height="40px" contain)
      v-img(v-if="tab == 2" src="../assets/logo-accent.png" alt="logo" height="40px" contain)
      v-img(v-if="tab == 3" src="../assets/logo-warning.png" alt="logo" height="40px" contain)
      v-img(v-if="tab == 4" src="../assets/logo-purple.png" alt="logo" height="40px" contain)
      v-img(v-if="tab == 5" src="../assets/logo-charcoal.png" alt="logo" height="40px" contain)
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
  computed: {
    tab() {
      return this.$store.state.tab;
    }
  },
  created() {
    //If user OS has dark mode enabled, automatically enable dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.$vuetify.theme.dark = true; } else { this.$vuetify.theme.dark = false; }
      console.log(this.tab);
  }

};
</script>

<style>
  #btn-dark-mode {
   color: var(--v-light-lighten1);
  }
</style>