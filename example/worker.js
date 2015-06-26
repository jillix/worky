// import worky
importScripts("../src/worky.js");

var worker = Worky();

worker.emit("hello world", { "yes!": "it works!" });

worker.on("another event", function (ev, data) {
    debugger
    worker.write("some event", data);
    worker.write("foo", data);
});
