/* @layer renderer-components @kind data */
import { growPolygon } from './grow-polygon';
import type { Polygon } from './pelago.type';
import { PELAGO_ACCENTS as A } from './pelago-accents.constants';
import type { SymbolSpec } from './pelago-symbol.type';
import { PELAGO_TONES as T } from './pelago-tones.constants';
import { polySteps } from './poly-steps';
import { rayPolygons } from './ray-polygons';
import { roundRect } from './round-rect';

const GLASS = [['M', 1.25, 5.6], ['A', 3.1, 3.1, 1, 1, 5.75, 5.6], ['L', 4.9, 6.9], ['L', 2.1, 6.9], ['Z']] as const;

const BULB: SymbolSpec = {
  name: 'Bulb',
  w: 7,
  h: 10,
  layers: [
    { ink: A.bulb, opacity: 0.28, shapes: [[3.5, 3.8, 4.6]] },
    { ink: A.bulbDeep, shift: [0.25, 0.3], shapes: [GLASS] },
    { ink: A.bulb, shapes: [GLASS] },
    { ink: A.bulbLight, shapes: [[3.4, 3.5, 1.8, 1.7]] },
    { ink: T.white, opacity: 0.9, shapes: [[2.3, 2.2, 0.7, 0.55]] },
    { ink: T.mid, shapes: [[['M', 2.1, 7.15], ['L', 4.9, 7.15], ['L', 4.9, 8.6], ['Q', 3.5, 9.8, 2.1, 8.6], ['Z']]] },
    { ink: T.deep, shapes: [roundRect([2.1, 7.75], [4.9, 8.15], 0.15)] },
    { ink: T.lit, shapes: [roundRect([2.1, 7.15], [4.9, 7.45], 0.12)] },
  ],
};

const RAYS: SymbolSpec = {
  name: 'Rays',
  w: 13,
  h: 13,
  layers: [{ ink: A.bulb, shapes: rayPolygons([6.5, 6.5], [-165, -128, -52, -15], { from: 4.2, to: 5.1, width: 0.75 }).map(polySteps) }],
};

const BATTERY: SymbolSpec = {
  name: 'Battery',
  w: 10,
  h: 5.6,
  layers: [
    { ink: A.battery, opacity: 0.3, shapes: [[2.4, 2.8, 2.2, 2]] },
    { ink: T.violetDark, shift: [0.3, 0.4], evenOdd: true, shapes: [roundRect([0.2, 0.2], [8.6, 5.4], 1), roundRect([1, 1], [7.8, 4.6], 0.5), roundRect([8.6, 1.9], [9.7, 3.7], 0.4)] },
    { ink: T.pale, evenOdd: true, shapes: [roundRect([0.2, 0.2], [8.6, 5.4], 1), roundRect([1, 1], [7.8, 4.6], 0.5), roundRect([8.6, 1.9], [9.7, 3.7], 0.4)] },
    { ink: A.battery, shapes: [roundRect([1.6, 1.6], [3.1, 4], 0.3)] },
  ],
};

const LID: Polygon = [[2.4, 0.6], [15.6, 1.6], [14.6, 10], [1.6, 9.4]];
const BASE: Polygon = [[0.6, 9.6], [15.4, 10.2], [18.4, 11.6], [3.2, 12.2]];
const LIP: Polygon = [[3.2, 12.2], [18.4, 11.6], [18.4, 12.3], [3.2, 12.9]];

const LAPTOP: SymbolSpec = {
  name: 'Laptop',
  w: 19,
  h: 13,
  layers: [
    { ink: T.edge, shapes: [LID, BASE, LIP].map((p) => polySteps(growPolygon(p, 0.4))) },
    { ink: T.deep, shapes: [polySteps(LID)] },
    { ink: T.shade, shapes: [polySteps([[2.4, 0.6], [15.6, 1.6], [15.5, 2.4], [2.3, 1.4]])] },
    { ink: T.violet, opacity: 0.35, shapes: [[8.6, 5.6, 2.4, 2.1]] },
    { ink: T.violetMid, shapes: [polySteps([[8.6, 4.2], [9.8, 5.6], [8.6, 7], [7.4, 5.6]])] },
    { ink: T.lavender, shapes: [polySteps([[8.6, 4.7], [9.2, 5.6], [8.6, 6.5], [8, 5.6]])] },
    { ink: T.mid, shapes: [polySteps(BASE)] },
    { ink: T.shade, shapes: [polySteps(LIP)] },
  ],
};

export { BATTERY, BULB, LAPTOP, RAYS };
