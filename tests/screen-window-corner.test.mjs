/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ScreenWindow } from '../src/composites/ScreenWindow';

const close = () => undefined;
const draw = (props = {}) => renderToString(h(ScreenWindow, { title: 'Data', onClose: close, titleRow: false, ...props }, 'Body'));
const sheet = (file) => readFileSync(new URL(`../src/composites/${file}`, import.meta.url), 'utf8');
const dialogOf = (html) => html.match(/<div class="screen-layer__frame"[^>]*>/)?.[0] ?? '';
const cornerOf = (html) => html.slice(html.indexOf('screen-layer__corner'), html.indexOf('screen-layer__card'));

describe('ScreenWindow with no title row', () => {
  it('drops the title row and, with cornerTitle={false}, names the dialog by the title', () => {
    const html = draw({ cornerTitle: false });
    expect(html).not.toContain('window-header');
    expect(html).not.toContain('screen-window__corner-title');
    expect(dialogOf(html)).toContain('role="dialog" aria-modal="true" aria-label="Data"');
    expect(dialogOf(html)).not.toContain('aria-labelledby');
    expect(html).toContain('class="screen-window screen-window--bare"');
  });

  it('names the dialog by a hidden title when the title is not plain text and the chip is off', () => {
    const html = draw({ title: h('b', null, 'Data'), cornerTitle: false });
    const id = dialogOf(html).match(/aria-labelledby="([^"]+)"/)?.[1];
    expect(id).toBeTruthy();
    expect(html).toContain(`<span class="text-el text-el--span visually-hidden" id="${id}"><b>Data</b></span>`);
  });

  it('puts a round X on the corner of the card, drawn as the edge button of CollapseToggle', () => {
    const corner = cornerOf(draw());
    expect(corner).toMatch(/<button type="button" class="pressable edge-button hit-area screen-window__corner-close" aria-label="Close">/);
    expect(corner).not.toContain('screen-window__lock');
    expect(draw()).toContain('screen-layer--tight');
  });

  it('adds a lock left of the X with movable, pressed while locked', () => {
    const corner = cornerOf(draw({ movable: true }));
    expect(corner.indexOf('screen-window__lock')).toBeLessThan(corner.indexOf('screen-window__corner-close'));
    expect(corner).toContain('aria-label="Lock window position" aria-pressed="true"');
    expect(corner).toMatch(/<svg class="lock-glyph" data-locked="true"/);
    expect(draw({ movable: true })).not.toContain('screen-layer__move');
  });

  it('draws the move handle and eight resize edges once unlocked', () => {
    const html = draw({ movable: true, defaultLocked: false });
    expect(cornerOf(html)).toContain('aria-pressed="false"');
    expect(html).toContain('class="pressable screen-layer__move" aria-label="Move window" title="Drag it, or press the arrow keys"');
    expect(html.match(/class="rect-resize rect-resize--/g)).toHaveLength(8);
    expect(html).toContain('screen-layer--movable');
    expect(html.indexOf('screen-layer__move')).toBeLessThan(html.indexOf('screen-layer__card'));
  });

  it('keeps a window with its title row as it was', () => {
    const html = renderToString(h(ScreenWindow, { title: 'Data', onClose: close, movable: true }, 'Body'));
    expect(html).toContain('window-header');
    expect(html).not.toMatch(/screen-layer__corner|screen-layer--tight|screen-window--bare|screen-layer__move/);
    expect(dialogOf(html)).toContain('aria-labelledby');
  });
});

describe('the corner title of a window with no title row', () => {
  const chipOf = (html) => html.match(/<div [^>]*class="screen-window__corner-title"[\s\S]*?<\/span><\/div>/)?.[0] ?? '';
  const openTagOf = (chip) => chip.match(/^<div [^>]*>/)?.[0] ?? '';

  it('shows the title in a chip first in the corner, and the chip text names the dialog', () => {
    const html = draw({ movable: true });
    const corner = cornerOf(html);
    const id = dialogOf(html).match(/aria-labelledby="([^"]+)"/)?.[1];
    expect(id).toBeTruthy();
    expect(dialogOf(html)).not.toContain('aria-label=');
    expect(chipOf(html)).toContain(`<span class="text-el text-el--span screen-window__corner-text" id="${id}">Data</span>`);
    expect(corner.indexOf('screen-window__corner-title')).toBeLessThan(corner.indexOf('screen-window__lock'));
    expect(html).not.toMatch(/visually-hidden" id=/);
  });

  it('draws the icon before the text, hidden from screen readers, and the full title as a hover hint', () => {
    const chip = chipOf(draw({ icon: h('svg', { 'data-glyph': 'layers' }) }));
    expect(openTagOf(chip)).toContain('title="Data"');
    expect(chip).toMatch(/screen-window__corner-icon" aria-hidden="true"><svg data-glyph="layers"><\/svg><\/span><span[^>]*screen-window__corner-text/);
  });

  it('draws no icon slot and no hover hint when there is no icon and the title is not plain text', () => {
    const chip = chipOf(draw({ title: h('b', null, 'Data') }));
    expect(chip).not.toContain('screen-window__corner-icon');
    expect(openTagOf(chip)).not.toContain('title=');
    expect(chip).toContain('<b>Data</b>');
  });

  it('never adds a row inside the card', () => {
    const html = draw({ icon: h('svg') });
    expect(html.indexOf('screen-window__corner-title')).toBeLessThan(html.indexOf('screen-layer__card'));
    expect(html.slice(html.indexOf('screen-layer__card'))).not.toContain('screen-window__corner');
  });

  it('keeps a window with a title row or a header free of the chip', () => {
    const titled = renderToString(h(ScreenWindow, { title: 'Data', onClose: close }, 'Body'));
    const headed = renderToString(h(ScreenWindow, { title: 'Data', onClose: close, header: {} }, 'Body'));
    expect(titled).not.toContain('screen-window__corner-title');
    expect(headed).not.toContain('screen-window__corner-title');
  });

  it('matches the round buttons: same height, surface, border and shadow, dim small text, 14 px icon', () => {
    const css = sheet('ScreenWindow/sub-components/WindowCorner.css');
    const rule = css.match(/\.screen-window__corner-title \{[^}]*\}/)?.[0] ?? '';
    for (const decl of [
      'block-size: var(--collapse-toggle-d);',
      'border: var(--border-width-thin) solid var(--c-border-strong);',
      'border-radius: var(--radius-pill);',
      'padding: 0 calc(var(--collapse-toggle-d) / 2);',
      'line-height: 1;',
      'background: var(--c-layer);',
      'color: var(--c-text-dim);',
      'box-shadow: var(--shadow-lg);',
      'font-size: var(--text-xs);',
      'max-inline-size: var(--size-224);',
      'min-inline-size: 0;',
    ]) expect(rule).toContain(decl);
    expect(css).toMatch(/\.screen-window__corner-icon > svg \{\s+inline-size: var\(--size-14\);\s+block-size: var\(--size-14\);/);
    expect(css).toMatch(/\.screen-window__corner-text \{[^}]*text-overflow: ellipsis;/);
  });

  it('mirrors the X on the left and moves inside the card on a small layer', () => {
    const css = sheet('ScreenWindow/sub-components/WindowCorner.css');
    expect(css).toContain('.screen-layer__corner:has(> .screen-window__corner-title) {\n  left: calc(var(--collapse-toggle-d) / -2 + var(--space-xs));');
    expect(css).toMatch(/@container screen-layer \(width < 840px\) or \(height < 560px\) \{[^@]*\.screen-layer__corner:has\(> \.screen-window__corner-title\) \{\s+left: var\(--space-sm\);/);
    expect(css).toMatch(/\.platform-mobile \.screen-layer__corner:has\(> \.screen-window__corner-title\) \{\s+left: var\(--space-sm\);/);
  });
});

describe('the tight window', () => {
  it('pads the sides and bottom one step tighter and leaves space-sm under the switch', () => {
    const css = sheet('ScreenWindow/ScreenWindow.css');
    expect(css).toContain('padding: calc(var(--collapse-toggle-d) / 2 + var(--space-xs) + var(--space-sm)) var(--space-lg) var(--space-lg);');
    expect(css).toContain('padding-block-start: calc(var(--control-h-md) / 2 + var(--space-sm) - var(--border-width-thin));');
  });

  it('takes the next smaller space token for the gap around the card', () => {
    const css = sheet('ScreenLayer/ScreenLayer.css');
    expect(css).toContain('.screen-layer--tight .screen-layer__inset {\n  padding: max(calc(var(--control-h-md) / 2 + var(--space-md)), calc(var(--space-xl) + 5cqmin));');
    expect(css).toContain('.screen-layer--tight .screen-layer__inset { padding: max(calc(var(--control-h-md) / 2 + var(--space-md)), calc(var(--space-lg) + 3cqmin)); }');
    expect(css).toContain('.screen-layer--tight .screen-layer__inset { padding: calc(var(--control-h-md) / 2 + var(--space-md)); }');
  });

  it('morphs the lock on transform and stroke only, at once under reduced motion', () => {
    const css = sheet('ScreenWindow/sub-components/WindowCorner.css');
    expect(css).toMatch(/\.lock-glyph \{[^}]*stroke: var\(--c-text-muted\);/);
    expect(css).toMatch(/\.lock-glyph\[data-locked='true'\] \{\s+stroke: var\(--c-primary\);/);
    expect(css).toMatch(/transition:\s+transform var\(--duration-slow\) var\(--ease-in-out\),\s+stroke-dashoffset/);
    expect(css).toMatch(/prefers-reduced-motion: reduce\) \{\s+\.lock-glyph,\s+\.lock-glyph__shackle \{\s+transition: none;/);
  });
});
