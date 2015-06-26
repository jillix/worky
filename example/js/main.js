window.addEventListener("load", function () {

    ConsoleJS.init({
        selector: "#result"
    });

    var w = new Worky("js/worker.js")
      , w2 = new Worky("js/worker2.js")
      ;


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

    // Listen for events from worker2
    w2.on("some event", function (two, numbers) {
        console.log("worker2->window received (some event):", two, numbers);
    });

    // Emit something to the second worker
    console.log("window->worker2 (hello to worker2)");
    w2.emit("hello to worker2", { magic: 42 });
});
