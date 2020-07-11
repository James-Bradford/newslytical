<template lang="pug">
v-card(color='success rounded-lg')
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
      |         {{ this.tweet.user.followers_count }}
    .text-body-1.white--text
      b Following
      |         {{ this.tweet.user.friends_count }}
    .text-body-1.white--text
      b Posts
      |         {{ this.tweet.user.statuses_count }}
    .text-body-1.white--text
      b Creation Date
      |         {{ this.tweet.user.created_at }}
</template>

<script>
export default {
  name: "ProfileOverview",
  computed: {
    tweet() {
      return this.$store.state.tweet;
    }
  }
};
</script>

<style>
</style>