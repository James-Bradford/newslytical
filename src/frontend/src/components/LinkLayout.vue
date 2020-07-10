<template lang="pug">
  v-container.fill-height
    v-row(cols='12' md='4' justify='center' align='center')
      link-card(:urls='urls')
</template>

<script>
import LinkCard from './LinkCard';
import { Whois } from '../services/Whois';

var whois = new Whois();

export default {
  name: "Link",
  components: {
    LinkCard
  },
  props: {
    tweet: Object,
    urls: []
  },
  methods: {
    async fetch(url) {
      const { data } = await whois.lookup(url);
    },
    created() {
      for(let i = 0; i < this.tweet.entities.urls.length; i++) {
        this.urls.push(this.fetch(this.tweet.entities.urls[i]))
      }
      console.log(this.urls);
    }
  }
}
</script>

<style>

</style>