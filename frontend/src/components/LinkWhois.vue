<template lang="pug">
    v-card.pa-2.elevation-4(color="warning")
      v-card-title.white--text.text-h4
        v-icon.mdi.mdi-link(color='white' x-large)
        | Whois Data
      v-expansion-panels
        v-expansion-panel(v-for='(url, u) in this.tweet.entities.urls' :key='u')
          v-expansion-panel-header {{ url.expanded_url }}
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
              
             
</template>

<script>
import axios from "axios";
import Api from "../services/Api";
var psl = require("psl");

export default {
  name: "LinkWhois",
  props: {
    urls: [],
    whois: []
  },
  computed: {
    tweet() {
      return this.$store.state.tweet;
    }
  },
  methods: {
    extractHostname(url) {
      var hostname;
      //find & remove protocol (http, ftp, etc.) and get hostname

      if (url.indexOf("//") > -1) {
        hostname = url.split("/")[2];
      } else {
        hostname = url.split("/")[0];
      }

      //find & remove port number
      hostname = hostname.split(":")[0];
      //find & remove "?"
      hostname = hostname.split("?")[0];

      return hostname;
    },
    isHTTPS(url) {
      if (url.match(/^[^:]+/) == "https") {
        return true
      } else { return false }
    }
  },

  created() {
    var urls = this.tweet.entities.urls;
    var whois = [];
    var self = this;
    var url;

    //Performs whois on each hostname in Tweet
    for (let i = 0; i < urls.length; i++) {

      //Extract hostname
      url = psl.get(this.extractHostname(urls[i].expanded_url));

      //Make API call
      Api.get(`whois/${url}`)
        .then(function(result) {

          //Add result to array
          whois.push(result.data);
        })
        .catch(error => {
          throw new Error("API ERROR");
        });

      //Assign local variable
      this.whois = whois;
    }
    console.log(this.whois);
  }
};
</script>

<style>
</style>