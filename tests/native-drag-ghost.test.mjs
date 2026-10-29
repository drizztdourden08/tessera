/* @layer tooling-scripts @kind test */
import { renderToString } from 'react-dom/server';
import { createElement as h } from 'react';
import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { nativeGhostElement } from '../src/composites/DragGhost/behavior/native-ghost-element';
import { startNativeGhost } from '../src/composites/DragGhost/behavior/start-native-ghost';

const DOC = { nodeType: 9 };

const target = () => ({ nodeType: 1, ownerDocument: DOC });

const mounted = (width = 40, height = 20) => {
  const dispose = vi.fn();
  const mount = vi.fn(() => ({ holder: { offsetWidth: width, offsetHeight: height }, dispose }));
  return { mount, dispose };
};

describe('the drag image of a native drag', () => {
  it('draws the ghost with the count and the thumbnails', () => {
    const html = renderToString(nativeGhostElement({ count: 5, thumbnails: [h('b', null, 'T1'), h('b', null, 'T2')] }));
    expect(html).toContain('drag-ghost');
    expect(html).toContain('T1');
    expect(html).toContain('T2');
    expect(html).toContain('>5<');
  });

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

  it('keeps the off screen holder in the style sheet with tokens only', () => {
    const css = readFileSync(new URL('../src/composites/DragGhost/DragGhost.css', import.meta.url), 'utf8');
    expect(css).toMatch(/\.native-drag-ghost \{[^}]*position: fixed;[^}]*inset-block-start: calc\(-1 \* var\(--size-256\)\);/);
  });
});
