/* @layer renderer-components @kind logic */
import type { MascotActorHandle } from '../MascotStage.type';
import type { HandleParts } from './actor-handle.type';
import { fadeExtra } from './fade-extra';
import { fadePresence } from './fade-presence';
import { finalClip } from './final-clip';
import { HOST_PRIORITY } from './stage-priority.constants';
import { turnTo } from './turn-to';

const actorHandle = (parts: HandleParts): MascotActorHandle => {
  const { core, runner, now, autonomy } = parts;
  return {
    id: core.id,
    play: (clip, options = {}) => runner.command({ play: clip, ...options }, options.priority ?? HOST_PRIORITY, true, now()),
    moveTo: (to, options = {}) => runner.command({ moveTo: to, ...options }, options.priority ?? HOST_PRIORITY, true, now()),
    face: (facing) => runner.command({ face: facing }, HOST_PRIORITY, true, now()),
    turn: (facing) => {
      turnTo(core, facing, now());
    },
    queue: (steps) => runner.enqueue(steps, HOST_PRIORITY, true, now()),
    stop: () => runner.stop(now()),
    effect: (id, mode) => fadeExtra(core, id, mode, now()),
    effects: (mode) => {
      for (const id of core.rig.effects) fadeExtra(core, id, mode, now());
    },
    autonomy,
    setVisible: (visible) => fadePresence(core, visible, now()),
    state: () => ({
      x: core.x, facing: core.facing, clip: finalClip(core.source).id, moving: core.travel !== undefined,
      busy: !runner.idle(), queued: core.queue.length, visible: core.presence.to > 0,
    }),
  };
};

export { actorHandle };
