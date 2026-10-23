/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { StatusBar } from '../src/composites/StatusBar';
import { visibleItems } from '../src/composites/StatusBar/behavior/visible-items';

const ITEMS = [
  { id: 'cursor', label: 'Cursor', value: '24, 17', icon: 'move', title: 'Pixel under the pointer' },
  { id: 'zoom', label: 'Zoom', value: '800%', priority: 2 },
  { id: 'colour', label: 'Colour', value: '#e8505b', swatch: '#e8505b' },
  { id: 'size', label: 'Size', value: '64 x 64', priority: 3 },
  { id: 'layer', label: 'Layer', value: 'Outline', align: 'end', priority: 1 },
  { id: 'frame', label: 'Frame', value: '3 / 8', align: 'end', tone: 'warning' },
];

const render = (props) => renderToString(h(StatusBar, { label: 'Editor status', items: ITEMS, ...props }));

describe('StatusBar', () => {
  it('is a region named by its label, with a term and a value for each readout', () => {
    const html = render();
    expect(html).toMatch(/^<section aria-label="Editor status" class="status-bar">/);
    expect(html.match(/<dt /g)).toHaveLength(6);
    expect(html.match(/<dd /g)).toHaveLength(6);
    expect(html).toMatch(/<dt class="status-bar__label">.*status-bar__label-text">Cursor</);
    expect(html).toMatch(/<dd class="status-bar__value">.*status-bar__value-text">24, 17</);
    expect(html).toContain('title="Pixel under the pointer"');
    expect(render({ className: 'extra' })).toContain('class="status-bar extra"');
  });

  it('keeps start items in the first list and end items in the second', () => {
    const html = render();
    const [start, end] = html.split('<dl ').slice(1);
    expect(start).toContain('data-side="start"');
    expect(start).toContain('>Cursor<');
    expect(start).not.toContain('>Layer<');
    expect(end).toContain('data-side="end"');
    expect(end).toContain('>Layer<');
    expect(end).toContain('>Frame<');
    expect(render({ items: [ITEMS[0]] })).not.toContain('data-side="end"');
  });

  it('draws the swatch as a hidden colour chip, only on the item that has one', () => {
    const html = render();
    expect(html.match(/status-bar__swatch/g)).toHaveLength(1);
    expect(html).toMatch(/<span class="status-bar__swatch" style="background:#e8505b" aria-hidden="true">/);
    expect(render({ items: [ITEMS[0]] })).not.toContain('status-bar__swatch');
  });

  it('puts the tone on the value and the icon before the label, hidden from assistive technology', () => {
    const html = render();
    expect(html).toMatch(/<dd class="status-bar__value" data-tone="warning">/);
    const [icon] = /<dt class="status-bar__label">(<svg[^>]*>)/.exec(html).slice(1);
    expect(icon).toContain('class="icon status-bar__icon"');
    expect(icon).toContain('aria-hidden="true"');
  });

  it('is not a live region, so a moving cursor is never announced', () => {
    const html = render();
    expect(html).not.toMatch(/aria-live|aria-atomic|aria-relevant/);
    expect(html).not.toMatch(/role="(status|alert|log|timer)"/);
  });

  it('sets numbers in tabular figures and ends long text in an ellipsis', () => {
    const css = fs.readFileSync('src/composites/StatusBar/StatusBar.css', 'utf8');
    expect(css).toMatch(/\.status-bar__value \{[^}]*font-variant-numeric: tabular-nums;/);
    expect(css).toMatch(/text-overflow: ellipsis;\s+white-space: nowrap;/);
    expect(css).toContain('block-size: var(--status-bar-h);');
    expect(css).toContain('font-size: var(--text-xs);');
  });
});

describe('StatusBar priority', () => {
  const idsAt = (width) => visibleItems(ITEMS, width).map((item) => item.id);

  it('shows everything on a wide bar and when the width is not measured', () => {
    expect(idsAt(640)).toEqual(['cursor', 'zoom', 'colour', 'size', 'layer', 'frame']);
    expect(idsAt(Number.POSITIVE_INFINITY)).toHaveLength(6);
  });

  it('drops priority 3 first, then 2, then 1, and never an item with no priority', () => {
    expect(idsAt(500)).toEqual(['cursor', 'zoom', 'colour', 'layer', 'frame']);
    expect(idsAt(320)).toEqual(['cursor', 'colour', 'layer', 'frame']);
    expect(idsAt(100)).toEqual(['cursor', 'colour', 'frame']);
  });

  it('counts a priority above 3 as 3 and one below 1 as 1', () => {
    const items = [{ id: 'high', label: 'A', value: '1', priority: 9 }, { id: 'low', label: 'B', value: '2', priority: 0 }];
    expect(visibleItems(items, 450).map((item) => item.id)).toEqual(['low']);
    expect(visibleItems(items, 300).map((item) => item.id)).toEqual(['low']);
  });
});
