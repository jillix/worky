## Documentation
You can see below the API reference of this module.

### `EventEmitter()`
Creates a new `EventEmitter` instance. This is exposed via `Worky.EventEmitter`.

#### Return
- **EventEmitter** The `EventEmitter` instance.

### `_on(ev, fn)`
The core `on` method. By default `on` is the same with `_on`.
However, `on` can be rewritten, but `_on` is still the same.

#### Params
- **String** `ev`: The event name.
- **Function** `fn`: The listener function.

#### Return
- **EventEmitter** The `EventEmitter` instance.

### `_emit(ev)`
Emits the passed arguments. By default `emit` is the same with `_emit`.
However, `emit` can be rewritten, but `_emit` is still the same.

Usage:

```js
// Using arguments - this is the convenient way
worker.emit("eventName", 42, { some: "object" }, "foo");

// Internally, this method is used:
worker.emit({
    event: "eventName"
  , args: [42, { some: "object" }, "foo"]
});
```

#### Params
- **String|Worky.Message** `ev`: The event name or a `Worky.Message` object.

#### Return
- **EventEmitter** The `EventEmitter` instance.

### `Worky(script)`
Creates or initializes a web worker. This is inherited from
the `EventEmitter` class.

Usage:

```js
// In the main thread (window)
var worker = new Worky("some-worker.js");

// In the worker thread (some-worker.js)
var worker = new Worky();
```

#### Params
- **String** `script`: The worker file name.

#### Return
- **Worky** The `Worky` instance.

### `Worky.Receiver()`
Creates the `onmessage` handler. This method is used internally.

#### Return
- **Function** The receiver handler which calls the core `_emit` function.

### `Worky.Emitter()`
Creates the `emit` handler. This method is used internally.

#### Return
- **Function** The emitter handler which calls the `postMessage` function.

### `Worky.Message(args)`
Creates a new `Message` instance

#### Params
- **Arguments** `args`: The arguments pseudo-array.

#### Return
- **Worky.Message** The `Message` instance containing the following fields:

