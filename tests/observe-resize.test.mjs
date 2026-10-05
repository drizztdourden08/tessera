/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { observeResize } from '../src/primitives/dom/observe-resize';

const fakeWindow = () => {
  const made = [];
  class FakeObserver {
    constructor(callback) {
      this.callback = callback;
      this.watched = [];
      this.live = true;
      made.push(this);
    }

    observe(element) {
      this.watched.push(element);
    }

    disconnect() {
      this.live = false;
    }
  }
  return { made, view: { ResizeObserver: FakeObserver } };
};

const elementIn = (view) => ({ ownerDocument: { defaultView: view } });

describe('observeResize', () => {
  it('watches every element given with one observer from their own window', () => {
    const { made, view } = fakeWindow();
    const first = elementIn(view);
    const second = elementIn(view);
    const seen = [];
    const stop = observeResize([first, null, second, undefined], (entries) => seen.push(entries));
    expect(made).toHaveLength(1);
    expect(made[0].watched).toEqual([first, second]);
    made[0].callback(['entry']);
    expect(seen).toEqual([['entry']]);
    stop();
    expect(made[0].live).toBe(false);
  });

  it('does nothing when there is no element or no ResizeObserver', () => {
    const calls = [];
    const record = () => calls.push(1);
    observeResize([], record)();
    observeResize([elementIn({})], record)();
    expect(calls).toEqual([]);
  });
});
