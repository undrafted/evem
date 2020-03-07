import { EmitterEvent, EmitterCallbacksObject, EmitterCallback, RemoveEventListener } from "./types";

export default class Evem {
  static instance: Evem = null;
  private customEventsCallbacks: EmitterCallbacksObject = {};

  constructor() {
    if (Evem.instance) {
      return Evem.instance;
    }

    if (window.__evem__) {
      Evem.instance = window.__evem__;
      return Evem.instance;
    }

    Evem.instance = this;
    window.__evem__ = Evem.instance;
  }

  on = (customEvent: EmitterEvent, callback: EmitterCallback): RemoveEventListener => {
    const eventCbArray = this.customEventsCallbacks[customEvent];

    if (eventCbArray) {
      eventCbArray.push(callback);
    } else {
      this.customEventsCallbacks[customEvent] = [callback];
    }

    return () => {
      this.removeOn(customEvent, callback)
    };
  };

  removeOn: RemoveEventListener = (customEvent: EmitterEvent, callback: EmitterCallback) => {
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
    } else {
      console.warn(`Event ${customEvent}, has no active listeners`);
    }
  };

  emit = (customEvent: EmitterEvent, data: any = {}): Evem => {
    const eventCbArray = this.customEventsCallbacks[customEvent];
    if (eventCbArray) {
      this.customEventsCallbacks[customEvent].forEach(cb => cb(data));
      return this;
    }

    console.warn(`Event ${customEvent}, has no active listeners`);
  };
}
