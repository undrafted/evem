import Evem from '../src/'

describe('Evem', () => {

  const MOCK_EVENT = 'MOCK_EVENT';
  const mockCallback = jest.fn();
  const mockCallback2 = jest.fn();

  beforeEach(() => {
    Object.defineProperty(window, '__evem__', {
      writable: true,
      value: undefined
    });
    jest.resetAllMocks();
  });

  it('should only create a singleton', () => {

    const ev1 = new Evem();
    const ev2 = new Evem();

    expect(ev1).toBe('a');
  });

  it('should call an event callback', () => {

    Object.defineProperty(window, '__evem__', {
      writable: true,
      value: undefined
    });

    const ev1 = new Evem();

    ev1.on(MOCK_EVENT, mockCallback);
    ev1.emit(MOCK_EVENT);


  });

  it('should remove event callbacks with returned callback remover from `on`', () => {

    const emitter = new Evem();

    const removeCb = emitter.on(MOCK_EVENT, mockCallback);
    removeCb();
    emitter.emit(MOCK_EVENT);
    expect(mockCallback).toHaveBeenCalledTimes(0);

  });

  it('should remove all callbacks with removeEvent', () => {
    const emitter = new Evem();

    emitter.on(MOCK_EVENT, mockCallback);
    emitter.emit(MOCK_EVENT);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    mockCallback.mockReset();

    emitter.removeEvent(MOCK_EVENT);
    emitter.emit(MOCK_EVENT);
    expect(mockCallback).toHaveBeenCalledTimes(0);

  });

  it('should remove specific callbacks with removeOn', () => {
    const emitter = new Evem();

    emitter.on(MOCK_EVENT, mockCallback);
    emitter.on(MOCK_EVENT, mockCallback2);

    emitter.emit(MOCK_EVENT);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback2).toHaveBeenCalledTimes(1);
    mockCallback.mockReset();
    mockCallback2.mockReset();

    emitter.removeOn(MOCK_EVENT, mockCallback);
    emitter.emit(MOCK_EVENT);
    expect(mockCallback).toHaveBeenCalledTimes(0);
    expect(mockCallback2).toHaveBeenCalledTimes(1);

  });

  it('should only call `once` callbacks once', () => {
    const emitter = new Evem();

    emitter.once(MOCK_EVENT, mockCallback);
    emitter.emit(MOCK_EVENT);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    mockCallback.mockReset();
    emitter.emit(MOCK_EVENT);
    expect(mockCallback).toHaveBeenCalledTimes(0);
  });

  it('should not allow adding the same callbacks', () => {
    const emitter = new Evem();

    emitter.on(MOCK_EVENT, mockCallback);
    emitter.on(MOCK_EVENT, mockCallback);
    emitter.emit(MOCK_EVENT);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

})

