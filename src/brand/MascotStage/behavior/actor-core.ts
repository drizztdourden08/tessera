/* @layer renderer-components @kind logic */
import type { ActorCore } from './actor.type';
import type { ActorSetup } from './create-actor.type';

const sideOf = (face: string | undefined): number => (face === 'left' ? -1 : 1);

const shownOf = (hidden: boolean | undefined): number => (hidden ? 0 : 1);

const createActorCore = (setup: ActorSetup): ActorCore => {
  const { cast, rig, x, now, emit } = setup;
  const rest = cast.rest ?? rig.motion.rest as ActorCore['rest'];
  const start = now();
  const first = cast.clip && rig.clips.has(cast.clip) ? cast.clip : rest;
  const firstClip = rig.clips.get(first);
  if (!firstClip) throw new Error(`${cast.id} has no ${first} clip`);
  return {
    id: cast.id, rig, rest, x, home: x, spread: cast.x === undefined, velocity: 0, facing: cast.face ?? 'right', ambientStart: start,
    source: { kind: 'clip', id: first, clip: firstClip, start, loop: first === rest || firstClip.loop, until: Infinity, rate: 1 },
    turn: { from: sideOf(cast.face), to: sideOf(cast.face), start },
    travel: undefined, step: undefined, queue: [], waiting: undefined, overrides: new Map(),
    bounds: { min: x, max: x }, lastHost: start, reduced: false, scale: 1, dom: undefined, native: { source: undefined, clip: [], ambient: [] },
    presence: { from: shownOf(cast.hidden), to: shownOf(cast.hidden), start }, away: false,
    emit: (event) => emit({ ...event, actor: cast.id }),
  };
};

export { createActorCore };
