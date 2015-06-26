(function (root) {

    function EventListener() {
        this._ = {};
    }

    EventListener.prototype._on = function (ev, fn) {
        var l = this._[ev] = this._[ev] || [];
        l.push(fn);
        return this;
    };

    EventListener.prototype._emit = function (ev) {
        var self = this
          , args = []
          , event = null
          , l = null
          ;

        if (typeof ev === "object") {
            event = ev.event;
            args = ev.args;
        } else {
            event = ev;
            args = Array.prototype.slice.call(arguments, 1)
        }

        l = this._[event];
        if (!l || !l.length) { return; }

        l.forEach(function (fn) {
            fn.apply(self, args);
        });
    };

    EventListener.prototype.on = EventListener.prototype._on;
    EventListener.prototype.emit = EventListener.prototype._emit;

    var _workers = {};

    function Worky(script, loaded) {

        var self = {};

        if (this.constructor !== Worky && script) {
            return new Worky(script, loaded);
        }

        if (!script) {
            self = Object.create(EventListener.prototype);
        } else {
            self = this;
        }

        EventListener.call(self);
        self.is_worker = !script;

        // We are inside of a worker
        if (!script) {
            root.onmessage = Worky.receiver.call(self);
            self.emit = Worky.emitter.call(root);
            return self;
        }

        // Inside of a window, creating a worker
        self.worker = new Worker(script);
        self.worker.onmessage = Worky.receiver.call(self);
        self.emit = Worky.emitter.call(self.worker);
    }

    Worky.receiver = function () {
        var self = this;
        return function (ev) {
            self._emit(ev.data);
        };
    };

    Worky.emitter = function () {
        var self = this;
        return function () {
            var ev = new Worky.Message(arguments);
            self.postMessage(ev);
        }
    }

    Worky.prototype = Object.create(EventListener.prototype);
    Worky.prototype.constructor = Worky;
    Worky.Message = function (args) {
        args = Array.prototype.slice.call(args);
        //this._ = args[0];
        this.event = args[0];
        this.args = args.slice(1);
    };


    root.Worky = Worky;
})(self);
