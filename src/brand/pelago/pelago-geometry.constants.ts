/* @layer renderer-components @kind data */
import type { ScenePoint } from '../brand.type';
import type { IsletId, Polygon } from './pelago.type';

const MITER = 3;

const VEIN_TIP = 0.15;

const DEGREES = 180 / Math.PI;

const ORIGIN: ScenePoint = [0, 0];

const TUFT: Polygon = [[-1.6, 0], [-1.25, -1.3], [-0.65, -0.45], [0, -1.8], [0.65, -0.45], [1.25, -1.3], [1.6, 0]];

const HAND_SIDES: Readonly<Partial<Record<IsletId, 'left' | 'right'>>> = { a: 'left', b: 'right' };

const MIRRORED_TONES: Readonly<Record<string, string>> = { lit: 'shade', shade: 'lit', spireLit: 'spireShade', spireShade: 'spireLit' };

const SPARK = { steps: [0.25, 0.5, 0.75, 1], reset: 0.002, show: 0.04 } as const;

export { DEGREES, HAND_SIDES, MIRRORED_TONES, MITER, ORIGIN, SPARK, TUFT, VEIN_TIP };
