//Codigo obtenido de:
//http://stackoverflow.com/questions/26465358/how-to-make-an-eventemitter-listen-to-another-eventemitter-in-node-js

var events = require( 'events' );
//Create a new sole-source event emitter
var emitterA = new events.EventEmitter();

//create a container that can listen
function EventListener( name ) {
  console.log( 'new event listener, name=' + name );
  this.name = name;
  this.ack = function(test) {
    console.log( this.name + ' just heard ' + test );
  };
  this.listenTo = function( event, emitter ) {
    var self = this;
    emitter.on( event, function() {
      self.ack(event);
    } );
  };
}

var listenerA = new EventListener( 'A');
listenerA.listenTo( 'testA', emitterA );

var listenerB = new EventListener( 'B');
listenerB.listenTo( 'testA', emitterA );

emitterA.emit( 'testA' );
