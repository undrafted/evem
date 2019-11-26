# bridge

Simple global event emitter for Micro-frontends

```
yarn global add parcel
yarn
yarn start
```

## Usage

### Emitter

```js
// Emitter class is a singleton
const emitter = new Emitter();

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
myButton.addEventListener("click", () => {
  const data: ThisCBData = { from: "me" };
  emitter.emit(CLICK_EVENT, data);
});

// removing a callback 
emitter.removeOn(CLICK_EVENT, clickCallback);
```

### Bridge

See the [example](https://github.com/undrafted/bridge/tree/master/example) folder. It's pretty much the same as the `Emitter`. The only difference is that its use-case is to be able to only attach one callback to an event (it would throw an error otherwise).

