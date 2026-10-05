/* @layer renderer-components @kind constants */
import type { MascotClip } from '../../motion/mascot-clip.type';
import type { MascotStep } from '../MascotStage.type';
import type { MascotAutonomyContext, MascotAutonomyRule } from './autonomy.type';

const pick = <T>(list: readonly T[], random: () => number): T => list[Math.floor(random() * list.length)] as T;

const elsewhere = (c: MascotAutonomyContext): number => {
  const span = c.max - c.min;
  for (let i = 0; i < 6; i += 1) {
    const x = c.min + c.random() * span;
    if (Math.abs(x - c.x) > span / 4) return x;
  }
  return c.x < (c.min + c.max) / 2 ? c.max - span / 8 : c.min + span / 8;
};

const MASCOT_AUTONOMY_RULES: readonly MascotAutonomyRule[] = [
  { id: 'glance', weight: 4, cooldown: 4000, steps: (c) => [{ play: pick<MascotClip>(['blink', 'curious', 'scan'], c.random), loop: 1 }] },
  { id: 'bounce', weight: 2, cooldown: 9000, steps: () => [{ play: 'idle-bounce', loop: 2 }] },
  {
    id: 'wander',
    weight: 3,
    cooldown: 7000,
    when: (c) => c.max - c.min > 80,
    steps: (c): MascotStep[] => [
      { moveTo: elsewhere(c), clip: c.random() < 0.3 ? 'move-wobble' : 'move' },
      { play: 'scan', loop: 1 },
      ...(c.random() < 0.5 ? [{ moveTo: c.home }] : []),
    ],
  },
  { id: 'wave', weight: 1.2, cooldown: 15000, steps: () => [{ play: 'wave' }] },
  { id: 'think', weight: 1, cooldown: 20000, steps: (c) => [{ play: pick<MascotClip>(['idea', 'focused', 'working'], c.random), loop: 2 }] },
  { id: 'celebrate', weight: 0.6, cooldown: 25000, steps: (c) => [{ play: c.random() < 0.5 ? 'spin' : 'jump-hop' }] },
  {
    id: 'nap',
    weight: 50,
    cooldown: 60000,
    when: (c) => c.idleFor > c.napAfter,
    steps: (c) => [{ moveTo: c.home }, { play: 'resting', loop: 1 }, { play: 'sleep', loop: 6 }, { play: 'blink' }],
  },
];

export { MASCOT_AUTONOMY_RULES };
