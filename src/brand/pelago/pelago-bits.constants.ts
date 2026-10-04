/* @layer renderer-components @kind data */
import type { ScenePoint } from '../brand.type';
import { PELAGO_ACCENTS as A } from './pelago-accents.constants';
import type { ConfettiBit as Bit, SymbolLayer, SymbolSpec } from './pelago-symbol.type';
import { PELAGO_TONES as T } from './pelago-tones.constants';
import { polySteps } from './poly-steps';

const DROP_SHAPE = [['M', 1.3, 0.1], ['Q', 2.6, 2, 2.5, 2.75], ['A', 1.2, 1.2, 0, 1, 0.1, 2.75], ['Q', 0, 2, 1.3, 0.1], ['Z']] as const;

const SWEAT: SymbolSpec = {
  name: 'Sweat drop',
  w: 2.6,
  h: 4,
  layers: [
    { ink: A.dropDeep, shift: [0.2, 0.25], shapes: [DROP_SHAPE] },
    { ink: A.drop, shapes: [DROP_SHAPE] },
    { ink: T.white, opacity: 0.85, shapes: [[0.95, 2.55, 0.35, 0.55]] },
  ],
};

const TWINKLE: SymbolSpec = {
  name: 'Twinkle',
  w: 4,
  h: 4,
  layers: [
    { ink: A.bulb, opacity: 0.3, shapes: [[2, 2, 2.2]] },
    { ink: A.bulbLight, shapes: [[['M', 2, 0], ['Q', 2.3, 1.7, 4, 2], ['Q', 2.3, 2.3, 2, 4], ['Q', 1.7, 2.3, 0, 2], ['Q', 1.7, 1.7, 2, 0], ['Z']]] },
    { ink: T.white, shapes: [[2, 2, 0.45]] },
  ],
};

const bit = ([x, y, size, degrees]: Bit, mirror: boolean): readonly ScenePoint[] => {
  const turn = ((mirror ? -degrees : degrees) * Math.PI) / 180;
  const cx = mirror ? 14 - x : x;
  const [ux, uy] = [Math.cos(turn) * (size / 2), Math.sin(turn) * (size / 2)];
  const [vx, vy] = [-uy * 0.6, ux * 0.6];
  return [[cx - ux - vx, y - uy - vy], [cx + ux - vx, y + uy - vy], [cx + ux + vx, y + uy + vy], [cx - ux + vx, y - uy + vy]];
};

const BITS: Readonly<Record<string, readonly Bit[]>> = {
  [A.bulb]: [[2, 8, 1.6, 20], [11.5, 8.6, 1.2, -20], [6.6, 0.8, 1, 70]],
  [A.heart]: [[4.5, 3, 1.4, -30], [6, 10.6, 1.2, 60]],
  [A.battery]: [[10, 1.6, 1.4, 10], [0.9, 4.6, 1, -45]],
  [T.lavender]: [[7.6, 6.4, 1.2, 45], [12.6, 4.6, 1, 30], [3.6, 11.2, 0.9, 0]],
};

const confetti = (name: string, mirror: boolean): SymbolSpec => ({
  name,
  w: 14,
  h: 12,
  layers: Object.entries(BITS).map(([ink, bits]): SymbolLayer => ({ ink, shapes: bits.map((b) => polySteps(bit(b, mirror))) })),
});

const CONFETTI_LEFT = confetti('Confetti left', false);
const CONFETTI_RIGHT = confetti('Confetti right', true);

export { CONFETTI_LEFT, CONFETTI_RIGHT, SWEAT, TWINKLE };
