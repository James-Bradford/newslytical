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
    isLoading: false,
    tab: 0
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
    TOGGLE_IS_LOADING: function TOGGLE_IS_LOADING(state) {
      state.isLoading = !state.isLoading;
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

      //Make API call
      _Api["default"].get("twitter/tweet/".concat(id)).then(function (result) {
        commit('SAVE_RAW_TWEET', result.data); //Throw error if needed
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
      var commit, dispatch;
      return regeneratorRuntime.async(function loadTweet$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref2.commit, dispatch = _ref2.dispatch;
              _context.next = 3;
              return regeneratorRuntime.awrap(_Api["default"].get("twitter/tweet/".concat(id)).then(function (result) {
                commit('SAVE_TWEET', result.data); //Throw error if needed
              }).then(function () {
                dispatch('loadWhois');
              })["catch"](function (error) {
                throw new Error("API ERROR");
              }));

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    loadWhois: function loadWhois(_ref3) {
      var commit, state, urls, whois, i, url, hostname, extractedUrl;
      return regeneratorRuntime.async(function loadWhois$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref3.commit, state = _ref3.state;
              urls = state.tweet.entities.urls;
              whois = []; //Performs whois on each hostname in Tweet

              i = 0;

            case 4:
              if (!(i < urls.length)) {
                _context2.next = 15;
                break;
              }

              url = urls[i].expanded_url;

              //find & remove protocol (http, ftp, etc.) and get hostname
              if (url.indexOf("//") > -1) {
                hostname = url.split("/")[2];
              } else {
                hostname = url.split("/")[0];
              } //find & remove port number


              hostname = hostname.split(":")[0]; //find & remove "?"

              hostname = hostname.split("?")[0]; //Extract hostname

              extractedUrl = _psl["default"].get(hostname); //Make API call

              _context2.next = 12;
              return regeneratorRuntime.awrap(_Api["default"].get("whois/".concat(extractedUrl)).then(function (result) {
                //Add result to array
                whois.push(result.data);
              })["catch"](function (error) {
                throw new Error("API ERROR");
              }));

            case 12:
              i++;
              _context2.next = 4;
              break;

            case 15:
              //Assign local variable
              commit('SAVE_WHOIS', whois);

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    setTab: function setTab(_ref4, tab) {
      var commit = _ref4.commit;
      this.commit('SAVE_TAB', tab);
    }
  }
});
exports.store = store;
//# sourceMappingURL=store.dev.js.map
