/* @layer renderer-components @kind logic */
import { EXTRAS_FADE_MS } from './transition-rules.constants';
import type { ActorCore, ActorDom } from './actor.type';
import { composeOutputs } from './compose-outputs';
import type { ExtraWeights } from './compose-outputs';
import { easeWeight } from './ease-weight';
import { evaluateSource } from './evaluate-source';
import { facingValue } from './facing-value';
import { playNative, stopNative } from './native-play';
import type { ClockState } from './native-play';
import { settleSource } from './settle-source';
import { sourceParts } from './source-parts';

const extraWeights = (actor: ActorCore, now: number): ExtraWeights => {
  const weights = new Map<string, { weight: number; target: number }>();
  for (const [id, o] of actor.overrides) {
    const weight = o.from + (o.to - o.from) * easeWeight(now - o.start, EXTRAS_FADE_MS);
    if (weight > 0) weights.set(id, { weight, target: o.target });
    else if (o.to === 0) actor.overrides.delete(id);
  }
  return weights;
};

const snap = (px: number): number => {
  const ratio = globalThis.devicePixelRatio || 1;
  return Math.round(px * ratio) / ratio;
};

const place = (actor: ActorCore, dom: ActorDom, now: number): void => {
  const { rig } = actor;
  const facing = facingValue(actor, now);
  dom.writer.mirror(facing < 0);
  const shift = `translateX(${snap(actor.x - rig.anchor * actor.scale)}px)`;
  if (dom.wrap.style.transform !== shift) dom.wrap.style.transform = shift;
  const origin = `${rig.anchor * actor.scale}px 100%`;
  if (dom.svg.style.transformOrigin !== origin) dom.svg.style.transformOrigin = origin;
  const turn = facing === 1 ? '' : `scaleX(${facing})`;
  if (dom.svg.style.transform !== turn) dom.svg.style.transform = turn;
};

/**
 * Draws one mascot at a moment on the stage clock. A settled clip plays natively (today's playClip, nothing
 * per frame); while a blend runs, or an extra is forced, the engine samples both sides and holds the frame.
 */
const renderActor = (actor: ActorCore, now: number, clock: ClockState): void => {
  const { dom, rig } = actor;
  if (!dom) return;
  actor.source = settleSource(actor.source, now);
  const { source } = actor;
  const parts = sourceParts(source, rig);
  const extras = extraWeights(actor, now);
  dom.writer.park(extras.size > 0 ? new Set([...parts.inUse, ...extras.keys()]) : parts.inUse);
  if (source.kind === 'clip' && !actor.reduced && extras.size === 0) {
    if (actor.native.source !== source) {
      stopNative(actor);
      dom.writer.release();
      dom.writer.base(source.clip.still);
      playNative(actor, dom.svg, source, now, clock);
    }
  } else {
    if (actor.native.source) stopNative(actor);
    const action = evaluateSource(source, now, { effects: rig.effects, reduced: actor.reduced });
    dom.writer.write(composeOutputs(rig, action, parts, extras), parts.tracked);
  }
  place(actor, dom, now);
};

export { renderActor };
