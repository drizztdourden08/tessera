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
    expect(html.match(/data-side="top"/g)).toHaveLength(2);
  });

  it('marks each lane with its side and orientation', () => {
    const html = draw();
    expect(html).toMatch(/data-side="top"[^>]*data-orientation="horizontal"/);
    expect(html).toMatch(/data-side="left"[^>]*data-orientation="vertical"/);
  });

  it('leaves out a side with no toolbar', () => {
    expect(draw()).not.toContain('data-side="right"');
  });
});

describe('ToolbarDock grid', () => {
  it('places each lane on the root grid through custom properties', () => {
    const html = draw();
    expect(html).toMatch(/data-side="top"[^>]*data-lane="0"[^>]*--toolbar-dock-row:1 \/ 2;--toolbar-dock-column:1 \/ 6;--toolbar-dock-tracks:minmax\(0, 1fr\)/);
    expect(html).toMatch(/data-side="top"[^>]*data-lane="1"[^>]*--toolbar-dock-row:2 \/ 3;--toolbar-dock-column:1 \/ 6/);
    expect(html).toMatch(/data-side="left"[^>]*--toolbar-dock-row:3 \/ 6;--toolbar-dock-column:1 \/ 2/);
    expect(html).toMatch(/data-side="bottom"[^>]*--toolbar-dock-row:5 \/ 6;--toolbar-dock-column:2 \/ 6/);
  });

  it('puts each bar on its own track and gaps on tracks of their own', () => {
    const layout = createToolbarLayout(DEFS);
    layout.sides.top[0] = [{ id: 'a', start: 0.2, size: 0.3 }, { id: 'b', start: 0.6, size: 0.2 }];
    layout.sides.top.length = 1;
    layout.corners['top-left'] = ['h'];
    layout.corners['top-right'] = ['h'];
    const html = draw({ layout });
    expect(html).toContain('--toolbar-dock-tracks:minmax(0, 0.2fr) minmax(0, 0.3fr) minmax(0, 0.1fr) minmax(0, 0.2fr) minmax(0, 0.2fr)');
    expect(html).toMatch(/class="toolbar-dock__bar"[^>]*--toolbar-dock-track:2[^>]*><[^>]*data-bar="a"/);
    expect(html).toMatch(/class="toolbar-dock__bar"[^>]*--toolbar-dock-track:4[^>]*><[^>]*data-bar="b"/);
  });
});

describe('ToolbarDock bars', () => {
  it('wraps each shown toolbar in one bar', () => {
    const html = draw();
    expect(html.match(/class="toolbar-dock__bar"/g)).toHaveLength(4);
    expect(html).toMatch(/class="toolbar-dock__bar"[^>]*><[^>]*data-bar="a"/);
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
