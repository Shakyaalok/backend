const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser')
const fs = require('fs');


app.use(bodyParser.urlencoded({ extended: true }))


app.get('/login', (req, res) => {
    res.send(`<body>
        <script>
        function loginfunction(){
           const dt = document.getElementById("userName").value;
           localStorage.setItem("user", dt);
           location.href="/";
        }
        </script>
        <input type="text" id="userName"  name='userName'>
        <button type="button" onClick="loginfunction()">login</button>
</body>`)
})

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Bootstrap Example</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
      <script>
  var socket = io();
  
  socket.on('chat message', function(msg) {
    var messages = document.getElementById('messages');
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
  });

  function sendMsg(){
    const msg = document.getElementById("ChatText").value;
    const userName = localStorage.getItem("user");
    socket.emit('chat message', userName+ ":"+ msg);
    document.getElementById("ChatText").value="";
  }
 
</script> 
    </head>
    <body>
    
    <div class="container-fluid">
      <h1>Chat App!</h1>
      <ul id="messages"></ul>
      <p><strong>userName</strong></p>
      <p>msg test</p>
      <div class="row">
        <div class="col-sm-4" style="background-color:lavender;"><textarea id="ChatText"></textarea></div>
        <div class="col-sm-2" style="background-color:lavenderblush;"><button onClick="sendMsg()">Send</button></div>
      </div>
    </div>
        
    </body>
    </html>
    `)
})




const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(3000, () => {
    console.log('listening on *:3000');
});