/* @layer renderer-components @kind data */
import type { FacetLayer, Polygon } from './pelago.type';
import { tuftPolygon } from './tuft-polygon';

const SILHOUETTE: Polygon = [[-8.6, -1.4], [-6.6, -3], [-3, -3.3], [-0.6, -2], [-1, 1.2], [-2.6, 3.8], [-4.2, 5.4], [-5.6, 4], [-7.6, 1.4]];
const SHARD: Polygon = [[-5.2, 4.6], [-4.2, 7.6], [-3.2, 4.4]];
const SPIKE: Polygon = [[-5.6, -2.6], [-4.6, -6.4], [-3.4, -2.8]];

const PELAGO_ISLET: readonly FacetLayer[] = [
  { ink: 'edge', grow: 0.45, polygons: [SILHOUETTE, SHARD, SPIKE] },
  { ink: 'lit', polygons: [[[-8.6, -1.4], [-6.4, -0.4], [-4.6, 2.2], [-5.6, 4], [-7.6, 1.4]]] },
  { ink: 'mid', polygons: [[[-6.4, -0.4], [-2.4, -0.6], [-3.4, 2], [-4.6, 2.2]]] },
  { ink: 'shade', polygons: [[[-2.4, -0.6], [-0.6, -2], [-1, 1.2], [-2.6, 3.8], [-3.4, 2]]] },
  { ink: 'deep', polygons: [[[-4.6, 2.2], [-3.4, 2], [-2.6, 3.8], [-4.2, 5.4], [-5.6, 4]]] },
  { ink: 'violet', polygons: [SHARD] },
  { ink: 'violetMid', polygons: [[[-5.2, 4.6], [-4.2, 7.6], [-4.2, 4.9]]] },
  { ink: 'topBack', polygons: [[[-8.6, -1.4], [-6.6, -3], [-3, -3.3], [-0.6, -2]]] },
  { ink: 'top', polygons: [[[-8.6, -1.4], [-0.6, -2], [-2.4, -0.6], [-6.4, -0.4]]] },
  { ink: 'spireLit', polygons: [[[-5.6, -2.6], [-4.6, -6.4], [-4.5, -2.7]]] },
  { ink: 'spireShade', polygons: [[[-4.6, -6.4], [-3.4, -2.8], [-4.5, -2.7]]] },
  { ink: 'violet', polygons: [tuftPolygon([-7.1, -1.7], 0.7), tuftPolygon([-2.1, -2.3], 0.6)] },
  { ink: 'lavender', opacity: 0.4, ovals: [[0, 0, 2.1]] },
  { ink: 'pale', ovals: [[0, 0, 1.05]] },
  { ink: 'white', ovals: [[0, 0, 0.5]] },
];

export { PELAGO_ISLET };
