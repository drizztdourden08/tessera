/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from '../src/primitives/Button';
import { IconButton } from '../src/primitives/IconButton';
import { Tag } from '../src/primitives/Tag';

const css = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const SHEET = css('src/theme/small-target.css');
const TOKENS = new Map(
  ['src/tokens/scale.css', 'src/tokens/size.css']
    .flatMap((path) => [...css(path).matchAll(/(--[\w-]+):\s*([^;]+);/g)])
    .map((match) => [match[1], match[2].trim()]),
);

const SIZE = (name) => Number(TOKENS.get(name).match(/^var\(--size-(\d+)\)$/)[1]);

const block = (selector) => SHEET.split(`\n${selector} {`).slice(1).map((part) => part.split('}')[0]).join('\n');
const BUTTON = '.btn--xs:not(.btn--pixel, :has(.icon--pixel))';
const ICON = '.icon-btn--xs:not(:has(.icon--pixel))';
const TAG = '.tag--selectable:not(.tag--lg)';

describe('small target hit area', () => {
  it('is 24 px: the 20 px control plus a 2 px gutter on each side, from tokens', () => {
    expect(SIZE('--hit-area-min')).toBe(24);
    expect(SIZE('--control-h-xs')).toBe(20);
    expect(TOKENS.get('--hit-gutter')).toBe('calc((var(--hit-area-min) - var(--control-h-xs)) / 2)');
    expect((SIZE('--hit-area-min') - SIZE('--control-h-xs')) / 2).toBe(2);
  });

  it('gives the xs IconButton a 24 by 24 box that takes no more room than the 20 px control', () => {
    const rule = block(ICON);
    expect(rule).toContain('width: var(--hit-area-min);');
    expect(rule).toContain('height: var(--hit-area-min);');
    expect(rule).toContain('margin-inline: calc(-1 * var(--hit-gutter));');
    expect(SHEET).toContain('margin-block: calc(-1 * var(--hit-gutter));');
  });

  it('gives the xs Button and the selectable Tag a 24 px high box that takes no more room than 20 px', () => {
    expect(block(BUTTON)).toContain('min-block-size: var(--hit-area-min);');
    expect(block(TAG)).toContain('height: var(--hit-area-min);');
    expect(SHEET).toContain('border-block-width: var(--hit-gutter);');
  });

  it('draws the visible control on a pseudo element on the old 20 px box, with the same colours', () => {
    expect(SHEET).toContain('border-image: linear-gradient(transparent, transparent) 1;');
    expect(SHEET).toContain('background-clip: padding-box;');
    expect(block(`${ICON}::before`)).toContain('inset: 0;');
    expect(block(`${ICON}::before`)).toContain('border-color: inherit;');
    expect(block(`${BUTTON}::before,\n${TAG}::before`)).toContain('border-color: inherit;');
  });

  it('leaves out the pixel look, the pixel icon and the large Tag, which are already 24 px or more', () => {
    expect(SHEET).toContain(':not(.btn--pixel, :has(.icon--pixel))');
    expect(SHEET).toContain('.tag--selectable:not(.tag--lg)');
    expect(css('src/tokens/size.css')).toContain('--control-h-pixel: calc(var(--size-24) + 2 * var(--space-xs));');
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
