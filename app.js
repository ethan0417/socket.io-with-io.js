var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/bower_components'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(client) {
    console.log('Client connected...');
    // Listen client emit 'join'
    client.on('join', function(data) {
        console.log(data);
        // Send messages back to client
        client.emit('messages', 'Hello from server');
    });
    // Listen client emit messages and broadcast to every client.
    client.on('messages', function(data) {
       client.broadcast.emit('broad',data);
    });
});
server.listen(3000);