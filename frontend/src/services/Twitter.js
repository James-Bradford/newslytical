import Api from "./Api";

/**
 * Contains the required methods to access information about a Tweet
 */
export class Twitter {
    

    constructor(tweetID) {
        this.tweetID = tweetID;
    }

    /**
     * Get a Tweet object of a specific ID
     * @returns Object Tweet object
     */
    getTweet() {
        return Api.get(`/twitter/${this.tweetID}`);
    }

    /**
     * Adds a <span> tag around sections in a tweet
     * @param {*} tweet Tweet object
     */
    highlight(tweet, filters) {
        var tweetText = tweet.full_text;

        //Check options to see which highlight options are enabled
                    if (filters.url == true) {
                        const urls = tweet.entities.urls;

                        //Swap the urls with highlighted versions
                        for (let i in urls) {
                            tweetText = tweetText.replace(urls[i].url, "<v-btn class='highlightURL' v-on:click.native='$emit('tabChange', 1)'>" + urls[i].expanded_url + "</v-btn>");
                        }
                    }

                    if (filters.hashtag == true) {
                        const hashtags = tweet.entities.hashtags;

                        for (let i in hashtags) {
                            tweetText = tweetText.replace("#" + hashtags[i].text, `<button class='highlightHashtag' v-on:click.native="$emit('tabChange', 2)">#${hashtags[i].text}</button>`)
                        }
                    }
                    return tweetText;

            
        }
        
        

}
