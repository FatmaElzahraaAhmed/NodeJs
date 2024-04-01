const EventEmitter = require("events");

var e1=new EventEmitter();

e1.on("Fatma",()=>{console.log("Event Fatma Fired!!");})

e1.emit("Fatma");