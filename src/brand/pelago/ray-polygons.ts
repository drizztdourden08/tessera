/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';
import type { Polygon } from './pelago.type';
import type { RaySpan } from './pelago-symbol.type';

const round = (n: number): number => Number(n.toFixed(3));

const rayPolygons = ([cx, cy]: ScenePoint, angles: readonly number[], { from, to, width }: RaySpan): readonly Polygon[] =>
  angles.map((degrees) => {
    const turn = (degrees * Math.PI) / 180;
    const [ux, uy] = [Math.cos(turn), Math.sin(turn)];
    const [nx, ny] = [-uy * (width / 2), ux * (width / 2)];
    const at = (r: number, side: number): ScenePoint => [round(cx + ux * r + nx * side), round(cy + uy * r + ny * side)];
    return [at(from, 1), at(to, 1), at(to + width / 2, 0), at(to, -1), at(from, -1)];
  });

export { rayPolygons };
