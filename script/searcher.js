/**
 * Ignore this file, experiment
 */
var twitter   = require('../lib/twitter_client')
  , Models    = require('../models')
  , Tweet     = Models.Tweet
  , Settings  = Models.Settings
  , async     = require('async')
  ;

var tags = ['#barcampnola', '#bearcamp', '#bearcampnola', '#nolatech'];

var search_opts = { count: 100 };

Settings.fetch(function (err, settings) {
  var count  = 100
    , max_id = null;

  async.until(
    function () { count < 100 },
    function (callback) {
      if (max_id) search_opts.max_id = max_id;

      twitter.search(tags.join(' OR '), search_opts, function (err, data) {
        count = data.search_metadata.count;
        max_id = data.search_metadata.max_id;
        console.log(data.search_metadata)
        data.statuses.forEach(function (twitter_obj) {
          var tweet = Tweet.build(twitter_obj);
          tweet.save(console.log);
        });
        callback();
      });
  }, function () {
    process.exit(0);
  });
});

