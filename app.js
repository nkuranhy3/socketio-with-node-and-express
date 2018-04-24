var express = require("express");
var path = require("path");
var app = express();
app.use(express.static(path.join(__dirname, "public")));
var mongo = require('mongodb').MongoClient;
var socket = require("socket.io");


var server = app.listen(3000, function () {
  console.log("server has started on port 3000");
});
var io = socket(server);
/* Step 1, set up socket */
mongo.connect('mongodb://127.0.0.1/chat', function (err, db) {
  if (err) throw err;

  io.on("connection", function (socket) {
    console.log("There is a New Connection with  id: ", socket.id);

    socket.on("chat", function (data) {
      var name = data.handle;
      var message = data.message;

      col.insert({
        name: name,
        message: message
      }, function () {

        io.sockets.emit("chat", data);
      });
    });
    var col = db.collection('messages');
    col.find().limit(100).sort({
      _id: 1
    }).toArray(function (err, data) {
      if (err) throw err;
      socket.emit('chat', data);
    });
    socket.on("disconnect", function () {
      console.log("A user disconnected with id " + socket.id);
    });
    /* step 3 . server handles event from client */


    /* step 6. handle broadcast from client*/

    socket.on("typing", function (data) {
      socket.broadcast.emit("typing", data);
    });
  });
});