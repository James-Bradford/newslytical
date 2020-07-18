<template lang="pug">

  v-container.px-lg-16.fill-height
    v-row.px-lg-16(justify='center' align='center')
      v-col(cols='12' md='5')
        link-whois(v-if="tweet")
      v-col(cols='12' md='7')
        info-steps(color="warning" :steps="steps")

</template>

<script>
import LinkWhois from "./LinkWhois";
import LinkCard from "./LinkCard";
import InfoSteps from "./InfoSteps";


export default {
  name: "LinkLayout",
  components: {
    LinkWhois,
    InfoSteps
  },
  data() {
    return {
      steps: [
        {
          icon: "mdi-lock",
          subtitle: "HTTPS Encryption",
          description:
            "Some accounts will attempt to deceive users by impersonating a legitimate news account.  Check the website of the company or person this account claims to represent to see if it matches their official screen name."
        },
        {
          icon: "mdi-clipboard-account-outline",
          subtitle: "Registrant Information",
          description:
            "Research has shown accounts with a higher follower count are more likely to share real news. Their popularity with followers is an indicator of the trustworthiness of their content.</br></br><blockquote>1) U (f ) includes more users that with TFF < 1, indicating less followers than followings; 2) U(r) consistently has more users with T F F > 1, indicating users trust real news are more likely to be more popular.</blockquote>"
        },
        {
          icon: "mdi-send",
          subtitle: "Posts",
          description:
            "A study revealed that people considered to be extraverts and agreeable are more likely to share real news.  People that post more actively on Twitter may be more extraverted and therefore may share content that is more trustworthy. </br></br><blockquote>1) The users in U(f) generally publish fewer posts that users in U(r), which indicates those users trusting more real news are more likely to be active and express themselves; 2) The users in U (f ) tends to express more “favor” actions to tweets posted by other users, indicating their willingness to reach out to other users.</blockquote>"
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
  computed: {
    tweet() {
      return this.$store.state.tweet;
    }
  }
};
</script>

<style>
</style>