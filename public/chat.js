/* global io */
var socket = io.connect("http://localhost:3000/");

var message = document.getElementById("message"),
    handle = document.getElementById("handle"), 
    btn = document.getElementById("send"),
    output = document.getElementById("output"),
    feedback = document.getElementById("feedback");


/*  step 1 . emit event  and send to server*/


btn.addEventListener("click", function(){
    socket.emit("chat", {
       message:message.value,
       handle:handle.value 
    });
});

/* adding broadcast feature */
message.addEventListener("keypress", function(){
   
    socket.emit("typing", handle.value);
});

/* step 3 . listen for events from server */

socket.on("chat", function(data){
    feedback.innerHTML ="";
    output.innerHTML += "<p><strong>" + data.handle + "</strong> : " + data.message +"</p>";
});

socket.on("typing", function(data){
    feedback.innerHTML="<p><em>"+ data + "  is typing..." + "</em></p>";
});