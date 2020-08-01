<template lang="pug">

//Container
v-container.px-lg-16.fill-height
  v-row.px-lg-16(justify="center", align="center")

    //Left Column
    v-col(cols="12", md="8")
      link-whois(v-if="tweet")
      info-steps(
        color="warning",
        :steps="panels",
        @panel-clicked="panelClicked($event)"
      )
    
    //Right Column
    v-col(cols="12", md="4")
      explanation-panel(:color="'warning'", :steps="steps")

</template>

<script>
//Import Components
import LinkWhois from "./LinkWhois";
import InfoSteps from "./InfoSteps";
import ExplanationPanel from "./ExplanationPanel";

/**
 * Layout structure for the links section
 */
export default {
  name: "LinkLayout",
  components: {
    LinkWhois,
    InfoSteps,
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
    },
  },
  data() {
    return {
      panels: [
        {
          icon: "mdi-lock",
          subtitle: "HTTPS Encryption",
          description:
            "HTTPS encryption is usually but not always an indicator of a legitimate website.  It keeps the data exchanged with the website secure and ensures that it cannot be intercepted.  Be aware however that anyone can make their websites HTTPS encrypted using a free service like Cloudflare.  This means malicious sites may also utilise this kind of encryption.</br></br><blockquote>Hypertext transfer protocol secure (HTTPS) is the secure version of HTTP, which is the primary protocol used to send data between a web browser and a website. HTTPS is encrypted in order to increase security of data transfer.</blockquote></br><div class='reference'>Cloudflare. What is HTTPS?. Available: https://www.cloudflare.com/learning/ssl/what-is-https. Last accessed 18th Jul 2020.</div>",
        },
        {
          icon: "mdi-clipboard-account-outline",
          subtitle: "Registrant Information",
          description:
            "Sometimes websites are created to mimic popular media outlets or other companies.  This is often to try and gain revenue from traffic to their website.  The Whois data will show what company originally registered the domain and in which country.  Although this is not available for all domains due to data protection, it's important to check if the registering company is consistent with the company the website claims to be.",
        },
        {
          icon: "mdi-calendar",
          subtitle: "Created Date",
          description:
            "A study revealed that people considered to be extraverts and agreeable are more likely to share real news.  People that post more actively on Twitter may be more extraverted and therefore may share content that is more trustworthy. </br></br><blockquote>1) The users in U(f) generally publish fewer posts that users in U(r), which indicates those users trusting more real news are more likely to be active and express themselves; 2) The users in U (f ) tends to express more “favor” actions to tweets posted by other users, indicating their willingness to reach out to other users.</blockquote>",
        },
      ],
      /**
       * Steps shown in checklist
       */
      steps: [
        {
          id: 1,
          title: "HTTPS Encryption",
          summary: "",
          completed: false,
        },
        {
          id: 2,
          title: "Registrant Information",
          summary: "",
          completed: false,
        },
        {
          id: 3,
          title: "Created Date",
          summary: "",
          completed: false,
        },
      ],
    };
  },
  computed: {
    tweet() {
      return this.$store.state.tweet;
    },
  },
};
</script>

<style>
</style>