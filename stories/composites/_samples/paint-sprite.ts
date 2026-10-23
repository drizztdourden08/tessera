/* @layer stories @kind logic */
import { SPRITE_PALETTE, SPRITE_ROWS } from './pixel-viewport-story.constants';

const paintSprite = (ctx: CanvasRenderingContext2D): void => {
  SPRITE_ROWS.forEach((row, y) => {
    [...row].forEach((cell, x) => {
      const colour = SPRITE_PALETTE[cell];
      if (!colour) return;
      ctx.fillStyle = colour;
      ctx.fillRect(x, y, 1, 1);
    });
  });
};

export { paintSprite };
