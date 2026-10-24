/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from '../src/primitives/Button';
import { Icon, PIXEL_GRID_SIZE, pixelIconSize } from '../src/primitives/Icon';
import { IconButton } from '../src/primitives/IconButton';

const sizeOf = (html) => html.match(/<svg[^>]* width="([^"]+)" height="([^"]+)"/)?.slice(1, 3);
const css = (path) => fs.readFileSync(path, 'utf8');

describe('the pixel icon size', () => {
  it('exposes the grid size', () => {
    expect(PIXEL_GRID_SIZE).toBe(24);
  });

  it.each([[16, 24], [30, 24], [40, 48], [48, 48], [59, 48], [64, 72], [1, 24]])('snaps %i px to %i px', (size, snapped) => {
    expect(pixelIconSize(size)).toBe(snapped);
  });

  it('draws a pixel icon at the snapped size, also with no size and with a size as a string', () => {
    expect(sizeOf(renderToString(h(Icon, { name: 'pixel-pencil', size: 16 })))).toEqual(['24', '24']);
    expect(sizeOf(renderToString(h(Icon, { name: 'pixel-pencil', size: 40 })))).toEqual(['48', '48']);
    expect(sizeOf(renderToString(h(Icon, { name: 'pixel-pencil', size: '48' })))).toEqual(['48', '48']);
    expect(sizeOf(renderToString(h(Icon, { name: 'pixel-pencil' })))).toEqual(['24', '24']);
    expect(renderToString(h(Icon, { name: 'pixel-pencil', className: 'mine' }))).toContain('icon--pixel mine');
  });

  it('keeps the size of a smooth icon', () => {
    expect(sizeOf(renderToString(h(Icon, { name: 'pencil', size: 16 })))).toEqual(['16', '16']);
    expect(sizeOf(renderToString(h(Icon, { name: 'pencil', size: 30 })))).toEqual(['30', '30']);
    expect(sizeOf(renderToString(h(Icon, { name: 'pencil' })))).toEqual(['16', '16']);
    expect(renderToString(h(Icon, { name: 'pencil' }))).not.toContain('icon--pixel');
  });

  it('draws a pixel icon in a Button at 24 px, not the font size of its slot', () => {
    const html = renderToString(h(Button, { size: 'sm', icon: h(Icon, { name: 'pixel-pencil' }) }, 'Pencil'));
    expect(sizeOf(html)).toEqual(['24', '24']);
    expect(html).toContain('icon--pixel');
  });

  it('lets xs and sm IconButton and Button grow to hold a 24 px icon, from one token', () => {
    expect(css('src/tokens/size.css')).toContain('--control-h-pixel: calc(var(--size-24) + 2 * var(--space-xs));');
    expect(css('src/primitives/IconButton/IconButton.css')).toMatch(
      /\.icon-btn--xs:has\(\.icon--pixel\),\r?\n\.icon-btn--sm:has\(\.icon--pixel\) \{\s+width: var\(--control-h-pixel\);\s+height: var\(--control-h-pixel\);/,
    );
    expect(css('src/primitives/Button/Button.css')).toMatch(
      /\.btn--xs:has\(\.icon--pixel\),\r?\n\.btn--sm:has\(\.icon--pixel\) \{\s+min-block-size: var\(--control-h-pixel\);/,
    );
    expect(renderToString(h(IconButton, { label: 'Pencil' }, h(Icon, { name: 'pixel-pencil' })))).toContain('icon--pixel');
  });
});
