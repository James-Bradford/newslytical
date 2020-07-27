<template lang="pug">

    //Card
    v-card.rounded-0(:color="color")

        //Card Header
        v-card-title.white--text
                v-icon.pr-1(color="white") mdi-checkbox-marked-outline
                | Checklist

        v-divider.ma-2(color='white')
        div.px-4.text-body-1.white--text
            | Read each section to understand why they are important.  You can keep track of your progress here.
        v-divider.ma-2(color='white')
        
        //Card Body
        v-card-text.pa-1
            v-stepper.rounded-0
                v-stepper-step.pa-3(v-for="(step, s) in steps" :step="step.id" :complete="step.completed") 
                    | {{step.title}}
                    small
                        | {{step.summary}}

</template>

<script>
/**
 * Panel providing an explanation for each section
 */
export default {
    name: 'ExplanationPanel',
    props: {
        /**
         * Card outline color
         */
        color: String,
        /**
         * Stepper content
         */
        steps: Array
    }
}
</script>

<style>
</style>