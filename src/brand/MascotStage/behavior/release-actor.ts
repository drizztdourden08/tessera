/* @layer renderer-components @kind logic */
import type { StageActor } from './create-actor.type';
import { stopNative } from './stop-native';

const releaseActor = (actor: StageActor): void => {
  stopNative(actor.core);
  for (const animation of actor.core.native.ambient) animation.cancel();
  actor.core.native = { source: undefined, clip: [], ambient: [] };
  actor.core.dom?.writer.dispose();
  actor.core.dom = undefined;
};

export { releaseActor };
