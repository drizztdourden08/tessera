/* @layer renderer-components @kind logic */
import { ICON_EFFECT } from '../sub-components/IconEffectHost.constants';

const nextPopDelay = (every: number, jitter: number, random: number): number =>
  Math.max(ICON_EFFECT.minDelay, Math.round(every + (random * 2 - 1) * jitter));

export { nextPopDelay };
