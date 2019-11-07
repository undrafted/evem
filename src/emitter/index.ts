import { EmitterEvent, EmitterCallbacksObject, EmitterCallback } from "./types";

export default class Emitter {
  static instance: Emitter = null;
  customEventsCallbacks: EmitterCallbacksObject = {};

  constructor() {
    if (Emitter.instance) {
      return Emitter.instance;
    }

    if (window.__emitter__) {
      Emitter.instance = window.__emitter__;
      return Emitter.instance;
    }

    Emitter.instance = this;
    window.__emitter__ = Emitter.instance;
  }

  on = (customEvent: EmitterEvent, callback: EmitterCallback) => {
    const eventCbObject = this.customEventsCallbacks[customEvent];

    if (eventCbObject) {
      eventCbObject.push(callback);
    } else {
      this.customEventsCallbacks[customEvent] = [callback];
    }

    return this;
  };

  removeOn = (customEvent: EmitterEvent, callback: EmitterCallback) => {
    const eventCbArray = this.customEventsCallbacks[customEvent];
    if (eventCbArray) {
      for (let i = 0; i < eventCbArray.length; i++) {
        if (eventCbArray[i] === callback) {
          const newEventCbArray = eventCbArray.slice(i, 1);
          if (newEventCbArray.length > 0) {
            this.customEventsCallbacks[customEvent] = newEventCbArray;
          } else {
            delete this.customEventsCallbacks[customEvent];
          }
          break;
        }
      }

      return this;
    }

    throw new Error(`Event ${customEvent}, has no active listeners`);
  };

  emit = (customEvent: EmitterEvent, data: any = {}) => {
    const eventCbArray = this.customEventsCallbacks[customEvent];
    if (eventCbArray) {
      this.customEventsCallbacks[customEvent].forEach(cb => cb(data));
      return this;
    }

    throw new Error(`Event ${customEvent}, has no active listeners`);
  };
}
