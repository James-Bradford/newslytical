import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../services/Api'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        tweet: {},
        whois: [],
        tab: Number
    },
    mutations: {
        SAVE_TWEET(state, tweet) {
            state.tweet = tweet;
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
        loadTweet({ commit, state }, id) {
            var self = this;

            //Make API call
            Api.get(`twitter/${id}`)
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
        setTab({ commit }, tab) {
            this.commit('SAVE_TAB', tab);
        }
    }
});