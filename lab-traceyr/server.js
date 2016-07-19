'use strict';

const net = require('net');
// debugger;

var clients = [];

var server = net.createServer(function(socket){
  var idNum = randomGen();
  socket.id = 'user_' + idNum;
  socket.nickname = 'guest-' + idNum;
  clients.push(socket);
  console.log(socket.nickname + ' has joined the network');

  socket.on('data', function(data){
    broadcast(socket.nickname + '> ' + data);
  });

  socket.on('data', function(data){
    if(data.toString() === 'END\r\n'){
      socket.end();
    }
  });

  socket.on('end', function(){
    console.log(socket.nickname + ' has left the chat');
    clients.splice(clients.indexOf(socket), 1);
  });

  function randomGen() {
    return Math.floor(Math.random() * (10000 - 1) + 1);
  }

  function broadcast(msg, sender) {
    clients.forEach(function(client){
      if (client === sender) return;
      client.write(msg);
    });
    process.stdout.write(msg);
  }
});

server.listen(3000, function(){
  console.log('server up');
});
