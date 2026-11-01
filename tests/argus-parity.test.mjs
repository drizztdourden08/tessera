/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { classesOf } from '../src/composites/DataTable/behavior/classes-of';

describe('K1 DataTable header case', { tags: ['critical'] }, () => {
  it('sets the upper header class only with headerCase upper', () => {
    expect(classesOf(false, false, 'upper')).toContain('data-table--upper-headers');
    expect(classesOf(false, false, 'normal')).not.toContain('upper-headers');
    expect(classesOf(true, false)).toBe('data-table data-table--selectable');
  });
});
