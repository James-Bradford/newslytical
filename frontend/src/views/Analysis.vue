<template lang="pug">
div.fill-height

  //Loading Overlay
  v-overlay(v-if='isLoading')
    v-progress-circular(indeterminate='' color='primary' size='200')

  // Tab Content Start
  v-tabs-items.tab-background.fill-height.pt-10.pb-12.py-md-0(v-model='tab')
    router-view
    
    // Tweet Tab
    //v-tab-item.fill-height(:key='1')
      tweet-layout

    // Profile Tab
    v-tab-item.fill-height(:key='2')
      profile-layout

    // Link Tab
    v-tab-item.fill-height(:key='3')
      link-layout

    //Keywords Tab
    v-tab-item.fill-height(:key='4')
      words-layout

    //Media Tab
    v-tab-item.fill-height(:key='5')
      media-layout

    v-tab-item(:key='6')
      v-container
        h1 Summary

  // Tab Buttons
  v-tabs(v-model='tab' icons-and-text='' style='position: fixed; bottom: 0; left: 0; width: 100%; z-index: 5;' center-active='' centered='' grow='')
    v-tabs-slider
    //v-tab(:key='1')
      | Tweet
      v-icon mdi-twitter
    v-tab(:key='2')
      | Profile
      v-icon mdi-account
    v-tab(:key='3')
      | Links
      v-icon mdi-link
    v-tab(:key='4')
      | Words
      v-icon mdi-card-text-outline
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
import WordsLayout from "../components/WordsLayout";
import MediaLayout from "../components/MediaLayout";

export default {
  name: "Analysis",
  components: {
    TweetLayout,
    ProfileLayout,
    LinkLayout,
    WordsLayout,
    MediaLayout
  },
  computed: {
    //Tweet object returned from VueX state
    tweet() {
      return this.$store.state.tweet;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    //Tab number returned from VueX state
    tab: {
      get: function() {
        return this.$store.state.tab;
      },
      set: function(tab) {
        this.$store.dispatch("setTab", tab);
      }
    }
  },
  created() {
    //Set loading variable, load VueX states
    this.$store.commit("TOGGLE_IS_LOADING");
    this.$store.dispatch("loadRawTweet", this.$route.params.id);
    this.$store.dispatch("loadTweet", this.$route.params.id);
    this.$store.dispatch("loadTwitterTrendsUS");
    this.$store.dispatch("loadTwitterTrendsUK");
    this.$store.commit("TOGGLE_IS_LOADING");
  }
};
</script>

<style scoped>
.tab-item-wrapper {
  margin-top: 100px;
  margin-bottom: 100px;
}
</style>