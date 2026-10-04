/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { ListItemRow } from '../src/composites/ListItemRow';
import { rowActivate } from '../src/composites/ListItemRow/behavior/row-activate';

const KEYBOARD = 0;
const MOUSE = 1;

describe('ListItemRow action', () => {
  it('shows the action at all times by default', () => {
    const html = renderToString(h(ListItemRow, { name: 'Friday async', action: h('button', null, 'Join') }));
    expect(html).toContain('list-item-row__action list-item-row__action--always');
  });

  it('waits for hover or focus only when asked', () => {
    const html = renderToString(h(ListItemRow, { name: 'Friday async', action: h('button', null, 'Join'), actionVisibility: 'hover' }));
    expect(html).toContain('list-item-row__action--hover');
  });
});

describe('ListItemRow keys', () => {
  it('runs onClick for Enter and Space as for a click, never onDoubleClick', () => {
    const onClick = vi.fn();
    const onDoubleClick = vi.fn();
    rowActivate({ onClick, onDoubleClick }, KEYBOARD);
    rowActivate({ onClick, onDoubleClick }, MOUSE);
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onDoubleClick).not.toHaveBeenCalled();
  });

  it('opens a row that has only onDoubleClick from the keyboard, but not on a single click', () => {
    const onDoubleClick = vi.fn();
    rowActivate({ onDoubleClick }, MOUSE);
    expect(onDoubleClick).not.toHaveBeenCalled();
    rowActivate({ onDoubleClick }, KEYBOARD);
    expect(onDoubleClick).toHaveBeenCalledTimes(1);
  });

  it('draws the main part as a native button, so Enter and Space both press it', () => {
    const html = renderToString(h(ListItemRow, { name: 'Friday async', onClick: () => undefined }));
    expect(html).toMatch(/<button type="button" class="pressable list-item-row__main"/);
  });
});
