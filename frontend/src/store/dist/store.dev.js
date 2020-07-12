"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _Api = _interopRequireDefault(require("../services/Api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var store = new _vuex["default"].Store({
  state: {
    rawTweet: {},
    tweet: {},
    twitterTrendsUS: {},
    twitterTrendsUK: {},
    whois: [],
    tab: Number
  },
  mutations: {
    SAVE_RAW_TWEET: function SAVE_RAW_TWEET(state, rawTweet) {
      state.rawTweet = rawTweet;
    },
    SAVE_TWEET: function SAVE_TWEET(state, tweet) {
      state.tweet = tweet;
    },
    SAVE_TWITTER_TRENDS_US: function SAVE_TWITTER_TRENDS_US(state, twitterTrends) {
      state.twitterTrendsUS = twitterTrends;
    },
    SAVE_TWITTER_TRENDS_UK: function SAVE_TWITTER_TRENDS_UK(state, twitterTrends) {
      state.twitterTrendsUK = twitterTrends;
    },
    SAVE_WHOIS: function SAVE_WHOIS(state, whois) {
      state.whois = whois;
    },
    SAVE_TAB: function SAVE_TAB(state, tab) {
      state.tab = tab;
    }
  },
  actions: {
    /**
    * Call API to load Tweet and highlight
    * @param {*} param0 
    * @param {*} id 
    */
    loadRawTweet: function loadRawTweet(_ref, id) {
      var commit = _ref.commit,
          state = _ref.state;
      var self = this; //Make API call

      _Api["default"].get("twitter/".concat(id)).then(function (result) {
        self.commit('SAVE_RAW_TWEET', result.data); //Throw error if needed
      })["catch"](function (error) {
        throw new Error("API ERROR");
      });
    },

    /**
     * Call API to load Tweet and highlight
     * 
     * @param {*} id 
     */
    loadTweet: function loadTweet(id) {
      var self = this; //Make API call

      _Api["default"].get("twitter/tweet/".concat(id)).then(function (result) {
        //Set variables
        var tweet = result.data;
        var urls = tweet.entities.urls;
        var hashtags = tweet.entities.hashtags; //For each URL, replace it with highlighted version

        for (var i in urls) {
          tweet.full_text = tweet.full_text.replace(urls[i].url, "<span class=\"highlightURL\">".concat(urls[i].expanded_url, "</span>"));
        } //For each hashtag, replace it with highlighted version


        for (var _i in hashtags) {
          tweet.full_text = tweet.full_text.replace("#" + hashtags[_i].text, "<span class=\"highlightHashtag\">#".concat(hashtags[_i].text, "</span>"));
        } //Assign modified tweet to state


        self.commit('SAVE_TWEET', tweet); //Throw error if needed
      })["catch"](function (error) {
        throw new Error("API ERROR");
      });
    },

    /**
     * Call API to get Trends for US and UK
     */
    loadTwitterTrends: function loadTwitterTrends() {
      var self = this; // US Trends

      _Api["default"].get("twitter/trends/2459115").then(function (result) {
        self.commit('SAVE_TWITTER_TRENDS_US');
      })["catch"](function (error) {
        throw new Error("API ERROR");
      }); // UK Trends


      _Api["default"].get("twitter/trends/44418").then(function (result) {
        self.commit('SAVE_TWITTER_TENDS_UK');
      })["catch"](function (error) {
        throw new Error("API ERROR");
      });
    },

    /**
     * Sets the tab to a specific value
     * @param {*} tab 
     */
    setTab: function setTab(tab) {
      this.commit('SAVE_TAB', tab);
    }
  }
});
exports.store = store;
//# sourceMappingURL=store.dev.js.map
