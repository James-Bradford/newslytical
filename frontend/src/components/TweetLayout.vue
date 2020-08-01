<template lang="pug">
v-container(fill-height='')

  // Tweet Card Start
  v-row(align='center' justify='center')
    v-col(cols='12' md='8')
      tweet-card(v-if="this.$store.state.tweet")

    v-col(cols='12' md='4')
      v-card.pa-1.rounded-0(color="info")
        v-card-title.py-1.white--text
          | Information
        v-card-text.white--text
          hr
          | Newslytical aims to provide some context to a Tweet to help you make an informed decision on whether to trust the information it presents.  Each section contains a checklist to make sure you don't miss anything.  Once you have visited every section, a survey will appear to collect information about your experience.  This will help us to improve our website.

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