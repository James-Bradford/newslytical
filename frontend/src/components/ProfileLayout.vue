<template lang="pug">
  v-container.px-lg-16(fill-height='')
    v-row.px-lg-16(align='center' justify='center')
      v-col(cols='12' md='6')
        profile-overview(:tweet='tweet')
      v-col(cols='12' md='6')
        profile-explanation(:tweet='tweet')
</template>

<script>
import { Twitter } from "../services/Twitter";

import ProfileOverview from "./ProfileCard";
import ProfileExplanation from "./ProfileReport";

export default {
  name: "Profile",
  components: {
    ProfileOverview,
    ProfileExplanation
  },
  props: {
    tweet: Object
  }
}
</script>

<style>

</style>