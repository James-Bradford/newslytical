<template lang="pug">
  //Page Container
  v-container.px-lg-16(fill-height='')

    v-row.px-lg-16(align='center' justify='center')

      //Left Column  
      v-col(cols='12' md='8')
        profile-card
        info-steps(color="success" :steps="panels" @panel-clicked="panelClicked($event)")

      //Right Column
      v-col(cols='12' md='4')
        explanation-panel(:color="'success'" :steps="steps")
      
</template>

<script>
//Import Components
import ProfileCard from "./ProfileCard";
import InfoSteps from "./InfoSteps";
import TweetCard from "./TweetCard";
import ExplanationPanel from "./ExplanationPanel";

/**
 * Provides layout for profile section
 */
export default {
  name: "Profile",
  components: {
    ProfileCard,
    InfoSteps,
    TweetCard,
    ExplanationPanel,
  },
  methods: {
    /**
     * Marks steps as completed when panel expanded
     * 
     * @param event Completed step
     */
    panelClicked(event) {
      this.steps[event].completed = true;
    }
  },
  data() {
    return {
      /**
       * Information shown in expansion panel
       */
      panels: [
        {
          icon: "mdi-at",
          subtitle: "Screen Name",
          description:
            "Some accounts will attempt to deceive users by impersonating a legitimate news account.  Check the website of the company or person this account claims to represent to see if it matches their official screen name.",
        },
        {
          icon: "mdi-account-multiple-outline",
          subtitle: "Followers",
          description:
            "Research has shown accounts with a higher follower count are more likely to share real news. Their popularity with followers is an indicator of the trustworthiness of their content.</br></br><blockquote>1) U (f ) includes more users that with TFF < 1, indicating less followers than followings; 2) U(r) consistently has more users with T F F > 1, indicating users trust real news are more likely to be more popular.</blockquote>",
        },
        {
          icon: "mdi-send",
          subtitle: "Posts",
          description:
            "A study revealed that people considered to be extraverts and agreeable are more likely to share real news.  People that post more actively on Twitter may be more extraverted and therefore may share content that is more trustworthy. </br></br><blockquote>1) The users in U(f) generally publish fewer posts that users in U(r), which indicates those users trusting more real news are more likely to be active and express themselves; 2) The users in U (f ) tends to express more “favor” actions to tweets posted by other users, indicating their willingness to reach out to other users.</blockquote>",
        },
        {
          icon: "mdi-account-clock",
          subtitle: "Account Age",
          description:
            "Sometimes accounts are created with the only intent of sharing misinformation.  This is particularly common during a big event such as an election where they will attempt to sway public opinion.  As a general rule, older accounts are more trustworthy.",
        },
      ],
      /**
       * Steps shown in checklist
       */
      steps: [
        {
          id: 1,
          title: "Screen Name",
          summary: "",
          completed: false
        },
        {
          id: 2,
          title: "Followers",
          summary: "",
          completed: false
        },
        {
          id: 3,
          title: "Posts",
          summary: "",
          completed: false
        }, 
        {
          id: 4,
          title: "Account Age",
          summary: "",
          completed: false
        },               
      ],
    };
  },
};
</script>

<style>
</style>