/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { typeAheadKey } from '../src/composites/selection/type-ahead-key';

const LABELS = { a: 'Apple', b: 'Banana', c: 'Berry', d: 'Cherry' };

const press = ({ typed, onFocusKey, from, key, timeStamp }) => {
  const event = { key, timeStamp, preventDefault: vi.fn() };
  typeAheadKey({ usable: Object.keys(LABELS), labelOf: (at) => LABELS[at], onFocusKey, typed }, event, from);
  return event;
};

describe('K1 Tree type-ahead', { tags: ['critical'] }, () => {
  it('grows the typed text while the keys come close together', () => {
    const typed = { current: { text: '', at: 0 } };
    const onFocusKey = vi.fn();
    press({ typed, onFocusKey, from: 'a', key: 'b', timeStamp: 1000 });
    press({ typed, onFocusKey, from: 'b', key: 'e', timeStamp: 1300 });
    expect(typed.current.text).toBe('be');
    expect(onFocusKey).toHaveBeenLastCalledWith('c');
  });

  it('starts a new text after the pause, taken from the event time', () => {
    const typed = { current: { text: '', at: 0 } };
    const onFocusKey = vi.fn();
    press({ typed, onFocusKey, from: 'a', key: 'b', timeStamp: 1000 });
    press({ typed, onFocusKey, from: 'b', key: 'c', timeStamp: 1701 });
    expect(typed.current.text).toBe('c');
    expect(onFocusKey).toHaveBeenLastCalledWith('d');
  });

  it('keeps the focus and the key when no label matches', () => {
    const typed = { current: { text: '', at: 0 } };
    const onFocusKey = vi.fn();
    const event = press({ typed, onFocusKey, from: 'a', key: 'z', timeStamp: 1000 });
    expect(onFocusKey).not.toHaveBeenCalled();
    expect(event.preventDefault).not.toHaveBeenCalled();
  });
});
