/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';
import type { Polygon } from './pelago.type';
import { pointText } from './point-text';

const polygonPath = (polygons: readonly Polygon[], origin: ScenePoint): string =>
  polygons.map((polygon) => `M${polygon.map((p) => pointText(p, origin)).join('L')}Z`).join('');

export { polygonPath };
