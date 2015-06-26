(function () {
    var w = new Worky("worker.js");

    // Listen for a specific event
    w.on("some event", function (data) {
        console.log("Got some event and its data", data);
        console.log("Sending data to the worker via 'another event'");
        // Listen for a specific event
        debugger
        w.emit("another event", {
            "hello": "world"
        });
    });

    w.on("hello world", function (data) {
        console.log(data);
    });
})();
