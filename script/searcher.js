/**
 * Ignore this file, experiment
 */
var twitter   = require('../lib/twitter_client')
  , Models    = require('../models')
  , Tweet     = Models.Tweet
  , Settings  = Models.Settings
  , async     = require('async')
  ;

var tags = ['#getclever', "#noew", "#noew2014"]

var search_opts = { };//count: 100 };

console.log("searching...");

module.exports = function(twitter){
  twitter.search(tags.join(' OR '), search_opts, function (err, data) {
    data.statuses.forEach(function (twitter_obj) {
      var tweet = Tweet.build(twitter_obj);
      //console.log("searcher: " + tweet);
      tweet.save();
    });
  });
}
