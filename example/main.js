(function () {
    var w = new Worky("worker.js");

    // Listen for events from worker
    w.on("some event", function (data) {
        console.log("worker->window received (some event):", data);
    }).on("hello world", function (data) {
        console.log("worker->window received (hello world):", data);
    });

    // Emit something to the worker
    console.log("window->worker (another event)");
    w.emit("another event", {
        "hello": "world"
    });
})();
