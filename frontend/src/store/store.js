import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../services/Api'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        rawTweet: {},
        tweet: {},
        twitterTrendsUS: {},
        twitterTrendsUK: {},
        whois: [],
        tab: Number
    },
    mutations: {
        SAVE_RAW_TWEET(state, rawTweet) {
            state.rawTweet = rawTweet;
        },
        SAVE_TWEET(state, tweet) {
            state.tweet = tweet;
        },
        SAVE_TWITTER_TRENDS_US(state, twitterTrends) {
            state.twitterTrendsUS = twitterTrends;
        },
        SAVE_TWITTER_TRENDS_UK(state, twitterTrends) {
            state.twitterTrendsUK = twitterTrends;
        },
        SAVE_WHOIS(state, whois) {
            state.whois = whois;
        },
        SAVE_TAB(state, tab) {
            state.tab = tab;
        }
    },
    actions: {
        /**
        * Call API to load Tweet and highlight
        * @param {*} param0 
        * @param {*} id 
        */
        loadRawTweet({commit}, id) {
            var self = this;

            //Make API call
            Api.get(`twitter/tweet/${id}`)
                .then(function (result) {

                    self.commit('SAVE_RAW_TWEET', result.data)

                    //Throw error if needed
                }).catch(error => {
                    throw new Error("API ERROR");
                });
        },
        /**
         * Call API to load Tweet and highlight
         * 
         * @param {*} id 
         */
        loadTweet({commit}, id) {
            var self = this;

            //Make API call
            Api.get(`twitter/tweet/${id}`)
                .then(function (result) {
                    //Set variables
                    var tweet = result.data;
                    const urls = tweet.entities.urls;
                    const hashtags = tweet.entities.hashtags;

                    //For each URL, replace it with highlighted version
                    for (let i in urls) {
                        tweet.full_text = tweet.full_text.replace(urls[i].url, `<span class="highlightURL">${urls[i].expanded_url}</span>`);
                    }

                    //For each hashtag, replace it with highlighted version
                    for (let i in hashtags) {
                        tweet.full_text = tweet.full_text.replace("#" + hashtags[i].text, `<span class="highlightHashtag">#${hashtags[i].text}</span>`)
                    }

                    //Assign modified tweet to state
                    self.commit('SAVE_TWEET', tweet)

                    //Throw error if needed
                }).catch(error => {
                    throw new Error("API ERROR");
                });
        },
        /**
         * Call API to get Trends for US and UK
         */
        loadTwitterTrends({commit}) {
            var self = this;

            // US Trends
            Api.get(`twitter/trends/2459115`)
                .then(function (result) {
                    self.commit('SAVE_TWITTER_TRENDS_US')
                }).catch(error => {
                    throw new Error("API ERROR");
                });

            // UK Trends
            Api.get(`twitter/trends/44418`)
                .then(function (result) {
                    self.commit('SAVE_TWITTER_TENDS_UK')
                }).catch(error => {
                    throw new Error("API ERROR");
                });
        },
        /**
         * Sets the tab to a specific value
         * @param {*} tab 
         */
        setTab(tab) {
            this.commit('SAVE_TAB', tab);
        }
    }
});