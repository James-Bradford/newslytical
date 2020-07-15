<template lang="pug">
    v-card.pa-2.elevation-4(color="warning")
      v-card-title.pa-2.white--text.text-h4
        v-icon.mdi.mdi-link(color='white' x-large)
        | Whois Data
      v-card-text
        v-divider.ma-2(color="white")
      v-expansion-panels(v-model="this.panel" v-if="this.tweet.entities.urls.length > 0")
        v-expansion-panel(v-for='(url, u) in this.tweet.entities.urls')
          v-expansion-panel-header {{ whois[u].WhoisRecord.domainName }}
          v-expansion-panel-content 
              div(v-if='isHTTPS(url.expanded_url)') 
                v-icon.mdi.mdi-lock-check(color="success")
                | This website uses HTTPS encryption
              div(v-else) 
                v-icon.mdi.mdi-lock-open-alert(color="warning")
                | This website does not use HTTPS encryption
              div(v-if='whois[u].WhoisRecord.registrant !== undefined') 
                v-icon.mdi.mdi-earth
                | Registered in: {{ whois[u].WhoisRecord.registrant.country }}
                br
                v-icon.mdi.mdi-account
                | Registrant: {{ whois[u].WhoisRecord.registrant.organization }}
              div(v-else)
                v-icon.mdi.mdi-earth-off
                | No location found for this domain
                br
                v-icon.mdi.mdi-account-off
                | No registrant information for this domain
              div(v-if='whois[u].WhoisRecord.registryData.createdDate !== undefined')
                v-icon.mdi.mdi-clock
                | Created: {{ whois[u].WhoisRecord.registryData.createdDate }}
      div.pa-2.white--text.text-justify(v-else) We haven't detected any links in this Tweet.  If we've got it wrong and there are links, please think carefully before clicking them and use your own discretion.
</template>

<script>
import axios from "axios";
import Api from "../services/Api";

export default {
  name: "LinkWhois",
  data() {
    return {
      panel: [0]
    }
  },
  props: {
    urls: [],
  },
  computed: {
    tweet() {
      return this.$store.state.tweet;
    },
    whois() {
      return this.$store.state.whois;
    }
  },
  created() {
    console.log(this.tweet);
  },
  methods: {
    isHTTPS(url) {
      if (url.match(/^[^:]+/) == "https") {
        return true
      } else { return false }
    }
  },
};
</script>

<style>
</style>