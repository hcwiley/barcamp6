var repl   = require('repl')
  , models = require('../models')
  ;

global.Tweet = models.Tweet;
global.print = console.log;

repl.start({
  useColors : true,
  useGlobal : true,
  prompt    : "barcamp6> ",
  input     : process.stdin,
  output    : process.stdout
});

