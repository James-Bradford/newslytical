<template lang="pug">
v-card#tweet-card.mx-auto.pa-6.rounded-lg.elevated-4
  v-card-title
    v-icon(large='' left='' color='white') mdi-twitter
    span.title.font-weight-light.white--text Original Tweet

    //Tweet Text
    div#tweet-text.text-h6.text-md-h4.white--text(ref='highlight' v-html='this.tweet.full_text')

  // Tweet Profile
  v-card-actions
    v-list-item.grow
      v-list-item-avatar(color='grey darken-3')
        img.elevation-6(:src="tweet.user.profile_image_url")
      v-list-item-content
        v-list-item-title.white--text {{ this.tweet.user.name }}
      v-row(align='center' justify='end')
        v-icon.mr-1(color='white') mdi-heart
        span.subheading.mr-2.white--text {{ formatNumber(this.tweet.favorite_count) }}
        span.mr-1.white--text &middot;
        v-icon.mr-1(color='white') mdi-twitter-retweet
        span.subheading.white--text {{ formatNumber(this.tweet.retweet_count) }}

</template>

<script>
export default {
  name: "TweetCard",
  methods: {
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    tabChange(tab) {
      this.tab = tab;
      console.log(tab);
    },
  },
  computed: {
    tweet() {
      return this.$store.state.tweet;
    },
    tab: {
      get: function() {
        return this.$store.state.tab;
      },
      set: function(tab) {
        this.$store.dispatch("setTab", tab);
      }
    },
  },


  
};
</script>

<style scoped>


</style>