/* @layer renderer-components @kind data */
import type { FacetLayer, Polygon } from './pelago.type';

const STONE: Polygon = [[-1.3, -1.1], [0.3, -1.7], [1.4, -0.5], [0.8, 1.3], [-0.6, 1.8], [-1.5, 0.3]];
const SHARD: Polygon = [[-0.9, -1.5], [0.9, -1.3], [0.3, 1.9]];

const PELAGO_STONE: readonly FacetLayer[] = [
  { ink: 'edge', grow: 0.4, polygons: [STONE] },
  { ink: 'topBack', polygons: [[[-1.3, -1.1], [0.3, -1.7], [1.4, -0.5], [0, -0.1]]] },
  { ink: 'lit', polygons: [[[-1.3, -1.1], [0, -0.1], [-0.6, 1.8], [-1.5, 0.3]]] },
  { ink: 'shade', polygons: [[[0, -0.1], [1.4, -0.5], [0.8, 1.3], [-0.6, 1.8]]] },
];

const PELAGO_SHARD: readonly FacetLayer[] = [
  { ink: 'edge', grow: 0.4, polygons: [SHARD] },
  { ink: 'violet', polygons: [SHARD] },
  { ink: 'violetMid', polygons: [[[-0.9, -1.5], [0.1, -1.4], [0.3, 1.9]]] },
];

export { PELAGO_SHARD, PELAGO_STONE };
