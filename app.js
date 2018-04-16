var express = require("express");
var path = require("path");
var app = express();
app.use(express.static(path.join(__dirname, "public")));

var socket = require("socket.io");


var server = app.listen(3000, function(){
    console.log("server has started on port 3000");
});


/*  socket set up */
var io = socket(server);

io.on("connection", function (socket){
    console.log("A new connection made", socket.id);

    /* step 2 . servaer handles event from front end */

    socket.on("chat", function(data){
        io.sockets.emit("chat", data);
    });
    /* handle broadcast from front-end */

    socket.on("typing", function (data) {
        socket.broadcast.emit("typing", data);
    });
});

