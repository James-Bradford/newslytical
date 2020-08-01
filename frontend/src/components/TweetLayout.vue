<template lang="pug">
v-container(fill-height='')

  // Tweet Card Start
  v-row(align='center' justify='center')
    v-col(cols='12' md='8')
      tweet-card(v-if="this.$store.state.tweet")

    v-col(cols='12' md='4')
      v-card.pa-1.rounded-0(color="accent")
        v-card-title.py-4.white--text
          v-icon.pr-2(color="white") mdi-comment-question
          | About Newslytical
        v-card-text.pa-1.white--text
          v-expansion-panels.rounded-0
            v-expansion-panel.rounded-0(key="1")
              v-expansion-panel-header
                | What is Newslytical?
              v-expansion-panel-content
                | Newslytical aims to provide some context to a Tweet to help you make an informed decision on whether to trust the information it presents.
            v-expansion-panel.rounded-0(key="2")
              v-expansion-panel-header
                | Checklists
              v-expansion-panel-content
                | Each section contains a checklist to make sure you don't miss anything. It will tick off after you open each information panel.  It's important to tick off ever section to ensure you have received all of the context.
            v-expansion-panel.rounded-0(key="3")
              v-expansion-panel-header
                | Feedback Survey
              v-expansion-panel-content
                | Once you have visited every section, a survey will appear to collect information about your experience. This will help us to improve our website.

</template>

<script>
import { Twitter } from "../services/Twitter";

import TweetCard from "./TweetCard";

var twitter = new Twitter();

export default {
  name: "TweetLayout",
  components: {
    TweetCard,
  },
  data() {
    return {
      showFilters: false,
    };
  },
}
</script>

<style>
/* -- Highlighting CSS Rules -- */
.highlightURL {
  background-color: var(--v-warning-lighten1);
  color: #ffffff;
}
.highlightURL:hover {
  background-color: var(--v-warning-lighten2);
  cursor: default;
}
.highlightHashtag {
  background-color: var(--v-accent-lighten1);
  color: #ffffff;
}
.highlightHashtag:hover {
  background-color: var(--v-accent-lighten2);
  cursor: default;
}

/* -- Layout Components -- */
#tweet-card {
  background-color: var(--v-secondary-base);
}

/* -- Buttons -- */
.btn-light {
  color: white!important
}
</style>