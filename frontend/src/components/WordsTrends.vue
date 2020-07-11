<template lang="pug">
  div
</template>

<script>
const unique = require('unique-words');

export default {
    name: 'WordsTrends',
    computed: {
        tweetWords() {
            return unique(this.$store.state.rawTweet.full_text);
        }
    },
    mounted() {
        console.log(this.tweetWords);
    }

}
</script>

<style>

</style>