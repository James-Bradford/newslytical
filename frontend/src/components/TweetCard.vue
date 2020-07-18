<template lang="pug">
v-card#tweet-card.mx-auto.pa-6.rounded-lg.elevated-4
  v-card-title
    v-icon(large='' left='' color='white') mdi-twitter
    span.title.font-weight-light.white--text Original Tweet

    //Tweet Text
    div#tweet-text.text-h6.text-md-h4.white--text(v-if="tweet.entities" ref='highlight' v-html='highlightTweet()')

  // Tweet Profile
  v-card-actions
    v-list-item.grow
      v-list-item-avatar(color='grey darken-3')
        img.elevation-6(:src="profile_url")
      v-list-item-content
        v-list-item-title.white--text(v-if="tweet.user") {{ tweet.user.name }}
      v-row(align='center' justify='end')
        v-icon.mr-1(color='white') mdi-heart
        span.subheading.mr-2.white--text(v-if="tweet.favourite_count") {{ formatNumber(tweet.favorite_count) }}
        span.mr-1.white--text &middot;
        v-icon.mr-1(color='white') mdi-twitter-retweet
        span.subheading.white--text(v-if="tweet.retweet_count") {{ formatNumber(tweet.retweet_count) }}

</template>

<script>
export default {
  name: "TweetCard",
  data() {
    return {
      full_text: String,
      profile_url: String
    };
  },
  methods: {
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    tabChange(tab) {
      this.tab = tab;
    },
    highlightTweet() {
      //Set variables
      var tweet = this.tweet;
      var urls = tweet.entities.urls;
      const hashtags = tweet.entities.hashtags;

      //For each URL, replace it with highlighted version
      for (let i in urls) {
        tweet.full_text = tweet.full_text.replace(
          urls[i].url,
          `<span class="highlightURL">${urls[i].expanded_url}</span>`
        );
      }

      //For each hashtag, replace it with highlighted version
      for (let i in hashtags) {
        tweet.full_text = tweet.full_text.replace(
          "#" + hashtags[i].text,
          `<span class="highlightHashtag">#${hashtags[i].text}</span>`
        );
      }
      return tweet.full_text;
    }
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
    }
  },
  updated() {}
};
</script>

<style scoped>
</style>