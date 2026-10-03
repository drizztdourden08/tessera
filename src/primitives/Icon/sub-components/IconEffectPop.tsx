/* @layer renderer-components @kind component */
import { ICON_EFFECT } from './IconEffectHost.constants';
import type { IconEffectPopProps } from './IconEffectHost.type';

const IconEffectPop = (props: IconEffectPopProps) => {
  const { kind, spot, scale } = props;
  if (kind === 'shimmer') {
    return (
      <polyline
        className="icon-effect__pop icon-effect__pop--shimmer"
        points={spot.trail}
        pathLength={1}
        strokeDasharray={ICON_EFFECT.sweepDash}
        strokeWidth={ICON_EFFECT.shimmerStroke * scale}
      />
    );
  }
  const pop = ICON_EFFECT.pops[kind];
  return (
    <g transform={`translate(${spot.x} ${spot.y}) scale(${scale})`}>
      <path
        className={`icon-effect__pop icon-effect__pop--${kind}`}
        d={pop.d}
        pathLength={kind === 'glint' ? 1 : undefined}
        strokeDasharray={kind === 'glint' ? ICON_EFFECT.sweepDash : undefined}
        strokeWidth={pop.stroke || undefined}
      />
    </g>
  );
};

export { IconEffectPop };
