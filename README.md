# Twitter Bot

- First check to see what subreddits aren't around on twitter!
- Maybe mensfashion? relationship advice? Parse top links?

## Links
- http://videlais.com/2014/12/16/creating-a-basic-twitter-bot-in-node-js/
- http://www.bryanbraun.com/2014/12/13/how-to-set-up-a-simple-javascript-twitter-bot
- http://www.apcoder.com/2013/10/03/twitter-bot-20-minutes-node-js/
- http://www.apcoder.com/2013/10/15/targeted-twitter-bots-next-20-minutes/
- http://geektechlive.com/2014/01/create-your-very-own-twitter-bot-that-runs-on-node-js/
- https://blog.benjojo.co.uk/post/2014-01-19-super-easy-twitter-bots.md
- https://dev.twitter.com/rest/public/rate-limiting


## Project flow

```
- Runs on a server
- Polls a subreddit every minute
-   Iterate through posts sorted by top voted / day
-   Take the first one.
-   If it has over 500 upvotes
-     Andalso if we haven't tweeted it before
-   Then
-     Scrape the caption and download the image.
-     Save the PostURL
-     Tweet the photo and the caption
-   End If
- Sleep
```
