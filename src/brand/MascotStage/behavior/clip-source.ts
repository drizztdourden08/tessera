/* @layer renderer-components @kind logic */
import type { MascotClip } from '../../motion/mascot-clip.type';
import type { MascotPlayOptions } from '../MascotStage.type';
import type { ActorCore } from './actor.type';
import { MIN_RATE, STOP_EPSILON } from './clip-source.constants';
import type { ClipSource } from './pose-source.type';

const clipSource = (actor: ActorCore, id: MascotClip, now: number, options: MascotPlayOptions = {}): ClipSource => {
  const clip = actor.rig.clips.get(id) ?? actor.rig.clips.get(actor.rest);
  if (!clip) throw new Error(`No clip ${id}`);
  const { loop = clip.loop, speed = 1 } = options;
  const counted = typeof loop === 'number';
  return {
    kind: 'clip', id, clip, start: now, rate: Math.max(MIN_RATE, speed),
    loop: loop !== false,
    until: counted ? Math.max(1, loop) * clip.duration - STOP_EPSILON : Infinity,
  };
};

export { clipSource };
