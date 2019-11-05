import { BridgeEvent, BridgeEventCallback } from "./types";

export default class Bridge {
  static instance: Bridge = null;

  constructor() {
    if (Bridge.instance) {
      return Bridge.instance;
    }

    if (window.__bridge__) {
      Bridge.instance = window.__bridge__;
      return Bridge.instance;
    }

    Bridge.instance = this;
    window.__bridge__ = Bridge.instance;
  }

  callbacks: { [key in BridgeEvent]: () => void } = {};

  register: BridgeEventCallback = (event, callback) => {
    if (this.callbacks[event]) {
      throw new Error(
        "Event already has an assigned callback. Do you mean to overwrite it? Use Bridge.overwrite instead"
      );
    }
    this.callbacks[event] = callback;
  };

  overwrite: BridgeEventCallback = (event, callback) => {
    this.callbacks[event] = callback;
  };

  disconnect = (event: BridgeEvent) => {
    if (this.callbacks[event]) {
      delete this.callbacks[event];
      return;
    }

    throw new Error("Event is not registered.");
  };

  dispatch = (event: BridgeEvent) => {
    const callback = this.callbacks[event];
    if (callback) {
      callback();
    } else {
      throw new Error(`Event ${event}: is not a registered bridge event.`);
    }
  };

  activate = () => {
    if (window) {
      window.__bridge__ = Bridge.instance;
      return;
    }

    throw new Error(
      "Window is not defined. Please make sure you are on the right browser environment to use this module"
    );
  };
}
