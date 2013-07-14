var twitter   = require('../lib/twitter_client')
  , Models    = require('../models')
  , Tweet     = Models.Tweet
  , Settings  = Models.Settings
  ;

var tags = ["#nolabulls",
            "#totc",
            "#nolacommunity",
            "#neworleanspelicans",
            "#nola",
            "#essencefest",
            "#nolacrawl",
            "#NewOrleans",
            "#whodat",
            "#nolaproblems",
            "#onlyinnola",
            "#barcampnola"
           ]

module.exports = {
  start: function (onNewTweet) {
    twitter
      .stream('statuses/filter', {locations:'-90.27,29.91,-89.97,30.04'}, function (stream) {
        stream.on('data', function (twitter_obj) {
          if (twitter_obj.entities && twitter_obj.entities.hashtags.length > 0) {
            var tweet = Tweet.build(twitter_obj);
            tweet.save(function (err) {
              if (err) return console.log(err);

              onNewTweet(tweet);
            });
          }
        });
        stream.on('error', function (err) {
          console.log(err);
        });
      });
  }
};
