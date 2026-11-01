/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { closeChord } from '../src/composites/DocumentTabs/behavior/close-chord';
import { focusStep } from '../src/composites/DocumentTabs/behavior/focus-step';
import { middleClose } from '../src/composites/DocumentTabs/behavior/middle-close';
import { tabbableId } from '../src/composites/DocumentTabs/behavior/tabbable-id';

const TABS = [
  { id: 'hero', title: 'hero.bxl', icon: 'image', tooltip: 'art/hero.bxl' },
  { id: 'tiles', title: 'tiles.bxl', unsaved: true },
  { id: 'logo', title: 'logo.bxl' },
];

const keyEvent = (key, held = {}) => ({ key, altKey: false, ctrlKey: false, metaKey: false, shiftKey: false, ...held });

describe('K1 DocumentTabs keys', { tags: ['critical'] }, () => {
  it('moves focus on the plain arrows with wrap, and to the ends on Home and End', () => {
    expect(focusStep(keyEvent('ArrowRight'), 0, 3)).toBe(1);
    expect(focusStep(keyEvent('ArrowLeft'), 0, 3)).toBe(2);
    expect(focusStep(keyEvent('Home'), 2, 3)).toBe(0);
    expect(focusStep(keyEvent('End'), 0, 3)).toBe(2);
    expect(focusStep(keyEvent('ArrowRight'), 0, 1)).toBeUndefined();
  });

  it('leaves the Alt chord to the move', () => {
    expect(focusStep(keyEvent('ArrowRight', { altKey: true }), 0, 3)).toBeUndefined();
    expect(focusStep(keyEvent('End', { ctrlKey: true }), 0, 3)).toBeUndefined();
  });

  it('closes on Delete and on Ctrl and W, and on nothing else', () => {
    expect(closeChord(keyEvent('Delete'))).toBe(true);
    expect(closeChord(keyEvent('w', { ctrlKey: true }))).toBe(true);
    expect(closeChord(keyEvent('W', { ctrlKey: true }))).toBe(true);
    expect(closeChord(keyEvent('w'))).toBe(false);
    expect(closeChord(keyEvent('Delete', { altKey: true }))).toBe(false);
    expect(closeChord(keyEvent('Backspace'))).toBe(false);
  });

  it('picks the focused tab, then the active one, then the first for the tab stop', () => {
    expect(tabbableId(TABS, 'logo', 'tiles')).toBe('logo');
    expect(tabbableId(TABS, null, 'tiles')).toBe('tiles');
    expect(tabbableId(TABS, 'gone', 'gone')).toBe('hero');
    expect(tabbableId([], null, undefined)).toBeUndefined();
  });

  it('closes on a middle click only', () => {
    const calls = [];
    const press = middleClose(() => calls.push('closed'));
    const event = (button) => ({ button, preventDefault: () => calls.push(`stopped ${button}`) });
    press.onAuxClick(event(2));
    press.onMouseDown(event(0));
    expect(calls).toEqual([]);
    press.onMouseDown(event(1));
    press.onAuxClick(event(1));
    expect(calls).toEqual(['stopped 1', 'stopped 1', 'closed']);
  });
});
