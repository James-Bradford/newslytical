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
<<<<<<< HEAD
=======
    created() {
        for (let i = 0; i < this.tweetWords.length; i++) {

        }
    }
>>>>>>> parent of 12e08ca0... Fixed trends endpoint

}
</script>

<style>

</style>