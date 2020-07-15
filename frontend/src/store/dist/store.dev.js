"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _Api = _interopRequireDefault(require("../services/Api"));

var _psl = _interopRequireDefault(require("psl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var store = new _vuex["default"].Store({
  state: {
    rawTweet: {},
    tweet: {},
    twitterTrendsUS: [],
    twitterTrendsUK: [],
    whois: null,
    tab: Number
  },
  mutations: {
    SAVE_RAW_TWEET: function SAVE_RAW_TWEET(state, rawTweet) {
      state.rawTweet = rawTweet;
    },
    SAVE_TWEET: function SAVE_TWEET(state, tweet) {
      state.tweet = tweet;
    },
    SAVE_TWITTER_TRENDS_US: function SAVE_TWITTER_TRENDS_US(state, twitterTrendsUS) {
      state.twitterTrendsUS = twitterTrendsUS;
    },
    SAVE_TWITTER_TRENDS_UK: function SAVE_TWITTER_TRENDS_UK(state, twitterTrendsUK) {
      state.twitterTrendsUK = twitterTrendsUK;
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
      var commit = _ref.commit;
      var self = this; //Make API call

      _Api["default"].get("twitter/tweet/".concat(id)).then(function (result) {
        self.commit('SAVE_RAW_TWEET', result.data); //Throw error if needed
      })["catch"](function (error) {
        throw new Error("API ERROR");
      });
    },

    /**
     * Call API to load Tweet and highlight
     * @param {*} param0 
     * @param {*} id 
     */
    loadTweet: function loadTweet(_ref2, id) {
      var commit = _ref2.commit,
          state = _ref2.state;
      var self = this;
      var tweet = {};
      var urls = [];
      var whois = []; //Make API call

      _Api["default"].get("twitter/tweet/".concat(id)).then(function (result) {
        //Set variables
        tweet = result.data;
        urls = tweet.entities.urls;
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
      }); //Performs whois on each hostname in Tweet


      for (var i = 0; i < urls.length; i++) {
        var hostname; //find & remove protocol (http, ftp, etc.) and get hostname

        if (url.indexOf("//") > -1) {
          hostname = url.split("/")[2];
        } else {
          hostname = url.split("/")[0];
        } //find & remove port number


        hostname = hostname.split(":")[0]; //find & remove "?"

        hostname = hostname.split("?")[0]; //Extract hostname

        var url = _psl["default"].get(hostname); //Make API call


        _Api["default"].get("whois/".concat(url)).then(function (result) {
          //Add result to array
          whois.push(result.data);
        })["catch"](function (error) {
          throw new Error("API ERROR");
        });
      } //Assign local variable


      this.commit('SAVE_WHOIS', whois);
    },
    loadTwitterTrendsUK: function loadTwitterTrendsUK() {
      var self = this;

      _Api["default"].get("twitter/trends/44418").then(function (result) {
        self.commit('SAVE_TWITTER_TRENDS_UK', result.data);
      })["catch"](function (error) {
        throw new Error("API ERROR");
      });
    },
    loadTwitterTrendsUS: function loadTwitterTrendsUS() {
      var self = this;

      _Api["default"].get("twitter/trends/2459115").then(function (result) {
        self.commit('SAVE_TWITTER_TRENDS_US', result.data);
      })["catch"](function (error) {
        throw new Error("API ERROR");
      });
    },
    setTab: function setTab(_ref3, tab) {
      var commit = _ref3.commit;
      this.commit('SAVE_TAB', tab);
    }
  }
});
exports.store = store;
//# sourceMappingURL=store.dev.js.map
