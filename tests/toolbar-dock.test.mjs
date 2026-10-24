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

describe('toolbarOrientation', () => {
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

describe('ToolbarDock lanes', () => {
  it('draws the outer lane first, index 0 before index 1', () => {
    const html = draw();
    expect(html.indexOf('data-bar="a"')).toBeLessThan(html.indexOf('data-bar="b"'));
    expect(html).toContain('data-lane="0"');
    expect(html).toContain('data-lane="1"');
    expect(html.match(/data-side="top"/g)).toHaveLength(1);
  });

  it('puts the lanes of a side in one element marked with that side', () => {
    const html = draw();
    expect(html).toMatch(/data-side="top"[^>]*data-orientation="horizontal"/);
    expect(html).toMatch(/data-side="left"[^>]*data-orientation="vertical"/);
  });

  it('leaves out a side with no toolbar', () => {
    expect(draw()).not.toContain('data-side="right"');
  });
});

describe('ToolbarDock content', () => {
  it('holds the children in the centre cell', () => {
    const html = draw();
    expect(html).toMatch(/class="toolbar-dock__centre"[^>]*><p id="work">work area<\/p>/);
  });

  it('does not render a hidden toolbar', () => {
    const html = draw();
    expect(html).not.toContain('data-bar="e"');
    expect(slots.map(([id]) => id)).toEqual(['a', 'b', 'c', 'd']);
  });

  it('does not render a toolbar without a definition', () => {
    const html = draw({ definitions: DEFS.filter((entry) => entry.id !== 'b') });
    expect(html).not.toContain('data-bar="b"');
  });

  it('gives each handle the drag attribute and a name', () => {
    const html = draw();
    expect(html).toContain('data-drag-toolbar="a"');
    expect(html).toContain('aria-label="Move Label a"');
  });

  it('adds the class name to the root', () => {
    expect(draw({ className: 'extra' })).toContain('class="toolbar-dock extra"');
  });
});
