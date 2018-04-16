var express = require("express");
var path = require("path");
var app = express();
app.use(express.static(path.join(__dirname, "public")));

var socket = require("socket.io");

var server = app.listen(3000, function () {
  console.log("server has started on port 3000");
});


/* Step 1, set up socket */

var io = socket(server);

io.on("connection", function (socket) {
  console.log("There is a New Connection with  id: ", socket.id);

  /* step 3 . server handles event from client */

  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });
  
  /* step 6. handle broadcast from client*/

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
