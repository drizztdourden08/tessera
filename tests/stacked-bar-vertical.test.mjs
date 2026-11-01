/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { barTemplate } from '../src/primitives/StackedBar/behavior/bar-template';

describe('K1 a vertical stacked bar', { tags: ['critical'] }, () => {
  it('lays the tracks across, or up from the bottom when vertical', () => {
    const sizes = ['0.5fr', '0.3fr', '0.2fr'];
    expect(barTemplate(sizes, 'horizontal')).toEqual({ gridTemplateColumns: '0.5fr 0.3fr 0.2fr' });
    expect(barTemplate(sizes, 'vertical')).toEqual({ gridTemplateRows: '0.2fr 0.3fr 0.5fr' });
    expect(sizes).toEqual(['0.5fr', '0.3fr', '0.2fr']);
  });
});
