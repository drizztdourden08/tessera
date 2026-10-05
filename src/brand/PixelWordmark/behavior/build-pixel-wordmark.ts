/* @layer renderer-components @kind logic */
import type { PixelWordmarkArt, PixelWordmarkColors } from '../PixelWordmark.type';
import { layOutLetters } from './lay-out-letters';
import { paintPixels } from './paint-pixels';
import { wordmarkInks } from './wordmark-inks';

const buildPixelWordmark = (text: string, colors: PixelWordmarkColors): PixelWordmarkArt => {
  const layout = layOutLetters(text);
  const grid = paintPixels(layout, wordmarkInks(colors));
  const { width, height } = layout;
  const runs = new Map<string, string[]>();
  for (let y = 0; y < height; y++) {
    let x = 0;
    while (x < width) {
      const ink = grid[y * width + x];
      let run = 1;
      while (x + run < width && grid[y * width + x + run] === ink) run++;
      if (ink) runs.set(ink, [...(runs.get(ink) ?? []), `M${x} ${y}h${run}v1h-${run}z`]);
      x += run;
    }
  }
  return {
    viewBox: `0 0 ${width} ${height}`,
    width,
    height,
    paths: [...runs].map(([ink, d]) => ({ ink, d: d.join('') })),
  };
};

export { buildPixelWordmark };
