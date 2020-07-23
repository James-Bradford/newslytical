<template lang="pug">
    v-container.px-lg-16.fill-height
      v-row.px-lg-16.fill-height(justify='center' align='center')
        v-col(cols='12' md='12')
          v-card.rounded-0(color='accent')
            v-card-title
              v-icon(large='' left='' color='white') mdi-format-color-text
              span.title.font-weight-light.white--text Words
            trends-words(@trend-select="selectTrend($event)")
            span.title.white--text.pa-5 Quick Actions
            div(v-if="keywordSelected")
              | Got some nice topics der ;)
            div(v-else)
              | No keyword selected soz
            span.title.white--text.pa-5 Other Topics
            trends-other(v-if="relatedTopics" :related-topics="relatedTopics" :topicsLoading="topicsLoading")
            div.text-body.font-weight-regular.text-justify 
            info-steps.mt-3(color="accent" :steps="steps")
</template>

<script>
//Import Components
import TrendsWords from "./TrendsWords";
import TrendsOther from "./TrendsOther";
import InfoSteps from "./InfoSteps";

//Import API
import Api from "../services/Api";

export default {
  name: "WordsLayout",
  data() {
    return {
      relatedTopics: [],
      topicsLoading: Boolean,
      keywordSelected: Boolean,
      steps: [
        {
          icon: "mdi-lock",
          subtitle: "HTTPS Encryption",
          description:
            "<blockquote>Hypertext transfer protocol secure (HTTPS) is the secure version of HTTP, which is the primary protocol used to send data between a web browser and a website. HTTPS is encrypted in order to increase security of data transfer. This is particularly important when users transmit sensitive data, such as by logging into a bank account, email service, or health insurance provider.  Any website, especially those that require login credentials, should use HTTPS. In modern web browsers such as Chrome, websites that do not use HTTPS are marked differently than those that are. Look for a green padlock in the URL bar to signify the webpage is secure. </blockquote></br><div class='reference'>Cloudflare. What is HTTPS?. Available: https://www.cloudflare.com/learning/ssl/what-is-https. Last accessed 18th Jul 2020.</div>"
        }
      ]
    };
  },
  methods: {
    selectTrend(e) {
      if (e) {
        this.keywordSelected = true;
      } else {
        this.keywordSelected = false;
      }
      console.log(e);
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
    TrendsWords,
    TrendsOther,
    InfoSteps
  }
};
</script>

<style>
</style>