/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';

const down = (n: number): number => Math.floor(n * 10) / 10;

const up = (n: number): number => Number((Math.ceil(n * 10) / 10).toFixed(1));

const pieceBounds = (corners: readonly ScenePoint[]): { at: ScenePoint; w: number; h: number } => {
  const xs = corners.map(([x]) => x);
  const ys = corners.map(([, y]) => y);
  const at: ScenePoint = [down(Math.min(...xs)), down(Math.min(...ys))];
  return { at, w: up(Math.max(...xs) - at[0]), h: up(Math.max(...ys) - at[1]) };
};

export { pieceBounds };
