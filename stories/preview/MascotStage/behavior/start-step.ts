/* @layer stories @kind logic */
import { WALK_SPEED } from '../MascotStage.constants';
import type { MascotStep, MoveOptions, PlayOptions } from '../MascotStage.type';
import type { MascotClip } from '../../../../src/brand/motion/mascot-clip.type';
import type { ActiveStep, ActorCore, QueuedStep } from './actor.type';
import { blendTo, clipEnd, clipSource, finalClip, settleRest, turnTo } from './actor-moves';
import { TURN_MS } from './transition-rules.constants';

type PlayStep = { play: MascotClip } & PlayOptions;

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

const beginWalk = (actor: ActorCore, active: ActiveStep, options: MoveOptions & { x: number }, now: number): void => {
  const { x } = options;
  actor.spread = false;
  const target = Math.min(actor.bounds.max, Math.max(actor.bounds.min, x));
  const facing = options.face ?? (target < actor.x ? 'left' : 'right');
  turnTo(actor, facing, now);
  const walk = options.clip ?? 'move';
  const current = finalClip(actor.source);
  if (current.id !== walk) blendTo(actor, clipSource(actor, walk, now, { loop: true }), now);
  actor.travel = { target, speed: options.speed ?? WALK_SPEED, walking: true };
  active.phase = 'move';
  active.clip = walk;
  active.endsAt = Infinity;
};

const needsWalk = (actor: ActorCore, x: number | undefined): x is number =>
  x !== undefined && Math.abs(Math.min(actor.bounds.max, Math.max(actor.bounds.min, x)) - actor.x) > 1;

const startStep = (actor: ActorCore, queued: QueuedStep, now: number): ActiveStep => {
  const active: ActiveStep = { ...queued, phase: 'wait', started: now, endsAt: now };
  const step: MascotStep = queued.step;
  actor.step = active;
  actor.emit({ type: 'step-start', x: actor.x });
  if ('wait' in step) {
    settleRest(actor, now);
    active.endsAt = now + step.wait;
  } else if ('moveTo' in step) {
    beginWalk(actor, active, { ...step, x: step.moveTo }, now);
  } else if ('play' in step) {
    if (needsWalk(actor, step.at)) beginWalk(actor, active, { x: step.at }, now);
    else beginPlay(actor, active, step, now);
  } else {
    active.phase = 'turn';
    active.endsAt = turnTo(actor, step.face, now) && !actor.reduced ? now + TURN_MS : now;
  }
  return active;
};

export { beginPlay, startStep };
