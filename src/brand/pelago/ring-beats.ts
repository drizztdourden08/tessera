/* @layer renderer-components @kind logic */
import { EASE } from '../motion/motion.constants';
import type { IsletBeat, IsletId, IsletMove } from './pelago.type';
import { PELAGO_ISLETS } from './pelago-islets.constants';
import { PELAGO_RIG } from './pelago-rig.constants';
import { RING_PATH } from './ring-beats.constants';

const easeAt = (step: number, steps: number): string => {
  if (step === 0) return EASE.in;
  return step === steps ? EASE.out : EASE.linear;
};

const round = (n: number): number => Number(n.toFixed(3));

const ringMove = (id: IsletId, turn: number): IsletMove => {
  const [x, y] = PELAGO_RIG.islets[id].node;
  const home = Math.atan2((y - RING_PATH.y) / RING_PATH.ry, (x - RING_PATH.x) / RING_PATH.rx);
  const angle = home + turn * 2 * Math.PI;
  return { x: round(RING_PATH.rx * (Math.cos(angle) - Math.cos(home))), y: round(RING_PATH.ry * (Math.sin(angle) - Math.sin(home))) };
};

const ringBeats = (turns: number, start: number, end: number): IsletBeat[] => {
  const steps = Math.round(Math.abs(turns) * RING_PATH.stepsPerTurn);
  return Array.from({ length: steps + 1 }, (_, step) => ({
    at: round(start + ((end - start) * step) / steps),
    ease: easeAt(step, steps),
    moves: Object.fromEntries(PELAGO_ISLETS.map((id) => [id, ringMove(id, (turns * step) / steps)])),
  }));
};

export { ringBeats };
