
var logger = require("./logger.js");
var Tweeter = require("./autotweet.js");


//
// Start
//

// Start loop...Kill process with enter
process.stdin.setEncoding("utf8");
process.stdin.on("data", function () {
  logger.write("Enter was pressed. Closing script...");
  process.exit();
});
logger.write("Starting infinite loop. Press Enter to stop.");

// Load tweets that we have tweeted, so we dont tweet them again.
Tweeter.loadTweets();
Tweeter.sendTweet(); // Start initial tweet.

var interval = 20; // in seconds, probably should be 1 hour, so we tweet 24 times a day... maybe make this random aswell..?
setInterval( function() { Tweeter.sendTweet(); }, interval * 1000);

//
// Create An Array contains method for ease.
//
Array.prototype.contains = function(obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) { return true; }
  }
  return false;
};