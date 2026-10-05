/* @layer renderer-components @kind logic */
import type { ActorCore } from './actor.type';
import type { ClipSource } from './pose-source.type';
import { BLEND_MS, CLIP_RULES, EXTRAS_FADE_MS } from './transition-rules.constants';

const blendTo = (actor: ActorCore, to: ClipSource, now: number, ms?: number): void => {
  const body = ms ?? CLIP_RULES[to.id]?.blendIn ?? BLEND_MS;
  if (body <= 0 || actor.reduced) {
    actor.source = { kind: 'blend', from: actor.source, to, start: now, body: 0, extras: EXTRAS_FADE_MS };
    return;
  }
  actor.source = { kind: 'blend', from: actor.source, to, start: now, body, extras: Math.max(body, EXTRAS_FADE_MS) };
};

export { blendTo };
