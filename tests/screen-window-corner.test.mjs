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
  it('drops the title row and names the dialog by the title', () => {
    const html = draw();
    expect(html).not.toContain('window-header');
    expect(dialogOf(html)).toContain('role="dialog" aria-modal="true" aria-label="Data"');
    expect(dialogOf(html)).not.toContain('aria-labelledby');
    expect(html).toContain('class="screen-window screen-window--bare"');
  });

  it('names the dialog by a hidden title when the title is not plain text', () => {
    const html = draw({ title: h('b', null, 'Data') });
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
