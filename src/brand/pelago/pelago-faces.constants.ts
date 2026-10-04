/* @layer renderer-components @kind data */
import type { ScenePoint } from '../brand.type';
import { halfLid } from './half-lid';
import { PELAGO_ACCENTS as A } from './pelago-accents.constants';
import type { SymbolShape, SymbolSpec } from './pelago-symbol.type';
import { PELAGO_TONES as T } from './pelago-tones.constants';

const EYES: readonly ScenePoint[] = [[2.6, 3.4], [7.4, 3.4]];

const arch = ([x, y]: ScenePoint, lift: number): SymbolShape =>
  [['M', x - 1.6, y + 0.25 - lift], ['Q', x, y + 0.25 + 2.4 * lift, x + 1.6, y + 0.25 - lift], ['Q', x, y + 0.25 + 1.3 * lift, x - 1.6, y + 0.25 - lift], ['Z']];

const closed = (name: string, lift: number): SymbolSpec => ({
  name,
  w: 10,
  h: 7,
  layers: [
    { ink: T.violet, shapes: EYES.map(([x, y]): SymbolShape => [x, y, 2.05, 2.6]) },
    { ink: T.pale, opacity: 0.3, shapes: EYES.map(([x, y]): SymbolShape => [x, y + 0.2, 1.9, 1.15]) },
    { ink: T.white, shapes: EYES.map((eye) => arch(eye, lift)) },
  ],
});

const half = (name: string, outer: number, inner: number): SymbolSpec => {
  const lids = EYES.map((eye, i) => halfLid(eye, outer, inner, i === 1));
  return {
    name,
    w: 10,
    h: 7,
    layers: [
      { ink: T.violet, shapes: lids.map((lid) => lid.patch) },
      { ink: T.pale, shapes: lids.map((lid) => lid.band) },
    ],
  };
};

const LIDS_SMILE = closed('Smiling eyes', -0.95);
const LIDS_SHUT = closed('Shut eyes', 0.85);
const LIDS_FOCUS = half('Focused eyes', -0.8, -0.35);
const LIDS_WORRIED = half('Worried eyes', -0.1, -1.3);
const LIDS_TIRED = half('Tired eyes', 0.2, 0.2);

const GRIN: SymbolSpec = {
  name: 'Grin',
  w: 5.2,
  h: 2.6,
  layers: [
    { ink: T.pale, opacity: 0.3, shapes: [[2.6, 1.3, 2.6, 1.2]] },
    { ink: T.white, shapes: [[['M', 0.4, 0.6], ['Q', 2.6, 3.2, 4.8, 0.6], ['Q', 2.6, 1.8, 0.4, 0.6], ['Z']]] },
  ],
};

const BLUSH: SymbolSpec = {
  name: 'Blush',
  w: 11.8,
  h: 2,
  layers: [{ ink: A.heart, opacity: 0.5, shapes: [[1.4, 0.9, 1.3, 0.7], [10.4, 0.9, 1.3, 0.7]] }],
};

export { BLUSH, GRIN, LIDS_FOCUS, LIDS_SHUT, LIDS_SMILE, LIDS_TIRED, LIDS_WORRIED };
