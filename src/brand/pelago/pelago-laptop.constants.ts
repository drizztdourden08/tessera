/* @layer renderer-components @kind data */
import type { ScenePoint } from '../brand.type';
import { growPolygon } from './grow-polygon';
import type { Polygon } from './pelago.type';
import type { SymbolSpec } from './pelago-symbol.type';
import { PELAGO_TONES as T } from './pelago-tones.constants';
import { polySteps } from './poly-steps';

const LID: Polygon = [[0.5, 0.61], [10.97, 1.82], [12.51, 10.39], [2.17, 8.09]];
const SIDE: Polygon = [[10.97, 1.82], [11.63, 2.28], [13.13, 10.5], [12.51, 10.39]];
const HALO: Polygon = [[0.76, -0.02], [11.24, 1.19], [12.12, 1.76], [13.7, 10.27], [13.13, 10.5], [11.63, 2.28], [10.97, 1.82], [0.5, 0.61]];
const DECK: Polygon = [[12.6, 10.85], [18.89, 8.32], [18.89, 8.09], [12.12, 6.94]];
const EDGE: Polygon = [[12.6, 10.85], [18.89, 8.32], [18.89, 8.89], [12.69, 11.42]];
const UNDER: Polygon = [[1.91, 7.92], [12.6, 10.85], [12.69, 11.42], [2, 8.49]];
const HINGE: Polygon = [[2.44, 8.03], [12.38, 10.22], [12.42, 10.85], [2.48, 8.66]];
const TOP: Polygon = [[0.54, 0.61], [10.97, 1.82], [11.06, 2.34], [0.63, 1.13]];

const mix = ([ax, ay]: ScenePoint, [bx, by]: ScenePoint, t: number): ScenePoint => [ax + (bx - ax) * t, ay + (by - ay) * t];

const onDeck = (u: number, v: number): ScenePoint => {
  const [front, right, back, left] = DECK as readonly [ScenePoint, ScenePoint, ScenePoint, ScenePoint];
  return mix(mix(front, right, u), mix(left, back, u), v);
};

const deckCell = (u: number, v: number, du: number, dv: number): Polygon => [onDeck(u, v), onDeck(u + du, v), onDeck(u + du, v + dv), onDeck(u, v + dv)];

const KEYS: readonly Polygon[] = [0.14, 0.33].flatMap((v) => [0.1, 0.27, 0.44, 0.61, 0.78].map((u) => deckCell(u, v, 0.12, 0.13)));

const LAPTOP: SymbolSpec = {
  name: 'Laptop',
  w: 19.4,
  h: 11.9,
  layers: [
    { ink: T.lavender, opacity: 0.4, shapes: [polySteps(HALO)] },
    { ink: T.edge, shapes: [DECK, EDGE, UNDER, LID, SIDE].map((p) => polySteps(growPolygon(p, 0.4))) },
    { ink: T.shade, shapes: [polySteps(EDGE), polySteps(UNDER)] },
    { ink: T.top, shapes: [polySteps(DECK)] },
    { ink: T.pale, shapes: [polySteps(deckCell(0.3, 0.55, 0.32, 0.27))] },
    { ink: T.deep, shapes: KEYS.map(polySteps) },
    { ink: T.mid, shapes: [polySteps(LID)] },
    { ink: T.lit, shapes: [polySteps(TOP)] },
    { ink: T.pale, shapes: [polySteps(SIDE)] },
    { ink: T.edge, shapes: [polySteps(HINGE)] },
    { ink: T.violet, opacity: 0.35, shapes: [[6.6, 5.1, 2.3, 2]] },
    { ink: T.violetMid, shapes: [polySteps([[6.6, 3.7], [7.8, 5.1], [6.6, 6.5], [5.4, 5.1]])] },
    { ink: T.lavender, shapes: [polySteps([[6.6, 4.2], [7.2, 5.1], [6.6, 6], [6, 5.1]])] },
  ],
};

export { LAPTOP };
