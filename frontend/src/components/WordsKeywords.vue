<template lang="pug">
  div

    v-card.ma-1.pa-3.rounded-0.elevation-3

      //Keyword Selection
      span.title
        | Keywords
      v-select(:items="keywords" outlined @change="function(item) {$emit('trend-select', item); selectedKeyword = item}")


      span.title Other Topics

      //Related topic chips
      v-chip-group(v-if="relatedTopics.length > 0" active-class="chip-active" show-arrows)
        v-chip(v-for='(trend, u) in this.relatedTopics.slice(0,4)' :key='u' target='_blank' @click="$emit('related-select', trend.topic.title)")
          | {{ trend.topic.title }}

      //No related topics
      div(v-else)
        span.font-weight-light
          | No other topics found for this keyword.  Use the quick actions above for more context.    
        
      
</template>

<script>
//Keyword Detection
const unique = require("unique-words");
import rake from "@simonjb/rake-js";

/**
 * Select box with keywords from the Tweet
 */
export default {
  name: "WordsKeywords",
  data() {
    return {
      keywords: [],
      selectedKeyword: null,
    };
  },
  props: {
    relatedTopics: Array,
    topicsLoading: Boolean,
  },
  computed: {
    tweet() {
      return this.$store.state.rawTweet;
    },
  },
  created() {
    this.keywords = rake(this.tweet.full_text);
    for (let i = 0; this.tweet.entities.hashtags.length > i; i++) {
      this.keywords.push(this.tweet.entities.hashtags[i].text);
    }
  },
};
</script>

<style>
</style>