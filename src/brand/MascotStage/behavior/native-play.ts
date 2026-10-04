/* @layer renderer-components @kind logic */
import { playClip } from '../../AnimatedMascot/behavior/play-clip';
import type { ActorCore } from './actor.type';
import type { ClipSource } from './pose-source.type';

/** How the stage clock runs: its speed and whether it is paused. */
interface ClockState {
  rate: number;
  playing: boolean;
}

const sync = (animations: readonly Animation[], elapsed: number, rate: number, clock: ClockState): void => {
  for (const animation of animations) {
    animation.playbackRate = clock.rate * rate;
    if (clock.playing) animation.play();
    else animation.pause();
    animation.currentTime = elapsed;
  }
};

/**
 * Hands a settled clip to the browser: the very playClip the approved playback uses, on the same drawing,
 * lined up with the stage clock. Nothing runs per frame while it plays.
 */
const playNative = (actor: ActorCore, svg: SVGSVGElement, source: ClipSource, now: number, clock: ClockState): void => {
  const counted = Number.isFinite(source.until) ? Math.round(source.until / source.clip.duration) : undefined;
  const animations = playClip(svg, actor.rig.motion, source.clip.source, source.loop);
  if (counted) for (const animation of animations) animation.effect?.updateTiming({ iterations: counted });
  sync(animations, (now - source.start) * source.rate, source.rate, clock);
  actor.native = { ...actor.native, source, clip: animations };
};

/** Stops the natively playing clip, so held frames can take over from exactly where it was. */
const stopNative = (actor: ActorCore): void => {
  for (const animation of actor.native.clip) animation.cancel();
  actor.native = { ...actor.native, source: undefined, clip: [] };
};

/** Starts (or restarts) the ambient clip underneath everything, as AnimatedMascot does. */
const playAmbient = (actor: ActorCore, svg: SVGSVGElement, now: number, clock: ClockState): void => {
  for (const animation of actor.native.ambient) animation.cancel();
  const { ambient } = actor.rig;
  const animations = ambient && !actor.reduced ? playClip(svg, actor.rig.motion, ambient.source, true) : [];
  sync(animations, now - actor.ambientStart, 1, clock);
  actor.native = { ...actor.native, ambient: animations };
};

/** Lines every native animation of a mascot up with the stage clock again, after a pause or a speed change. */
const syncNative = (actor: ActorCore, now: number, clock: ClockState): void => {
  sync(actor.native.ambient, now - actor.ambientStart, 1, clock);
  const { source } = actor.native;
  if (source) sync(actor.native.clip, (now - source.start) * source.rate, source.rate, clock);
};

export { playAmbient, playNative, stopNative, syncNative };
export type { ClockState };
