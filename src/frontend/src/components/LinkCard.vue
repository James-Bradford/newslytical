<template lang="pug">
 //     v-expansion-panels(popout)
        v-expansion-panel(v-for='(url, u) in this.tweet.entities.urls' :key='u')
          v-expansion-panel-header {{url.expanded_url}}
            v-expansion-panel-content
</template>

<script>
import axios from "axios";
import { Whois } from "../services/Whois";

export default {
  name: "LinkCard",
  props: {
    urls: []
  },
  created() {
    this.$store.dispatch('loadWhois');
    console.log(this.whois);
  },
  computed: {
    whois() {
      return this.$store.state.whois;
    },

  }
};
</script>

<style>
</style>