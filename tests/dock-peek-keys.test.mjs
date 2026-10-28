/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { useDockKeys } from '../src/composites/DockLayout';
import { Widget } from '../src/composites/Widget';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const widget = (extra = {}) => renderToString(h(Widget, {
  id: 'layers', tabs: [{ id: 'layers', label: 'Layers' }], activeId: 'layers', paneKey: 'p1', opacity: 1,
  onActivateTab: () => undefined, onClose: () => undefined, ...extra,
}, h('button', { id: 'row' }, 'Row')));

const withoutPeek = (html) => html.replace(' widget--peek', '');

const fakeView = () => {
  const listeners = [];
  return {
    addEventListener: (type, fn) => listeners.push({ type, fn }),
    removeEventListener: (type, fn) => listeners.splice(listeners.findIndex((entry) => entry.type === type && entry.fn === fn), 1),
    send: (type, event) => listeners.filter((entry) => entry.type === type).forEach((entry) => entry.fn(event)),
  };
};

const element = (inContent) => ({ nodeType: 1, offsetHeight: 0, isContentEditable: false, tagName: 'BUTTON', closest: () => (inContent ? {} : null) });

const press = (view, keys, key, target) => {
  const event = { key, target, repeat: false, defaultPrevented: false, preventDefault: vi.fn(), stopPropagation: vi.fn() };
  keys.act(() => view.send('keydown', event));
  return event;
};

describe('peeking keeps the widget content mounted', () => {
  it('draws the same content tree whether or not the widget peeks', () => {
    const peeking = widget({ peek: true });
    expect(peeking).toContain('id="row"');
    expect(peeking).toContain('widget--peek');
    expect(withoutPeek(peeking)).toBe(widget({ peek: false }));
  });

  it('keeps the content of a chromeless widget in peek', () => {
    expect(widget({ peek: true, chrome: 'none' })).toContain('id="row"');
  });
});

describe('Alt inside a widget', () => {
  it('does not start a peek and never swallows the key', () => {
    const view = fakeView();
    const keys = mountHook(() => useDockKeys(view));
    const control = element(true);
    const alt = press(view, keys, 'Alt', control);
    expect(keys.current.peek).toBe(false);
    const arrow = press(view, keys, 'ArrowUp', control);
    expect(arrow.preventDefault).not.toHaveBeenCalled();
    expect(arrow.stopPropagation).not.toHaveBeenCalled();
    expect(alt.preventDefault).not.toHaveBeenCalled();
    keys.unmount();
  });

  it('still peeks from anywhere outside widget content', () => {
    const view = fakeView();
    const keys = mountHook(() => useDockKeys(view));
    press(view, keys, 'Alt', element(false));
    expect(keys.current.peek).toBe(true);
    keys.act(() => view.send('keyup', { key: 'Alt', target: null }));
    expect(keys.current.peek).toBe(false);
    keys.unmount();
  });
});
