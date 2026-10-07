/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { WIDGET_OPTIONS_ATTRIBUTE, WidgetOptions } from '../src/composites/Widget';

const room = vi.hoisted(() => ({ width: 0 }));

vi.mock('../src/primitives/Portal/Portal', () => ({ Portal: ({ children }) => children }));
vi.mock('../src/composites/ControlMenu/behavior/sub-room', () => ({ subRoom: () => room.width }));
vi.mock('../src/composites/ControlMenu/behavior/useSubOpen', () => ({
  useSubOpen: () => ({ open: 'focus', hover: vi.fn(), focus: vi.fn(), leave: vi.fn(), back: vi.fn() }),
}));

const draw = (width) => {
  room.width = width;
  return renderToStaticMarkup(h(WidgetOptions, {
    title: 'Log',
    placement: 'float',
    makeRoom: false,
    opacity: 92,
    show: 'always',
    onDock: vi.fn(),
    onFloat: vi.fn(),
    onMakeRoomChange: vi.fn(),
    onOpacityChange: vi.fn(),
    onShowChange: vi.fn(),
    onReset: vi.fn(),
    defaultOpen: true,
  }));
};

const marked = (html) => (html.match(/<div [^>]*>/g) ?? [])
  .filter((tag) => tag.includes(`${WIDGET_OPTIONS_ATTRIBUTE}=""`))
  .map((tag) => (tag.match(/(?:aria-label|class)="[^"]*"/g) ?? []).join(' '));

describe('the widget options attribute', () => {
  it('is named data-widget-options', () => {
    expect(WIDGET_OPTIONS_ATTRIBUTE).toBe('data-widget-options');
  });

  it('sits on the options panel and on the Shortcuts panel drawn beside it, and on nothing else', () => {
    const [panel, sub, ...rest] = marked(draw(400));
    expect(panel).toContain('widget-options');
    expect(panel).toContain('dropdown-surface');
    expect(sub).toContain('control-menu__sub-panel');
    expect(sub).toContain('dropdown-menu--sub');
    expect(sub).toContain('aria-label="Shortcuts"');
    expect(rest).toEqual([]);
  });

  it('sits on the Shortcuts panel drawn under its row when the side has no room', () => {
    const [panel, sub, ...rest] = marked(draw(0));
    expect(panel).toContain('widget-options');
    expect(sub).toContain('control-menu__sub-panel--under');
    expect(sub).toContain('aria-label="Shortcuts"');
    expect(rest).toEqual([]);
  });
});
