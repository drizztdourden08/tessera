/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { railOverflows } from '../src/composites/pane-edge/rail-overflows';
import { SidePanel } from '../src/composites/SidePanel';
import { sidePanelOptionsOf } from '../src/composites/SidePanel/behavior/side-panel-options-of';

const draw = (extra = {}) => renderToString(h(SidePanel, { title: 'Sprites', containers: [{ title: 'Rows', content: h('p', null, 'Rows') }], ...extra }));
const paneIdOf = (html) => /<aside id="([^"]+)" aria-label="Sprites"/.exec(html)?.[1];
const sheet = (file) => fs.readFileSync(file, 'utf8');
const rule = (css, selector) => new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\{([^}]*)\\}`).exec(css)?.[1] ?? '';
const add = h('button', { type: 'button', className: 'add' }, 'Add');
const pick = h('button', { type: 'button', className: 'pick' }, 'P');

afterEach(() => vi.unstubAllGlobals());

describe('SidePanel', () => {
  it('is a sunken aside named by its title, with a Card heading, the body and the pane edge after it', () => {
    const html = draw();
    expect(html).toMatch(/^<div class="side-panel pane-edge-host side-panel--start side-panel--collapsible" style="--side-panel-width:288px"><aside/);
    expect(html).toContain('aria-label="Sprites" class="box--sunken side-panel__pane"');
    expect(html).toMatch(/class="section-header card__header card__header--neutral"><div class="section-header__text"><h2[^>]*>Sprites/);
    expect(html).toContain('class="scroll-area side-panel__body" data-axis="y" data-scrollbar="slim"><section class="panel-container side-panel__container">');
    expect(html).toContain('<p>Rows</p></div></section></div></aside><div class="pane-edge pane-edge--horizontal pane-edge--edge-start side-panel__edge">');
    expect(html).toMatch(/role="separator"[^>]*aria-label="Resize Sprites"[^>]*aria-valuenow="288" aria-valuemin="0" aria-valuemax="448"/);
  });

  it('folds with the shared CollapseToggle, beside the line, which names the panel and controls it', () => {
    const html = draw();
    expect(html).toContain(`class="pressable edge-button hit-area collapse-toggle collapse-toggle--to-start pane-edge__toggle pane-edge__toggle--start" aria-label="Hide Sprites" title="Hide Sprites" aria-expanded="true" aria-controls="${paneIdOf(html)}"`);
    expect(draw({ collapsible: false })).not.toContain('collapse-toggle');
    expect(draw({ collapsible: false })).not.toContain('side-panel--collapsible');
  });

  it('stays resizable without collapsible: the line and the drag remain, the button and the fold go', () => {
    const html = draw({ collapsible: false });
    expect(html.match(/role="separator"/g)).toHaveLength(1);
    expect(html).toMatch(/aria-valuenow="288" aria-valuemin="224" aria-valuemax="448"/);
    expect(html).not.toContain('pane-edge__toggle');
    expect(html).not.toContain('side-panel__line');
  });

  it('overlays the toggle and resize hit area on the pane border at the heading height', () => {
    const css = sheet('src/composites/SidePanel/SidePanel.css');
    const edge = sheet('src/composites/pane-edge/PaneEdge.css');
    expect(rule(css, '.side-panel')).toContain('grid-template-columns: minmax(0, auto) 0;');
    expect(rule(edge, '.pane-edge-host')).toContain('grid-template-rows: minmax(var(--size-40), auto) minmax(0, 1fr);');
    expect(rule(css, '.side-panel__pane')).toMatch(/grid-row: 1 \/ -1;\s+grid-template-rows: subgrid;/);
    expect(rule(edge, ':is(.side-panel__edge, .list-detail-layout__edge).pane-edge--horizontal > .pane-edge__toggle')).toMatch(/position: absolute;[\s\S]*inset-inline-start: 50%;[\s\S]*transform: translate\(-50%, -50%\);/);
    expect(rule(edge, ':is(.side-panel__edge, .list-detail-layout__edge).pane-edge--horizontal')).toContain('inline-size: 0;');
    expect(rule(edge, ':is(.side-panel__edge, .list-detail-layout__edge).pane-edge--horizontal > .resize-handle')).toContain('inline-size: var(--space-xl);');
    expect(rule(css, '.side-panel__pane > .card__header')).toContain('grid-row: 1;');
    expect(rule(css, '.side-panel__pane .pane-rail__actions')).toMatch(/grid-row: 1;\s+align-self: center;/);
    expect(css).toMatch(/\.side-panel--start \.side-panel__pane,\n\.side-panel--end \.side-panel__edge \{\s+grid-column: 1;/);
    expect(css).toMatch(/\.side-panel--end \.side-panel__pane,\n\.side-panel--start \.side-panel__edge \{\s+grid-column: 2;/);
  });
});

describe('SidePanel folded', () => {
  it('puts its actions alone in the heading while open, and at the top of the rail while folded', () => {
    expect(draw({ action: add })).toContain('class="side-panel__tools"><button type="button" class="add">Add</button></div>');
    expect(draw()).not.toContain('side-panel__tools');
    const folded = draw({ action: add, defaultCollapsed: true });
    expect(folded).toContain('<div class="pane-rail__actions"><button type="button" class="add">Add</button></div>');
    expect(folded.match(/class="add"/g)).toHaveLength(1);
  });

  it('folds to the shared sunken rail: actions, the title written sideways, then the rail icons, with the content kept mounted', () => {
    const html = draw({ defaultCollapsed: true, action: add, railItems: [pick] });
    expect(html).toContain('class="side-panel pane-edge-host side-panel--start side-panel--collapsible side-panel--collapsed"');
    expect(html).toMatch(/collapse-toggle--to-end[^"]*" aria-label="Show Sprites" title="Show Sprites" aria-expanded="false"/);
    expect(html).toContain(
      'aria-label="Sprites" class="side-panel__pane"><div class="box--sunken pane-rail pane-rail--folded pane-rail--start"><div class="pane-rail__actions">'
      + '<button type="button" class="add">Add</button></div><div class="pane-rail__items"><span class="text-el text-el--span pane-rail__label" aria-hidden="true">Sprites</span>'
      + '<div class="scroll-area pane-rail__content" data-axis="y" data-scrollbar="slim"><div class="pane-rail__list"><button type="button" class="pick">P</button></div></div></div></div>',
    );
    expect(html).toContain('class="scroll-area side-panel__body"');
    expect(html).toContain('<p>Rows</p>');
    expect(html.match(/role="separator"/g)).toHaveLength(1);
    expect(html).toMatch(/role="separator"[^>]*aria-valuenow="0" aria-valuemin="0"/);
    expect(draw({ railItems: [pick] })).not.toContain('class="pick"');
  });

  it('reads the sideways title up on a left panel and down on a right one', () => {
    const css = sheet('src/composites/pane-edge/PaneRail.css');
    expect(rule(css, '.pane-rail__label')).toContain('writing-mode: vertical-rl;');
    expect(rule(css, '.pane-rail--start .pane-rail__label')).toContain('rotate: 180deg;');
    expect(css).not.toMatch(/\.pane-rail--end \.pane-rail__label/);
    expect(draw({ side: 'end', defaultCollapsed: true })).toContain('pane-rail--folded pane-rail--end');
  });

  it('lets a glow around a rail icon spread past the rail, and scrolls and clips only a rail too long to fit', () => {
    const panel = sheet('src/composites/SidePanel/SidePanel.css');
    const rail = sheet('src/composites/pane-edge/PaneRail.css');
    expect(rule(panel, '.side-panel--collapsed .side-panel__pane')).toContain('overflow: visible;');
    expect(rule(rail, '.pane-rail--folded')).not.toMatch(/overflow/);
    expect(rule(rail, '.pane-rail__items')).not.toMatch(/overflow/);
    expect(rule(rail, '.pane-rail__content')).not.toMatch(/overflow/);
    expect(sheet('src/composites/pane-edge/PaneRailFold.tsx')).toContain('scrollbar="slim"');
    expect(sheet('src/primitives/ScrollArea/ScrollArea.css')).toContain('overflow: hidden auto;');
    expect(railOverflows({ clientHeight: 200 }, { offsetHeight: 200 })).toBe(false);
    expect(railOverflows({ clientHeight: 200 }, { offsetHeight: 201 })).toBe(false);
    expect(railOverflows({ clientHeight: 200 }, { offsetHeight: 240 })).toBe(true);
  });
});

describe('SidePanel on either side', () => {
  it('mirrors an end panel: the toggle points right while open, and the pane sits in the second column', () => {
    const html = draw({ side: 'end' });
    expect(html).toMatch(/^<div class="side-panel pane-edge-host side-panel--end side-panel--collapsible"/);
    expect(html).toContain('collapse-toggle--to-end pane-edge__toggle pane-edge__toggle--end" aria-label="Hide Sprites"');
    expect(draw({ side: 'end', defaultCollapsed: true })).toContain('collapse-toggle--to-start pane-edge__toggle pane-edge__toggle--end" aria-label="Show Sprites"');
    expect(sheet('src/composites/SidePanel/SidePanel.css')).toMatch(/\.side-panel--end \.side-panel__pane,\n\.side-panel--start \.side-panel__edge \{\s+grid-column: 2;/);
  });

  it('leaves the pointer to the content until a resize drag, then takes it from the body', () => {
    const css = sheet('src/composites/SidePanel/SidePanel.css');
    expect(css).toMatch(/\.side-panel--dragging \.side-panel__body \{\s+pointer-events: none;/);
    expect(rule(css, '.side-panel__body')).toMatch(/display: flex;[\s\S]*min-block-size: 0;/);
    expect(sheet('src/primitives/ScrollArea/ScrollArea.css')).toContain('overflow: hidden auto;');
  });

  it('keeps its width under storageKey and its fold under storageKey:collapsed', () => {
    const options = sidePanelOptionsOf({ title: 'Sprites', storageKey: 'studio.sprites', width: 300, minWidth: 200, maxWidth: 400 });
    expect(options.width).toEqual({ initial: 300, min: 200, max: 400, storageKey: 'studio.sprites' });
    expect(options.fold.storageKey).toBe('studio.sprites:collapsed');
    vi.stubGlobal('localStorage', { getItem: (name) => ({ 'studio.sprites': '999', 'studio.sprites:collapsed': 'false' })[name] ?? null });
    expect(draw({ storageKey: 'studio.sprites' })).toContain('--side-panel-width:448px');
    expect(sidePanelOptionsOf({ title: 'Profiles', width: 192, storageKey: 'controls.profiles' }).width).toEqual({ initial: 192, min: 192, max: 448, storageKey: 'controls.profiles' });
    expect(draw({ storageKey: 'controls.profiles', width: 192 })).toContain('--side-panel-width:192px');
  });
});
