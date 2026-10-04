/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Widget } from '../src/composites/Widget';
import { FLOAT_MIN, RESIZE_EDGES } from '../src/composites/DockLayout/DockLayout.constants';
import { resizeRect } from '../src/composites/DockLayout/behavior/resize-rect';

const START = { x: 100, y: 100, width: 300, height: 200 };
const LIMITS = { bounds: { x: 50, y: 40, width: 800, height: 500 }, min: FLOAT_MIN };
const move = (x, y) => ({ x, y });

describe('a free widget resized by its edges and corners', () => {
  it('has a handle on every edge and corner', () => {
    expect([...RESIZE_EDGES].sort()).toEqual(['e', 'n', 'ne', 'nw', 's', 'se', 'sw', 'w']);
  });

  it('moves only the side it is held by, and the far side stays put', () => {
    expect(resizeRect(START, 'e', move(40, 30), LIMITS)).toEqual({ x: 100, y: 100, width: 340, height: 200 });
    expect(resizeRect(START, 'w', move(-40, 30), LIMITS)).toEqual({ x: 60, y: 100, width: 340, height: 200 });
    expect(resizeRect(START, 's', move(40, 30), LIMITS)).toEqual({ x: 100, y: 100, width: 300, height: 230 });
    expect(resizeRect(START, 'n', move(40, -30), LIMITS)).toEqual({ x: 100, y: 70, width: 300, height: 230 });
    expect(resizeRect(START, 'nw', move(-10, -20), LIMITS)).toEqual({ x: 90, y: 80, width: 310, height: 220 });
    expect(resizeRect(START, 'se', move(10, 20), LIMITS)).toEqual({ x: 100, y: 100, width: 310, height: 220 });
  });

  it('never shrinks below the minimum size', () => {
    expect(resizeRect(START, 'se', move(-900, -900), LIMITS)).toEqual({ x: 100, y: 100, ...FLOAT_MIN });
    expect(resizeRect(START, 'nw', move(900, 900), LIMITS)).toEqual({ x: 400 - FLOAT_MIN.width, y: 300 - FLOAT_MIN.height, ...FLOAT_MIN });
  });

  it('never grows past the main view it floats over', () => {
    expect(resizeRect(START, 'se', move(5000, 5000), LIMITS)).toEqual({ x: 100, y: 100, width: 750, height: 440 });
    expect(resizeRect(START, 'nw', move(-5000, -5000), LIMITS)).toEqual({ x: 50, y: 40, width: 350, height: 260 });
  });

  it('keeps to the room there is when the main view is smaller than the minimum', () => {
    const tight = { bounds: { x: 0, y: 0, width: 120, height: 80 }, min: FLOAT_MIN };
    expect(resizeRect({ x: 0, y: 0, width: 120, height: 80 }, 'se', move(-500, -500), tight)).toEqual({ x: 0, y: 0, width: 120, height: 80 });
  });
});

describe('the widget body', () => {
  it('scrolls in a slim ScrollArea with no fade', () => {
    const html = renderToString(h(Widget, {
      id: 'perf', tabs: [{ id: 'perf', label: 'Performance' }], activeId: 'perf', paneKey: null, opacity: 1,
      onActivateTab: () => undefined, onOpenOptions: () => undefined, onClose: () => undefined,
    }, h('p', null, 'Frame time')));
    expect(html).toMatch(/class="scroll-area widget__content widget__content--pad-sm"[^>]*data-axis="both"[^>]*data-scrollbar="slim"/);
  });
});
