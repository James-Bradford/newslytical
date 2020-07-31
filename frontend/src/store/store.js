import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../services/Api'
import psl from "psl";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        rawTweet: {},
        tweet: {},
        twitterTrendsUS: [],
        twitterTrendsUK: [],
        whois: null,
        isLoading: false,
        tab: 0
    },
    mutations: {
        SAVE_RAW_TWEET(state, rawTweet) {
            state.rawTweet = rawTweet;
        },
        SAVE_TWEET(state, tweet) {
            state.tweet = tweet;
        },
        SAVE_TWITTER_TRENDS_US(state, twitterTrendsUS) {
            state.twitterTrendsUS = twitterTrendsUS;
        },
        SAVE_TWITTER_TRENDS_UK(state, twitterTrendsUK) {
            state.twitterTrendsUK = twitterTrendsUK;
        },
        SAVE_WHOIS(state, whois) {
            state.whois = whois;
        },
        TOGGLE_IS_LOADING(state) {
            state.isLoading = !state.isLoading;
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
        loadRawTweet({ commit }, id) {

            //Make API call
            Api.get(`twitter/tweet/${id}`)
                .then(function (result) {

                    commit('SAVE_RAW_TWEET', result.data)

                    //Throw error if needed
                }).catch(error => {
                    throw new Error("API ERROR");
                });
        },
        /**
         * Call API to load Tweet and highlight
         * @param {*} param0 
         * @param {*} id 
         */
        async loadTweet({ commit, dispatch }, id) {

            //Assign modified tweet to state
            await Api.get(`twitter/tweet/${id}`)
                .then(function (result) {
                    commit('SAVE_TWEET', result.data);
                    //Throw error if needed
                }).then(function () {
                    dispatch('loadWhois');
                }).catch(error => {
                    throw new Error("API ERROR");
                });


        },
        async loadWhois({ commit, state }) {


            var urls = state.tweet.entities.urls;
            var whois = [];

            //Performs whois on each hostname in Tweet
            for (let i = 0; i < urls.length; i++) {

                var url = urls[i].expanded_url;
                var hostname;
                //find & remove protocol (http, ftp, etc.) and get hostname

                if (url.indexOf("//") > -1) {
                    hostname = url.split("/")[2];
                } else {
                    hostname = url.split("/")[0];
                }

                //find & remove port number
                hostname = hostname.split(":")[0];
                //find & remove "?"
                hostname = hostname.split("?")[0];

                //Extract hostname
                var extractedUrl = psl.get(hostname);

                //Make API call
                await Api.get(`whois/${extractedUrl}`)
                    .then(function (result) {

                        //Add result to array
                        whois.push(result.data);
                    })
                    .catch(error => {
                        throw new Error("API ERROR");
                    });
            }

            //Assign local variable
            commit('SAVE_WHOIS', whois);
        },
        setTab({ commit }, tab) {
            this.commit('SAVE_TAB', tab);
        }
    }
});