/* @layer renderer-components @kind logic */
import type { GridLayout, GridOffsets } from './grid-layout.type';

const gridOffsets = (layout: GridLayout, known: (row: number) => number | undefined): GridOffsets => {
  const above: number[] = [];
  const heads: number[] = [];
  const tiles: number[] = [];
  const sizes: number[] = [];
  let spent = 0;
  let unknownHeads = 0;
  let unknownTiles = 0;
  let tileSpent = 0;
  let tileSeen = 0;
  const mark = () => {
    above.push(spent);
    heads.push(unknownHeads);
    tiles.push(unknownTiles);
  };
  layout.rows.forEach((row, at) => {
    mark();
    const size = known(at) ?? 0;
    sizes.push(size);
    if (size <= 0) {
      if (row.kind === 'header') unknownHeads += 1;
      else unknownTiles += 1;
      return;
    }
    spent += size;
    if (row.kind === 'tiles') {
      tileSpent += size;
      tileSeen += 1;
    }
  });
  mark();
  return { above, heads, tiles, sizes, average: tileSeen > 0 ? tileSpent / tileSeen : 0 };
};

export { gridOffsets };
