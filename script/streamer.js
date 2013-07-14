var twitter   = require('../lib/twitter_client')
  , streamer  = require('../lib/twitter_streamer')
  ;

streamer.start(console.log);
