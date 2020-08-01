<template lang="pug">

//WHOIS Card
v-card.pa-2.elevation-4.rounded-0(color="warning", v-if="tweet.entities")
  //WHOIS Card Title
  v-card-title.pa-2.white--text.text-h4
    v-icon.mdi.mdi-link(color="white", x-large)
    | Links
  v-card-text
    v-divider.ma-2(color="white")

  //WHOIS Expansion Panel
  v-expansion-panels(
    v-if="this.tweet.entities.urls.length > 0",
    v-model="defaultPanel"
  )
    v-expansion-panel.rounded-0(
      v-for="(url, u) in this.tweet.entities.urls",
      :key="u"
    )
      v-expansion-panel-header {{ whois[u].WhoisRecord.domainName }}
      v-expansion-panel-content 
        v-row
          v-col(cols="6")
            div(v-if="isHTTPS(url.expanded_url)") 
              v-icon.mdi.mdi-lock-check(color="success")
              | HTTPS encryption
            div(v-else) 
              v-icon.mdi.mdi-lock-open-alert(color="warning")
              | No HTTPS encryption
            div(v-if="whois[u].WhoisRecord.registrant !== undefined") 
              v-icon.mdi.mdi-earth
              | Registered in: {{ whois[u].WhoisRecord.registrant.country }}
              br
              v-icon.mdi.mdi-account
              | Registrant: {{ whois[u].WhoisRecord.registrant.organization }}
            div(v-else)
              v-icon.mdi.mdi-earth-off
              | No location found
              br
              v-icon.mdi.mdi-account-off
              | No registrant information
            div(
              v-if="whois[u].WhoisRecord.registryData.createdDate !== undefined"
            )
              v-icon.mdi.mdi-clock
              | Created: {{ whois[u].WhoisRecord.registryData.createdDate }}
          v-col(cols="6")
            |

  //No Links
  .pa-2.white--text.text-justify(v-else) We haven't detected any links in this Tweet. If we've got it wrong and there are links, please think carefully before clicking them and use your own discretion.
</template>

<script>
//Import dependencies
import Api from "../services/Api";

/**
 * Provides a domain lookup
 */
export default {
  name: "LinkWhois",
  props: {
    /**
     * Urls to be investigated
     */
    urls: [],
  },
  data() {
    return {
      /**
       * Default panel open
       */
      defaultPanel: 0,
    };
  },
  computed: {
    /**
     * Tweet object
     */
    tweet() {
      return this.$store.state.tweet;
    },
    /**
     * Whois lookup object
     */
    whois() {
      return this.$store.state.whois;
    },
  },
  methods: {
    /**
     * Returns true if the URL uses HTTPS
     *
     * @param url URL
     */
    isHTTPS(url) {
      if (url.match(/^[^:]+/) == "https") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
</style>