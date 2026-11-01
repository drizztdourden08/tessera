/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { triggerSettings } from '../src/composites/DropdownMenu/behavior/trigger-settings';
import { dropAnchoring } from '../src/primitives/listbox/drop-anchoring';
import { dropPlacement } from '../src/primitives/listbox/drop-placement';
import { dropShape } from '../src/primitives/listbox/drop-shape';
import { fitDropWidth } from '../src/primitives/listbox/fit-drop-width';

const VIEW = { innerWidth: 1000, innerHeight: 800, getComputedStyle: () => ({}) };
const NATURAL = 180;
const trigger = (left) => ({ top: 10, bottom: 38, left, right: left + 28, width: 28, height: 28 });

const placed = (left, align) => {
  const placement = dropPlacement(null, trigger(left), VIEW, { fit: true, align });
  const width = fitDropWidth(NATURAL, placement);
  return { width, ...dropAnchoring({ placement, width, ...dropShape(placement, width) }) };
};

describe('K1 the title bar dropdown placement', { tags: ['critical'] }, () => {
  it('opens any DropdownMenu with a trigger on the side with room unless the app asks for an edge', () => {
    expect(triggerSettings({ trigger: { label: 'Layout' }, groups: [] }).align).toBe('auto');
    expect(triggerSettings({ trigger: { label: 'Layout' }, groups: [], align: 'start' }).align).toBe('start');
    expect(triggerSettings({ trigger: { label: 'Layout' }, groups: [], align: 'end' }).align).toBe('end');
  });

  it('keeps the start of the trigger when the app asks for it, even at the right edge', () => {
    expect(placed(960, 'start').place).toBe('bottom-start');
    expect(placed(960, 'end').place).toBe('bottom-end');
  });

  it('opens a trigger at the right edge to the left, under its end, at its natural width', () => {
    expect(placed(960, 'auto')).toEqual({ width: NATURAL, place: 'bottom-end', fallback: { top: 38, right: 12 } });
  });

  it('opens a trigger near the left edge to the right, under its start', () => {
    expect(placed(40, 'auto')).toEqual({ width: NATURAL, place: 'bottom-start', fallback: { top: 38, left: 40 } });
  });

  it('squeezed the menu at the right edge when it held to the start', () => {
    expect(placed(960, 'start').width).toBe(32);
  });
});
