<template>
  <v-sheet fill-height>
    <h1>{{ this.title }}</h1>
    <p class="text-h5">{{ this.content }}</p>
    <v-divider class="ma-2"></v-divider>
    <p class="text-body-2">“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse aliquet faucibus rutrum. Nam ut commodo purus, ut feugiat tellus. Cras fringilla dui ac nulla https://www.theonion.com get bibendum sem. Aenean et velit at lectus volutpat varius. Nam vitae mattis sem molestie.”</p>
    <p class="text-body-2"><em>Some guy, 2020</em></p>
  </v-sheet>
</template>

<script>
export default {
  name: "ProfileExplanation",
  props: ['tweet'],
  data() {
    return {
      title: "Profile",
      content: `This user account was created ${this.profileAge()} days ago.  Research shows that accounts created recently are more likely to spread misinformation.  The account has 3 followers and 2 posts. Accounts with less posts and followers are more likely to do something because this research I’m showing you.`
    };
  },
  methods: {
    profileAge() {
      var now = new Date();
      var accountCreation = new Date(this.tweet.user.created_at);
      var timeDifference = now.getTime() - accountCreation.getTime();
      return Math.round(timeDifference / (1000 * 3600 * 24));
    }
  }
};
</script>

<style>
</style>