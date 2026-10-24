/* @layer renderer-components @kind logic */
import { CONTROLLER_SILHOUETTE_PATHS } from './outlines.constants';
import type { ControllerSilhouetteVariant } from '../ControllerSilhouette.type';

const silhouetteOutline = (variant: ControllerSilhouetteVariant): string => CONTROLLER_SILHOUETTE_PATHS[variant];

export { silhouetteOutline };
