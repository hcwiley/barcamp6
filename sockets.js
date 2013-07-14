var models = require('./models')
;

module.exports = function(io) {

  io.configure('production', function (){
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);
    io.set('log level', 1);
  });

  io.configure('development', function (){

  });

  io.sockets.on('connection', function(socket) {
    socket.emit("connection", "yummyPizza");
  });

}
