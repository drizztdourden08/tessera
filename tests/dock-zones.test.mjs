/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DropHintZone } from '../src/composites/dock-zones/DropHintZone';
import { DropPopZone } from '../src/composites/dock-zones/DropPopZone';

const HIT = { x: 4, y: 8, width: 40, height: 40 };

describe('the shared drop parts', () => {
  it('keeps the widget wording and look of the pop zone by default', () => {
    const html = renderToString(h(DropPopZone, { stays: false }));
    expect(html).toContain('dock-layout__popzone');
    expect(html).toContain('Release to pop out');
    expect(html).not.toContain('dock-layout__popzone--basket');
    expect(renderToString(h(DropPopZone, { stays: true }))).toContain('dock-layout__popzone--stays');
  });

  it('renders the basket tone with its own label and icon', () => {
    const html = renderToString(h(DropPopZone, { tone: 'basket', label: 'Drop to remove', icon: 'layers' }));
    expect(html).toContain('dock-layout__popzone--basket');
    expect(html).toContain('Drop to remove');
    expect(html).toContain('dock-layout__popzone-icon');
    expect(html).not.toContain('Release to pop out');
  });

  it('draws a hint zone from a hit rect, a kind and an icon', () => {
    const html = renderToString(h(DropHintZone, { hit: HIT, kind: 'compass', icon: 'layers', hot: true }));
    expect(html).toContain('dock-hint dock-hint--compass dock-hint--hot');
    expect(html).toContain('dock-hint__icon');
    expect(html).toContain('left:4px');
    const plain = renderToString(h(DropHintZone, { hit: HIT, kind: 'outer', hot: false }));
    expect(plain).toContain('dock-hint--outer');
    expect(plain).not.toContain('dock-hint--hot');
    expect(plain).not.toContain('dock-hint__icon');
  });
});
