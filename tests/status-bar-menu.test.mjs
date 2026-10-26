/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { StatusBar } from '../src/composites/StatusBar';
import { StatusBarItem } from '../src/composites/StatusBar/sub-components/StatusBarItem';

const ITEMS = [{ id: 'cursor', label: 'Cursor', value: '24, 17' }, { id: 'zoom', label: 'Zoom', value: '800%' }];

const itemProps = (hook) => StatusBarItem({ item: ITEMS[1], onContextMenu: hook }).props;

const keyEvent = (key, held = {}) => {
  const item = {};
  return { key, target: item, currentTarget: item, altKey: false, ctrlKey: false, metaKey: false, shiftKey: false, ...held, preventDefault: () => undefined };
};

describe('StatusBar item menu hook', () => {
  it('gives the item id on a contextmenu event, on Shift+F10 and on the Menu key', () => {
    const calls = [];
    const props = itemProps((id, event) => calls.push([id, event.type ?? event.key]));
    props.onContextMenu({ type: 'contextmenu' });
    props.onKeyDown(keyEvent('F10', { shiftKey: true }));
    props.onKeyDown(keyEvent('ContextMenu'));
    props.onKeyDown(keyEvent('F10'));
    expect(calls).toEqual([['zoom', 'contextmenu'], ['zoom', 'F10'], ['zoom', 'ContextMenu']]);
  });

  it('makes an item a tab stop only when the hook is given', () => {
    expect(itemProps(() => undefined).tabIndex).toBe(0);
    expect(itemProps(undefined).tabIndex).toBeUndefined();
    expect(itemProps(undefined).onContextMenu).toBeUndefined();
    expect(renderToString(h(StatusBar, { label: 'Status', items: ITEMS }))).not.toContain('tabindex');
  });

  it('passes the hook from the bar to every item', () => {
    const html = renderToString(h(StatusBar, { label: 'Status', items: ITEMS, onItemContextMenu: () => undefined }));
    expect(html.match(/tabindex="0"/g)).toHaveLength(2);
  });
});
