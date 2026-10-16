/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { StudioLayout } from '../src/composites/StudioLayout';
import { Button } from '../src/primitives/Button';
import { ToolGroups } from '../src/primitives/ToolGroups';

const groups = [
  { id: 'draw', label: 'Draw', content: h(Button, null, 'Pencil') },
  { id: 'zoom', label: 'Zoom', content: h(Button, { size: 'md' }, 'In') },
];

describe('ToolGroups compact', () => {
  it('names each group with aria-label and shows no label above it', () => {
    const html = renderToString(h(ToolGroups, { groups, compact: true }));
    expect(html).toMatch(/^<div class="tool-groups tool-groups--compact"><div class="density-scope" data-density="compact">/);
    expect(html).toContain('<div role="group" aria-label="Draw" class="tool-groups__group"><div class="tool-groups__row">');
    expect(html).toContain('<div role="group" aria-label="Zoom" class="tool-groups__group">');
    expect(html).not.toMatch(/aria-labelledby|overline/);
    expect(html.match(/role="separator"/g)).toHaveLength(1);
  });

  it('draws the controls inside at sm unless one sets its own size', () => {
    const html = renderToString(h(ToolGroups, { groups, compact: true }));
    expect(html).toMatch(/class="[^"]*btn--sm[^"]*"><span class="btn__label">Pencil/);
    expect(html).toMatch(/class="[^"]*btn--md[^"]*"><span class="btn__label">In/);
  });

  it('keeps the default markup when compact is left out', () => {
    const html = renderToString(h(ToolGroups, { groups }));
    expect(html).toMatch(/^<div class="tool-groups"><div role="group" aria-labelledby=/);
    expect(html).not.toMatch(/density-scope|tool-groups--compact/);
    expect(html).toMatch(/class="[^"]*btn--md[^"]*"><span class="btn__label">Pencil/);
  });

  it('tightens only the gap between groups, through a token', () => {
    const css = fs.readFileSync('src/primitives/ToolGroups/ToolGroups.css', 'utf8');
    expect(css).toMatch(/\.tool-groups--compact \{\s+gap: var\(--space-sm\);\s+\}/);
  });
});

describe('StudioLayout compactToolbar', () => {
  const studio = (extra) => renderToString(h(StudioLayout, { editorLabel: 'Sprite sheet', toolbar: groups, ...extra }, 'Sheet'));

  it('passes compact to the toolbar of the editor', () => {
    expect(studio({ compactToolbar: true })).toContain('<div class="tool-frame__toolbar"><div class="tool-groups tool-groups--compact">');
    expect(studio({})).toContain('<div class="tool-frame__toolbar"><div class="tool-groups"><div role="group" aria-labelledby=');
  });

  it('leaves the groups of the top bar labelled', () => {
    const html = studio({ compactToolbar: true, bar: { title: 'Link', groups: [{ id: 'save', label: 'Save to this app', content: 'Save' }] } });
    expect(html).toMatch(/studio-layout__bar.*<div class="tool-groups"><div role="group" aria-labelledby="[^"]+" class="tool-groups__group"><span[^>]*>Save to this app</);
  });
});
