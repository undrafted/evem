import Evem from "../src";

{
  const emitter = new Evem();
  let app = document.getElementById("app1") as HTMLElement;


  const button = document.createElement("button");
  button.innerHTML = "Click me from app 1";
  button.addEventListener("click", () => {
    emitter.emit("button-click");
  });

  app.appendChild(button);
}
