/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { hasBadge } from '../src/composites/SideNav/behavior/has-badge';

describe('K1 SideNavItem badge', { tags: ['critical'] }, () => {
  it('counts only a shown node as a badge', () => {
    expect(hasBadge(0)).toBe(true);
    expect(hasBadge('1')).toBe(true);
    expect(hasBadge(undefined)).toBe(false);
    expect(hasBadge(null)).toBe(false);
    expect(hasBadge(false)).toBe(false);
    expect(hasBadge(true)).toBe(false);
    expect(hasBadge('')).toBe(false);
  });
});
