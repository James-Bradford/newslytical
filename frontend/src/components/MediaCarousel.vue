<template lang="pug">
        v-carousel-item
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