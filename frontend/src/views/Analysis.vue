<template lang="pug">
div.fill-height
  //Loading Overlay
  v-overlay(v-if="isLoading")
    v-progress-circular(indeterminate="", color="primary", size="200")
  v-container.fill-height
    v-row(justify-center align-center style="height: calc(100vh - 110px); overflow:auto")

      // Tab Content Start
      v-tabs-items.tab-background.fill-height.pt-10.pb-12.py-md-0(v-model="tab" style="width: 100%")
        router-view

        // Tweet Tab
        v-tab-item.fill-height(:key="1")
          tweet-layout

        // Profile Tab
        v-tab-item.fill-height(:key="2")
          profile-layout

        //Keywords Tab
        v-tab-item.fill-height(:key="3")
          words-layout(@loading="setLoading($event)")

        // Link Tab
        v-tab-item.fill-height(:key="4")
          link-layout

        //Images Tab
        v-tab-item.fill-height(:key="5")
          media-layout(@loading="setLoading($event)")

        //Feedback Tab
        v-tab-item.fill-height(:key="6")
          v-overlay(v-if="iframeLoad")
            v-progress-circular(indeterminate="", color="primary", size="200")
          v-container.fill-height
            v-row(justify="center" align="center")
              iframe(
                :src="`https://docs.google.com/forms/d/e/1FAIpQLSfmxO8iNGx_1w_5pM5u4z7eJLVAUTUDu9pEpUPwHi1fihNOyw/viewform?embedded=true&entry.1512243468=${$route.params.id}`",
                width="640",
                height="613",
                frameborder="0",
                marginheight="0",
                marginwidth="0",
                @load="iframeLoad = false"
              ) Loading&mldr;

    //Bottom Navigation
    v-bottom-navigation(
      :value="tab",
      :color="tabColor",
      scroll-target="#scroll-area-1",
      fixed,
      shift
    ) 
      //Twitter Button
      v-btn(@click="setTab(0); $emit('set-tab', 0)")
        span Tweet
        v-icon mdi-twitter

      v-badge.fill-height(
        bordered,
        color="info",
        content="",
        overlap,
        offset-x="30",
        left,
        :value="!visitedTabs.profile"
      ) 
        v-btn(@click="setTab(1); $emit('set-tab', 1)")
          span Profile
          v-icon mdi-account

      //Words Button
      v-badge.fill-height(
        bordered,
        color="info",
        content="",
        overlap,
        offset-x="30",
        left,
        :value="!visitedTabs.words"
      ) 
        v-btn(@click="setTab(2); $emit('set-tab', 2)")
          span Words
          v-icon mdi-card-text-outline

      //Links Button
      v-badge.fill-height(
        bordered,
        color="info",
        :content="getLinksBadge()",
        overlap,
        offset-x="30",
        left,
        :value="!visitedTabs.links"
      ) 
        v-btn(@click="setTab(3); $emit('set-tab', 3)")
          span Links
          v-icon mdi-link

      //Image Button
      v-badge.fill-height(
        bordered,
        color="info",
        :content="getMediaBadge()",
        overlap,
        offset-x="30",
        left,
        :value="!visitedTabs.images"
      ) 
        v-btn(@click="setTab(4); $emit('set-tab', 4)")
          span Images
          v-icon mdi-image

      //Feedback Button
      v-btn(
        @click="setTab(5); $emit('set-tab', 5)",
        v-if="visitedTabs.profile && visitedTabs.links && visitedTabs.words && visitedTabs.images"
      )
        span Feedback
        v-icon mdi-bullhorn
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
      /**
       * Active tab number
       */
      tab: Number(0),
      /**
       * Color of active tab button
       */
      tabColor: String("info"),
      /**
       * True if tabs have been visited
       */
      visitedTabs: {
        profile: false,
        links: false,
        words: false,
        images: false,
      },
      /**
       * True if the iframe is currently loading
       */
      iframeLoad: true,
      /**
       * True if the APIs are loading
       */
      isLoading: true,
    };
  },
  components: {
    TweetLayout,
    ProfileLayout,
    LinkLayout,
    WordsLayout,
    MediaLayout,
  },
  methods: {
    /**
     * Sets the number and color of the active tab
     *
     * @param num Tab Number
     */
    setTab(num) {
      this.$store.commit("SAVE_TAB", num);
      this.tab = num;

      switch (num) {
        case 0:
          this.tabColor = "info";
          break;
        case 1:
          this.tabColor = "success";
          this.visitedTabs.profile = true;
          break;
        case 2:
          this.tabColor = "accent";
          this.visitedTabs.words = true;
          break;
        case 3:
          this.tabColor = "warning";
          this.visitedTabs.links = true;
          break;
        case 4:
          this.tabColor = "purple";
          this.visitedTabs.images = true;
          break;
        case 5:
          this.tabColor = "blue-grey darken-1";
          break;
      }
    },
    /**
     * Gets the value of the media badge
     */
    getMediaBadge() {
      if (this.tweet.extended_entities != undefined) {
        return this.tweet.extended_entities.media.length;
      } else {
        return "";
      }
    },
    /**
     * Gets the value of the links badge
     */
    getLinksBadge() {
      if (this.tweet.entities != undefined) {
        return this.tweet.entities.urls.length;
      } else {
        return "";
      }
    },
    /**
     * Sets the loading status
     * 
     * @param Event Loading Status
     */
    setLoading(event) {
      this.isLoading = event;
      console.log(this.isLoading);
    }
  },
  computed: {
    /**
     * Tweet object
     */
    tweet() {
      return this.$store.state.tweet;
    },
  },
  created() {
    //Set loading variable, load VueX states
    this.isLoading = true;
    this.$store.dispatch("loadRawTweet", this.$route.params.id);
    this.$store.dispatch("loadTweet", this.$route.params.id);
    this.$store.dispatch("loadTwitterTrendsUS");
    this.$store.dispatch("loadTwitterTrendsUK");
    this.isLoading = false;
  },
};
</script>

<style scoped>
.tab-item-wrapper {
  margin-top: 100px;
  margin-bottom: 100px;
}
</style>