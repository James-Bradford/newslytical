<template lang="pug">
div
    v-carousel-item
        v-btn(fab='' dark='' small='' color="info" absolute='' right='' bottom='' :style="{top: '5%', left: '88%', transform:'translateX(-88%)', transform:'translateY(-5%)'}" :href="'https://images.google.com/searchbyimage?image_url=' + media.media_url")
          v-icon(dark='') mdi-image-search-outline
        v-img(:src="media.media_url" fluid )
          
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