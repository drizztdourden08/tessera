/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { PANEL_STRINGS } from '../src/primitives/strings/panels-strings.constants';

describe('the log count', () => {
  it('says entry for one and entries otherwise', () => {
    expect(PANEL_STRINGS.logCount(1, 1, PANEL_STRINGS.logNoun(1))).toBe('1 entry');
    expect(PANEL_STRINGS.logCount(0, 0, PANEL_STRINGS.logNoun(0))).toBe('0 entries');
    expect(PANEL_STRINGS.logCount(1, 3, PANEL_STRINGS.logNoun(3))).toBe('1 of 3 entries');
  });
});
