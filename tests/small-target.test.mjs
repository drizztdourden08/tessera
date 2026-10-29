/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from '../src/primitives/Button';
import { IconButton } from '../src/primitives/IconButton';
import { Tag } from '../src/primitives/Tag';

const css = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8').replace(/\r\n/g, '\n');
const SHEET = css('src/theme/small-target.css');
const TOKENS = new Map(
  ['src/tokens/scale.css', 'src/tokens/size.css']
    .flatMap((path) => [...css(path).matchAll(/(--[\w-]+):\s*([^;]+);/g)])
    .map((match) => [match[1], match[2].trim()]),
);

const SIZE = (name) => Number(TOKENS.get(name).match(/^var\(--size-(\d+)\)$/)[1]);

const block = (selector) => SHEET.split(`\n${selector} {`).slice(1).map((part) => part.split('}')[0]).join('\n');
const GROUPED = '.btn-group > *';
const BUTTON = `.btn--xs:not(.btn--pixel, :has(.icon--pixel), ${GROUPED})`;
const ICON = `.icon-btn--xs:not(:has(.icon--pixel), ${GROUPED})`;
const TAG = '.tag--selectable:not(.tag--lg)';
const GAP = 'calc(var(--control-h-xs) + 2 * var(--target-gutter, var(--hit-gutter)))';

describe('small target hit area', () => {
  it('is 24 px: the 20 px control plus a 2 px gutter on each side, from tokens', () => {
    expect(SIZE('--hit-area-min')).toBe(24);
    expect(SIZE('--control-h-xs')).toBe(20);
    expect(TOKENS.get('--hit-gutter')).toBe('calc((var(--hit-area-min) - var(--control-h-xs)) / 2)');
    expect((SIZE('--hit-area-min') - SIZE('--control-h-xs')) / 2).toBe(2);
  });

  it('gives the xs IconButton a 24 by 24 box that takes no more room than the 20 px control', () => {
    const rule = block(ICON);
    expect(rule).toContain(`width: ${GAP};`);
    expect(rule).toContain(`height: ${GAP};`);
    expect(rule).toContain('margin-inline: calc(-1 * var(--target-gutter, var(--hit-gutter)));');
    expect(SHEET).toContain('margin-block: calc(-1 * var(--target-gutter, var(--hit-gutter)));');
  });

  it('gives the xs Button and the selectable Tag a 24 px high box that takes no more room than 20 px', () => {
    expect(block(BUTTON)).toContain(`min-block-size: ${GAP};`);
    expect(block(TAG)).toContain(`height: ${GAP};`);
    expect(SHEET).toContain('border-block-width: var(--target-gutter, var(--hit-gutter));');
  });

  it('draws the visible control on a pseudo element on the old 20 px box, with the same colours', () => {
    expect(SHEET).toContain('border-image: linear-gradient(transparent, transparent) 1;');
    expect(block(`${ICON}::before`)).toContain('inset: 0;');
    expect(block(`${ICON}::before`)).toContain('border-color: inherit;');
    expect(block(`${BUTTON}::before,
${TAG}::before`)).toContain('border-color: inherit;');
  });

  it('keeps the fill off the gutter in every state, through a selector that outranks the state rules', () => {
    const rule = block(`.btn--xs.btn--xs.btn--xs.btn--xs:not(.btn--pixel, :has(.icon--pixel), ${GROUPED}),
.icon-btn--xs.icon-btn--xs.icon-btn--xs.icon-btn--xs:not(:has(.icon--pixel), ${GROUPED}),
.tag--selectable.tag--selectable.tag--selectable.tag--selectable:not(.tag--lg)`);
    expect(rule).toContain('background-clip: padding-box;');
  });

  it('leaves out grouped buttons, the pixel look, the pixel icon and the large Tag', () => {
    expect(SHEET).not.toContain('.btn--xs:not(.btn--pixel, :has(.icon--pixel)) ');
    expect(SHEET.match(/\.btn-group > \*/g).length).toBeGreaterThan(5);
    expect(SHEET).toContain('.tag--selectable:not(.tag--lg)');
    expect(css('src/tokens/size.css')).toContain('--control-h-pixel: calc(var(--size-24) + 2 * var(--space-xs));');
  });
});

describe('small target neighbours', () => {
  it('moves the gradient glow onto the pseudo element so the gutter is not a hole in it', () => {
    expect(SHEET).toContain('.btn.btn--gradient.btn--xs.btn--xs:not(');
    expect(SHEET).toContain('box-shadow: 0 0 var(--glow-reach-strong) var(--tone-glow-strong);');
  });

  it('takes the highlight colour in forced colours on hover and on focus', () => {
    const media = SHEET.slice(SHEET.indexOf('@media (forced-colors: active)'));
    expect(media).toContain('outline-color: Highlight;');
    expect(media).toContain('border-color: Highlight;');
  });

  it('draws no gutter in the Toolbar and ActionBar measure rows, so tools measure as they lay out', () => {
    for (const path of ['src/composites/Toolbar/Toolbar.css', 'src/composites/ActionBar/ActionBar.css']) {
      expect(css(path)).toMatch(/__measure-row \{\n {2}--target-gutter: var\(--hit-gutter-none\);/);
    }
    expect(TOKENS.get('--hit-gutter-none')).toBe('calc(0 * var(--size-1))');
  });

  it('keeps the Widget title bar buttons at the 24 px they already drew', () => {
    expect(css('src/composites/Widget/sub-components/WidgetTitlebar.css')).toMatch(/\.widget__btn \{\n {2}--target-gutter: var\(--hit-gutter-none\);/);
  });

  it('puts 4 px between the xs tools of an ActionTile and the end of a document tab, so their 24 px boxes do not overlap', () => {
    expect(css('src/composites/ActionTile/ActionTile.css')).toMatch(/\.action-tile__tools \{[^}]*gap: var\(--space-xs\);/);
    expect(css('src/composites/DocumentTabs/sub-components/DocumentTabClose.css')).toMatch(/\.document-tabs__end \{[^}]*gap: var\(--space-xs\);/);
  });

  it('loads with Button, IconButton and Tag', () => {
    for (const path of ['Button/Button.tsx', 'IconButton/IconButton.tsx', 'Tag/Tag.tsx']) {
      expect(css(`src/primitives/${path}`)).toContain("import '../../theme/small-target.css';");
    }
  });

  it('keeps the xs class names the sheet matches', () => {
    expect(renderToString(h(Button, { size: 'xs' }, 'Edit'))).toContain('btn--xs');
    expect(renderToString(h(IconButton, { size: 'xs', label: 'More' }, 'x'))).toContain('icon-btn--xs');
    expect(renderToString(h(Tag, { selected: false, onSelect: () => undefined }, 'Boss'))).toContain('tag--selectable');
  });
});
