<template>
  <v-card color="success rounded-lg">
    <!--<v-card-title>
            <v-icon large left>mdi-account</v-icon>
            <span class="title font-weight-light">Original Poster</span>
    </v-card-title>-->
    <v-card-text class="text-h4 white--text elevation-4">
      <v-list-item-avatar color="grey darken-3">
        <v-img class="elevation-6" :src="this.tweet.user.profile_image_url"></v-img>
      </v-list-item-avatar>
      {{ this.tweet.user.name }}
      <v-divider color="white" class="ma-2"></v-divider>
      <div class="text-body-1 white--text">{{ this.tweet.user.description }}</div>
      <v-divider color="white" class="ma-2"></v-divider>
      <div class="text-body-1 white--text">
        <b>Screen Name</b>
        @{{ this.tweet.user.screen_name }}
      </div>
      <div class="text-body-1 white--text">
        <b>Followers</b>
        {{ this.tweet.user.followers_count }}
      </div>
      <div class="text-body-1 white--text">
        <b>Following</b>
        {{ this.tweet.user.friends_count }}
      </div>
      <div class="text-body-1 white--text">
        <b>Posts</b>
        {{ this.tweet.user.statuses_count }}
      </div>
      <div class="text-body-1 white--text">
        <b>Creation Date</b>
        {{ this.tweet.user.created_at }}
      </div>
    </v-card-text>
  </v-card>
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