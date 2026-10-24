/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SegmentedControl } from '../src/primitives/SegmentedControl';

const HINT = { label: 'Align left', description: 'Aligns to the left edge.' };
const control = (options) => renderToString(h(SegmentedControl, { value: 'a', options, onChange: () => undefined }));

describe('SegmentedControl icon option', () => {
  it('still draws an icon name from the set as an icon', () => {
    const html = control([{ value: 'a', icon: 'chevron-left', hint: HINT }]);
    expect(html).toContain('<svg');
    expect(html).toContain('aria-label="Align left"');
  });

  it('draws a node as given', () => {
    const html = control([{ value: 'a', icon: h('i', { className: 'custom-icon' }), hint: HINT }]);
    expect(html).toContain('<i class="custom-icon"></i>');
    expect(html).not.toContain('<svg');
  });

  it('names a node option by its title or hint', () => {
    const html = control([{ value: 'a', icon: h('b'), hint: HINT, title: 'Left' }, { value: 'b', icon: h('b'), hint: HINT }]);
    expect(html).toContain('aria-label="Left"');
    expect(html).toContain('aria-label="Align left"');
  });
});
