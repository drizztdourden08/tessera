/* @layer renderer-components @kind logic */
import type { BrandMarkPath, BrandPiece, ScenePoint } from '../brand.type';
import { ovalPath } from './oval-path';
import type { PathStep, SymbolLayer, SymbolShape, SymbolSpec } from './pelago-symbol.type';

const round = (n: number): number => Number(n.toFixed(3));

const stepText = (step: PathStep, [dx, dy]: ScenePoint, size: number): string => {
  const x = (n: number): number => round((n + dx) * size);
  const y = (n: number): number => round((n + dy) * size);
  switch (step[0]) {
    case 'Z': return 'Z';
    case 'Q': return `Q${x(step[1])} ${y(step[2])} ${x(step[3])} ${y(step[4])}`;
    case 'A': return `A${round(step[1] * size)} ${round(step[2] * size)} 0 ${step[3]} ${step[4]} ${x(step[5])} ${y(step[6])}`;
    case 'M':
    case 'L': return `${step[0]}${x(step[1])} ${y(step[2])}`;
  }
};

const shapeText = (shape: SymbolShape, shift: ScenePoint, size: number): string => {
  if (typeof shape[0] !== 'number') return (shape as readonly PathStep[]).map((step) => stepText(step, shift, size)).join('');
  const [cx = 0, cy = 0, rx = 0, ry = rx] = shape as readonly number[];
  return ovalPath([round((cx + shift[0]) * size), round((cy + shift[1]) * size)], round(rx * size), round(ry * size));
};

const layerPath = (layer: SymbolLayer, size: number): BrandMarkPath => {
  const d = layer.shapes.map((shape) => shapeText(shape, layer.shift ?? [0, 0], size)).join('');
  return {
    ink: layer.ink,
    d,
    ...(layer.opacity === undefined ? {} : { opacity: layer.opacity }),
    ...(layer.evenOdd ? { evenOdd: true } : {}),
  };
};

const symbolPiece = (spec: SymbolSpec, size = 1): BrandPiece => ({
  name: spec.name,
  w: round(spec.w * size),
  h: round(spec.h * size),
  paths: spec.layers.map((layer) => layerPath(layer, size)),
});

export { symbolPiece };
