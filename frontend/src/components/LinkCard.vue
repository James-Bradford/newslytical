<template lang="pug">
      v-expansion-panels(popout)
        v-expansion-panel(v-for='(url, u) in this.whois' :key='u')
          v-expansion-panel-header {{url.WhoisRecord.domainName}}
            v-expansion-panel-content
</template>

<script>
import axios from "axios";
import Api from "../services/Api";

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
  created() {
    console.log(this.tweet.entities.urls);
    var urls = this.tweet.entities.urls;
    var whois = [];
    var self = this;


    for (let i = 1; i < urls.length; i++) {
      Api.get(`whois/${urls[i]}`)
        .then(function(result) {
          whois.push(result.data);
        })
        .catch(error => {
          throw new Error("API ERROR");
        });
        whois = this.whois;
        console.log(whois);
    }
  },
};
</script>

<style>
</style>