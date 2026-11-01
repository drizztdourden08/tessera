/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { widgetChrome } from '../src/composites/Widget/behavior/widget-chrome';

describe('K1 the widget chrome', { tags: ['critical'] }, () => {
  it('folds none to the compact strip in peek', () => {
    expect(widgetChrome({ chrome: 'none', peek: true })).toBe('compact');
    expect(widgetChrome({ chrome: 'none' })).toBe('none');
    expect(widgetChrome({})).toBe('full');
  });
});
