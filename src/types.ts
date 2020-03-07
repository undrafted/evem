declare global {
  interface Window {
    __evem__: any;
  }
}

export interface EvemOptions {
  debug: boolean
};

export type Event = string;
export type Callback = (data?: any) => void;

export interface CallbackOptions {
  once?: boolean
}

export interface EvemCallback extends CallbackOptions {
  callback: Callback;
}


export type EmitterCallbacksObject = {
  [key in Event]: EvemCallback[]
};

export type RemoveEventListener = (customEvent: Event, callback: Callback) => void;
export type BaseAddEventListener = (customEvent: Event, callback: Callback, options?: CallbackOptions) => RemoveEventListener;
export type AddEventListener = (customEvent: Event, callback: Callback) => RemoveEventListener;