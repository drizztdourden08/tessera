/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { startNativeGhost } from '../src/composites/DragGhost/behavior/start-native-ghost';

const DOC = { nodeType: 9 };

const target = () => ({ nodeType: 1, ownerDocument: DOC });

const mounted = (width = 40, height = 20) => {
  const dispose = vi.fn();
  const mount = vi.fn(() => ({ holder: { offsetWidth: width, offsetHeight: height }, dispose }));
  return { mount, dispose };
};

describe('K1 the drag image of a native drag', { tags: ['critical'] }, () => {
  it('mounts the ghost in the document of the dragged element and sets it as the drag image at its centre', () => {
    const setDragImage = vi.fn();
    const { mount } = mounted(40, 20);
    startNativeGhost({ dataTransfer: { setDragImage }, currentTarget: target() }, { count: 3 }, mount);
    expect(mount).toHaveBeenCalledWith(DOC, { count: 3 });
    expect(setDragImage).toHaveBeenCalledWith(mount.mock.results[0].value.holder, 20, 10);
  });

  it('takes the ghost down after the browser has taken its picture', () => {
    vi.useFakeTimers();
    try {
      const { mount, dispose } = mounted();
      startNativeGhost({ dataTransfer: { setDragImage: vi.fn() }, currentTarget: target() }, { count: 2 }, mount);
      expect(dispose).not.toHaveBeenCalled();
      vi.runAllTimers();
      expect(dispose).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });

  it('does nothing for an empty drag or an event without a data transfer', () => {
    const { mount } = mounted();
    const setDragImage = vi.fn();
    startNativeGhost({ dataTransfer: { setDragImage }, currentTarget: target() }, { count: 0 }, mount);
    startNativeGhost({ dataTransfer: null, currentTarget: target() }, { count: 2 }, mount);
    expect(mount).not.toHaveBeenCalled();
    expect(setDragImage).not.toHaveBeenCalled();
  });
});
