/* global io */
var socket = io.connect("http://localhost:3000/");


var message = document.getElementById("message"),
    handle = document.getElementById("handle"), 
    btn = document.getElementById("send"),
    output = document.getElementById("output"),
    feedback = document.getElementById("feedback");


/*  step 2 . emit event  and send to server*/

btn.addEventListener("click", function(){
    socket.emit("chat", {
       message:message.value,
       handle:handle.value 
    });
});



/* step 4 . listen for events from server */

socket.on("chat", function(data){
    feedback.innerHTML ="";
    output.innerHTML += "<p><strong>" + data.handle + "</strong> : " + data.message +"</p>";
});

/* Step 5. adding broadcast feature */

message.addEventListener("keypress", function(){
    socket.emit("typing", handle.value);
});

/*displaying broadcast message from server*/

socket.on("typing", function(data){
    feedback.innerHTML="<p><em>"+ data + "  is typing..." + "</em></p>";
});