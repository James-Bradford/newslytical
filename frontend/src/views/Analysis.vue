<template lang="pug">
div
  v-overlay(v-if='isLoading')
    v-progress-circular(indeterminate='' color='primary' size='200' v-if='isLoading')
  // Tab Content Start
  v-tabs-items.tab-background.fill-height(v-model='tab')
    router-view
    
    // Tweet Tab
    v-tab-item.fill-height(:key='1')
      tweet-layout

    // Profile Tab
    v-tab-item.fill-height(:key='2')
        profile-layout

    // Link Tab
    v-tab-item.fill-height(:key='3')
      link-layout

    // Trends Tab
    v-tab-item.fill-height(:key='4')
        trends-layout

    v-tab-item(:key='5')
      v-container
        h1 Media
    v-tab-item(:key='6')
      v-container
        h1 Summary

  // Tab Buttons
  v-tabs(v-model='tab' icons-and-text='' style='position: fixed; bottom: 0; left: 0; width: 100%' center-active='' centered='' grow='')
    v-tabs-slider
    v-tab(:key='1')
      | Tweet
      v-icon mdi-twitter
    v-tab(:key='2')
      | Profile
      v-icon mdi-account
    v-tab(:key='3')
      | Links
      v-icon mdi-link
    v-tab(:key='4')
      | Trends
      v-icon mdi-trending-up
    v-tab(:key='5')
      | Media
      v-icon mdi-image
    v-tab(:key='6')
      | Summary
      v-icon mdi-card-text-outline

</template>

<script>
//Import components
import TweetLayout from "../components/TweetLayout";
import LinkLayout from "../components/LinkLayout";
import ProfileLayout from "../components/ProfileLayout";
import TrendsLayout from "../components/TrendsLayout";

export default {
  name: "Analysis",
  components: {
    TweetLayout,
    ProfileLayout,
    LinkLayout,
    TrendsLayout
  },
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    this.isLoading = true;
    this.$store.dispatch("loadRawTweet", this.$route.params.id);
    this.$store.dispatch("loadTweet", this.$route.params.id);
    this.$store.dispatch("loadTwitterTrendsUS");
    this.$store.dispatch("loadTwitterTrendsUK");
    this.isLoading = false;
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
.tab-item-wrapper {
  margin-top: 100px;
  margin-bottom: 100px;
}
</style>