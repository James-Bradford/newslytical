<template lang="pug">
div
  v-select(:items="keywords" solo @change="function(item) {$emit('trend-select', item)}")
    
</template>

<script>
const unique = require("unique-words");
import rake from '@simonjb/rake-js'

export default {
  name: "TrendsInfo",
  components: {
    keywords: []
  },
  computed: {
    tweetText() {
      return this.$store.state.rawTweet.full_text;
    },
    tweet() {
      return this.$store.state.rawTweet;
    },
    trends() {

      return this.$store.state.twitterTrendsUS[0].trends.concat(
        this.$store.state.twitterTrendsUK[0].trends
      );
    }
  },
  created() {
    this.keywords = rake(this.tweetText);

    for (let i = 0; this.tweet.entities.hashtags.length > i; i++) {
      this.keywords.push(this.tweet.entities.hashtags[i].text);
    }
  }
};
</script>

<style>
</style>