# Event emitters

Node.js usa event-driven lo que hace que este sea tan rápido, solo debe comenzar el servidor, iniciar variables, declarar funciones y esperar a que los eventos ocurran. 

Node tiene multiples eventos integrados disponibles a través del modulo de eventos y la clase EventEmitter, la que permite que cierto tipo de objetos, llamados "emitters", emitan eventos los cuales llamarán a funciones (listeners). Cuando el EventEmitter emite un evento, toda las funciones unidas/asociadas a ese evento son llamadas de manera síncrona. 

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

## emitter.prependListener(eventName, listener)

Con este método se puede agregar un listener a eventName para ser ejecutado antes que todos los listener suscritos a ese evento, es decir agregandolo en el comienzo del arreglo de listeners.

## emitter.prependOnceListener(eventName, listener)

Agregará el listener a eventName como primer listener del arreglo, pero solo una vez.

## emitter.eventNames()

Entrega todos los eventos asociados a ese EventEmitter.

## emitter.listeners(eventName)

Entrega un arreglo con los nombres de todos los listeners asociados a ese eventName de emitter.

## emitter.listenerCount(eventName)

Retorna la cantidad de listeners asociados a eventName.

# Consideraciones con número máximo de listeners

Por defecto el número máximo de listeners que pueden ser suscritos a un evento son 10, para cambiar esto es necesario modificar la cantidad máxima mediante el método emitter.setMaxListeners(n), donde n sera el nuevo número máximo de listeners. Para consultar el número máximo se utiliza el método emitter.getMaxListeners(). Por otro lado, si se quiere cambiar el número máximo para todas las instancias de EventEmitter se puede utilizar la property EventEmitter.defaultMaxListeners, se debe tener precacuión con esto ya que modificará todos los eventos de EventEmitter, incluso los declarados anteriormente.

# Consideraciones con Array Functions

Es posible suscribir listener a un evento usando array functions, pero se debe tener cuidado ya que el contexto será diferente. En los siguientes ejemplos se puede observar esto, en el primer caso no se usa array functions y cuando entramos a esta función, debido a que se gatillo usando el método emit el cual es llamado por nuestro EventEmitter 'myEmitter', por lo que this corresponderá precisamente a dicho EventEmitter. Por otro, en el segundo caso, donde se usan array functions el contexto será esta función.

```javascript
const myEmitter = new MyEmitter();
myEmitter.on('event', function(a, b) {
  console.log(a, b, this);
    // Prints:
    //   a b MyEmitter {
    //     domain: null,
    //     _events: { event: [Function] },
    //     _eventsCount: 1,
    //     _maxListeners: undefined }
});
myEmitter.emit('event', 'a', 'b');
````

```javascript
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  console.log(a, b, this);
    // Prints: a b {}
});
myEmitter.emit('event', 'a', 'b');
````

