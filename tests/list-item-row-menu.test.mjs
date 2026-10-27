/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { ListItemRow } from '../src/composites/ListItemRow';

const seen = vi.hoisted(() => []);

vi.mock('../src/primitives/Pressable', () => ({
  Pressable: (props) => {
    seen.push(props);
    return null;
  },
}));

describe('ListItemRow menu pass-through', () => {
  it('hands onContextMenu and onKeyDown to the focusable row button', () => {
    const onContextMenu = vi.fn();
    const onKeyDown = vi.fn();
    renderToString(h(ListItemRow, { name: 'Friday async', onClick: () => undefined, onContextMenu, onKeyDown }));
    const button = seen.at(-1);
    button.onContextMenu({ type: 'contextmenu' });
    button.onKeyDown({ key: 'F10', shiftKey: true });
    expect(onContextMenu).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalledWith({ key: 'F10', shiftKey: true });
  });
});
