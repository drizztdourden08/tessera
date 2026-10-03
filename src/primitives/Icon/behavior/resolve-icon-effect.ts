/* @layer renderer-components @kind logic */
import { ICON_EFFECT } from '../sub-components/IconEffectHost.constants';
import type { IconEffect } from '../Icon.type';
import type { ResolvedIconEffect } from '../sub-components/IconEffectHost.type';

const resolveIconEffect = (effect: IconEffect): ResolvedIconEffect => {
  const options = typeof effect === 'string' ? { kind: effect } : effect;
  const every = Math.max(ICON_EFFECT.minDelay, options.every ?? ICON_EFFECT.every);
  const jitter = Math.max(0, options.jitter ?? every * ICON_EFFECT.jitterShare);
  return {
    kind: options.kind,
    every,
    jitter,
    color: options.color ?? 'primary',
    count: Math.max(1, Math.round(options.count ?? 1)),
    size: options.size ?? 'md',
  };
};

export { resolveIconEffect };
