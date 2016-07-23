'use strict';

const EE = require('events');

module.exports = exports = function ClientPool(){
  this.ee = new EE();
  this.pool = {};

  this.ee.on('register', (socket) => {
    socket.write('Welcome to the CHAT\n');
    var idNum = Math.floor(Math.random() * (10000 - 1) + 1);
    socket.id = idNum;
    socket.nickname = 'guest-' + idNum;
    this.pool[socket.id] = socket;
  });

  this.ee.on('broadcast', (data, socket) =>{
    for(var users in this.pool) {
      if(this.pool[users.id] !== this.pool[socket.id])
        this.pool[users].write(socket.nickname + '> ' + data.toString());
    }
  });
};
