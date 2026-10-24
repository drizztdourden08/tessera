/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import path from 'node:path';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Icon, ICONS } from '../src/primitives/Icon';
import { pixelGridIcon } from '../src/primitives/Icon/behavior/pixel-grid-icon';
import { pixelGridPath } from '../src/primitives/Icon/behavior/pixel-grid-path';
import { pixelGridProblems } from '../src/primitives/Icon/behavior/pixel-grid-problems';
import { PIXEL_GRIDS, PIXEL_ICONS } from '../src/primitives/icon-sets/pixel.constants';

const SETS = path.resolve('src/primitives/icon-sets');
const SET_FILES = fs.readdirSync(SETS).filter((file) => /^pixel-.+\.constants\.ts$/.test(file));
const blank = () => Array.from({ length: 16 }, () => '.'.repeat(16));
const withRow = (y, row) => blank().map((line, i) => (i === y ? row : line));

describe('the pixel grid files', () => {
  it('finds at least one file for a group of pixel icons', () => {
    expect(SET_FILES).toContain('pixel-tools-draw.constants.ts');
  });

  for (const file of SET_FILES) {
    it(`${file} holds only 16 by 16 grids of # and ., each named pixel-<name>`, async () => {
      const exported = await import(path.join(SETS, file));
      const grids = Object.values(exported).flatMap((group) => Object.entries(group));
      expect(grids.length).toBeGreaterThan(0);
      for (const [name, grid] of grids) {
        expect(name, name).toMatch(/^pixel-[a-z0-9]+(-[a-z0-9]+)*$/);
        expect(pixelGridProblems(grid), name).toEqual([]);
      }
    });
  }

  it('gives every icon its own drawing and its own name across all groups', () => {
    const drawings = Object.values(PIXEL_GRIDS).map((grid) => grid.join('/'));
    expect(new Set(drawings).size).toBe(drawings.length);
    expect(Object.keys(PIXEL_ICONS)).toEqual(Object.keys(PIXEL_GRIDS));
  });

  it('reports a grid that is too small, has a stray character or is empty', () => {
    expect(pixelGridProblems(blank().slice(1))).toContain('has 15 rows, wants 16');
    expect(pixelGridProblems(withRow(3, '#'.repeat(15)))).toEqual(['row 3 is not 16 characters of # and .']);
    expect(pixelGridProblems(withRow(3, 'x'.repeat(16)))[0]).toMatch(/^row 3 is not 16 characters/);
    expect(pixelGridProblems(blank())).toEqual(['has no inked pixel']);
  });
});

describe('turning a grid into a path', () => {
  it('draws each run of inked pixels in a row as one rectangle', () => {
    expect(pixelGridPath(withRow(2, '..###..#........'))).toBe('M2 2h3v1h-3zM7 2h1v1h-1z');
  });

  it('draws nothing for an empty grid and one rectangle per row for a block', () => {
    expect(pixelGridPath(blank())).toBe('');
    expect(pixelGridPath(['##', '##'])).toBe('M0 0h2v1h-2zM0 1h2v1h-2z');
  });

  it('wraps the path as a crisp icon in currentColor on a 16 by 16 grid', () => {
    const icon = pixelGridIcon(withRow(0, '#...............'));
    expect(icon).toMatchObject({ width: 16, height: 16 });
    expect(icon.body).toContain('fill="currentColor"');
    expect(icon.body).toContain('shape-rendering="crispEdges"');
    expect(icon.body).toContain('d="M0 0h1v1h-1z"');
  });
});

describe('the pixel icons in the named set', () => {
  it('adds every pixel icon to the names and keeps the smooth ones', () => {
    for (const name of Object.keys(PIXEL_ICONS)) expect(ICONS[name], name).toBe(PIXEL_ICONS[name]);
    expect(ICONS['pixel-pencil']).toBeDefined();
    expect(ICONS.eraser.body).not.toContain('crispEdges');
  });

  it('draws a pixel name through the same name prop at the size asked for', () => {
    const html = renderToString(h(Icon, { name: 'pixel-pencil', size: 32 }));
    expect(html).toContain('viewBox="0 0 16 16"');
    expect(html).toContain('width="32"');
    expect(html).toContain('shape-rendering="crispEdges"');
    expect(html).toContain('fill="currentColor"');
  });

  it('draws at 16 pixels by default', () => {
    expect(renderToString(h(Icon, { name: 'pixel-hand' }))).toContain('width="16"');
  });
});
