import { Bridge } from "../src";

{
  const bridge = new Bridge();
  const app = document.getElementById("app1");

  const button = document.createElement("button");
  button.innerHTML = "Click me from app 1";
  button.addEventListener("click", () => {
    bridge.dispatch("button-click");
  });

  app.appendChild(button);
}
