/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { FactsPanel } from '../src/composites/FactsPanel';
import { StatRow } from '../src/primitives/StatRow';

const GROUPS = [[{ label: 'Seed', value: 'K7Q2-M9XA', mono: true }, { label: 'Slot', value: 'Link' }]];
const rowAligns = (html) => [...html.matchAll(/class="stat-row facts-panel__fact" data-size="md"( data-align="(\w+)")?/g)].map((m) => m[2] ?? 'none');

describe('where a fact value sits', () => {
  it('StatRow draws no align by default, and marks start or end when asked', () => {
    expect(renderToString(h(StatRow, { label: 'Players', value: '4 of 6' }))).not.toContain('data-align');
    expect(renderToString(h(StatRow, { label: 'Players', value: '4 of 6', align: 'end' }))).toContain('data-size="md" data-align="end"');
    expect(renderToString(h(StatRow, { label: 'Players', value: '4 of 6', align: 'start' }))).toContain('data-align="start"');
  });

  it('FactsPanel keeps each layout as it was without align: inline beside the label, rows on a 512 px row', () => {
    expect(rowAligns(renderToString(h(FactsPanel, { groups: GROUPS })))).toEqual(['start', 'start']);
    expect(rowAligns(renderToString(h(FactsPanel, { groups: GROUPS, layout: 'rows' })))).toEqual(['none', 'none']);
    expect(renderToString(h(FactsPanel, { groups: GROUPS }))).not.toContain('class="facts-panel facts-panel--inline" role="group" data-align');
  });

  it('FactsPanel align="end" passes to every row, in any layout', () => {
    ['inline', 'rows', 'boxed'].forEach((layout) => {
      const html = renderToString(h(FactsPanel, { groups: GROUPS, layout, align: 'end' }));
      expect(html, layout).toContain(`class="facts-panel facts-panel--${layout}" role="group" data-align="end"`);
      expect(rowAligns(html), layout).toEqual(['end', 'end']);
    });
    expect(renderToString(h(FactsPanel, { groups: GROUPS, layout: 'terms', align: 'end' }))).toContain('data-align="end"');
  });

  it('the rule lives once, in StatRow, and FactsPanel no longer copies it', () => {
    const row = fs.readFileSync('src/primitives/StatRow/StatRow.css', 'utf8');
    expect(row).toMatch(/\.stat-row\[data-align='start'\] \{\s+justify-content: flex-start;\s+\}/);
    expect(row).toMatch(/\.stat-row\[data-align='end'\] \{\s+max-inline-size: none;\s+\}/);
    const panel = fs.readFileSync('src/composites/FactsPanel/FactsPanel.css', 'utf8');
    expect(panel).not.toContain('justify-content: flex-start');
    expect(panel).not.toMatch(/\.facts-panel__fact \{[^}]*justify-content/);
  });
});
