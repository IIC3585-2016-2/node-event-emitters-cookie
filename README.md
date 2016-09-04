# Event emitters


```javascript
// Importa el modulo 'events'
var events = require('events');
// Crear un Event Emitter
var eventEmitter = new events.EventEmitter();

```

## Métodos

### addListener y emit

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

```
### once
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

```

##removeListener 

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
eventEmitter.removeListener('doorOpen', rongBell)
eventEmitter.emit('doorOpen');

```




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
eventEmitter.on('doorOpen', rongBell);
eventEmitter.emit('doorOpen');
eventEmitter.removeListener('doorOpen', rongBell)
eventEmitter.emit('doorOpen');

```

