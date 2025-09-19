// Event Emitter - will be shared across the application
const events = require("events");

// Make single instance of Event Emitter
const bus = new events.EventEmitter();
// export the event emitter to be used in the application
module.exports = bus;
