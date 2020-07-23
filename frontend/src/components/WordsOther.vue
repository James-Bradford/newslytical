<template lang="pug">
  
  v-card-text
    span.title.white--text Other Topics

    //Related topic chips
    v-chip-group(multiple='' active-class='primary--text' v-if="relatedTopics.length > 0")
      v-chip(v-for='(trend, u) in this.relatedTopics' :key='u' target='_blank' :href='`https://fullfact.org/search/?q=${trend.topic.title}`' color='white')
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
</style>