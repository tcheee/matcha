console.log("test here");
var socket = io.connect('ws://localhost:3000');

socket.emit('data', {
    message: "yoooo I emit my first message!"
}, response => {
    console.log(response);
});

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      btn_room = document.getElementById('room'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events
btn_room.addEventListener('click', function(){
    console.log("click to join the room")
    socket.emit('room', {
        room: room.value
    });
    message.value = "";
});

btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
        room: room.value
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', {
        handle: handle.value,
        room: room.value
    });
});

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
})