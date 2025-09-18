const tutorial = require('./tutorial');
//console.log(tutorial);
// console.log(tutorial.sum(1,1));
// console.log(tutorial.pi);
// console.log(new tutorial.SomeMathObject());


//creating an event emitter
const EventEmitter = require('events');
//creating an instance of the event emitter
const eventEmitter = new EventEmitter();

eventEmitter.on('tutorial', ()=> {
    console.log('tutorial event has occured');
});




