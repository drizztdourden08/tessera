/* @layer renderer-components @kind logic */
import type { MascotClip } from '../../motion/mascot-clip.type';
import type { Facing, PlayOptions } from '../MascotStage.type';
import type { ActorCore } from './actor.type';
import { facingValue } from './facing-value';
import type { ClipSource, PoseSource } from './pose-source.type';
import { BLEND_MS, CLIP_RULES, EXTRAS_FADE_MS } from './transition-rules.constants';

const STOP_EPSILON = 0.001;

/** The clip a source is heading to: the newest side of any blend. */
const finalClip = (source: PoseSource): ClipSource => (source.kind === 'clip' ? source : finalClip(source.to));

/** A source for a clip starting now; loop true repeats, a number repeats that many times then holds. */
const clipSource = (actor: ActorCore, id: MascotClip, now: number, options: PlayOptions = {}): ClipSource => {
  const clip = actor.rig.clips.get(id) ?? actor.rig.clips.get(actor.rest);
  if (!clip) throw new Error(`No clip ${id}`);
  const { loop = clip.loop, speed = 1 } = options;
  const counted = typeof loop === 'number';
  return {
    kind: 'clip', id, clip, start: now, rate: Math.max(0.05, speed),
    loop: loop !== false,
    until: counted ? Math.max(1, loop) * clip.duration - STOP_EPSILON : Infinity,
  };
};

/** When a clip source ends on the stage clock: never for an endless loop. */
const clipEnd = (source: ClipSource): number => {
  if (Number.isFinite(source.until)) return source.start + source.until / source.rate;
  return source.loop ? Infinity : source.start + source.clip.span / source.rate;
};

/** Cross-fades from whatever is showing now into a new clip. */
const blendTo = (actor: ActorCore, to: ClipSource, now: number, ms?: number): void => {
  const body = ms ?? CLIP_RULES[to.id]?.blendIn ?? BLEND_MS;
  if (body <= 0 || actor.reduced) {
    actor.source = { kind: 'blend', from: actor.source, to, start: now, body: 0, extras: EXTRAS_FADE_MS };
    return;
  }
  actor.source = { kind: 'blend', from: actor.source, to, start: now, body, extras: Math.max(body, EXTRAS_FADE_MS) };
};

/** Settles into the rest clip unless it is already heading there. */
const settleRest = (actor: ActorCore, now: number): void => {
  const current = finalClip(actor.source);
  if (current.id === actor.rest && current.loop && !Number.isFinite(current.until)) return;
  blendTo(actor, clipSource(actor, actor.rest, now, { loop: true }), now);
};

/** Starts a turn from wherever the current turn is. */
const turnTo = (actor: ActorCore, facing: Facing, now: number): boolean => {
  if (actor.facing === facing) return false;
  actor.turn = { from: facingValue(actor, now), to: facing === 'left' ? -1 : 1, start: now };
  actor.facing = facing;
  return true;
};

export { blendTo, clipEnd, clipSource, finalClip, settleRest, turnTo };
