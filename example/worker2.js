// import worky
importScripts("../src/worky.js");

// Create the event interface
var worker = Worky();

// Listen for events from window
worker.on("hello to worker2", function (data) {
    worker.emit("some event", data.magic, 7);
});
