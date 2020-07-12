<template lang="pug">
  v-card(color='accent')
    v-card-title
        v-icon(large='' left='' color='white') mdi-trending-up
        span.title.font-weight-light.white--text Tends
        
      
</template>

<script>
const unique = require('unique-words');

export default {
    name: 'WordsTrends',
    computed: {
        tweetWords() {
            return unique(this.$store.state.rawTweet.full_text);
        },
    },

}
</script>

<style>

</style>