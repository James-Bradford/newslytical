<template lang="pug">

  v-container.px-lg-16.fill-height
    v-row.px-lg-16(justify='center' align='center')
      v-col(cols='12' md='5')
        link-whois(v-if="tweet")
      v-col(cols='12' md='7')
        info-steps(color="warning" :steps="steps")

</template>

<script>
//Import Components
import LinkWhois from "./LinkWhois";
import LinkCard from "./LinkCard";
import InfoSteps from "./InfoSteps";

/**
 * Layout structure for the links section
 */
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
          description: "<blockquote>Hypertext transfer protocol secure (HTTPS) is the secure version of HTTP, which is the primary protocol used to send data between a web browser and a website. HTTPS is encrypted in order to increase security of data transfer. This is particularly important when users transmit sensitive data, such as by logging into a bank account, email service, or health insurance provider.  Any website, especially those that require login credentials, should use HTTPS. In modern web browsers such as Chrome, websites that do not use HTTPS are marked differently than those that are. Look for a green padlock in the URL bar to signify the webpage is secure. </blockquote></br><div class='reference'>Cloudflare. What is HTTPS?. Available: https://www.cloudflare.com/learning/ssl/what-is-https. Last accessed 18th Jul 2020.</div>"
        },
        {
          icon: "mdi-clipboard-account-outline",
          subtitle: "Registrant Information",
          description: "Sometimes websites are created to mimic popular media outlets or other companies.  This is often to try and gain revenue from traffic to their website.  The Whois data will show what company originally registered the domain and in which country.  Although this is not available for all domains due to data protection, it's important to check if the registering company is consistent with the company the website claims to be."
        },
        {
          icon: "mdi-calendar",
          subtitle: "Created Date",
          description:
            "A study revealed that people considered to be extraverts and agreeable are more likely to share real news.  People that post more actively on Twitter may be more extraverted and therefore may share content that is more trustworthy. </br></br><blockquote>1) The users in U(f) generally publish fewer posts that users in U(r), which indicates those users trusting more real news are more likely to be active and express themselves; 2) The users in U (f ) tends to express more “favor” actions to tweets posted by other users, indicating their willingness to reach out to other users.</blockquote>"
        },
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