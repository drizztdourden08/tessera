/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from '../src/primitives/Button';
import { Checkbox } from '../src/primitives/Checkbox';
import { Disclosure } from '../src/primitives/Disclosure';
import { Toggle } from '../src/primitives/Toggle';
import { DisabledOverlay } from '../src/composites/DisabledOverlay';
import { WindowHeader } from '../src/composites/WindowHeader';
import { Image, isPixelArt, usePixelArt } from '../src/primitives';
import { imageClass } from '../src/primitives/Image/behavior/image-class';

const ignore = () => undefined;
const css = (file) => fs.readFileSync(file, 'utf8');

describe('Button iconEnd', () => {
  it('draws the trailing icon after the label, beside a leading icon', () => {
    const html = renderToString(h(Button, { icon: h('i', { id: 'lead' }), iconEnd: h('i', { id: 'trail' }) }, 'Save'));
    expect(html.indexOf('id="lead"')).toBeLessThan(html.indexOf('Save'));
    expect(html.indexOf('Save')).toBeLessThan(html.indexOf('id="trail"'));
    expect(html).toContain('btn__icon btn__icon--end');
  });

  it('draws no end slot without iconEnd, and hides it under the spinner while loading', () => {
    expect(renderToString(h(Button, null, 'Save'))).not.toContain('btn__icon--end');
    expect(css('src/primitives/Button/Button.css')).toMatch(/\.btn--loading:has\(> \.btn__spinner\) > \.btn__icon--end/);
  });
});

describe('labelSize on Toggle and Checkbox', () => {
  it('sets the label text from the type scale, apart from the control size', () => {
    const toggle = renderToString(h(Toggle, { checked: true, onChange: ignore, label: 'Music', labelSize: 'sm' }));
    expect(toggle).toContain('control-size--md label-size--sm');
    const box = renderToString(h(Checkbox, { checked: true, onChange: ignore, label: 'Hints', size: 'sm', labelSize: 'md' }));
    expect(box).toContain('control-size--sm label-size--md');
    expect(css('src/theme/label-size.css')).toMatch(/\.label-size--sm \{\s+--label-font: var\(--text-sm\);/);
    expect(css('src/theme/label-size.css')).toMatch(/\.label-size--md \{\s+--label-font: var\(--text-base\);/);
  });

  it('keeps the label on the control size when labelSize is left out', () => {
    expect(renderToString(h(Toggle, { checked: false, onChange: ignore, label: 'Music' }))).not.toContain('label-size--');
    expect(renderToString(h(Checkbox, { checked: false, onChange: ignore, label: 'Hints' }))).not.toContain('label-size--');
    for (const file of ['src/primitives/Toggle/Toggle.css', 'src/primitives/Checkbox/Checkbox.css']) {
      expect(css(file)).toContain('font-size: var(--label-font, var(--control-font));');
    }
  });
});

describe('Disclosure bodyClassName', () => {
  it('adds the class to the body and keeps the body class', () => {
    expect(renderToString(h(Disclosure, { summary: 'Log', bodyClassName: 'log-rows' }, 'Rows'))).toContain('class="disclosure__body log-rows"');
    expect(renderToString(h(Disclosure, { summary: 'Log' }, 'Rows'))).toContain('class="disclosure__body"');
  });
});

describe('WindowHeader titleWrap', () => {
  it('marks the header so the title wraps in place of the ellipsis', () => {
    expect(renderToString(h(WindowHeader, { title: 'A long save name', titleWrap: true }))).toContain('window-header window-header--wrap');
    expect(renderToString(h(WindowHeader, { title: 'Saves' }))).not.toContain('window-header--wrap');
    expect(css('src/composites/WindowHeader/WindowHeader.css')).toMatch(/\.window-header--wrap \.window-header__subtitle \{[^}]*white-space: normal;/);
  });
});

describe('Image fit and pixelated', () => {
  it('fills the box with cover by default, and takes contain, fill or none', () => {
    expect(renderToString(h(Image, { src: 'a.png', alt: 'A' }))).not.toContain('image--fit-');
    for (const fit of ['contain', 'fill', 'none']) {
      expect(renderToString(h(Image, { src: 'a.png', alt: 'A', fit }))).toContain(`image--fit-${fit}`);
    }
    expect(css('src/primitives/Image/Image.css')).toMatch(/\.image--fit-contain > \.image__img \{\s+object-fit: contain;/);
  });

  it('draws hard pixel edges when asked, or on auto once a picture of 256 px or less has loaded', () => {
    expect(renderToString(h(Image, { src: 'a.png', alt: 'A', pixelated: true }))).toContain('image--pixelated');
    expect(renderToString(h(Image, { src: 'a.png', alt: 'A', pixelated: 'auto' }))).not.toContain('image--pixelated');
    expect(imageClass({ status: 'loaded', pixelated: 'auto', natural: { width: 16, height: 16 } })).toContain('image--pixelated');
    expect(imageClass({ status: 'loaded', pixelated: 'auto', natural: { width: 1280, height: 720 } })).not.toContain('image--pixelated');
    expect(css('src/primitives/Image/Image.css')).toMatch(/\.image--pixelated > \.image__img \{\s+image-rendering: pixelated;/);
  });

  it('shares the test as isPixelArt and usePixelArt, for an img of the app', () => {
    expect(isPixelArt({ width: 256, height: 128 })).toBe(true);
    expect(isPixelArt({ width: 257, height: 16 })).toBe(false);
    expect(isPixelArt(null)).toBe(false);
    const seen = [];
    const Probe = () => {
      const art = usePixelArt();
      seen.push(art);
      return null;
    };
    renderToString(h(Probe));
    expect(seen[0].pixelArt).toBe(false);
    expect(seen[0].onLoad).toBeTypeOf('function');
  });
});

describe('DisabledOverlay tone', () => {
  const draw = (tone) => renderToString(h(DisabledOverlay, { active: true, tone, onOpenSettings: ignore }, 'Body'));

  it('keeps the secondary look by default and colours the scrim and button by tone', () => {
    expect(draw()).toContain('disabled-overlay disabled-overlay--secondary');
    expect(draw()).toContain('btn--secondary');
    expect(draw('warning')).toContain('disabled-overlay disabled-overlay--warning');
    expect(draw('warning')).toContain('btn--warning');
    const sheet = css('src/composites/DisabledOverlay/DisabledOverlay.css');
    expect(sheet).toMatch(/\.disabled-overlay--secondary \{\s+--disabled-fill: var\(--c-secondary-scrim\);\s+--disabled-edge: var\(--c-secondary-bright\);\s+--disabled-ink: var\(--c-text\);/);
    for (const tone of ['primary', 'info', 'success', 'warning', 'danger']) expect(sheet).toContain(`--disabled-fill: var(--c-${tone}-soft);`);
  });
});
