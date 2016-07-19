//DOES NOT WORK. WORK IN PROGRESS

const EE = require('events');
const net = require('net');


function ClientPool(){
  this.ee = new EE();
  this.pool = {};

  this.ee.on('register', (client) => {
    var idNum = randomGen();
    client.id = idNum;
    client.nickname = 'guest-' + idNum;
    this.pool[idNum] = client;
  });
}
//
// ee.on('data');
// ee.on('error');
// ee.on('end');

//server.js folder
var server = net.createServer(function(socket){
  // ee.emit('register');
});

function randomGen() {
  return Math.floor(Math.random() * (10000 - 1) + 1);
}
