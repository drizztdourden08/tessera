/* @layer renderer-components @kind logic */
import type { ActiveStep, ActorCore } from './actor.type';
import type { PlayStep } from './begin-play.type';
import { blendTo } from './blend-to';
import { clipEnd } from './clip-end';
import { clipSource } from './clip-source';
import { finalClip } from './final-clip';
import { turnTo } from './turn-to';

const beginPlay = (actor: ActorCore, active: ActiveStep, step: PlayStep, now: number): void => {
  if (step.face) turnTo(actor, step.face, now);
  const current = finalClip(actor.source);
  const keep = current.id === step.play && current.loop && step.loop === true && !Number.isFinite(current.until);
  const source = keep ? current : clipSource(actor, step.play, now, step);
  if (!keep) blendTo(actor, source, now, step.blend);
  active.phase = 'play';
  active.clip = step.play;
  active.endsAt = clipEnd(source);
  actor.emit({ type: 'clip-start', clip: step.play, x: actor.x });
};

export { beginPlay };
