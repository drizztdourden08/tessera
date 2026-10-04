/* @layer renderer-components @kind data */
import { PELAGO_ACCENTS as A } from './pelago-accents.constants';
import type { SymbolLayer, SymbolShape, SymbolSpec } from './pelago-symbol.type';
import { PELAGO_TONES as T } from './pelago-tones.constants';

const DROP = [0.3, 0.4] as const;

const glyph = (shapes: readonly SymbolShape[], glow: SymbolShape, face: string = T.pale, shade: string = T.violetDark): readonly SymbolLayer[] => [
  { ink: T.violet, opacity: 0.14, shapes: [glow] },
  { ink: shade, shift: DROP, shapes },
  { ink: face, shapes },
];

const QUESTION: SymbolSpec = {
  name: 'Question',
  w: 7,
  h: 11,
  layers: glyph([
    [['M', 0.6, 3.2], ['A', 2.9, 2.9, 1, 1, 5.16, 5.58], ['L', 4.35, 6.5], ['L', 4.35, 7.6], ['L', 2.65, 7.6], ['L', 2.65, 6.3], ['L', 3.73, 4.53], ['A', 1.35, 1.35, 1, 0, 2.15, 3.2], ['Z']],
    [1.375, 3.2, 0.775],
    [3.5, 9.4, 1.05],
  ], [3.5, 5.4, 4.4, 5.8]),
};

const EXCLAIM: SymbolSpec = {
  name: 'Exclaim',
  w: 4,
  h: 11,
  layers: glyph([
    [['M', 0.6, 1.6], ['A', 1.4, 1.4, 0, 1, 3.4, 1.6], ['L', 2.75, 7.2], ['Q', 2, 7.9, 1.25, 7.2], ['Z']],
    [2, 9.5, 1.15],
  ], [2, 5.4, 3.4, 6]),
};

const HEART_SHAPE: SymbolShape = [['M', 4, 7], ['L', 0.9, 3.9], ['A', 2.05, 2.05, 0, 1, 4, 1.25], ['A', 2.05, 2.05, 0, 1, 7.1, 3.9], ['Z']];

const HEART: SymbolSpec = {
  name: 'Heart',
  w: 8,
  h: 7.2,
  layers: [
    { ink: A.heart, opacity: 0.25, shapes: [[4, 3.8, 5.2, 4.8]] },
    ...glyph([HEART_SHAPE], [4, 3.8, 0], A.heart, A.heartDeep).slice(1),
    { ink: A.heartLight, opacity: 0.85, shapes: [[2.3, 2.6, 0.85, 0.6]] },
  ],
};

const ZEE: SymbolSpec = {
  name: 'Zee',
  w: 4,
  h: 4,
  layers: glyph([
    [['M', 0.2, 0.2], ['L', 3.8, 0.2], ['L', 3.8, 1.05], ['L', 1.6, 3], ['L', 3.8, 3], ['L', 3.8, 3.8], ['L', 0.2, 3.8], ['L', 0.2, 2.95], ['L', 2.4, 1], ['L', 0.2, 1], ['Z']],
  ], [2, 2, 3]),
};

export { EXCLAIM, HEART, QUESTION, ZEE };
