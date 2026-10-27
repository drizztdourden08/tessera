/* @layer renderer-components @kind logic */
import type { CSSProperties } from 'react';
import type { PixelWordmarkArt, PixelWordmarkSize } from '../PixelWordmark.type';

const wordmarkStyle = (art: PixelWordmarkArt, size: PixelWordmarkSize): CSSProperties => {
  const aspectRatio = `${art.width} / ${art.height}`;
  if (size === 'fill') return { aspectRatio };
  return { aspectRatio, inlineSize: `calc(var(--pixel-wordmark-size) * ${art.width / art.height})` };
};

export { wordmarkStyle };
