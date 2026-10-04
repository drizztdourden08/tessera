/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { pinMenuGroups } from '../src/composites/Widget/behavior/pin-menu-groups';
import { PIN_CHOICES } from '../src/composites/Widget/behavior/widget-options-menu.constants';
import { WIDGET_STRINGS } from '../src/primitives/strings/widgets-strings.constants';

describe('the pin menu of a widget in its own window', () => {
  it('offers off and on top, each with its own icon', () => {
    expect(PIN_CHOICES.map((choice) => [choice.value, choice.icon])).toEqual([['off', 'pin-off'], ['top', 'pin']]);
  });

  it('lists both choices as radio items with their label and hint, and marks only the current one', () => {
    const [group] = pinMenuGroups('top', WIDGET_STRINGS, vi.fn());
    expect(group.label).toBe('Pin');
    expect(group.items.map((item) => [item.id, item.label, item.description, item.kind, item.checked])).toEqual([
      ['off', 'Off', 'Behaves like any window', 'radio', false],
      ['top', 'On top', 'Always over every other window', 'radio', true],
    ]);
  });

  it('reports the chosen mode', () => {
    const change = vi.fn();
    const [group] = pinMenuGroups('off', WIDGET_STRINGS, change);
    group.items[1].onSelect();
    expect(change).toHaveBeenCalledWith('top');
  });

  it('names the current choice on the button', () => {
    expect(WIDGET_STRINGS.pinTitle(WIDGET_STRINGS.pinOnTop)).toBe('Pin: On top. Click to choose');
  });
});
