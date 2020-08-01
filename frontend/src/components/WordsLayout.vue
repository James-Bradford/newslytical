<template lang="pug">
v-container.px-lg-16.fill-height
  v-row.px-lg-16.fill-height(justify="center", align="center")
    v-col(cols="12", md="8")
      v-card.rounded-0(color="accent")
        //Card Header
        v-card-title.white--text.text-h4
          v-icon(large="", left="", color="white") mdi-card-text-outline
          | Words

        //Card Content
        words-keywords(@trend-select="selectTrend($event)" @related-select="selectedKeyword = $event" :related-topics="relatedTopics")

        v-card-text
          span.title.white--text
            | Quick Lookup
        
          br

          //Quick Action Buttons
          v-btn-toggle(rounded dense v-if="selectedKeyword" style="width: 100%")
            v-btn(color="#222222" target="_blank" :href="`https://fullfact.org/search/?q=${selectedKeyword}`" style="width: 33%; color: white") 
              v-icon(color="white") mdi-triangle
              | FullFact
            v-btn(color="#FBD440" target="_blank" :href="`https://www.snopes.com/?s=${selectedKeyword}`" style="width: 33%") 
              v-icon() mdi-desk-lamp
              | Snopes
            v-btn(target="_blank" :href="`https://www.google.com/search?q=${selectedKeyword}`" style="width: 34%;") 
              v-img(src="../assets/google.png" height="25px" contain)

          //No keyword selected
          div(v-else)
            span.font-weight-light.white--text
              | No actions available, select a keyword to view actions.  

        //Explanation Expansion Panels
        v-card.pa-1.rounded-0(color="accent")
          v-expansion-panels
            v-expansion-panel.rounded-0(
              v-for="(item, i) in panels",
              :key="i",
              @click="panelClicked(i)"
            )
              v-expansion-panel-header 
                div
                  v-icon.pr-2(medium) {{ item.icon }}
                  | {{ item.subtitle }}
              v-expansion-panel-content
                div(v-html="item.description") 

            //Sentiment Analysis Panel
            v-expansion-panel.rounded-0(@click="panelClicked('sentiment')")
              v-expansion-panel-header 
                div
                  v-icon.pr-2(medium) mdi-sticker-emoji
                  | Sentiment Analysis
              v-expansion-panel-content
                //Sentiment Analysis Progress
                v-progress-linear(
                  v-model="progress.value",
                  :color="progress.color",
                  :backgroundColor="progress.backgroundColor",
                  v-if="progress"
                )

                div(
                  v-if="sentimentAnalysis().score >= 4 || sentimentAnalysis().score <= -4"
                ) 
                  | The sentiment analysis score for this Tweet is strongly weighted and indicates strong emotion. Research has found that text with a strong positive or negative reaction to it is more likely to include misinformation. It is also indicative of opinion rather than fact. Carrying out further research on the keywords above will help make your decision.
                div(
                  v-else-if="sentimentAnalysis().score >= 3 || sentimentAnalysis().score <= -3"
                )
                  | The sentiment analysis score for this Tweet is quite strongly weighted and indicates some emotion. Research has found that text with a strong positive or negative reaction to it is more likely to include misinformation. It is also indicative of opinion rather than fact. Carrying out further research on the keywords above will help make your decision.
                div(v-else-if="sentimentAnalysis().score == 0")
                  | The sentiment analysis score for this Tweet has shown that the Tweet balances out in terms of positive and negative language. While not always the case, this can indicate more trustworthy and factual content. Carrying out further research on the keywords above will help make your decision.
                div(v-else)
                  | The sentiment analysis score for this Tweet has a weak positive or negative emotion. This means that it might be more likely to contain trustworthy or factual content. Carrying out further research on the keywords above will help make your decision.

    v-col(cols="12", md="4")
      explanation-panel(:color="'accent'", :steps="steps")
</template>

<script>
//Import Components
import WordsKeywords from "./WordsKeywords";
import InfoSteps from "./InfoSteps";
import ExplanationPanel from "./ExplanationPanel";

//Import API
import Api from "../services/Api";

//Import NPM Packages
var Sentiment = require("sentiment");

/**
 * Provides the layout for the words section
 */
export default {
  name: "WordsLayout",
  data() {
    return {
      relatedTopics: [],
      keywordSelected: Boolean,
      panels: [
        {
          icon: "mdi-format-color-text",
          subtitle: "Keywords",
          description:
            "Certain keywords in a Tweet can give you an indication of what topics it discusses.  Each keyword can be searched on various fact checking websites as well as Google.  This allows you to understand more about the topic and whether it is a common source of misinformation before drawing your own conclusion.  Additionally some similar words are shown to provide more areas for research.",
        },
      ],
      /**
       * Steps shown in checklist
       */
      steps: [
        {
          id: 1,
          title: "Keywords",
          summary: "",
          completed: false,
        },
        {
          id: 2,
          title: "Sentiment Analysis",
          summary: "",
          completed: false,
        },
      ],
      /**
       * Progress bar attributes
       */
      progress: {
        color: null,
        backgroundColor: null,
        value: null,
      },
      /**
       * Word selected for lookup
       */
      selectedKeyword: null,
    };
  },
  methods: {
    /**
     * Finds related topics from Google Trends API
     *
     * @param e Keyword
     */
    selectTrend(e) {
      this.selectedKeyword = e;
      if (e) {
        this.keywordSelected = true;
      } else {
        this.keywordSelected = false;
      }
      var self = this;
      this.$emit('loading', true);
      Api.get(`trends/related/${e}`)
        .then(function (result) {
          self.relatedTopics = result.data.default.rankedList[0].rankedKeyword;
        }).then(function() {
          self.$emit('loading', false);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * Provides a sentiment analysis for the Tweet
     */
    sentimentAnalysis() {
      var sentiment = new Sentiment();
      var result = sentiment.analyze(this.$store.state.rawTweet.full_text);
      if (result.value == 0) {
        this.progress.color = "green";
      }
      this.progress.value = Math.abs(result.score) * 100;
      return result;
    },
    /**
     * Marks steps as completed when panel expanded
     *
     * @param event Completed step
     */
    panelClicked(event) {
      if (event == "sentiment") {
        this.steps[1].completed = true;
      } else {
      this.steps[event].completed = true;
      }
    },
  },
  components: {
    WordsKeywords,
    InfoSteps,
    ExplanationPanel,
  },
};
</script>

<style>
</style>