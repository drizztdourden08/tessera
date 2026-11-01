/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { pixelGridPath } from '../src/primitives/Icon/behavior/pixel-grid-path';
import { pixelGridProblems } from '../src/primitives/Icon/behavior/pixel-grid-problems';
import { PIXEL_GRID_SIZE as SIZE } from '../src/primitives/Icon/behavior/pixel-grid.constants';
import { PIXEL_GRIDS, PIXEL_ICONS } from '../src/primitives/icon-sets/pixel.constants';

const blank = () => Array.from({ length: SIZE }, () => '.'.repeat(SIZE));
const padded = (start) => start.padEnd(SIZE, '.');
const withRow = (y, row) => blank().map((line, i) => (i === y ? row : line));

describe('K1 the pixel grid files', { tags: ['critical'] }, () => {
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

describe('K1 turning a grid into a path', { tags: ['critical'] }, () => {
  it('draws each run of inked pixels in a row as one rectangle', () => {
    expect(pixelGridPath(withRow(2, padded('..###..#')))).toBe('M2 2h3v1h-3zM7 2h1v1h-1z');
  });

  it('draws nothing for an empty grid and one rectangle per row for a block', () => {
    expect(pixelGridPath(blank())).toBe('');
    expect(pixelGridPath(['##', '##'])).toBe('M0 0h2v1h-2zM0 1h2v1h-2z');
  });
});
