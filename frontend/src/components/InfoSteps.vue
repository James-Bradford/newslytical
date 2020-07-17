<template lang="pug">
    v-card.pa-1(:color="color")
        v-card
            div(v-for='(item, index) in this.steps' :key="index")
                v-list-item(:key='item.subtitle')
                    v-list-item-avatar
                        v-icon(large) {{item.icon}}
                    v-list-item-content
                        v-list-item-title.headline(v-html='item.subtitle')
                v-card-text {{item.description}}
                v-divider()
        
</template>

<script>
export default {
  name: "InfoSteps",
  data() {
    return {
      title: "Identifying Misleading Images",
      color: "purple",
      steps: [
        {
          icon: "mdi-image-search-outline",
          subtitle: "Reverse Image Search",
          description:
            "In some cases, misinformation can take the form of edited images. Images can be taken out of context causing people to misunderstand the meaning behind it.  A reverse image search will lookup similar images on the internet so that you can better understand the origin."
        },
      ]
    };
  },
  mounted() {
      console.log(this.steps);
  }
};
</script>

<style>
</style>