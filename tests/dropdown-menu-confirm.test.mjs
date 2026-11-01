/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { closesOnPick } from '../src/composites/DropdownMenu/behavior/closes-on-pick';
import { menuColumns } from '../src/composites/DropdownMenu/behavior/menu-columns';
import { ITEM_STRINGS } from '../src/primitives/strings/items-strings.constants';

const RESET = { id: 'reset', icon: 'rotate-ccw', label: 'Reset layout', kind: 'confirm', onSelect: () => undefined };

describe('K1 a confirm item', { tags: ['critical'] }, () => {
  it('adds no mark column and closes the menu once it runs', () => {
    expect(menuColumns([RESET]).marks).toBe(false);
    expect(closesOnPick('confirm', true)).toBe(true);
    expect(closesOnPick('check', true)).toBe(false);
  });
});

describe('K1 the words of the question', { tags: ['critical'] }, () => {
  it('lower the first letter of the label and keep a short capital word', () => {
    expect(ITEM_STRINGS.confirmAgain('Reset layout')).toBe('Click again to reset layout');
    expect(ITEM_STRINGS.confirmAgain('API keys reset')).toBe('Click again to API keys reset');
  });
});
