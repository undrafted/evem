declare global {
  interface Window {
    __emitter__: any;
  }
}

export type EmitterEvent = string;
export type EmitterCallback = () => void;

export type EmitterCallbacksObject = { [key in string]: (() => void)[] };
