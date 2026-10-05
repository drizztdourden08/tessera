/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ControlMenu, ControlMenuRow } from '../src/composites/ControlMenu';
import { matchesText } from '../src/data/text/matches-text';
import { shiftInto } from '../src/composites/ControlMenu/behavior/shift-into';
import { dropPlacement } from '../src/primitives/listbox/drop-placement';

const VIEW = { innerWidth: 1000, innerHeight: 800, getComputedStyle: () => ({ borderBottomWidth: '1px', borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px' }) };
const box = (left, width) => ({ top: 100, bottom: 124, left, right: left + width, width, height: 24 });

describe('ControlMenu', () => {
  it('draws only its trigger until it opens, as a button that opens a dialog', () => {
    const html = renderToString(h(ControlMenu, { trigger: { label: 'View options' } }, h(ControlMenuRow, { label: 'Zoom' }, 'control')));
    expect(html).toContain('aria-haspopup="dialog"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).not.toContain('control-menu__row');
  });

  it('filters rows by label, ignoring case and spaces around the query', () => {
    expect(matchesText('Main view', '  VIEW ')).toBe(true);
    expect(matchesText('Main view', '')).toBe(true);
    expect(matchesText('Opacity', 'pin')).toBe(false);
  });

  it('shifts a fallback panel back inside the window, start edge first', () => {
    expect(shiftInto(900, 1100, 1000, 8)).toBe(-108);
    expect(shiftInto(-20, 100, 1000, 8)).toBe(28);
    expect(shiftInto(100, 200, 1000, 8)).toBe(0);
  });
});

describe('the listbox drop alignment', () => {
  it('lines up with the start of its trigger by default, as Select and DropdownMenu do', () => {
    const placed = dropPlacement(null, box(900, 30), VIEW, {});
    expect(placed).toMatchObject({ end: false, left: 900, maxWidth: 92 });
  });

  it('lines up with the end of its trigger, with the room to the left of it', () => {
    const placed = dropPlacement(null, box(900, 30), VIEW, { align: 'end' });
    expect(placed).toMatchObject({ end: true, right: 70, maxWidth: 922 });
  });

  it('takes the side with more room when set to auto', () => {
    expect(dropPlacement(null, box(900, 30), VIEW, { align: 'auto' }).end).toBe(true);
    expect(dropPlacement(null, box(40, 30), VIEW, { align: 'auto' }).end).toBe(false);
  });
});
