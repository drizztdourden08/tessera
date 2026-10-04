/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';
import type { MotionFrame } from '../motion/motion.type';
import type { IsletBeat, ThreadEnd, ThreadRig } from './pelago.type';
import { DEGREES } from './pelago-geometry.constants';
import { threadEnd } from './thread-end';

const round = (n: number): number => Number(n.toFixed(3));

const shiftOf = (beat: IsletBeat, end: ThreadEnd): ScenePoint => {
  const move = end === 'core' ? undefined : beat.moves?.[end];
  return [move?.x ?? 0, move?.y ?? 0];
};

const wrap = (turn: number): number => ((((turn + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) - Math.PI;

const threadFrames = (thread: ThreadRig, beats: readonly IsletBeat[]): MotionFrame[] => {
  const [fx, fy] = threadEnd(thread.from);
  const [tx, ty] = threadEnd(thread.to);
  const rest = Math.atan2(ty - fy, tx - fx);
  const length = Math.hypot(tx - fx, ty - fy);
  let previous = rest;
  let turned = 0;
  return beats.flatMap((beat): MotionFrame[] => {
    const [ax, ay] = shiftOf(beat, thread.from);
    const [bx, by] = shiftOf(beat, thread.to);
    const vx = tx + bx - fx - ax;
    const vy = ty + by - fy - ay;
    const angle = Math.atan2(vy, vx);
    turned += wrap(angle - previous);
    previous = angle;
    const rotate = round(turned * DEGREES);
    const scale = round(Math.hypot(vx, vy) / length);
    const frame: MotionFrame = {
      at: beat.at,
      ...(beat.ease ? { ease: beat.ease } : {}),
      ...(ax ? { x: round(ax) } : {}),
      ...(ay ? { y: round(ay) } : {}),
      ...(scale === 1 ? {} : { scale }),
    };
    if (rotate === 0) return [frame];
    if (rotate % 360 !== 0) return [{ ...frame, rotate }];
    turned = 0;
    return [{ ...frame, rotate }, frame];
  });
};

export { threadFrames };
