var eventos = require('events');

var eventEmitter1 = new eventos.EventEmitter;
var eventEmitter2 = new eventos.EventEmitter;

eventEmitter1.on('evento',() => console.log('Evento de eventEmitter1!!!'));
eventEmitter2.on('evento',() => console.log('Evento de eventEmitter2!!!'));

eventEmitter1.emit('evento');
eventEmitter2.emit('evento');
