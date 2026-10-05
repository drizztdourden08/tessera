/* @layer renderer-components @kind logic */
import type { ActorCore } from './actor.type';

const stopNative = (actor: ActorCore): void => {
  for (const animation of actor.native.clip) animation.cancel();
  actor.native = { ...actor.native, source: undefined, clip: [] };
};

export { stopNative };
