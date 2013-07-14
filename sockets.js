var models = require('./models')
;

module.exports = function(io) {

  io.configure(function (){
  });

  io.sockets.on('connection', function(socket) {
    socket.emit("connection", "yummyPizza");
  });

}
