/* @layer tooling-scripts @kind logic */
import { markArt } from './art.mjs';
import { rimFraction, rimmedArt } from './rim-art.mjs';

const groundArt = (brand, loaded, ground) => {
  const { paths, outline } = loaded.groundLook(brand.mark, ground);
  const mark = { ...brand.mark, paths };
  const base = markArt(mark);
  if (!outline) return { mark: base, artAt: () => base };
  const colour = loaded.rim.colours[outline];
  return {
    mark: rimmedArt(base, mark, colour, loaded.rim.fineRatio),
    artAt: (size) => rimmedArt(base, mark, colour, rimFraction({ ...loaded.rim, ratio: loaded.rim.fineRatio }, size)),
  };
};

export { groundArt };
