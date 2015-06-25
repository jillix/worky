(function () {
    var w = new Worky("worker.js");

    // Listen for a specific event
    w.on("some event", function (data) {
        console.log("Got some event and its data", data);
    });

    w.on("hello world", function (data) {
        console.log(data);
    });

    console.log("Sending data to the worker via 'another event'");
    // Listen for a specific event
    w.emit("another event", {
        "hello": "world"
    });
})();
