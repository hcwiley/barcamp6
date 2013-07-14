var twitter   = require('../lib/twitter_client')
  , streamer  = require('../lib/twitter_streamer')
  , mongoose  = require('mongoose')
  ;

mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/barcamp6');

streamer.start(console.log);
