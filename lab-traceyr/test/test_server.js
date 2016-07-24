'use strict';
const net = require('net');
const expect = require('chai').expect;

const server = require('../server');
const port = 5000;

describe('chat server testing', function(){
  before(function(done){
    server.listen(port, done);
  });

  after(function(done){
    server.close(done);
  });

  it('should send messages between clients', function(done){
    let client1 = net.connect({port});
    let client2 = net.connect({port});
    var message = ['test messages', 'Welcome to the CHAT\n'];
    var send = ['test messages'];

    client2.on('data', function(data){
      expect(data.toString().replace(/guest-\d+> /, '')).to.eql(message.pop());
      if(send.length)
        client1.write(send.pop());
      else
        client1.end();
    });

    client1.on('close', function(){
      client2.end();
      expect(message.length).to.eql(0);
      done();
    });
  });
});
