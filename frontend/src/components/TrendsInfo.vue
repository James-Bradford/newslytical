<template lang="pug">
div
    v-chip(class="ma-2" color="white" v-for="(trend, u) in this.commonWords" @click="$emit('trend-select', trend.name)")
        | {{trend.name}}
</template>

<script>
const unique = require("unique-words");

export default {
  name: "TrendsInfo",
  components: {
    commonWords: []
  },
  computed: {
    tweetText() {
      return this.$store.state.rawTweet.full_text;
    },
    trends() {

      return this.$store.state.twitterTrendsUS[0].trends.concat(
        this.$store.state.twitterTrendsUK[0].trends
      );
    }
  },
  created() {
    var commonWords = [];
    var tweetWords = unique(this.tweetText.toLowerCase());

    console.log(tweetWords);

    for (let i = 0; i < this.trends.length; i++) {
        var trend = this.trends[i].name.toLowerCase().replace(/[^a-zA-Z ]/g, "");

            if (tweetWords.includes(trend) || tweetWords.includes("#" + trend)) {
                commonWords.push({
                    'name': trend,
                    'tweet_volume': this.trends[i].tweet_volume
                });
            }
        
    }
    this.commonWords = commonWords;
    console.log(this.commonWords);
  }
};
</script>

<style>
</style>