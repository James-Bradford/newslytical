<template lang="pug">
  div

    v-card-text

      //Keyword Selection
      span.title.white--text 
        | Keywords
      v-select.rounded-0(:items="keywords" solo @change="function(item) {$emit('trend-select', item); selectedKeyword = item}")
      div
        span.title.white--text 
          | Quick Actions
        
        br

        //Quick Action Buttons
        v-btn-toggle(rounded dense v-if="selectedKeyword" style="width: 100%")
          v-btn(color="white" target="_blank" :href="`https://fullfact.org/search/?q=${selectedKeyword}`" style="width: 33%") 
            v-icon() mdi-triangle
            | FullFact Lookup
          v-btn(color="white" target="_blank" :href="`https://www.snopes.com/?s=${selectedKeyword}`" style="width: 33%") 
            v-icon() mdi-desk-lamp
            | Snopes Lookup
          v-btn(color="white" target="_blank" :href="`https://www.google.com/search?q=${selectedKeyword}`" style="width: 34%") 
            v-icon() mdi-google
            | Google Search

        //No keyword selected
        div(v-else)
          span.font-weight-light.white--text 
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