<template lang="pug">

    v-container.px-lg-16.fill-height
        v-row.px-lg-16.fill-height(justify='center' align='center' v-if="tweet.extended_entities")
            v-col(cols='12' md='5')

                //Carousel Card
                v-card.pa-1(color="purple")
                    v-card-title.white--text.text-h5 
                        v-icon(color="white") mdi-image
                        | Images
                
                    v-carousel(height="100%" hide-delimiter-background='' show-arrows-on-hover='')
                        media-carousel(v-for="media, m in tweet.extended_entities.media" :media="media" :key="m")

            v-col(cols='12' md='7')
              info-steps(color="purple" :steps="steps")


        v-row.fill-height(justify='center' align='center' v-else)
            |This Tweet has no images to display.

</template>

<script>
import MediaCarousel from "./MediaCarousel";
import InfoSteps from "./InfoSteps";

export default {
  name: "MediaLayout",
  computed: {
    //Tweet object returned from VueX state
    tweet() {
      return this.$store.state.tweet;
    }
  },
  components: {
    MediaCarousel,
    InfoSteps
  },
  data() {
    return {
      steps: [
        {
          icon: "mdi-image-search-outline",
          subtitle: "Reverse Image Search",
          description:
            "In some cases, misinformation can take the form of edited images. Images can be taken out of context causing people to misunderstand the meaning behind it.  A reverse image search will lookup similar images on the internet so that you can better understand the origin.</br></br><blockquote>Manipulation of images has become an increasingly common occurrence with the advent of digital photos, power- ful image manipulation software, and knowledge of techniques. Effects may range from simple to complex. Simple adjustments can include increasing color saturation and removing minor elements. More-invasive changes can include removing or inserting a person into an image.</blockquote>"
        }
      ]
    };
  }
};
</script>

<style>
</style>