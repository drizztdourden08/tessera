/* @layer renderer-components @kind logic */
import { playClip } from './play-clip';
import type { ActorCore } from './actor.type';
import type { ClockState } from './clock-state.type';
import { syncAnimations } from './sync-animations';

const playAmbient = (actor: ActorCore, svg: SVGSVGElement, now: number, clock: ClockState): void => {
  for (const animation of actor.native.ambient) animation.cancel();
  const { ambient } = actor.rig;
  const animations = ambient && !actor.reduced ? playClip(svg, actor.rig.motion, ambient.source, true) : [];
  syncAnimations(animations, now - actor.ambientStart, 1, clock);
  actor.native = { ...actor.native, ambient: animations };
};

export { playAmbient };
