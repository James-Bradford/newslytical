<template lang="pug">
    v-container.px-lg-16.fill-height
      v-row.px-lg-16(justify='center' align='center')
        v-col(cols='12' md='5')
          words-trends
        v-col(cols='12' md='7')
        //link-card
</template>

<script>
import WordsTrends from './WordsTrends';

export default {
    name: 'WordsLayout',
    components: {
      WordsTrends
    }
}
</script>

<style>

</style>