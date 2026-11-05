/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { INTERACTIVE_TARGET } from '../src/primitives/dom/interactive-target.constants';
import { isInteractiveTarget } from '../src/primitives/dom/is-interactive-target';

const node = (control) => {
  const row = { nodeType: 1, closest: () => null, contains: (other) => other === control };
  return row;
};

describe('K1 Interactive target', { tags: ['critical'] }, () => {
  it('finds a control inside the boundary even for an element of another frame', () => {
    const button = { nodeType: 1 };
    button.closest = () => button;
    const row = node(button);
    expect(isInteractiveTarget(button, row)).toBe(true);
  });

  it('ignores a click on plain text and on the boundary itself', () => {
    const text = { nodeType: 1, closest: () => null };
    const row = node(undefined);
    row.closest = () => row;
    expect(isInteractiveTarget(text, row)).toBe(false);
    expect(isInteractiveTarget(row, row)).toBe(false);
  });

  it('returns false for a target that is not an element', () => {
    expect(isInteractiveTarget({ nodeType: 3 }, undefined)).toBe(false);
    expect(isInteractiveTarget(null, undefined)).toBe(false);
  });

  it('treats a toggling header row as a control for an outer card, not for itself', () => {
    expect(INTERACTIVE_TARGET).toContain('[data-row-toggle]');
    const row = { nodeType: 1 };
    row.closest = () => row;
    const card = node(row);
    expect(isInteractiveTarget(row, undefined)).toBe(true);
    expect(isInteractiveTarget(row, card)).toBe(true);
    expect(isInteractiveTarget(row, row)).toBe(false);
  });
});
