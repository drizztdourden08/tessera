/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { logPanelMinRows } from '../src/composites/LogPanel/behavior/log-panel-min-rows';
import { logPanelStyle } from '../src/composites/LogPanel/behavior/log-panel-style';

describe('K1 logPanelMinRows', { tags: ['critical'] }, () => {
  it('defaults to 3 with height fill and to none otherwise', () => {
    expect(logPanelMinRows('fill', undefined)).toBe(3);
    expect(logPanelMinRows(240, undefined)).toBeUndefined();
    expect(logPanelMinRows(undefined, undefined)).toBeUndefined();
  });

  it('takes the given count in every height mode and never goes below 0', () => {
    expect(logPanelMinRows('fill', 5)).toBe(5);
    expect(logPanelMinRows(240, 2)).toBe(2);
    expect(logPanelMinRows(undefined, 4)).toBe(4);
    expect(logPanelMinRows('fill', -2)).toBe(0);
    expect(logPanelMinRows('fill', 2.7)).toBe(2);
  });
});

describe('K1 logPanelStyle', { tags: ['critical'] }, () => {
  it('sets the block size for a number and the min rows variable when there is a minimum', () => {
    expect(logPanelStyle('fill', undefined)).toEqual({ '--log-panel-min-rows': 3 });
    expect(logPanelStyle(240, undefined)).toEqual({ blockSize: 240 });
    expect(logPanelStyle(240, 2)).toEqual({ blockSize: 240, '--log-panel-min-rows': 2 });
    expect(logPanelStyle(undefined, undefined)).toBeUndefined();
  });
});
