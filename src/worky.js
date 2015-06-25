(function (root) {

    var workers = {};

    function Worky(script) {

        if (this.constructor !== Worky && script) {
            return new Worky(script);
        }

        var listeners = this.listeners = {};
        this.is_worker = !script;

        // Initialize the worker interface
        if (script) {
            this.worker = new Worker(script);
            this.worker.addEventListener("message", function (ev) {
                ev.data = Object(ev.data);
                var l = listeners[ev.data.event];
                if (!l || !l.length) { return; }
                l.forEach(function (fn) {
                    fn(ev, ev.data.data);
                });
            });
        } else {
            this.worker.postmessage(new Worky.Message("_init"));
        }
    }


    Worky.Message = function (ev, data) {
        this.event = ev;
        this.data = data;
    };

    Worky.prototype.on = function (ev, fn) {
        var l = this.listeners[ev] = this.listeners[ev] || [];
        l.push(fn);
        return this;
    };

    Worky.prototype.emit = function (ev, data) {
        root.onmessage = function () {

        };
        var l = this.listeners[ev];
        if (!l || !l.length) {
            return this;
        }

        l.forEach(function (fn) {

        });
    };

    root.Worky = Worky;
})(self);
