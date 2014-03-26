var twitter   = require('../lib/twitter_client')
  , streamer  = require('../lib/twitter_streamer')
  , mongoose  = require('mongoose')
  , https     = require('https')
  ;

//seacher
console.log("starting streamer...");
streamer.start(function(tweet){
  console.log(tweet);
  var req = https.get("https://agent.electricimp.com/3RWsFhdTP9P-?color=B7C22C", function(res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
  
    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    res.on('data', function(chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      //console.log('BODY: ' + body);
    })
  });
  
  req.on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });
});
