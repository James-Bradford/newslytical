<template lang="pug">

    v-container.px-lg-16.fill-height
        v-row.px-lg-16.fill-height(justify='center' align='center' v-if="tweet.extended_entities")
            v-col(cols='12' md='8')
              //Carousel Card
              v-card.pa-1.rounded-0(color="purple")
                v-card-title.white--text.text-h5 
                  v-icon(color="white") mdi-image
                  | Images
                
                v-carousel(hide-delimiter-background='' show-arrows-on-hover='' height="400" v-if="tweet.extended_entities")
                    v-card(v-for="media, m in tweet.extended_entities.media" :key="m" v-model="selectedImage")
                      v-carousel-item
                        v-img(:src="media.media_url" @load="$emit('loading', false)" contain)
                          
                //Quick Action Buttons
                v-btn-toggle.rounded-0.mt-2(dense style="width: 100%" v-if="tweet.extended_entities")
                  v-btn(color="#4285F4" target="_blank" :href="`https://www.google.com/search?tbm=isch&q=${tweet.extended_entities.media[selectedImage].media_url}`" style="width: 50%;") 
                    v-icon() mdi-google
                    | Google Images
                  v-btn(color="#008373" target="_blank" :href="`https://www.bing.com/images/search?view=detailv2&iss=sbi&form=SBIVSP&sbisrc=UrlPaste&q=imgurl:${tweet.extended_entities.media[selectedImage].media_url}`" style="width: 50%") 
                    v-icon() mdi-microsoft-bing
                    | Bing Images
              
              info-steps(color="purple" :steps="steps")


        v-row.fill-height(justify='center' align='center' v-else)
            |This Tweet has no images to display.

</template>

<script>
//Import Components
import MediaCarousel from "./MediaCarousel";
import InfoSteps from "./InfoSteps";
import TweetCard from "./TweetCard";

/**
 * Provides the layout for the media section
 */
export default {
  name: "MediaLayout",
  computed: {
    tweet() {
      return this.$store.state.tweet;
    }
  },
  components: {
    MediaCarousel,
    InfoSteps,
    TweetCard
  },
  data() {
    return {
      steps: [
        {
          icon: "mdi-image-search-outline",
          subtitle: "Reverse Image Search",
          description:
            "In some cases, misinformation can take the form of edited images. Images can be taken out of context causing people to misunderstand the meaning behind it.  A reverse image search will lookup similar images on the internet so that you can better understand the origin.</br></br><blockquote>Manipulation of images has become an increasingly common occurrence with the advent of digital photos, power- ful image manipulation software, and knowledge of techniques. Effects may range from simple to complex. Simple adjustments can include increasing color saturation and removing minor elements. More-invasive changes can include removing or inserting a person into an image.  Use the reverse image tools above to find out more information about the images.</blockquote>"
        }
      ],
      selectedImage: 0,
    };
  }
};
</script>

<style>
</style>