/* @layer tooling-scripts @kind logic */
import { markArt } from './art.mjs';
import { rimFraction, rimmedArt } from './rim-art.mjs';

const darkGroundArt = (brand, loaded) => {
  const mark = { ...brand.mark, paths: loaded.groundPaths(brand.mark.paths, 'dark') };
  const base = markArt(mark);
  const tone = mark.onDarkRim;
  if (!tone) return { mark: base, artAt: () => base };
  const colour = loaded.rim.colours[tone];
  return {
    mark: rimmedArt(base, mark, colour, loaded.rim.fineRatio),
    artAt: (size) => rimmedArt(base, mark, colour, rimFraction({ ...loaded.rim, ratio: loaded.rim.fineRatio }, size)),
  };
};

export { darkGroundArt };
