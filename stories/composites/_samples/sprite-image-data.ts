/* @layer stories @kind logic */
import { SPRITE_PALETTE, SPRITE_ROWS, SPRITE_SIZE } from './pixel-viewport-story.constants';

const HEX_PAIRS = /[0-9a-f]{2}/gi;

const channelsOf = (hex: string): number[] => (hex.slice(1).match(HEX_PAIRS) ?? []).map((pair) => Number.parseInt(pair, 16));

const spriteImageData = (): ImageData => {
  const data = new ImageData(SPRITE_SIZE, SPRITE_SIZE);
  SPRITE_ROWS.forEach((row, y) => {
    [...row].forEach((cell, x) => {
      const colour = SPRITE_PALETTE[cell];
      if (!colour) return;
      const [red = 0, green = 0, blue = 0] = channelsOf(colour);
      const at = (y * SPRITE_SIZE + x) * 4;
      data.data.set([red, green, blue, cell === 'w' ? 160 : 255], at);
    });
  });
  return data;
};

export { spriteImageData };
