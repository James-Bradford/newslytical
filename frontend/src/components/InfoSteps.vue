<template lang="pug">
    v-card.pa-1(:color="color")

        v-expansion-panels
            v-expansion-panel(v-for='(item,i) in steps' :key='i')
                v-expansion-panel-header 
                    div
                        v-icon.pr-2(medium) {{item.icon}}
                        | {{item.subtitle}}
                v-expansion-panel-content
                    div(v-html="item.description")        
</template>

<script>
/**
 * Expansion panel for explanations
 */
export default {
  name: "InfoSteps",
  props: {
      /**
       * Background color of the card
       */
      color: String,
      /**
       * Data to be displayed in expansion panel
       */
      steps: null
  },
};
</script>

<style>
blockquote {
  border-left: 5px solid var(--v-info-darken1);;
  padding: 5px;
  font-style: italic;
  quotes: '"' '"';
  font-size: 0.8em;
}
blockquote:before {
  content: open-quote;
}

blockquote:after {
  content: close-quote;
}
.reference {
  font-size: 0.8em;
}
</style>