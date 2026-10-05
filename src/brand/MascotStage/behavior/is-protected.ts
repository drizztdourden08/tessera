/* @layer renderer-components @kind logic */
import type { ActorCore } from './actor.type';
import { finalClip } from './final-clip';
import { CLIP_RULES } from './transition-rules.constants';

const isProtected = (actor: ActorCore, now: number): boolean => {
  const step = actor.step;
  const window = step?.phase === 'play' && step.clip ? CLIP_RULES[step.clip]?.protect : undefined;
  const source = finalClip(actor.source);
  if (!window || source.id !== step?.clip) return false;
  const progress = ((now - source.start) * source.rate) / source.clip.duration;
  return progress >= window[0] && progress <= window[1];
};

export { isProtected };
