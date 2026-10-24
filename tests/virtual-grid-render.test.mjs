/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { VirtualGrid } from '../src/composites/VirtualGrid';

const SECTIONS = ['a', 'b', 'c'].map((key, at) => ({
  key,
  label: `Folder ${key}`,
  items: Array.from({ length: [7, 4, 3][at] }, (_, i) => ({ id: `${key}-${i}`, text: `${key}${i}` })),
}));

const drawSections = (extra) => renderToString(h(VirtualGrid, {
  label: 'Folders', sections: SECTIONS, getKey: (item) => item.id, renderItem: (item) => item.text, ...extra,
}));

describe('VirtualGrid with sections on the server', () => {
  it('draws a header cell for each section that spans the columns and says if it is open', () => {
    const html = drawSections();
    expect((html.match(/data-vg-kind="header"/g) ?? []).length).toBe(3);
    expect(html).toContain('aria-colspan="5"');
    expect(html).toContain('aria-expanded="true"');
    expect(html).toContain('Folder a');
    expect(html).toContain('Folder c');
  });

  it('gives the header the first stop and the tiles the stops after it', () => {
    const html = drawSections();
    expect(html).toMatch(/data-vg-index="0"[^>]*data-vg-kind="header"/);
    expect(html).toMatch(/data-vg-index="1"[^>]*data-vg-kind="tile"/);
    expect((html.match(/tabindex="0"/g) ?? []).length).toBe(1);
  });

  it('marks tiles with the key the marquee reads, and headers without it', () => {
    const html = drawSections();
    expect(html).toContain('data-marquee-key="a-0"');
    expect(html).toContain('data-marquee-key="c-2"');
    expect((html.match(/data-marquee-key=/g) ?? []).length).toBe(14);
  });

  it('hides the tiles of a section that starts collapsed', () => {
    const html = drawSections({ defaultCollapsed: ['b'] });
    expect(html).not.toContain('data-marquee-key="b-0"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('data-marquee-key="c-0"');
    expect(html).toContain('--vg-headers:3');
  });

  it('follows the collapsed set when the app holds it', () => {
    const html = drawSections({ collapsed: ['a', 'c'], defaultCollapsed: [] });
    expect(html).not.toContain('data-marquee-key="a-0"');
    expect(html).toContain('data-marquee-key="b-0"');
  });

  it('shows the count of the section, or the one the app gives', () => {
    const html = drawSections({ sections: SECTIONS.map((section, at) => (at === 0 ? { ...section, count: 4000 } : section)) });
    expect(html).toContain('4000');
  });

  it('numbers the tiles through all the sections', () => {
    const html = renderToString(h(VirtualGrid, {
      label: 'Folders', sections: SECTIONS, getKey: (item) => item.id, renderItem: (item, at) => `n${at}`,
    }));
    expect(html).toContain('n0');
    expect(html).toContain('n13');
  });
});
