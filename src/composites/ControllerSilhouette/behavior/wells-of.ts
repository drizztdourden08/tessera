/* @layer renderer-components @kind logic */
import { CONTROLLER_SILHOUETTE_ANCHOR_IDS } from '../ControllerSilhouette.constants';
import { CONTROLLER_SILHOUETTE_ANCHORS } from './anchors.constants';
import { WELL_KIND } from './well.constants';
import type { ControllerSilhouetteVariant, SilhouetteWell } from '../ControllerSilhouette.type';

const wellsOf = (variant: ControllerSilhouetteVariant): readonly SilhouetteWell[] => {
  const anchors = CONTROLLER_SILHOUETTE_ANCHORS[variant];
  return CONTROLLER_SILHOUETTE_ANCHOR_IDS.flatMap((id): SilhouetteWell[] => {
    const anchor = anchors[id];
    const kind = WELL_KIND[id];
    if (!anchor?.r || !kind) return [];
    return [{ id, kind, x: anchor.x, y: anchor.y, r: anchor.r }];
  });
};

export { wellsOf };
