<template lang="pug">
    v-container.px-lg-16.fill-height
      v-row.px-lg-16.fill-height(justify='center' align='center')
        v-col(cols='12' md='12')
          v-card.rounded-0(color='accent')

            //Card Header
            v-card-title
              v-icon(large='' left='' color='white') mdi-card-text-outline
              span.font-weight-light.white--text Words

            //Card Content
            words-keywords(@trend-select="selectTrend($event)")
            words-other(v-if="relatedTopics" :related-topics="relatedTopics" :topicsLoading="topicsLoading")
            info-steps(color="accent" :steps="steps")
</template>

<script>
//Import Components
import WordsKeywords from "./WordsKeywords";
import WordsOther from "./WordsOther";
import InfoSteps from "./InfoSteps";

//Import API
import Api from "../services/Api";

/**
 * Provides the layout for the words section
 */
export default {
  name: "WordsLayout",
  data() {
    return {
      relatedTopics: [],
      topicsLoading: Boolean,
      keywordSelected: Boolean,
      steps: [
        {
          icon: "mdi-format-color-text",
          subtitle: "Keywords",
          description:
            "Certain keywords in a Tweet can give you an indication of what topics it discusses.  Each keyword can be searched on various fact checking websites as well as Google.  This allows you to understand more about the topic and whether it is a common source of misinformation before drawing your own conclusion.  Additionally some similar words are shown to provide more areas for research."
        }
      ]
    };
  },
  methods: {
    /**
     * Finds related topics from Google Trends API
     *
     * @param e Keyword
     */
    selectTrend(e) {
      if (e) {
        this.keywordSelected = true;
      } else {
        this.keywordSelected = false;
      }
      var self = this;
      this.topicsLoading = true;
      Api.get(`trends/related/${e}`)
        .then(function(result) {
          self.relatedTopics = result.data.default.rankedList[0].rankedKeyword;
        })
        .catch(e => {
          console.log(e);
        });
      this.topicsLoading = false;
    }
  },
  components: {
    WordsKeywords,
    WordsOther,
    InfoSteps
  }
};
</script>

<style>
</style>