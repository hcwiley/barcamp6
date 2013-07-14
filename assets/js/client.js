//=require socket.io
//=require jquery

var didDisconnect = false;

$(window).ready(function(){

  socket = io.connect()

  socket.on("connection", function(data){
    if( didDisconnect ) {
      window.location = window.location.pathname;
    } else {
      var el = $(jade.templates['tweet-box.jade']({
        data: data,
      }));
      $("#socket-stream").append(el);
      socket.emit("ripp-it", "croak");
    }
  });

  socket.on("tweet", function(data){
    var li = $("<li>"+data.text+"</li>");
    $("#socket-stream").append(li);
  });

  socket.on("disconnect", function(data){
    didDisconnect = true;
  });

  // listen for the tweeters
  socket.on("tweet", function(data){
    var el = $(jade.templates['tweet-box.jade']({
      data: data,
    }));
    $("#socket-stream").append(el);
    socket.emit("ripp-it", "croak");
  });
  
});
