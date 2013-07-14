//=require socket.io
//=require jquery

var didDisconnect = false;

$(window).ready(function(){

  socket = io.connect()

  socket.on("connection", function(data){
    if( didDisconnect ) {
      window.location = window.location.pathname;
    } else {
      var el = $("<div class='span3'>"+data+"</div>");
      $("#socket-stream").append(el);
      socket.emit("ripp-it", "croak");
    }
  });

  socket.on("disconnect", function(data){
    didDisconnect = true;
  });

  // listen for the tweeters
  socket.on("tweet", function(data){
    var el = $("<div class='span3'>"+data+"</div>");
    $("#socket-stream").append(el);
    socket.emit("ripp-it", "croak");
  });
  
});
