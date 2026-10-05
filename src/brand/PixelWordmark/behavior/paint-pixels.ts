/* @layer renderer-components @kind logic */
import type { LetterLayout, PlacedLetter } from './lay-out-letters.type';
import type { PixelGrid } from './paint-pixels.type';
import type { WordmarkInks } from './wordmark-inks.type';
import { bandOf } from './band-of';
import { fillBandAt } from './fill-band-at';

const isFill = (letter: PlacedLetter, x: number, y: number): boolean =>
  letter.rows[y - letter.y]?.[x - letter.x] === '#';

const touchesFill = (letter: PlacedLetter, x: number, y: number): boolean => {
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (isFill(letter, x + dx, y + dy)) return true;
    }
  }
  return false;
};

const paintFill = (grid: PixelGrid, width: number, letter: PlacedLetter, inks: WordmarkInks): void => {
  const h = letter.rows.length;
  letter.rows.forEach((row, j) => [...row].forEach((c, i) => {
    const x = letter.x + i;
    const y = letter.y + j;
    if (c === '#') grid[y * width + x] = inks.fill[fillBandAt(j, h, x, y)] ?? null;
  }));
};

const paintOutline = (grid: PixelGrid, width: number, letter: PlacedLetter, inks: WordmarkInks): number[] => {
  const h = letter.rows.length;
  const w = letter.rows[0]?.length ?? 0;
  const painted: number[] = [];
  for (let y = letter.y - 1; y <= letter.y + h; y++) {
    for (let x = letter.x - 1; x <= letter.x + w; x++) {
      const at = y * width + x;
      if (grid[at] !== null || !touchesFill(letter, x, y)) continue;
      grid[at] = inks.outline[bandOf(Math.min(h - 1, Math.max(0, y - letter.y)), h)] ?? null;
      painted.push(at);
    }
  }
  return painted;
};

const paintPixels = (layout: LetterLayout, inks: WordmarkInks): PixelGrid => {
  const { letters, width, height } = layout;
  const grid = new Array<string | null>(width * height).fill(null);
  const outline = new Set<number>();
  for (const letter of letters) paintFill(grid, width, letter, inks);
  for (const letter of letters) paintOutline(grid, width, letter, inks).forEach((at) => outline.add(at));
  outline.forEach((at) => {
    const below = at + width;
    if (below < grid.length && grid[below] === null) grid[below] = inks.shadow;
  });
  return grid;
};

export { paintPixels };
