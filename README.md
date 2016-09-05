# Event emitters

Node.js usa event-driven lo que hace que este sea tan rápido, solo debe comenzar el servidor, iniciar variables, declarar funciones y esperar a que los eventos ocurran. 

Node tiene multiples eventos integrados disponibles a través del modulo de eventos y la clase EventEmitter, la que permite que cierto tipo de objetivos, llamados "emitters", emitan eventos nombrados los cuales llamarán a funciones (listeners). Cuando el EventEmitter emite un evento, toda las funciones unidas/asociadas a ese evento son llamadas de manera síncrona. 

Para utilizar EventEmitter es necesario importar el modulo 'events' y crear una instancia de este.

```javascript
// Importa el modulo 'events'
var events = require('events');
// Crear un Event Emitter
var eventEmitter = new events.EventEmitter();

```

## Métodos

### emitter.addListener (eventName, listener) = emitter.on (eventName, listener)

Agrega la función listener al final del arreglo de listeners asociados al evento eventName. Este método no verifica si la función ya fue agregada, por lo tanto, si este fuera el caso vuelve a agregarla.


```javascript
var ringBell = function ringBell()
{
  console.log('ring ring ring');
}
var rongBell = function rongBell()
{
  console.log('rong rong rong');
}

//Se suscriben los listener ringBell y rongBell
eventEmitter.on('doorOpen', ringBell);
eventEmitter.on('doorOpen', rongBell);

```

## emitter.emit (eventName[, arg1][, arg2][, ...])

Llama síncronamente cada listener registrado en el evento eventName en el orden que fueron registrados entregando los argumentos a cada uno. 

Considerando el ejemplo anterior se llama al evento 'doorOpen' el cual gatilla que se ejecuten los listener 'ringBell' y 'rongBell'

```javascript
eventEmitter.emit('doorOpen');
// ring ring ring
// rong rong rong

```
### emitter.once(eventName, listener)

Agrega el listener una vez a el evento eventName. Cuando el eventName gatilla el listener, entonces este es removido e invocado.

```javascript
var events = require('events');
var eventEmitter = new events.EventEmitter();

var ringBell = function ringBell()
{
  console.log('ring ring ring');
}
var rongBell = function rongBell()
{
  console.log('rong rong rong');
}

eventEmitter.once('doorOpen', ringBell);
eventEmitter.on('doorOpen', rongBell);
eventEmitter.emit('doorOpen');
eventEmitter.emit('doorOpen');
// ring ring ring
// rong rong rong
// rong rong rong

```

## emitter.removeListener(eventName, listener) 

Se utiliza para eliminar un listener específico asociado a eventName. En el caso que se hayan suscrito más de una vez una función se eliminará solo una instancia de esta.

```javascript
var events = require('events');
var eventEmitter = new events.EventEmitter();

var ringBell = function ringBell()
{
  console.log('ring ring ring');
}
var rongBell = function rongBell()
{
  console.log('rong rong rong');
}

eventEmitter.on('doorOpen', ringBell);
eventEmitter.on('doorOpen', rongBell);
eventEmitter.emit('doorOpen');
// ring ring ring
// rong rong rong
eventEmitter.removeListener('doorOpen', rongBell)
eventEmitter.emit('doorOpen');
// ring ring ring

```

## emitter.removeAllListeners([eventName])

En este caso se eliminaran todos los listener asociados a eventName, o bien, aquellos específicados en un arreglo que se entrega como parámetro. 



