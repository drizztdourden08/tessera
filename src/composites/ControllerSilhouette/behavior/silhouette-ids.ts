/* @layer renderer-components @kind logic */
import type { SilhouetteIds } from '../ControllerSilhouette.type';

const silhouetteIds = (seed: string): SilhouetteIds => {
  const base = `controller-silhouette-${seed.replace(/[^\w-]/g, '')}`;
  return {
    sheen: `${base}-sheen`,
    bevel: `${base}-bevel`,
    well: `${base}-well`,
    dish: `${base}-dish`,
    rim: `${base}-rim`,
    clip: `${base}-clip`,
  };
};

export { silhouetteIds };
