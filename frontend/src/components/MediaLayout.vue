<template lang="pug">
    v-container.px-lg-16.fill-height
      v-row.px-lg-16.fill-height(justify='center' align='center')
        v-col(cols='12' md='5')

</template>

<script>
export default {
  name: "MediaLayout",
  computed: {

    //Tweet object returned from VueX state
    tweet() {
      return this.$store.state.tweet;
    }
    
  }
};
</script>

<style>
</style>