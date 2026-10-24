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
import { PIXEL_GRID_SIZE as SIZE } from '../src/primitives/Icon/behavior/pixel-grid.constants';
import { PIXEL_GRIDS, PIXEL_ICONS } from '../src/primitives/icon-sets/pixel.constants';

const SETS = path.resolve('src/primitives/icon-sets');
const SET_FILES = fs.readdirSync(SETS).filter((file) => /^pixel-.+\.constants\.ts$/.test(file));
const blank = () => Array.from({ length: SIZE }, () => '.'.repeat(SIZE));
const padded = (start) => start.padEnd(SIZE, '.');
const withRow = (y, row) => blank().map((line, i) => (i === y ? row : line));

describe('the pixel grid files', () => {
  it('finds at least one file for a group of pixel icons', () => {
    expect(SET_FILES).toContain('pixel-tools-draw.constants.ts');
  });

  for (const file of SET_FILES) {
    it(`${file} holds only ${SIZE} by ${SIZE} grids of # and ., each named pixel-<name>`, async () => {
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
    expect(pixelGridProblems(blank().slice(1))).toContain(`has ${SIZE - 1} rows, wants ${SIZE}`);
    expect(pixelGridProblems(withRow(3, '#'.repeat(SIZE - 1)))).toEqual([`row 3 is not ${SIZE} characters of # and .`]);
    expect(pixelGridProblems(withRow(3, 'x'.repeat(SIZE)))[0]).toMatch(new RegExp(`^row 3 is not ${SIZE} characters`));
    expect(pixelGridProblems(blank())).toEqual(['has no inked pixel']);
  });

  it('reports ink inside the 2 px margin on any side', () => {
    expect(pixelGridProblems(withRow(1, padded('..#')))).toEqual(['row 1 inks the 2 px margin']);
    expect(pixelGridProblems(withRow(5, padded('.#')))).toEqual(['row 5 inks the 2 px margin']);
    expect(pixelGridProblems(withRow(5, `${'.'.repeat(SIZE - 2)}#.`))).toEqual(['row 5 inks the 2 px margin']);
    expect(pixelGridProblems(withRow(SIZE - 2, padded('..#')))).toEqual([`row ${SIZE - 2} inks the 2 px margin`]);
    expect(pixelGridProblems(withRow(2, padded('..#')))).toEqual([]);
  });
});

describe('turning a grid into a path', () => {
  it('draws each run of inked pixels in a row as one rectangle', () => {
    expect(pixelGridPath(withRow(2, padded('..###..#')))).toBe('M2 2h3v1h-3zM7 2h1v1h-1z');
  });

  it('draws nothing for an empty grid and one rectangle per row for a block', () => {
    expect(pixelGridPath(blank())).toBe('');
    expect(pixelGridPath(['##', '##'])).toBe('M0 0h2v1h-2zM0 1h2v1h-2z');
  });

  it('wraps the path as a crisp icon in currentColor on a grid of the set size', () => {
    const icon = pixelGridIcon(withRow(0, padded('#')));
    expect(icon).toMatchObject({ width: SIZE, height: SIZE });
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
    const html = renderToString(h(Icon, { name: 'pixel-pencil', size: SIZE * 2 }));
    expect(html).toContain(`viewBox="0 0 ${SIZE} ${SIZE}"`);
    expect(html).toContain(`width="${SIZE * 2}"`);
    expect(html).toContain('shape-rendering="crispEdges"');
    expect(html).toContain('fill="currentColor"');
  });

  it('draws at 24 pixels by default, one grid', () => {
    expect(renderToString(h(Icon, { name: 'pixel-hand' }))).toContain(`width="${SIZE}"`);
  });
});
