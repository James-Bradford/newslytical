<template lang="pug">
  v-container.px-lg-16(fill-height='')
    v-row.px-lg-16(align='center' justify='center')
      v-col(cols='12' md='6')
        profile-card(:tweet='tweet')
      v-col(cols='12' md='6')
        info-steps(color="success" :steps="steps")
</template>

<script>
import { Twitter } from "../services/Twitter";

import ProfileCard from "./ProfileCard";
import InfoSteps from "./InfoSteps";

export default {
  name: "Profile",
  components: {
    ProfileCard,
    InfoSteps
  },
  data() {
    return {
      steps: [
        {
          icon: "mdi-at",
          subtitle: "Screen Name",
          description:
            "Some accounts will attempt to deceive users by impersonating a legitimate news account.  Check the website of the company or person this account claims to represent to see if it matches their official screen name."
        },
        {
          icon: "mdi-account-multiple-outline",
          subtitle: "Followers",
          description:
            "Research has shown accounts with a higher follower count are more likely to share real news. Their popularity with followers is an indicator of the trustworthiness of their content."
        },
        {
          icon: "mdi-send",
          subtitle: "Posts",
          description:
            "A study revealed that people considered to be extraverts and agreeable are more likely to share real news.  People that post more actively on Twitter may be more extraverted and therefore may share content that is more trustworthy."
        },
        {
          icon: "mdi-account-multiple-outline",
          subtitle: "Account Age",
          description:
            "Sometimes accounts are created with the only intent of sharing misinformation.  This is particularly common during a big event such as an election where they will attempt to sway public opinion.  As a general rule, older accounts are more trustworthy."
        }
      ]
    };
  },
  props: {
    tweet: Object
  }
};
</script>

<style>
</style>