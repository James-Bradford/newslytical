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
export default {
  name: "InfoSteps",
  props: {
      color: String,
      steps: []
  },
};
</script>

<style>
quote {
  border-left: 3px solid grey;
  padding: 5px;
  font-style: italic;
  quotes: '"' '"';
}
quote:before {
  content: open-quote;
}

quote:after {
  content: close-quote;
}
</style>