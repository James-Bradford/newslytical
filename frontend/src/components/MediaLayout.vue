<template lang="pug">

    v-container.px-lg-16.fill-height
        v-row.px-lg-16.fill-height(justify='center' align='center' v-if="tweet.extended_entities")
            v-col(cols='12' md='5')

                //Carousel Card
                v-card.pa-1(color="purple")
                    v-card-title.white--text.text-h5 
                        v-icon(color="white") mdi-image
                        |Tweet Media
                
                    v-carousel(height="100%" hide-delimiter-background='' show-arrows-on-hover='')
                        media-carousel(v-for="media, m in tweet.extended_entities.media" :media="media" :key="m")

        

                                

            v-col(cols='12' md='7')

        v-row.fill-height(justify='center' align='center' v-else)
            |This Tweet has no images to display.

</template>

<script>
import MediaCarousel from "./MediaCarousel";

export default {
  name: "MediaLayout",
  computed: {
    //Tweet object returned from VueX state
    tweet() {
      return this.$store.state.tweet;
    },
  },
  components: {
      MediaCarousel,
  }
};
</script>

<style>
</style>