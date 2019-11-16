import Bridge from "./index";

declare global {
  interface Window {
    __bridge__: any;
  }
}

export type BridgeEvent = string;
export type BridgeCallback = (data?: any) => void;

export type BridgeEventCallback = (
  event: BridgeEvent,
  callback: BridgeCallback
) => Bridge;

export type BridgeDispatch = (event: BridgeEvent, data?: {}) => Bridge;
