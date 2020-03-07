import {
  EvemOptions,
  Event,
  EmitterCallbacksObject,
  Callback,
  RemoveEventListener,
  AddEventListener,
  BaseAddEventListener,
  CallbackOptions
} from "./types";

export default class Evem {
  static instance: Evem;
  private debug: boolean = false;
  private customEventsCallbacks: EmitterCallbacksObject = {};

  constructor(options: EvemOptions = { debug: false }) {
    if (Evem.instance) {
      return Evem.instance;
    }

    if (window.__evem__) {
      Evem.instance = window.__evem__;
      return Evem.instance;
    }

    Evem.instance = this;
    this.debug = options.debug;
    window.__evem__ = Evem.instance;
  }

  private addEventListener: BaseAddEventListener = (
    customEvent: Event,
    callback: Callback,
    cbOptions: CallbackOptions = { once: false }
  ): RemoveEventListener => {
    const eventCbArray = this.customEventsCallbacks[customEvent];

    if (eventCbArray) {
      let isAlreadyAdded = false;

      for (let i = 0; i <= eventCbArray.length; i++) {
        if (eventCbArray[i].callback === callback) {
          isAlreadyAdded = true;
          break;
        }
      }

      if (!isAlreadyAdded) {
        eventCbArray.push({ callback });
      }
    } else {
      this.customEventsCallbacks[customEvent] = [
        { callback, once: cbOptions.once }
      ];
    }

    return () => {
      this.removeOn(customEvent, callback);
    };
  };

  on: AddEventListener = (customEvent, callback) => {
    return this.addEventListener(customEvent, callback);
  };

  once: AddEventListener = (customEvent, callback) => {
    return this.addEventListener(customEvent, callback, { once: true });
  };

  removeOn: RemoveEventListener = (customEvent, callback) => {
    const eventCbArray = this.customEventsCallbacks[customEvent];

    if (eventCbArray) {
      for (let i = 0; i < eventCbArray.length; i++) {
        if (eventCbArray[i].callback === callback) {
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
      if (this.debug) {
        console.warn(
          `You are trying to remove a callback from event: ${customEvent} that has no active listeners`
        );
      }
    }
  };

  removeEvent = (customEvent: Event) => {
    const eventCbArray = this.customEventsCallbacks[customEvent];
    if (eventCbArray) {
      delete this.customEventsCallbacks[customEvent];
    } else {
      if (this.debug) {
        console.warn(
          `You are trying to remove callbacks for an unregistered event: ${customEvent}`
        );
      }
    }
  };

  emit = (customEvent: Event, data: any = {}): Evem => {
    const eventCbArray = this.customEventsCallbacks[customEvent];
    if (eventCbArray) {
      this.customEventsCallbacks[customEvent].forEach(cb => {
        cb.callback(data);
        if (cb.once) {
          this.removeOn(customEvent, cb.callback);
        }
      });
    }

    if (this.debug) {
      console.warn(
        `You are trying to emit an event: ${customEvent} without active listeners`
      );
    }

    return this;
  };
}
