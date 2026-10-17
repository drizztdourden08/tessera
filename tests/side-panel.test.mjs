/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SidePanel } from '../src/composites/SidePanel';
import { sidePanelOptionsOf } from '../src/composites/SidePanel/behavior/side-panel-options-of';

const draw = (extra = {}) => renderToString(h(SidePanel, { title: 'Sprites', ...extra }, h('p', null, 'Rows')));
const paneIdOf = (html) => /<aside id="([^"]+)" aria-label="Sprites" class="box--raised side-panel__pane"/.exec(html)?.[1];

afterEach(() => vi.unstubAllGlobals());

describe('SidePanel', () => {
  it('is a raised aside named by its title, with a Card heading, the body and the resize line after it', () => {
    const html = draw();
    expect(html).toMatch(/^<div class="side-panel side-panel--start side-panel--collapsible" style="--side-panel-width:288px"><div class="side-panel__frame">/);
    expect(html).toContain('aria-label="Sprites" class="box--raised side-panel__pane"');
    expect(html).toMatch(/class="section-header card__header card__header--neutral"><div class="section-header__text"><h2[^>]*>Sprites/);
    expect(html).toMatch(/class="side-panel__body"><p>Rows<\/p><\/div><\/aside><\/div><div class="resize-handle[^"]*side-panel__handle"/);
    expect(html).toMatch(/role="separator"[^>]*aria-label="Resize Sprites"[^>]*aria-valuenow="288" aria-valuemin="224" aria-valuemax="448"/);
  });

  it('folds with the shared CollapseToggle on its inner edge, which names it and controls the panel', () => {
    const html = draw();
    expect(html).toContain(`class="pressable edge-button hit-area collapse-toggle collapse-toggle--to-start side-panel__toggle" aria-label="Hide Sprites" title="Hide Sprites" aria-expanded="true" aria-controls="${paneIdOf(html)}"`);
    expect(html).toMatch(/<div class="side-panel__frame"><button[^>]*collapse-toggle[^>]*>.*<\/button><aside/);
    expect(draw({ collapsible: false })).not.toContain('collapse-toggle');
    expect(draw({ collapsible: false })).not.toContain('side-panel--collapsible');
  });

  it('puts its actions alone in the heading', () => {
    const html = draw({ actions: h('button', { type: 'button', className: 'add' }, 'Add') });
    expect(html).toContain('class="side-panel__tools"><button type="button" class="add">Add</button></div>');
    expect(draw()).not.toContain('side-panel__tools');
  });

  it('draws a folded panel as the shared rail with the toggle pointing out, keeps its content mounted, and has no line', () => {
    const html = draw({ defaultCollapsed: true });
    expect(html).toContain('class="side-panel side-panel--start side-panel--collapsible side-panel--overhang side-panel--collapsed"');
    expect(html).toMatch(/collapse-toggle--to-end[^"]*" aria-label="Show Sprites" title="Show Sprites" aria-expanded="false"/);
    expect(html).toMatch(/aria-label="Sprites" class="side-panel__pane"><div class="pane-rail pane-rail--folded page-card"><span class="text-el text-el--span pane-rail__label" aria-hidden="true">Sprites<\/span><\/div>/);
    expect(html).toContain('class="side-panel__body"><p>Rows</p>');
    expect(html).not.toContain('role="separator"');
  });

  it('shows the rail content in place of the title while folded', () => {
    const rail = h('button', { type: 'button', className: 'pick' }, 'P');
    const html = draw({ defaultCollapsed: true, rail });
    expect(html).toContain('class="pane-rail pane-rail--folded page-card"><div class="pane-rail__content"><button type="button" class="pick">P</button></div></div>');
    expect(html).not.toContain('pane-rail__label');
    expect(draw({ rail })).not.toContain('class="pick"');
  });

  it('puts the line before an end panel, its toggle pointing right while open', () => {
    const html = draw({ side: 'end' });
    expect(html).toMatch(/^<div class="side-panel side-panel--end side-panel--collapsible"[^>]*><div class="resize-handle[^"]*"[^>]*role="separator"/);
    expect(html).toContain('collapse-toggle--to-end side-panel__toggle" aria-label="Hide Sprites"');
    expect(draw({ side: 'end', defaultCollapsed: true })).toContain('collapse-toggle--to-start side-panel__toggle" aria-label="Show Sprites"');
    expect(draw({ resizable: false })).not.toContain('role="separator"');
    expect(draw({ resizable: false })).toContain('side-panel--overhang');
  });

  it('leaves the pointer to the content until a resize drag, then takes it from the body', () => {
    const css = fs.readFileSync('src/composites/SidePanel/SidePanel.css', 'utf8');
    expect(css).toMatch(/\.side-panel--dragging \.side-panel__body \{\s+pointer-events: none;/);
    expect(css).toMatch(/\.side-panel__body \{[^}]*padding: var\(--space-md\);[^}]*overflow-y: auto;/);
  });

  it('keeps its width under storageKey and its fold under storageKey:collapsed', () => {
    const options = sidePanelOptionsOf({ title: 'Sprites', storageKey: 'studio.sprites', width: 300, minWidth: 200, maxWidth: 400 });
    expect(options.width).toEqual({ initial: 300, min: 200, max: 400, storageKey: 'studio.sprites' });
    expect(options.fold.storageKey).toBe('studio.sprites:collapsed');
    vi.stubGlobal('localStorage', { getItem: (name) => ({ 'studio.sprites': '999', 'studio.sprites:collapsed': 'false' })[name] ?? null });
    expect(draw({ storageKey: 'studio.sprites' })).toContain('--side-panel-width:448px');
  });
});
