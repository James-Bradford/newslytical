<template lang="pug">

    v-chip-group(multiple='' active-class='primary--text')
      v-chip(v-for='(trend, u) in this.relatedTopics' :key='u' target='_blank' :href='`https://fullfact.org/search/?q=${trend.topic.title}`' color='white')
        | {{ trend.topic.title }}
            
        
</template>

<script>

export default {
  name: "TrendsOther",
  props: {
    relatedTopics: Array,
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