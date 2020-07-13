<template lang="pug">
  v-card(color='accent')
    v-card-title
        v-icon(large='' left='' color='white') mdi-trending-up
        span.title.font-weight-light.white--text Twitter Trends
    v-card-text
        trend-info(@trend-select="$emit('trend-select', $event)")
        
      
</template>

<script>
import TrendInfo from '../components/TrendInfo';

export default {
    name: 'WordsTrends',
    components: {
        TrendInfo
    },



}
</script>

<style>

</style>