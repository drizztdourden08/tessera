/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { tabBadgeColor } from '../src/primitives/Tabs/behavior/tab-badge-color';

describe('K1 tabBadgeColor', { tags: ['critical'] }, () => {
  it('keeps today look without a tone: primary when active, tame otherwise', () => {
    expect(tabBadgeColor(undefined, true)).toBe('primary');
    expect(tabBadgeColor(undefined, false)).toBe('tame');
  });

  it('maps each tone to the Badge colour, active or not', () => {
    expect(tabBadgeColor('neutral', true)).toBe('tame');
    expect(tabBadgeColor('warn', false)).toBe('warning');
    expect(tabBadgeColor('danger', false)).toBe('danger');
    expect(tabBadgeColor('success', true)).toBe('success');
    expect(tabBadgeColor('info', false)).toBe('info');
  });
});
