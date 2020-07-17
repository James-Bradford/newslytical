<template lang="pug">
  v-card(color='accent')
    v-card-title
        v-icon(large='' left='' color='white') mdi-trending-up
        span.title.font-weight-light.white--text Twitter Trends
    v-card-text
        trends-info(@trend-select="$emit('trend-select', $event)")
        
      
</template>

<script>
import TrendsInfo from '../components/TrendsInfo';

export default {
    name: 'TrendsOther',
    components: {
        TrendsInfo
    },



}
</script>

<style>

</style>