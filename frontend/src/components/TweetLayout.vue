<template lang="pug">
v-container(fill-height='')

  // Tweet Card Start
  v-row(align='center' justify='center')
    v-col(cols='12' md='8')
      tweet-card(v-if="this.$store.state.tweet")

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