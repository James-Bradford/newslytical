"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Twitter = void 0;

var _Api = _interopRequireDefault(require("./Api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Contains the required methods to access information about a Tweet
 */
var Twitter =
/*#__PURE__*/
function () {
  function Twitter(tweetID) {
    _classCallCheck(this, Twitter);

    this.tweetID = tweetID;
  }
  /**
   * Get a Tweet object of a specific ID
   * @returns Object Tweet object
   */


  _createClass(Twitter, [{
    key: "getTweet",
    value: function getTweet() {
      return _Api["default"].get("/twitter/".concat(this.tweetID));
    }
    /**
     * Adds a <span> tag around sections in a tweet
     * @param {*} tweet Tweet object
     */

  }, {
    key: "highlight",
    value: function highlight(tweet, filters) {
      var tweetText = tweet.full_text; //Check options to see which highlight options are enabled

      if (filters.url == true) {
        var urls = tweet.entities.urls; //Swap the urls with highlighted versions

        for (var i in urls) {
          tweetText = tweetText.replace(urls[i].url, "<v-btn class='highlightURL' v-on:click.native='$emit('tabChange', 1)'>" + urls[i].expanded_url + "</v-btn>");
        }
      }

      if (filters.hashtag == true) {
        var hashtags = tweet.entities.hashtags;

        for (var _i in hashtags) {
          tweetText = tweetText.replace("#" + hashtags[_i].text, "<button class='highlightHashtag' v-on:click.native=\"$emit('tabChange', 2)\">#".concat(hashtags[_i].text, "</button>"));
        }
      }

      return tweetText;
    }
  }]);

  return Twitter;
}();

exports.Twitter = Twitter;
//# sourceMappingURL=Twitter.dev.js.map
