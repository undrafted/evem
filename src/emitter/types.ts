declare global {
  interface Window {
    __emitter__: any;
  }
}

export type EmitterEvent = string;
export type EmitterCallback = (data?: any) => void;

export type EmitterCallbacksObject = {
  [key in EmitterEvent]: EmitterCallback[]
};
