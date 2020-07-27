<template lang="pug">
div.fill-height

  //Loading Overlay
  v-overlay(v-if='isLoading')
    v-progress-circular(indeterminate='' color='primary' size='200')

  // Tab Content Start
  v-tabs-items.tab-background.fill-height.pt-10.pb-12.py-md-0(v-model='tab')
    router-view

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





    v-bottom-navigation(:value="tab" :color="tabColor" scroll-target="#scroll-area-1" hide-on-scroll fixed shift) 
      v-btn(@click="setTab(0); $emit('set-tab', 0)")
        span Profile
        v-icon mdi-account
      v-btn(@click="setTab(1); $emit('set-tab', 1)")
        span Links
        v-icon mdi-link
      v-btn(@click="setTab(2); $emit('set-tab', 2)")
        span Words
        v-icon mdi-card-text-outline
      v-btn(@click="setTab(3); $emit('set-tab', 3)")
        span Images
        v-icon mdi-image
      v-btn(@click="setTab(4); $emit('set-tab', 4)")
        span Summary
        v-icon mdi-clipboard-outline

    
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
  data() {
    return {
      tab: 0,
      tabColor: "success"
    }
  },
  components: {
    TweetLayout,
    ProfileLayout,
    LinkLayout,
    WordsLayout,
    MediaLayout
  },
  methods: {
    /**
     * Sets the number and color of the active tab
     *
     * @param num Tab Number
     */
    setTab(num) {
      this.$store.commit('SAVE_TAB', num);
      this.tab = num;
      
      switch(num) {
        case 0:
          this.tabColor = "success";
          break;
        case 1:
          this.tabColor = "warning";
          break;
        case 2:
          this.tabColor = "accent";
          break;
        case 3:
          this.tabColor = "purple";
          break;
        case 4:
          this.tabColor = "blue-grey darken-1";
          break;
      }
    }
  },
  computed: {
    //Tweet object returned from VueX state
    tweet() {
      return this.$store.state.tweet;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
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