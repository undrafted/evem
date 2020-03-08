import Evem from '../src/'

describe('Evem', () => {

  beforeEach(() => {
    Object.defineProperty(window, '__evem__', {
      writable: true,
      value: undefined
    });
  });

  it('should only create a singleton', () => {

    const ev1 = new Evem();
    const ev2 = new Evem();

    expect(ev1).toBe(ev2);
  });

  it('should call an event callback', () => {

    Object.defineProperty(window, '__evem__', {
      writable: true,
      value: undefined
    });

    const ev1 = new Evem();
    const MOCK_EVENT = 'MOCK_EVENT';
    const mockCallback = jest.fn();

    const removeCb = ev1.on(MOCK_EVENT, mockCallback);
    ev1.emit(MOCK_EVENT);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    removeCb();
    ev1.emit(MOCK_EVENT);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
})

