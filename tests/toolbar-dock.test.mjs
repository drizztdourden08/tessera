/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ToolbarDock, createToolbarLayout, toolbarOrientation } from '../src/composites/ToolbarDock';

const def = (id, defaultSide, extra = {}) => ({ id, label: `Label ${id}`, defaultSide, ...extra });

const DEFS = [def('a', 'top'), def('b', 'top'), def('c', 'left'), def('d', 'bottom'), def('e', 'right', { hiddenByDefault: true })];

const slots = [];
const draw = (props = {}) => {
  slots.length = 0;
  return renderToString(h(ToolbarDock, {
    layout: createToolbarLayout(DEFS),
    onLayoutChange: () => undefined,
    definitions: DEFS,
    renderToolbar: (id, slot) => {
      slots.push([id, slot]);
      return h('span', { 'data-bar': id, 'data-o': slot.orientation, ...slot.handle });
    },
    ...props,
  }, h('p', { id: 'work' }, 'work area')));
};

describe('K1 toolbarOrientation', { tags: ['critical'] }, () => {
  it.each([['top', 'horizontal'], ['bottom', 'horizontal'], ['left', 'vertical'], ['right', 'vertical']])('the %s side is %s', (side, expected) => {
    expect(toolbarOrientation(side)).toBe(expected);
  });

  it('is handed to renderToolbar with the side', () => {
    draw();
    const byId = Object.fromEntries(slots);
    expect(byId.a).toMatchObject({ orientation: 'horizontal', side: 'top' });
    expect(byId.c).toMatchObject({ orientation: 'vertical', side: 'left' });
    expect(byId.d).toMatchObject({ orientation: 'horizontal', side: 'bottom' });
  });
});

describe('K1 ToolbarDock content', { tags: ['critical'] }, () => {
  it('does not render a hidden toolbar', () => {
    const html = draw();
    expect(html).not.toContain('data-bar="e"');
    expect(slots.map(([id]) => id)).toEqual(['a', 'b', 'c', 'd']);
  });

  it('does not render a toolbar without a definition', () => {
    const html = draw({ definitions: DEFS.filter((entry) => entry.id !== 'b') });
    expect(html).not.toContain('data-bar="b"');
  });
});
