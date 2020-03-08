# Evem

Tiny global event emitter for Micro-frontends (or if you need to talk to other js files in your document)

## Installation

```
npm install evem
```

## Usage

#### Creating an Evem instance

```js
// Emitter class is a singleton: one instance for the whole document
// you can optionally pass a debug option for friendly console warns
const emitter = new Evem({ debug: true });
```

#### Sample supported callback

```js
interface ThisCBData {
  from: string;
}

const CLICK_EVENT = "click-event";
// the data is what is passed in the 2nd argument during emit(EVENT, data);
const clickCallback = (data: ThisCBData) => {
  alert(`clicked from ${data.from}!`);
};
```

#### Adding a callback

```js
emitter.on(CLICK_EVENT, clickCallback);
```

#### Or using `once` for one-time callbacks

```js
emitter.once(CLICK_EVENT, clickCallback);
```

#### Emitting an event (anywhere, outside of your app, probably...)

```js
// `emitter.emit()` returns the Evem instance, so its chainable
myButton.addEventListener("click", () => {
  const data: ThisCBData = { from: "me" };
  emitter.emit(CLICK_EVENT, data).emit(CART_UPDATE, data);
});
```

#### Removing a callback

```js
emitter.removeOn(CLICK_EVENT, clickCallback);
// or if you prefer to not keep track of listener callbacks, `on` returns a callback remover
const removeClickListener = emitter.on(CLICK_EVENT, clickCallback);
removeClickListener();
```

#### Removing a registered event and all its callbacks

```js
emitter.removeEvent(CLICK_EVENT);
```

## Running the [example](https://github.com/undrafted/evem/tree/master/example)

```
yarn global add parcel
yarn
yarn start
```

## License

MIT
