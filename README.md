# Evem

Tiny global singleton event emitter for Micro-frontends

## Usage

```js
// Emitter class is a singleton: one instance for the while app
// take the instance by using new
// you can optionally pass a debug option for friendly console warns
const emitter = new Evem({ debug: true });

interface ThisCBData {
  from: string;
}

const CLICK_EVENT = "click-event";
const clickCallback = ({ from }: ThisCBData) => {
  alert(`clicked from ${from}!`);
};
// adding a callback
emitter.on(CLICK_EVENT, clickCallback);

// emitting an event (anywhere, outside of your app, probably...)
// emitter.emit returns the Evem instance, so its chainable
myButton.addEventListener("click", () => {
  const data: ThisCBData = { from: "me" };
  emitter.emit(CLICK_EVENT, data).emit(CART_UPDATE, data);
});

// removing a callback
emitter.removeOn(CLICK_EVENT, clickCallback);

// removing an event and all its callbacks
emitter.removeEvent(CLICK_EVENT);

// or if you prefer to not keep track of listener callbacks, `on` returns a callback remover
const removeClickListener = emitter.on(CLICK_EVENT, clickCallback);
removeClickListener();
```

## Development

```
yarn global add parcel
yarn
yarn start
```
