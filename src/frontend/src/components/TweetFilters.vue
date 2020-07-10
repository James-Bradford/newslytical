<template lang="pug">
  v-sheet.text-center(height='120px')
    .py-3.pt-6
      .text-h9 Filter Highlighting
      v-chip.ma-2(:color='urlColor' @click="toggleFilter('url')") Links
      v-chip.ma-2(:color='hashtagColor' @click="toggleFilter('hashtag')") Hashtags
</template>

<script>
export default {
  name: "TweetFilters",
  data() {
    return {
      urlColor: "accent",
      hashtagColor: "warning"
    };
  },
  props: {
    showFilters: Boolean
  },
  computed: {
    filters() {
      return this.$store.state.filters;
    }
  },
  methods: {
    toggleFilter(filter) {
      this.$store.dispatch('toggleFilter', filter);
    }
  },
  updated() {
    if (this.filters.url == true) {
      this.urlColor = "white";
    } else {
      this.urlColor = "accent";
    }
  }
};
</script>

<style>
</style>