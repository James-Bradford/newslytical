<template lang="pug">


    v-card-text
        v-select.rounded-0(:items="keywords" solo @change="function(item) {$emit('trend-select', item)}")
        
      
</template>

<script>
//Keyword Detection
const unique = require("unique-words");
import rake from "@simonjb/rake-js";

/**
 * Select box with keywords from the Tweet
 */
export default {
  name: "TrendsWords",
  data() {
      return {
          keywords: [],
      }
  },
  computed: {
    tweet() {
      return this.$store.state.rawTweet;
    }
  },
  created() {
    this.keywords = rake(this.tweet.full_text);
    for (let i = 0; this.tweet.entities.hashtags.length > i; i++) {
      this.keywords.push(this.tweet.entities.hashtags[i].text);
    }
  }
};
</script>

<style>
</style>