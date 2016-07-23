'use strict';

const net = require('net');
const ClientPool = require('./lib/clientPool');


var clients = new ClientPool();

module.exports = exports = net.createServer(function(socket){
  clients.ee.emit('register', socket);

  console.log(socket.nickname + ' has joined the network');

  socket.on('error', function(err){
    if(err) console.log(err);
  });

  socket.on('data', function(data){
    if(data.toString() === 'END\r\n'){
      socket.end();
    } else {
      clients.ee.emit('broadcast', data, socket);
    }
  });

  socket.on('end', function(){
    console.log(socket.nickname + ' has left the chat');
    delete clients.pool[socket.id];
  });
});
