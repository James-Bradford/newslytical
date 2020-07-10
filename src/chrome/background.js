

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url) { isTweet() }
});

chrome.tabs.onActiveChanged.addListener(function (tabId, changeInfo, tab) {
    isTweet()
});


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

/* chrome.browserAction.setBadgeText({
    text:""
});  */