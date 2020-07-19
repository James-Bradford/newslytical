/**
 * Summary. Background Functions
 * Description. Provides the background functions for the Chrome Extension
 * 
 * @author James Bradford
 * @version 1.0
 */


chrome.tabs.onUpdated.addListener(

    /**
     * If the tab has changed, perform isTweet()
     * 
     * @param {*} tabId ID of Current Tab
     * @param {*} changeInfo Info from Changed Tab
     * @param {*} tab Specific Tab
     */
    function (tabId, changeInfo, tab) {
        if (changeInfo.url) { isTweet() }
    });


chrome.tabs.onActiveChanged.addListener(

    /**
     * If the tab has changed, perform isTweet()
     * 
     * @param {*} tabId ID of Current Tab
     * @param {*} changeInfo Info from Changed Tab
     * @param {*} tab Specific Tab
     */
    function (tabId, changeInfo, tab) {
        isTweet()
    });


/**
 * If current tab contains a tweet, pass message to popup.js
 */
function isTweet() {

    //Get Active Tab URL
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        url = activeTab.url;


        if (/^(https|http)?:?\/?\/?twitter.com\/.*\/status\/\d*$/.test(url)) {
            chrome.browserAction.setBadgeText({ text: "1" });
            myRegexp = /^(https|http)?:?\/?\/?twitter.com\/.*\/status\/(\d*)$/;
            match = myRegexp.exec(url);
            tweetID = (match[2]);

            chrome.runtime.onConnect.addListener(function (port) {
                port.postMessage({ greeting: "tweet", id: tweetID });
            });

        } else {
            chrome.browserAction.setBadgeText({ text: "" });
            chrome.runtime.onConnect.addListener(function (port) {
                port.postMessage({ greeting: "no" });
            });
        }
    });


}
