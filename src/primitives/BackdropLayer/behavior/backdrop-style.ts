/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';
import type { Backdrop } from '../BackdropLayer.type';

const paint = (color?: string): string | undefined =>
  color?.startsWith('--') === true ? `var(${color})` : color;

const backdropStyle = (backdrop: Backdrop): CSSProperties => {
  if (backdrop.kind === 'node') return {};
  if (backdrop.kind === 'color') return { backgroundColor: paint(backdrop.color) };
  const { src, fit = 'cover', position, tileSize, color } = backdrop;
  return {
    backgroundImage: `url(${JSON.stringify(src)})`,
    backgroundPosition: position,
    backgroundSize: fit === 'tile' ? tileSize : undefined,
    backgroundColor: paint(color),
  };
};

export { backdropStyle };
