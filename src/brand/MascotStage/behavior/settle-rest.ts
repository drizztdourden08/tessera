/* @layer renderer-components @kind logic */
import type { ActorCore } from './actor.type';
import { blendTo } from './blend-to';
import { clipSource } from './clip-source';
import { finalClip } from './final-clip';

const settleRest = (actor: ActorCore, now: number): void => {
  const current = finalClip(actor.source);
  if (current.id === actor.rest && current.loop && !Number.isFinite(current.until)) return;
  blendTo(actor, clipSource(actor, actor.rest, now, { loop: true }), now);
};

export { settleRest };
