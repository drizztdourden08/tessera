/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { backFits } from '../src/composites/ContentHeader/behavior/back-fits';

describe('K1 backFits', { tags: ['critical'] }, () => {
  const part = (className, width, scrollWidth = width) => ({ className, offsetWidth: width, scrollWidth, classList: { contains: (name) => className === name } });
  const header = (clientWidth, children) => {
    const styles = new Map(children.map((child) => [child, { position: child.className === 'content-header__backdrop' ? 'absolute' : 'static' }]));
    const view = { getComputedStyle: (element) => styles.get(element) ?? { columnGap: '12px', paddingLeft: '24px', paddingRight: '24px' } };
    return { clientWidth, children, ownerDocument: { defaultView: view } };
  };
  const parts = (backWidth) => [
    part('content-header__backdrop', 999),
    part('content-header__back', backWidth),
    part('content-header__icon', 24),
    part('content-header__title', 60, 100),
  ];

  it('counts the back button at its full width, the title at its natural width, and skips the backdrop', () => {
    expect(backFits(header(48 + 134 + 24 + 100 + 24, parts(28)), 134)).toBe(true);
    expect(backFits(header(48 + 134 + 24 + 100 + 23, parts(28)), 134)).toBe(false);
  });
});
