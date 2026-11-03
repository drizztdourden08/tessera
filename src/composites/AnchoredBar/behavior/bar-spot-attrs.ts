/* @layer renderer-components @kind logic */
import type { BarSpot } from './bar-position.type';
import type { BarSpotAttrs } from './bar-spot-attrs.type';

const barSpotAttrs = (spot: BarSpot | null): BarSpotAttrs => ({
  fallback: spot ? { left: spot.left, top: spot.top } : null,
  ready: spot !== null && !spot.parked,
  measuring: spot === null || spot.parked ? true : undefined,
  docked: spot?.docked ? true : undefined,
});

export { barSpotAttrs };
