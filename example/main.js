(function () {
    var w = new Worky("worker.js");

    // Get all events
    w.data(function (ev, data) {
        console.log("Got data: ", data);
    });

    // Listen for a specific event
    w.data("some event", function (ev, data) {
        console.log("Got some event and its data", data);
    });

    console.log("Sending data to the worker via 'another event'");
    // Listen for a specific event
    w.write("another event", {
        "hello": "world"
    });
})();
