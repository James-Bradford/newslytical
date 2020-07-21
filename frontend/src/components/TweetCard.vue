<template lang="pug">
  v-bottom-sheet(v-model='sheet')
    v-sheet.text-center(height='200px')
      v-btn.mt-6(text='' color='red' @click='sheet = !sheet') close
    

      //Card
      v-card#tweet-card.mx-auto.pa-6.elevated-4.rounded-0
        v-card-title
          v-icon(large='' left='' color='white') mdi-twitter
          span.title.font-weight-light.white--text Original Tweet

          //Tweet Text
          div#tweet-text.text-h6.text-md-h4.white--text(v-if="tweet.entities" ref='highlight' v-html='highlightTweet()')

        // Tweet Profile
        v-card-actions
          v-list-item.grow

            //Profile Image
            v-list-item-avatar(color='grey darken-3')
              img.elevation-6(v-if="tweet.user" :src="String(tweet.user.profile_image_url_https)")

            //Profile Name
            v-list-item-content
              span.pa-1(v-if="this.highlightType=='profile'" style="background-color: green")
                v-list-item-title.white--text(v-if="tweet.user") {{ tweet.user.name }}
            v-row(align='center' justify='end')
              v-icon.mr-1(color='white') mdi-heart
              span.subheading.mr-2.white--text(v-if="tweet.favorite_count") {{ formatNumber(tweet.favorite_count) }}
              span.mr-1.white--text &middot;
              v-icon.mr-1(color='white') mdi-twitter-retweet
              span.subheading.white--text(v-if="tweet.retweet_count") {{ formatNumber(tweet.retweet_count) }}

</template>

<script>
/**
 * Card containing tweet information
 */
export default {
  name: "TweetCard",
  data() {
    return {
      full_text: String,
      profile_url: String,
      hightlightType: "profile",
      sheet: false,
    };
  },
  props: {
    highlightType: String,
  },
  methods: {
    /**
     * Formats a number to include commas
     *
     * @param num Number
     */
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    /**
     * Sets the current tab to a given number
     *
     * @param tab Tab Number
     */
    tabChange(tab) {
      this.tab = tab;
    },
    /**
     * Highlights text on the tweet
     * 
     * @param type Type of Highlight
     */
    highlightTweet(type) {
      //Set variables
      var tweet = this.tweet;
      var urls = this.tweet.entities.urls;
      const hashtags = this.tweet.entities.hashtags;

      switch (type) {
        case "hashtag":
          //For each hashtag, replace it with highlighted version
          for (let i in hashtags) {
            tweet.full_text = tweet.full_text.replace(
              "#" + hashtags[i].text,
              `<span class="highlightHashtag">#${hashtags[i].text}</span>`
            );
          }
          break;

        case "url":
          //For each URL, replace it with highlighted version
          for (let i in urls) {
            tweet.full_text = tweet.full_text.replace(
              urls[i].url,
              `<span class="highlightURL">${urls[i].expanded_url}</span>`
            );
          }
          break;
      }

      return tweet.full_text;
    }
  },
  mounted() {
    if(this.tweet ==! undefined) {this.highlightTweet(this.highlightType);}
    
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
  }
};
</script>

<style scoped>
</style>