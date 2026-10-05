/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DropdownMenu } from '../src/composites/DropdownMenu';
import { closesOnPick } from '../src/composites/DropdownMenu/behavior/closes-on-pick';
import { menuColumns } from '../src/composites/DropdownMenu/behavior/menu-columns';
import { MenuLabel } from '../src/composites/DropdownMenu/sub-components/MenuLabel';
import { ConfirmIconButton } from '../src/composites/ConfirmIconButton';
import { ITEM_STRINGS } from '../src/primitives/strings/items-strings.constants';

const RESET = { id: 'reset', icon: 'rotate-ccw', label: 'Reset layout', kind: 'confirm', onSelect: () => undefined };

describe('a confirm item', () => {
  const html = renderToString(h(DropdownMenu, { inline: true, groups: [{ id: 'layout', items: [RESET] }] }));

  it('is a plain menuitem, never a checkbox, with a live label', () => {
    expect(html).toMatch(/class="pressable dropdown__item[^"]*" role="menuitem"/);
    expect(html).not.toContain('aria-checked');
    expect(html).toContain('<span class="text-el text-el--span" aria-live="polite">Reset layout</span>');
  });

  it('keeps room for the question in a hidden copy, so the menu does not grow when it asks', () => {
    expect(html).toMatch(/dropdown__label-room" aria-hidden="true">Click again to reset layout</);
  });

  it('adds no mark column and closes the menu once it runs', () => {
    expect(menuColumns([RESET]).marks).toBe(false);
    expect(closesOnPick('confirm', true)).toBe(true);
    expect(closesOnPick('check', true)).toBe(false);
  });

  it('shows the question while it asks, and the label in the hidden copy', () => {
    const asking = renderToString(h(MenuLabel, { item: RESET, ask: 'Click again to reset layout', asking: true }));
    expect(asking).toMatch(/aria-live="polite">Click again to reset layout<\/span><span[^>]*aria-hidden="true">Reset layout</);
  });
});

describe('the words of the question', () => {
  it('lower the first letter of the label and keep a short capital word', () => {
    expect(ITEM_STRINGS.confirmAgain('Reset layout')).toBe('Click again to reset layout');
    expect(ITEM_STRINGS.confirmAgain('API keys reset')).toBe('Click again to API keys reset');
  });
});

describe('ConfirmIconButton on the shared ask', () => {
  it('opens on the question with defaultArmed, unless it is disabled', () => {
    const props = { icon: h('i'), label: 'Delete', confirmLabel: 'Delete it', cancelLabel: 'Keep it', onConfirm: () => undefined, defaultArmed: true };
    expect(renderToString(h(ConfirmIconButton, props))).toContain('aria-label="Delete it"');
    expect(renderToString(h(ConfirmIconButton, { ...props, disabled: true }))).not.toContain('aria-label="Delete it"');
  });
});
