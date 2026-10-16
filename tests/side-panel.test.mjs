/* @layer tooling-scripts @kind test */
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
    expect(html).toMatch(/^<div class="side-panel side-panel--start" style="--side-panel-width:288px">/);
    expect(html).toContain('aria-label="Sprites" class="box--raised side-panel__pane"');
    expect(html).toMatch(/class="section-header card__header card__header--neutral"><div class="section-header__text"><h2[^>]*>Sprites/);
    expect(html).toMatch(/class="side-panel__body"><p>Rows<\/p><\/div><\/aside><div class="resize-handle[^"]*side-panel__handle"/);
    expect(html).toMatch(/role="separator"[^>]*aria-label="Resize Sprites"[^>]*aria-valuenow="288" aria-valuemin="224" aria-valuemax="448"/);
  });

  it('folds with a button in the heading that names it and controls the panel', () => {
    const html = draw();
    expect(html).toContain(`aria-label="Hide Sprites" title="Hide Sprites" aria-expanded="true" aria-controls="${paneIdOf(html)}"`);
    expect(draw({ collapsible: false })).not.toContain('pane-fold-button');
  });

  it('puts its actions in the heading before the fold button', () => {
    const html = draw({ actions: h('button', { type: 'button', className: 'add' }, 'Add') });
    expect(html).toMatch(/class="side-panel__tools"><button type="button" class="add">Add<\/button><button[^>]*pane-fold-button/);
  });

  it('draws a folded panel as the shared rail: the button, the title down the side, no line', () => {
    const html = draw({ defaultCollapsed: true });
    expect(html).toContain('class="side-panel side-panel--start side-panel--collapsed"');
    expect(html).toMatch(/class="box--raised side-panel__pane"><div class="pane-rail pane-rail--folded"><button[^>]*aria-label="Show Sprites"[^>]*aria-expanded="false"/);
    expect(html).toContain('class="text-el text-el--span pane-rail__label" aria-hidden="true">Sprites</span>');
    expect(html).not.toContain('role="separator"');
    expect(html).not.toContain('side-panel__body');
  });

  it('puts the line before an end panel and drags it from that edge', () => {
    const html = draw({ side: 'end' });
    expect(html).toMatch(/^<div class="side-panel side-panel--end"[^>]*><div class="resize-handle[^"]*"[^>]*role="separator"/);
    expect(html).toContain('aria-label="Hide Sprites"');
    expect(draw({ resizable: false })).not.toContain('role="separator"');
  });

  it('keeps its width under storageKey and its fold under storageKey:collapsed', () => {
    const options = sidePanelOptionsOf({ title: 'Sprites', storageKey: 'studio.sprites', width: 300, minWidth: 200, maxWidth: 400 });
    expect(options.width).toEqual({ initial: 300, min: 200, max: 400, storageKey: 'studio.sprites' });
    expect(options.fold.storageKey).toBe('studio.sprites:collapsed');
    vi.stubGlobal('localStorage', { getItem: (name) => ({ 'studio.sprites': '999', 'studio.sprites:collapsed': 'false' })[name] ?? null });
    expect(draw({ storageKey: 'studio.sprites' })).toContain('--side-panel-width:448px');
  });
});
