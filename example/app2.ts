import { Evem } from "../src";

{
  const emitter = new Evem();
  emitter.on("button-click", () => {
    alert("'button-click' event is dispatched, received in app 2");
  });
}
