// import worky
importScripts("../src/worky.js");

var worker = Worky.init();

worker.data("another event", function (ev, data) {
    worker.write("some event", data);
    worker.write("foo", data);
});
