<template lang="pug">

  //Card
  v-card.rounded-0(color='success')

    //Profile Details
    v-card-text.text-h4.white--text.elevation-4
      v-list-item-avatar(color='grey darken-3')
        v-img.elevation-6(:src='this.tweet.user.profile_image_url')
      |       {{ this.tweet.user.name }}
      v-divider.ma-2(color='white')
      .text-body-1.white--text {{ this.tweet.user.description }}
      v-divider.ma-2(color='white')
      .text-body-1.white--text
        b Screen Name
        |         @{{ this.tweet.user.screen_name }}
      .text-body-1.white--text
        b Followers
        |         {{ this.followers_count }}
      .text-body-1.white--text
        b Following
        |         {{ this.friends_count }}
      .text-body-1.white--text
        b Posts
        |         {{ this.statuses_count }}
      .text-body-1.white--text
        b Account Age
        |         {{ this.account_age }}

</template>

<script>
/**
 * Card with profile details
 */
export default {
  name: "ProfileCard",
  computed: {
    tweet() {
      return this.$store.state.tweet;
    },
    followers_count() {
      return this.formatNumber(this.$store.state.tweet.user.followers_count);
    },
    friends_count() {
      return this.formatNumber(this.$store.state.tweet.user.friends_count);
    },
    statuses_count() {
      return this.formatNumber(this.$store.state.tweet.user.statuses_count);
    },
    account_age() {
      var creationDate = new Date(this.$store.state.tweet.user.statuses_count);
      var now = new Date();
      var accountAge = (now - creationDate) / (1000 * 3600 * 24);

      if (accountAge > 365) {
        return Math.round(accountAge / 365) + " Years";
      } else {
        return Math.round(accountAge) + " Days";
      }
    }
  },
  methods: {
    /**
     * Formats a number to include commas
     *
     * @param num Number
     */
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  }
};
</script>

<style>
</style>