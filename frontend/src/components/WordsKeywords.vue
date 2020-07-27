<template lang="pug">
  div

    v-card.ma-1.pa-3.rounded-0.elevation-3

      //Keyword Selection
      span.title
        | Keywords
      v-select(:items="keywords" outlined @change="function(item) {$emit('trend-select', item); selectedKeyword = item}")
      div
        span.title
          | Quick Lookup
        
        br

        //Quick Action Buttons
        v-btn-toggle(rounded dense v-if="selectedKeyword" style="width: 100%")
          v-btn(color="#222222" target="_blank" :href="`https://fullfact.org/search/?q=${selectedKeyword}`" style="width: 33%; color: white") 
            v-icon(color="white") mdi-triangle
            | FullFact
          v-btn(color="#FBD440" target="_blank" :href="`https://www.snopes.com/?s=${selectedKeyword}`" style="width: 33%") 
            v-icon() mdi-desk-lamp
            | Snopes
          v-btn(color="#4285F4" target="_blank" :href="`https://www.google.com/search?q=${selectedKeyword}`" style="width: 34%;") 
            v-icon() mdi-google
            | Google

        //No keyword selected
        div(v-else)
          span.font-weight-light
            | No actions available, select a keyword to view actions.  
        
      
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
          selectedKeyword: null
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