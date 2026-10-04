/* @layer renderer-components @kind data */
import type { ScenePoint } from '../brand.type';
import type { FacetLayer, Polygon } from './pelago.type';
import { PELAGO_TONES as T } from './pelago-tones.constants';
import { veinPolygon } from './vein-polygon';

const V = { top: [29, 17], ur: [34.8, 21], lr: [35.2, 30], bot: [29, 35.5], ll: [22.8, 30], ul: [23.2, 21] } as const satisfies Record<string, ScenePoint>;
const I = { top: [29, 19.6], ur: [32.9, 22.4], lr: [33.1, 29.2], bot: [29, 32.8], ll: [24.9, 29.2], ul: [25.1, 22.4] } as const satisfies Record<string, ScenePoint>;

const VEINS: readonly Polygon[] = [
  [[23.2, 21], [19.4, 19.6], [17.6, 21.4]],
  [[34.8, 21], [38.8, 19.4], [40.8, 21.2]],
  [[22.8, 30], [19.8, 31.6], [19.2, 33.6]],
  [[35.2, 30], [38.2, 31.4], [39, 33]],
  [[29, 35.5], [28.4, 38.4], [29.2, 40]],
];

const PELAGO_CRYSTAL: readonly FacetLayer[] = [
  { ink: T.lavender, opacity: 0.85, polygons: VEINS.map((line) => veinPolygon(line, 0.6)) },
  { ink: T.edge, grow: 0.4, polygons: [[V.top, V.ur, V.lr, V.bot, V.ll, V.ul]] },
  { ink: T.lavender, polygons: [[V.ul, V.top, I.top, I.ul]] },
  { ink: '#a585ff', polygons: [[V.top, V.ur, I.ur, I.top]] },
  { ink: '#6a3ff2', polygons: [[V.ur, V.lr, I.lr, I.ur]] },
  { ink: '#5530d0', polygons: [[V.lr, V.bot, I.bot, I.lr]] },
  { ink: '#6a45e8', polygons: [[V.bot, V.ll, I.ll, I.bot]] },
  { ink: T.violetMid, polygons: [[V.ll, V.ul, I.ul, I.ll]] },
  { ink: T.violet, polygons: [[I.top, I.ur, I.lr, I.bot, I.ll, I.ul]] },
  { ink: '#8a5fff', polygons: [[I.ul, I.top, I.ur, [29, 23.6]]] },
  { ink: T.pale, opacity: 0.9, polygons: [[[24.2, 21.4], [28.3, 18.7], [28.6, 19.5], [24.9, 22.2]]] },
];

export { PELAGO_CRYSTAL };
