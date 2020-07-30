<template lang="pug">
div
  v-carousel-item
    v-img(:src="media.media_url" contain)
        
          
</template>

<script>
export default {
  name: "MediaCarousel",
  props: {
    media: []
  }
};
</script>

<style>
</style>