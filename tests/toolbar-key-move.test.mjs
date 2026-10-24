/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DEFS, FRAME, LAYOUT } from './fixtures/toolbar-dock/toolbar-dock-frame.mjs';
import { ToolbarDock, moveToolbar } from '../src/composites/ToolbarDock';
import { toolbarDropLayout } from '../src/composites/ToolbarDock/behavior/toolbar-drop-layout';
import { toolbarKeyMessage } from '../src/composites/ToolbarDock/behavior/toolbar-key-message';
import { toolbarKeyStart } from '../src/composites/ToolbarDock/behavior/toolbar-key-start';
import { toolbarKeyStep } from '../src/composites/ToolbarDock/behavior/toolbar-key-step';
import { toolbarPickTarget } from '../src/composites/ToolbarDock/behavior/toolbar-pick-target';
import { TESSERA_STRINGS } from '../src/primitives/strings/tessera-strings.constants';

const lane = (side, index) => ({ kind: 'lane', side, index });

const step = (id, pick, key) => toolbarKeyStep(LAYOUT, id, pick, key);

describe('toolbarKeyStart', () => {
  it('begins on the lane the toolbar already holds', () => {
    expect(toolbarKeyStart(LAYOUT, 'a')).toEqual(lane('top', 0));
    expect(toolbarKeyStart(LAYOUT, 'b')).toEqual(lane('top', 1));
    expect(toolbarKeyStart(LAYOUT, 'c')).toEqual(lane('left', 0));
  });
});

describe('toolbarKeyStep arrows', () => {
  it('moves to the outer lane of the side the arrow points to', () => {
    expect(step('c', lane('left', 0), 'ArrowRight')).toEqual({ pick: lane('right', 0), note: { kind: 'place', side: 'right', index: 0 }, end: null });
    expect(step('c', lane('left', 0), 'ArrowDown').pick).toEqual(lane('bottom', 0));
    expect(step('d', lane('bottom', 0), 'ArrowLeft').pick).toEqual(lane('left', 0));
  });

  it('switches between the outer and inner lane on the same arrow', () => {
    const once = step('c', lane('left', 0), 'ArrowDown');
    const twice = step('c', once.pick, 'ArrowDown');
    expect(twice.pick).toEqual(lane('bottom', 1));
    expect(step('c', twice.pick, 'ArrowDown').pick).toEqual(lane('bottom', 0));
  });

  it('stays on the outer lane of an empty side', () => {
    const once = step('c', lane('left', 0), 'ArrowRight');
    expect(step('c', once.pick, 'ArrowRight').pick).toEqual(lane('right', 0));
  });

  it('skips a full side and announces it', () => {
    const result = step('c', lane('left', 0), 'ArrowUp');
    expect(result.pick).toEqual(lane('left', 0));
    expect(result.note).toEqual({ kind: 'full', side: 'top' });
  });

  it('lets a toolbar switch lanes on its own full side', () => {
    expect(step('a', lane('top', 0), 'ArrowUp').pick).toEqual(lane('top', 1));
  });

  it('leaves the basket for the side of the arrow', () => {
    expect(step('c', { kind: 'basket' }, 'ArrowLeft').pick).toEqual(lane('left', 0));
  });
});

describe('toolbarKeyStep other keys', () => {
  it('sends the pick to the basket on Delete', () => {
    expect(step('c', lane('left', 0), 'Delete')).toEqual({ pick: { kind: 'basket' }, note: { kind: 'hide' }, end: null });
  });

  it('drops on Enter and keeps the pick', () => {
    expect(step('c', lane('right', 0), 'Enter')).toEqual({ pick: lane('right', 0), note: null, end: 'drop' });
  });

  it('cancels on Escape and restores the first pick', () => {
    expect(step('c', lane('bottom', 1), 'Escape')).toEqual({ pick: lane('left', 0), note: null, end: 'cancel' });
  });

  it('ignores any other key', () => {
    expect(step('c', lane('left', 0), 'a')).toBeNull();
  });
});

describe('toolbarPickTarget', () => {
  it('gives the slot of the lane with the thickness of its side', () => {
    expect(toolbarPickTarget(FRAME, LAYOUT, 'c', lane('right', 0))).toMatchObject({ kind: 'lane', side: 'right', rect: { x: 752, width: 48 } });
    expect(toolbarPickTarget(FRAME, LAYOUT, 'c', lane('bottom', 1))).toMatchObject({ kind: 'lane', rect: { y: 520, height: 40 } });
  });

  it('points at the basket', () => {
    expect(toolbarPickTarget(FRAME, LAYOUT, 'c', { kind: 'basket' })).toEqual({ kind: 'basket' });
  });
});

describe('drop layout', () => {
  const drop = (layout, id, pick) => toolbarDropLayout(layout, id, toolbarPickTarget(FRAME, layout, id, pick));

  it('returns the same layout when the toolbar is dropped where it is', () => {
    expect(drop(LAYOUT, 'a', lane('top', 0))).toBe(LAYOUT);
    expect(drop(LAYOUT, 'b', lane('top', 1))).toBe(LAYOUT);
    expect(drop(LAYOUT, 'c', lane('left', 0))).toBe(LAYOUT);
  });

  it('keeps the same layout when the saved spot was never recorded', () => {
    const bare = { ...LAYOUT, last: {} };
    expect(drop(bare, 'c', lane('left', 0))).toBe(bare);
  });

  it('moves and hides', () => {
    expect(drop(LAYOUT, 'c', lane('right', 0)).sides.right).toEqual(['c']);
    expect(drop(LAYOUT, 'c', { kind: 'basket' }).hidden).toEqual(['c']);
    expect(drop(moveToolbar(LAYOUT, 'd', 'left', 0), 'c', lane('left', 1)).sides.left).toEqual(['d', 'c']);
  });
});

describe('announcements', () => {
  const words = TESSERA_STRINGS.toolbars;

  it('names the side and the lane', () => {
    expect(toolbarKeyMessage(words, 'Tools', { kind: 'place', side: 'left', index: 0 })).toBe('Tools: left, outer lane');
    expect(toolbarKeyMessage(words, 'Tools', { kind: 'place', side: 'top', index: 1 })).toBe('Tools: top, inner lane');
    expect(toolbarKeyMessage(words, 'Tools', { kind: 'full', side: 'top' })).toBe('Tools: top is full');
  });
});

describe('ToolbarDock keyboard render', () => {
  it('mounts a polite live region and the guide closed', () => {
    const html = renderToString(h(ToolbarDock, {
      layout: LAYOUT,
      onLayoutChange: () => undefined,
      definitions: DEFS,
      renderToolbar: (id, slot) => h('span', { ...slot.handle }, id),
    }));
    expect(html).toContain('role="status"');
    expect(html).toContain('window-guide');
    expect(html).not.toContain('window-guide--open');
  });
});
