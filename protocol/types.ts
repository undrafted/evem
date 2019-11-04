declare global {
  interface Window {
    __bridge__: any;
  }
}

export type BridgeEvent = string;

export type BridgeEventCallback = (
  event: BridgeEvent,
  callback: () => void
) => void;
