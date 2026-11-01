/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { layoutOptionsOf } from '../src/composites/ListDetailLayout/behavior/layout-options-of';

describe('K1 ListDetailLayout options', { tags: ['critical'] }, () => {
  it('keeps the fold under its own name beside the stored width', () => {
    const options = layoutOptionsOf({ list: null, storageKey: 'presets.list' });
    expect(options.width.storageKey).toBe('presets.list');
    expect(options.collapse.storageKey).toBe('presets.list:collapsed');
    expect(layoutOptionsOf({ list: null }).collapse.storageKey).toBeUndefined();
  });

  it('keeps a stored share apart from a stored width', () => {
    const options = layoutOptionsOf({ list: null, storageKey: 'records', listRatio: 0.6 });
    expect(options.width).toEqual({ initial: 60, min: 20, max: 80, storageKey: 'records:ratio', fine: true });
    expect(options.ratio).toBe(true);
    expect(layoutOptionsOf({ list: null, storageKey: 'records' }).width.storageKey).toBe('records');
  });

  it('keeps the detail fold under its own name', () => {
    expect(layoutOptionsOf({ list: null, storageKey: 'records' }).detailCollapse.storageKey).toBe('records:detail-collapsed');
  });
});
