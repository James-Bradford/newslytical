<template lang="pug">
 //     v-expansion-panels(popout)
        v-expansion-panel(v-for='(url, u) in this.tweet.entities.urls' :key='u')
          v-expansion-panel-header {{url.expanded_url}}
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
  created() {
    var urls = this.tweet.entities.urls;
    var whois = [];
    var self = this;

    for (let i = 1; i < urls.length; i++) {
      Api.get(`whois/${urls[i]}`)
        .then(function(result) {
          whois.push(result.data);
          console.log(result.data);
        })
        .catch(error => {
          throw new Error("API ERROR");
        });
        whois = this.whois;
    }
  },
};
</script>

<style>
</style>