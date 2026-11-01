/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { choiceRoom } from '../src/composites/SettingsRow/behavior/choice-room';

describe('K1 the room a SettingsRow choice gets', { tags: ['critical'] }, () => {
  it('is the whole content width in a full row, where the control can wrap under the text', () => {
    expect(choiceRoom({ width: 400, paddingInline: 32, gap: 24, title: 120, actions: 0 }, false)).toBe(368);
  });

  it('leaves the title its width in a compact row, up to half the row', () => {
    expect(choiceRoom({ width: 332, paddingInline: 32, gap: 12, title: 100, actions: 0 }, true)).toBe(188);
    expect(choiceRoom({ width: 332, paddingInline: 32, gap: 12, title: 400, actions: 0 }, true)).toBe(138);
    expect(choiceRoom({ width: 332, paddingInline: 32, gap: 12, title: 100, actions: 88 }, true)).toBe(100);
  });

  it('never goes below zero', () => {
    expect(choiceRoom({ width: 10, paddingInline: 32, gap: 12, title: 0, actions: 0 }, true)).toBe(0);
  });
});
