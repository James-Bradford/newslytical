<template lang="pug">
    v-container.px-lg-16.fill-height
      v-row.px-lg-16.fill-height(justify='center' align='center')
        v-col(cols='12' md='5')
          trends-words(@trend-select="selectTrend($event)")
          trends-other.mt-2(:related-topics="relatedTopics")
        v-col(cols='12' md='7')
          div.text-body.font-weight-regular.text-justify 
            | Trending topics can be a big source of misinformation.
            | If the Tweet you are reading contains trending topics, it's important to do your own research before believing its contents.
            | By selecting one of the trending keywords, you will see some other topics with similar keywords from Google Trends.
            | Doing background research on related topics will help you gain understanding of the bigger picture.
</template>

<script>
import TrendsWords from "./TrendsWords";
import TrendsOther from "./TrendsOther";
import Api from "../services/Api";

export default {
  name: "WordsLayout",
  data() {
    return {
      relatedTopics: []
    };
  },
  methods: {
    selectTrend(e) {
      var self = this;
      console.log(e);
      Api.get(`trends/related/${e}`)
        .then(function(result) {
          self.relatedTopics = result.data;
        })
        .catch(e => {
    console.log(e);
});
    }
  },
  components: {
    TrendsWords,
    TrendsOther
  }
};
</script>

<style>
</style>