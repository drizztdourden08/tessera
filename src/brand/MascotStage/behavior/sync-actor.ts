/* @layer renderer-components @kind logic */
import type { MascotStageCast } from '../MascotStage.type';
import type { StageActor } from './create-actor';

const HOST = 1;

/**
 * Turns a change of the declarative cast into commands: a new clip transitions to it (walking first when
 * x changed too), a new x walks there and goes back to the held clip, a new face turns, and autonomy and
 * the rest clip are swapped in place.
 */
const syncActor = (actor: StageActor, before: MascotStageCast, next: MascotStageCast, now: number): void => {
  const { core, runner } = actor;
  if (next.rest && next.rest !== before.rest) core.rest = next.rest;
  if (next.autonomy !== before.autonomy) actor.setAutonomy(next.autonomy);
  if ((next.hidden ?? false) !== (before.hidden ?? false)) actor.handle.setVisible(!next.hidden);
  const moved = next.x !== undefined && next.x !== before.x;
  const turned = next.face !== undefined && next.face !== before.face;
  const face = turned && next.face ? { face: next.face } : {};
  if (moved && next.x !== undefined) core.home = next.x;
  if (next.clip && next.clip !== before.clip) {
    void runner.command({ play: next.clip, ...(moved ? { at: next.x } : {}), ...face }, HOST, true, now);
  } else if (moved && next.x !== undefined) {
    void runner.command({ moveTo: next.x, ...face }, HOST, true, now);
    if (next.clip) void runner.enqueue([{ play: next.clip }], HOST, true, now);
  } else if (turned && next.face) {
    void runner.command({ face: next.face }, HOST, true, now);
  }
};

export { syncActor };
