/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ListDetailLayout } from '../src/composites/ListDetailLayout';
import { LogPanel } from '../src/composites/LogPanel';
import { StudioLayout } from '../src/composites/StudioLayout';
import { ToolFrame } from '../src/primitives/ToolFrame';
import { ToolGroups } from '../src/primitives/ToolGroups';

const sheet = (file) => fs.readFileSync(file, 'utf8');
const groups = [{ id: 'save', label: 'Save to this app', content: h('button', { type: 'button' }, 'Save') }];

const studio = (extra = {}) => renderToString(h(StudioLayout, {
  bar: { caption: 'Character Studio', title: 'Link', groups, idleHint: 'Save keeps the sprite.' },
  start: { title: 'Sprites', content: h('p', null, 'List') },
  end: { title: 'Properties', content: h('p', null, 'Facts') },
  editorLabel: 'Sprite sheet',
  toolbar: [{ id: 'zoom', label: 'Zoom', content: h('button', { type: 'button' }, 'In') }],
  ...extra,
}, h('p', null, 'Sheet')));

describe('StudioLayout', () => {
  it('draws the raised bar, the list, the editor in a ToolFrame and the inspector, in that order', () => {
    const html = studio();
    expect(html).toMatch(/<header class="box--raised studio-layout__bar">.*<h1[^>]*>Link<\/h1>/);
    expect(html).toMatch(/class="hint-line hint-line--1" role="status"[^>]*>.*Save keeps the sprite\./);
    expect(html).toMatch(/aria-label="Sprites" class="box--raised side-panel__pane".*<section class="box--sunken tool-frame studio-layout__editor" aria-label="Sprite sheet">.*aria-label="Properties" class="box--raised side-panel__pane"/);
    expect(html).toMatch(/class="tool-frame__toolbar"><div class="tool-groups">.*>Zoom<.*class="tool-frame__body tool-frame__body--padded"><p>Sheet<\/p>/);
  });

  it('leaves out what it is not given', () => {
    const html = renderToString(h(StudioLayout, { editorLabel: 'Sheet' }, 'x'));
    expect(html).not.toContain('studio-layout__bar');
    expect(html).not.toContain('side-panel');
    expect(html).not.toContain('tool-frame__toolbar');
  });

  it('passes each panel its own props, such as a fold to start with', () => {
    const html = studio({ end: { title: 'Properties', content: 'Facts', defaultCollapsed: true } });
    expect(html).toContain('class="side-panel side-panel--end side-panel--collapsible side-panel--overhang side-panel--collapsed"');
    expect(html).toContain('aria-label="Show Properties"');
    expect(html).toContain('aria-label="Hide Sprites"');
  });

  it('stacks the columns through a class it sets when they do not fit, not at a fixed width', () => {
    const css = sheet('src/composites/StudioLayout/StudioLayout.css');
    expect(css).toContain('container: studio-layout / inline-size;');
    expect(css).not.toMatch(/@container|768px/);
    expect(css).toMatch(/\.studio-layout--stacked \.studio-layout__body \{\s+flex-direction: column;/);
    expect(studio()).toMatch(/^<div class="studio-layout">/);
  });
});

describe('the shared pieces StudioLayout is drawn from', () => {
  it('ToolGroups names each group by its visible label', () => {
    const html = renderToString(h(ToolGroups, { groups: [...groups, { id: 'export', label: 'Export a file', content: 'PNG' }], label: 'File actions' }));
    expect(html).toMatch(/^<div role="group" aria-label="File actions" class="tool-groups">/);
    const [, first] = /<div role="group" aria-labelledby="([^"]+)" class="tool-groups__group"><span class="[^"]*" id="\1">Save to this app</.exec(html) ?? [];
    expect(first).toBeTruthy();
    expect(html.match(/role="separator"/g)).toHaveLength(1);
  });

  it('ToolFrame is a sunken Box with its toolbar first', () => {
    expect(renderToString(h(ToolFrame, { toolbar: 'Tools' }, 'Body'))).toBe('<div class="box--sunken tool-frame"><div class="tool-frame__toolbar">Tools</div><div class="tool-frame__body">Body</div></div>');
    expect(renderToString(h(ToolFrame, { toolbar: false }, 'Body'))).not.toContain('tool-frame__toolbar');
  });

  it('LogPanel is a ToolFrame, and ListDetailLayout folds to the same rail and toggle as SidePanel', () => {
    expect(renderToString(h(LogPanel, { rows: [] }))).toMatch(/^<div class="box--sunken tool-frame log-panel"><div class="tool-frame__toolbar"><div class="filter-bar"/);
    const folded = renderToString(h(ListDetailLayout, { list: 'Rows', detail: 'Detail', defaultCollapsed: true, listLabel: 'presets' }));
    expect(folded).toContain('class="pane-rail pane-rail--folded page-card list-detail-layout__gutter"><button type="button" class="pressable edge-button hit-area collapse-toggle collapse-toggle--to-end');
    expect(folded).toContain('pane-rail__label" aria-hidden="true">presets</span>');
  });

  it('paints no surface of its own: the fill, the edge and the shadow come from Box, Card, ToolFrame and the rail', () => {
    ['src/composites/StudioLayout/StudioLayout.css', 'src/composites/SidePanel/SidePanel.css'].forEach((file) => {
      expect(sheet(file), file).not.toMatch(/background|border:|border-block|box-shadow/);
    });
    const card = sheet('src/theme/page-card.css');
    const nav = sheet('src/composites/SideNav/SideNav.css');
    expect(sheet('src/composites/pane-fold/PaneRail.tsx')).toContain("'pane-rail--folded page-card'");
    ['background: var(--c-panel);', 'backdrop-filter: blur(var(--blur));', 'border: var(--border-width-thin) solid var(--c-border);', 'border-radius: var(--radius-xl);'].forEach((rule) => {
      expect(card, rule).toContain(rule);
      expect(nav, rule).toContain(rule);
    });
    expect(sheet('src/composites/ListDetailLayout/ListDetailLayout.css')).not.toMatch(/rail-label|c-sunken/);
    expect(sheet('src/composites/LogPanel/LogPanel.css')).not.toMatch(/log-panel__toolbar|radius-md/);
  });
});
