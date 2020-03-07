declare global {
  interface Window {
    __evem__: any;
  }
}

export type Options = {
  debug?: boolean
};

export type EmitterEvent = string;
export type EmitterCallback = (data?: any) => void;

export type EmitterCallbacksObject = {
  [key in EmitterEvent]: EmitterCallback[]
};

export type RemoveEventListener = (customEvent: EmitterEvent, callback: EmitterCallback) => void;
