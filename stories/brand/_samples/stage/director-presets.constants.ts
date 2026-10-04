/* @layer stories @kind data */
import type { MascotClip } from '../../../../src/brand';

type ScriptStep =
  | { kind: 'walk'; x: number }
  | { kind: 'play'; clip: MascotClip; loops: number }
  | { kind: 'face'; face: 'left' | 'right' }
  | { kind: 'wait'; ms: number };

const DIRECTOR_PRESETS: readonly { name: string; steps: readonly ScriptStep[] }[] = [
  {
    name: 'Patrol',
    steps: [
      { kind: 'walk', x: 85 }, { kind: 'play', clip: 'scan', loops: 1 }, { kind: 'walk', x: 15 },
      { kind: 'play', clip: 'scan', loops: 1 }, { kind: 'face', face: 'right' }, { kind: 'play', clip: 'blink', loops: 1 },
    ],
  },
  {
    name: 'Show off',
    steps: [
      { kind: 'walk', x: 50 }, { kind: 'play', clip: 'jump-hop', loops: 1 }, { kind: 'play', clip: 'spin', loops: 1 },
      { kind: 'play', clip: 'success', loops: 1 }, { kind: 'face', face: 'left' }, { kind: 'play', clip: 'wave', loops: 1 },
    ],
  },
  {
    name: 'Work day',
    steps: [
      { kind: 'walk', x: 20 }, { kind: 'play', clip: 'working', loops: 3 }, { kind: 'play', clip: 'idea', loops: 1 },
      { kind: 'walk', x: 70 }, { kind: 'play', clip: 'resting', loops: 1 }, { kind: 'wait', ms: 800 }, { kind: 'play', clip: 'happy', loops: 1 },
    ],
  },
];

export { DIRECTOR_PRESETS };
export type { ScriptStep };
