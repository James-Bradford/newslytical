<template lang="pug">
    div.text-body.font-weight-regular.text-justify 
        | A whois lookup tells us information about the origin of a link. This is done by taking the first part of the URL known as the hostname and looking it up in the registries. 
        | HTTPS encryption prevents data to and from a website being intercepted and tampered with.  This is important for websites like online banking where sensitive information is exchanged       .
        | Sometimes fake news websites will be created with similar hostnames to legitimate news sites.  Look at the registrant and country.  Are these consistent with the company the site claims to be associated with?
        | Look at the creation date of the hostname.  Although not always the case, older hostnames are more likely to be trustworthy.
      
</template>

<script>
export default {
    name: 'LinkCard',
    data() {
        return {
            explanation: "A whois lookup tells us information about the origin of a link. This is done by taking the first part of the URL known as the hostname and looking it up in the registries.  HTTPS encryption prevents your data to a website being intercepted and tampered with."
        }
    }
}
</script>

<style>

</style>