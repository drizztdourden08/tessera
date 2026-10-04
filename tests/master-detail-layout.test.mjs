/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MasterDetailLayout } from '../src/composites/MasterDetailLayout';
import { clampWidth } from '../src/composites/MasterDetailLayout/behavior/clamp-width';
import { keyWidthOf } from '../src/composites/MasterDetailLayout/behavior/key-width-of';
import { readStoredWidth } from '../src/composites/MasterDetailLayout/behavior/stored-width';

const limits = { initial: 320, min: 240, max: 480 };
const draw = (extra = {}) => renderToString(h(MasterDetailLayout, { list: h('p', null, 'Rows'), detail: h('p', null, 'Detail'), ...extra }));
const key = (name, shiftKey = false) => ({ key: name, shiftKey, currentTarget: {} });

afterEach(() => vi.unstubAllGlobals());

describe('the MasterDetailLayout list width', () => {
  it('stays between its limits', () => {
    expect(clampWidth(100, limits)).toBe(240);
    expect(clampWidth(999, limits)).toBe(480);
    expect(clampWidth(333.4, limits)).toBe(333);
  });

  it('steps by 16 px, 64 px with Shift, and jumps to the limits or back to the start', () => {
    vi.stubGlobal('getComputedStyle', () => ({ direction: 'ltr' }));
    expect(keyWidthOf(key('ArrowRight'), 320, limits)).toBe(336);
    expect(keyWidthOf(key('ArrowLeft', true), 320, limits)).toBe(256);
    expect(keyWidthOf(key('Home'), 320, limits)).toBe(240);
    expect(keyWidthOf(key('End'), 320, limits)).toBe(480);
    expect(keyWidthOf(key('Enter'), 400, limits)).toBe(320);
    expect(keyWidthOf(key('a'), 320, limits)).toBeNull();
  });

  it('reads a stored width, and nothing when storage is missing or holds something else', () => {
    expect(readStoredWidth(undefined)).toBeUndefined();
    vi.stubGlobal('localStorage', { getItem: () => '412' });
    expect(readStoredWidth('k')).toBe(412);
    vi.stubGlobal('localStorage', { getItem: () => '"wide"' });
    expect(readStoredWidth('k')).toBeUndefined();
  });
});

describe('MasterDetailLayout', () => {
  it('draws a 320 px list, a divider that reports the width, and the detail', () => {
    const html = draw();
    expect(html).toContain('grid-template-columns:320px auto minmax(0, 1fr)');
    expect(html).toMatch(/role="separator"[^>]*aria-valuenow="320" aria-valuemin="240" aria-valuemax="480"/);
    expect(html).toContain('aria-label="Resize list and details"');
    expect(draw({ resizable: false })).not.toContain('role="separator"');
  });

  it('names the view a small window shows, and puts Back in the detail only with onBack', () => {
    expect(draw()).toContain('data-view="both"');
    expect(draw()).not.toContain('master-detail__back');
    expect(draw({ onBack: () => undefined, detailEmpty: true })).toContain('data-view="list"');
    const picked = draw({ onBack: () => undefined, backLabel: 'All servers' });
    expect(picked).toContain('data-view="detail"');
    expect(picked).toMatch(/master-detail__back.*All servers.*Detail/);
  });
});
