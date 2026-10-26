/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DocumentTabs } from '../src/composites/DocumentTabs';
import { tabContextMenu } from '../src/composites/DocumentTabs/behavior/tab-context-menu';
import { tabKeys } from '../src/composites/DocumentTabs/behavior/tab-keys';

const ignore = () => undefined;
const TABS = [{ id: 'hero', title: 'hero.bxl' }, { id: 'tiles', title: 'tiles.bxl' }, { id: 'logo', title: 'logo.bxl' }];

const draw = (props) => renderToString(h(DocumentTabs, {
  tabs: TABS, activeId: 'tiles', onActivate: ignore, onClose: ignore, onMove: ignore, ...props,
}));

const fakeTab = (key, index) => {
  const tab = {
    nodeType: 1,
    offsetHeight: 0,
    dataset: { reorderKey: key, reorderIndex: String(index) },
    closest: () => tab,
  };
  return tab;
};

const keyEvent = (target, key, held = {}, onStop = ignore) => ({
  key, target, altKey: false, ctrlKey: false, metaKey: false, shiftKey: false, ...held, preventDefault: onStop,
});

describe('DocumentTabs menu hook', () => {
  const list = { current: null };

  it('fires with the tab id on a contextmenu event', () => {
    const calls = [];
    const event = { target: fakeTab('tiles', 1), type: 'contextmenu' };
    tabContextMenu(list, (id, seen) => calls.push([id, seen]))(event);
    expect(calls).toEqual([['tiles', event]]);
  });

  it('fires on Shift+F10 and on the Menu key, and stops the browser default', () => {
    const calls = [];
    let stopped = 0;
    const press = tabKeys(list, { total: 3, move: ignore, close: ignore, menu: (id) => calls.push(id) });
    const tab = fakeTab('logo', 2);
    const stop = () => { stopped += 1; };
    press(keyEvent(tab, 'F10', { shiftKey: true }, stop));
    press(keyEvent(tab, 'ContextMenu', {}, stop));
    press(keyEvent(tab, 'F10'));
    expect(calls).toEqual(['logo', 'logo']);
    expect(stopped).toBe(2);
  });

  it('leaves the other keys alone when no hook is given', () => {
    const closed = [];
    const press = tabKeys(list, { total: 3, move: ignore, close: (id) => closed.push(id) });
    const tab = fakeTab('hero', 0);
    press(keyEvent(tab, 'F10', { shiftKey: true }));
    press(keyEvent(tab, 'Delete'));
    expect(closed).toEqual(['hero']);
  });
});

describe('DocumentTabs add button', () => {
  it('draws a labelled + button after the last tab, inside the strip, only with onAdd', () => {
    const html = draw({ onAdd: ignore });
    const add = html.indexOf('document-tabs__add');
    expect(add).toBeGreaterThan(html.lastIndexOf('data-reorder-key'));
    expect(html.slice(add)).toMatch(/<button[^>]*aria-label="New document"/);
    expect(draw()).not.toContain('document-tabs__add');
    expect(draw()).not.toContain('New document');
  });

  it('keeps the + button when there are no tabs, and draws nothing without onAdd', () => {
    const html = draw({ tabs: [], onAdd: ignore });
    expect(html).toMatch(/<button[^>]*aria-label="New document"/);
    expect(html).not.toContain('role="tablist"');
    expect(draw({ tabs: [] })).toBe('');
  });
});
