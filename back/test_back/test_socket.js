console.log("test here");
var socket = io.connect('ws://localhost:3000');
console.log(socket.id);

socket.emit('data',  {
    message: "yoooo I emit my first message!"
});


// socket.on('data', function(data){
//     console.log(data);
// });