/* @layer renderer-components @kind data */
import type { ScenePoint } from '../brand.type';
import type { FacetLayer, Polygon } from './pelago.type';
import { PELAGO_TONES as T } from './pelago-tones.constants';
import { tuftPolygon } from './tuft-polygon';

const P = {
  t1: [13, 15.2], t2: [18.5, 11.4], t3: [29, 10.1], t4: [39.5, 11.4], t5: [45, 15.2], t6: [39.5, 18.4], t7: [29, 19.6], t8: [18.5, 18.4],
  l1: [13.8, 19.4], l2: [15.9, 22.6], l3: [16.2, 25.4], l4: [19.4, 30.4], l5: [21, 34.8], l6: [24.6, 37.6], l7: [26.6, 41], tip: [29, 42.6],
  r7: [31.6, 40.4], r6: [33.6, 37.8], r5: [36.8, 34.8], r4: [38.4, 30.8], r3: [41.8, 26.2], r2: [42.4, 22.8], r1: [44.6, 19.2],
  q1: [20.5, 23.2], q2: [37.6, 23.6], q3: [29, 22.6], q4: [29, 36.4], q5: [24.4, 31.5], q6: [34, 31.8],
  backLeft: [15.6, 12.6], backMidLeft: [23.5, 10.4], backMidRight: [34.5, 10.3], backRight: [42.6, 12.8],
  frontRight: [42.6, 17.2], frontMidRight: [34.4, 19.3], frontMidLeft: [23.6, 19.3], frontLeft: [15.4, 17.2],
} as const satisfies Record<string, ScenePoint>;

const SHARD: Polygon = [[27, 40.4], [29, 45.8], [31.2, 40]];
const S = { left: [31.2, 11.6], rise: [32.8, 3.6], peak: [34.6, 0.6], fall: [36.6, 4.4], right: [37.8, 12.2], front: [34.6, 13.4] } as const satisfies Record<string, ScenePoint>;
const SPIRE: Polygon = [S.left, S.rise, S.peak, S.fall, S.right, S.front];
const SPIKE: Polygon = [[26.6, 11], [27.9, 5.6], [29.4, 7.8], [30.2, 11.2]];
const BOULDER_LEFT: Polygon = [[17.6, 13.4], [18.6, 10.2], [21.6, 8.8], [24.4, 10.4], [24.8, 13.2], [21, 14.2]];
const BOULDER_RIGHT: Polygon = [[39, 13.8], [39.8, 10.9], [42.2, 10.3], [43.9, 12.3], [43.2, 14.5]];
const TUFTS: readonly (readonly [x: number, y: number, size: number])[] = [[15.8, 15.6, 1], [25.4, 13.2, 0.9], [41.4, 15.4, 1], [36.2, 14, 0.8], [20.6, 17.6, 0.8]];

const BACK_EDGE: Polygon = [P.t1, P.backLeft, P.t2, P.backMidLeft, P.t3, P.backMidRight, P.t4, P.backRight, P.t5];
const FRONT_EDGE: Polygon = [P.t5, P.frontRight, P.t6, P.frontMidRight, P.t7, P.frontMidLeft, P.t8, P.frontLeft];
const BODY: Polygon = [...BACK_EDGE, P.r1, P.r2, P.r3, P.r4, P.r5, P.r6, P.r7, P.tip, P.l7, P.l6, P.l5, P.l4, P.l3, P.l2, P.l1];

const PELAGO_ROCK: readonly FacetLayer[] = [
  { ink: T.edge, grow: 0.5, polygons: [BODY, SHARD] },
  { ink: T.lit, polygons: [[P.t1, P.frontLeft, P.t8, P.q1, P.l3, P.l2, P.l1]] },
  { ink: '#aea4c8', polygons: [[P.l1, [15.2, 18.6], [16.6, 22.4], P.l2]] },
  { ink: T.mid, polygons: [[P.t8, P.frontMidLeft, P.t7, P.frontMidRight, P.t6, P.q2, P.q3, P.q1]] },
  { ink: '#7a6f99', polygons: [[P.q1, P.q5, P.l5, P.l4, P.l3]] },
  { ink: '#706592', polygons: [[P.q1, P.q3, P.q2, P.q6, P.q4, P.q5]] },
  { ink: T.shade, polygons: [[P.t6, P.frontRight, P.t5, P.r1, P.r2, P.q2]] },
  { ink: T.deep, polygons: [[P.q2, P.r2, P.r3, P.r4, P.q6]] },
  { ink: '#5a4f7c', polygons: [[P.q5, P.q4, P.l7, P.l6, P.l5]] },
  { ink: '#3f3562', polygons: [[P.q4, P.q6, P.r4, P.r5, P.r6, P.r7]] },
  { ink: T.deep, polygons: [[P.q4, P.r7, P.tip, P.l7]] },
  { ink: T.violet, polygons: [SHARD] },
  { ink: T.violetMid, polygons: [[[27, 40.4], [29, 45.8], [29, 40.6]]] },
  { ink: T.topBack, polygons: [BACK_EDGE] },
  { ink: T.top, polygons: [[P.t1, ...FRONT_EDGE]] },
  { ink: T.edge, grow: 0.45, polygons: [SPIRE, SPIKE, BOULDER_LEFT, BOULDER_RIGHT] },
  { ink: T.spireLit, polygons: [[S.left, S.rise, S.peak, S.front], [[26.6, 11], [27.9, 5.6], [28.6, 11.3]]] },
  { ink: T.spireShade, polygons: [[S.peak, S.fall, S.right, S.front], [[27.9, 5.6], [29.4, 7.8], [30.2, 11.2], [28.6, 11.3]]] },
  { ink: '#c2b9d6', polygons: [[[17.6, 13.4], [18.6, 10.2], [21.6, 8.8], [21, 14.2]], [[39, 13.8], [39.8, 10.9], [42.2, 10.3], [41.4, 14.1]]] },
  { ink: T.mid, polygons: [[[21.6, 8.8], [24.4, 10.4], [24.8, 13.2], [21, 14.2]], [[42.2, 10.3], [43.9, 12.3], [43.2, 14.5], [41.4, 14.1]]] },
  { ink: T.violet, polygons: TUFTS.map(([x, y, size]) => tuftPolygon([x, y], size)) },
  { ink: T.lavender, polygons: TUFTS.map(([x, y, size]) => tuftPolygon([x + 0.3 * size, y], size * 0.55)) },
];

export { PELAGO_ROCK };
