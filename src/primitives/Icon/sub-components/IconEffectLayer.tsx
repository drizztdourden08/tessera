/* @layer renderer-components @kind component */
import { useIconPops } from '../behavior/useIconPops';
import { ICON_EFFECT } from './IconEffectHost.constants';
import { IconEffectPop } from './IconEffectPop';
import type { IconPopsParams } from './IconEffectHost.type';

const IconEffectLayer = (props: IconPopsParams) => {
  const { effect } = props;
  const beat = useIconPops(props);
  const scale = beat ? beat.samples.span / ICON_EFFECT.design : 1;
  const { grow } = ICON_EFFECT.sizes[effect.size];
  return (
    <svg className="icon-effect__layer" viewBox={beat?.samples.viewBox} aria-hidden="true" focusable="false">
      {beat?.spots.map((spot, i) => (
        <IconEffectPop key={`${beat.id}-${i}`} kind={effect.kind} spot={spot} scale={scale} grow={grow} />
      ))}
    </svg>
  );
};

export { IconEffectLayer };
