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
    expect(html).toMatch(/aria-label="Sprites" class="box--sunken side-panel__pane".*<section class="box--sunken tool-frame studio-layout__editor" aria-label="Sprite sheet">.*aria-label="Properties" class="box--sunken side-panel__pane"/);
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
    expect(html).toContain('class="side-panel pane-edge-host side-panel--end side-panel--collapsible side-panel--collapsed"');
    expect(html).toContain('aria-label="Show Properties"');
    expect(html).toContain('aria-label="Hide Sprites"');
  });

  it('stacks the columns through a class it sets when they do not fit, not at a fixed width', () => {
    const css = sheet('src/composites/StudioLayout/StudioLayout.css');
    expect(css).toContain('container: studio-layout / inline-size;');
    expect(css).not.toMatch(/@container|768px/);
    expect(css).toMatch(/\.studio-layout--stacked \.studio-layout__body \{\s+flex-direction: column;/);
    expect(css).toMatch(/\.studio-layout--stacked \.side-panel :is\(\.side-panel__pane, \.pane-edge__toggle\) \{\s+grid-column: 1;/);
    expect(css).toMatch(/\.studio-layout--stacked \.pane-edge__toggle \{\s+justify-self: end;/);
    expect(css).toMatch(/\.studio-layout--stacked \.side-panel__edge > \.resize-handle \{\s+display: none;/);
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
    const folded = renderToString(h(ListDetailLayout, { listContainers: [{ title: 'Rows', content: 'Rows' }], detail: 'Detail', defaultCollapsed: true, listLabel: 'presets' }));
    expect(folded).toContain('list-detail-layout__list list-detail-layout__list--folded');
    expect(folded).toContain('class="box--sunken pane-rail pane-rail--folded pane-rail--start pane-rail--edge-fold"');
    expect(folded).toMatch(/class="pane-edge pane-edge--horizontal pane-edge--edge-start list-detail-layout__edge".*class="pressable edge-button hit-area collapse-toggle collapse-toggle--to-end pane-edge__toggle pane-edge__toggle--start"/);
    expect(folded).toContain('<div class="pane-rail__items"><span class="text-el text-el--span pane-rail__label" aria-hidden="true">presets</span>');
    expect(folded).toContain('class="scroll-area pane-rail__content pane-rail__content--empty"');
    const detail = renderToString(h(ListDetailLayout, { listContainers: [{ title: 'Rows', content: 'Rows' }], detail: 'Detail', detailCollapsible: true, defaultDetailCollapsed: true, detailLabel: 'editor' }));
    expect(detail).toContain('box--sunken pane-rail pane-rail--folded pane-rail--end');
    expect(detail).toContain('pane-edge__toggle pane-edge__toggle--end');
  });

  it('paints no surface of its own: the fill and the edge come from Box, Card, ToolFrame and the sunken rail', () => {
    expect(sheet('src/composites/ResizeHandle/ResizeHandle.css')).toMatch(/\.resize-handle::after \{[^}]*background: var\(--c-border-strong\);/);
    ['src/composites/StudioLayout/StudioLayout.css', 'src/composites/pane-edge/PaneRail.css'].forEach((file) => {
      expect(sheet(file), file).not.toMatch(/background|border:|border-block|box-shadow/);
    });
    expect(sheet('src/composites/SidePanel/SidePanel.css')).toMatch(/\.side-panel__heading > \.card__header \{[^}]*background: var\(--c-surface\);/);
    expect(sheet('src/composites/SidePanel/SidePanel.css')).toMatch(/border-inline-(start|end): var\(--border-width-thin\) dashed/);
    expect(sheet('src/composites/pane-edge/PaneRail.tsx')).toContain("surface={rail ? 'sunken' : undefined}");
    expect(sheet('src/composites/SidePanel/sub-components/SidePanelPane.tsx')).toContain('surface="sunken"');
    expect(sheet('src/composites/ListDetailLayout/ListDetailLayout.css')).not.toMatch(/rail-label|c-sunken/);
    expect(sheet('src/composites/LogPanel/LogPanel.css')).not.toMatch(/log-panel__toolbar|radius-md/);
  });
});
