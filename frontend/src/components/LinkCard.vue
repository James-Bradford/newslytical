<template lang="pug">
      v-expansion-panels(popout)
        v-expansion-panel(v-for='(url, u) in this.tweet.entities.urls' :key='u')
          v-expansion-panel-header {{ url.expanded_url }}
            v-expansion-panel-content
              |{{ isHTTPS(url.expanded_url) }}
</template>

<script>
import axios from "axios";
import Api from "../services/Api";
var psl = require("psl");

export default {
  name: "LinkCard",
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
  }
};
</script>

<style>
</style>