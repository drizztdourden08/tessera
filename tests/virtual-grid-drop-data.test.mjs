/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { VirtualGrid } from '../src/composites/VirtualGrid';
import { gridDropCount } from '../src/composites/VirtualGrid/behavior/grid-drop-count';
import { gridDropHandlers } from '../src/composites/VirtualGrid/behavior/grid-drop-handlers';

const said = (count, section) => `${count} dropped into ${section}`;

const FILES = { items: { length: 2 } };

const setup = (section) => {
  let hot = null;
  const setHot = (next) => {
    hot = typeof next === 'function' ? next(hot) : next;
  };
  const announce = vi.fn();
  const handlers = gridDropHandlers({ section: { key: 'a', label: 'Folder A', ...section }, setHot, announce, said });
  return { handlers, announce, hot: () => hot };
};

const event = (data = FILES, extra = {}) => ({ dataTransfer: data, preventDefault: vi.fn(), relatedTarget: null, currentTarget: { contains: () => false }, ...extra });

describe('a section header that takes a native drop', () => {
  it('is no drop target without onDropData', () => {
    expect(setup({}).handlers).toBeUndefined();
    expect(setup({ accepts: () => true }).handlers).toBeUndefined();
  });

  it('accepts a drag over it, marks the header and allows the drop', () => {
    const { handlers, hot } = setup({ onDropData: vi.fn() });
    const over = event();
    handlers.onDragEnter(over);
    expect(over.preventDefault).toHaveBeenCalled();
    expect(hot()).toBe('a');
  });

  it('leaves a drag it does not accept alone, so the browser refuses the drop', () => {
    const { handlers, hot } = setup({ onDropData: vi.fn(), accepts: () => false });
    const over = event();
    handlers.onDragOver(over);
    expect(over.preventDefault).not.toHaveBeenCalled();
    expect(hot()).toBeNull();
  });

  it('asks accepts with the data of the drag', () => {
    const accepts = vi.fn(() => true);
    const { handlers } = setup({ onDropData: vi.fn(), accepts });
    handlers.onDragOver(event());
    expect(accepts).toHaveBeenCalledWith(FILES);
  });

  it('clears the mark when the drag leaves the header, but not for a child of it', () => {
    const { handlers, hot } = setup({ onDropData: vi.fn() });
    handlers.onDragEnter(event());
    handlers.onDragLeave(event(FILES, { relatedTarget: { nodeType: 1 }, currentTarget: { contains: () => true } }));
    expect(hot()).toBe('a');
    handlers.onDragLeave(event());
    expect(hot()).toBeNull();
  });

});

describe('a section header that receives a native drop', () => {
  it('hands the data to the host on drop, announces it and clears the mark', () => {
    const onDropData = vi.fn();
    const { handlers, announce, hot } = setup({ onDropData });
    handlers.onDragEnter(event());
    const drop = event();
    handlers.onDrop(drop);
    expect(drop.preventDefault).toHaveBeenCalled();
    expect(onDropData).toHaveBeenCalledWith(FILES);
    expect(announce).toHaveBeenCalledWith('2 dropped into Folder A');
    expect(hot()).toBeNull();
  });

  it('names the section by its key when the label is not text', () => {
    const { handlers, announce } = setup({ onDropData: vi.fn(), label: { not: 'text' } });
    handlers.onDrop(event());
    expect(announce).toHaveBeenCalledWith('2 dropped into a');
  });

  it('ignores a drop it does not accept', () => {
    const onDropData = vi.fn();
    const { handlers, announce } = setup({ onDropData, accepts: () => false });
    handlers.onDrop(event());
    expect(onDropData).not.toHaveBeenCalled();
    expect(announce).not.toHaveBeenCalled();
  });

  it('draws the live region for the announcement without reorder', () => {
    const draw = (onDropData) => renderToString(h(VirtualGrid, {
      label: 'Folders', getKey: (item) => item, renderItem: (item) => item,
      sections: [{ key: 'a', label: 'A', items: ['x'], onDropData }],
    }));
    expect(draw(() => undefined)).toContain('aria-live="polite"');
    expect(draw(undefined)).not.toContain('aria-live');
  });

  it('counts the items of the drag, and at least one', () => {
    expect(gridDropCount({ items: { length: 3 } })).toBe(3);
    expect(gridDropCount({ items: { length: 0 } })).toBe(1);
  });
});
