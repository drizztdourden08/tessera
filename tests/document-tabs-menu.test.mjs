/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { tabContextMenu } from '../src/composites/DocumentTabs/behavior/tab-context-menu';
import { tabKeys } from '../src/composites/DocumentTabs/behavior/tab-keys';

const ignore = () => undefined;

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

describe('K1 DocumentTabs menu hook', { tags: ['critical'] }, () => {
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
