<template lang="pug">
div.fill-height
  v-row.fill-height(align="center" justify="center")
    v-col(cols="11" md="8")
      v-card(color="accent")
        v-card-title.white--text Analyse a Tweet
        v-card-text
          v-text-field(
            label="Tweet URL"
            solo
            v-model="search"
            @keydown.enter="searchTweet")


</template>

<script>

  export default {
    name: 'Home',
    data() {
      return{
        search: null,
      }
    },
    methods: {
      searchTweet() {
            var myRegexp = /^(https|http)?:?\/?\/?twitter.com\/.*\/status\/(\d*)$/;
            var match = myRegexp.exec(this.search);
            var tweetID = (match[2]);
            this.$router.push('analysis/' + tweetID);
      }
    }
  }
</script>
