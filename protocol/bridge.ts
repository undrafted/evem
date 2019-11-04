import { BridgeEvent, BridgeEventCallback } from "./types";

export default class Bridge {
  static instance: Bridge = null;

  constructor() {
    if (Bridge.instance) {
      return Bridge.instance;
    }

    Bridge.instance = this;
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
      window.__bridge__ = {
        dispatch: this.dispatch
      };
      return;
    }

    throw new Error(
      "Window is not defined. Please make sure you are on the right browser environment to use this module"
    );
  };
}
