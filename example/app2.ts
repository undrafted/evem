import { Bridge } from "../src";

{
  const bridge = new Bridge();
  bridge.register("button-click", () => {
    alert("'button-click' event is dispatched, received in app 2");
  });
}
