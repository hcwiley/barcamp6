//=require socket.io
//=require jquery

$(window).ready(function(){

  socket = io.connect()

  socket.on("connection", function(data){
    socket.emit("ripp-it", "croak");
  });
  
});
