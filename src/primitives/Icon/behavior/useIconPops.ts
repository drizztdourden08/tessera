/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import { useInView } from '../../dom/useInView';
import { usePageVisible } from '../../dom/usePageVisible';
import { useReducedMotion } from '../../dom/useReducedMotion';
import { ICON_EFFECT } from '../sub-components/IconEffectHost.constants';
import type { IconPopsParams, PopBeat } from '../sub-components/IconEffectHost.type';
import { createPopScheduler } from './create-pop-scheduler';
import { iconSamplesFor } from './icon-samples-for';
import { popSpots } from './pop-spots';
import { readIconSamples } from './read-icon-samples';

const useIconPops = (params: IconPopsParams): PopBeat | null => {
  const { hostRef, icon, sampleKey, effect } = params;
  const { kind, every, jitter, count, size } = effect;
  const { trail } = ICON_EFFECT.sizes[size];
  const reduced = useReducedMotion(hostRef);
  const inView = useInView(hostRef);
  const pageVisible = usePageVisible(hostRef);
  const [beat, setBeat] = useState<PopBeat | null>(null);
  const live = !reduced && inView && pageVisible;

  useEffect(() => {
    const svg = hostRef.current?.firstElementChild as SVGSVGElement | null | undefined;
    if (!live || svg?.tagName.toLowerCase() !== 'svg') return undefined;
    const samples = iconSamplesFor(icon, sampleKey, () => readIconSamples(svg));
    if (!samples) return undefined;
    const scheduler = createPopScheduler({
      every,
      jitter,
      onBeat: (id) => setBeat({ id, samples, spots: popSpots(samples.points, { kind, count, trail }, Math.random) }),
    });
    scheduler.start();
    return scheduler.stop;
  }, [hostRef, icon, sampleKey, live, kind, every, jitter, count, trail]);

  return reduced ? null : beat;
};

export { useIconPops };
