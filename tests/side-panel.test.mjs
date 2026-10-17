/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { railOverflows } from '../src/composites/pane-fold/rail-overflows';
import { SidePanel } from '../src/composites/SidePanel';
import { sidePanelOptionsOf } from '../src/composites/SidePanel/behavior/side-panel-options-of';

const draw = (extra = {}) => renderToString(h(SidePanel, { title: 'Sprites', ...extra }, h('p', null, 'Rows')));
const paneIdOf = (html) => /<aside id="([^"]+)" aria-label="Sprites"/.exec(html)?.[1];
const sheet = (file) => fs.readFileSync(file, 'utf8');
const rule = (css, selector) => new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\{([^}]*)\\}`).exec(css)?.[1] ?? '';
const add = h('button', { type: 'button', className: 'add' }, 'Add');
const pick = h('button', { type: 'button', className: 'pick' }, 'P');

afterEach(() => vi.unstubAllGlobals());

describe('SidePanel', () => {
  it('is a sunken aside named by its title, with a Card heading, the body and the resize line after it', () => {
    const html = draw();
    expect(html).toMatch(/^<div class="side-panel side-panel--start side-panel--collapsible" style="--side-panel-width:288px"><button/);
    expect(html).toContain('aria-label="Sprites" class="box--sunken side-panel__pane"');
    expect(html).toMatch(/class="section-header card__header card__header--neutral"><div class="section-header__text"><h2[^>]*>Sprites/);
    expect(html).toMatch(/class="side-panel__body"><p>Rows<\/p><\/div><\/aside><div class="resize-handle[^"]*side-panel__handle"/);
    expect(html).toMatch(/role="separator"[^>]*aria-label="Resize Sprites"[^>]*aria-valuenow="288" aria-valuemin="224" aria-valuemax="448"/);
  });

  it('folds with the shared CollapseToggle, first in the panel, which names it and controls it', () => {
    const html = draw();
    expect(html).toContain(`class="pressable edge-button hit-area collapse-toggle collapse-toggle--to-start side-panel__toggle" aria-label="Hide Sprites" title="Hide Sprites" aria-expanded="true" aria-controls="${paneIdOf(html)}"`);
    expect(draw({ collapsible: false })).not.toContain('collapse-toggle');
    expect(draw({ collapsible: false })).not.toContain('side-panel--collapsible');
  });

  it('keeps the line and the toggle without resizable, and drops only the grip and the drag', () => {
    const html = draw({ resizable: false });
    expect(html).not.toContain('role="separator"');
    expect(html).toMatch(/<\/aside><div class="side-panel__line" aria-hidden="true"><\/div><\/div>$/);
    expect(html).toContain('side-panel__toggle');
    expect(draw({ defaultCollapsed: true })).toContain('<div class="side-panel__line" aria-hidden="true"></div>');
  });

  it('sets the toggle on the line in the row of the heading, so it lines up whatever the heading height', () => {
    const css = sheet('src/composites/SidePanel/SidePanel.css');
    expect(rule(css, '.side-panel')).toContain('grid-template-rows: minmax(var(--size-40), auto) minmax(0, 1fr);');
    expect(rule(css, '.side-panel__pane')).toMatch(/grid-row: 1 \/ -1;\s+grid-template-rows: subgrid;/);
    expect(rule(css, '.side-panel__toggle')).toMatch(/grid-row: 1;\s+align-self: center;/);
    expect(rule(css, '.side-panel__pane > .card__header')).toContain('grid-row: 1;');
    expect(rule(css, '.side-panel__pane .pane-rail__actions')).toMatch(/grid-row: 1;\s+align-self: center;/);
    expect(css).toMatch(/\.side-panel--start :is\(\.side-panel__toggle, \.side-panel__handle, \.side-panel__line\) \{\s+grid-column: 2;/);
  });
});

describe('SidePanel folded', () => {
  it('puts its actions alone in the heading while open, and at the top of the rail while folded', () => {
    expect(draw({ actions: add })).toContain('class="side-panel__tools"><button type="button" class="add">Add</button></div>');
    expect(draw()).not.toContain('side-panel__tools');
    const folded = draw({ actions: add, defaultCollapsed: true });
    expect(folded).toContain('<div class="pane-rail__actions"><button type="button" class="add">Add</button></div>');
    expect(folded.match(/class="add"/g)).toHaveLength(1);
  });

  it('folds to the shared sunken rail: actions, the title written sideways, then the rail icons, with the content kept mounted', () => {
    const html = draw({ defaultCollapsed: true, actions: add, rail: pick });
    expect(html).toContain('class="side-panel side-panel--start side-panel--collapsible side-panel--collapsed"');
    expect(html).toMatch(/collapse-toggle--to-end[^"]*" aria-label="Show Sprites" title="Show Sprites" aria-expanded="false"/);
    expect(html).toContain(
      'aria-label="Sprites" class="side-panel__pane"><div class="box--sunken pane-rail pane-rail--folded pane-rail--start"><div class="pane-rail__actions">'
      + '<button type="button" class="add">Add</button></div><div class="pane-rail__items"><span class="text-el text-el--span pane-rail__label" aria-hidden="true">Sprites</span>'
      + '<div class="pane-rail__content"><div class="pane-rail__list"><button type="button" class="pick">P</button></div></div></div></div>',
    );
    expect(html).toContain('class="side-panel__body"><p>Rows</p>');
    expect(html).not.toContain('role="separator"');
    expect(draw({ rail: pick })).not.toContain('class="pick"');
  });

  it('reads the sideways title up on a left panel and down on a right one', () => {
    const css = sheet('src/composites/pane-fold/PaneRail.css');
    expect(rule(css, '.pane-rail__label')).toContain('writing-mode: vertical-rl;');
    expect(rule(css, '.pane-rail--start .pane-rail__label')).toContain('rotate: 180deg;');
    expect(css).not.toMatch(/\.pane-rail--end \.pane-rail__label/);
    expect(draw({ side: 'end', defaultCollapsed: true })).toContain('pane-rail--folded pane-rail--end');
  });

  it('lets a glow around a rail icon spread past the rail, and scrolls and clips only a rail too long to fit', () => {
    const panel = sheet('src/composites/SidePanel/SidePanel.css');
    const rail = sheet('src/composites/pane-fold/PaneRail.css');
    expect(rule(panel, '.side-panel--collapsed .side-panel__pane')).toContain('overflow: visible;');
    expect(rule(rail, '.pane-rail--folded')).not.toMatch(/overflow/);
    expect(rule(rail, '.pane-rail__items')).not.toMatch(/overflow/);
    expect(rule(rail, '.pane-rail__content')).not.toMatch(/overflow/);
    expect(rule(rail, '.pane-rail__content--scroll')).toContain('overflow-y: auto;');
    expect(railOverflows({ clientHeight: 200 }, { offsetHeight: 200 })).toBe(false);
    expect(railOverflows({ clientHeight: 200 }, { offsetHeight: 201 })).toBe(false);
    expect(railOverflows({ clientHeight: 200 }, { offsetHeight: 240 })).toBe(true);
  });
});

describe('SidePanel on either side', () => {
  it('mirrors an end panel: the toggle points right while open, and the pane sits in the second column', () => {
    const html = draw({ side: 'end' });
    expect(html).toMatch(/^<div class="side-panel side-panel--end side-panel--collapsible"/);
    expect(html).toContain('collapse-toggle--to-end side-panel__toggle" aria-label="Hide Sprites"');
    expect(draw({ side: 'end', defaultCollapsed: true })).toContain('collapse-toggle--to-start side-panel__toggle" aria-label="Show Sprites"');
    expect(sheet('src/composites/SidePanel/SidePanel.css')).toMatch(/\.side-panel--end \.side-panel__pane,\n\.side-panel--start :is\([^)]*\) \{\s+grid-column: 2;/);
  });

  it('leaves the pointer to the content until a resize drag, then takes it from the body', () => {
    const css = sheet('src/composites/SidePanel/SidePanel.css');
    expect(css).toMatch(/\.side-panel--dragging \.side-panel__body \{\s+pointer-events: none;/);
    expect(rule(css, '.side-panel__body')).toMatch(/padding: var\(--space-md\);\s+overflow-y: auto;/);
  });

  it('keeps its width under storageKey and its fold under storageKey:collapsed', () => {
    const options = sidePanelOptionsOf({ title: 'Sprites', storageKey: 'studio.sprites', width: 300, minWidth: 200, maxWidth: 400 });
    expect(options.width).toEqual({ initial: 300, min: 200, max: 400, storageKey: 'studio.sprites' });
    expect(options.fold.storageKey).toBe('studio.sprites:collapsed');
    vi.stubGlobal('localStorage', { getItem: (name) => ({ 'studio.sprites': '999', 'studio.sprites:collapsed': 'false' })[name] ?? null });
    expect(draw({ storageKey: 'studio.sprites' })).toContain('--side-panel-width:448px');
    expect(sidePanelOptionsOf({ title: 'Profiles', width: 192, resizable: false, storageKey: 'controls.profiles' }).width).toEqual({ initial: 192, min: 192, max: 192, storageKey: undefined });
    expect(draw({ storageKey: 'studio.sprites', resizable: false, width: 192 })).toContain('--side-panel-width:192px');
  });
});
