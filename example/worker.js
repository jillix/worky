// import worky
importScripts("../src/worky.js");

// Create the event interface
var worker = Worky();

// Emit something back to the window
worker.emit("hello world", { "yes!": "it works!" });

// Listen for events from window
worker.on("another event", function (data) {
    worker.emit("some event", data);
});
