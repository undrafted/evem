# Evem

Simple global event emitter for Micro-frontends

```
yarn global add parcel
yarn
yarn start
```

## Usage

```js
// Emitter class is a singleton
const emitter = new Evem();

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

// or if you prefer to not save a listener callback, `on` returns a callback remover
const removeClickListener = emitter.on(CLICK_EVENT, clickCallback);
removeClickListener();
```
