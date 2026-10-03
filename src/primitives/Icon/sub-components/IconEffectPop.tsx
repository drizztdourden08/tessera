/* @layer renderer-components @kind component */
import { ICON_EFFECT } from './IconEffectHost.constants';
import type { IconEffectPopProps } from './IconEffectHost.type';

const IconEffectPop = (props: IconEffectPopProps) => {
  const { kind, spot, scale, grow } = props;
  if (kind === 'shimmer') {
    return (
      <polyline
        className="icon-effect__pop icon-effect__pop--shimmer"
        points={spot.trail}
        pathLength={1}
        strokeDasharray={ICON_EFFECT.sweepDash}
        strokeWidth={ICON_EFFECT.shimmerStroke * scale * Math.sqrt(grow)}
      />
    );
  }
  const pop = ICON_EFFECT.pops[kind];
  const sweeps = kind === 'glint';
  return (
    <g transform={`translate(${spot.x} ${spot.y}) scale(${scale * grow})`}>
      {kind === 'comet' && (
        <path
          className="icon-effect__pop icon-effect__pop--comet-tail"
          d={ICON_EFFECT.cometTail.d}
          pathLength={1}
          strokeWidth={ICON_EFFECT.cometTail.stroke / grow}
        />
      )}
      <path
        className={`icon-effect__pop icon-effect__pop--${kind}`}
        d={pop.d}
        pathLength={sweeps ? 1 : undefined}
        strokeDasharray={sweeps ? ICON_EFFECT.sweepDash : undefined}
        strokeWidth={pop.stroke ? pop.stroke / grow : undefined}
      />
    </g>
  );
};

export { IconEffectPop };
