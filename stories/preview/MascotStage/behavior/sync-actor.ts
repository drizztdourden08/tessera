/* @layer stories @kind logic */
import type { MascotStageCast, MascotStep } from '../MascotStage.type';
import type { StageActor } from './create-actor';

const HOST = 1;

const changed = <K extends keyof MascotStageCast>(before: MascotStageCast, next: MascotStageCast, key: K): boolean =>
  next[key] !== undefined && next[key] !== before[key];

const syncSettings = (actor: StageActor, before: MascotStageCast, next: MascotStageCast): void => {
  if (next.rest && next.rest !== before.rest) actor.core.rest = next.rest;
  if (next.autonomy !== before.autonomy) actor.setAutonomy(next.autonomy);
  if (Boolean(next.hidden) !== Boolean(before.hidden)) actor.handle.setVisible(!next.hidden);
};

const commandsFor = (before: MascotStageCast, next: MascotStageCast): MascotStep[] => {
  const at = changed(before, next, 'x') ? next.x : undefined;
  const face = changed(before, next, 'face') ? next.face : undefined;
  const turn = face ? { face } : {};
  if (next.clip && changed(before, next, 'clip')) return [{ play: next.clip, ...(at === undefined ? {} : { at }), ...turn }];
  if (at !== undefined) return [{ moveTo: at, ...turn }, ...(next.clip ? [{ play: next.clip }] : [])];
  return face ? [{ face }] : [];
};

const syncActor = (actor: StageActor, before: MascotStageCast, next: MascotStageCast, now: number): void => {
  syncSettings(actor, before, next);
  if (next.x !== undefined && changed(before, next, 'x')) actor.core.home = next.x;
  const [first, ...rest] = commandsFor(before, next);
  if (!first) return;
  void actor.runner.command(first, HOST, true, now);
  if (rest.length > 0) void actor.runner.enqueue(rest, HOST, true, now);
};

export { syncActor };
