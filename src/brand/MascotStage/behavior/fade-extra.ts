/* @layer renderer-components @kind logic */
import type { MascotEffectMode } from '../MascotStage.type';
import type { ActorCore } from './actor.type';

const fadeExtra = (core: ActorCore, id: string, mode: MascotEffectMode, now: number): void => {
  const before = core.overrides.get(id);
  const weight = before ? before.to : 0;
  if (mode === 'auto') {
    if (before) core.overrides.set(id, { ...before, from: weight, to: 0, start: now });
    return;
  }
  const target = mode === 'show' ? 1 : 0;
  core.overrides.set(id, { target, start: now, from: before?.target === target ? weight : 0, to: 1 });
};

export { fadeExtra };
