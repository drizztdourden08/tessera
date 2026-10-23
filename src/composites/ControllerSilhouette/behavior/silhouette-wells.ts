/* @layer renderer-components @kind logic */
import { WELLS } from './wells.constants';
import type { ControllerSilhouetteVariant, SilhouetteWell } from '../ControllerSilhouette.type';

const silhouetteWells = (variant: ControllerSilhouetteVariant): readonly SilhouetteWell[] => WELLS[variant];

export { silhouetteWells };
