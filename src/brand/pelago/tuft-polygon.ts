/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';
import { TUFT } from './pelago-geometry.constants';

const tuftPolygon = ([x, y]: ScenePoint, size = 1): ScenePoint[] => TUFT.map(([dx, dy]) => [x + dx * size, y + dy * size]);

export { tuftPolygon };
