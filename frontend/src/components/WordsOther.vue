<template lang="pug">
  
  v-card-text
    span.title.white--text Other Topics

    //Related topic chips
    v-chip-group(v-if="relatedTopics.length > 0" active-class="chip-active" show-arrows)
      v-chip(v-for='(trend, u) in this.relatedTopics.slice(0,4)' :key='u' target='_blank' :href='`https://www.google.com/search?q=${trend.topic.title}`')
        | {{ trend.topic.title }}

    //No related topics
    div(v-else)
      span.font-weight-light.white--text 
        | No other topics found for this keyword.  Use the quick actions above for more context.     
        
</template>

<script>
/**
 * Chip group of related topics from Google Trends
 */
export default {
  name: "WordsOther",
  props: {
    relatedTopics: Array,
    topicsLoading: Boolean
  },


};
</script>

<style>
.chip-active{
  background-color: #1A76D2;
  color: white!important;
}
</style>