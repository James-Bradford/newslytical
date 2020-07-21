<template lang="pug">
    
  v-skeleton-loader(card :loading="topicsLoading" height="100" type="list-item-three-line")
    v-card()
        v-card-title
            v-icon(large='' left='') mdi-trending-up
            span.title.font-weight-light Other Topics
        v-card-text
          v-chip-group(multiple='' active-class='primary--text')
            v-chip(v-for='(trend, u) in relatedTopics.default.rankedList[0].rankedKeyword.slice(0,5)' :key='u')
            | {{ trend.topic.title }}
            
        
</template>

<script>

export default {
  name: "RelatedTopics",
  props: {
    relatedTopics: [],
    topicsLoading: Boolean
  },
  computed: {
    tweetText() {
      return this.$store.state.rawTweet.full_text;
    }
  },

};
</script>

<style>
</style>