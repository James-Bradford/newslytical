<template lang="pug">
div
  v-carousel-item
    v-img(:src="media.media_url" @load="$emit('loading', false)" contain)
        
          
</template>

<script>
/**
 * Carousel of Tweet Images
 */
export default {
  name: "MediaCarousel",
  props: {
    /**
     * Array of images to be displayed
     */
    media: []
  },
  created() {
    this.$emit('loading', true);
  }
};
</script>

<style>
</style>