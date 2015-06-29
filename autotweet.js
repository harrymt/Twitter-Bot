
var request = require("request");
var fs = require("fs");
var Twit = require("twit");
var logger = require("./logger.js");
var downloader = require("./downloader.js");

var keys = {
  "consumer_secret": "tA1Tsq7NlksbFWGulOKSb4j2opNL7nigSf8WmPbwROuubhKHRJ",
  "consumer_key": "xgNTCN1HCMLyCfXEqopClhc94",
  "access_token": "3318777814-41yK93kxiGkIbgPT9HXlKrlfSS4VAFhXlgGoDVe",
  "access_token_secret": "46BCUM0y64xOxpA6WHMo697rL0ZBAUjaBi416BpMcgnsh"
};

var usedTweets = [];
var subreddit = "aww";
var limit = 50;
var url = "http://www.reddit.com/r/" + subreddit + "/top.json?limit=" + limit + "&t=day";

function saveTweet(tweet) {
  logger.write("Saving tweet " + tweet);
  fs.appendFile("./tweets.txt", tweet + "\n", function (err) {
    if (err) throw err;
    logger.write("Tweet saved");
  });
}


exports.loadTweets = function() {
  usedTweets = fs.readFileSync("./tweets.txt").toString().split("\n");
  logger.write("Loaded tweets");
  console.log(usedTweets);
};


exports.sendTweet = function() {
  logger.write("Sending tweet...");

  // Scrap data from the URL
  request(url, function(err, resp, body) {
    var JSONFeed = JSON.parse(body);
    var foundImage = "", foundTitle = "";

    // Iterate around every reddit post
    for (var post in JSONFeed.data.children) {
      if (JSONFeed.data.children[post].data === undefined) { continue; }

      var image = JSONFeed.data.children[post].data.url;
      var title = JSONFeed.data.children[post].data.title;
      var domain = JSONFeed.data.children[post].data.domain;
      var extension = image.substring(image.length - 4);

      if (domain != "i.imgur.com") { continue; } // We only like i.imgur links for now
      if (extension != "jpeg" && extension != ".png" && extension != ".jpg") { continue; } // Only allow jpeg, png or jpg

      logger.write("Processing post " + image + " " + title);

      if (!usedTweets.contains(image)) {
        // We have found a url that we havent tweeted before!
        foundImage = image; foundTitle = title;
        logger.write("Found post " + foundImage + " " + title + ", to tweet.");
        break; // Found it! Exit each
      } else {
        logger.write("Already tweeted " + image + " " + title + ", skipping.");
      }
    } //. for

    if (foundImage === "" && foundTitle === "") {
      logger.write("No more fresh i.imgur links found.");
      // Auto increase limit?
      return false; // It isnt time to tweet yet
    }

    // Download image URL.
    var filename = foundImage.substring(foundImage.lastIndexOf("/") + 1);
    downloader.download(foundImage, filename, function() {
      logger.write("Downloaded image " + foundImage);

      // Tweet the image
      TweetThis(foundTitle, foundImage, filename);

    }); // download
  });// request
};

var T = new Twit(keys);

//
// Posts a tweet, deleting the image if successful.
//
function TweetThis(tweetText, imageURL, imageLocalFilepath) {
  logger.write("Tweeting...");
  T.post("media/upload", { media: fs.readFileSync(imageLocalFilepath, { encoding: "base64" }) }, function (err, data) {
    console.log(err);
    T.post("statuses/update", { status:tweetText, media_ids: [data.media_id_string] }, function () {
      logger.write("Tweeted.");

      fs.unlink(imageLocalFilepath); // Delete image
      logger.write("Deleted image " + imageURL + ".");

      usedTweets.push(imageURL); // Add to list, so we dont tweet it again
      saveTweet(imageURL);
    }); // TPost
  }); // T post
}
