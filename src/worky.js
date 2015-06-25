(function (root) {

    function EventListener() {
        this._ = {};
    }

    EventListener.prototype.on = function (ev, fn) {
        var l = this._[ev] = this._[ev] || [];
        l.push(fn);
        return this;
    };

    EventListener.prototype.emit = function (_ev, ev, data) {
        var self = this
          , l = this._[ev]
          , args = Array.prototype.slice.call(arguments, 2)
          ;

        if (!l || !l.length) {
            return this;
        }

        l.forEach(function (fn) {
            fn.apply(_ev, args);
        });
    };

    var _workers = {};

    function Worky(script) {

        var self = {};

        if (this.constructor !== Worky && script) {
            return new Worky(script);
        }

        if (!script) {
            self = Object.create(EventListener.prototype);
        } else {
            self = this;
        }

        EventListener.call(self);
        self.is_worker = !script;

        // Initialize the worker interface
        if (script) {
            self.worker = new Worker(script);
            self.worker.worky = this;
            self.worker.onmessage = function (ev) {
                ev.data = Object(ev.data);
                self.emit(ev, ev.data.event, ev.data);
            };
        } else {
            self.emit = function (ev, data) {
                root.postMessage(new Worky.Message(ev, data));
            };
            return self;
        }
    }

    Worky.prototype = Object.create(EventListener.prototype);
    Worky.prototype.constructor = Worky;
    Worky.Message = function (ev, data) {
        this.event = ev;
        this.data = data;
    };


    root.Worky = Worky;
})(self);
