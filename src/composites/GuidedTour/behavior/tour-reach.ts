/* @layer renderer-components @kind logic */
import type { TourReach, TourStage } from './tour-internal.type';

const tourReach = (stage: TourStage, kept: readonly HTMLElement[], clickAt: HTMLElement | null): TourReach => {
  const lit = stage.waits ? stage.target : null;
  const outside = clickAt && !stage.target?.contains(clickAt) ? [clickAt] : [];
  return {
    reachable: [...kept, ...(lit ? [lit] : []), ...(clickAt ? [clickAt] : [])],
    holes: [...kept, ...outside],
  };
};

export { tourReach };
