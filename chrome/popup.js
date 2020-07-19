/**
 * Summary. Popup Functions
 * Description. Provides DOM manipulation of the popup
 * 
 * @author James Bradford
 * @version 1.0
 */

//Begin connection with background.js
var port = chrome.runtime.connect({ name: "popup" });

port.onMessage.addListener(

  /**
   * Changes popup DOM depending on message received
   * 
   * @param {*} message 
   * @param {*} sender 
   */
  function (message, sender) {
    if (message.greeting === "tweet") {
      document.getElementById("detected").innerHTML = "We've detected a Tweet";
      document.getElementById("report").style.display = "block";
      document.getElementById("icon").style.color = "#1DA1F2";
      document.getElementById("id").innerHTML = message.id;
      document.getElementById("report").href = "http://localhost:8080/#/analysis/" + message.id;
    } else {
      document.getElementById("detected").innerHTML = "No Tweet detected";
      document.getElementById("report").style.display = "none";
      document.getElementById("icon").style.color = "black";
      document.getElementById("id").innerHTML = "";
    }
  });
