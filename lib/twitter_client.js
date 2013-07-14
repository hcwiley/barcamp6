var Twitter = require('ntwitter');

var twitter = new Twitter({
    consumer_key        : process.env.TWITTER_CONSUMER_KEY
  , consumer_secret     : process.env.TWITTER_CONSUMER_SECRET
  , access_token_key    : process.env.TWITTER_ACCESS_KEY
  , access_token_secret : process.env.TWITTER_ACCESS_SECRET
});

twitter.verifyCredentials(function (err, data) {
  if (err) {
    console.log(err);
    return process.exit(1); // TODO maybe don't completely bail?
  }
  console.log("Twitter Auth Verified!");
});

module.exports = twitter;
