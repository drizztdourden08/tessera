/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { Tree } from '../src/composites/Tree';
import { dragOutStart } from '../src/composites/Tree/behavior/drag-out-start';
import { pointerHandlersOf } from '../src/composites/Tree/behavior/pointer-handlers-of';
import { ACCESS as base, ITEMS } from './fixtures/tree/tree-items.mjs';

const OPEN = { label: 'Files', items: ITEMS, defaultExpandedKeys: ['a'] };

const draw = (extra = {}) => renderToString(h(Tree, { ...OPEN, ...base, getLabel: (item) => item.name, ...extra }));

const dragEvent = (extra = {}) => {
  const row = {};
  return { target: row, currentTarget: row, preventDefault: vi.fn(), dataTransfer: { effectAllowed: 'none', setData: vi.fn(), setDragImage: vi.fn() }, altKey: false, ...extra };
};

const request = (extra = {}) => ({ keys: ['a', 'b'], onDragOut: vi.fn(), ghost: { onDragStart: vi.fn() }, renderThumbnail: undefined, held: false, ...extra });

describe('Tree trail', () => {
  it('shows the trail at rest by default and marks the tree when it is hover only', () => {
    expect(draw({ renderTrail: () => 'x' })).not.toContain('data-trail');
    expect(draw({ trail: 'always' })).toContain('data-trail="always"');
    expect(draw({ trail: 'hover', renderTrail: () => 'x' })).toContain('data-trail="hover"');
  });
});

describe('Tree drag out', () => {
  it('makes rows draggable only with onDragOut', () => {
    expect(draw()).not.toContain('draggable');
    expect((draw({ onDragOut: () => undefined }).match(/draggable="true"/g) ?? []).length).toBe(5);
  });

  it('hands the keys to the app, sets the effect and starts the ghost with a count', () => {
    const event = dragEvent();
    const ask = request({ renderThumbnail: (key) => `t-${key}` });
    dragOutStart(event, ask);
    expect(event.dataTransfer.effectAllowed).toBe('copyMove');
    expect(ask.onDragOut).toHaveBeenCalledWith(['a', 'b'], event);
    expect(ask.ghost.onDragStart).toHaveBeenCalledWith(event, { count: 2, thumbnails: ['t-a', 't-b'] });
  });

  it('cancels the native drag while a reorder or a button press holds the gesture', () => {
    const event = dragEvent();
    const ask = request({ held: true });
    dragOutStart(event, ask);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(ask.onDragOut).not.toHaveBeenCalled();
    expect(ask.ghost.onDragStart).not.toHaveBeenCalled();
  });

  it('leaves a drag that starts on a child of the row alone', () => {
    const event = dragEvent({ target: {} });
    const ask = request();
    dragOutStart(event, ask);
    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(ask.onDragOut).not.toHaveBeenCalled();
  });
});

describe('Tree pointer with a drag out', () => {
  const press = (extra = {}) => ({ target: {}, clientX: 1, clientY: 1, altKey: false, pointerType: 'mouse', ...extra });
  const base0 = () => ({ onPointerDown: vi.fn(), onPointerMove: vi.fn(), onPointerUp: vi.fn(), onPointerCancel: vi.fn() });

  it('starts the reorder on a plain press when the drag out is off', () => {
    const base1 = base0();
    pointerHandlersOf(base1, { down: null, moved: false }, false).onPointerDown(press());
    expect(base1.onPointerDown).toHaveBeenCalled();
  });

  it('leaves a plain mouse press to the native drag and reorders with Alt or a touch', () => {
    const base1 = base0();
    const handlers = pointerHandlersOf(base1, { down: null, moved: false }, true);
    handlers.onPointerDown(press());
    expect(base1.onPointerDown).not.toHaveBeenCalled();
    handlers.onPointerDown(press({ altKey: true }));
    handlers.onPointerDown(press({ pointerType: 'touch' }));
    expect(base1.onPointerDown).toHaveBeenCalledTimes(2);
  });
});
