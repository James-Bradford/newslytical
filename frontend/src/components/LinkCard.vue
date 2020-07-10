<template lang="pug">
      v-expansion-panels(popout)
        v-expansion-panel(v-for='(url, u) in this.whois' :key='u')
          v-expansion-panel-header {{url.WhoisRecord.domainName}}
            v-expansion-panel-content
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
    }
  },

  created() {
    var urls = this.tweet.entities.urls;
    var whois = [];
    var self = this;
    var url;

    for (let i = 0; i < urls.length; i++) {
      url = psl.get(this.extractHostname(urls[i].expanded_url));
      Api.get(`whois/${url}`)
        .then(function(result) {
          whois.push(result.data);
        })
        .catch(error => {
          throw new Error("API ERROR");
        });
      this.whois = whois;
    }
  }
};
</script>

<style>
</style>