// import worky
importScripts("../src/worky.js");

var worker = Worky();

worker.on("another event", function (ev, data) {
    worker.write("some event", data);
    worker.write("foo", data);
});
